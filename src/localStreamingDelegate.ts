import {
  CameraStreamingDelegate,
  HAP,
  PrepareStreamCallback,
  PrepareStreamRequest,
  PrepareStreamResponse,
  SnapshotRequest,
  SnapshotRequestCallback,
  SRTPCryptoSuites,
  StreamingRequest,
  StreamRequestCallback,
  StreamRequestTypes,
  Logger,
  CameraController,
} from 'homebridge';
import { ChildProcess, spawn } from 'child_process';
import WebSocket from 'ws';
import * as os from 'os';
import { client } from './nanit.proto';
// @ts-ignore - node-media-server doesn't have types
import NodeMediaServer from 'node-media-server';

type SessionInfo = {
  address: string; // iOS device address
  videoPort: number;
  videoReturnPort: number;
  videoCryptoSuite: SRTPCryptoSuites;
  videoSRTP: Buffer;
  videoSSRC: number;

  audioPort: number;
  audioReturnPort: number;
  audioCryptoSuite: SRTPCryptoSuites;
  audioSRTP: Buffer;
  audioSSRC: number;
};

export class LocalStreamingDelegate implements CameraStreamingDelegate {
  private readonly hap: HAP;
  private readonly log: Logger;
  private readonly name: string;
  private readonly localIp: string;
  private readonly getAccessToken: () => string;
  private readonly rtmpPort: number;
  private readonly sessions: Map<string, { process?: ChildProcess; ws?: WebSocket; info?: SessionInfo }> = new Map();
  private rtmpServer?: any;
  private readonly rtmpPublishing = new Set<string>();
  private readonly rtmpPublishWaiters = new Map<string, Array<() => void>>();
  private wsRequestId = 1;
  private startingSessions: Set<string> = new Set();
  public cloudFallbackGetUrl?: () => string;

  controller?: CameraController;

  private readonly cameraUid: string;
  private readonly babyUid: string;
  private readonly configuredLocalAddress?: string;

  constructor(
    hap: HAP,
    log: Logger,
    name: string,
    localIp: string,
    getAccessToken: () => string,
    rtmpPort: number = 1935,
    cameraUid?: string,
    babyUid?: string,
    configuredLocalAddress?: string,
  ) {
    this.hap = hap;
    this.log = log;
    this.name = name;
    this.localIp = localIp;
    this.getAccessToken = getAccessToken;
    this.rtmpPort = rtmpPort;
    this.cameraUid = cameraUid || '';
    this.babyUid = babyUid || '';
    this.configuredLocalAddress = configuredLocalAddress;
  }

  private startRtmpServer(): void {
    if (this.rtmpServer) {
      return; // Already running
    }

    this.log.debug(`[${this.name}] Starting local RTMP server on port ${this.rtmpPort}`);

    const config = {
      logType: 0, // Disable logs
      rtmp: {
        port: this.rtmpPort,
        chunk_size: 60000,
        gop_cache: true,
        ping: 30,
        ping_timeout: 60,
      },
    };

    this.rtmpServer = new NodeMediaServer(config);
    this.rtmpServer.on('postPublish', (session: { streamPath?: string }) => {
      const streamPath = session.streamPath;
      if (!streamPath) {
        return;
      }

      this.rtmpPublishing.add(streamPath);
      this.log.info(`[${this.name}] Camera RTMP publisher connected: ${streamPath}`);

      const waiters = this.rtmpPublishWaiters.get(streamPath);
      if (waiters) {
        this.rtmpPublishWaiters.delete(streamPath);
        for (const resolve of waiters) {
          resolve();
        }
      }
    });

    this.rtmpServer.on('donePublish', (session: { streamPath?: string }) => {
      const streamPath = session.streamPath;
      if (!streamPath) {
        return;
      }

      this.rtmpPublishing.delete(streamPath);
      this.log.debug(`[${this.name}] Camera RTMP publisher disconnected: ${streamPath}`);
    });

    this.rtmpServer.run();

    this.log.info(`[${this.name}] Local RTMP server started on port ${this.rtmpPort}`);
  }

  private stopRtmpServer(): void {
    // NodeMediaServer v4 removed the stop() method from v3
    // Server lifecycle: shared across all sessions, stopped only on plugin shutdown
    // This is intentional — RTMP server stays running and reuses connections
    // Alternative would be to track active sessions and stop when count hits zero,
    // but the overhead of keeping the server running is negligible
    this.log.debug(`[${this.name}] RTMP server kept alive for reuse`);
  }

  private async connectToCamera(): Promise<WebSocket> {
    return new Promise((resolve, reject) => {
      // Use REMOTE WebSocket as signaling channel (camera pushes RTMP directly to us)
      const url = `wss://api.nanit.com/focus/cameras/${this.cameraUid}/user_connect`;
      
      this.log.info(`[${this.name}] Connecting to Nanit signaling WebSocket for camera ${this.cameraUid}`);

      const ws = new WebSocket(url, {
        headers: {
          'Authorization': `Bearer ${this.getAccessToken()}`,
        },
      });

      ws.on('open', () => {
        this.log.info(`[${this.name}] Connected to camera via WebSocket`);
        resolve(ws);
      });

      ws.on('error', (error: Error) => {
        this.log.error(`[${this.name}] WebSocket error:`, error.message);
        reject(error);
      });

      ws.on('close', () => {
        this.log.debug(`[${this.name}] WebSocket closed`);
      });

      // Handle incoming messages
      ws.on('message', (data: Buffer) => {
        try {
          const message = client.Message.decode(data);
          this.log.debug(`[${this.name}] Received message:`, message.type);
          
          if (message.type === client.Message.Type.RESPONSE && message.response) {
            const response = message.response;
            this.log.debug(`[${this.name}] Response:`, {
              requestId: response.requestId,
              statusCode: response.statusCode,
              statusMessage: response.statusMessage,
            });
          }
        } catch (error: any) {
          this.log.error(`[${this.name}] Failed to decode message:`, error);
        }
      });
    });
  }

  private getHostIp(): string {
    // Use configured local address if provided
    if (this.configuredLocalAddress) {
      return this.configuredLocalAddress;
    }
    
    // Auto-detect from network interfaces
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
      for (const iface of interfaces[name] || []) {
        if (iface.family === 'IPv4' && !iface.internal) {
          return iface.address;
        }
      }
    }
    return '127.0.0.1';
  }

  private sendStreamingRequest(ws: WebSocket, rtmpUrl: string): void {
    const requestId = this.wsRequestId++;

    const request = client.Request.create({
      id: requestId,
      type: client.RequestType.PUT_STREAMING,
      streaming: client.Streaming.create({
        id: client.StreamIdentifier.MOBILE,
        status: client.Streaming.Status.STARTED,
        rtmpUrl: rtmpUrl,
      }),
    });

    const message = client.Message.create({
      type: client.Message.Type.REQUEST,
      request: request,
    });

    const buffer = client.Message.encode(message).finish();
    
    this.log.debug(`[${this.name}] Sending PUT_STREAMING request to ${rtmpUrl}`);
    ws.send(buffer);
  }

  private sendStopStreamingRequest(ws: WebSocket): void {
    const requestId = this.wsRequestId++;
    const request = client.Request.create({
      id: requestId,
      type: client.RequestType.PUT_STREAMING,
      streaming: client.Streaming.create({
        id: client.StreamIdentifier.MOBILE,
        status: client.Streaming.Status.STOPPED,
        rtmpUrl: '',
      }),
    });

    const message = client.Message.create({
      type: client.Message.Type.REQUEST,
      request,
    });

    ws.send(client.Message.encode(message).finish());
  }

  private waitForRtmpPublisher(streamKey: string, timeoutMs = 12000): Promise<void> {
    const streamPath = `/live/${streamKey}`;
    if (this.rtmpPublishing.has(streamPath)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const waiters = this.rtmpPublishWaiters.get(streamPath) || [];
      const onPublish = () => {
        clearTimeout(timer);
        resolve();
      };
      waiters.push(onPublish);
      this.rtmpPublishWaiters.set(streamPath, waiters);

      const timer = setTimeout(() => {
        const activeWaiters = this.rtmpPublishWaiters.get(streamPath);
        if (activeWaiters) {
          const index = activeWaiters.indexOf(onPublish);
          if (index !== -1) {
            activeWaiters.splice(index, 1);
          }
          if (activeWaiters.length === 0) {
            this.rtmpPublishWaiters.delete(streamPath);
          }
        }
        reject(new Error(`Timed out waiting for camera RTMP publish on ${streamPath}`));
      }, timeoutMs);
    });
  }

  async handleSnapshotRequest(request: SnapshotRequest, callback: SnapshotRequestCallback): Promise<void> {
    this.log.debug(`[${this.name}] Snapshot requested: ${request.width}x${request.height}`);
    
    let callbackCalled = false;
    const safeCallback = (error?: Error, buffer?: Buffer) => {
      if (!callbackCalled) {
        callbackCalled = true;
        callback(error, buffer);
      }
    };

    // For snapshots, we'll use the cloud URL as a fallback since local RTMP might not be running
    const cloudUrl = `rtmps://media-secured.nanit.com/nanit/${this.babyUid}.${this.getAccessToken()}`;
    const ffmpegArgs = [
      '-rw_timeout', '10000000',
      '-i', cloudUrl,
      '-frames:v', '1',
      '-f', 'image2',
      '-',
    ];

    this.log.debug(`[${this.name}] Snapshot URL: rtmps://media-secured.nanit.com/nanit/[baby_uid].[token_redacted]`);
    const ffmpeg = spawn('ffmpeg', ffmpegArgs, { env: process.env });
    let imageBuffer = Buffer.alloc(0);

    ffmpeg.stdout.on('data', (data) => {
      imageBuffer = Buffer.concat([imageBuffer, data]);
    });

    ffmpeg.on('error', (error) => {
      this.log.error(`[${this.name}] FFmpeg snapshot error:`, error.message);
      safeCallback(error);
    });

    ffmpeg.on('close', () => {
      if (imageBuffer.length > 0) {
        safeCallback(undefined, imageBuffer);
      } else {
        safeCallback(new Error('Failed to generate snapshot'));
      }
    });
  }

  async prepareStream(request: PrepareStreamRequest, callback: PrepareStreamCallback): Promise<void> {
    this.log.debug(`[${this.name}] Prepare stream request`);

    const sessionId = request.sessionID;
    const targetAddress = request.targetAddress;

    const videoReturn = request.video.port;
    const videoSSRC = this.hap.CameraController.generateSynchronisationSource();
    const audioReturn = request.audio.port;
    const audioSSRC = this.hap.CameraController.generateSynchronisationSource();

    const sessionInfo: SessionInfo = {
      address: targetAddress,
      videoPort: request.video.port,
      videoReturnPort: videoReturn,
      videoCryptoSuite: request.video.srtpCryptoSuite,
      videoSRTP: Buffer.concat([request.video.srtp_key, request.video.srtp_salt]),
      videoSSRC: videoSSRC,

      audioPort: request.audio.port,
      audioReturnPort: audioReturn,
      audioCryptoSuite: request.audio.srtpCryptoSuite,
      audioSRTP: Buffer.concat([request.audio.srtp_key, request.audio.srtp_salt]),
      audioSSRC: audioSSRC,
    };

    const response: PrepareStreamResponse = {
      video: {
        port: videoReturn,
        ssrc: videoSSRC,
        srtp_key: request.video.srtp_key,
        srtp_salt: request.video.srtp_salt,
      },
      audio: {
        port: audioReturn,
        ssrc: audioSSRC,
        srtp_key: request.audio.srtp_key,
        srtp_salt: request.audio.srtp_salt,
      },
    };

    this.sessions.set(sessionId, { process: undefined, ws: undefined, info: sessionInfo });
    callback(undefined, response);
  }

  async handleStreamRequest(request: StreamingRequest, callback: StreamRequestCallback): Promise<void> {
    const sessionId = request.sessionID;

    if (request.type === StreamRequestTypes.START) {
      this.log.info(`[${this.name}] Starting local video stream`);
      this.startingSessions.add(sessionId);
      
      try {
        // Start RTMP server if not already running
        this.startRtmpServer();

        // Connect to camera via WebSocket
        const ws = await this.connectToCamera();

        // Check if stop was requested during async connect
        if (!this.startingSessions.has(sessionId)) {
          this.log.info(`[${this.name}] Stream was stopped during setup, aborting`);
          ws.close();
          callback();
          return;
        }
        this.startingSessions.delete(sessionId);
        
        const session = this.sessions.get(sessionId);
        if (!session) {
          this.log.error(`[${this.name}] No session found for ${sessionId}`);
          ws.close();
          callback(new Error('No session'));
          return;
        }

        session.ws = ws;

        const video = request.video;
        const info = session.info;
        if (!info) {
          this.log.error(`[${this.name}] No session info found for ${sessionId}`);
          callback(new Error('No session info'));
          return;
        }
        const target = info.address;
        const videoPort = info.videoPort;

        const videoSrtpKey = info.videoSRTP.toString('base64');
        const videoSsrc = info.videoSSRC;
        let inputUrl: string;
        let usingCloudFallback = false;

        try {
          // Request camera to push RTMP to our local server. Use a stable, simple
          // stream key: some camera firmware is touchy about path characters.
          const hostIp = this.getHostIp();
          const streamKey = `nanit_${this.babyUid}`;
          const rtmpUrl = `rtmp://${hostIp}:${this.rtmpPort}/live/${streamKey}`;
          this.log.info(`[${this.name}] Requesting camera to push RTMP to ${rtmpUrl}`);
          this.sendStreamingRequest(ws, rtmpUrl);
          this.log.debug(`[${this.name}] Waiting for camera RTMP publish`);
          await this.waitForRtmpPublisher(streamKey);
          inputUrl = rtmpUrl;
        } catch (localError) {
          this.log.warn(`[${this.name}] Local RTMP did not start: ${localError instanceof Error ? localError.message : String(localError)}`);
          try {
            this.sendStopStreamingRequest(ws);
          } catch (stopError) {
            this.log.debug(`[${this.name}] Failed to send Nanit STOPPED after local timeout: ${stopError instanceof Error ? stopError.message : String(stopError)}`);
          }
          ws.close();
          session.ws = undefined;

          if (!this.cloudFallbackGetUrl) {
            throw localError;
          }

          inputUrl = this.cloudFallbackGetUrl();
          usingCloudFallback = true;
          this.log.warn(`[${this.name}] Falling back to cloud stream`);
        }

        const ffmpegArgs = [
          '-re',
          ...(usingCloudFallback ? ['-rw_timeout', '10000000'] : []),
          '-i', inputUrl,
          '-map', '0:v',
          '-vcodec', 'libx264',
          '-preset', 'ultrafast',
          '-tune', 'zerolatency',
          '-r', video.fps.toString(),
          '-b:v', `${video.max_bit_rate}k`,
          '-bufsize', `${video.max_bit_rate * 2}k`,
          '-maxrate', `${video.max_bit_rate}k`,
          '-pix_fmt', 'yuv420p',
          '-an',
          '-payload_type', video.pt.toString(),
          '-ssrc', videoSsrc.toString(),
          '-f', 'rtp',
          '-srtp_out_suite', 'AES_CM_128_HMAC_SHA1_80',
          '-srtp_out_params', videoSrtpKey,
          `srtp://${target}:${videoPort}?rtcpport=${videoPort}&pkt_size=1316`,
        ];

        this.log.info(`[${this.name}] FFmpeg starting from ${usingCloudFallback ? 'cloud fallback' : 'local RTMP'}`);

        const ffmpeg = spawn('ffmpeg', ffmpegArgs, { env: process.env });
        session.process = ffmpeg;

        ffmpeg.stderr.on('data', (data) => {
          const message = data.toString().trim();
          if (!message) {
            return;
          }
          if (/error|Error|Invalid|failed|Connection|Immediate exit/i.test(message)) {
            this.log.error(`[${this.name}] FFmpeg: ${message}`);
          } else {
            this.log.debug(`[${this.name}] FFmpeg: ${message}`);
          }
        });

        ffmpeg.on('error', (error) => {
          this.log.error(`[${this.name}] FFmpeg process error:`, error.message);
        });

        ffmpeg.on('close', (code, signal) => {
          this.log.info(`[${this.name}] Video stream stopped (exit=${code}, signal=${signal ?? 'none'})`);
        });

        callback();
      } catch (error) {
        this.log.error(`[${this.name}] Failed to start local stream:`, error);
        callback(error as Error);
      }
    } else if (request.type === StreamRequestTypes.STOP) {
      this.log.info(`[${this.name}] Stopping local video stream`);
      this.startingSessions.delete(sessionId);
      const session = this.sessions.get(sessionId);
      
      if (session) {
        // Stop ffmpeg gracefully
        if (session.process) {
          session.process.kill('SIGTERM');
          setTimeout(() => {
            if (session.process && !session.process.killed) {
              this.log.debug(`[${this.name}] FFmpeg didn't stop gracefully, forcing SIGKILL`);
              session.process.kill('SIGKILL');
            }
          }, 2000);
        }

        // Stop streaming on camera
        if (session.ws && session.ws.readyState === WebSocket.OPEN) {
          this.sendStopStreamingRequest(session.ws);
          session.ws.close();
        }
      }

      this.sessions.delete(sessionId);
      
      // Stop RTMP server if no more sessions
      if (this.sessions.size === 0) {
        this.stopRtmpServer();
      }

      callback();
    } else if (request.type === StreamRequestTypes.RECONFIGURE) {
      this.log.debug(`[${this.name}] Reconfigure stream (not implemented)`);
      callback();
    }
  }

  // Cleanup method
  destroy(): void {
    this.log.debug(`[${this.name}] Cleaning up local streaming delegate`);
    
    // Close all WebSocket connections and ffmpeg processes
    for (const [sessionId, session] of this.sessions) {
      if (session.ws && session.ws.readyState === WebSocket.OPEN) {
        session.ws.close();
      }
      if (session.process) {
        // Graceful shutdown: SIGTERM first, then SIGKILL after 2s
        session.process.kill('SIGTERM');
        setTimeout(() => {
          if (session.process && !session.process.killed) {
            session.process.kill('SIGKILL');
          }
        }, 2000);
      }
    }
    
    this.sessions.clear();
    this.stopRtmpServer();
  }
}
