import {
  API,
  DynamicPlatformPlugin,
  Logger,
  PlatformAccessory,
  PlatformConfig,
} from 'homebridge';
import fetch from 'node-fetch';
import {
  PLATFORM_NAME,
  PLUGIN_NAME,
  NanitPlatformConfig,
  NanitAuthResponse,
  NanitBabiesResponse,
  NanitBaby,
} from './settings';
import { NanitCamera } from './camera';

export class NanitPlatform implements DynamicPlatformPlugin {
  public readonly log: Logger;
  public readonly config: NanitPlatformConfig;
  public readonly api: API;

  private readonly accessories: PlatformAccessory[] = [];
  private readonly cameras: Map<string, NanitCamera> = new Map();

  private accessToken?: string;
  private refreshToken?: string;
  private tokenExpiry?: number;
  private refreshInterval?: NodeJS.Timeout;
  private discoveryInterval?: NodeJS.Timeout;

  constructor(log: Logger, config: PlatformConfig, api: API) {
    this.log = log;
    this.config = config as NanitPlatformConfig;
    this.api = api;

    // Validate config
    if (!this.config.email || !this.config.password) {
      this.log.error('Email and password are required in config');
      return;
    }

    this.log.info('Initializing Nanit platform');

    // Wait for homebridge to finish loading
    this.api.on('didFinishLaunching', () => {
      this.log.debug('Finished launching, starting authentication');
      this.authenticate().then(() => {
        this.discoverCameras();
        this.startRefreshIntervals();
      });
    });
  }

  configureAccessory(accessory: PlatformAccessory): void {
    this.log.debug('Loading accessory from cache:', accessory.displayName);
    this.accessories.push(accessory);
  }

  async authenticate(): Promise<void> {
    try {
      // Try refresh token from config first, then storage
      const configRefreshToken = (this.config as any).refreshToken;
      const storage = this.api.hap.HAPStorage.storage();
      const storedToken = configRefreshToken || storage.getItemSync(`nanit_refresh_${this.config.email}`);
      
      if (storedToken && typeof storedToken === 'string') {
        this.log.debug('Found stored refresh token, attempting refresh');
        try {
          await this.refreshAccessToken(storedToken);
          return;
        } catch (error) {
          this.log.warn('Stored token refresh failed, performing fresh login');
        }
      }

      // Fresh login
      this.log.info('Logging in to Nanit');
      const loginBody: any = {
        email: this.config.email,
        password: this.config.password,
      };

      // Add MFA code if provided
      if (this.config.mfa_code) {
        loginBody.mfa_code = this.config.mfa_code;
      }

      const response = await fetch('https://api.nanit.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'nanit-api-version': '1',
        },
        body: JSON.stringify(loginBody),
      });

      if (response.status === 482) {
        // MFA required
        const data = await response.json() as any;
        this.log.error('MFA required. Please add "mfa_code" to your config and restart Homebridge.');
        this.log.error('MFA token:', data.mfa_token);
        throw new Error('MFA required');
      }

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Login failed: ${response.status} ${text}`);
      }

      const data = await response.json() as NanitAuthResponse;
      this.accessToken = data.access_token;
      this.refreshToken = data.refresh_token;
      this.tokenExpiry = Date.now() + 50 * 60 * 1000; // 50 minutes

      // Store refresh token
      if (this.refreshToken) {
        const storage = this.api.hap.HAPStorage.storage();
        storage.setItemSync(`nanit_refresh_${this.config.email}`, this.refreshToken);
      }

      this.log.info('Successfully authenticated with Nanit');
    } catch (error) {
      this.log.error('Authentication failed:', error);
      throw error;
    }
  }

  async refreshAccessToken(token?: string): Promise<void> {
    const refreshToken = token || this.refreshToken;
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    this.log.debug('Refreshing access token');
    const response = await fetch('https://api.nanit.com/tokens/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'nanit-api-version': '1',
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Token refresh failed: ${response.status} ${text}`);
    }

    const data = await response.json() as NanitAuthResponse;
    this.accessToken = data.access_token;
    this.refreshToken = data.refresh_token;
    this.tokenExpiry = Date.now() + 50 * 60 * 1000; // 50 minutes

    // Store new refresh token
    if (this.refreshToken) {
      const storage = this.api.hap.HAPStorage.storage();
      storage.setItemSync(`nanit_refresh_${this.config.email}`, this.refreshToken);
    }

    this.log.debug('Access token refreshed');
  }

  async discoverCameras(): Promise<void> {
    try {
      if (!this.accessToken) {
        throw new Error('Not authenticated');
      }

      this.log.info('Discovering cameras');
      const response = await fetch('https://api.nanit.com/babies', {
        headers: {
          'Authorization': this.accessToken,
          'nanit-api-version': '1',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to get babies: ${response.status}`);
      }

      const data = await response.json() as NanitBabiesResponse;
      this.log.info(`Found ${data.babies.length} camera(s)`);

      for (const baby of data.babies) {
        this.addOrUpdateCamera(baby);
      }

      // Remove cameras that no longer exist
      for (const accessory of this.accessories) {
        const exists = data.babies.some(b => b.uid === accessory.context.babyUid);
        if (!exists) {
          this.log.info('Removing camera:', accessory.displayName);
          this.api.unregisterPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
          this.cameras.delete(accessory.context.babyUid);
        }
      }
    } catch (error) {
      this.log.error('Failed to discover cameras:', error);
    }
  }

  addOrUpdateCamera(baby: NanitBaby): void {
    const uuid = this.api.hap.uuid.generate(baby.uid);
    const existingAccessory = this.accessories.find(acc => acc.UUID === uuid);

    if (existingAccessory) {
      // Update existing accessory (including name fix)
      const correctName = baby.name || baby.first_name || 'Nanit Camera';
      this.log.info('Updating existing accessory:', correctName);
      existingAccessory.displayName = correctName;
      existingAccessory.context.baby = baby;
      existingAccessory
        .getService(this.api.hap.Service.AccessoryInformation)
        ?.setCharacteristic(this.api.hap.Characteristic.Name, correctName);
      this.api.updatePlatformAccessories([existingAccessory]);

      // Re-create camera handler if not exists
      if (!this.cameras.has(baby.uid)) {
        const camera = new NanitCamera(this, existingAccessory, baby);
        this.cameras.set(baby.uid, camera);
      } else {
        const camera = this.cameras.get(baby.uid);
        if (camera && baby.camera) {
          camera.updateSensors(baby.camera.temperature, baby.camera.humidity);
        }
      }
    } else {
      // Create new accessory
      const name = baby.name || baby.first_name || 'Nanit Camera';
      this.log.info('Adding new camera:', name);

      const accessory = new this.api.platformAccessory(name, uuid);
      accessory.context.baby = baby;
      accessory.context.babyUid = baby.uid;

      const camera = new NanitCamera(this, accessory, baby);
      this.cameras.set(baby.uid, camera);
      this.accessories.push(accessory);

      this.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
    }
  }

  startRefreshIntervals(): void {
    // Token refresh every 50 minutes
    this.refreshInterval = setInterval(() => {
      this.log.debug('Auto-refreshing token');
      this.refreshAccessToken().catch(err => {
        this.log.error('Auto token refresh failed:', err);
      });
    }, 50 * 60 * 1000);

    // Camera discovery refresh
    const discoveryInterval = (this.config.refreshInterval || 300) * 1000;
    this.discoveryInterval = setInterval(() => {
      this.log.debug('Auto-discovering cameras');
      this.discoverCameras();
    }, discoveryInterval);
  }

  getAccessToken(): string {
    if (!this.accessToken) {
      throw new Error('Not authenticated');
    }
    return this.accessToken;
  }
}
