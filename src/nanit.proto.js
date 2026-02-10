/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.client = (function() {

    /**
     * Namespace client.
     * @exports client
     * @namespace
     */
    var client = {};

    /**
     * RequestType enum.
     * @name client.RequestType
     * @enum {number}
     * @property {number} GET_STREAMING=3 GET_STREAMING value
     * @property {number} PUT_STREAMING=2 PUT_STREAMING value
     * @property {number} GET_SETTINGS=4 GET_SETTINGS value
     * @property {number} PUT_SETTINGS=5 PUT_SETTINGS value
     * @property {number} GET_CONTROL=6 GET_CONTROL value
     * @property {number} PUT_CONTROL=7 PUT_CONTROL value
     * @property {number} GET_STATUS=8 GET_STATUS value
     * @property {number} PUT_STATUS=9 PUT_STATUS value
     * @property {number} GET_SENSOR_DATA=12 GET_SENSOR_DATA value
     * @property {number} PUT_SENSOR_DATA=11 PUT_SENSOR_DATA value
     * @property {number} GET_UCTOKENS=13 GET_UCTOKENS value
     * @property {number} PUT_UCTOKENS=14 PUT_UCTOKENS value
     * @property {number} PUT_SETUP_NETWORK=15 PUT_SETUP_NETWORK value
     * @property {number} PUT_SETUP_SERVER=16 PUT_SETUP_SERVER value
     * @property {number} GET_FIRMWARE=17 GET_FIRMWARE value
     * @property {number} PUT_FIRMWARE=18 PUT_FIRMWARE value
     * @property {number} GET_PLAYBACK=19 GET_PLAYBACK value
     * @property {number} PUT_PLAYBACK=20 PUT_PLAYBACK value
     * @property {number} GET_SOUNDTRACKS=21 GET_SOUNDTRACKS value
     * @property {number} GET_STATUS_NETWORK=22 GET_STATUS_NETWORK value
     * @property {number} GET_LIST_NETWORKS=23 GET_LIST_NETWORKS value
     * @property {number} GET_LOGS=24 GET_LOGS value
     * @property {number} GET_BANDWIDTH=25 GET_BANDWIDTH value
     * @property {number} GET_AUDIO_STREAMING=26 GET_AUDIO_STREAMING value
     * @property {number} PUT_AUDIO_STREAMING=27 PUT_AUDIO_STREAMING value
     * @property {number} GET_WIFI_SETUP=28 GET_WIFI_SETUP value
     * @property {number} PUT_WIFI_SETUP=29 PUT_WIFI_SETUP value
     * @property {number} PUT_STING_START=30 PUT_STING_START value
     * @property {number} PUT_STING_STOP=31 PUT_STING_STOP value
     * @property {number} PUT_STING_STATUS=32 PUT_STING_STATUS value
     * @property {number} PUT_STING_ALERT=34 PUT_STING_ALERT value
     * @property {number} PUT_KEEP_ALIVE=35 PUT_KEEP_ALIVE value
     * @property {number} GET_STING_STATUS=36 GET_STING_STATUS value
     * @property {number} PUT_STING_TEST=37 PUT_STING_TEST value
     * @property {number} PUT_RTSP_STREAMING=38 PUT_RTSP_STREAMING value
     * @property {number} GET_UOM_URI=39 GET_UOM_URI value
     * @property {number} GET_UOM=40 GET_UOM value
     * @property {number} PUT_UOM=41 PUT_UOM value
     * @property {number} GET_AUTH_KEY=42 GET_AUTH_KEY value
     * @property {number} PUT_AUTH_KEY=43 PUT_AUTH_KEY value
     * @property {number} PUT_HEALTH=44 PUT_HEALTH value
     * @property {number} PUT_TCP_REQUEST=45 PUT_TCP_REQUEST value
     * @property {number} GET_STING_START=46 GET_STING_START value
     * @property {number} GET_LOGS_URI=47 GET_LOGS_URI value
     */
    client.RequestType = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[3] = "GET_STREAMING"] = 3;
        values[valuesById[2] = "PUT_STREAMING"] = 2;
        values[valuesById[4] = "GET_SETTINGS"] = 4;
        values[valuesById[5] = "PUT_SETTINGS"] = 5;
        values[valuesById[6] = "GET_CONTROL"] = 6;
        values[valuesById[7] = "PUT_CONTROL"] = 7;
        values[valuesById[8] = "GET_STATUS"] = 8;
        values[valuesById[9] = "PUT_STATUS"] = 9;
        values[valuesById[12] = "GET_SENSOR_DATA"] = 12;
        values[valuesById[11] = "PUT_SENSOR_DATA"] = 11;
        values[valuesById[13] = "GET_UCTOKENS"] = 13;
        values[valuesById[14] = "PUT_UCTOKENS"] = 14;
        values[valuesById[15] = "PUT_SETUP_NETWORK"] = 15;
        values[valuesById[16] = "PUT_SETUP_SERVER"] = 16;
        values[valuesById[17] = "GET_FIRMWARE"] = 17;
        values[valuesById[18] = "PUT_FIRMWARE"] = 18;
        values[valuesById[19] = "GET_PLAYBACK"] = 19;
        values[valuesById[20] = "PUT_PLAYBACK"] = 20;
        values[valuesById[21] = "GET_SOUNDTRACKS"] = 21;
        values[valuesById[22] = "GET_STATUS_NETWORK"] = 22;
        values[valuesById[23] = "GET_LIST_NETWORKS"] = 23;
        values[valuesById[24] = "GET_LOGS"] = 24;
        values[valuesById[25] = "GET_BANDWIDTH"] = 25;
        values[valuesById[26] = "GET_AUDIO_STREAMING"] = 26;
        values[valuesById[27] = "PUT_AUDIO_STREAMING"] = 27;
        values[valuesById[28] = "GET_WIFI_SETUP"] = 28;
        values[valuesById[29] = "PUT_WIFI_SETUP"] = 29;
        values[valuesById[30] = "PUT_STING_START"] = 30;
        values[valuesById[31] = "PUT_STING_STOP"] = 31;
        values[valuesById[32] = "PUT_STING_STATUS"] = 32;
        values[valuesById[34] = "PUT_STING_ALERT"] = 34;
        values[valuesById[35] = "PUT_KEEP_ALIVE"] = 35;
        values[valuesById[36] = "GET_STING_STATUS"] = 36;
        values[valuesById[37] = "PUT_STING_TEST"] = 37;
        values[valuesById[38] = "PUT_RTSP_STREAMING"] = 38;
        values[valuesById[39] = "GET_UOM_URI"] = 39;
        values[valuesById[40] = "GET_UOM"] = 40;
        values[valuesById[41] = "PUT_UOM"] = 41;
        values[valuesById[42] = "GET_AUTH_KEY"] = 42;
        values[valuesById[43] = "PUT_AUTH_KEY"] = 43;
        values[valuesById[44] = "PUT_HEALTH"] = 44;
        values[valuesById[45] = "PUT_TCP_REQUEST"] = 45;
        values[valuesById[46] = "GET_STING_START"] = 46;
        values[valuesById[47] = "GET_LOGS_URI"] = 47;
        return values;
    })();

    /**
     * SensorType enum.
     * @name client.SensorType
     * @enum {number}
     * @property {number} SOUND=0 SOUND value
     * @property {number} MOTION=1 MOTION value
     * @property {number} TEMPERATURE=2 TEMPERATURE value
     * @property {number} HUMIDITY=3 HUMIDITY value
     * @property {number} LIGHT=4 LIGHT value
     * @property {number} NIGHT=5 NIGHT value
     */
    client.SensorType = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "SOUND"] = 0;
        values[valuesById[1] = "MOTION"] = 1;
        values[valuesById[2] = "TEMPERATURE"] = 2;
        values[valuesById[3] = "HUMIDITY"] = 3;
        values[valuesById[4] = "LIGHT"] = 4;
        values[valuesById[5] = "NIGHT"] = 5;
        return values;
    })();

    client.SensorData = (function() {

        /**
         * Properties of a SensorData.
         * @memberof client
         * @interface ISensorData
         * @property {client.SensorType} sensorType SensorData sensorType
         * @property {boolean|null} [isAlert] SensorData isAlert
         * @property {number|null} [timestamp] SensorData timestamp
         * @property {number|null} [valueMilli] SensorData valueMilli
         * @property {number|null} [value] SensorData value
         */

        /**
         * Constructs a new SensorData.
         * @memberof client
         * @classdesc Represents a SensorData.
         * @implements ISensorData
         * @constructor
         * @param {client.ISensorData=} [properties] Properties to set
         */
        function SensorData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SensorData sensorType.
         * @member {client.SensorType} sensorType
         * @memberof client.SensorData
         * @instance
         */
        SensorData.prototype.sensorType = 0;

        /**
         * SensorData isAlert.
         * @member {boolean} isAlert
         * @memberof client.SensorData
         * @instance
         */
        SensorData.prototype.isAlert = false;

        /**
         * SensorData timestamp.
         * @member {number} timestamp
         * @memberof client.SensorData
         * @instance
         */
        SensorData.prototype.timestamp = 0;

        /**
         * SensorData valueMilli.
         * @member {number} valueMilli
         * @memberof client.SensorData
         * @instance
         */
        SensorData.prototype.valueMilli = 0;

        /**
         * SensorData value.
         * @member {number} value
         * @memberof client.SensorData
         * @instance
         */
        SensorData.prototype.value = 0;

        /**
         * Creates a new SensorData instance using the specified properties.
         * @function create
         * @memberof client.SensorData
         * @static
         * @param {client.ISensorData=} [properties] Properties to set
         * @returns {client.SensorData} SensorData instance
         */
        SensorData.create = function create(properties) {
            return new SensorData(properties);
        };

        /**
         * Encodes the specified SensorData message. Does not implicitly {@link client.SensorData.verify|verify} messages.
         * @function encode
         * @memberof client.SensorData
         * @static
         * @param {client.ISensorData} message SensorData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SensorData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.sensorType);
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.value);
            if (message.isAlert != null && Object.hasOwnProperty.call(message, "isAlert"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.isAlert);
            if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.timestamp);
            if (message.valueMilli != null && Object.hasOwnProperty.call(message, "valueMilli"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.valueMilli);
            return writer;
        };

        /**
         * Encodes the specified SensorData message, length delimited. Does not implicitly {@link client.SensorData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof client.SensorData
         * @static
         * @param {client.ISensorData} message SensorData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SensorData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SensorData message from the specified reader or buffer.
         * @function decode
         * @memberof client.SensorData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {client.SensorData} SensorData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SensorData.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.client.SensorData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.sensorType = reader.int32();
                        break;
                    }
                case 4: {
                        message.isAlert = reader.bool();
                        break;
                    }
                case 5: {
                        message.timestamp = reader.int32();
                        break;
                    }
                case 6: {
                        message.valueMilli = reader.int32();
                        break;
                    }
                case 3: {
                        message.value = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("sensorType"))
                throw $util.ProtocolError("missing required 'sensorType'", { instance: message });
            return message;
        };

        /**
         * Decodes a SensorData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof client.SensorData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {client.SensorData} SensorData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SensorData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SensorData message.
         * @function verify
         * @memberof client.SensorData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SensorData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.sensorType) {
            default:
                return "sensorType: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            }
            if (message.isAlert != null && message.hasOwnProperty("isAlert"))
                if (typeof message.isAlert !== "boolean")
                    return "isAlert: boolean expected";
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (!$util.isInteger(message.timestamp))
                    return "timestamp: integer expected";
            if (message.valueMilli != null && message.hasOwnProperty("valueMilli"))
                if (!$util.isInteger(message.valueMilli))
                    return "valueMilli: integer expected";
            if (message.value != null && message.hasOwnProperty("value"))
                if (!$util.isInteger(message.value))
                    return "value: integer expected";
            return null;
        };

        /**
         * Creates a SensorData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof client.SensorData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {client.SensorData} SensorData
         */
        SensorData.fromObject = function fromObject(object) {
            if (object instanceof $root.client.SensorData)
                return object;
            var message = new $root.client.SensorData();
            switch (object.sensorType) {
            default:
                if (typeof object.sensorType === "number") {
                    message.sensorType = object.sensorType;
                    break;
                }
                break;
            case "SOUND":
            case 0:
                message.sensorType = 0;
                break;
            case "MOTION":
            case 1:
                message.sensorType = 1;
                break;
            case "TEMPERATURE":
            case 2:
                message.sensorType = 2;
                break;
            case "HUMIDITY":
            case 3:
                message.sensorType = 3;
                break;
            case "LIGHT":
            case 4:
                message.sensorType = 4;
                break;
            case "NIGHT":
            case 5:
                message.sensorType = 5;
                break;
            }
            if (object.isAlert != null)
                message.isAlert = Boolean(object.isAlert);
            if (object.timestamp != null)
                message.timestamp = object.timestamp | 0;
            if (object.valueMilli != null)
                message.valueMilli = object.valueMilli | 0;
            if (object.value != null)
                message.value = object.value | 0;
            return message;
        };

        /**
         * Creates a plain object from a SensorData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof client.SensorData
         * @static
         * @param {client.SensorData} message SensorData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SensorData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.sensorType = options.enums === String ? "SOUND" : 0;
                object.value = 0;
                object.isAlert = false;
                object.timestamp = 0;
                object.valueMilli = 0;
            }
            if (message.sensorType != null && message.hasOwnProperty("sensorType"))
                object.sensorType = options.enums === String ? $root.client.SensorType[message.sensorType] === undefined ? message.sensorType : $root.client.SensorType[message.sensorType] : message.sensorType;
            if (message.value != null && message.hasOwnProperty("value"))
                object.value = message.value;
            if (message.isAlert != null && message.hasOwnProperty("isAlert"))
                object.isAlert = message.isAlert;
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                object.timestamp = message.timestamp;
            if (message.valueMilli != null && message.hasOwnProperty("valueMilli"))
                object.valueMilli = message.valueMilli;
            return object;
        };

        /**
         * Converts this SensorData to JSON.
         * @function toJSON
         * @memberof client.SensorData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SensorData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SensorData
         * @function getTypeUrl
         * @memberof client.SensorData
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SensorData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/client.SensorData";
        };

        return SensorData;
    })();

    client.GetSensorData = (function() {

        /**
         * Properties of a GetSensorData.
         * @memberof client
         * @interface IGetSensorData
         * @property {boolean|null} [all] GetSensorData all
         * @property {boolean|null} [temperature] GetSensorData temperature
         * @property {boolean|null} [humidity] GetSensorData humidity
         * @property {boolean|null} [light] GetSensorData light
         * @property {boolean|null} [night] GetSensorData night
         */

        /**
         * Constructs a new GetSensorData.
         * @memberof client
         * @classdesc Represents a GetSensorData.
         * @implements IGetSensorData
         * @constructor
         * @param {client.IGetSensorData=} [properties] Properties to set
         */
        function GetSensorData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetSensorData all.
         * @member {boolean} all
         * @memberof client.GetSensorData
         * @instance
         */
        GetSensorData.prototype.all = false;

        /**
         * GetSensorData temperature.
         * @member {boolean} temperature
         * @memberof client.GetSensorData
         * @instance
         */
        GetSensorData.prototype.temperature = false;

        /**
         * GetSensorData humidity.
         * @member {boolean} humidity
         * @memberof client.GetSensorData
         * @instance
         */
        GetSensorData.prototype.humidity = false;

        /**
         * GetSensorData light.
         * @member {boolean} light
         * @memberof client.GetSensorData
         * @instance
         */
        GetSensorData.prototype.light = false;

        /**
         * GetSensorData night.
         * @member {boolean} night
         * @memberof client.GetSensorData
         * @instance
         */
        GetSensorData.prototype.night = false;

        /**
         * Creates a new GetSensorData instance using the specified properties.
         * @function create
         * @memberof client.GetSensorData
         * @static
         * @param {client.IGetSensorData=} [properties] Properties to set
         * @returns {client.GetSensorData} GetSensorData instance
         */
        GetSensorData.create = function create(properties) {
            return new GetSensorData(properties);
        };

        /**
         * Encodes the specified GetSensorData message. Does not implicitly {@link client.GetSensorData.verify|verify} messages.
         * @function encode
         * @memberof client.GetSensorData
         * @static
         * @param {client.IGetSensorData} message GetSensorData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetSensorData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.all != null && Object.hasOwnProperty.call(message, "all"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.all);
            if (message.temperature != null && Object.hasOwnProperty.call(message, "temperature"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.temperature);
            if (message.humidity != null && Object.hasOwnProperty.call(message, "humidity"))
                writer.uint32(/* id 5, wireType 0 =*/40).bool(message.humidity);
            if (message.light != null && Object.hasOwnProperty.call(message, "light"))
                writer.uint32(/* id 6, wireType 0 =*/48).bool(message.light);
            if (message.night != null && Object.hasOwnProperty.call(message, "night"))
                writer.uint32(/* id 7, wireType 0 =*/56).bool(message.night);
            return writer;
        };

        /**
         * Encodes the specified GetSensorData message, length delimited. Does not implicitly {@link client.GetSensorData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof client.GetSensorData
         * @static
         * @param {client.IGetSensorData} message GetSensorData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetSensorData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GetSensorData message from the specified reader or buffer.
         * @function decode
         * @memberof client.GetSensorData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {client.GetSensorData} GetSensorData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetSensorData.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.client.GetSensorData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.all = reader.bool();
                        break;
                    }
                case 4: {
                        message.temperature = reader.bool();
                        break;
                    }
                case 5: {
                        message.humidity = reader.bool();
                        break;
                    }
                case 6: {
                        message.light = reader.bool();
                        break;
                    }
                case 7: {
                        message.night = reader.bool();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GetSensorData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof client.GetSensorData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {client.GetSensorData} GetSensorData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetSensorData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GetSensorData message.
         * @function verify
         * @memberof client.GetSensorData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GetSensorData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.all != null && message.hasOwnProperty("all"))
                if (typeof message.all !== "boolean")
                    return "all: boolean expected";
            if (message.temperature != null && message.hasOwnProperty("temperature"))
                if (typeof message.temperature !== "boolean")
                    return "temperature: boolean expected";
            if (message.humidity != null && message.hasOwnProperty("humidity"))
                if (typeof message.humidity !== "boolean")
                    return "humidity: boolean expected";
            if (message.light != null && message.hasOwnProperty("light"))
                if (typeof message.light !== "boolean")
                    return "light: boolean expected";
            if (message.night != null && message.hasOwnProperty("night"))
                if (typeof message.night !== "boolean")
                    return "night: boolean expected";
            return null;
        };

        /**
         * Creates a GetSensorData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof client.GetSensorData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {client.GetSensorData} GetSensorData
         */
        GetSensorData.fromObject = function fromObject(object) {
            if (object instanceof $root.client.GetSensorData)
                return object;
            var message = new $root.client.GetSensorData();
            if (object.all != null)
                message.all = Boolean(object.all);
            if (object.temperature != null)
                message.temperature = Boolean(object.temperature);
            if (object.humidity != null)
                message.humidity = Boolean(object.humidity);
            if (object.light != null)
                message.light = Boolean(object.light);
            if (object.night != null)
                message.night = Boolean(object.night);
            return message;
        };

        /**
         * Creates a plain object from a GetSensorData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof client.GetSensorData
         * @static
         * @param {client.GetSensorData} message GetSensorData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetSensorData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.all = false;
                object.temperature = false;
                object.humidity = false;
                object.light = false;
                object.night = false;
            }
            if (message.all != null && message.hasOwnProperty("all"))
                object.all = message.all;
            if (message.temperature != null && message.hasOwnProperty("temperature"))
                object.temperature = message.temperature;
            if (message.humidity != null && message.hasOwnProperty("humidity"))
                object.humidity = message.humidity;
            if (message.light != null && message.hasOwnProperty("light"))
                object.light = message.light;
            if (message.night != null && message.hasOwnProperty("night"))
                object.night = message.night;
            return object;
        };

        /**
         * Converts this GetSensorData to JSON.
         * @function toJSON
         * @memberof client.GetSensorData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetSensorData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GetSensorData
         * @function getTypeUrl
         * @memberof client.GetSensorData
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GetSensorData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/client.GetSensorData";
        };

        return GetSensorData;
    })();

    client.Control = (function() {

        /**
         * Properties of a Control.
         * @memberof client
         * @interface IControl
         * @property {boolean|null} [forceConnectToServer] Control forceConnectToServer
         * @property {number|null} [nightLightTimeout] Control nightLightTimeout
         * @property {client.Control.NightLight|null} [nightLight] Control nightLight
         * @property {client.Control.ISensorDataTransfer|null} [sensorDataTransfer] Control sensorDataTransfer
         */

        /**
         * Constructs a new Control.
         * @memberof client
         * @classdesc Represents a Control.
         * @implements IControl
         * @constructor
         * @param {client.IControl=} [properties] Properties to set
         */
        function Control(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Control forceConnectToServer.
         * @member {boolean} forceConnectToServer
         * @memberof client.Control
         * @instance
         */
        Control.prototype.forceConnectToServer = false;

        /**
         * Control nightLightTimeout.
         * @member {number} nightLightTimeout
         * @memberof client.Control
         * @instance
         */
        Control.prototype.nightLightTimeout = 0;

        /**
         * Control nightLight.
         * @member {client.Control.NightLight} nightLight
         * @memberof client.Control
         * @instance
         */
        Control.prototype.nightLight = 0;

        /**
         * Control sensorDataTransfer.
         * @member {client.Control.ISensorDataTransfer|null|undefined} sensorDataTransfer
         * @memberof client.Control
         * @instance
         */
        Control.prototype.sensorDataTransfer = null;

        /**
         * Creates a new Control instance using the specified properties.
         * @function create
         * @memberof client.Control
         * @static
         * @param {client.IControl=} [properties] Properties to set
         * @returns {client.Control} Control instance
         */
        Control.create = function create(properties) {
            return new Control(properties);
        };

        /**
         * Encodes the specified Control message. Does not implicitly {@link client.Control.verify|verify} messages.
         * @function encode
         * @memberof client.Control
         * @static
         * @param {client.IControl} message Control message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Control.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.nightLight != null && Object.hasOwnProperty.call(message, "nightLight"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.nightLight);
            if (message.sensorDataTransfer != null && Object.hasOwnProperty.call(message, "sensorDataTransfer"))
                $root.client.Control.SensorDataTransfer.encode(message.sensorDataTransfer, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.forceConnectToServer != null && Object.hasOwnProperty.call(message, "forceConnectToServer"))
                writer.uint32(/* id 5, wireType 0 =*/40).bool(message.forceConnectToServer);
            if (message.nightLightTimeout != null && Object.hasOwnProperty.call(message, "nightLightTimeout"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.nightLightTimeout);
            return writer;
        };

        /**
         * Encodes the specified Control message, length delimited. Does not implicitly {@link client.Control.verify|verify} messages.
         * @function encodeDelimited
         * @memberof client.Control
         * @static
         * @param {client.IControl} message Control message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Control.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Control message from the specified reader or buffer.
         * @function decode
         * @memberof client.Control
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {client.Control} Control
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Control.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.client.Control();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 5: {
                        message.forceConnectToServer = reader.bool();
                        break;
                    }
                case 6: {
                        message.nightLightTimeout = reader.int32();
                        break;
                    }
                case 3: {
                        message.nightLight = reader.int32();
                        break;
                    }
                case 4: {
                        message.sensorDataTransfer = $root.client.Control.SensorDataTransfer.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Control message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof client.Control
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {client.Control} Control
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Control.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Control message.
         * @function verify
         * @memberof client.Control
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Control.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.forceConnectToServer != null && message.hasOwnProperty("forceConnectToServer"))
                if (typeof message.forceConnectToServer !== "boolean")
                    return "forceConnectToServer: boolean expected";
            if (message.nightLightTimeout != null && message.hasOwnProperty("nightLightTimeout"))
                if (!$util.isInteger(message.nightLightTimeout))
                    return "nightLightTimeout: integer expected";
            if (message.nightLight != null && message.hasOwnProperty("nightLight"))
                switch (message.nightLight) {
                default:
                    return "nightLight: enum value expected";
                case 0:
                case 1:
                    break;
                }
            if (message.sensorDataTransfer != null && message.hasOwnProperty("sensorDataTransfer")) {
                var error = $root.client.Control.SensorDataTransfer.verify(message.sensorDataTransfer);
                if (error)
                    return "sensorDataTransfer." + error;
            }
            return null;
        };

        /**
         * Creates a Control message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof client.Control
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {client.Control} Control
         */
        Control.fromObject = function fromObject(object) {
            if (object instanceof $root.client.Control)
                return object;
            var message = new $root.client.Control();
            if (object.forceConnectToServer != null)
                message.forceConnectToServer = Boolean(object.forceConnectToServer);
            if (object.nightLightTimeout != null)
                message.nightLightTimeout = object.nightLightTimeout | 0;
            switch (object.nightLight) {
            default:
                if (typeof object.nightLight === "number") {
                    message.nightLight = object.nightLight;
                    break;
                }
                break;
            case "LIGHT_OFF":
            case 0:
                message.nightLight = 0;
                break;
            case "LIGHT_ON":
            case 1:
                message.nightLight = 1;
                break;
            }
            if (object.sensorDataTransfer != null) {
                if (typeof object.sensorDataTransfer !== "object")
                    throw TypeError(".client.Control.sensorDataTransfer: object expected");
                message.sensorDataTransfer = $root.client.Control.SensorDataTransfer.fromObject(object.sensorDataTransfer);
            }
            return message;
        };

        /**
         * Creates a plain object from a Control message. Also converts values to other types if specified.
         * @function toObject
         * @memberof client.Control
         * @static
         * @param {client.Control} message Control
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Control.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.nightLight = options.enums === String ? "LIGHT_OFF" : 0;
                object.sensorDataTransfer = null;
                object.forceConnectToServer = false;
                object.nightLightTimeout = 0;
            }
            if (message.nightLight != null && message.hasOwnProperty("nightLight"))
                object.nightLight = options.enums === String ? $root.client.Control.NightLight[message.nightLight] === undefined ? message.nightLight : $root.client.Control.NightLight[message.nightLight] : message.nightLight;
            if (message.sensorDataTransfer != null && message.hasOwnProperty("sensorDataTransfer"))
                object.sensorDataTransfer = $root.client.Control.SensorDataTransfer.toObject(message.sensorDataTransfer, options);
            if (message.forceConnectToServer != null && message.hasOwnProperty("forceConnectToServer"))
                object.forceConnectToServer = message.forceConnectToServer;
            if (message.nightLightTimeout != null && message.hasOwnProperty("nightLightTimeout"))
                object.nightLightTimeout = message.nightLightTimeout;
            return object;
        };

        /**
         * Converts this Control to JSON.
         * @function toJSON
         * @memberof client.Control
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Control.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Control
         * @function getTypeUrl
         * @memberof client.Control
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Control.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/client.Control";
        };

        /**
         * NightLight enum.
         * @name client.Control.NightLight
         * @enum {number}
         * @property {number} LIGHT_OFF=0 LIGHT_OFF value
         * @property {number} LIGHT_ON=1 LIGHT_ON value
         */
        Control.NightLight = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "LIGHT_OFF"] = 0;
            values[valuesById[1] = "LIGHT_ON"] = 1;
            return values;
        })();

        Control.SensorDataTransfer = (function() {

            /**
             * Properties of a SensorDataTransfer.
             * @memberof client.Control
             * @interface ISensorDataTransfer
             * @property {boolean|null} [sound] SensorDataTransfer sound
             * @property {boolean|null} [motion] SensorDataTransfer motion
             * @property {boolean|null} [temperature] SensorDataTransfer temperature
             * @property {boolean|null} [humidity] SensorDataTransfer humidity
             * @property {boolean|null} [light] SensorDataTransfer light
             * @property {boolean|null} [night] SensorDataTransfer night
             */

            /**
             * Constructs a new SensorDataTransfer.
             * @memberof client.Control
             * @classdesc Represents a SensorDataTransfer.
             * @implements ISensorDataTransfer
             * @constructor
             * @param {client.Control.ISensorDataTransfer=} [properties] Properties to set
             */
            function SensorDataTransfer(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * SensorDataTransfer sound.
             * @member {boolean} sound
             * @memberof client.Control.SensorDataTransfer
             * @instance
             */
            SensorDataTransfer.prototype.sound = false;

            /**
             * SensorDataTransfer motion.
             * @member {boolean} motion
             * @memberof client.Control.SensorDataTransfer
             * @instance
             */
            SensorDataTransfer.prototype.motion = false;

            /**
             * SensorDataTransfer temperature.
             * @member {boolean} temperature
             * @memberof client.Control.SensorDataTransfer
             * @instance
             */
            SensorDataTransfer.prototype.temperature = false;

            /**
             * SensorDataTransfer humidity.
             * @member {boolean} humidity
             * @memberof client.Control.SensorDataTransfer
             * @instance
             */
            SensorDataTransfer.prototype.humidity = false;

            /**
             * SensorDataTransfer light.
             * @member {boolean} light
             * @memberof client.Control.SensorDataTransfer
             * @instance
             */
            SensorDataTransfer.prototype.light = false;

            /**
             * SensorDataTransfer night.
             * @member {boolean} night
             * @memberof client.Control.SensorDataTransfer
             * @instance
             */
            SensorDataTransfer.prototype.night = false;

            /**
             * Creates a new SensorDataTransfer instance using the specified properties.
             * @function create
             * @memberof client.Control.SensorDataTransfer
             * @static
             * @param {client.Control.ISensorDataTransfer=} [properties] Properties to set
             * @returns {client.Control.SensorDataTransfer} SensorDataTransfer instance
             */
            SensorDataTransfer.create = function create(properties) {
                return new SensorDataTransfer(properties);
            };

            /**
             * Encodes the specified SensorDataTransfer message. Does not implicitly {@link client.Control.SensorDataTransfer.verify|verify} messages.
             * @function encode
             * @memberof client.Control.SensorDataTransfer
             * @static
             * @param {client.Control.ISensorDataTransfer} message SensorDataTransfer message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SensorDataTransfer.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.sound != null && Object.hasOwnProperty.call(message, "sound"))
                    writer.uint32(/* id 1, wireType 0 =*/8).bool(message.sound);
                if (message.motion != null && Object.hasOwnProperty.call(message, "motion"))
                    writer.uint32(/* id 2, wireType 0 =*/16).bool(message.motion);
                if (message.temperature != null && Object.hasOwnProperty.call(message, "temperature"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.temperature);
                if (message.humidity != null && Object.hasOwnProperty.call(message, "humidity"))
                    writer.uint32(/* id 4, wireType 0 =*/32).bool(message.humidity);
                if (message.light != null && Object.hasOwnProperty.call(message, "light"))
                    writer.uint32(/* id 5, wireType 0 =*/40).bool(message.light);
                if (message.night != null && Object.hasOwnProperty.call(message, "night"))
                    writer.uint32(/* id 6, wireType 0 =*/48).bool(message.night);
                return writer;
            };

            /**
             * Encodes the specified SensorDataTransfer message, length delimited. Does not implicitly {@link client.Control.SensorDataTransfer.verify|verify} messages.
             * @function encodeDelimited
             * @memberof client.Control.SensorDataTransfer
             * @static
             * @param {client.Control.ISensorDataTransfer} message SensorDataTransfer message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SensorDataTransfer.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a SensorDataTransfer message from the specified reader or buffer.
             * @function decode
             * @memberof client.Control.SensorDataTransfer
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {client.Control.SensorDataTransfer} SensorDataTransfer
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SensorDataTransfer.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.client.Control.SensorDataTransfer();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.sound = reader.bool();
                            break;
                        }
                    case 2: {
                            message.motion = reader.bool();
                            break;
                        }
                    case 3: {
                            message.temperature = reader.bool();
                            break;
                        }
                    case 4: {
                            message.humidity = reader.bool();
                            break;
                        }
                    case 5: {
                            message.light = reader.bool();
                            break;
                        }
                    case 6: {
                            message.night = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a SensorDataTransfer message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof client.Control.SensorDataTransfer
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {client.Control.SensorDataTransfer} SensorDataTransfer
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SensorDataTransfer.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a SensorDataTransfer message.
             * @function verify
             * @memberof client.Control.SensorDataTransfer
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SensorDataTransfer.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.sound != null && message.hasOwnProperty("sound"))
                    if (typeof message.sound !== "boolean")
                        return "sound: boolean expected";
                if (message.motion != null && message.hasOwnProperty("motion"))
                    if (typeof message.motion !== "boolean")
                        return "motion: boolean expected";
                if (message.temperature != null && message.hasOwnProperty("temperature"))
                    if (typeof message.temperature !== "boolean")
                        return "temperature: boolean expected";
                if (message.humidity != null && message.hasOwnProperty("humidity"))
                    if (typeof message.humidity !== "boolean")
                        return "humidity: boolean expected";
                if (message.light != null && message.hasOwnProperty("light"))
                    if (typeof message.light !== "boolean")
                        return "light: boolean expected";
                if (message.night != null && message.hasOwnProperty("night"))
                    if (typeof message.night !== "boolean")
                        return "night: boolean expected";
                return null;
            };

            /**
             * Creates a SensorDataTransfer message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof client.Control.SensorDataTransfer
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {client.Control.SensorDataTransfer} SensorDataTransfer
             */
            SensorDataTransfer.fromObject = function fromObject(object) {
                if (object instanceof $root.client.Control.SensorDataTransfer)
                    return object;
                var message = new $root.client.Control.SensorDataTransfer();
                if (object.sound != null)
                    message.sound = Boolean(object.sound);
                if (object.motion != null)
                    message.motion = Boolean(object.motion);
                if (object.temperature != null)
                    message.temperature = Boolean(object.temperature);
                if (object.humidity != null)
                    message.humidity = Boolean(object.humidity);
                if (object.light != null)
                    message.light = Boolean(object.light);
                if (object.night != null)
                    message.night = Boolean(object.night);
                return message;
            };

            /**
             * Creates a plain object from a SensorDataTransfer message. Also converts values to other types if specified.
             * @function toObject
             * @memberof client.Control.SensorDataTransfer
             * @static
             * @param {client.Control.SensorDataTransfer} message SensorDataTransfer
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SensorDataTransfer.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.sound = false;
                    object.motion = false;
                    object.temperature = false;
                    object.humidity = false;
                    object.light = false;
                    object.night = false;
                }
                if (message.sound != null && message.hasOwnProperty("sound"))
                    object.sound = message.sound;
                if (message.motion != null && message.hasOwnProperty("motion"))
                    object.motion = message.motion;
                if (message.temperature != null && message.hasOwnProperty("temperature"))
                    object.temperature = message.temperature;
                if (message.humidity != null && message.hasOwnProperty("humidity"))
                    object.humidity = message.humidity;
                if (message.light != null && message.hasOwnProperty("light"))
                    object.light = message.light;
                if (message.night != null && message.hasOwnProperty("night"))
                    object.night = message.night;
                return object;
            };

            /**
             * Converts this SensorDataTransfer to JSON.
             * @function toJSON
             * @memberof client.Control.SensorDataTransfer
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SensorDataTransfer.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for SensorDataTransfer
             * @function getTypeUrl
             * @memberof client.Control.SensorDataTransfer
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            SensorDataTransfer.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/client.Control.SensorDataTransfer";
            };

            return SensorDataTransfer;
        })();

        return Control;
    })();

    /**
     * StreamIdentifier enum.
     * @name client.StreamIdentifier
     * @enum {number}
     * @property {number} DVR=0 DVR value
     * @property {number} ANALYTICS=1 ANALYTICS value
     * @property {number} MOBILE=2 MOBILE value
     */
    client.StreamIdentifier = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "DVR"] = 0;
        values[valuesById[1] = "ANALYTICS"] = 1;
        values[valuesById[2] = "MOBILE"] = 2;
        return values;
    })();

    /**
     * MountingMode enum.
     * @name client.MountingMode
     * @enum {number}
     * @property {number} STAND=0 STAND value
     * @property {number} TRAVEL=1 TRAVEL value
     * @property {number} SWITCH=2 SWITCH value
     */
    client.MountingMode = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "STAND"] = 0;
        values[valuesById[1] = "TRAVEL"] = 1;
        values[valuesById[2] = "SWITCH"] = 2;
        return values;
    })();

    client.Settings = (function() {

        /**
         * Properties of a Settings.
         * @memberof client
         * @interface ISettings
         * @property {boolean|null} [nightVision] Settings nightVision
         * @property {Array.<client.Settings.ISensorSettings>|null} [sensors] Settings sensors
         * @property {Array.<client.Settings.IStreamSettings>|null} [streams] Settings streams
         * @property {number|null} [volume] Settings volume
         * @property {client.Settings.AntiFlicker|null} [antiFlicker] Settings antiFlicker
         * @property {boolean|null} [sleepMode] Settings sleepMode
         * @property {boolean|null} [statusLightOn] Settings statusLightOn
         * @property {number|null} [mountingMode] Settings mountingMode
         * @property {client.Settings.WifiBand|null} [wifiBand] Settings wifiBand
         * @property {boolean|null} [micMuteOn] Settings micMuteOn
         */

        /**
         * Constructs a new Settings.
         * @memberof client
         * @classdesc Represents a Settings.
         * @implements ISettings
         * @constructor
         * @param {client.ISettings=} [properties] Properties to set
         */
        function Settings(properties) {
            this.sensors = [];
            this.streams = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Settings nightVision.
         * @member {boolean} nightVision
         * @memberof client.Settings
         * @instance
         */
        Settings.prototype.nightVision = false;

        /**
         * Settings sensors.
         * @member {Array.<client.Settings.ISensorSettings>} sensors
         * @memberof client.Settings
         * @instance
         */
        Settings.prototype.sensors = $util.emptyArray;

        /**
         * Settings streams.
         * @member {Array.<client.Settings.IStreamSettings>} streams
         * @memberof client.Settings
         * @instance
         */
        Settings.prototype.streams = $util.emptyArray;

        /**
         * Settings volume.
         * @member {number} volume
         * @memberof client.Settings
         * @instance
         */
        Settings.prototype.volume = 0;

        /**
         * Settings antiFlicker.
         * @member {client.Settings.AntiFlicker} antiFlicker
         * @memberof client.Settings
         * @instance
         */
        Settings.prototype.antiFlicker = 0;

        /**
         * Settings sleepMode.
         * @member {boolean} sleepMode
         * @memberof client.Settings
         * @instance
         */
        Settings.prototype.sleepMode = false;

        /**
         * Settings statusLightOn.
         * @member {boolean} statusLightOn
         * @memberof client.Settings
         * @instance
         */
        Settings.prototype.statusLightOn = false;

        /**
         * Settings mountingMode.
         * @member {number} mountingMode
         * @memberof client.Settings
         * @instance
         */
        Settings.prototype.mountingMode = 0;

        /**
         * Settings wifiBand.
         * @member {client.Settings.WifiBand} wifiBand
         * @memberof client.Settings
         * @instance
         */
        Settings.prototype.wifiBand = 0;

        /**
         * Settings micMuteOn.
         * @member {boolean} micMuteOn
         * @memberof client.Settings
         * @instance
         */
        Settings.prototype.micMuteOn = false;

        /**
         * Creates a new Settings instance using the specified properties.
         * @function create
         * @memberof client.Settings
         * @static
         * @param {client.ISettings=} [properties] Properties to set
         * @returns {client.Settings} Settings instance
         */
        Settings.create = function create(properties) {
            return new Settings(properties);
        };

        /**
         * Encodes the specified Settings message. Does not implicitly {@link client.Settings.verify|verify} messages.
         * @function encode
         * @memberof client.Settings
         * @static
         * @param {client.ISettings} message Settings message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Settings.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.nightVision != null && Object.hasOwnProperty.call(message, "nightVision"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.nightVision);
            if (message.sensors != null && message.sensors.length)
                for (var i = 0; i < message.sensors.length; ++i)
                    $root.client.Settings.SensorSettings.encode(message.sensors[i], writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
            if (message.streams != null && message.streams.length)
                for (var i = 0; i < message.streams.length; ++i)
                    $root.client.Settings.StreamSettings.encode(message.streams[i], writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
            if (message.volume != null && Object.hasOwnProperty.call(message, "volume"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.volume);
            if (message.antiFlicker != null && Object.hasOwnProperty.call(message, "antiFlicker"))
                writer.uint32(/* id 10, wireType 0 =*/80).int32(message.antiFlicker);
            if (message.sleepMode != null && Object.hasOwnProperty.call(message, "sleepMode"))
                writer.uint32(/* id 11, wireType 0 =*/88).bool(message.sleepMode);
            if (message.statusLightOn != null && Object.hasOwnProperty.call(message, "statusLightOn"))
                writer.uint32(/* id 12, wireType 0 =*/96).bool(message.statusLightOn);
            if (message.mountingMode != null && Object.hasOwnProperty.call(message, "mountingMode"))
                writer.uint32(/* id 15, wireType 0 =*/120).int32(message.mountingMode);
            if (message.wifiBand != null && Object.hasOwnProperty.call(message, "wifiBand"))
                writer.uint32(/* id 18, wireType 0 =*/144).int32(message.wifiBand);
            if (message.micMuteOn != null && Object.hasOwnProperty.call(message, "micMuteOn"))
                writer.uint32(/* id 20, wireType 0 =*/160).bool(message.micMuteOn);
            return writer;
        };

        /**
         * Encodes the specified Settings message, length delimited. Does not implicitly {@link client.Settings.verify|verify} messages.
         * @function encodeDelimited
         * @memberof client.Settings
         * @static
         * @param {client.ISettings} message Settings message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Settings.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Settings message from the specified reader or buffer.
         * @function decode
         * @memberof client.Settings
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {client.Settings} Settings
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Settings.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.client.Settings();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 2: {
                        message.nightVision = reader.bool();
                        break;
                    }
                case 7: {
                        if (!(message.sensors && message.sensors.length))
                            message.sensors = [];
                        message.sensors.push($root.client.Settings.SensorSettings.decode(reader, reader.uint32()));
                        break;
                    }
                case 8: {
                        if (!(message.streams && message.streams.length))
                            message.streams = [];
                        message.streams.push($root.client.Settings.StreamSettings.decode(reader, reader.uint32()));
                        break;
                    }
                case 9: {
                        message.volume = reader.int32();
                        break;
                    }
                case 10: {
                        message.antiFlicker = reader.int32();
                        break;
                    }
                case 11: {
                        message.sleepMode = reader.bool();
                        break;
                    }
                case 12: {
                        message.statusLightOn = reader.bool();
                        break;
                    }
                case 15: {
                        message.mountingMode = reader.int32();
                        break;
                    }
                case 18: {
                        message.wifiBand = reader.int32();
                        break;
                    }
                case 20: {
                        message.micMuteOn = reader.bool();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Settings message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof client.Settings
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {client.Settings} Settings
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Settings.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Settings message.
         * @function verify
         * @memberof client.Settings
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Settings.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.nightVision != null && message.hasOwnProperty("nightVision"))
                if (typeof message.nightVision !== "boolean")
                    return "nightVision: boolean expected";
            if (message.sensors != null && message.hasOwnProperty("sensors")) {
                if (!Array.isArray(message.sensors))
                    return "sensors: array expected";
                for (var i = 0; i < message.sensors.length; ++i) {
                    var error = $root.client.Settings.SensorSettings.verify(message.sensors[i]);
                    if (error)
                        return "sensors." + error;
                }
            }
            if (message.streams != null && message.hasOwnProperty("streams")) {
                if (!Array.isArray(message.streams))
                    return "streams: array expected";
                for (var i = 0; i < message.streams.length; ++i) {
                    var error = $root.client.Settings.StreamSettings.verify(message.streams[i]);
                    if (error)
                        return "streams." + error;
                }
            }
            if (message.volume != null && message.hasOwnProperty("volume"))
                if (!$util.isInteger(message.volume))
                    return "volume: integer expected";
            if (message.antiFlicker != null && message.hasOwnProperty("antiFlicker"))
                switch (message.antiFlicker) {
                default:
                    return "antiFlicker: enum value expected";
                case 0:
                case 1:
                    break;
                }
            if (message.sleepMode != null && message.hasOwnProperty("sleepMode"))
                if (typeof message.sleepMode !== "boolean")
                    return "sleepMode: boolean expected";
            if (message.statusLightOn != null && message.hasOwnProperty("statusLightOn"))
                if (typeof message.statusLightOn !== "boolean")
                    return "statusLightOn: boolean expected";
            if (message.mountingMode != null && message.hasOwnProperty("mountingMode"))
                if (!$util.isInteger(message.mountingMode))
                    return "mountingMode: integer expected";
            if (message.wifiBand != null && message.hasOwnProperty("wifiBand"))
                switch (message.wifiBand) {
                default:
                    return "wifiBand: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            if (message.micMuteOn != null && message.hasOwnProperty("micMuteOn"))
                if (typeof message.micMuteOn !== "boolean")
                    return "micMuteOn: boolean expected";
            return null;
        };

        /**
         * Creates a Settings message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof client.Settings
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {client.Settings} Settings
         */
        Settings.fromObject = function fromObject(object) {
            if (object instanceof $root.client.Settings)
                return object;
            var message = new $root.client.Settings();
            if (object.nightVision != null)
                message.nightVision = Boolean(object.nightVision);
            if (object.sensors) {
                if (!Array.isArray(object.sensors))
                    throw TypeError(".client.Settings.sensors: array expected");
                message.sensors = [];
                for (var i = 0; i < object.sensors.length; ++i) {
                    if (typeof object.sensors[i] !== "object")
                        throw TypeError(".client.Settings.sensors: object expected");
                    message.sensors[i] = $root.client.Settings.SensorSettings.fromObject(object.sensors[i]);
                }
            }
            if (object.streams) {
                if (!Array.isArray(object.streams))
                    throw TypeError(".client.Settings.streams: array expected");
                message.streams = [];
                for (var i = 0; i < object.streams.length; ++i) {
                    if (typeof object.streams[i] !== "object")
                        throw TypeError(".client.Settings.streams: object expected");
                    message.streams[i] = $root.client.Settings.StreamSettings.fromObject(object.streams[i]);
                }
            }
            if (object.volume != null)
                message.volume = object.volume | 0;
            switch (object.antiFlicker) {
            default:
                if (typeof object.antiFlicker === "number") {
                    message.antiFlicker = object.antiFlicker;
                    break;
                }
                break;
            case "FR50HZ":
            case 0:
                message.antiFlicker = 0;
                break;
            case "FR60HZ":
            case 1:
                message.antiFlicker = 1;
                break;
            }
            if (object.sleepMode != null)
                message.sleepMode = Boolean(object.sleepMode);
            if (object.statusLightOn != null)
                message.statusLightOn = Boolean(object.statusLightOn);
            if (object.mountingMode != null)
                message.mountingMode = object.mountingMode | 0;
            switch (object.wifiBand) {
            default:
                if (typeof object.wifiBand === "number") {
                    message.wifiBand = object.wifiBand;
                    break;
                }
                break;
            case "ANY":
            case 0:
                message.wifiBand = 0;
                break;
            case "FR2_4GHZ":
            case 1:
                message.wifiBand = 1;
                break;
            case "FR5_0GHZ":
            case 2:
                message.wifiBand = 2;
                break;
            }
            if (object.micMuteOn != null)
                message.micMuteOn = Boolean(object.micMuteOn);
            return message;
        };

        /**
         * Creates a plain object from a Settings message. Also converts values to other types if specified.
         * @function toObject
         * @memberof client.Settings
         * @static
         * @param {client.Settings} message Settings
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Settings.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.sensors = [];
                object.streams = [];
            }
            if (options.defaults) {
                object.nightVision = false;
                object.volume = 0;
                object.antiFlicker = options.enums === String ? "FR50HZ" : 0;
                object.sleepMode = false;
                object.statusLightOn = false;
                object.mountingMode = 0;
                object.wifiBand = options.enums === String ? "ANY" : 0;
                object.micMuteOn = false;
            }
            if (message.nightVision != null && message.hasOwnProperty("nightVision"))
                object.nightVision = message.nightVision;
            if (message.sensors && message.sensors.length) {
                object.sensors = [];
                for (var j = 0; j < message.sensors.length; ++j)
                    object.sensors[j] = $root.client.Settings.SensorSettings.toObject(message.sensors[j], options);
            }
            if (message.streams && message.streams.length) {
                object.streams = [];
                for (var j = 0; j < message.streams.length; ++j)
                    object.streams[j] = $root.client.Settings.StreamSettings.toObject(message.streams[j], options);
            }
            if (message.volume != null && message.hasOwnProperty("volume"))
                object.volume = message.volume;
            if (message.antiFlicker != null && message.hasOwnProperty("antiFlicker"))
                object.antiFlicker = options.enums === String ? $root.client.Settings.AntiFlicker[message.antiFlicker] === undefined ? message.antiFlicker : $root.client.Settings.AntiFlicker[message.antiFlicker] : message.antiFlicker;
            if (message.sleepMode != null && message.hasOwnProperty("sleepMode"))
                object.sleepMode = message.sleepMode;
            if (message.statusLightOn != null && message.hasOwnProperty("statusLightOn"))
                object.statusLightOn = message.statusLightOn;
            if (message.mountingMode != null && message.hasOwnProperty("mountingMode"))
                object.mountingMode = message.mountingMode;
            if (message.wifiBand != null && message.hasOwnProperty("wifiBand"))
                object.wifiBand = options.enums === String ? $root.client.Settings.WifiBand[message.wifiBand] === undefined ? message.wifiBand : $root.client.Settings.WifiBand[message.wifiBand] : message.wifiBand;
            if (message.micMuteOn != null && message.hasOwnProperty("micMuteOn"))
                object.micMuteOn = message.micMuteOn;
            return object;
        };

        /**
         * Converts this Settings to JSON.
         * @function toJSON
         * @memberof client.Settings
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Settings.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Settings
         * @function getTypeUrl
         * @memberof client.Settings
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Settings.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/client.Settings";
        };

        Settings.SensorSettings = (function() {

            /**
             * Properties of a SensorSettings.
             * @memberof client.Settings
             * @interface ISensorSettings
             * @property {client.SensorType} sensorType SensorSettings sensorType
             * @property {boolean|null} [useLowThreshold] SensorSettings useLowThreshold
             * @property {boolean|null} [useHighThreshold] SensorSettings useHighThreshold
             * @property {number|null} [lowThreshold] SensorSettings lowThreshold
             * @property {number|null} [highThreshold] SensorSettings highThreshold
             * @property {number|null} [sampleIntervalSec] SensorSettings sampleIntervalSec
             * @property {number|null} [triggerIntervalSec] SensorSettings triggerIntervalSec
             * @property {boolean|null} [useMilliForThresholds] SensorSettings useMilliForThresholds
             */

            /**
             * Constructs a new SensorSettings.
             * @memberof client.Settings
             * @classdesc Represents a SensorSettings.
             * @implements ISensorSettings
             * @constructor
             * @param {client.Settings.ISensorSettings=} [properties] Properties to set
             */
            function SensorSettings(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * SensorSettings sensorType.
             * @member {client.SensorType} sensorType
             * @memberof client.Settings.SensorSettings
             * @instance
             */
            SensorSettings.prototype.sensorType = 0;

            /**
             * SensorSettings useLowThreshold.
             * @member {boolean} useLowThreshold
             * @memberof client.Settings.SensorSettings
             * @instance
             */
            SensorSettings.prototype.useLowThreshold = false;

            /**
             * SensorSettings useHighThreshold.
             * @member {boolean} useHighThreshold
             * @memberof client.Settings.SensorSettings
             * @instance
             */
            SensorSettings.prototype.useHighThreshold = false;

            /**
             * SensorSettings lowThreshold.
             * @member {number} lowThreshold
             * @memberof client.Settings.SensorSettings
             * @instance
             */
            SensorSettings.prototype.lowThreshold = 0;

            /**
             * SensorSettings highThreshold.
             * @member {number} highThreshold
             * @memberof client.Settings.SensorSettings
             * @instance
             */
            SensorSettings.prototype.highThreshold = 0;

            /**
             * SensorSettings sampleIntervalSec.
             * @member {number} sampleIntervalSec
             * @memberof client.Settings.SensorSettings
             * @instance
             */
            SensorSettings.prototype.sampleIntervalSec = 0;

            /**
             * SensorSettings triggerIntervalSec.
             * @member {number} triggerIntervalSec
             * @memberof client.Settings.SensorSettings
             * @instance
             */
            SensorSettings.prototype.triggerIntervalSec = 0;

            /**
             * SensorSettings useMilliForThresholds.
             * @member {boolean} useMilliForThresholds
             * @memberof client.Settings.SensorSettings
             * @instance
             */
            SensorSettings.prototype.useMilliForThresholds = false;

            /**
             * Creates a new SensorSettings instance using the specified properties.
             * @function create
             * @memberof client.Settings.SensorSettings
             * @static
             * @param {client.Settings.ISensorSettings=} [properties] Properties to set
             * @returns {client.Settings.SensorSettings} SensorSettings instance
             */
            SensorSettings.create = function create(properties) {
                return new SensorSettings(properties);
            };

            /**
             * Encodes the specified SensorSettings message. Does not implicitly {@link client.Settings.SensorSettings.verify|verify} messages.
             * @function encode
             * @memberof client.Settings.SensorSettings
             * @static
             * @param {client.Settings.ISensorSettings} message SensorSettings message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SensorSettings.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.sensorType);
                if (message.useLowThreshold != null && Object.hasOwnProperty.call(message, "useLowThreshold"))
                    writer.uint32(/* id 2, wireType 0 =*/16).bool(message.useLowThreshold);
                if (message.useHighThreshold != null && Object.hasOwnProperty.call(message, "useHighThreshold"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.useHighThreshold);
                if (message.lowThreshold != null && Object.hasOwnProperty.call(message, "lowThreshold"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.lowThreshold);
                if (message.highThreshold != null && Object.hasOwnProperty.call(message, "highThreshold"))
                    writer.uint32(/* id 5, wireType 0 =*/40).int32(message.highThreshold);
                if (message.sampleIntervalSec != null && Object.hasOwnProperty.call(message, "sampleIntervalSec"))
                    writer.uint32(/* id 6, wireType 0 =*/48).int32(message.sampleIntervalSec);
                if (message.triggerIntervalSec != null && Object.hasOwnProperty.call(message, "triggerIntervalSec"))
                    writer.uint32(/* id 7, wireType 0 =*/56).int32(message.triggerIntervalSec);
                if (message.useMilliForThresholds != null && Object.hasOwnProperty.call(message, "useMilliForThresholds"))
                    writer.uint32(/* id 8, wireType 0 =*/64).bool(message.useMilliForThresholds);
                return writer;
            };

            /**
             * Encodes the specified SensorSettings message, length delimited. Does not implicitly {@link client.Settings.SensorSettings.verify|verify} messages.
             * @function encodeDelimited
             * @memberof client.Settings.SensorSettings
             * @static
             * @param {client.Settings.ISensorSettings} message SensorSettings message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SensorSettings.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a SensorSettings message from the specified reader or buffer.
             * @function decode
             * @memberof client.Settings.SensorSettings
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {client.Settings.SensorSettings} SensorSettings
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SensorSettings.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.client.Settings.SensorSettings();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.sensorType = reader.int32();
                            break;
                        }
                    case 2: {
                            message.useLowThreshold = reader.bool();
                            break;
                        }
                    case 3: {
                            message.useHighThreshold = reader.bool();
                            break;
                        }
                    case 4: {
                            message.lowThreshold = reader.int32();
                            break;
                        }
                    case 5: {
                            message.highThreshold = reader.int32();
                            break;
                        }
                    case 6: {
                            message.sampleIntervalSec = reader.int32();
                            break;
                        }
                    case 7: {
                            message.triggerIntervalSec = reader.int32();
                            break;
                        }
                    case 8: {
                            message.useMilliForThresholds = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("sensorType"))
                    throw $util.ProtocolError("missing required 'sensorType'", { instance: message });
                return message;
            };

            /**
             * Decodes a SensorSettings message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof client.Settings.SensorSettings
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {client.Settings.SensorSettings} SensorSettings
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SensorSettings.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a SensorSettings message.
             * @function verify
             * @memberof client.Settings.SensorSettings
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SensorSettings.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                switch (message.sensorType) {
                default:
                    return "sensorType: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                }
                if (message.useLowThreshold != null && message.hasOwnProperty("useLowThreshold"))
                    if (typeof message.useLowThreshold !== "boolean")
                        return "useLowThreshold: boolean expected";
                if (message.useHighThreshold != null && message.hasOwnProperty("useHighThreshold"))
                    if (typeof message.useHighThreshold !== "boolean")
                        return "useHighThreshold: boolean expected";
                if (message.lowThreshold != null && message.hasOwnProperty("lowThreshold"))
                    if (!$util.isInteger(message.lowThreshold))
                        return "lowThreshold: integer expected";
                if (message.highThreshold != null && message.hasOwnProperty("highThreshold"))
                    if (!$util.isInteger(message.highThreshold))
                        return "highThreshold: integer expected";
                if (message.sampleIntervalSec != null && message.hasOwnProperty("sampleIntervalSec"))
                    if (!$util.isInteger(message.sampleIntervalSec))
                        return "sampleIntervalSec: integer expected";
                if (message.triggerIntervalSec != null && message.hasOwnProperty("triggerIntervalSec"))
                    if (!$util.isInteger(message.triggerIntervalSec))
                        return "triggerIntervalSec: integer expected";
                if (message.useMilliForThresholds != null && message.hasOwnProperty("useMilliForThresholds"))
                    if (typeof message.useMilliForThresholds !== "boolean")
                        return "useMilliForThresholds: boolean expected";
                return null;
            };

            /**
             * Creates a SensorSettings message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof client.Settings.SensorSettings
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {client.Settings.SensorSettings} SensorSettings
             */
            SensorSettings.fromObject = function fromObject(object) {
                if (object instanceof $root.client.Settings.SensorSettings)
                    return object;
                var message = new $root.client.Settings.SensorSettings();
                switch (object.sensorType) {
                default:
                    if (typeof object.sensorType === "number") {
                        message.sensorType = object.sensorType;
                        break;
                    }
                    break;
                case "SOUND":
                case 0:
                    message.sensorType = 0;
                    break;
                case "MOTION":
                case 1:
                    message.sensorType = 1;
                    break;
                case "TEMPERATURE":
                case 2:
                    message.sensorType = 2;
                    break;
                case "HUMIDITY":
                case 3:
                    message.sensorType = 3;
                    break;
                case "LIGHT":
                case 4:
                    message.sensorType = 4;
                    break;
                case "NIGHT":
                case 5:
                    message.sensorType = 5;
                    break;
                }
                if (object.useLowThreshold != null)
                    message.useLowThreshold = Boolean(object.useLowThreshold);
                if (object.useHighThreshold != null)
                    message.useHighThreshold = Boolean(object.useHighThreshold);
                if (object.lowThreshold != null)
                    message.lowThreshold = object.lowThreshold | 0;
                if (object.highThreshold != null)
                    message.highThreshold = object.highThreshold | 0;
                if (object.sampleIntervalSec != null)
                    message.sampleIntervalSec = object.sampleIntervalSec | 0;
                if (object.triggerIntervalSec != null)
                    message.triggerIntervalSec = object.triggerIntervalSec | 0;
                if (object.useMilliForThresholds != null)
                    message.useMilliForThresholds = Boolean(object.useMilliForThresholds);
                return message;
            };

            /**
             * Creates a plain object from a SensorSettings message. Also converts values to other types if specified.
             * @function toObject
             * @memberof client.Settings.SensorSettings
             * @static
             * @param {client.Settings.SensorSettings} message SensorSettings
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SensorSettings.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.sensorType = options.enums === String ? "SOUND" : 0;
                    object.useLowThreshold = false;
                    object.useHighThreshold = false;
                    object.lowThreshold = 0;
                    object.highThreshold = 0;
                    object.sampleIntervalSec = 0;
                    object.triggerIntervalSec = 0;
                    object.useMilliForThresholds = false;
                }
                if (message.sensorType != null && message.hasOwnProperty("sensorType"))
                    object.sensorType = options.enums === String ? $root.client.SensorType[message.sensorType] === undefined ? message.sensorType : $root.client.SensorType[message.sensorType] : message.sensorType;
                if (message.useLowThreshold != null && message.hasOwnProperty("useLowThreshold"))
                    object.useLowThreshold = message.useLowThreshold;
                if (message.useHighThreshold != null && message.hasOwnProperty("useHighThreshold"))
                    object.useHighThreshold = message.useHighThreshold;
                if (message.lowThreshold != null && message.hasOwnProperty("lowThreshold"))
                    object.lowThreshold = message.lowThreshold;
                if (message.highThreshold != null && message.hasOwnProperty("highThreshold"))
                    object.highThreshold = message.highThreshold;
                if (message.sampleIntervalSec != null && message.hasOwnProperty("sampleIntervalSec"))
                    object.sampleIntervalSec = message.sampleIntervalSec;
                if (message.triggerIntervalSec != null && message.hasOwnProperty("triggerIntervalSec"))
                    object.triggerIntervalSec = message.triggerIntervalSec;
                if (message.useMilliForThresholds != null && message.hasOwnProperty("useMilliForThresholds"))
                    object.useMilliForThresholds = message.useMilliForThresholds;
                return object;
            };

            /**
             * Converts this SensorSettings to JSON.
             * @function toJSON
             * @memberof client.Settings.SensorSettings
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SensorSettings.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for SensorSettings
             * @function getTypeUrl
             * @memberof client.Settings.SensorSettings
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            SensorSettings.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/client.Settings.SensorSettings";
            };

            return SensorSettings;
        })();

        Settings.StreamSettings = (function() {

            /**
             * Properties of a StreamSettings.
             * @memberof client.Settings
             * @interface IStreamSettings
             * @property {client.StreamIdentifier} id StreamSettings id
             * @property {number|null} [bitrate] StreamSettings bitrate
             * @property {number|null} [economyBitrate] StreamSettings economyBitrate
             * @property {number|null} [economyFps] StreamSettings economyFps
             * @property {number|null} [bestBitrate] StreamSettings bestBitrate
             * @property {number|null} [bestFps] StreamSettings bestFps
             */

            /**
             * Constructs a new StreamSettings.
             * @memberof client.Settings
             * @classdesc Represents a StreamSettings.
             * @implements IStreamSettings
             * @constructor
             * @param {client.Settings.IStreamSettings=} [properties] Properties to set
             */
            function StreamSettings(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * StreamSettings id.
             * @member {client.StreamIdentifier} id
             * @memberof client.Settings.StreamSettings
             * @instance
             */
            StreamSettings.prototype.id = 0;

            /**
             * StreamSettings bitrate.
             * @member {number} bitrate
             * @memberof client.Settings.StreamSettings
             * @instance
             */
            StreamSettings.prototype.bitrate = 0;

            /**
             * StreamSettings economyBitrate.
             * @member {number} economyBitrate
             * @memberof client.Settings.StreamSettings
             * @instance
             */
            StreamSettings.prototype.economyBitrate = 0;

            /**
             * StreamSettings economyFps.
             * @member {number} economyFps
             * @memberof client.Settings.StreamSettings
             * @instance
             */
            StreamSettings.prototype.economyFps = 0;

            /**
             * StreamSettings bestBitrate.
             * @member {number} bestBitrate
             * @memberof client.Settings.StreamSettings
             * @instance
             */
            StreamSettings.prototype.bestBitrate = 0;

            /**
             * StreamSettings bestFps.
             * @member {number} bestFps
             * @memberof client.Settings.StreamSettings
             * @instance
             */
            StreamSettings.prototype.bestFps = 0;

            /**
             * Creates a new StreamSettings instance using the specified properties.
             * @function create
             * @memberof client.Settings.StreamSettings
             * @static
             * @param {client.Settings.IStreamSettings=} [properties] Properties to set
             * @returns {client.Settings.StreamSettings} StreamSettings instance
             */
            StreamSettings.create = function create(properties) {
                return new StreamSettings(properties);
            };

            /**
             * Encodes the specified StreamSettings message. Does not implicitly {@link client.Settings.StreamSettings.verify|verify} messages.
             * @function encode
             * @memberof client.Settings.StreamSettings
             * @static
             * @param {client.Settings.IStreamSettings} message StreamSettings message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            StreamSettings.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
                if (message.bitrate != null && Object.hasOwnProperty.call(message, "bitrate"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.bitrate);
                if (message.economyBitrate != null && Object.hasOwnProperty.call(message, "economyBitrate"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.economyBitrate);
                if (message.economyFps != null && Object.hasOwnProperty.call(message, "economyFps"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.economyFps);
                if (message.bestBitrate != null && Object.hasOwnProperty.call(message, "bestBitrate"))
                    writer.uint32(/* id 5, wireType 0 =*/40).int32(message.bestBitrate);
                if (message.bestFps != null && Object.hasOwnProperty.call(message, "bestFps"))
                    writer.uint32(/* id 6, wireType 0 =*/48).int32(message.bestFps);
                return writer;
            };

            /**
             * Encodes the specified StreamSettings message, length delimited. Does not implicitly {@link client.Settings.StreamSettings.verify|verify} messages.
             * @function encodeDelimited
             * @memberof client.Settings.StreamSettings
             * @static
             * @param {client.Settings.IStreamSettings} message StreamSettings message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            StreamSettings.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a StreamSettings message from the specified reader or buffer.
             * @function decode
             * @memberof client.Settings.StreamSettings
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {client.Settings.StreamSettings} StreamSettings
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            StreamSettings.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.client.Settings.StreamSettings();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.int32();
                            break;
                        }
                    case 2: {
                            message.bitrate = reader.int32();
                            break;
                        }
                    case 3: {
                            message.economyBitrate = reader.int32();
                            break;
                        }
                    case 4: {
                            message.economyFps = reader.int32();
                            break;
                        }
                    case 5: {
                            message.bestBitrate = reader.int32();
                            break;
                        }
                    case 6: {
                            message.bestFps = reader.int32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("id"))
                    throw $util.ProtocolError("missing required 'id'", { instance: message });
                return message;
            };

            /**
             * Decodes a StreamSettings message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof client.Settings.StreamSettings
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {client.Settings.StreamSettings} StreamSettings
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            StreamSettings.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a StreamSettings message.
             * @function verify
             * @memberof client.Settings.StreamSettings
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            StreamSettings.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                switch (message.id) {
                default:
                    return "id: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
                if (message.bitrate != null && message.hasOwnProperty("bitrate"))
                    if (!$util.isInteger(message.bitrate))
                        return "bitrate: integer expected";
                if (message.economyBitrate != null && message.hasOwnProperty("economyBitrate"))
                    if (!$util.isInteger(message.economyBitrate))
                        return "economyBitrate: integer expected";
                if (message.economyFps != null && message.hasOwnProperty("economyFps"))
                    if (!$util.isInteger(message.economyFps))
                        return "economyFps: integer expected";
                if (message.bestBitrate != null && message.hasOwnProperty("bestBitrate"))
                    if (!$util.isInteger(message.bestBitrate))
                        return "bestBitrate: integer expected";
                if (message.bestFps != null && message.hasOwnProperty("bestFps"))
                    if (!$util.isInteger(message.bestFps))
                        return "bestFps: integer expected";
                return null;
            };

            /**
             * Creates a StreamSettings message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof client.Settings.StreamSettings
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {client.Settings.StreamSettings} StreamSettings
             */
            StreamSettings.fromObject = function fromObject(object) {
                if (object instanceof $root.client.Settings.StreamSettings)
                    return object;
                var message = new $root.client.Settings.StreamSettings();
                switch (object.id) {
                default:
                    if (typeof object.id === "number") {
                        message.id = object.id;
                        break;
                    }
                    break;
                case "DVR":
                case 0:
                    message.id = 0;
                    break;
                case "ANALYTICS":
                case 1:
                    message.id = 1;
                    break;
                case "MOBILE":
                case 2:
                    message.id = 2;
                    break;
                }
                if (object.bitrate != null)
                    message.bitrate = object.bitrate | 0;
                if (object.economyBitrate != null)
                    message.economyBitrate = object.economyBitrate | 0;
                if (object.economyFps != null)
                    message.economyFps = object.economyFps | 0;
                if (object.bestBitrate != null)
                    message.bestBitrate = object.bestBitrate | 0;
                if (object.bestFps != null)
                    message.bestFps = object.bestFps | 0;
                return message;
            };

            /**
             * Creates a plain object from a StreamSettings message. Also converts values to other types if specified.
             * @function toObject
             * @memberof client.Settings.StreamSettings
             * @static
             * @param {client.Settings.StreamSettings} message StreamSettings
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            StreamSettings.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.id = options.enums === String ? "DVR" : 0;
                    object.bitrate = 0;
                    object.economyBitrate = 0;
                    object.economyFps = 0;
                    object.bestBitrate = 0;
                    object.bestFps = 0;
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = options.enums === String ? $root.client.StreamIdentifier[message.id] === undefined ? message.id : $root.client.StreamIdentifier[message.id] : message.id;
                if (message.bitrate != null && message.hasOwnProperty("bitrate"))
                    object.bitrate = message.bitrate;
                if (message.economyBitrate != null && message.hasOwnProperty("economyBitrate"))
                    object.economyBitrate = message.economyBitrate;
                if (message.economyFps != null && message.hasOwnProperty("economyFps"))
                    object.economyFps = message.economyFps;
                if (message.bestBitrate != null && message.hasOwnProperty("bestBitrate"))
                    object.bestBitrate = message.bestBitrate;
                if (message.bestFps != null && message.hasOwnProperty("bestFps"))
                    object.bestFps = message.bestFps;
                return object;
            };

            /**
             * Converts this StreamSettings to JSON.
             * @function toJSON
             * @memberof client.Settings.StreamSettings
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            StreamSettings.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for StreamSettings
             * @function getTypeUrl
             * @memberof client.Settings.StreamSettings
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            StreamSettings.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/client.Settings.StreamSettings";
            };

            return StreamSettings;
        })();

        /**
         * AntiFlicker enum.
         * @name client.Settings.AntiFlicker
         * @enum {number}
         * @property {number} FR50HZ=0 FR50HZ value
         * @property {number} FR60HZ=1 FR60HZ value
         */
        Settings.AntiFlicker = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "FR50HZ"] = 0;
            values[valuesById[1] = "FR60HZ"] = 1;
            return values;
        })();

        /**
         * WifiBand enum.
         * @name client.Settings.WifiBand
         * @enum {number}
         * @property {number} ANY=0 ANY value
         * @property {number} FR2_4GHZ=1 FR2_4GHZ value
         * @property {number} FR5_0GHZ=2 FR5_0GHZ value
         */
        Settings.WifiBand = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "ANY"] = 0;
            values[valuesById[1] = "FR2_4GHZ"] = 1;
            values[valuesById[2] = "FR5_0GHZ"] = 2;
            return values;
        })();

        return Settings;
    })();

    client.Status = (function() {

        /**
         * Properties of a Status.
         * @memberof client
         * @interface IStatus
         * @property {boolean|null} [upgradeDownloaded] Status upgradeDownloaded
         * @property {client.Status.ConnectionToServer|null} [connectionToServer] Status connectionToServer
         * @property {string|null} [currentVersion] Status currentVersion
         * @property {client.MountingMode|null} [mode] Status mode
         * @property {boolean|null} [isSecurityUpgrade] Status isSecurityUpgrade
         * @property {string|null} [downloadedVersion] Status downloadedVersion
         * @property {string|null} [hardwareVersion] Status hardwareVersion
         */

        /**
         * Constructs a new Status.
         * @memberof client
         * @classdesc Represents a Status.
         * @implements IStatus
         * @constructor
         * @param {client.IStatus=} [properties] Properties to set
         */
        function Status(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Status upgradeDownloaded.
         * @member {boolean} upgradeDownloaded
         * @memberof client.Status
         * @instance
         */
        Status.prototype.upgradeDownloaded = false;

        /**
         * Status connectionToServer.
         * @member {client.Status.ConnectionToServer} connectionToServer
         * @memberof client.Status
         * @instance
         */
        Status.prototype.connectionToServer = 0;

        /**
         * Status currentVersion.
         * @member {string} currentVersion
         * @memberof client.Status
         * @instance
         */
        Status.prototype.currentVersion = "";

        /**
         * Status mode.
         * @member {client.MountingMode} mode
         * @memberof client.Status
         * @instance
         */
        Status.prototype.mode = 0;

        /**
         * Status isSecurityUpgrade.
         * @member {boolean} isSecurityUpgrade
         * @memberof client.Status
         * @instance
         */
        Status.prototype.isSecurityUpgrade = false;

        /**
         * Status downloadedVersion.
         * @member {string} downloadedVersion
         * @memberof client.Status
         * @instance
         */
        Status.prototype.downloadedVersion = "";

        /**
         * Status hardwareVersion.
         * @member {string} hardwareVersion
         * @memberof client.Status
         * @instance
         */
        Status.prototype.hardwareVersion = "";

        /**
         * Creates a new Status instance using the specified properties.
         * @function create
         * @memberof client.Status
         * @static
         * @param {client.IStatus=} [properties] Properties to set
         * @returns {client.Status} Status instance
         */
        Status.create = function create(properties) {
            return new Status(properties);
        };

        /**
         * Encodes the specified Status message. Does not implicitly {@link client.Status.verify|verify} messages.
         * @function encode
         * @memberof client.Status
         * @static
         * @param {client.IStatus} message Status message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Status.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.upgradeDownloaded != null && Object.hasOwnProperty.call(message, "upgradeDownloaded"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.upgradeDownloaded);
            if (message.connectionToServer != null && Object.hasOwnProperty.call(message, "connectionToServer"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.connectionToServer);
            if (message.currentVersion != null && Object.hasOwnProperty.call(message, "currentVersion"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.currentVersion);
            if (message.mode != null && Object.hasOwnProperty.call(message, "mode"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.mode);
            if (message.isSecurityUpgrade != null && Object.hasOwnProperty.call(message, "isSecurityUpgrade"))
                writer.uint32(/* id 5, wireType 0 =*/40).bool(message.isSecurityUpgrade);
            if (message.downloadedVersion != null && Object.hasOwnProperty.call(message, "downloadedVersion"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.downloadedVersion);
            if (message.hardwareVersion != null && Object.hasOwnProperty.call(message, "hardwareVersion"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.hardwareVersion);
            return writer;
        };

        /**
         * Encodes the specified Status message, length delimited. Does not implicitly {@link client.Status.verify|verify} messages.
         * @function encodeDelimited
         * @memberof client.Status
         * @static
         * @param {client.IStatus} message Status message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Status.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Status message from the specified reader or buffer.
         * @function decode
         * @memberof client.Status
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {client.Status} Status
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Status.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.client.Status();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.upgradeDownloaded = reader.bool();
                        break;
                    }
                case 2: {
                        message.connectionToServer = reader.int32();
                        break;
                    }
                case 3: {
                        message.currentVersion = reader.string();
                        break;
                    }
                case 4: {
                        message.mode = reader.int32();
                        break;
                    }
                case 5: {
                        message.isSecurityUpgrade = reader.bool();
                        break;
                    }
                case 6: {
                        message.downloadedVersion = reader.string();
                        break;
                    }
                case 7: {
                        message.hardwareVersion = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Status message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof client.Status
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {client.Status} Status
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Status.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Status message.
         * @function verify
         * @memberof client.Status
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Status.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.upgradeDownloaded != null && message.hasOwnProperty("upgradeDownloaded"))
                if (typeof message.upgradeDownloaded !== "boolean")
                    return "upgradeDownloaded: boolean expected";
            if (message.connectionToServer != null && message.hasOwnProperty("connectionToServer"))
                switch (message.connectionToServer) {
                default:
                    return "connectionToServer: enum value expected";
                case 0:
                case 1:
                    break;
                }
            if (message.currentVersion != null && message.hasOwnProperty("currentVersion"))
                if (!$util.isString(message.currentVersion))
                    return "currentVersion: string expected";
            if (message.mode != null && message.hasOwnProperty("mode"))
                switch (message.mode) {
                default:
                    return "mode: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            if (message.isSecurityUpgrade != null && message.hasOwnProperty("isSecurityUpgrade"))
                if (typeof message.isSecurityUpgrade !== "boolean")
                    return "isSecurityUpgrade: boolean expected";
            if (message.downloadedVersion != null && message.hasOwnProperty("downloadedVersion"))
                if (!$util.isString(message.downloadedVersion))
                    return "downloadedVersion: string expected";
            if (message.hardwareVersion != null && message.hasOwnProperty("hardwareVersion"))
                if (!$util.isString(message.hardwareVersion))
                    return "hardwareVersion: string expected";
            return null;
        };

        /**
         * Creates a Status message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof client.Status
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {client.Status} Status
         */
        Status.fromObject = function fromObject(object) {
            if (object instanceof $root.client.Status)
                return object;
            var message = new $root.client.Status();
            if (object.upgradeDownloaded != null)
                message.upgradeDownloaded = Boolean(object.upgradeDownloaded);
            switch (object.connectionToServer) {
            default:
                if (typeof object.connectionToServer === "number") {
                    message.connectionToServer = object.connectionToServer;
                    break;
                }
                break;
            case "DISCONNECTED":
            case 0:
                message.connectionToServer = 0;
                break;
            case "CONNECTED":
            case 1:
                message.connectionToServer = 1;
                break;
            }
            if (object.currentVersion != null)
                message.currentVersion = String(object.currentVersion);
            switch (object.mode) {
            default:
                if (typeof object.mode === "number") {
                    message.mode = object.mode;
                    break;
                }
                break;
            case "STAND":
            case 0:
                message.mode = 0;
                break;
            case "TRAVEL":
            case 1:
                message.mode = 1;
                break;
            case "SWITCH":
            case 2:
                message.mode = 2;
                break;
            }
            if (object.isSecurityUpgrade != null)
                message.isSecurityUpgrade = Boolean(object.isSecurityUpgrade);
            if (object.downloadedVersion != null)
                message.downloadedVersion = String(object.downloadedVersion);
            if (object.hardwareVersion != null)
                message.hardwareVersion = String(object.hardwareVersion);
            return message;
        };

        /**
         * Creates a plain object from a Status message. Also converts values to other types if specified.
         * @function toObject
         * @memberof client.Status
         * @static
         * @param {client.Status} message Status
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Status.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.upgradeDownloaded = false;
                object.connectionToServer = options.enums === String ? "DISCONNECTED" : 0;
                object.currentVersion = "";
                object.mode = options.enums === String ? "STAND" : 0;
                object.isSecurityUpgrade = false;
                object.downloadedVersion = "";
                object.hardwareVersion = "";
            }
            if (message.upgradeDownloaded != null && message.hasOwnProperty("upgradeDownloaded"))
                object.upgradeDownloaded = message.upgradeDownloaded;
            if (message.connectionToServer != null && message.hasOwnProperty("connectionToServer"))
                object.connectionToServer = options.enums === String ? $root.client.Status.ConnectionToServer[message.connectionToServer] === undefined ? message.connectionToServer : $root.client.Status.ConnectionToServer[message.connectionToServer] : message.connectionToServer;
            if (message.currentVersion != null && message.hasOwnProperty("currentVersion"))
                object.currentVersion = message.currentVersion;
            if (message.mode != null && message.hasOwnProperty("mode"))
                object.mode = options.enums === String ? $root.client.MountingMode[message.mode] === undefined ? message.mode : $root.client.MountingMode[message.mode] : message.mode;
            if (message.isSecurityUpgrade != null && message.hasOwnProperty("isSecurityUpgrade"))
                object.isSecurityUpgrade = message.isSecurityUpgrade;
            if (message.downloadedVersion != null && message.hasOwnProperty("downloadedVersion"))
                object.downloadedVersion = message.downloadedVersion;
            if (message.hardwareVersion != null && message.hasOwnProperty("hardwareVersion"))
                object.hardwareVersion = message.hardwareVersion;
            return object;
        };

        /**
         * Converts this Status to JSON.
         * @function toJSON
         * @memberof client.Status
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Status.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Status
         * @function getTypeUrl
         * @memberof client.Status
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Status.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/client.Status";
        };

        /**
         * ConnectionToServer enum.
         * @name client.Status.ConnectionToServer
         * @enum {number}
         * @property {number} DISCONNECTED=0 DISCONNECTED value
         * @property {number} CONNECTED=1 CONNECTED value
         */
        Status.ConnectionToServer = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "DISCONNECTED"] = 0;
            values[valuesById[1] = "CONNECTED"] = 1;
            return values;
        })();

        return Status;
    })();

    client.Playback = (function() {

        /**
         * Properties of a Playback.
         * @memberof client
         * @interface IPlayback
         * @property {client.Playback.Status} status Playback status
         */

        /**
         * Constructs a new Playback.
         * @memberof client
         * @classdesc Represents a Playback.
         * @implements IPlayback
         * @constructor
         * @param {client.IPlayback=} [properties] Properties to set
         */
        function Playback(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Playback status.
         * @member {client.Playback.Status} status
         * @memberof client.Playback
         * @instance
         */
        Playback.prototype.status = 0;

        /**
         * Creates a new Playback instance using the specified properties.
         * @function create
         * @memberof client.Playback
         * @static
         * @param {client.IPlayback=} [properties] Properties to set
         * @returns {client.Playback} Playback instance
         */
        Playback.create = function create(properties) {
            return new Playback(properties);
        };

        /**
         * Encodes the specified Playback message. Does not implicitly {@link client.Playback.verify|verify} messages.
         * @function encode
         * @memberof client.Playback
         * @static
         * @param {client.IPlayback} message Playback message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Playback.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.status);
            return writer;
        };

        /**
         * Encodes the specified Playback message, length delimited. Does not implicitly {@link client.Playback.verify|verify} messages.
         * @function encodeDelimited
         * @memberof client.Playback
         * @static
         * @param {client.IPlayback} message Playback message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Playback.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Playback message from the specified reader or buffer.
         * @function decode
         * @memberof client.Playback
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {client.Playback} Playback
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Playback.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.client.Playback();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.status = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("status"))
                throw $util.ProtocolError("missing required 'status'", { instance: message });
            return message;
        };

        /**
         * Decodes a Playback message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof client.Playback
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {client.Playback} Playback
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Playback.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Playback message.
         * @function verify
         * @memberof client.Playback
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Playback.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.status) {
            default:
                return "status: enum value expected";
            case 0:
            case 1:
                break;
            }
            return null;
        };

        /**
         * Creates a Playback message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof client.Playback
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {client.Playback} Playback
         */
        Playback.fromObject = function fromObject(object) {
            if (object instanceof $root.client.Playback)
                return object;
            var message = new $root.client.Playback();
            switch (object.status) {
            default:
                if (typeof object.status === "number") {
                    message.status = object.status;
                    break;
                }
                break;
            case "STARTED":
            case 0:
                message.status = 0;
                break;
            case "STOPPED":
            case 1:
                message.status = 1;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a Playback message. Also converts values to other types if specified.
         * @function toObject
         * @memberof client.Playback
         * @static
         * @param {client.Playback} message Playback
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Playback.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.status = options.enums === String ? "STARTED" : 0;
            if (message.status != null && message.hasOwnProperty("status"))
                object.status = options.enums === String ? $root.client.Playback.Status[message.status] === undefined ? message.status : $root.client.Playback.Status[message.status] : message.status;
            return object;
        };

        /**
         * Converts this Playback to JSON.
         * @function toJSON
         * @memberof client.Playback
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Playback.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Playback
         * @function getTypeUrl
         * @memberof client.Playback
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Playback.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/client.Playback";
        };

        /**
         * Status enum.
         * @name client.Playback.Status
         * @enum {number}
         * @property {number} STARTED=0 STARTED value
         * @property {number} STOPPED=1 STOPPED value
         */
        Playback.Status = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "STARTED"] = 0;
            values[valuesById[1] = "STOPPED"] = 1;
            return values;
        })();

        return Playback;
    })();

    client.Stream = (function() {

        /**
         * Properties of a Stream.
         * @memberof client
         * @interface IStream
         * @property {client.Stream.Type} type Stream type
         * @property {string|null} [url] Stream url
         * @property {number|null} [bps] Stream bps
         */

        /**
         * Constructs a new Stream.
         * @memberof client
         * @classdesc Represents a Stream.
         * @implements IStream
         * @constructor
         * @param {client.IStream=} [properties] Properties to set
         */
        function Stream(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Stream type.
         * @member {client.Stream.Type} type
         * @memberof client.Stream
         * @instance
         */
        Stream.prototype.type = 0;

        /**
         * Stream url.
         * @member {string} url
         * @memberof client.Stream
         * @instance
         */
        Stream.prototype.url = "";

        /**
         * Stream bps.
         * @member {number} bps
         * @memberof client.Stream
         * @instance
         */
        Stream.prototype.bps = 0;

        /**
         * Creates a new Stream instance using the specified properties.
         * @function create
         * @memberof client.Stream
         * @static
         * @param {client.IStream=} [properties] Properties to set
         * @returns {client.Stream} Stream instance
         */
        Stream.create = function create(properties) {
            return new Stream(properties);
        };

        /**
         * Encodes the specified Stream message. Does not implicitly {@link client.Stream.verify|verify} messages.
         * @function encode
         * @memberof client.Stream
         * @static
         * @param {client.IStream} message Stream message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Stream.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            if (message.url != null && Object.hasOwnProperty.call(message, "url"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.url);
            if (message.bps != null && Object.hasOwnProperty.call(message, "bps"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.bps);
            return writer;
        };

        /**
         * Encodes the specified Stream message, length delimited. Does not implicitly {@link client.Stream.verify|verify} messages.
         * @function encodeDelimited
         * @memberof client.Stream
         * @static
         * @param {client.IStream} message Stream message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Stream.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Stream message from the specified reader or buffer.
         * @function decode
         * @memberof client.Stream
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {client.Stream} Stream
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Stream.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.client.Stream();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.type = reader.int32();
                        break;
                    }
                case 2: {
                        message.url = reader.string();
                        break;
                    }
                case 3: {
                        message.bps = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("type"))
                throw $util.ProtocolError("missing required 'type'", { instance: message });
            return message;
        };

        /**
         * Decodes a Stream message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof client.Stream
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {client.Stream} Stream
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Stream.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Stream message.
         * @function verify
         * @memberof client.Stream
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Stream.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.type) {
            default:
                return "type: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
                break;
            }
            if (message.url != null && message.hasOwnProperty("url"))
                if (!$util.isString(message.url))
                    return "url: string expected";
            if (message.bps != null && message.hasOwnProperty("bps"))
                if (!$util.isInteger(message.bps))
                    return "bps: integer expected";
            return null;
        };

        /**
         * Creates a Stream message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof client.Stream
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {client.Stream} Stream
         */
        Stream.fromObject = function fromObject(object) {
            if (object instanceof $root.client.Stream)
                return object;
            var message = new $root.client.Stream();
            switch (object.type) {
            default:
                if (typeof object.type === "number") {
                    message.type = object.type;
                    break;
                }
                break;
            case "LOCAL":
            case 0:
                message.type = 0;
                break;
            case "REMOTE":
            case 1:
                message.type = 1;
                break;
            case "RTSP":
            case 2:
                message.type = 2;
                break;
            case "P2P":
            case 3:
                message.type = 3;
                break;
            }
            if (object.url != null)
                message.url = String(object.url);
            if (object.bps != null)
                message.bps = object.bps | 0;
            return message;
        };

        /**
         * Creates a plain object from a Stream message. Also converts values to other types if specified.
         * @function toObject
         * @memberof client.Stream
         * @static
         * @param {client.Stream} message Stream
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Stream.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.type = options.enums === String ? "LOCAL" : 0;
                object.url = "";
                object.bps = 0;
            }
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.client.Stream.Type[message.type] === undefined ? message.type : $root.client.Stream.Type[message.type] : message.type;
            if (message.url != null && message.hasOwnProperty("url"))
                object.url = message.url;
            if (message.bps != null && message.hasOwnProperty("bps"))
                object.bps = message.bps;
            return object;
        };

        /**
         * Converts this Stream to JSON.
         * @function toJSON
         * @memberof client.Stream
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Stream.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Stream
         * @function getTypeUrl
         * @memberof client.Stream
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Stream.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/client.Stream";
        };

        /**
         * Type enum.
         * @name client.Stream.Type
         * @enum {number}
         * @property {number} LOCAL=0 LOCAL value
         * @property {number} REMOTE=1 REMOTE value
         * @property {number} RTSP=2 RTSP value
         * @property {number} P2P=3 P2P value
         */
        Stream.Type = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "LOCAL"] = 0;
            values[valuesById[1] = "REMOTE"] = 1;
            values[valuesById[2] = "RTSP"] = 2;
            values[valuesById[3] = "P2P"] = 3;
            return values;
        })();

        return Stream;
    })();

    client.Streaming = (function() {

        /**
         * Properties of a Streaming.
         * @memberof client
         * @interface IStreaming
         * @property {client.StreamIdentifier} id Streaming id
         * @property {client.Streaming.Status} status Streaming status
         * @property {string} rtmpUrl Streaming rtmpUrl
         * @property {number|null} [attempts] Streaming attempts
         */

        /**
         * Constructs a new Streaming.
         * @memberof client
         * @classdesc Represents a Streaming.
         * @implements IStreaming
         * @constructor
         * @param {client.IStreaming=} [properties] Properties to set
         */
        function Streaming(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Streaming id.
         * @member {client.StreamIdentifier} id
         * @memberof client.Streaming
         * @instance
         */
        Streaming.prototype.id = 0;

        /**
         * Streaming status.
         * @member {client.Streaming.Status} status
         * @memberof client.Streaming
         * @instance
         */
        Streaming.prototype.status = 0;

        /**
         * Streaming rtmpUrl.
         * @member {string} rtmpUrl
         * @memberof client.Streaming
         * @instance
         */
        Streaming.prototype.rtmpUrl = "";

        /**
         * Streaming attempts.
         * @member {number} attempts
         * @memberof client.Streaming
         * @instance
         */
        Streaming.prototype.attempts = 0;

        /**
         * Creates a new Streaming instance using the specified properties.
         * @function create
         * @memberof client.Streaming
         * @static
         * @param {client.IStreaming=} [properties] Properties to set
         * @returns {client.Streaming} Streaming instance
         */
        Streaming.create = function create(properties) {
            return new Streaming(properties);
        };

        /**
         * Encodes the specified Streaming message. Does not implicitly {@link client.Streaming.verify|verify} messages.
         * @function encode
         * @memberof client.Streaming
         * @static
         * @param {client.IStreaming} message Streaming message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Streaming.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.status);
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.rtmpUrl);
            if (message.attempts != null && Object.hasOwnProperty.call(message, "attempts"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.attempts);
            return writer;
        };

        /**
         * Encodes the specified Streaming message, length delimited. Does not implicitly {@link client.Streaming.verify|verify} messages.
         * @function encodeDelimited
         * @memberof client.Streaming
         * @static
         * @param {client.IStreaming} message Streaming message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Streaming.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Streaming message from the specified reader or buffer.
         * @function decode
         * @memberof client.Streaming
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {client.Streaming} Streaming
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Streaming.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.client.Streaming();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.int32();
                        break;
                    }
                case 2: {
                        message.status = reader.int32();
                        break;
                    }
                case 3: {
                        message.rtmpUrl = reader.string();
                        break;
                    }
                case 4: {
                        message.attempts = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("id"))
                throw $util.ProtocolError("missing required 'id'", { instance: message });
            if (!message.hasOwnProperty("status"))
                throw $util.ProtocolError("missing required 'status'", { instance: message });
            if (!message.hasOwnProperty("rtmpUrl"))
                throw $util.ProtocolError("missing required 'rtmpUrl'", { instance: message });
            return message;
        };

        /**
         * Decodes a Streaming message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof client.Streaming
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {client.Streaming} Streaming
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Streaming.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Streaming message.
         * @function verify
         * @memberof client.Streaming
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Streaming.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.id) {
            default:
                return "id: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
            switch (message.status) {
            default:
                return "status: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
            if (!$util.isString(message.rtmpUrl))
                return "rtmpUrl: string expected";
            if (message.attempts != null && message.hasOwnProperty("attempts"))
                if (!$util.isInteger(message.attempts))
                    return "attempts: integer expected";
            return null;
        };

        /**
         * Creates a Streaming message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof client.Streaming
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {client.Streaming} Streaming
         */
        Streaming.fromObject = function fromObject(object) {
            if (object instanceof $root.client.Streaming)
                return object;
            var message = new $root.client.Streaming();
            switch (object.id) {
            default:
                if (typeof object.id === "number") {
                    message.id = object.id;
                    break;
                }
                break;
            case "DVR":
            case 0:
                message.id = 0;
                break;
            case "ANALYTICS":
            case 1:
                message.id = 1;
                break;
            case "MOBILE":
            case 2:
                message.id = 2;
                break;
            }
            switch (object.status) {
            default:
                if (typeof object.status === "number") {
                    message.status = object.status;
                    break;
                }
                break;
            case "STARTED":
            case 0:
                message.status = 0;
                break;
            case "STOPPED":
            case 1:
                message.status = 1;
                break;
            case "PAUSED":
            case 2:
                message.status = 2;
                break;
            }
            if (object.rtmpUrl != null)
                message.rtmpUrl = String(object.rtmpUrl);
            if (object.attempts != null)
                message.attempts = object.attempts | 0;
            return message;
        };

        /**
         * Creates a plain object from a Streaming message. Also converts values to other types if specified.
         * @function toObject
         * @memberof client.Streaming
         * @static
         * @param {client.Streaming} message Streaming
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Streaming.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = options.enums === String ? "DVR" : 0;
                object.status = options.enums === String ? "STARTED" : 0;
                object.rtmpUrl = "";
                object.attempts = 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = options.enums === String ? $root.client.StreamIdentifier[message.id] === undefined ? message.id : $root.client.StreamIdentifier[message.id] : message.id;
            if (message.status != null && message.hasOwnProperty("status"))
                object.status = options.enums === String ? $root.client.Streaming.Status[message.status] === undefined ? message.status : $root.client.Streaming.Status[message.status] : message.status;
            if (message.rtmpUrl != null && message.hasOwnProperty("rtmpUrl"))
                object.rtmpUrl = message.rtmpUrl;
            if (message.attempts != null && message.hasOwnProperty("attempts"))
                object.attempts = message.attempts;
            return object;
        };

        /**
         * Converts this Streaming to JSON.
         * @function toJSON
         * @memberof client.Streaming
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Streaming.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Streaming
         * @function getTypeUrl
         * @memberof client.Streaming
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Streaming.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/client.Streaming";
        };

        /**
         * Status enum.
         * @name client.Streaming.Status
         * @enum {number}
         * @property {number} STARTED=0 STARTED value
         * @property {number} STOPPED=1 STOPPED value
         * @property {number} PAUSED=2 PAUSED value
         */
        Streaming.Status = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "STARTED"] = 0;
            values[valuesById[1] = "STOPPED"] = 1;
            values[valuesById[2] = "PAUSED"] = 2;
            return values;
        })();

        return Streaming;
    })();

    client.GetLogs = (function() {

        /**
         * Properties of a GetLogs.
         * @memberof client
         * @interface IGetLogs
         * @property {string} url GetLogs url
         */

        /**
         * Constructs a new GetLogs.
         * @memberof client
         * @classdesc Represents a GetLogs.
         * @implements IGetLogs
         * @constructor
         * @param {client.IGetLogs=} [properties] Properties to set
         */
        function GetLogs(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetLogs url.
         * @member {string} url
         * @memberof client.GetLogs
         * @instance
         */
        GetLogs.prototype.url = "";

        /**
         * Creates a new GetLogs instance using the specified properties.
         * @function create
         * @memberof client.GetLogs
         * @static
         * @param {client.IGetLogs=} [properties] Properties to set
         * @returns {client.GetLogs} GetLogs instance
         */
        GetLogs.create = function create(properties) {
            return new GetLogs(properties);
        };

        /**
         * Encodes the specified GetLogs message. Does not implicitly {@link client.GetLogs.verify|verify} messages.
         * @function encode
         * @memberof client.GetLogs
         * @static
         * @param {client.IGetLogs} message GetLogs message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetLogs.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.url);
            return writer;
        };

        /**
         * Encodes the specified GetLogs message, length delimited. Does not implicitly {@link client.GetLogs.verify|verify} messages.
         * @function encodeDelimited
         * @memberof client.GetLogs
         * @static
         * @param {client.IGetLogs} message GetLogs message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetLogs.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GetLogs message from the specified reader or buffer.
         * @function decode
         * @memberof client.GetLogs
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {client.GetLogs} GetLogs
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetLogs.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.client.GetLogs();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.url = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("url"))
                throw $util.ProtocolError("missing required 'url'", { instance: message });
            return message;
        };

        /**
         * Decodes a GetLogs message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof client.GetLogs
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {client.GetLogs} GetLogs
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetLogs.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GetLogs message.
         * @function verify
         * @memberof client.GetLogs
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GetLogs.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message.url))
                return "url: string expected";
            return null;
        };

        /**
         * Creates a GetLogs message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof client.GetLogs
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {client.GetLogs} GetLogs
         */
        GetLogs.fromObject = function fromObject(object) {
            if (object instanceof $root.client.GetLogs)
                return object;
            var message = new $root.client.GetLogs();
            if (object.url != null)
                message.url = String(object.url);
            return message;
        };

        /**
         * Creates a plain object from a GetLogs message. Also converts values to other types if specified.
         * @function toObject
         * @memberof client.GetLogs
         * @static
         * @param {client.GetLogs} message GetLogs
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetLogs.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.url = "";
            if (message.url != null && message.hasOwnProperty("url"))
                object.url = message.url;
            return object;
        };

        /**
         * Converts this GetLogs to JSON.
         * @function toJSON
         * @memberof client.GetLogs
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetLogs.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GetLogs
         * @function getTypeUrl
         * @memberof client.GetLogs
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GetLogs.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/client.GetLogs";
        };

        return GetLogs;
    })();

    client.GetStatus = (function() {

        /**
         * Properties of a GetStatus.
         * @memberof client
         * @interface IGetStatus
         * @property {boolean|null} [all] GetStatus all
         */

        /**
         * Constructs a new GetStatus.
         * @memberof client
         * @classdesc Represents a GetStatus.
         * @implements IGetStatus
         * @constructor
         * @param {client.IGetStatus=} [properties] Properties to set
         */
        function GetStatus(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetStatus all.
         * @member {boolean} all
         * @memberof client.GetStatus
         * @instance
         */
        GetStatus.prototype.all = false;

        /**
         * Creates a new GetStatus instance using the specified properties.
         * @function create
         * @memberof client.GetStatus
         * @static
         * @param {client.IGetStatus=} [properties] Properties to set
         * @returns {client.GetStatus} GetStatus instance
         */
        GetStatus.create = function create(properties) {
            return new GetStatus(properties);
        };

        /**
         * Encodes the specified GetStatus message. Does not implicitly {@link client.GetStatus.verify|verify} messages.
         * @function encode
         * @memberof client.GetStatus
         * @static
         * @param {client.IGetStatus} message GetStatus message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetStatus.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.all != null && Object.hasOwnProperty.call(message, "all"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.all);
            return writer;
        };

        /**
         * Encodes the specified GetStatus message, length delimited. Does not implicitly {@link client.GetStatus.verify|verify} messages.
         * @function encodeDelimited
         * @memberof client.GetStatus
         * @static
         * @param {client.IGetStatus} message GetStatus message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetStatus.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GetStatus message from the specified reader or buffer.
         * @function decode
         * @memberof client.GetStatus
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {client.GetStatus} GetStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetStatus.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.client.GetStatus();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.all = reader.bool();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GetStatus message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof client.GetStatus
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {client.GetStatus} GetStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetStatus.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GetStatus message.
         * @function verify
         * @memberof client.GetStatus
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GetStatus.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.all != null && message.hasOwnProperty("all"))
                if (typeof message.all !== "boolean")
                    return "all: boolean expected";
            return null;
        };

        /**
         * Creates a GetStatus message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof client.GetStatus
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {client.GetStatus} GetStatus
         */
        GetStatus.fromObject = function fromObject(object) {
            if (object instanceof $root.client.GetStatus)
                return object;
            var message = new $root.client.GetStatus();
            if (object.all != null)
                message.all = Boolean(object.all);
            return message;
        };

        /**
         * Creates a plain object from a GetStatus message. Also converts values to other types if specified.
         * @function toObject
         * @memberof client.GetStatus
         * @static
         * @param {client.GetStatus} message GetStatus
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetStatus.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.all = false;
            if (message.all != null && message.hasOwnProperty("all"))
                object.all = message.all;
            return object;
        };

        /**
         * Converts this GetStatus to JSON.
         * @function toJSON
         * @memberof client.GetStatus
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetStatus.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GetStatus
         * @function getTypeUrl
         * @memberof client.GetStatus
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GetStatus.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/client.GetStatus";
        };

        return GetStatus;
    })();

    client.Request = (function() {

        /**
         * Properties of a Request.
         * @memberof client
         * @interface IRequest
         * @property {number} id Request id
         * @property {client.RequestType} type Request type
         * @property {client.IGetSensorData|null} [getSensorData] Request getSensorData
         * @property {Array.<client.ISensorData>|null} [sensorData] Request sensorData
         * @property {client.IStreaming|null} [streaming] Request streaming
         * @property {client.IControl|null} [control] Request control
         * @property {client.ISettings|null} [settings] Request settings
         * @property {client.IStatus|null} [status] Request status
         * @property {client.IGetStatus|null} [getStatus] Request getStatus
         * @property {client.IPlayback|null} [playback] Request playback
         * @property {client.IGetLogs|null} [getLogs] Request getLogs
         */

        /**
         * Constructs a new Request.
         * @memberof client
         * @classdesc Represents a Request.
         * @implements IRequest
         * @constructor
         * @param {client.IRequest=} [properties] Properties to set
         */
        function Request(properties) {
            this.sensorData = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Request id.
         * @member {number} id
         * @memberof client.Request
         * @instance
         */
        Request.prototype.id = 0;

        /**
         * Request type.
         * @member {client.RequestType} type
         * @memberof client.Request
         * @instance
         */
        Request.prototype.type = 3;

        /**
         * Request getSensorData.
         * @member {client.IGetSensorData|null|undefined} getSensorData
         * @memberof client.Request
         * @instance
         */
        Request.prototype.getSensorData = null;

        /**
         * Request sensorData.
         * @member {Array.<client.ISensorData>} sensorData
         * @memberof client.Request
         * @instance
         */
        Request.prototype.sensorData = $util.emptyArray;

        /**
         * Request streaming.
         * @member {client.IStreaming|null|undefined} streaming
         * @memberof client.Request
         * @instance
         */
        Request.prototype.streaming = null;

        /**
         * Request control.
         * @member {client.IControl|null|undefined} control
         * @memberof client.Request
         * @instance
         */
        Request.prototype.control = null;

        /**
         * Request settings.
         * @member {client.ISettings|null|undefined} settings
         * @memberof client.Request
         * @instance
         */
        Request.prototype.settings = null;

        /**
         * Request status.
         * @member {client.IStatus|null|undefined} status
         * @memberof client.Request
         * @instance
         */
        Request.prototype.status = null;

        /**
         * Request getStatus.
         * @member {client.IGetStatus|null|undefined} getStatus
         * @memberof client.Request
         * @instance
         */
        Request.prototype.getStatus = null;

        /**
         * Request playback.
         * @member {client.IPlayback|null|undefined} playback
         * @memberof client.Request
         * @instance
         */
        Request.prototype.playback = null;

        /**
         * Request getLogs.
         * @member {client.IGetLogs|null|undefined} getLogs
         * @memberof client.Request
         * @instance
         */
        Request.prototype.getLogs = null;

        /**
         * Creates a new Request instance using the specified properties.
         * @function create
         * @memberof client.Request
         * @static
         * @param {client.IRequest=} [properties] Properties to set
         * @returns {client.Request} Request instance
         */
        Request.create = function create(properties) {
            return new Request(properties);
        };

        /**
         * Encodes the specified Request message. Does not implicitly {@link client.Request.verify|verify} messages.
         * @function encode
         * @memberof client.Request
         * @static
         * @param {client.IRequest} message Request message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Request.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
            if (message.streaming != null && Object.hasOwnProperty.call(message, "streaming"))
                $root.client.Streaming.encode(message.streaming, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.settings != null && Object.hasOwnProperty.call(message, "settings"))
                $root.client.Settings.encode(message.settings, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                $root.client.Status.encode(message.status, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
            if (message.getStatus != null && Object.hasOwnProperty.call(message, "getStatus"))
                $root.client.GetStatus.encode(message.getStatus, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
            if (message.getSensorData != null && Object.hasOwnProperty.call(message, "getSensorData"))
                $root.client.GetSensorData.encode(message.getSensorData, writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
            if (message.sensorData != null && message.sensorData.length)
                for (var i = 0; i < message.sensorData.length; ++i)
                    $root.client.SensorData.encode(message.sensorData[i], writer.uint32(/* id 13, wireType 2 =*/106).fork()).ldelim();
            if (message.control != null && Object.hasOwnProperty.call(message, "control"))
                $root.client.Control.encode(message.control, writer.uint32(/* id 15, wireType 2 =*/122).fork()).ldelim();
            if (message.playback != null && Object.hasOwnProperty.call(message, "playback"))
                $root.client.Playback.encode(message.playback, writer.uint32(/* id 16, wireType 2 =*/130).fork()).ldelim();
            if (message.getLogs != null && Object.hasOwnProperty.call(message, "getLogs"))
                $root.client.GetLogs.encode(message.getLogs, writer.uint32(/* id 18, wireType 2 =*/146).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Request message, length delimited. Does not implicitly {@link client.Request.verify|verify} messages.
         * @function encodeDelimited
         * @memberof client.Request
         * @static
         * @param {client.IRequest} message Request message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Request.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Request message from the specified reader or buffer.
         * @function decode
         * @memberof client.Request
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {client.Request} Request
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Request.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.client.Request();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.int32();
                        break;
                    }
                case 2: {
                        message.type = reader.int32();
                        break;
                    }
                case 12: {
                        message.getSensorData = $root.client.GetSensorData.decode(reader, reader.uint32());
                        break;
                    }
                case 13: {
                        if (!(message.sensorData && message.sensorData.length))
                            message.sensorData = [];
                        message.sensorData.push($root.client.SensorData.decode(reader, reader.uint32()));
                        break;
                    }
                case 4: {
                        message.streaming = $root.client.Streaming.decode(reader, reader.uint32());
                        break;
                    }
                case 15: {
                        message.control = $root.client.Control.decode(reader, reader.uint32());
                        break;
                    }
                case 5: {
                        message.settings = $root.client.Settings.decode(reader, reader.uint32());
                        break;
                    }
                case 7: {
                        message.status = $root.client.Status.decode(reader, reader.uint32());
                        break;
                    }
                case 8: {
                        message.getStatus = $root.client.GetStatus.decode(reader, reader.uint32());
                        break;
                    }
                case 16: {
                        message.playback = $root.client.Playback.decode(reader, reader.uint32());
                        break;
                    }
                case 18: {
                        message.getLogs = $root.client.GetLogs.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("id"))
                throw $util.ProtocolError("missing required 'id'", { instance: message });
            if (!message.hasOwnProperty("type"))
                throw $util.ProtocolError("missing required 'type'", { instance: message });
            return message;
        };

        /**
         * Decodes a Request message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof client.Request
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {client.Request} Request
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Request.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Request message.
         * @function verify
         * @memberof client.Request
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Request.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message.id))
                return "id: integer expected";
            switch (message.type) {
            default:
                return "type: enum value expected";
            case 3:
            case 2:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 12:
            case 11:
            case 13:
            case 14:
            case 15:
            case 16:
            case 17:
            case 18:
            case 19:
            case 20:
            case 21:
            case 22:
            case 23:
            case 24:
            case 25:
            case 26:
            case 27:
            case 28:
            case 29:
            case 30:
            case 31:
            case 32:
            case 34:
            case 35:
            case 36:
            case 37:
            case 38:
            case 39:
            case 40:
            case 41:
            case 42:
            case 43:
            case 44:
            case 45:
            case 46:
            case 47:
                break;
            }
            if (message.getSensorData != null && message.hasOwnProperty("getSensorData")) {
                var error = $root.client.GetSensorData.verify(message.getSensorData);
                if (error)
                    return "getSensorData." + error;
            }
            if (message.sensorData != null && message.hasOwnProperty("sensorData")) {
                if (!Array.isArray(message.sensorData))
                    return "sensorData: array expected";
                for (var i = 0; i < message.sensorData.length; ++i) {
                    var error = $root.client.SensorData.verify(message.sensorData[i]);
                    if (error)
                        return "sensorData." + error;
                }
            }
            if (message.streaming != null && message.hasOwnProperty("streaming")) {
                var error = $root.client.Streaming.verify(message.streaming);
                if (error)
                    return "streaming." + error;
            }
            if (message.control != null && message.hasOwnProperty("control")) {
                var error = $root.client.Control.verify(message.control);
                if (error)
                    return "control." + error;
            }
            if (message.settings != null && message.hasOwnProperty("settings")) {
                var error = $root.client.Settings.verify(message.settings);
                if (error)
                    return "settings." + error;
            }
            if (message.status != null && message.hasOwnProperty("status")) {
                var error = $root.client.Status.verify(message.status);
                if (error)
                    return "status." + error;
            }
            if (message.getStatus != null && message.hasOwnProperty("getStatus")) {
                var error = $root.client.GetStatus.verify(message.getStatus);
                if (error)
                    return "getStatus." + error;
            }
            if (message.playback != null && message.hasOwnProperty("playback")) {
                var error = $root.client.Playback.verify(message.playback);
                if (error)
                    return "playback." + error;
            }
            if (message.getLogs != null && message.hasOwnProperty("getLogs")) {
                var error = $root.client.GetLogs.verify(message.getLogs);
                if (error)
                    return "getLogs." + error;
            }
            return null;
        };

        /**
         * Creates a Request message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof client.Request
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {client.Request} Request
         */
        Request.fromObject = function fromObject(object) {
            if (object instanceof $root.client.Request)
                return object;
            var message = new $root.client.Request();
            if (object.id != null)
                message.id = object.id | 0;
            switch (object.type) {
            default:
                if (typeof object.type === "number") {
                    message.type = object.type;
                    break;
                }
                break;
            case "GET_STREAMING":
            case 3:
                message.type = 3;
                break;
            case "PUT_STREAMING":
            case 2:
                message.type = 2;
                break;
            case "GET_SETTINGS":
            case 4:
                message.type = 4;
                break;
            case "PUT_SETTINGS":
            case 5:
                message.type = 5;
                break;
            case "GET_CONTROL":
            case 6:
                message.type = 6;
                break;
            case "PUT_CONTROL":
            case 7:
                message.type = 7;
                break;
            case "GET_STATUS":
            case 8:
                message.type = 8;
                break;
            case "PUT_STATUS":
            case 9:
                message.type = 9;
                break;
            case "GET_SENSOR_DATA":
            case 12:
                message.type = 12;
                break;
            case "PUT_SENSOR_DATA":
            case 11:
                message.type = 11;
                break;
            case "GET_UCTOKENS":
            case 13:
                message.type = 13;
                break;
            case "PUT_UCTOKENS":
            case 14:
                message.type = 14;
                break;
            case "PUT_SETUP_NETWORK":
            case 15:
                message.type = 15;
                break;
            case "PUT_SETUP_SERVER":
            case 16:
                message.type = 16;
                break;
            case "GET_FIRMWARE":
            case 17:
                message.type = 17;
                break;
            case "PUT_FIRMWARE":
            case 18:
                message.type = 18;
                break;
            case "GET_PLAYBACK":
            case 19:
                message.type = 19;
                break;
            case "PUT_PLAYBACK":
            case 20:
                message.type = 20;
                break;
            case "GET_SOUNDTRACKS":
            case 21:
                message.type = 21;
                break;
            case "GET_STATUS_NETWORK":
            case 22:
                message.type = 22;
                break;
            case "GET_LIST_NETWORKS":
            case 23:
                message.type = 23;
                break;
            case "GET_LOGS":
            case 24:
                message.type = 24;
                break;
            case "GET_BANDWIDTH":
            case 25:
                message.type = 25;
                break;
            case "GET_AUDIO_STREAMING":
            case 26:
                message.type = 26;
                break;
            case "PUT_AUDIO_STREAMING":
            case 27:
                message.type = 27;
                break;
            case "GET_WIFI_SETUP":
            case 28:
                message.type = 28;
                break;
            case "PUT_WIFI_SETUP":
            case 29:
                message.type = 29;
                break;
            case "PUT_STING_START":
            case 30:
                message.type = 30;
                break;
            case "PUT_STING_STOP":
            case 31:
                message.type = 31;
                break;
            case "PUT_STING_STATUS":
            case 32:
                message.type = 32;
                break;
            case "PUT_STING_ALERT":
            case 34:
                message.type = 34;
                break;
            case "PUT_KEEP_ALIVE":
            case 35:
                message.type = 35;
                break;
            case "GET_STING_STATUS":
            case 36:
                message.type = 36;
                break;
            case "PUT_STING_TEST":
            case 37:
                message.type = 37;
                break;
            case "PUT_RTSP_STREAMING":
            case 38:
                message.type = 38;
                break;
            case "GET_UOM_URI":
            case 39:
                message.type = 39;
                break;
            case "GET_UOM":
            case 40:
                message.type = 40;
                break;
            case "PUT_UOM":
            case 41:
                message.type = 41;
                break;
            case "GET_AUTH_KEY":
            case 42:
                message.type = 42;
                break;
            case "PUT_AUTH_KEY":
            case 43:
                message.type = 43;
                break;
            case "PUT_HEALTH":
            case 44:
                message.type = 44;
                break;
            case "PUT_TCP_REQUEST":
            case 45:
                message.type = 45;
                break;
            case "GET_STING_START":
            case 46:
                message.type = 46;
                break;
            case "GET_LOGS_URI":
            case 47:
                message.type = 47;
                break;
            }
            if (object.getSensorData != null) {
                if (typeof object.getSensorData !== "object")
                    throw TypeError(".client.Request.getSensorData: object expected");
                message.getSensorData = $root.client.GetSensorData.fromObject(object.getSensorData);
            }
            if (object.sensorData) {
                if (!Array.isArray(object.sensorData))
                    throw TypeError(".client.Request.sensorData: array expected");
                message.sensorData = [];
                for (var i = 0; i < object.sensorData.length; ++i) {
                    if (typeof object.sensorData[i] !== "object")
                        throw TypeError(".client.Request.sensorData: object expected");
                    message.sensorData[i] = $root.client.SensorData.fromObject(object.sensorData[i]);
                }
            }
            if (object.streaming != null) {
                if (typeof object.streaming !== "object")
                    throw TypeError(".client.Request.streaming: object expected");
                message.streaming = $root.client.Streaming.fromObject(object.streaming);
            }
            if (object.control != null) {
                if (typeof object.control !== "object")
                    throw TypeError(".client.Request.control: object expected");
                message.control = $root.client.Control.fromObject(object.control);
            }
            if (object.settings != null) {
                if (typeof object.settings !== "object")
                    throw TypeError(".client.Request.settings: object expected");
                message.settings = $root.client.Settings.fromObject(object.settings);
            }
            if (object.status != null) {
                if (typeof object.status !== "object")
                    throw TypeError(".client.Request.status: object expected");
                message.status = $root.client.Status.fromObject(object.status);
            }
            if (object.getStatus != null) {
                if (typeof object.getStatus !== "object")
                    throw TypeError(".client.Request.getStatus: object expected");
                message.getStatus = $root.client.GetStatus.fromObject(object.getStatus);
            }
            if (object.playback != null) {
                if (typeof object.playback !== "object")
                    throw TypeError(".client.Request.playback: object expected");
                message.playback = $root.client.Playback.fromObject(object.playback);
            }
            if (object.getLogs != null) {
                if (typeof object.getLogs !== "object")
                    throw TypeError(".client.Request.getLogs: object expected");
                message.getLogs = $root.client.GetLogs.fromObject(object.getLogs);
            }
            return message;
        };

        /**
         * Creates a plain object from a Request message. Also converts values to other types if specified.
         * @function toObject
         * @memberof client.Request
         * @static
         * @param {client.Request} message Request
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Request.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.sensorData = [];
            if (options.defaults) {
                object.id = 0;
                object.type = options.enums === String ? "GET_STREAMING" : 3;
                object.streaming = null;
                object.settings = null;
                object.status = null;
                object.getStatus = null;
                object.getSensorData = null;
                object.control = null;
                object.playback = null;
                object.getLogs = null;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.client.RequestType[message.type] === undefined ? message.type : $root.client.RequestType[message.type] : message.type;
            if (message.streaming != null && message.hasOwnProperty("streaming"))
                object.streaming = $root.client.Streaming.toObject(message.streaming, options);
            if (message.settings != null && message.hasOwnProperty("settings"))
                object.settings = $root.client.Settings.toObject(message.settings, options);
            if (message.status != null && message.hasOwnProperty("status"))
                object.status = $root.client.Status.toObject(message.status, options);
            if (message.getStatus != null && message.hasOwnProperty("getStatus"))
                object.getStatus = $root.client.GetStatus.toObject(message.getStatus, options);
            if (message.getSensorData != null && message.hasOwnProperty("getSensorData"))
                object.getSensorData = $root.client.GetSensorData.toObject(message.getSensorData, options);
            if (message.sensorData && message.sensorData.length) {
                object.sensorData = [];
                for (var j = 0; j < message.sensorData.length; ++j)
                    object.sensorData[j] = $root.client.SensorData.toObject(message.sensorData[j], options);
            }
            if (message.control != null && message.hasOwnProperty("control"))
                object.control = $root.client.Control.toObject(message.control, options);
            if (message.playback != null && message.hasOwnProperty("playback"))
                object.playback = $root.client.Playback.toObject(message.playback, options);
            if (message.getLogs != null && message.hasOwnProperty("getLogs"))
                object.getLogs = $root.client.GetLogs.toObject(message.getLogs, options);
            return object;
        };

        /**
         * Converts this Request to JSON.
         * @function toJSON
         * @memberof client.Request
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Request.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Request
         * @function getTypeUrl
         * @memberof client.Request
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Request.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/client.Request";
        };

        return Request;
    })();

    client.Response = (function() {

        /**
         * Properties of a Response.
         * @memberof client
         * @interface IResponse
         * @property {number} requestId Response requestId
         * @property {client.RequestType} requestType Response requestType
         * @property {number} statusCode Response statusCode
         * @property {string|null} [statusMessage] Response statusMessage
         * @property {client.IStatus|null} [status] Response status
         * @property {Array.<client.ISensorData>|null} [sensorData] Response sensorData
         * @property {client.ISettings|null} [settings] Response settings
         */

        /**
         * Constructs a new Response.
         * @memberof client
         * @classdesc Represents a Response.
         * @implements IResponse
         * @constructor
         * @param {client.IResponse=} [properties] Properties to set
         */
        function Response(properties) {
            this.sensorData = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Response requestId.
         * @member {number} requestId
         * @memberof client.Response
         * @instance
         */
        Response.prototype.requestId = 0;

        /**
         * Response requestType.
         * @member {client.RequestType} requestType
         * @memberof client.Response
         * @instance
         */
        Response.prototype.requestType = 3;

        /**
         * Response statusCode.
         * @member {number} statusCode
         * @memberof client.Response
         * @instance
         */
        Response.prototype.statusCode = 0;

        /**
         * Response statusMessage.
         * @member {string} statusMessage
         * @memberof client.Response
         * @instance
         */
        Response.prototype.statusMessage = "";

        /**
         * Response status.
         * @member {client.IStatus|null|undefined} status
         * @memberof client.Response
         * @instance
         */
        Response.prototype.status = null;

        /**
         * Response sensorData.
         * @member {Array.<client.ISensorData>} sensorData
         * @memberof client.Response
         * @instance
         */
        Response.prototype.sensorData = $util.emptyArray;

        /**
         * Response settings.
         * @member {client.ISettings|null|undefined} settings
         * @memberof client.Response
         * @instance
         */
        Response.prototype.settings = null;

        /**
         * Creates a new Response instance using the specified properties.
         * @function create
         * @memberof client.Response
         * @static
         * @param {client.IResponse=} [properties] Properties to set
         * @returns {client.Response} Response instance
         */
        Response.create = function create(properties) {
            return new Response(properties);
        };

        /**
         * Encodes the specified Response message. Does not implicitly {@link client.Response.verify|verify} messages.
         * @function encode
         * @memberof client.Response
         * @static
         * @param {client.IResponse} message Response message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Response.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.requestId);
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.requestType);
            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.statusCode);
            if (message.statusMessage != null && Object.hasOwnProperty.call(message, "statusMessage"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.statusMessage);
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                $root.client.Status.encode(message.status, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.settings != null && Object.hasOwnProperty.call(message, "settings"))
                $root.client.Settings.encode(message.settings, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            if (message.sensorData != null && message.sensorData.length)
                for (var i = 0; i < message.sensorData.length; ++i)
                    $root.client.SensorData.encode(message.sensorData[i], writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Response message, length delimited. Does not implicitly {@link client.Response.verify|verify} messages.
         * @function encodeDelimited
         * @memberof client.Response
         * @static
         * @param {client.IResponse} message Response message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Response.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Response message from the specified reader or buffer.
         * @function decode
         * @memberof client.Response
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {client.Response} Response
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Response.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.client.Response();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.requestId = reader.int32();
                        break;
                    }
                case 2: {
                        message.requestType = reader.int32();
                        break;
                    }
                case 3: {
                        message.statusCode = reader.int32();
                        break;
                    }
                case 4: {
                        message.statusMessage = reader.string();
                        break;
                    }
                case 5: {
                        message.status = $root.client.Status.decode(reader, reader.uint32());
                        break;
                    }
                case 9: {
                        if (!(message.sensorData && message.sensorData.length))
                            message.sensorData = [];
                        message.sensorData.push($root.client.SensorData.decode(reader, reader.uint32()));
                        break;
                    }
                case 6: {
                        message.settings = $root.client.Settings.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("requestId"))
                throw $util.ProtocolError("missing required 'requestId'", { instance: message });
            if (!message.hasOwnProperty("requestType"))
                throw $util.ProtocolError("missing required 'requestType'", { instance: message });
            if (!message.hasOwnProperty("statusCode"))
                throw $util.ProtocolError("missing required 'statusCode'", { instance: message });
            return message;
        };

        /**
         * Decodes a Response message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof client.Response
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {client.Response} Response
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Response.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Response message.
         * @function verify
         * @memberof client.Response
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Response.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message.requestId))
                return "requestId: integer expected";
            switch (message.requestType) {
            default:
                return "requestType: enum value expected";
            case 3:
            case 2:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 12:
            case 11:
            case 13:
            case 14:
            case 15:
            case 16:
            case 17:
            case 18:
            case 19:
            case 20:
            case 21:
            case 22:
            case 23:
            case 24:
            case 25:
            case 26:
            case 27:
            case 28:
            case 29:
            case 30:
            case 31:
            case 32:
            case 34:
            case 35:
            case 36:
            case 37:
            case 38:
            case 39:
            case 40:
            case 41:
            case 42:
            case 43:
            case 44:
            case 45:
            case 46:
            case 47:
                break;
            }
            if (!$util.isInteger(message.statusCode))
                return "statusCode: integer expected";
            if (message.statusMessage != null && message.hasOwnProperty("statusMessage"))
                if (!$util.isString(message.statusMessage))
                    return "statusMessage: string expected";
            if (message.status != null && message.hasOwnProperty("status")) {
                var error = $root.client.Status.verify(message.status);
                if (error)
                    return "status." + error;
            }
            if (message.sensorData != null && message.hasOwnProperty("sensorData")) {
                if (!Array.isArray(message.sensorData))
                    return "sensorData: array expected";
                for (var i = 0; i < message.sensorData.length; ++i) {
                    var error = $root.client.SensorData.verify(message.sensorData[i]);
                    if (error)
                        return "sensorData." + error;
                }
            }
            if (message.settings != null && message.hasOwnProperty("settings")) {
                var error = $root.client.Settings.verify(message.settings);
                if (error)
                    return "settings." + error;
            }
            return null;
        };

        /**
         * Creates a Response message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof client.Response
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {client.Response} Response
         */
        Response.fromObject = function fromObject(object) {
            if (object instanceof $root.client.Response)
                return object;
            var message = new $root.client.Response();
            if (object.requestId != null)
                message.requestId = object.requestId | 0;
            switch (object.requestType) {
            default:
                if (typeof object.requestType === "number") {
                    message.requestType = object.requestType;
                    break;
                }
                break;
            case "GET_STREAMING":
            case 3:
                message.requestType = 3;
                break;
            case "PUT_STREAMING":
            case 2:
                message.requestType = 2;
                break;
            case "GET_SETTINGS":
            case 4:
                message.requestType = 4;
                break;
            case "PUT_SETTINGS":
            case 5:
                message.requestType = 5;
                break;
            case "GET_CONTROL":
            case 6:
                message.requestType = 6;
                break;
            case "PUT_CONTROL":
            case 7:
                message.requestType = 7;
                break;
            case "GET_STATUS":
            case 8:
                message.requestType = 8;
                break;
            case "PUT_STATUS":
            case 9:
                message.requestType = 9;
                break;
            case "GET_SENSOR_DATA":
            case 12:
                message.requestType = 12;
                break;
            case "PUT_SENSOR_DATA":
            case 11:
                message.requestType = 11;
                break;
            case "GET_UCTOKENS":
            case 13:
                message.requestType = 13;
                break;
            case "PUT_UCTOKENS":
            case 14:
                message.requestType = 14;
                break;
            case "PUT_SETUP_NETWORK":
            case 15:
                message.requestType = 15;
                break;
            case "PUT_SETUP_SERVER":
            case 16:
                message.requestType = 16;
                break;
            case "GET_FIRMWARE":
            case 17:
                message.requestType = 17;
                break;
            case "PUT_FIRMWARE":
            case 18:
                message.requestType = 18;
                break;
            case "GET_PLAYBACK":
            case 19:
                message.requestType = 19;
                break;
            case "PUT_PLAYBACK":
            case 20:
                message.requestType = 20;
                break;
            case "GET_SOUNDTRACKS":
            case 21:
                message.requestType = 21;
                break;
            case "GET_STATUS_NETWORK":
            case 22:
                message.requestType = 22;
                break;
            case "GET_LIST_NETWORKS":
            case 23:
                message.requestType = 23;
                break;
            case "GET_LOGS":
            case 24:
                message.requestType = 24;
                break;
            case "GET_BANDWIDTH":
            case 25:
                message.requestType = 25;
                break;
            case "GET_AUDIO_STREAMING":
            case 26:
                message.requestType = 26;
                break;
            case "PUT_AUDIO_STREAMING":
            case 27:
                message.requestType = 27;
                break;
            case "GET_WIFI_SETUP":
            case 28:
                message.requestType = 28;
                break;
            case "PUT_WIFI_SETUP":
            case 29:
                message.requestType = 29;
                break;
            case "PUT_STING_START":
            case 30:
                message.requestType = 30;
                break;
            case "PUT_STING_STOP":
            case 31:
                message.requestType = 31;
                break;
            case "PUT_STING_STATUS":
            case 32:
                message.requestType = 32;
                break;
            case "PUT_STING_ALERT":
            case 34:
                message.requestType = 34;
                break;
            case "PUT_KEEP_ALIVE":
            case 35:
                message.requestType = 35;
                break;
            case "GET_STING_STATUS":
            case 36:
                message.requestType = 36;
                break;
            case "PUT_STING_TEST":
            case 37:
                message.requestType = 37;
                break;
            case "PUT_RTSP_STREAMING":
            case 38:
                message.requestType = 38;
                break;
            case "GET_UOM_URI":
            case 39:
                message.requestType = 39;
                break;
            case "GET_UOM":
            case 40:
                message.requestType = 40;
                break;
            case "PUT_UOM":
            case 41:
                message.requestType = 41;
                break;
            case "GET_AUTH_KEY":
            case 42:
                message.requestType = 42;
                break;
            case "PUT_AUTH_KEY":
            case 43:
                message.requestType = 43;
                break;
            case "PUT_HEALTH":
            case 44:
                message.requestType = 44;
                break;
            case "PUT_TCP_REQUEST":
            case 45:
                message.requestType = 45;
                break;
            case "GET_STING_START":
            case 46:
                message.requestType = 46;
                break;
            case "GET_LOGS_URI":
            case 47:
                message.requestType = 47;
                break;
            }
            if (object.statusCode != null)
                message.statusCode = object.statusCode | 0;
            if (object.statusMessage != null)
                message.statusMessage = String(object.statusMessage);
            if (object.status != null) {
                if (typeof object.status !== "object")
                    throw TypeError(".client.Response.status: object expected");
                message.status = $root.client.Status.fromObject(object.status);
            }
            if (object.sensorData) {
                if (!Array.isArray(object.sensorData))
                    throw TypeError(".client.Response.sensorData: array expected");
                message.sensorData = [];
                for (var i = 0; i < object.sensorData.length; ++i) {
                    if (typeof object.sensorData[i] !== "object")
                        throw TypeError(".client.Response.sensorData: object expected");
                    message.sensorData[i] = $root.client.SensorData.fromObject(object.sensorData[i]);
                }
            }
            if (object.settings != null) {
                if (typeof object.settings !== "object")
                    throw TypeError(".client.Response.settings: object expected");
                message.settings = $root.client.Settings.fromObject(object.settings);
            }
            return message;
        };

        /**
         * Creates a plain object from a Response message. Also converts values to other types if specified.
         * @function toObject
         * @memberof client.Response
         * @static
         * @param {client.Response} message Response
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Response.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.sensorData = [];
            if (options.defaults) {
                object.requestId = 0;
                object.requestType = options.enums === String ? "GET_STREAMING" : 3;
                object.statusCode = 0;
                object.statusMessage = "";
                object.status = null;
                object.settings = null;
            }
            if (message.requestId != null && message.hasOwnProperty("requestId"))
                object.requestId = message.requestId;
            if (message.requestType != null && message.hasOwnProperty("requestType"))
                object.requestType = options.enums === String ? $root.client.RequestType[message.requestType] === undefined ? message.requestType : $root.client.RequestType[message.requestType] : message.requestType;
            if (message.statusCode != null && message.hasOwnProperty("statusCode"))
                object.statusCode = message.statusCode;
            if (message.statusMessage != null && message.hasOwnProperty("statusMessage"))
                object.statusMessage = message.statusMessage;
            if (message.status != null && message.hasOwnProperty("status"))
                object.status = $root.client.Status.toObject(message.status, options);
            if (message.settings != null && message.hasOwnProperty("settings"))
                object.settings = $root.client.Settings.toObject(message.settings, options);
            if (message.sensorData && message.sensorData.length) {
                object.sensorData = [];
                for (var j = 0; j < message.sensorData.length; ++j)
                    object.sensorData[j] = $root.client.SensorData.toObject(message.sensorData[j], options);
            }
            return object;
        };

        /**
         * Converts this Response to JSON.
         * @function toJSON
         * @memberof client.Response
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Response.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Response
         * @function getTypeUrl
         * @memberof client.Response
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Response.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/client.Response";
        };

        return Response;
    })();

    client.Message = (function() {

        /**
         * Properties of a Message.
         * @memberof client
         * @interface IMessage
         * @property {client.Message.Type} type Message type
         * @property {client.IRequest|null} [request] Message request
         * @property {client.IResponse|null} [response] Message response
         */

        /**
         * Constructs a new Message.
         * @memberof client
         * @classdesc Represents a Message.
         * @implements IMessage
         * @constructor
         * @param {client.IMessage=} [properties] Properties to set
         */
        function Message(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Message type.
         * @member {client.Message.Type} type
         * @memberof client.Message
         * @instance
         */
        Message.prototype.type = 0;

        /**
         * Message request.
         * @member {client.IRequest|null|undefined} request
         * @memberof client.Message
         * @instance
         */
        Message.prototype.request = null;

        /**
         * Message response.
         * @member {client.IResponse|null|undefined} response
         * @memberof client.Message
         * @instance
         */
        Message.prototype.response = null;

        /**
         * Creates a new Message instance using the specified properties.
         * @function create
         * @memberof client.Message
         * @static
         * @param {client.IMessage=} [properties] Properties to set
         * @returns {client.Message} Message instance
         */
        Message.create = function create(properties) {
            return new Message(properties);
        };

        /**
         * Encodes the specified Message message. Does not implicitly {@link client.Message.verify|verify} messages.
         * @function encode
         * @memberof client.Message
         * @static
         * @param {client.IMessage} message Message message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Message.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            if (message.request != null && Object.hasOwnProperty.call(message, "request"))
                $root.client.Request.encode(message.request, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.response != null && Object.hasOwnProperty.call(message, "response"))
                $root.client.Response.encode(message.response, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Message message, length delimited. Does not implicitly {@link client.Message.verify|verify} messages.
         * @function encodeDelimited
         * @memberof client.Message
         * @static
         * @param {client.IMessage} message Message message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Message.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Message message from the specified reader or buffer.
         * @function decode
         * @memberof client.Message
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {client.Message} Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Message.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.client.Message();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.type = reader.int32();
                        break;
                    }
                case 2: {
                        message.request = $root.client.Request.decode(reader, reader.uint32());
                        break;
                    }
                case 3: {
                        message.response = $root.client.Response.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("type"))
                throw $util.ProtocolError("missing required 'type'", { instance: message });
            return message;
        };

        /**
         * Decodes a Message message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof client.Message
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {client.Message} Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Message.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Message message.
         * @function verify
         * @memberof client.Message
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Message.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.type) {
            default:
                return "type: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
            if (message.request != null && message.hasOwnProperty("request")) {
                var error = $root.client.Request.verify(message.request);
                if (error)
                    return "request." + error;
            }
            if (message.response != null && message.hasOwnProperty("response")) {
                var error = $root.client.Response.verify(message.response);
                if (error)
                    return "response." + error;
            }
            return null;
        };

        /**
         * Creates a Message message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof client.Message
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {client.Message} Message
         */
        Message.fromObject = function fromObject(object) {
            if (object instanceof $root.client.Message)
                return object;
            var message = new $root.client.Message();
            switch (object.type) {
            default:
                if (typeof object.type === "number") {
                    message.type = object.type;
                    break;
                }
                break;
            case "KEEPALIVE":
            case 0:
                message.type = 0;
                break;
            case "REQUEST":
            case 1:
                message.type = 1;
                break;
            case "RESPONSE":
            case 2:
                message.type = 2;
                break;
            }
            if (object.request != null) {
                if (typeof object.request !== "object")
                    throw TypeError(".client.Message.request: object expected");
                message.request = $root.client.Request.fromObject(object.request);
            }
            if (object.response != null) {
                if (typeof object.response !== "object")
                    throw TypeError(".client.Message.response: object expected");
                message.response = $root.client.Response.fromObject(object.response);
            }
            return message;
        };

        /**
         * Creates a plain object from a Message message. Also converts values to other types if specified.
         * @function toObject
         * @memberof client.Message
         * @static
         * @param {client.Message} message Message
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Message.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.type = options.enums === String ? "KEEPALIVE" : 0;
                object.request = null;
                object.response = null;
            }
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.client.Message.Type[message.type] === undefined ? message.type : $root.client.Message.Type[message.type] : message.type;
            if (message.request != null && message.hasOwnProperty("request"))
                object.request = $root.client.Request.toObject(message.request, options);
            if (message.response != null && message.hasOwnProperty("response"))
                object.response = $root.client.Response.toObject(message.response, options);
            return object;
        };

        /**
         * Converts this Message to JSON.
         * @function toJSON
         * @memberof client.Message
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Message.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Message
         * @function getTypeUrl
         * @memberof client.Message
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Message.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/client.Message";
        };

        /**
         * Type enum.
         * @name client.Message.Type
         * @enum {number}
         * @property {number} KEEPALIVE=0 KEEPALIVE value
         * @property {number} REQUEST=1 REQUEST value
         * @property {number} RESPONSE=2 RESPONSE value
         */
        Message.Type = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "KEEPALIVE"] = 0;
            values[valuesById[1] = "REQUEST"] = 1;
            values[valuesById[2] = "RESPONSE"] = 2;
            return values;
        })();

        return Message;
    })();

    return client;
})();

module.exports = $root;
