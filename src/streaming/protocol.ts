import { Root } from 'protobufjs/light';

/*
 * The subset of Nanit's camera protocol (proto/websocket.proto) that the
 * signaling channel uses: PUT_STREAMING requests and their responses. Fields
 * not listed here are skipped when decoding.
 */
const root = Root.fromJSON({
  nested: {
    client: {
      nested: {
        RequestType: { values: { PUT_STREAMING: 2 } },
        StreamIdentifier: { values: { DVR: 0, ANALYTICS: 1, MOBILE: 2 } },
        Streaming: {
          fields: {
            id: { rule: 'required', type: 'StreamIdentifier', id: 1 },
            status: { rule: 'required', type: 'Status', id: 2 },
            rtmpUrl: { rule: 'required', type: 'string', id: 3 },
            attempts: { type: 'int32', id: 4 },
          },
          nested: { Status: { values: { STARTED: 0, STOPPED: 1, PAUSED: 2 } } },
        },
        Request: {
          fields: {
            id: { rule: 'required', type: 'int32', id: 1 },
            type: { rule: 'required', type: 'RequestType', id: 2 },
            streaming: { type: 'Streaming', id: 4 },
          },
        },
        Response: {
          fields: {
            requestId: { rule: 'required', type: 'int32', id: 1 },
            requestType: { rule: 'required', type: 'int32', id: 2 },
            statusCode: { rule: 'required', type: 'int32', id: 3 },
            statusMessage: { type: 'string', id: 4 },
          },
        },
        Message: {
          fields: {
            type: { rule: 'required', type: 'Type', id: 1 },
            request: { type: 'Request', id: 2 },
            response: { type: 'Response', id: 3 },
          },
          nested: { Type: { values: { KEEPALIVE: 0, REQUEST: 1, RESPONSE: 2 } } },
        },
      },
    },
  },
});

const Message = root.lookupType('client.Message');

const MESSAGE_TYPE_REQUEST = 1;
const REQUEST_TYPE_PUT_STREAMING = 2;
const STREAM_ID_MOBILE = 2;

export enum StreamingStatus {
  STARTED = 0,
  STOPPED = 1,
}

export interface SignalingResponse {
  requestId: number;
  statusCode: number;
  statusMessage?: string;
}

export function encodePutStreaming(requestId: number, status: StreamingStatus, rtmpUrl: string): Uint8Array {
  return Message.encode({
    type: MESSAGE_TYPE_REQUEST,
    request: {
      id: requestId,
      type: REQUEST_TYPE_PUT_STREAMING,
      // attempts: 1, as other open-source Nanit clients send.
      streaming: { id: STREAM_ID_MOBILE, status, rtmpUrl, attempts: 1 },
    },
  }).finish();
}

/** The response carried by a message, if any. Throws on malformed input. */
export function decodeResponse(data: Uint8Array): SignalingResponse | undefined {
  const { response } = Message.toObject(Message.decode(data)) as { response?: SignalingResponse };
  return response;
}
