# homebridge-nanit Code Review

Date: 2026-02-10

Reviewed:
- TypeScript plugin: `src/*`
- Go reference: `/tmp/nanit-ref/` (notably `pkg/client/rest.go`, `pkg/client/websocket.go`, `pkg/client/websocket_conn.go`, `pkg/app/websocket_handlers.go`, `docs/developer-notes.md`)

---

## Executive Summary

The plugin has a solid base (correct core endpoints, protobuf v2, keepalive cadence, and basic sensor parsing), but had several protocol/reliability issues that would cause real runtime failures:

1. **WebSocket `connect()` resolved before socket was actually open** (race for first request) ✅ fixed
2. **WebSocket used a sync token getter, so reconnect could use stale/expired token** ✅ fixed
3. **Manual disconnect still triggered auto-reconnect** ✅ fixed
4. **Pending WebSocket requests were not rejected/cleaned up on close** ✅ fixed
5. **REST `/babies` call did not retry once on 401 (expired token)** ✅ fixed
6. **MFA 482 handling discarded returned `mfa_token`** ✅ improved
7. **Streaming URL flow did not match Nanit remote stream protocol detail** (`rtmps://media-secured.nanit.com/nanit/{baby_uid}.{auth_token}`) ✅ fixed

Build still succeeds after fixes: `npm run build`.

---

## Protocol Correctness Review

## 1) REST auth header format
- Expected (reference): `Authorization: {token}` for `api.nanit.com` REST
- TS status: ✅ correct (`fetchBabies`)

## 2) Login endpoint + header
- Expected: `POST https://api.nanit.com/login` + `nanit-api-version: 2`
- TS status: ✅ correct

## 3) MFA behavior (482)
- Expected: status 482 with `mfa_token`
- TS status before: ⚠️ returned generic MFA error, did not parse token
- TS status after: ✅ parses JSON and includes `mfa_token` in error context when available

## 4) Token refresh
- Expected: `POST https://api.nanit.com/tokens/refresh`
- TS status: ✅ endpoint is correct
- Gap before: ⚠️ no one-shot reauth retry on 401 for REST resource calls
- After fix: ✅ `/babies` now retries once after forced re-auth

## 5) WebSocket auth format
- Expected (reference): `/focus/*` endpoints require `Authorization: Bearer {token}`
- TS status: ✅ correct

## 6) WebSocket protocol
- Expected: protobuf v2 + keepalive every 20s
- TS status: ✅ proto2 file + 20s keepalive

## 7) Streaming flow
- Expected: `PUT_STREAMING` request with `streaming.id=MOBILE`, `status`, `rtmpUrl`, `attempts`
- TS status: ✅ message structure is correct
- Important protocol detail: remote URL uses `rtmps://media-secured.nanit.com/nanit/{baby_uid}.{auth_token}`
- TS before: ⚠️ requested stream to local `rtmp://localhost:...`, which does not match documented remote flow
- TS after: ✅ requests remote RTMPS URL in expected format

## 8) Connection limit
- Reference notes warn camera has max 2 active WS connections
- TS status: ⚠️ no explicit handling for the “above limit” forbidden case yet

---

## Error Handling Review

### Fixed
- **Connect race condition:** `connect()` now resolves on `'open'`, not immediately after constructing socket.
- **Reconnect with fresh credentials:** token getter is async; reconnect path can refresh token.
- **Manual shutdown semantics:** intentional `disconnect()` no longer schedules reconnect.
- **Request lifecycle cleanup:** pending request promises are rejected on close/disconnect; per-request timeout handles are cleared.
- **REST token expiry:** one retry after `401` with fresh auth.

### Still recommended
- Add explicit classification for forbidden WS errors (e.g., active-connection limit) and apply slower backoff (reference Go waits long when over limit).
- Add jittered exponential backoff to reduce synchronized reconnect spikes.
- Treat auth failures separately from network failures (faster for token refresh, slower for network outage).

---

## Security Review

### Good
- TLS endpoints (`https://`, `wss://`, `rtmps://`) used.
- No obvious token logging in current TS paths.

### Improve
- Avoid ever including full MFA/access/refresh tokens in logs; if logged, mask them.
- Consider making `password` optional if `refreshToken` is provided (least privilege at rest).
- Consider secure config guidance in README (env vars/secret managers).

---

## Resource Management Review

### Fixed
- Keepalive timer cleanup on close/disconnect.
- Reconnect timer cleanup on manual disconnect.
- Pending-request timeout cleanup on response/close.

### Remaining
- `NanitCamera` still keeps RTMP server references but streaming path is remote; prune unused local RTMP code or gate it behind explicit mode.
- Potential stale accessories/camera map lifecycle could be tightened (remove camera instance when accessory removed).

---

## HomeKit Integration Review

Current implementation is **not yet a full HomeKit camera streaming implementation**.

- `CameraRTPStreamManagement` service is created, but `CameraController` / `CameraStreamingDelegate` integration is not implemented.
- No SRTP session negotiation, no `prepareStream` / `handleStreamRequest`, no FFmpeg bridge flow.
- Sensor services (temperature/humidity) are wired and updated reasonably.
- Motion sensor is hardcoded `false` (acceptable placeholder, but should be clearly documented as unsupported).

Recommendation: migrate to Homebridge CameraController pattern with a proper delegate and lifecycle hooks.

---

## Code Quality / Type Safety

### Improvements made
- Async token retrieval for WebSocket constructor.
- Better request bookkeeping and cleanup.

### Recommended follow-ups
- Replace `any` in proto and platform references with narrow interfaces.
- Strongly type protobuf message wrappers (`Request`, `Response`) via generated TS types if possible.
- Remove dead/commented paths and stale local-stream assumptions.

---

## Bugs Fixed in Source

Files changed:
- `src/nanit-api.ts`
  - Added authenticated fetch helper with one retry on 401.
  - Improved MFA 482 handling to parse/report `mfa_token`.
  - Changed WebSocket token getter to async (`Promise<string>`) via `ensureAuth()`.

- `src/nanit-websocket.ts`
  - `connect()` now resolves only after `'open'`.
  - Added `connectPromise` deduping and `isManuallyDisconnected` guard.
  - Reconnect only when not manually disconnected.
  - Pending request map now stores timeout handles and clears/rejects correctly on close/disconnect.
  - Token getter made async for reconnect-time refresh.

- `src/nanit-camera.ts`
  - Removed unused import.
  - Updated constructor to include `babyUid` and async token getter.
  - `startStreaming()` now uses remote URL format:
    - `rtmps://media-secured.nanit.com/nanit/{baby_uid}.{auth_token}`

- `src/platform.ts`
  - Updated `NanitCamera` instantiation arguments to pass `baby.uid` and async token getter.

---

## Suggested Additional Improvements (with snippets)

### 1) Handle connection-limit errors explicitly

```ts
// In websocket error/close handling
if (/above limit|declining connection|403/i.test(error.message)) {
  const coolOffMs = 5 * 60_000;
  setTimeout(() => this.connect().catch(...), coolOffMs);
  return;
}
```

### 2) Add jitter to reconnect backoff

```ts
const base = Math.min(1000 * 2 ** this.reconnectAttempts, this.maxReconnectDelay);
const jitter = Math.floor(Math.random() * 1000);
const delay = base + jitter;
```

### 3) Use AbortController for REST timeouts

```ts
const ac = new AbortController();
const t = setTimeout(() => ac.abort(), 10000);
const res = await fetch(url, { signal: ac.signal, headers });
clearTimeout(t);
```

---

## Test Plan

## Unit tests

### `nanit-api.test.ts`
- login request includes `nanit-api-version: 2`
- 482 response parses `mfa_token`
- refresh endpoint call shape (`/tokens/refresh`)
- `fetchBabies` retries once on 401 and succeeds after re-auth
- refresh failure falls back to login

### `nanit-websocket.test.ts`
- `connect()` resolves only after open event
- keepalive sent every 20s (fake timers)
- pending requests resolve on matching `requestId`
- pending requests reject on timeout
- pending requests reject on close/disconnect
- manual `disconnect()` prevents reconnect
- reconnect path requests token again (async getter called multiple times)

### `protobuf-encoding.test.ts`
- encode/decode roundtrip for:
  - KEEPALIVE
  - PUT_STREAMING request with `MOBILE`, `STARTED`, `attempts`
  - GET_SENSOR_DATA request
- sensorData parse for `valueMilli` temperature/humidity

## Integration test outline

- Mock REST + WS Nanit server:
  1. successful login + babies + WS handshake
  2. force token expiry (401) then verify refresh/retry
  3. simulate WS drop and verify reconnect
  4. simulate 403/connection limit and verify cool-off behavior
  5. simulate `PUT_STREAMING` success/failure and retry logic

- Homebridge integration smoke test:
  - plugin boots
  - accessory appears
  - temperature/humidity characteristics update from mocked WS sensor messages

---

## Implementation Status Update (2026-02-10)

All previously listed "Suggested Additional Improvements" and unit-test plan items are now implemented:

- [x] `src/nanit-websocket.ts`
  - [x] Explicit connection-limit cooloff handling (403 / above-limit / declining connection) with 5-minute retry delay
  - [x] Jittered exponential reconnect backoff
  - [x] Replaced broad `any` usage with narrow request/response interfaces
- [x] `src/nanit-api.ts`
  - [x] REST timeout handling via `AbortController` (10s)
  - [x] `password` made optional when `refreshToken` is provided
  - [x] Token masking in logs (last 4 chars only)
- [x] `src/nanit-camera.ts`
  - [x] Removed local RTMP-dependent camera flow from active streaming path
  - [x] Implemented Homebridge `CameraController` + `CameraStreamingDelegate` with `prepareStream` / `handleStreamRequest`
  - [x] Added unsupported-motion placeholder documentation/logging
- [x] `src/platform.ts`
  - [x] Accessory/camera lifecycle cleanup when stale accessories are removed
  - [x] Replaced remaining broad `any` usage in platform flows
- [x] Test suite
  - [x] Added Jest + ts-jest configuration
  - [x] Added `nanit-api.test.ts`
  - [x] Added `nanit-websocket.test.ts`
  - [x] Added `protobuf-encoding.test.ts`
  - [x] Build passes (`npm run build`)
  - [x] Tests pass (`npx jest`)

## Final Assessment

The plugin is now materially more correct and robust against common Nanit auth/WS lifecycle failures, and aligns better with the reference protocol behavior. The remaining practical hardening area is production validation/tuning of the FFmpeg runtime pipeline against real device/network conditions.
