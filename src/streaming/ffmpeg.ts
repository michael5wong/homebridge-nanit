import { ChildProcess, ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { createInterface } from 'readline';
import { VideoInfo } from 'homebridge';
import { Log } from '../log';

/** Give up on an input that stops delivering data for 10s (microseconds). */
const INPUT_TIMEOUT_US = '10000000';
const STOP_GRACE_MS = 2000;

const COMMON_ARGS = ['-hide_banner', '-loglevel', 'level+warning'];

export interface SrtpTarget {
  address: string;
  port: number;
  ssrc: number;
  /** base64 of SRTP key + salt, as ffmpeg's -srtp_out_params expects. */
  srtpParams: string;
}

export function inputArgs(inputUrl: string): string[] {
  return [...COMMON_ARGS, '-rw_timeout', INPUT_TIMEOUT_US, '-i', inputUrl];
}

/** ffmpeg output args sending the input's video to HomeKit over SRTP. */
export function videoOutputArgs(video: VideoInfo, target: SrtpTarget): string[] {
  return [
    '-map', '0:v',
    '-vcodec', 'libx264',
    '-preset', 'ultrafast',
    '-tune', 'zerolatency',
    '-r', String(video.fps),
    '-b:v', `${video.max_bit_rate}k`,
    '-bufsize', `${video.max_bit_rate * 2}k`,
    '-maxrate', `${video.max_bit_rate}k`,
    '-pix_fmt', 'yuv420p',
    '-an',
    ...srtpOutputArgs(target, video.pt, 1316),
  ];
}

/** The RTP muxer and SRTP destination that end every HomeKit output. */
export function srtpOutputArgs(target: SrtpTarget, payloadType: number, packetSize: number): string[] {
  return [
    '-payload_type', String(payloadType),
    '-ssrc', String(target.ssrc),
    '-f', 'rtp',
    '-srtp_out_suite', 'AES_CM_128_HMAC_SHA1_80',
    '-srtp_out_params', target.srtpParams,
    `srtp://${target.address}:${target.port}?rtcpport=${target.port}&pkt_size=${packetSize}`,
  ];
}

/**
 * Spawn ffmpeg with stderr routed to the log. Lines ffmpeg tags as
 * error/fatal/panic are logged as errors, everything else at debug.
 */
export function spawnFfmpeg(args: string[], log: Log): ChildProcessWithoutNullStreams {
  const proc = spawn('ffmpeg', args);
  createInterface({ input: proc.stderr }).on('line', (line) => {
    const message = `FFmpeg: ${redactUrls(line)}`;
    if (/\[(error|fatal|panic)\]/.test(line)) {
      log.error(message);
    } else {
      log.debug(message);
    }
  });
  proc.on('error', (error) => log.error(`FFmpeg failed to start: ${error.message}`));
  return proc;
}

export function captureSnapshot(inputUrl: string, log: Log): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const proc = spawnFfmpeg(
      [...inputArgs(inputUrl), '-frames:v', '1', '-update', '1', '-f', 'image2', '-'],
      log,
    );
    const chunks: Buffer[] = [];
    proc.stdout.on('data', (chunk: Buffer) => chunks.push(chunk));
    proc.on('error', reject);
    proc.on('close', () => {
      const image = Buffer.concat(chunks);
      if (image.length > 0) {
        resolve(image);
      } else {
        reject(new Error('ffmpeg produced no snapshot'));
      }
    });
  });
}

/** SIGTERM, escalating to SIGKILL if the process hasn't exited after a grace period. */
export function stopProcess(proc: ChildProcess): void {
  const running = () => proc.exitCode === null && proc.signalCode === null;
  if (!running()) {
    return;
  }
  proc.kill('SIGTERM');
  setTimeout(() => {
    if (running()) {
      proc.kill('SIGKILL');
    }
  }, STOP_GRACE_MS).unref();
}

/**
 * Hide everything after the host in RTMP(S) URLs: cloud URLs embed the access
 * token and local ones the stream key.
 */
export function redactUrls(text: string): string {
  return text.replace(/(rtmps?:\/\/[^/\s]+)\/\S*/g, '$1/[redacted]');
}
