import WebSocket from 'ws';
import { SignalingResponse, StreamingStatus, decodeResponse, encodePutStreaming } from './protocol';
import { Log, errorMessage } from '../log';

const HANDSHAKE_TIMEOUT_MS = 10_000;
const RESPONSE_TIMEOUT_MS = 10_000;
/** How long close() waits for the camera to acknowledge STOPPED before hanging up. */
const STOP_ACK_TIMEOUT_MS = 2_000;

interface PendingRequest {
  resolve(response: SignalingResponse): void;
  reject(error: unknown): void;
}

/**
 * Nanit's cloud-relayed control channel to a camera. In local mode it is only
 * used to tell the camera where to publish RTMP, and when to stop.
 */
export class CameraSignaling {
  private nextRequestId = 1;
  private closed?: Promise<void>;
  /** Where the camera was asked to publish; STOPPED must name the same URL. */
  private rtmpUrl?: string;
  private readonly pending = new Map<number, PendingRequest>();

  private constructor(private readonly ws: WebSocket, log: Log) {
    ws.on('message', (data: Buffer) => {
      let response: SignalingResponse | undefined;
      try {
        response = decodeResponse(data);
      } catch (error) {
        log.debug(`Undecodable signaling message: ${errorMessage(error)}`);
        return;
      }
      if (response) {
        log.debug(`Signaling response ${response.requestId}: ${response.statusCode} ${response.statusMessage ?? ''}`);
        this.pending.get(response.requestId)?.resolve(response);
      }
    });
    ws.on('close', () => {
      log.debug('Signaling closed');
      for (const request of this.pending.values()) {
        request.reject(new Error('signaling connection closed'));
      }
    });
  }

  static connect(cameraUid: string, accessToken: string, log: Log, signal: AbortSignal): Promise<CameraSignaling> {
    if (signal.aborted) {
      return Promise.reject(signal.reason);
    }

    return new Promise((resolve, reject) => {
      log.debug(`Connecting to Nanit signaling for camera ${cameraUid}`);
      const ws = new WebSocket(`wss://api.nanit.com/focus/cameras/${cameraUid}/user_connect`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        handshakeTimeout: HANDSHAKE_TIMEOUT_MS,
      });
      const signaling = new CameraSignaling(ws, log);

      const onAbort = () => {
        ws.terminate();
        reject(signal.reason);
      };
      signal.addEventListener('abort', onAbort, { once: true });

      ws.on('open', () => {
        signal.removeEventListener('abort', onAbort);
        resolve(signaling);
      });
      // Must stay attached for the socket's lifetime: an unhandled 'error' crashes the process.
      ws.on('error', (error) => {
        signal.removeEventListener('abort', onAbort);
        log.debug(`Signaling error: ${error.message}`);
        reject(error);
      });
    });
  }

  /** Ask the camera to publish to `rtmpUrl`. Rejects if the camera declines or doesn't answer. */
  async startStreaming(rtmpUrl: string, signal: AbortSignal): Promise<void> {
    this.rtmpUrl = rtmpUrl;
    const { statusCode, statusMessage } = await this.request(StreamingStatus.STARTED, rtmpUrl, signal);
    if (statusCode < 200 || statusCode >= 300) {
      throw new Error(`camera declined to stream (${statusCode} ${statusMessage ?? ''})`);
    }
  }

  /**
   * Ask the camera to stop publishing (if it was asked to start) and close
   * once it acknowledges, or doesn't within a couple of seconds. Resolves when
   * the stop is settled. Safe to call more than once.
   */
  close(): Promise<void> {
    if (!this.closed) {
      this.closed = this.stopAndClose();
    }
    return this.closed;
  }

  private async stopAndClose(): Promise<void> {
    // The camera matches STOPPED to a stream by URL: an empty one is acknowledged but stops nothing.
    if (this.rtmpUrl !== undefined && this.ws.readyState === WebSocket.OPEN) {
      await this.request(StreamingStatus.STOPPED, this.rtmpUrl, AbortSignal.timeout(STOP_ACK_TIMEOUT_MS)).catch(() => undefined);
    }
    this.ws.close();
  }

  onClose(listener: () => void): void {
    this.ws.once('close', listener);
  }

  private request(status: StreamingStatus, rtmpUrl: string, signal: AbortSignal): Promise<SignalingResponse> {
    if (signal.aborted) {
      return Promise.reject(signal.reason);
    }

    const id = this.nextRequestId++;
    return new Promise((resolve, reject) => {
      const finish = () => {
        clearTimeout(timer);
        signal.removeEventListener('abort', onAbort);
        this.pending.delete(id);
      };
      const onAbort = () => {
        finish();
        reject(signal.reason);
      };
      const timer = setTimeout(() => {
        finish();
        reject(new Error(`camera did not answer within ${RESPONSE_TIMEOUT_MS / 1000}s`));
      }, RESPONSE_TIMEOUT_MS);

      this.pending.set(id, {
        resolve: (response) => {
          finish();
          resolve(response);
        },
        reject: (error) => {
          finish();
          reject(error);
        },
      });
      signal.addEventListener('abort', onAbort, { once: true });
      this.ws.send(encodePutStreaming(id, status, rtmpUrl));
    });
  }
}
