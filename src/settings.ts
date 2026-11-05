import { PlatformConfig } from 'homebridge';

/** The platform name users put in config.json. */
export const PLATFORM_NAME = 'NanitCamera';

/** Must match `name` in package.json. */
export const PLUGIN_NAME = 'homebridge-nanit';

export type StreamMode = 'cloud' | 'local' | 'auto';

export interface NanitPlatformConfig extends PlatformConfig {
  email: string;
  /** From the nanit-auth CLI. Only needed until the plugin has stored a rotated token. */
  refreshToken?: string;
  /** Seconds between camera list refreshes (default 300). */
  refreshInterval?: number;
  /** Default 'auto': local, falling back to cloud. */
  streamMode?: StreamMode;
  /** Port of the local RTMP server cameras publish to (default 1935). */
  localRtmpPort?: number;
  /** Host IP cameras should publish to; auto-detected if unset. */
  localAddress?: string;
  /** Stream camera audio to HomeKit (default true). Needs ffmpeg with libopus or libfdk_aac. */
  audio?: boolean;
}
