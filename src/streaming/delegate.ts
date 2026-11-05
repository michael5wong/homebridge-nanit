import { ChildProcess } from 'child_process';
import {
  AudioInfo,
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
import { AudioEncoder, advertisedCodecs, audioOutputArgs } from './audio';
import { SrtpTarget, captureSnapshot, inputArgs, spawnFfmpeg, stopProcess, videoOutputArgs } from './ffmpeg';
import { VideoFeed, VideoSource } from './sources';

interface Session {
  video: SrtpTarget;
  audio: SrtpTarget;
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
    /** Empty when audio is disabled or ffmpeg has no usable encoder. */
    private readonly audioEncoders: readonly AudioEncoder[],
  ) {
    this.controller = new hap.CameraController(controllerOptions(hap, this, audioEncoders));
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
    const { targetAddress, video, audio } = request;
    const session: Session = {
      video: this.srtpTarget(targetAddress, video),
      audio: this.srtpTarget(targetAddress, audio),
      abort: new AbortController(),
    };
    this.sessions.set(request.sessionID, session);

    callback(undefined, {
      video: { port: video.port, ssrc: session.video.ssrc, srtp_key: video.srtp_key, srtp_salt: video.srtp_salt },
      audio: { port: audio.port, ssrc: session.audio.ssrc, srtp_key: audio.srtp_key, srtp_salt: audio.srtp_salt },
    });
  }

  async handleStreamRequest(request: StreamingRequest, callback: StreamRequestCallback): Promise<void> {
    const id = request.sessionID;
    switch (request.type) {
      case StreamRequestTypes.START: {
        const session = this.sessions.get(id);
        if (!session) {
          callback(new Error(`no prepared session ${id}`));
          return;
        }
        // Answer now: HAP fails the request after ~9s, and finding a source can
        // take longer (the local publish wait, then cloud fallback). HomeKit
        // keeps waiting for video; if starting fails, we end the session.
        callback();
        try {
          await this.start(id, session, request.video, request.audio);
        } catch (error) {
          if (!session.abort.signal.aborted) {
            this.log.error(`Failed to start stream: ${errorMessage(error)}`);
            this.endSession(id);
          }
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

  private srtpTarget(address: string, source: PrepareStreamRequest['video']): SrtpTarget {
    return {
      address,
      port: source.port,
      ssrc: this.hap.CameraController.generateSynchronisationSource(),
      srtpParams: Buffer.concat([source.srtp_key, source.srtp_salt]).toString('base64'),
    };
  }

  private async start(id: string, session: Session, video: VideoInfo, audio: AudioInfo): Promise<void> {
    this.log.info('Starting stream');
    const { signal } = session.abort;
    const feed = await this.source.open(signal);
    if (signal.aborted) {
      feed.release();
      signal.throwIfAborted();
    }
    session.feed = feed;

    this.log.info(`Streaming from ${feed.label} source`);
    const ffmpeg = spawnFfmpeg(
      [...inputArgs(feed.url), ...videoOutputArgs(video, session.video), ...this.audioArgs(audio, session.audio)],
      this.log,
    );
    session.ffmpeg = ffmpeg;

    ffmpeg.on('close', (code, signal) => {
      this.log.info(`Stream ended (ffmpeg exit=${code}, signal=${signal ?? 'none'})`);
      // If ffmpeg died on its own, tell HomeKit rather than leave a frozen stream.
      if (this.sessions.get(id) === session) {
        this.endSession(id);
      }
    });
  }

  /** End a session from our side: tear it down and tell HomeKit. */
  private endSession(id: string): void {
    this.stop(id);
    this.controller.forceStopStreamingSession(id);
  }

  /**
   * HomeKit always negotiates an audio codec; with nothing to offer, HAP
   * advertises a placeholder. Only stream audio in a codec we can encode.
   */
  private audioArgs(audio: AudioInfo, target: SrtpTarget): string[] {
    const encoder = this.audioEncoders.find(({ codec }) => codec === audio.codec);
    if (!encoder) {
      this.log.debug(`Not streaming audio (HomeKit selected ${audio.codec})`);
      return [];
    }
    this.log.info(`Streaming audio as ${encoder.label} ${audio.sample_rate} kHz`);
    return audioOutputArgs(encoder, audio, target);
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

function controllerOptions(
  hap: HAP,
  delegate: CameraStreamingDelegate,
  audioEncoders: readonly AudioEncoder[],
): CameraControllerOptions {
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
      audio: { codecs: advertisedCodecs(audioEncoders) },
    },
  };
}
