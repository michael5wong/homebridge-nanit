import {
  Characteristic,
  HAP,
  PlatformAccessory,
  Service,
  WithUUID,
} from 'homebridge';

type SensorService = typeof Service.TemperatureSensor | typeof Service.HumiditySensor;
import { NanitPlatform } from './platform';
import { NanitBaby, NanitCameraInfo, babyName } from './nanitApi';
import { Log, withPrefix } from './log';
import { StreamingDelegate } from './streaming/delegate';
import { LocalSource, VideoSource, cloudSource, withFallback } from './streaming/sources';

export class NanitCamera {
  private readonly hap: HAP;
  private readonly log: Log;
  private readonly streamingDelegate: StreamingDelegate;
  private readonly sensorRefreshers: Array<() => void> = [];

  constructor(
    private readonly platform: NanitPlatform,
    private readonly accessory: PlatformAccessory,
    private baby: NanitBaby,
  ) {
    this.hap = platform.api.hap;
    this.log = withPrefix(platform.log, babyName(baby));

    this.accessory
      .getService(this.hap.Service.AccessoryInformation)!
      .setCharacteristic(this.hap.Characteristic.Manufacturer, 'Nanit')
      .setCharacteristic(this.hap.Characteristic.Model, 'Nanit Camera')
      .setCharacteristic(this.hap.Characteristic.SerialNumber, baby.camera?.uid || baby.uid)
      .setCharacteristic(this.hap.Characteristic.FirmwareRevision, '1.0.0');

    this.streamingDelegate = new StreamingDelegate(
      this.hap,
      this.log,
      this.videoSource(),
      () => this.cloudStreamUrl(),
    );
    this.accessory.configureController(this.streamingDelegate.controller);

    const { Service: S, Characteristic: C } = this.hap;
    this.addSensor(S.TemperatureSensor, 'Temperature', C.CurrentTemperature, (camera) => camera.temperature);
    this.addSensor(S.HumiditySensor, 'Humidity', C.CurrentRelativeHumidity, (camera) => camera.humidity);
  }

  /** Apply fresh data from the Nanit API. */
  update(baby: NanitBaby): void {
    this.baby = baby;
    this.sensorRefreshers.forEach((refresh) => refresh());
  }

  destroy(): void {
    this.log.debug('Cleaning up camera');
    this.streamingDelegate.destroy();
  }

  private videoSource(): VideoSource {
    const mode = this.platform.config.streamMode ?? 'auto';
    const cloud = cloudSource(() => this.cloudStreamUrl());
    if (mode === 'cloud') {
      this.log.info('Using cloud streaming');
      return cloud;
    }

    const cameraUid = this.baby.camera?.uid || this.baby.camera_uid;
    if (!cameraUid) {
      this.log.warn('Camera UID not available, using cloud streaming');
      return cloud;
    }

    const local = new LocalSource(this.platform.rtmpRelay, cameraUid, () => this.platform.auth.token, this.log);
    this.log.info(mode === 'local' ? 'Using local streaming' : 'Using local streaming with cloud fallback');
    return mode === 'local' ? local : withFallback(local, cloud, this.log);
  }

  /** Expose a sensor reading, if the camera reports it. Reads always reflect the latest `update`. */
  private addSensor(
    serviceType: SensorService,
    label: string,
    characteristicType: WithUUID<new () => Characteristic>,
    read: (camera: NanitCameraInfo) => number | undefined,
  ): void {
    const value = () => (this.baby.camera ? read(this.baby.camera) : undefined);
    if (value() === undefined) {
      return;
    }

    const service = this.accessory.getService(serviceType)
      ?? this.accessory.addService(serviceType, `${babyName(this.baby)} ${label}`);
    const characteristic = service.getCharacteristic(characteristicType).onGet(() => value() ?? 0);
    this.sensorRefreshers.push(() => {
      const current = value();
      if (current !== undefined) {
        characteristic.updateValue(current);
      }
    });
  }

  private cloudStreamUrl(): string {
    return `rtmps://media-secured.nanit.com/nanit/${this.baby.uid}.${this.platform.auth.token}`;
  }
}
