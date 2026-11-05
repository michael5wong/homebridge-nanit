import { ChildProcess } from 'child_process';
import {
  CameraController,
  CameraControllerOptions,
  CameraStreamingDelegate,
  HAP,
  PrepareStreamCallback,
  PrepareStreamRequest,
  SnapshotRequest,
  SnapshotRequestCallback,
  StreamingRequest,
  StreamRequestCallback,
  StreamRequestTypes,
  VideoInfo,
} from 'homebridge';
import { Log, errorMessage } from '../log';
import { SrtpTarget, captureSnapshot, spawnFfmpeg, stopProcess, streamArgs } from './ffmpeg';
import { VideoFeed, VideoSource } from './sources';

interface Session {
  target: SrtpTarget;
  abort: AbortController;
  feed?: VideoFeed;
  ffmpeg?: ChildProcess;
}

export class StreamingDelegate implements CameraStreamingDelegate {
  readonly controller: CameraController;
  private readonly sessions = new Map<string, Session>();

  constructor(
    private readonly hap: HAP,
    private readonly log: Log,
    private readonly source: VideoSource,
    private readonly snapshotUrl: () => string,
  ) {
    this.controller = new hap.CameraController(controllerOptions(hap, this));
  }

  async handleSnapshotRequest(request: SnapshotRequest, callback: SnapshotRequestCallback): Promise<void> {
    this.log.debug(`Snapshot requested (${request.width}x${request.height})`);
    let image: Buffer;
    try {
      image = await captureSnapshot(this.snapshotUrl(), this.log);
    } catch (error) {
      this.log.error(`Snapshot failed: ${errorMessage(error)}`);
      callback(error as Error);
      return;
    }
    callback(undefined, image);
  }

  prepareStream(request: PrepareStreamRequest, callback: PrepareStreamCallback): void {
    const { video, audio } = request;
    const ssrc = this.hap.CameraController.generateSynchronisationSource();

    this.sessions.set(request.sessionID, {
      target: {
        address: request.targetAddress,
        port: video.port,
        ssrc,
        srtpParams: Buffer.concat([video.srtp_key, video.srtp_salt]).toString('base64'),
      },
      abort: new AbortController(),
    });

    callback(undefined, {
      video: { port: video.port, ssrc, srtp_key: video.srtp_key, srtp_salt: video.srtp_salt },
      // Audio is advertised but not streamed.
      audio: {
        port: audio.port,
        ssrc: this.hap.CameraController.generateSynchronisationSource(),
        srtp_key: audio.srtp_key,
        srtp_salt: audio.srtp_salt,
      },
    });
  }

  async handleStreamRequest(request: StreamingRequest, callback: StreamRequestCallback): Promise<void> {
    const id = request.sessionID;
    switch (request.type) {
      case StreamRequestTypes.START: {
        const session = this.sessions.get(id);
        try {
          if (!session) {
            throw new Error(`no prepared session ${id}`);
          }
          await this.start(id, session, request.video);
          callback();
        } catch (error) {
          if (session?.abort.signal.aborted) {
            // Stopped while starting; STOP has already cleaned up.
            callback();
            return;
          }
          this.log.error(`Failed to start stream: ${errorMessage(error)}`);
          this.stop(id);
          callback(error as Error);
        }
        return;
      }
      case StreamRequestTypes.RECONFIGURE:
        this.log.debug('Ignoring stream reconfigure request');
        callback();
        return;
      case StreamRequestTypes.STOP:
        this.log.info('Stopping stream');
        this.stop(id);
        callback();
        return;
    }
  }

  destroy(): void {
    for (const id of [...this.sessions.keys()]) {
      this.stop(id);
    }
  }

  private async start(id: string, session: Session, video: VideoInfo): Promise<void> {
    this.log.info('Starting stream');
    const { signal } = session.abort;
    const feed = await this.source.open(signal);
    if (signal.aborted) {
      feed.release();
      signal.throwIfAborted();
    }
    session.feed = feed;

    this.log.info(`Streaming from ${feed.label} source`);
    const ffmpeg = spawnFfmpeg(streamArgs(feed.url, video, session.target), this.log);
    session.ffmpeg = ffmpeg;

    ffmpeg.on('close', (code, signal) => {
      this.log.info(`Stream ended (ffmpeg exit=${code}, signal=${signal ?? 'none'})`);
      // If ffmpeg died on its own, tell HomeKit rather than leave a frozen stream.
      if (this.sessions.get(id) === session) {
        this.stop(id);
        this.controller.forceStopStreamingSession(id);
      }
    });
  }

  /** Tear down a session in any state: preparing, starting, or streaming. */
  private stop(id: string): void {
    const session = this.sessions.get(id);
    if (!session) {
      return;
    }
    this.sessions.delete(id);
    session.abort.abort(new Error('stream stopped'));
    if (session.ffmpeg) {
      stopProcess(session.ffmpeg);
    }
    session.feed?.release();
  }
}

function controllerOptions(hap: HAP, delegate: CameraStreamingDelegate): CameraControllerOptions {
  return {
    cameraStreamCount: 2,
    delegate,
    streamingOptions: {
      supportedCryptoSuites: [hap.SRTPCryptoSuites.AES_CM_128_HMAC_SHA1_80],
      video: {
        resolutions: [
          [1920, 1080, 30],
          [1280, 720, 30],
          [640, 360, 30],
          [320, 240, 15],
        ],
        codec: {
          profiles: [hap.H264Profile.BASELINE, hap.H264Profile.MAIN, hap.H264Profile.HIGH],
          levels: [hap.H264Level.LEVEL3_1, hap.H264Level.LEVEL3_2, hap.H264Level.LEVEL4_0],
        },
      },
      audio: {
        codecs: [{ type: hap.AudioStreamingCodecType.AAC_ELD, samplerate: hap.AudioStreamingSamplerate.KHZ_16 }],
      },
    },
  };
}
