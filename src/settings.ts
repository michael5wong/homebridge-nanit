/**
 * This is the name of the platform that users will use to register the plugin in the Homebridge config.json
 */
export const PLATFORM_NAME = 'NanitCamera';

/**
 * This must match the name of your plugin as defined the package.json
 */
export const PLUGIN_NAME = 'homebridge-nanit';

/**
 * Platform configuration interface
 */
export interface NanitPlatformConfig {
  platform: string;
  email: string;
  password: string;
  mfa_code?: string;
  refreshInterval?: number; // seconds between baby list refresh (default: 300)
}

/**
 * Nanit API types
 */
export interface NanitAuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  mfa_token?: string;
}

export interface NanitBaby {
  uid: string;
  first_name: string;
  last_name?: string;
  gender?: string;
  camera?: NanitCamera;
}

export interface NanitCamera {
  uid: string;
  private_address?: string;
  stream_url?: string;
  local_ip?: string;
  temperature?: number;
  humidity?: number;
}

export interface NanitBabiesResponse {
  babies: NanitBaby[];
}
