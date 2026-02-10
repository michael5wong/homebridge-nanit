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

export class NanitStreamingDelegate implements CameraStreamingDelegate {
  private readonly hap: HAP;
  private readonly log: Logger;
  private readonly name: string;
  private readonly getStreamUrl: () => string;
  private readonly sessions: Map<string, { process?: ChildProcess; info?: SessionInfo }> = new Map();

  controller?: CameraController;

  constructor(hap: HAP, log: Logger, name: string, getStreamUrl: () => string) {
    this.hap = hap;
    this.log = log;
    this.name = name;
    this.getStreamUrl = getStreamUrl;
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

    const streamUrl = this.getStreamUrl();
    const ffmpegArgs = [
      '-i', streamUrl,
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

    this.sessions.set(sessionId, { process: undefined, info: sessionInfo });
    callback(undefined, response);
  }

  async handleStreamRequest(request: StreamingRequest, callback: StreamRequestCallback): Promise<void> {
    const sessionId = request.sessionID;

    if (request.type === StreamRequestTypes.START) {
      this.log.info(`[${this.name}] Starting video stream`);
      
      const streamUrl = this.getStreamUrl();
      const session = this.sessions.get(sessionId);
      
      if (!session || !session.info) {
        this.log.error(`[${this.name}] No session info found for ${sessionId}`);
        callback(new Error('No session info'));
        return;
      }

      const video = request.video;
      const info = session.info;
      const target = info.address;
      const videoPort = info.videoPort;
      const videoSrtpKey = info.videoSRTP.toString('base64');
      const videoSsrc = info.videoSSRC;

      const ffmpegArgs = [
        '-re',
        '-i', streamUrl,
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

      this.log.debug(`[${this.name}] FFmpeg command starting (URL redacted for security)`);

      const ffmpeg = spawn('ffmpeg', ffmpegArgs, { env: process.env });
      session.process = ffmpeg;

      ffmpeg.stderr.on('data', (data) => {
        // Only log errors, not all ffmpeg output
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
    } else if (request.type === StreamRequestTypes.STOP) {
      this.log.info(`[${this.name}] Stopping video stream`);
      const session = this.sessions.get(sessionId);
      if (session?.process) {
        // Graceful shutdown: SIGTERM first, then SIGKILL after 2s
        session.process.kill('SIGTERM');
        setTimeout(() => {
          if (session.process && !session.process.killed) {
            this.log.debug(`[${this.name}] FFmpeg didn't stop gracefully, forcing SIGKILL`);
            session.process.kill('SIGKILL');
          }
        }, 2000);
      }
      this.sessions.delete(sessionId);
      callback();
    } else if (request.type === StreamRequestTypes.RECONFIGURE) {
      this.log.debug(`[${this.name}] Reconfigure stream (not implemented)`);
      callback();
    }
  }

  destroy(): void {
    this.log.debug(`[${this.name}] Cleaning up streaming delegate`);
    
    // Stop all active sessions
    for (const [sessionId, session] of this.sessions.entries()) {
      if (session.process) {
        session.process.kill('SIGTERM');
        setTimeout(() => {
          if (session.process && !session.process.killed) {
            session.process.kill('SIGKILL');
          }
        }, 2000);
      }
    }
    
    this.sessions.clear();
  }
}
