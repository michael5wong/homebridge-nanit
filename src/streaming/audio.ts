import { execFile } from 'child_process';
import { promisify } from 'util';
import {
  AudioInfo,
  AudioStreamingCodec,
  AudioStreamingCodecType,
  AudioStreamingSamplerate,
} from 'homebridge';
import { Log, errorMessage } from '../log';
import { SrtpTarget, srtpOutputArgs } from './ffmpeg';

/** A HomeKit audio codec and the ffmpeg encoder that produces it. */
export interface AudioEncoder {
  readonly codec: AudioStreamingCodecType;
  readonly label: string;
  /** Name in `ffmpeg -encoders`. */
  readonly encoder: string;
  readonly samplerates: readonly AudioStreamingSamplerate[];
  readonly encoderArgs: readonly string[];
}

/** In order of preference. These are the only two codecs HomeKit accepts for live audio. */
const AUDIO_ENCODERS: readonly AudioEncoder[] = [
  {
    codec: AudioStreamingCodecType.OPUS,
    label: 'Opus',
    encoder: 'libopus',
    // Apple requires 16 and 24 kHz for Opus.
    samplerates: [AudioStreamingSamplerate.KHZ_16, AudioStreamingSamplerate.KHZ_24],
    encoderArgs: ['-application', 'lowdelay'],
  },
  {
    codec: AudioStreamingCodecType.AAC_ELD,
    label: 'AAC-ELD',
    encoder: 'libfdk_aac',
    samplerates: [AudioStreamingSamplerate.KHZ_16],
    encoderArgs: ['-profile:a', 'aac_eld'],
  },
];

/** The audio encoders the installed ffmpeg provides. Empty if there are none, or ffmpeg can't be run. */
export async function detectAudioEncoders(log: Log): Promise<AudioEncoder[]> {
  let output: string;
  try {
    ({ stdout: output } = await promisify(execFile)('ffmpeg', ['-hide_banner', '-encoders']));
  } catch (error) {
    log.warn(`Could not list ffmpeg encoders (${errorMessage(error)}); streaming video without audio`);
    return [];
  }

  // Lines look like " A....D libopus              libopus Opus (codec opus)".
  const installed = new Set(output.split('\n').map((line) => /^\s*A\S*\s+(\S+)/.exec(line)?.[1]));
  const encoders = AUDIO_ENCODERS.filter(({ encoder }) => installed.has(encoder));
  if (encoders.length === 0) {
    const names = AUDIO_ENCODERS.map(({ encoder }) => encoder).join(' or ');
    log.warn(`ffmpeg has no HomeKit audio encoder (${names}); streaming video without audio`);
  } else {
    log.info(`Audio codecs: ${encoders.map(({ label }) => label).join(', ')}`);
  }
  return encoders;
}

/** What to advertise to HomeKit. A fresh array each call: HAP mutates the list it's given. */
export function advertisedCodecs(encoders: readonly AudioEncoder[]): AudioStreamingCodec[] {
  return encoders.map(({ codec, samplerates }) => ({ type: codec, samplerate: [...samplerates] }));
}

/** ffmpeg output args sending the input's first audio track to HomeKit over SRTP. */
export function audioOutputArgs(encoder: AudioEncoder, audio: AudioInfo, target: SrtpTarget): string[] {
  return [
    '-map', '0:a:0',
    '-acodec', encoder.encoder,
    ...encoder.encoderArgs,
    '-flags', '+global_header',
    '-ar', `${audio.sample_rate}k`,
    '-b:a', `${audio.max_bit_rate}k`,
    '-ac', String(audio.channel),
    ...srtpOutputArgs(target, audio.pt, 188),
  ];
}
