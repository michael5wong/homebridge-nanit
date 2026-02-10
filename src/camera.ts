import {
  API,
  HAP,
  Logger,
  PlatformAccessory,
  Service,
  CameraController,
} from 'homebridge';
import { NanitPlatform } from './platform';
import { NanitBaby } from './settings';
import { NanitStreamingDelegate } from './streamingDelegate';
import { LocalStreamingDelegate } from './localStreamingDelegate';

export class NanitCamera {
  private readonly api: API;
  private readonly hap: HAP;
  private readonly log: Logger;
  private readonly platform: NanitPlatform;
  private readonly accessory: PlatformAccessory;
  private readonly baby: NanitBaby;

  private cameraController?: CameraController;
  private temperatureService?: Service;
  private humidityService?: Service;
  private streamingDelegate?: NanitStreamingDelegate | LocalStreamingDelegate;

  constructor(platform: NanitPlatform, accessory: PlatformAccessory, baby: NanitBaby) {
    this.platform = platform;
    this.api = platform.api;
    this.hap = this.api.hap;
    this.log = platform.log;
    this.accessory = accessory;
    this.baby = baby;

    // Set accessory information
    this.accessory
      .getService(this.hap.Service.AccessoryInformation)!
      .setCharacteristic(this.hap.Characteristic.Manufacturer, 'Nanit')
      .setCharacteristic(this.hap.Characteristic.Model, 'Nanit Camera')
      .setCharacteristic(this.hap.Characteristic.SerialNumber, baby.camera?.uid || baby.uid)
      .setCharacteristic(this.hap.Characteristic.FirmwareRevision, '1.0.0');

    // Setup camera streaming
    this.setupCamera();

    // Setup sensors if data available
    this.setupSensors();
  }

  private setupCamera(): void {
    const streamMode = this.platform.config.streamMode || 'cloud';
    const rtmpPort = this.platform.allocateRtmpPort();
    this.log.debug(`[${this.getName()}] Assigned RTMP port ${rtmpPort}`);
    // API returns private_address as "ip:port" — extract just the IP
    const privateAddr = this.baby.camera?.private_address;
    const localIp = this.baby.camera?.local_ip || (privateAddr ? privateAddr.split(':')[0] : undefined);

    // Determine which streaming delegate to use
    const cameraUid = this.baby.camera?.uid || this.baby.camera_uid;
    const hasValidCameraUid = cameraUid && cameraUid.length > 0;
    
    if (streamMode === 'local' && localIp && hasValidCameraUid) {
      this.log.info(`[${this.getName()}] Using local streaming mode (${localIp})`);
      this.streamingDelegate = new LocalStreamingDelegate(
        this.hap,
        this.log,
        this.baby.uid,
        localIp,
        () => this.platform.getAccessToken(),
        rtmpPort,
        cameraUid,
        this.baby.uid,
        this.platform.config.localAddress,
      );
    } else if (streamMode === 'auto' && localIp && hasValidCameraUid) {
      this.log.info(`[${this.getName()}] Using auto streaming mode (will try local first)`);
      this.streamingDelegate = new LocalStreamingDelegate(
        this.hap,
        this.log,
        this.baby.uid,
        localIp,
        () => this.platform.getAccessToken(),
        rtmpPort,
        cameraUid,
        this.baby.uid,
        this.platform.config.localAddress,
      );
    } else {
      // Default to cloud streaming
      if (streamMode !== 'cloud') {
        if (!hasValidCameraUid) {
          this.log.warn(`[${this.getName()}] Camera UID not available, falling back to cloud streaming`);
        } else if (!localIp) {
          this.log.warn(`[${this.getName()}] Local IP not available, falling back to cloud streaming`);
        } else {
          this.log.warn(`[${this.getName()}] Invalid mode, falling back to cloud streaming`);
        }
      } else {
        this.log.info(`[${this.getName()}] Using cloud streaming mode`);
      }
      this.streamingDelegate = new NanitStreamingDelegate(
        this.hap,
        this.log,
        this.getName(),
        () => this.getStreamUrl(),
      );
    }

    const options = {
      cameraStreamCount: 2, // HomeKit requires at least 2 streams
      delegate: this.streamingDelegate,
      streamingOptions: {
        supportedCryptoSuites: [this.hap.SRTPCryptoSuites.AES_CM_128_HMAC_SHA1_80],
        video: {
          resolutions: [
            [1920, 1080, 30] as [number, number, number], // 1080p
            [1280, 720, 30] as [number, number, number],  // 720p
            [640, 360, 30] as [number, number, number],   // 360p
            [320, 240, 15] as [number, number, number],   // 240p
          ],
          codec: {
            profiles: [this.hap.H264Profile.BASELINE, this.hap.H264Profile.MAIN, this.hap.H264Profile.HIGH],
            levels: [this.hap.H264Level.LEVEL3_1, this.hap.H264Level.LEVEL3_2, this.hap.H264Level.LEVEL4_0],
          },
        },
        audio: {
          codecs: [
            {
              type: this.hap.AudioStreamingCodecType.AAC_ELD,
              samplerate: this.hap.AudioStreamingSamplerate.KHZ_16,
            },
          ],
        },
      },
    };

    this.cameraController = new this.hap.CameraController(options);
    this.streamingDelegate.controller = this.cameraController;

    this.accessory.configureController(this.cameraController);
  }

  private setupSensors(): void {
    const camera = this.baby.camera;
    if (!camera) {
      return;
    }

    // Temperature sensor
    if (camera.temperature !== undefined) {
      this.temperatureService =
        this.accessory.getService(this.hap.Service.TemperatureSensor) ||
        this.accessory.addService(this.hap.Service.TemperatureSensor, `${this.getName()} Temperature`);

      this.temperatureService
        .getCharacteristic(this.hap.Characteristic.CurrentTemperature)
        .onGet(() => camera.temperature || 0);
    }

    // Humidity sensor
    if (camera.humidity !== undefined) {
      this.humidityService =
        this.accessory.getService(this.hap.Service.HumiditySensor) ||
        this.accessory.addService(this.hap.Service.HumiditySensor, `${this.getName()} Humidity`);

      this.humidityService
        .getCharacteristic(this.hap.Characteristic.CurrentRelativeHumidity)
        .onGet(() => camera.humidity || 0);
    }
  }

  public updateSensors(temperature?: number, humidity?: number): void {
    if (temperature !== undefined && this.temperatureService) {
      this.temperatureService
        .getCharacteristic(this.hap.Characteristic.CurrentTemperature)
        .updateValue(temperature);
    }

    if (humidity !== undefined && this.humidityService) {
      this.humidityService
        .getCharacteristic(this.hap.Characteristic.CurrentRelativeHumidity)
        .updateValue(humidity);
    }
  }

  private getName(): string {
    return this.baby.name || this.baby.first_name || 'Nanit Camera';
  }

  private getStreamUrl(): string {
    const accessToken = this.platform.getAccessToken();
    return `rtmps://media-secured.nanit.com/nanit/${this.baby.uid}.${accessToken}`;
  }

  public getBabyUid(): string {
    return this.baby.uid;
  }

  public destroy(): void {
    this.log.debug(`[${this.getName()}] Cleaning up camera`);
    
    // Cleanup streaming delegate
    if (this.streamingDelegate && (this.streamingDelegate as any).destroy) {
      (this.streamingDelegate as any).destroy();
    }
  }
}
