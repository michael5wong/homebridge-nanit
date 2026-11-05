import { randomBytes } from 'crypto';
import { Log, errorMessage } from '../log';
import { redactUrls } from './ffmpeg';
import { RtmpRelay } from './rtmpRelay';
import { CameraSignaling } from './signaling';

const PUBLISH_TIMEOUT_MS = 12_000;

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

interface LocalFeed {
  url: string;
  stop(): void;
}

interface Lease {
  feed: Promise<LocalFeed>;
  refs: number;
}

/**
 * The camera publishes RTMP straight to our relay over the LAN; Nanit's
 * signaling channel tells it where. The camera has a single publish slot, so
 * concurrent viewers share one feed, which is stopped when the last releases it.
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
    const lease = this.current ?? this.newLease(signal);
    lease.refs++;

    let feed: LocalFeed;
    try {
      feed = await lease.feed;
    } catch (error) {
      lease.refs--;
      throw error;
    }

    let released = false;
    return {
      label: 'local',
      url: feed.url,
      release: () => {
        if (released) {
          return;
        }
        released = true;
        if (--lease.refs === 0) {
          this.retire(lease);
          feed.stop();
        }
      },
    };
  }

  private newLease(signal: AbortSignal): Lease {
    const lease: Lease = { refs: 0, feed: this.startFeed(signal, () => this.retire(lease)) };
    lease.feed.catch(() => this.retire(lease));
    this.current = lease;
    return lease;
  }

  /** Stop handing this lease to new viewers; existing holders keep it until release. */
  private retire(lease: Lease): void {
    if (this.current === lease) {
      this.current = undefined;
    }
  }

  private async startFeed(signal: AbortSignal, onEnded: () => void): Promise<LocalFeed> {
    this.relay.start();
    // Alphanumeric only: camera firmware is picky about stream path characters.
    const streamPath = `/live/nanit_${randomBytes(8).toString('hex')}`;
    const url = this.relay.urlFor(streamPath);

    const signaling = await CameraSignaling.connect(this.cameraUid, this.accessToken(), this.log, signal);
    try {
      const published = this.relay.waitForPublish(streamPath, PUBLISH_TIMEOUT_MS, signal);
      this.log.debug(`Asking camera to publish to ${redactUrls(url)}`);
      signaling.startStreaming(url);
      await published;
    } catch (error) {
      signaling.close();
      throw error;
    }

    this.log.info('Camera is publishing to the local RTMP server');
    signaling.onClose(onEnded);
    this.relay.onUnpublish(streamPath, onEnded);
    return { url, stop: () => signaling.close() };
  }
}
