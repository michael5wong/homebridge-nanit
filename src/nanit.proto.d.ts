import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace client. */
export namespace client {

    /** RequestType enum. */
    enum RequestType {
        GET_STREAMING = 3,
        PUT_STREAMING = 2,
        GET_SETTINGS = 4,
        PUT_SETTINGS = 5,
        GET_CONTROL = 6,
        PUT_CONTROL = 7,
        GET_STATUS = 8,
        PUT_STATUS = 9,
        GET_SENSOR_DATA = 12,
        PUT_SENSOR_DATA = 11,
        GET_UCTOKENS = 13,
        PUT_UCTOKENS = 14,
        PUT_SETUP_NETWORK = 15,
        PUT_SETUP_SERVER = 16,
        GET_FIRMWARE = 17,
        PUT_FIRMWARE = 18,
        GET_PLAYBACK = 19,
        PUT_PLAYBACK = 20,
        GET_SOUNDTRACKS = 21,
        GET_STATUS_NETWORK = 22,
        GET_LIST_NETWORKS = 23,
        GET_LOGS = 24,
        GET_BANDWIDTH = 25,
        GET_AUDIO_STREAMING = 26,
        PUT_AUDIO_STREAMING = 27,
        GET_WIFI_SETUP = 28,
        PUT_WIFI_SETUP = 29,
        PUT_STING_START = 30,
        PUT_STING_STOP = 31,
        PUT_STING_STATUS = 32,
        PUT_STING_ALERT = 34,
        PUT_KEEP_ALIVE = 35,
        GET_STING_STATUS = 36,
        PUT_STING_TEST = 37,
        PUT_RTSP_STREAMING = 38,
        GET_UOM_URI = 39,
        GET_UOM = 40,
        PUT_UOM = 41,
        GET_AUTH_KEY = 42,
        PUT_AUTH_KEY = 43,
        PUT_HEALTH = 44,
        PUT_TCP_REQUEST = 45,
        GET_STING_START = 46,
        GET_LOGS_URI = 47
    }

    /** SensorType enum. */
    enum SensorType {
        SOUND = 0,
        MOTION = 1,
        TEMPERATURE = 2,
        HUMIDITY = 3,
        LIGHT = 4,
        NIGHT = 5
    }

    /** Properties of a SensorData. */
    interface ISensorData {

        /** SensorData sensorType */
        sensorType: client.SensorType;

        /** SensorData isAlert */
        isAlert?: (boolean|null);

        /** SensorData timestamp */
        timestamp?: (number|null);

        /** SensorData valueMilli */
        valueMilli?: (number|null);

        /** SensorData value */
        value?: (number|null);
    }

    /** Represents a SensorData. */
    class SensorData implements ISensorData {

        /**
         * Constructs a new SensorData.
         * @param [properties] Properties to set
         */
        constructor(properties?: client.ISensorData);

        /** SensorData sensorType. */
        public sensorType: client.SensorType;

        /** SensorData isAlert. */
        public isAlert: boolean;

        /** SensorData timestamp. */
        public timestamp: number;

        /** SensorData valueMilli. */
        public valueMilli: number;

        /** SensorData value. */
        public value: number;

        /**
         * Creates a new SensorData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SensorData instance
         */
        public static create(properties?: client.ISensorData): client.SensorData;

        /**
         * Encodes the specified SensorData message. Does not implicitly {@link client.SensorData.verify|verify} messages.
         * @param message SensorData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: client.ISensorData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SensorData message, length delimited. Does not implicitly {@link client.SensorData.verify|verify} messages.
         * @param message SensorData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: client.ISensorData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SensorData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SensorData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): client.SensorData;

        /**
         * Decodes a SensorData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SensorData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): client.SensorData;

        /**
         * Verifies a SensorData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SensorData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SensorData
         */
        public static fromObject(object: { [k: string]: any }): client.SensorData;

        /**
         * Creates a plain object from a SensorData message. Also converts values to other types if specified.
         * @param message SensorData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: client.SensorData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SensorData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for SensorData
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a GetSensorData. */
    interface IGetSensorData {

        /** GetSensorData all */
        all?: (boolean|null);

        /** GetSensorData temperature */
        temperature?: (boolean|null);

        /** GetSensorData humidity */
        humidity?: (boolean|null);

        /** GetSensorData light */
        light?: (boolean|null);

        /** GetSensorData night */
        night?: (boolean|null);
    }

    /** Represents a GetSensorData. */
    class GetSensorData implements IGetSensorData {

        /**
         * Constructs a new GetSensorData.
         * @param [properties] Properties to set
         */
        constructor(properties?: client.IGetSensorData);

        /** GetSensorData all. */
        public all: boolean;

        /** GetSensorData temperature. */
        public temperature: boolean;

        /** GetSensorData humidity. */
        public humidity: boolean;

        /** GetSensorData light. */
        public light: boolean;

        /** GetSensorData night. */
        public night: boolean;

        /**
         * Creates a new GetSensorData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GetSensorData instance
         */
        public static create(properties?: client.IGetSensorData): client.GetSensorData;

        /**
         * Encodes the specified GetSensorData message. Does not implicitly {@link client.GetSensorData.verify|verify} messages.
         * @param message GetSensorData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: client.IGetSensorData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GetSensorData message, length delimited. Does not implicitly {@link client.GetSensorData.verify|verify} messages.
         * @param message GetSensorData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: client.IGetSensorData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GetSensorData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GetSensorData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): client.GetSensorData;

        /**
         * Decodes a GetSensorData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GetSensorData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): client.GetSensorData;

        /**
         * Verifies a GetSensorData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GetSensorData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetSensorData
         */
        public static fromObject(object: { [k: string]: any }): client.GetSensorData;

        /**
         * Creates a plain object from a GetSensorData message. Also converts values to other types if specified.
         * @param message GetSensorData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: client.GetSensorData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GetSensorData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GetSensorData
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Control. */
    interface IControl {

        /** Control forceConnectToServer */
        forceConnectToServer?: (boolean|null);

        /** Control nightLightTimeout */
        nightLightTimeout?: (number|null);

        /** Control nightLight */
        nightLight?: (client.Control.NightLight|null);

        /** Control sensorDataTransfer */
        sensorDataTransfer?: (client.Control.ISensorDataTransfer|null);
    }

    /** Represents a Control. */
    class Control implements IControl {

        /**
         * Constructs a new Control.
         * @param [properties] Properties to set
         */
        constructor(properties?: client.IControl);

        /** Control forceConnectToServer. */
        public forceConnectToServer: boolean;

        /** Control nightLightTimeout. */
        public nightLightTimeout: number;

        /** Control nightLight. */
        public nightLight: client.Control.NightLight;

        /** Control sensorDataTransfer. */
        public sensorDataTransfer?: (client.Control.ISensorDataTransfer|null);

        /**
         * Creates a new Control instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Control instance
         */
        public static create(properties?: client.IControl): client.Control;

        /**
         * Encodes the specified Control message. Does not implicitly {@link client.Control.verify|verify} messages.
         * @param message Control message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: client.IControl, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Control message, length delimited. Does not implicitly {@link client.Control.verify|verify} messages.
         * @param message Control message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: client.IControl, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Control message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Control
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): client.Control;

        /**
         * Decodes a Control message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Control
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): client.Control;

        /**
         * Verifies a Control message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Control message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Control
         */
        public static fromObject(object: { [k: string]: any }): client.Control;

        /**
         * Creates a plain object from a Control message. Also converts values to other types if specified.
         * @param message Control
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: client.Control, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Control to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Control
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace Control {

        /** NightLight enum. */
        enum NightLight {
            LIGHT_OFF = 0,
            LIGHT_ON = 1
        }

        /** Properties of a SensorDataTransfer. */
        interface ISensorDataTransfer {

            /** SensorDataTransfer sound */
            sound?: (boolean|null);

            /** SensorDataTransfer motion */
            motion?: (boolean|null);

            /** SensorDataTransfer temperature */
            temperature?: (boolean|null);

            /** SensorDataTransfer humidity */
            humidity?: (boolean|null);

            /** SensorDataTransfer light */
            light?: (boolean|null);

            /** SensorDataTransfer night */
            night?: (boolean|null);
        }

        /** Represents a SensorDataTransfer. */
        class SensorDataTransfer implements ISensorDataTransfer {

            /**
             * Constructs a new SensorDataTransfer.
             * @param [properties] Properties to set
             */
            constructor(properties?: client.Control.ISensorDataTransfer);

            /** SensorDataTransfer sound. */
            public sound: boolean;

            /** SensorDataTransfer motion. */
            public motion: boolean;

            /** SensorDataTransfer temperature. */
            public temperature: boolean;

            /** SensorDataTransfer humidity. */
            public humidity: boolean;

            /** SensorDataTransfer light. */
            public light: boolean;

            /** SensorDataTransfer night. */
            public night: boolean;

            /**
             * Creates a new SensorDataTransfer instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SensorDataTransfer instance
             */
            public static create(properties?: client.Control.ISensorDataTransfer): client.Control.SensorDataTransfer;

            /**
             * Encodes the specified SensorDataTransfer message. Does not implicitly {@link client.Control.SensorDataTransfer.verify|verify} messages.
             * @param message SensorDataTransfer message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: client.Control.ISensorDataTransfer, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SensorDataTransfer message, length delimited. Does not implicitly {@link client.Control.SensorDataTransfer.verify|verify} messages.
             * @param message SensorDataTransfer message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: client.Control.ISensorDataTransfer, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SensorDataTransfer message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SensorDataTransfer
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): client.Control.SensorDataTransfer;

            /**
             * Decodes a SensorDataTransfer message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SensorDataTransfer
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): client.Control.SensorDataTransfer;

            /**
             * Verifies a SensorDataTransfer message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a SensorDataTransfer message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SensorDataTransfer
             */
            public static fromObject(object: { [k: string]: any }): client.Control.SensorDataTransfer;

            /**
             * Creates a plain object from a SensorDataTransfer message. Also converts values to other types if specified.
             * @param message SensorDataTransfer
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: client.Control.SensorDataTransfer, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SensorDataTransfer to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for SensorDataTransfer
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }
    }

    /** StreamIdentifier enum. */
    enum StreamIdentifier {
        DVR = 0,
        ANALYTICS = 1,
        MOBILE = 2
    }

    /** MountingMode enum. */
    enum MountingMode {
        STAND = 0,
        TRAVEL = 1,
        SWITCH = 2
    }

    /** Properties of a Settings. */
    interface ISettings {

        /** Settings nightVision */
        nightVision?: (boolean|null);

        /** Settings sensors */
        sensors?: (client.Settings.ISensorSettings[]|null);

        /** Settings streams */
        streams?: (client.Settings.IStreamSettings[]|null);

        /** Settings volume */
        volume?: (number|null);

        /** Settings antiFlicker */
        antiFlicker?: (client.Settings.AntiFlicker|null);

        /** Settings sleepMode */
        sleepMode?: (boolean|null);

        /** Settings statusLightOn */
        statusLightOn?: (boolean|null);

        /** Settings mountingMode */
        mountingMode?: (number|null);

        /** Settings wifiBand */
        wifiBand?: (client.Settings.WifiBand|null);

        /** Settings micMuteOn */
        micMuteOn?: (boolean|null);
    }

    /** Represents a Settings. */
    class Settings implements ISettings {

        /**
         * Constructs a new Settings.
         * @param [properties] Properties to set
         */
        constructor(properties?: client.ISettings);

        /** Settings nightVision. */
        public nightVision: boolean;

        /** Settings sensors. */
        public sensors: client.Settings.ISensorSettings[];

        /** Settings streams. */
        public streams: client.Settings.IStreamSettings[];

        /** Settings volume. */
        public volume: number;

        /** Settings antiFlicker. */
        public antiFlicker: client.Settings.AntiFlicker;

        /** Settings sleepMode. */
        public sleepMode: boolean;

        /** Settings statusLightOn. */
        public statusLightOn: boolean;

        /** Settings mountingMode. */
        public mountingMode: number;

        /** Settings wifiBand. */
        public wifiBand: client.Settings.WifiBand;

        /** Settings micMuteOn. */
        public micMuteOn: boolean;

        /**
         * Creates a new Settings instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Settings instance
         */
        public static create(properties?: client.ISettings): client.Settings;

        /**
         * Encodes the specified Settings message. Does not implicitly {@link client.Settings.verify|verify} messages.
         * @param message Settings message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: client.ISettings, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Settings message, length delimited. Does not implicitly {@link client.Settings.verify|verify} messages.
         * @param message Settings message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: client.ISettings, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Settings message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Settings
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): client.Settings;

        /**
         * Decodes a Settings message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Settings
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): client.Settings;

        /**
         * Verifies a Settings message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Settings message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Settings
         */
        public static fromObject(object: { [k: string]: any }): client.Settings;

        /**
         * Creates a plain object from a Settings message. Also converts values to other types if specified.
         * @param message Settings
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: client.Settings, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Settings to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Settings
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace Settings {

        /** Properties of a SensorSettings. */
        interface ISensorSettings {

            /** SensorSettings sensorType */
            sensorType: client.SensorType;

            /** SensorSettings useLowThreshold */
            useLowThreshold?: (boolean|null);

            /** SensorSettings useHighThreshold */
            useHighThreshold?: (boolean|null);

            /** SensorSettings lowThreshold */
            lowThreshold?: (number|null);

            /** SensorSettings highThreshold */
            highThreshold?: (number|null);

            /** SensorSettings sampleIntervalSec */
            sampleIntervalSec?: (number|null);

            /** SensorSettings triggerIntervalSec */
            triggerIntervalSec?: (number|null);

            /** SensorSettings useMilliForThresholds */
            useMilliForThresholds?: (boolean|null);
        }

        /** Represents a SensorSettings. */
        class SensorSettings implements ISensorSettings {

            /**
             * Constructs a new SensorSettings.
             * @param [properties] Properties to set
             */
            constructor(properties?: client.Settings.ISensorSettings);

            /** SensorSettings sensorType. */
            public sensorType: client.SensorType;

            /** SensorSettings useLowThreshold. */
            public useLowThreshold: boolean;

            /** SensorSettings useHighThreshold. */
            public useHighThreshold: boolean;

            /** SensorSettings lowThreshold. */
            public lowThreshold: number;

            /** SensorSettings highThreshold. */
            public highThreshold: number;

            /** SensorSettings sampleIntervalSec. */
            public sampleIntervalSec: number;

            /** SensorSettings triggerIntervalSec. */
            public triggerIntervalSec: number;

            /** SensorSettings useMilliForThresholds. */
            public useMilliForThresholds: boolean;

            /**
             * Creates a new SensorSettings instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SensorSettings instance
             */
            public static create(properties?: client.Settings.ISensorSettings): client.Settings.SensorSettings;

            /**
             * Encodes the specified SensorSettings message. Does not implicitly {@link client.Settings.SensorSettings.verify|verify} messages.
             * @param message SensorSettings message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: client.Settings.ISensorSettings, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SensorSettings message, length delimited. Does not implicitly {@link client.Settings.SensorSettings.verify|verify} messages.
             * @param message SensorSettings message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: client.Settings.ISensorSettings, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SensorSettings message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SensorSettings
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): client.Settings.SensorSettings;

            /**
             * Decodes a SensorSettings message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SensorSettings
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): client.Settings.SensorSettings;

            /**
             * Verifies a SensorSettings message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a SensorSettings message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SensorSettings
             */
            public static fromObject(object: { [k: string]: any }): client.Settings.SensorSettings;

            /**
             * Creates a plain object from a SensorSettings message. Also converts values to other types if specified.
             * @param message SensorSettings
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: client.Settings.SensorSettings, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SensorSettings to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for SensorSettings
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a StreamSettings. */
        interface IStreamSettings {

            /** StreamSettings id */
            id: client.StreamIdentifier;

            /** StreamSettings bitrate */
            bitrate?: (number|null);

            /** StreamSettings economyBitrate */
            economyBitrate?: (number|null);

            /** StreamSettings economyFps */
            economyFps?: (number|null);

            /** StreamSettings bestBitrate */
            bestBitrate?: (number|null);

            /** StreamSettings bestFps */
            bestFps?: (number|null);
        }

        /** Represents a StreamSettings. */
        class StreamSettings implements IStreamSettings {

            /**
             * Constructs a new StreamSettings.
             * @param [properties] Properties to set
             */
            constructor(properties?: client.Settings.IStreamSettings);

            /** StreamSettings id. */
            public id: client.StreamIdentifier;

            /** StreamSettings bitrate. */
            public bitrate: number;

            /** StreamSettings economyBitrate. */
            public economyBitrate: number;

            /** StreamSettings economyFps. */
            public economyFps: number;

            /** StreamSettings bestBitrate. */
            public bestBitrate: number;

            /** StreamSettings bestFps. */
            public bestFps: number;

            /**
             * Creates a new StreamSettings instance using the specified properties.
             * @param [properties] Properties to set
             * @returns StreamSettings instance
             */
            public static create(properties?: client.Settings.IStreamSettings): client.Settings.StreamSettings;

            /**
             * Encodes the specified StreamSettings message. Does not implicitly {@link client.Settings.StreamSettings.verify|verify} messages.
             * @param message StreamSettings message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: client.Settings.IStreamSettings, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified StreamSettings message, length delimited. Does not implicitly {@link client.Settings.StreamSettings.verify|verify} messages.
             * @param message StreamSettings message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: client.Settings.IStreamSettings, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a StreamSettings message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns StreamSettings
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): client.Settings.StreamSettings;

            /**
             * Decodes a StreamSettings message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns StreamSettings
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): client.Settings.StreamSettings;

            /**
             * Verifies a StreamSettings message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a StreamSettings message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns StreamSettings
             */
            public static fromObject(object: { [k: string]: any }): client.Settings.StreamSettings;

            /**
             * Creates a plain object from a StreamSettings message. Also converts values to other types if specified.
             * @param message StreamSettings
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: client.Settings.StreamSettings, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this StreamSettings to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for StreamSettings
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** AntiFlicker enum. */
        enum AntiFlicker {
            FR50HZ = 0,
            FR60HZ = 1
        }

        /** WifiBand enum. */
        enum WifiBand {
            ANY = 0,
            FR2_4GHZ = 1,
            FR5_0GHZ = 2
        }
    }

    /** Properties of a Status. */
    interface IStatus {

        /** Status upgradeDownloaded */
        upgradeDownloaded?: (boolean|null);

        /** Status connectionToServer */
        connectionToServer?: (client.Status.ConnectionToServer|null);

        /** Status currentVersion */
        currentVersion?: (string|null);

        /** Status mode */
        mode?: (client.MountingMode|null);

        /** Status isSecurityUpgrade */
        isSecurityUpgrade?: (boolean|null);

        /** Status downloadedVersion */
        downloadedVersion?: (string|null);

        /** Status hardwareVersion */
        hardwareVersion?: (string|null);
    }

    /** Represents a Status. */
    class Status implements IStatus {

        /**
         * Constructs a new Status.
         * @param [properties] Properties to set
         */
        constructor(properties?: client.IStatus);

        /** Status upgradeDownloaded. */
        public upgradeDownloaded: boolean;

        /** Status connectionToServer. */
        public connectionToServer: client.Status.ConnectionToServer;

        /** Status currentVersion. */
        public currentVersion: string;

        /** Status mode. */
        public mode: client.MountingMode;

        /** Status isSecurityUpgrade. */
        public isSecurityUpgrade: boolean;

        /** Status downloadedVersion. */
        public downloadedVersion: string;

        /** Status hardwareVersion. */
        public hardwareVersion: string;

        /**
         * Creates a new Status instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Status instance
         */
        public static create(properties?: client.IStatus): client.Status;

        /**
         * Encodes the specified Status message. Does not implicitly {@link client.Status.verify|verify} messages.
         * @param message Status message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: client.IStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Status message, length delimited. Does not implicitly {@link client.Status.verify|verify} messages.
         * @param message Status message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: client.IStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Status message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Status
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): client.Status;

        /**
         * Decodes a Status message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Status
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): client.Status;

        /**
         * Verifies a Status message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Status message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Status
         */
        public static fromObject(object: { [k: string]: any }): client.Status;

        /**
         * Creates a plain object from a Status message. Also converts values to other types if specified.
         * @param message Status
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: client.Status, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Status to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Status
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace Status {

        /** ConnectionToServer enum. */
        enum ConnectionToServer {
            DISCONNECTED = 0,
            CONNECTED = 1
        }
    }

    /** Properties of a Playback. */
    interface IPlayback {

        /** Playback status */
        status: client.Playback.Status;
    }

    /** Represents a Playback. */
    class Playback implements IPlayback {

        /**
         * Constructs a new Playback.
         * @param [properties] Properties to set
         */
        constructor(properties?: client.IPlayback);

        /** Playback status. */
        public status: client.Playback.Status;

        /**
         * Creates a new Playback instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Playback instance
         */
        public static create(properties?: client.IPlayback): client.Playback;

        /**
         * Encodes the specified Playback message. Does not implicitly {@link client.Playback.verify|verify} messages.
         * @param message Playback message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: client.IPlayback, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Playback message, length delimited. Does not implicitly {@link client.Playback.verify|verify} messages.
         * @param message Playback message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: client.IPlayback, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Playback message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Playback
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): client.Playback;

        /**
         * Decodes a Playback message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Playback
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): client.Playback;

        /**
         * Verifies a Playback message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Playback message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Playback
         */
        public static fromObject(object: { [k: string]: any }): client.Playback;

        /**
         * Creates a plain object from a Playback message. Also converts values to other types if specified.
         * @param message Playback
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: client.Playback, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Playback to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Playback
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace Playback {

        /** Status enum. */
        enum Status {
            STARTED = 0,
            STOPPED = 1
        }
    }

    /** Properties of a Stream. */
    interface IStream {

        /** Stream type */
        type: client.Stream.Type;

        /** Stream url */
        url?: (string|null);

        /** Stream bps */
        bps?: (number|null);
    }

    /** Represents a Stream. */
    class Stream implements IStream {

        /**
         * Constructs a new Stream.
         * @param [properties] Properties to set
         */
        constructor(properties?: client.IStream);

        /** Stream type. */
        public type: client.Stream.Type;

        /** Stream url. */
        public url: string;

        /** Stream bps. */
        public bps: number;

        /**
         * Creates a new Stream instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Stream instance
         */
        public static create(properties?: client.IStream): client.Stream;

        /**
         * Encodes the specified Stream message. Does not implicitly {@link client.Stream.verify|verify} messages.
         * @param message Stream message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: client.IStream, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Stream message, length delimited. Does not implicitly {@link client.Stream.verify|verify} messages.
         * @param message Stream message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: client.IStream, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Stream message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Stream
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): client.Stream;

        /**
         * Decodes a Stream message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Stream
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): client.Stream;

        /**
         * Verifies a Stream message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Stream message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Stream
         */
        public static fromObject(object: { [k: string]: any }): client.Stream;

        /**
         * Creates a plain object from a Stream message. Also converts values to other types if specified.
         * @param message Stream
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: client.Stream, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Stream to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Stream
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace Stream {

        /** Type enum. */
        enum Type {
            LOCAL = 0,
            REMOTE = 1,
            RTSP = 2,
            P2P = 3
        }
    }

    /** Properties of a Streaming. */
    interface IStreaming {

        /** Streaming id */
        id: client.StreamIdentifier;

        /** Streaming status */
        status: client.Streaming.Status;

        /** Streaming rtmpUrl */
        rtmpUrl: string;

        /** Streaming attempts */
        attempts?: (number|null);
    }

    /** Represents a Streaming. */
    class Streaming implements IStreaming {

        /**
         * Constructs a new Streaming.
         * @param [properties] Properties to set
         */
        constructor(properties?: client.IStreaming);

        /** Streaming id. */
        public id: client.StreamIdentifier;

        /** Streaming status. */
        public status: client.Streaming.Status;

        /** Streaming rtmpUrl. */
        public rtmpUrl: string;

        /** Streaming attempts. */
        public attempts: number;

        /**
         * Creates a new Streaming instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Streaming instance
         */
        public static create(properties?: client.IStreaming): client.Streaming;

        /**
         * Encodes the specified Streaming message. Does not implicitly {@link client.Streaming.verify|verify} messages.
         * @param message Streaming message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: client.IStreaming, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Streaming message, length delimited. Does not implicitly {@link client.Streaming.verify|verify} messages.
         * @param message Streaming message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: client.IStreaming, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Streaming message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Streaming
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): client.Streaming;

        /**
         * Decodes a Streaming message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Streaming
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): client.Streaming;

        /**
         * Verifies a Streaming message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Streaming message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Streaming
         */
        public static fromObject(object: { [k: string]: any }): client.Streaming;

        /**
         * Creates a plain object from a Streaming message. Also converts values to other types if specified.
         * @param message Streaming
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: client.Streaming, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Streaming to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Streaming
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace Streaming {

        /** Status enum. */
        enum Status {
            STARTED = 0,
            STOPPED = 1,
            PAUSED = 2
        }
    }

    /** Properties of a GetLogs. */
    interface IGetLogs {

        /** GetLogs url */
        url: string;
    }

    /** Represents a GetLogs. */
    class GetLogs implements IGetLogs {

        /**
         * Constructs a new GetLogs.
         * @param [properties] Properties to set
         */
        constructor(properties?: client.IGetLogs);

        /** GetLogs url. */
        public url: string;

        /**
         * Creates a new GetLogs instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GetLogs instance
         */
        public static create(properties?: client.IGetLogs): client.GetLogs;

        /**
         * Encodes the specified GetLogs message. Does not implicitly {@link client.GetLogs.verify|verify} messages.
         * @param message GetLogs message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: client.IGetLogs, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GetLogs message, length delimited. Does not implicitly {@link client.GetLogs.verify|verify} messages.
         * @param message GetLogs message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: client.IGetLogs, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GetLogs message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GetLogs
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): client.GetLogs;

        /**
         * Decodes a GetLogs message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GetLogs
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): client.GetLogs;

        /**
         * Verifies a GetLogs message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GetLogs message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetLogs
         */
        public static fromObject(object: { [k: string]: any }): client.GetLogs;

        /**
         * Creates a plain object from a GetLogs message. Also converts values to other types if specified.
         * @param message GetLogs
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: client.GetLogs, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GetLogs to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GetLogs
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a GetStatus. */
    interface IGetStatus {

        /** GetStatus all */
        all?: (boolean|null);
    }

    /** Represents a GetStatus. */
    class GetStatus implements IGetStatus {

        /**
         * Constructs a new GetStatus.
         * @param [properties] Properties to set
         */
        constructor(properties?: client.IGetStatus);

        /** GetStatus all. */
        public all: boolean;

        /**
         * Creates a new GetStatus instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GetStatus instance
         */
        public static create(properties?: client.IGetStatus): client.GetStatus;

        /**
         * Encodes the specified GetStatus message. Does not implicitly {@link client.GetStatus.verify|verify} messages.
         * @param message GetStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: client.IGetStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GetStatus message, length delimited. Does not implicitly {@link client.GetStatus.verify|verify} messages.
         * @param message GetStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: client.IGetStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GetStatus message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GetStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): client.GetStatus;

        /**
         * Decodes a GetStatus message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GetStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): client.GetStatus;

        /**
         * Verifies a GetStatus message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GetStatus message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetStatus
         */
        public static fromObject(object: { [k: string]: any }): client.GetStatus;

        /**
         * Creates a plain object from a GetStatus message. Also converts values to other types if specified.
         * @param message GetStatus
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: client.GetStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GetStatus to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GetStatus
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Request. */
    interface IRequest {

        /** Request id */
        id: number;

        /** Request type */
        type: client.RequestType;

        /** Request getSensorData */
        getSensorData?: (client.IGetSensorData|null);

        /** Request sensorData */
        sensorData?: (client.ISensorData[]|null);

        /** Request streaming */
        streaming?: (client.IStreaming|null);

        /** Request control */
        control?: (client.IControl|null);

        /** Request settings */
        settings?: (client.ISettings|null);

        /** Request status */
        status?: (client.IStatus|null);

        /** Request getStatus */
        getStatus?: (client.IGetStatus|null);

        /** Request playback */
        playback?: (client.IPlayback|null);

        /** Request getLogs */
        getLogs?: (client.IGetLogs|null);
    }

    /** Represents a Request. */
    class Request implements IRequest {

        /**
         * Constructs a new Request.
         * @param [properties] Properties to set
         */
        constructor(properties?: client.IRequest);

        /** Request id. */
        public id: number;

        /** Request type. */
        public type: client.RequestType;

        /** Request getSensorData. */
        public getSensorData?: (client.IGetSensorData|null);

        /** Request sensorData. */
        public sensorData: client.ISensorData[];

        /** Request streaming. */
        public streaming?: (client.IStreaming|null);

        /** Request control. */
        public control?: (client.IControl|null);

        /** Request settings. */
        public settings?: (client.ISettings|null);

        /** Request status. */
        public status?: (client.IStatus|null);

        /** Request getStatus. */
        public getStatus?: (client.IGetStatus|null);

        /** Request playback. */
        public playback?: (client.IPlayback|null);

        /** Request getLogs. */
        public getLogs?: (client.IGetLogs|null);

        /**
         * Creates a new Request instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Request instance
         */
        public static create(properties?: client.IRequest): client.Request;

        /**
         * Encodes the specified Request message. Does not implicitly {@link client.Request.verify|verify} messages.
         * @param message Request message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: client.IRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Request message, length delimited. Does not implicitly {@link client.Request.verify|verify} messages.
         * @param message Request message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: client.IRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Request message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Request
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): client.Request;

        /**
         * Decodes a Request message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Request
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): client.Request;

        /**
         * Verifies a Request message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Request message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Request
         */
        public static fromObject(object: { [k: string]: any }): client.Request;

        /**
         * Creates a plain object from a Request message. Also converts values to other types if specified.
         * @param message Request
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: client.Request, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Request to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Request
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Response. */
    interface IResponse {

        /** Response requestId */
        requestId: number;

        /** Response requestType */
        requestType: client.RequestType;

        /** Response statusCode */
        statusCode: number;

        /** Response statusMessage */
        statusMessage?: (string|null);

        /** Response status */
        status?: (client.IStatus|null);

        /** Response sensorData */
        sensorData?: (client.ISensorData[]|null);

        /** Response settings */
        settings?: (client.ISettings|null);
    }

    /** Represents a Response. */
    class Response implements IResponse {

        /**
         * Constructs a new Response.
         * @param [properties] Properties to set
         */
        constructor(properties?: client.IResponse);

        /** Response requestId. */
        public requestId: number;

        /** Response requestType. */
        public requestType: client.RequestType;

        /** Response statusCode. */
        public statusCode: number;

        /** Response statusMessage. */
        public statusMessage: string;

        /** Response status. */
        public status?: (client.IStatus|null);

        /** Response sensorData. */
        public sensorData: client.ISensorData[];

        /** Response settings. */
        public settings?: (client.ISettings|null);

        /**
         * Creates a new Response instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Response instance
         */
        public static create(properties?: client.IResponse): client.Response;

        /**
         * Encodes the specified Response message. Does not implicitly {@link client.Response.verify|verify} messages.
         * @param message Response message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: client.IResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Response message, length delimited. Does not implicitly {@link client.Response.verify|verify} messages.
         * @param message Response message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: client.IResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Response message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Response
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): client.Response;

        /**
         * Decodes a Response message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Response
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): client.Response;

        /**
         * Verifies a Response message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Response message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Response
         */
        public static fromObject(object: { [k: string]: any }): client.Response;

        /**
         * Creates a plain object from a Response message. Also converts values to other types if specified.
         * @param message Response
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: client.Response, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Response to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Response
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Message. */
    interface IMessage {

        /** Message type */
        type: client.Message.Type;

        /** Message request */
        request?: (client.IRequest|null);

        /** Message response */
        response?: (client.IResponse|null);
    }

    /** Represents a Message. */
    class Message implements IMessage {

        /**
         * Constructs a new Message.
         * @param [properties] Properties to set
         */
        constructor(properties?: client.IMessage);

        /** Message type. */
        public type: client.Message.Type;

        /** Message request. */
        public request?: (client.IRequest|null);

        /** Message response. */
        public response?: (client.IResponse|null);

        /**
         * Creates a new Message instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Message instance
         */
        public static create(properties?: client.IMessage): client.Message;

        /**
         * Encodes the specified Message message. Does not implicitly {@link client.Message.verify|verify} messages.
         * @param message Message message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: client.IMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Message message, length delimited. Does not implicitly {@link client.Message.verify|verify} messages.
         * @param message Message message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: client.IMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Message message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): client.Message;

        /**
         * Decodes a Message message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): client.Message;

        /**
         * Verifies a Message message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Message message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Message
         */
        public static fromObject(object: { [k: string]: any }): client.Message;

        /**
         * Creates a plain object from a Message message. Also converts values to other types if specified.
         * @param message Message
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: client.Message, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Message to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Message
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace Message {

        /** Type enum. */
        enum Type {
            KEEPALIVE = 0,
            REQUEST = 1,
            RESPONSE = 2
        }
    }
}
