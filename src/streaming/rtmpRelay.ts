import { EventEmitter } from 'events';
import * as os from 'os';
import NodeMediaServer from 'node-media-server';
import nmsLogger from 'node-media-server/src/core/logger.js';
import { Log } from '../log';

/**
 * The RTMP server Nanit cameras publish to in local mode.
 *
 * node-media-server v4 keeps its config and event emitter in module-level
 * singletons, so there is exactly one server per process and cameras are told
 * apart by stream path. v4 also cannot be stopped: once started, the server
 * lives until Homebridge exits.
 */
export class RtmpRelay {
  private started = false;
  private readonly publishing = new Set<string>();
  private readonly events = new EventEmitter().setMaxListeners(0);

  constructor(
    private readonly log: Log,
    private readonly port: number,
    private readonly hostAddress?: string,
  ) {}

  /** The URL a camera on the LAN should publish `streamPath` to. */
  urlFor(streamPath: string): string {
    return `rtmp://${this.hostAddress ?? detectHostAddress()}:${this.port}${streamPath}`;
  }

  start(): void {
    if (this.started) {
      return;
    }
    this.started = true;

    const server = new NodeMediaServer({
      rtmp: { port: this.port, chunk_size: 60000, gop_cache: true, ping: 30, ping_timeout: 60 },
    });
    // The constructor forces NMS's own console logger to debug level.
    nmsLogger.level = 'error';

    server.on('postPublish', ({ streamPath }) => {
      this.log.debug(`RTMP publisher connected: ${streamPath}`);
      this.publishing.add(streamPath);
      this.events.emit(`publish:${streamPath}`);
    });
    server.on('donePublish', ({ streamPath }) => {
      this.log.debug(`RTMP publisher disconnected: ${streamPath}`);
      this.publishing.delete(streamPath);
      this.events.emit(`unpublish:${streamPath}`);
    });

    server.run();
    this.log.info(`Local RTMP server listening on port ${this.port}`);
  }

  /**
   * Resolve once something publishes to `streamPath`. Call this *before*
   * asking the camera to publish so the event can't be missed.
   */
  waitForPublish(streamPath: string, timeoutMs: number, signal: AbortSignal): Promise<void> {
    if (signal.aborted) {
      return Promise.reject(signal.reason);
    }
    if (this.publishing.has(streamPath)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const event = `publish:${streamPath}`;
      const finish = (error?: unknown) => {
        clearTimeout(timer);
        signal.removeEventListener('abort', onAbort);
        this.events.off(event, onPublish);
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      };
      const onPublish = () => finish();
      const onAbort = () => finish(signal.reason);
      const timer = setTimeout(
        () => finish(new Error(`camera did not publish to the local RTMP server within ${timeoutMs / 1000}s`)),
        timeoutMs,
      );

      this.events.on(event, onPublish);
      signal.addEventListener('abort', onAbort, { once: true });
    });
  }

  onUnpublish(streamPath: string, listener: () => void): void {
    this.events.once(`unpublish:${streamPath}`, listener);
  }
}

/** First non-internal IPv4 address. Set `localAddress` in config to override. */
function detectHostAddress(): string {
  for (const iface of Object.values(os.networkInterfaces()).flat()) {
    if (iface && iface.family === 'IPv4' && !iface.internal) {
      return iface.address;
    }
  }
  return '127.0.0.1';
}
