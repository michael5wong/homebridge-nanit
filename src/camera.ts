import {
  API,
  HAP,
  Logger,
  PlatformAccessory,
  Service,
} from 'homebridge';
import { NanitPlatform } from './platform';
import { NanitBaby } from './settings';
import { NanitStreamingDelegate } from './streamingDelegate';

export class NanitCamera {
  private readonly api: API;
  private readonly hap: HAP;
  private readonly log: Logger;
  private readonly platform: NanitPlatform;
  private readonly accessory: PlatformAccessory;
  private readonly baby: NanitBaby;

  private cameraController?: any;
  private temperatureService?: Service;
  private humidityService?: Service;

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
    const streamingDelegate = new NanitStreamingDelegate(
      this.hap,
      this.log,
      this.getName(),
      () => this.getStreamUrl(),
    );

    const options = {
      cameraStreamCount: 2, // HomeKit requires at least 2 streams
      delegate: streamingDelegate,
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
    streamingDelegate.controller = this.cameraController;

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
    return `${this.baby.first_name}${this.baby.last_name ? ' ' + this.baby.last_name : ''}`;
  }

  private getStreamUrl(): string {
    const accessToken = this.platform.getAccessToken();
    return `rtmps://media-secured.nanit.com/nanit/${this.baby.uid}.${accessToken}`;
  }

  public getBabyUid(): string {
    return this.baby.uid;
  }
}
