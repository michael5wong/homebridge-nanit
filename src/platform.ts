import * as path from 'path';
import {
  API,
  DynamicPlatformPlugin,
  Logger,
  PlatformAccessory,
  PlatformConfig,
} from 'homebridge';
import { PLATFORM_NAME, PLUGIN_NAME, NanitPlatformConfig } from './settings';
import { NanitCamera } from './camera';
import { NanitAuth } from './auth';
import { TokenStore } from './tokenStore';
import { NanitBaby, babyName, getBabies } from './nanitApi';
import { errorMessage, withPrefix } from './log';
import { RtmpRelay } from './streaming/rtmpRelay';

const TOKEN_REFRESH_MS = 50 * 60 * 1000;
const DEFAULT_DISCOVERY_INTERVAL_S = 300;

export class NanitPlatform implements DynamicPlatformPlugin {
  readonly config: NanitPlatformConfig;
  readonly auth: NanitAuth;
  /** Started lazily, the first time a camera streams locally. */
  readonly rtmpRelay: RtmpRelay;

  /** Both keyed by accessory UUID. */
  private readonly accessories = new Map<string, PlatformAccessory>();
  private readonly cameras = new Map<string, NanitCamera>();
  private readonly timers: NodeJS.Timeout[] = [];

  constructor(
    readonly log: Logger,
    config: PlatformConfig,
    readonly api: API,
  ) {
    this.config = config as NanitPlatformConfig;
    const store = new TokenStore(path.join(api.user.storagePath(), 'nanit', 'tokens.json'), log);
    this.auth = new NanitAuth(this.config.email, this.config.refreshToken, store, log);
    this.rtmpRelay = new RtmpRelay(withPrefix(log, 'RTMP'), this.config.localRtmpPort ?? 1935, this.config.localAddress);

    if (!this.config.email) {
      log.error('"email" is required in the Nanit platform config.');
      return;
    }
    if (!this.auth.hasRefreshToken) {
      log.error('No Nanit refresh token found. Run "npx nanit-auth" and add "refreshToken" to the Nanit platform config.');
      return;
    }

    api.on('didFinishLaunching', () => this.start());
    api.on('shutdown', () => this.shutdown());
  }

  configureAccessory(accessory: PlatformAccessory): void {
    this.log.debug('Loading accessory from cache:', accessory.displayName);
    this.accessories.set(accessory.UUID, accessory);
  }

  private start(): void {
    void this.sync();
    this.timers.push(
      setInterval(() => {
        if (!this.auth.disabled) {
          this.auth.refresh().catch((error) => this.log.error(`Token refresh failed: ${errorMessage(error)}`));
        }
      }, TOKEN_REFRESH_MS),
      setInterval(() => void this.sync(), (this.config.refreshInterval ?? DEFAULT_DISCOVERY_INTERVAL_S) * 1000),
    );
  }

  /** Authenticate if needed, then reconcile accessories with Nanit's camera list. */
  private async sync(): Promise<void> {
    if (this.auth.disabled) {
      return;
    }
    try {
      if (!this.auth.authenticated) {
        await this.auth.refresh();
      }
      this.reconcile(await getBabies(this.auth.token));
    } catch (error) {
      this.log.error(`Failed to sync cameras: ${errorMessage(error)}`);
    }
  }

  private reconcile(babies: NanitBaby[]): void {
    this.log.debug(`Nanit reports ${babies.length} camera(s)`);
    const current = new Set(babies.map((baby) => this.upsertCamera(baby)));

    const stale = [...this.accessories.values()].filter((accessory) => !current.has(accessory.UUID));
    for (const accessory of stale) {
      this.log.info('Removing camera:', accessory.displayName);
      this.cameras.get(accessory.UUID)?.destroy();
      this.cameras.delete(accessory.UUID);
      this.accessories.delete(accessory.UUID);
    }
    if (stale.length > 0) {
      this.api.unregisterPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, stale);
    }
  }

  /** Returns the accessory UUID. */
  private upsertCamera(baby: NanitBaby): string {
    const uuid = this.api.hap.uuid.generate(baby.uid);
    const name = babyName(baby);
    const camera = this.cameras.get(uuid);
    camera?.update(baby);

    const cached = this.accessories.get(uuid);
    if (cached) {
      if (cached.displayName !== name) {
        this.log.info(`Renaming camera "${cached.displayName}" to "${name}"`);
        cached.displayName = name;
        cached.getService(this.api.hap.Service.AccessoryInformation)
          ?.setCharacteristic(this.api.hap.Characteristic.Name, name);
        this.api.updatePlatformAccessories([cached]);
      }
      if (!camera) {
        this.cameras.set(uuid, new NanitCamera(this, cached, baby));
      }
      return uuid;
    }

    this.log.info('Adding camera:', name);
    const accessory = new this.api.platformAccessory(name, uuid);
    this.cameras.set(uuid, new NanitCamera(this, accessory, baby));
    this.accessories.set(uuid, accessory);
    this.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
    return uuid;
  }

  private shutdown(): void {
    this.timers.forEach(clearInterval);
    for (const camera of this.cameras.values()) {
      camera.destroy();
    }
    this.cameras.clear();
  }
}
