import { randomBytes } from 'crypto';
import { setTimeout as sleep } from 'timers/promises';
import { Log, errorMessage } from '../log';
import { redactUrls } from './ffmpeg';
import { RtmpRelay } from './rtmpRelay';
import { CameraSignaling } from './signaling';

const PUBLISH_TIMEOUT_MS = 12_000;
/** How long the camera gets to hang up after acknowledging STOPPED before we cut it off. */
const UNPUBLISH_GRACE_MS = 5_000;

/** A live input ffmpeg can read from. `release()` must be called exactly once when done. */
export interface VideoFeed {
  readonly label: string;
  readonly url: string;
  release(): void;
}

/** Somewhere a camera's video can come from. `open` rejects with `signal.reason` when aborted. */
export interface VideoSource {
  open(signal: AbortSignal): Promise<VideoFeed>;
}

export function cloudSource(url: () => string): VideoSource {
  return {
    open: async () => ({ label: 'cloud', url: url(), release: () => undefined }),
  };
}

export function withFallback(primary: VideoSource, fallback: VideoSource, log: Log): VideoSource {
  return {
    open: async (signal) => {
      try {
        return await primary.open(signal);
      } catch (error) {
        if (signal.aborted) {
          throw error;
        }
        log.warn(`Local stream unavailable (${errorMessage(error)}), falling back to cloud`);
        return fallback.open(signal);
      }
    },
  };
}

interface Lease {
  /** Resolves to the RTMP URL once the camera is publishing. */
  url: Promise<string>;
  refs: number;
  /** Aborting ends the feed: cancels startup, or stops a running publish. */
  lifetime: AbortController;
}

/**
 * The camera publishes RTMP straight to our relay over the LAN; Nanit's
 * signaling channel tells it where. The camera has a single publish slot, so
 * concurrent viewers share one feed, which ends when the last one leaves,
 * including while it is still starting.
 */
export class LocalSource implements VideoSource {
  private current?: Lease;

  constructor(
    private readonly relay: RtmpRelay,
    private readonly cameraUid: string,
    private readonly accessToken: () => string,
    private readonly log: Log,
  ) {}

  async open(signal: AbortSignal): Promise<VideoFeed> {
    const lease = this.current ?? this.newLease();
    lease.refs++;

    let url: string;
    try {
      url = await untilAborted(lease.url, signal);
    } catch (error) {
      this.leave(lease);
      throw error;
    }

    let released = false;
    return {
      label: 'local',
      url,
      release: () => {
        if (!released) {
          released = true;
          this.leave(lease);
        }
      },
    };
  }

  private newLease(): Lease {
    const lifetime = new AbortController();
    const lease: Lease = { refs: 0, lifetime, url: this.startFeed(lifetime.signal, () => this.retire(lease)) };
    lease.url.catch(() => this.retire(lease));
    this.current = lease;
    return lease;
  }

  private leave(lease: Lease): void {
    if (--lease.refs === 0) {
      this.retire(lease);
      lease.lifetime.abort(new Error('no viewers left'));
    }
  }

  /** Stop handing this lease to new viewers; existing holders keep it until they leave. */
  private retire(lease: Lease): void {
    if (this.current === lease) {
      this.current = undefined;
    }
  }

  /** Resolves with the URL once the camera publishes. The feed runs until `signal` aborts. */
  private async startFeed(signal: AbortSignal, onEnded: () => void): Promise<string> {
    this.relay.start();
    // Alphanumeric only: camera firmware is picky about stream path characters.
    const streamPath = `/live/nanit_${randomBytes(8).toString('hex')}`;
    const url = this.relay.urlFor(streamPath);

    const signaling = await CameraSignaling.connect(this.cameraUid, this.accessToken(), this.log, signal);
    signal.addEventListener('abort', () => void this.stopFeed(signaling, streamPath), { once: true });
    try {
      this.log.debug(`Asking camera to publish to ${redactUrls(url)}`);
      await signaling.startStreaming(url, signal);
      await this.relay.waitForPublish(streamPath, PUBLISH_TIMEOUT_MS, signal);
    } catch (error) {
      void this.stopFeed(signaling, streamPath);
      throw error;
    }

    this.log.info('Camera is publishing to the local RTMP server');
    signaling.onClose(onEnded);
    this.relay.onUnpublish(streamPath, onEnded);
    return url;
  }

  /**
   * Ask the camera to stop, and only cut its RTMP connection if it keeps
   * publishing anyway: dropping it first makes the camera reconnect.
   */
  private async stopFeed(signaling: CameraSignaling, streamPath: string): Promise<void> {
    await signaling.close();
    if (this.relay.isPublishing(streamPath)) {
      await sleep(UNPUBLISH_GRACE_MS);
    }
    if (this.relay.isPublishing(streamPath)) {
      this.log.warn('Camera kept publishing after being told to stop; disconnecting it');
      this.relay.disconnect(streamPath);
    }
  }
}

/** `promise`, or a rejection with `signal.reason` if the signal aborts first. */
function untilAborted<T>(promise: Promise<T>, signal: AbortSignal): Promise<T> {
  if (signal.aborted) {
    return Promise.reject(signal.reason);
  }
  return new Promise((resolve, reject) => {
    const onAbort = () => reject(signal.reason);
    signal.addEventListener('abort', onAbort, { once: true });
    promise.then(resolve, reject).finally(() => signal.removeEventListener('abort', onAbort));
  });
}
