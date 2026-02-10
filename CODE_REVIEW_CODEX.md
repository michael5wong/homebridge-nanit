# Homebridge Nanit Plugin Code Review

**Reviewer:** GPT-5.3-Codex  
**Date:** February 10, 2026  
**Version Reviewed:** 1.0.0

## Scope
Reviewed:
- `src/index.ts`, `src/platform.ts`, `src/camera.ts`
- `src/streamingDelegate.ts`, `src/localStreamingDelegate.ts`
- `src/cli.ts`, `src/settings.ts`, `src/nanit.proto.d.ts`
- `package.json`, `config.schema.json`, `README.md`

## Findings (Ordered by Severity)

### Critical

1. **Cloud streaming START builds invalid FFmpeg SRTP pipeline**
   - `src/streamingDelegate.ts:142-159`
   - Uses `(request as any).targetAddress` during START instead of values from `prepareStream`
   - Uses `-f rawvideo` with `srtp://` output, omits `-srtp_out_suite`/`-srtp_out_params`
   - Ignores SRTP key/salt saved in `prepareStream`
   - **Impact:** Broken cloud streaming
   - **Fix:** Store full `SessionInfo` in `prepareStream`, use it in START. Use `-f rtp` + explicit SRTP params.

2. **Local snapshot URL uses display name instead of baby UID**
   - `src/localStreamingDelegate.ts:193`
   - Uses `${this.name}` (display name) in cloud URL; should use `babyUid`
   - **Impact:** Snapshot failures in local mode

### High

3. **MFA token is logged**
   - `src/platform.ts:120` — logs `mfa_token` via `this.log.error`
   - **Impact:** Secret leakage in logs
   - **Fix:** Never log auth tokens

4. **Access token can leak in FFmpeg debug logs**
   - `src/streamingDelegate.ts:162`, `src/camera.ts:181`
   - Full RTMPS URL includes token
   - **Fix:** Redact tokens before logging

5. **No timeout/abort on fetch calls**
   - `src/platform.ts:107,154,189`, `src/cli.ts:28,55`
   - No `AbortController`/timeout on any network requests
   - **Impact:** Plugin may hang indefinitely under network failure

6. **Shutdown cleanup not wired to Homebridge event**
   - `src/platform.ts:292` — `shutdown()` exists but not registered via `this.api.on('shutdown', ...)`
   - **Impact:** Intervals and child processes may not be cleaned up

7. **Removed accessories stay in in-memory array**
   - `src/platform.ts:208-213`
   - Unregistered from Homebridge but not removed from `this.accessories`
   - **Impact:** Stale state, memory leak, repeated removal attempts

8. **Cloud delegate computes session metadata but doesn't use it**
   - `src/streamingDelegate.ts:92,122,141`
   - Stores only `{ process }`, then uses `any` from request at START
   - Same class of bug as Critical #1

### Medium

9. **Config type and runtime behavior inconsistent**
   - `src/settings.ts:17` — `password` typed required but runtime allows refresh-token-only
   - `refreshToken` missing from `NanitPlatformConfig`; code uses `as any`
   - **Fix:** `password?: string; refreshToken?: string;`

10. **Schema uses non-standard property-level `required`**
    - `config.schema.json:12,17` — JSON Schema standard uses top-level `required` array
    - **Fix:** Use standard `required` array, express password/refreshToken with `oneOf`/`anyOf`

11. **Docs encourage storing both password and refresh token**
    - README examples include both values, expanding secret footprint
    - **Fix:** Prefer refresh-token-only examples

12. **CLI password input is echoed to terminal**
    - `src/cli.ts:24` — plain `readline.question` without hidden input
    - **Fix:** Use masked password prompt

13. **Empty camera UID can reach WebSocket URL**
    - `src/localStreamingDelegate.ts:71,108` — defaults to `''`, still attempts connection
    - **Fix:** Validate UID, fall back to cloud early

14. **Host IP selection is naive**
    - `src/localStreamingDelegate.ts:153` — picks first non-internal IPv4
    - **Impact:** Wrong NIC on multi-interface systems
    - **Fix:** Make host IP configurable

15. **`stopRtmpServer()` is a no-op**
    - `src/localStreamingDelegate.ts:99`
    - NodeMediaServer v4 has no stop method; RTMP listeners outlive sessions

16. **Snapshot callback may be invoked twice**
    - `src/streamingDelegate.ts:67,72` and `src/localStreamingDelegate.ts:208,213`
    - Both `error` and `close` handlers call callback without guard
    - **Fix:** Add `called` boolean guard

17. **Dead state and weak typing**
    - `tokenExpiry` unused; several `any` typed controller/server fields
    - **Fix:** Remove dead state, add concrete types

### Low

18. **Broken dev script** — `package.json:15` references `ts-node` not in dependencies

19. **No `files` allowlist in package.json** — npm package may include unnecessary files

20. **Generated protobuf typings are broad** — expected for generated files, but consider typed adapters

## Suggested Fix Order
1. Fix cloud streaming session/SRTP pipeline in `src/streamingDelegate.ts`
2. Remove/redact all token logging
3. Fix local snapshot UID bug
4. Wire shutdown lifecycle and accessory cleanup
5. Align `settings.ts`, `config.schema.json`, and README auth model
6. Add request timeouts and callback guards
