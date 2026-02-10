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
  StreamSessionIdentifier,
  Logger,
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
  private wsRequestId = 1;
  private startingSessions: Set<string> = new Set();

  controller?: any; // CameraController

  private readonly cameraUid: string;
  private readonly babyUid: string;

  constructor(
    hap: HAP,
    log: Logger,
    name: string,
    localIp: string,
    getAccessToken: () => string,
    rtmpPort: number = 1935,
    cameraUid?: string,
    babyUid?: string,
  ) {
    this.hap = hap;
    this.log = log;
    this.name = name;
    this.localIp = localIp;
    this.getAccessToken = getAccessToken;
    this.rtmpPort = rtmpPort;
    this.cameraUid = cameraUid || '';
    this.babyUid = babyUid || '';
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
    this.rtmpServer.run();

    this.log.info(`[${this.name}] Local RTMP server started on port ${this.rtmpPort}`);
  }

  private stopRtmpServer(): void {
    // NodeMediaServer v4 has no stop() method — keep server running
    // It will be reused for subsequent stream requests
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

  async handleSnapshotRequest(request: SnapshotRequest, callback: SnapshotRequestCallback): Promise<void> {
    this.log.debug(`[${this.name}] Snapshot requested: ${request.width}x${request.height}`);
    
    // For snapshots, we'll use the cloud URL as a fallback since local RTMP might not be running
    const cloudUrl = `rtmps://media-secured.nanit.com/nanit/${this.name}.${this.getAccessToken()}`;
    const ffmpegArgs = [
      '-i', cloudUrl,
      '-frames:v', '1',
      '-f', 'image2',
      '-',
    ];

    const ffmpeg = spawn('ffmpeg', ffmpegArgs, { env: process.env });
    let imageBuffer = Buffer.alloc(0);

    ffmpeg.stdout.on('data', (data) => {
      imageBuffer = Buffer.concat([imageBuffer, data]);
    });

    ffmpeg.on('error', (error) => {
      this.log.error(`[${this.name}] FFmpeg snapshot error:`, error.message);
      callback(error);
    });

    ffmpeg.on('close', () => {
      if (imageBuffer.length > 0) {
        callback(undefined, imageBuffer);
      } else {
        callback(new Error('Failed to generate snapshot'));
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

        // Request camera to push RTMP to our local server
        // Detect Homebridge host's LAN IP for the camera to connect to
        const hostIp = this.getHostIp();
        const streamKey = `nanit_${sessionId}`;
        const rtmpUrl = `rtmp://${hostIp}:${this.rtmpPort}/live/${streamKey}`;
        this.log.info(`[${this.name}] Requesting camera to push RTMP to ${rtmpUrl}`);
        this.sendStreamingRequest(ws, rtmpUrl);

        // Wait a bit for the camera to start pushing
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Start ffmpeg to transcode from local RTMP to HomeKit
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

        const ffmpegArgs = [
          '-re',
          '-i', rtmpUrl,
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

        this.log.debug(`[${this.name}] FFmpeg args:`, ffmpegArgs.join(' '));

        const ffmpeg = spawn('ffmpeg', ffmpegArgs, { env: process.env });
        session.process = ffmpeg;

        ffmpeg.stderr.on('data', (data) => {
          const message = data.toString();
          if (message.includes('error') || message.includes('Error')) {
            this.log.error(`[${this.name}] FFmpeg:`, message);
          }
        });

        ffmpeg.on('error', (error) => {
          this.log.error(`[${this.name}] FFmpeg process error:`, error.message);
        });

        ffmpeg.on('close', () => {
          this.log.info(`[${this.name}] Video stream stopped`);
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
            request: request,
          });

          const buffer = client.Message.encode(message).finish();
          session.ws.send(buffer);
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
