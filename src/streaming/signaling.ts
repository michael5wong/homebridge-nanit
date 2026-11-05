import WebSocket from 'ws';
import { StreamingStatus, decodeResponse, encodePutStreaming } from './protocol';
import { Log, errorMessage } from '../log';

const HANDSHAKE_TIMEOUT_MS = 10_000;

/**
 * Nanit's cloud-relayed control channel to a camera. In local mode it is only
 * used to tell the camera where to publish RTMP, and when to stop.
 */
export class CameraSignaling {
  private nextRequestId = 1;

  private constructor(private readonly ws: WebSocket) {}

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

      const onAbort = () => {
        ws.terminate();
        reject(signal.reason);
      };
      signal.addEventListener('abort', onAbort, { once: true });

      ws.on('open', () => {
        signal.removeEventListener('abort', onAbort);
        resolve(new CameraSignaling(ws));
      });
      // Must stay attached for the socket's lifetime: an unhandled 'error' crashes the process.
      ws.on('error', (error) => {
        signal.removeEventListener('abort', onAbort);
        log.debug(`Signaling error: ${error.message}`);
        reject(error);
      });
      ws.on('close', () => log.debug('Signaling closed'));
      ws.on('message', (data: Buffer) => {
        try {
          const response = decodeResponse(data);
          if (response) {
            log.debug(`Signaling response ${response.requestId}: ${response.statusCode} ${response.statusMessage ?? ''}`);
          }
        } catch (error) {
          log.debug(`Undecodable signaling message: ${errorMessage(error)}`);
        }
      });
    });
  }

  startStreaming(rtmpUrl: string): void {
    this.ws.send(encodePutStreaming(this.nextRequestId++, StreamingStatus.STARTED, rtmpUrl));
  }

  /** Ask the camera to stop publishing, then close. Safe to call more than once. */
  close(): void {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(encodePutStreaming(this.nextRequestId++, StreamingStatus.STOPPED, ''));
    }
    this.ws.close();
  }

  onClose(listener: () => void): void {
    this.ws.once('close', listener);
  }
}
