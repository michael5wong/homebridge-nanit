# Homebridge Nanit Plugin — Code Review

**Reviewer:** Blue (OpenClaw Agent)  
**Date:** February 10, 2026  
**Version Reviewed:** 1.0.0 (pre-release)

---

## Executive Summary

This is a well-structured Homebridge plugin with solid core functionality for integrating Nanit baby monitors into HomeKit. The code demonstrates good architectural choices (cloud vs local streaming, token management) and comprehensive feature coverage. However, there are **critical issues** around resource management, error handling, and npm publishing readiness that must be addressed before public release.

**Overall Grade:** B- (Good foundation, needs polish)

---

## 1. Security Issues

### 🔴 Critical: Plaintext Password Storage
**Location:** `platform.ts`, `settings.ts`, `config.schema.json`

The plugin requires users to store their Nanit password in plaintext in `config.json`. While this is common in Homebridge plugins, it's a significant security risk.

**Issue:**
```typescript
// config.json
{
  "email": "user@example.com",
  "password": "my-secret-password"  // ❌ Stored in plaintext
}
```

**Recommendation:**
- Since you already have a `nanit-auth` CLI helper, consider **only requiring the refresh token** in config
- The CLI can handle the initial password login + MFA, then output a refresh token
- Remove `password` from the config schema entirely (it's only used once for initial login)
- Update README to emphasize the CLI flow: `npx nanit-auth` → get token → add to config

**Revised config:**
```json
{
  "email": "user@example.com",
  "refreshToken": "long-lived-token-here"
}
```

This way, passwords never touch the config file.

---

### 🟡 Moderate: Refresh Token Storage
**Location:** `platform.ts:83-85`

Refresh tokens are stored in HAP's localStorage:
```typescript
storage.setItemSync(`nanit_refresh_${this.config.email}`, this.refreshToken);
```

**Issue:** HAP storage is plaintext JSON files in `~/.homebridge/persist/`. While better than config.json, it's still vulnerable to file system access.

**Recommendation:**
- Document that refresh tokens are sensitive and the Homebridge host should be secured
- Consider adding a note in README about token rotation/expiration policies
- The current implementation is acceptable for v1.0, but mention it in security docs

---

### 🟢 Good: Access Token Handling
Access tokens are kept in-memory only (`this.accessToken`) and auto-refreshed every 50 minutes. Good practice.

---

### 🔴 Critical: Missing LICENSE File
**Location:** Root directory

**Issue:** `package.json` declares `"license": "MIT"` but there's no `LICENSE` file in the repository.

**Fix:**
Create a `LICENSE` file with the standard MIT license text:

```
MIT License

Copyright (c) 2026 Michael Wong

Permission is hereby granted, free of charge, to any person obtaining a copy...
```

Without this, your npm package is technically unlicensed despite what package.json says.

---

## 2. Error Handling & Edge Cases

### 🔴 Critical: No Platform Cleanup
**Location:** `platform.ts`, `camera.ts`, `localStreamingDelegate.ts`

**Issue:** The platform has no shutdown/cleanup handler. When Homebridge restarts or the plugin is disabled:
- FFmpeg processes may be orphaned
- WebSocket connections left open
- RTMP servers keep running
- Active sessions not cleaned up

**Fix:** Implement cleanup in `platform.ts`:

```typescript
export class NanitPlatform implements DynamicPlatformPlugin {
  // ...existing code...

  // Add this method
  shutdown(): void {
    this.log.info('Shutting down Nanit platform');
    
    // Clear intervals
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
    if (this.discoveryInterval) {
      clearInterval(this.discoveryInterval);
    }
    
    // Cleanup all cameras
    for (const camera of this.cameras.values()) {
      if (camera.destroy) {
        camera.destroy();
      }
    }
    
    this.cameras.clear();
  }
}
```

And add a `destroy()` method to `NanitCamera`:
```typescript
public destroy(): void {
  // Cleanup streaming delegates
  if (this.streamingDelegate && this.streamingDelegate.destroy) {
    this.streamingDelegate.destroy();
  }
}
```

The `LocalStreamingDelegate` already has a `destroy()` method, but it's never called. Add one to `NanitStreamingDelegate` too.

---

### 🟡 Moderate: Missing Import
**Location:** `platform.ts:7`

**Issue:** `fetch` is used but not imported. This works in Node 18+ (global fetch), but it's not explicit.

**Fix:**
```typescript
import fetch from 'node-fetch';  // Already in dependencies
```

Or document that Node 18+ is required for native fetch.

---

### 🟡 Moderate: FFmpeg Error Handling
**Location:** `streamingDelegate.ts:74-80`, `localStreamingDelegate.ts:249-255`

**Issue:** FFmpeg errors are logged but streams continue. If `ffmpeg` is not installed or fails to spawn, the error callback gets an `Error` object but `callback()` is never called in the snapshot handler on success path.

**Fix in `streamingDelegate.ts:handleSnapshotRequest`:**
```typescript
ffmpeg.on('close', (code) => {
  if (imageBuffer.length > 0) {
    callback(undefined, imageBuffer);
  } else {
    this.log.error(`[${this.name}] FFmpeg exited with code ${code}, no image data`);
    callback(new Error('Failed to generate snapshot'));
  }
});

// Add timeout for hung ffmpeg processes
const timeout = setTimeout(() => {
  ffmpeg.kill('SIGKILL');
  callback(new Error('Snapshot timeout'));
}, 10000);

ffmpeg.on('close', () => {
  clearTimeout(timeout);
  // ... rest of handler
});
```

---

### 🟡 Moderate: WebSocket Error Handling
**Location:** `localStreamingDelegate.ts:103-125`

**Issue:** WebSocket connection errors reject the promise, but there's no retry logic or user-facing error message.

**Recommendation:**
```typescript
ws.on('error', (error: Error) => {
  this.log.error(`[${this.name}] WebSocket error (camera may be offline or on different network):`, error.message);
  reject(error);
});
```

Also consider adding a note in the README about local streaming requirements (same network, camera online, etc.).

---

### 🟢 Good: Auth Error Handling
MFA detection, token refresh failures, and login errors are well-handled with clear log messages.

---

## 3. Resource Leaks

### 🔴 Critical: FFmpeg Process Cleanup
**Location:** `streamingDelegate.ts:156`, `localStreamingDelegate.ts:267`

**Issue:** Processes are killed with `SIGKILL` (immediate termination), which can leave zombie processes or not flush buffers properly.

**Fix:** Use graceful shutdown first, then SIGKILL as fallback:
```typescript
if (session?.process) {
  session.process.kill('SIGTERM');  // Graceful
  setTimeout(() => {
    if (session.process && !session.process.killed) {
      session.process.kill('SIGKILL');  // Force after 2s
    }
  }, 2000);
}
```

Also clean up stdin/stdout/stderr listeners to avoid memory leaks:
```typescript
ffmpeg.stdout.removeAllListeners();
ffmpeg.stderr.removeAllListeners();
ffmpeg.kill('SIGTERM');
```

---

### 🔴 Critical: RTMP Server Lifecycle
**Location:** `localStreamingDelegate.ts:58-72, 97-101`

**Issues:**
1. RTMP server starts but never fully stops (`stopRtmpServer()` is a no-op)
2. NodeMediaServer v4 has no `.stop()` method according to your comment
3. Multiple plugin reloads = multiple cameras = single server with all cameras' streams accumulating

**Fix:**
```typescript
private stopRtmpServer(): void {
  if (this.rtmpServer && this.sessions.size === 0) {
    // NodeMediaServer v4 doesn't expose a clean stop() method
    // Close the underlying TCP server manually if accessible
    try {
      this.rtmpServer.nms?.tcpServer?.close();
      this.rtmpServer = undefined;
      this.log.debug(`[${this.name}] RTMP server stopped`);
    } catch (error) {
      this.log.warn(`[${this.name}] Could not stop RTMP server:`, error);
    }
  }
}
```

Alternatively, keep the server running per your current approach but **document this design decision** in code comments.

---

### 🟡 Moderate: WebSocket Cleanup on Error Paths
**Location:** `localStreamingDelegate.ts:186-199`

**Issue:** If an error occurs during stream setup (e.g., no session found), the WebSocket is closed, but the session might not be cleaned up properly.

**Fix:**
```typescript
if (!session) {
  this.log.error(`[${this.name}] No session found for ${sessionId}`);
  ws.close();
  this.sessions.delete(sessionId);  // ✅ Add this
  callback(new Error('No session'));
  return;
}
```

---

### 🟡 Moderate: Session Map Cleanup
**Location:** `streamingDelegate.ts:148-160`

**Issue:** On STOP, sessions are deleted, but if START fails partway through, the session entry remains.

**Fix:** Wrap START in try-catch and clean up on failure:
```typescript
try {
  // ... existing START logic ...
  callback();
} catch (error) {
  this.log.error(`[${this.name}] Failed to start stream:`, error);
  this.sessions.delete(sessionId);
  if (session?.process) {
    session.process.kill('SIGKILL');
  }
  callback(error as Error);
}
```

---

## 4. Race Conditions

### 🟡 Moderate: `startingSessions` Race
**Location:** `localStreamingDelegate.ts:171-177`

**Issue:** The `startingSessions` set is checked after async `connectToCamera()` resolves. If STOP is called **during** the WebSocket connection (before it resolves), the check may miss it.

**Current code:**
```typescript
const ws = await this.connectToCamera();

// Check if stop was requested during async connect
if (!this.startingSessions.has(sessionId)) {
  this.log.info(`[${this.name}] Stream was stopped during setup, aborting`);
  ws.close();
  callback();
  return;
}
this.startingSessions.delete(sessionId);
```

**Better approach:** Check before and after:
```typescript
this.startingSessions.add(sessionId);

const ws = await this.connectToCamera();

if (!this.startingSessions.has(sessionId)) {
  // Already stopped
  ws.close();
  callback();
  return;
}
this.startingSessions.delete(sessionId);
```

And in STOP:
```typescript
this.startingSessions.delete(sessionId);  // Signal any pending START to abort
```

This is already mostly correct, but the logic could be clearer.

---

### 🟡 Moderate: RTMP Port Allocation
**Location:** `camera.ts:34`

**Issue:** Global `nextRtmpPort` counter is incremented for each camera. On plugin reload or multiple restarts, this keeps incrementing without resetting.

**Problem:**
- First load: Camera A = 1935, Camera B = 1936
- Homebridge restart: Camera A = 1937, Camera B = 1938 (ports 1935-1936 still in use by orphaned RTMP servers?)

**Fix:** Use the camera's UID as a stable hash to determine port offset:
```typescript
private static getPortForCamera(basePort: number, uid: string): number {
  // Simple hash: sum of char codes mod 1000
  const hash = uid.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return basePort + (hash % 1000);
}
```

Or track ports in platform state and assign from a pool.

---

### 🟡 Moderate: Token Refresh Timing
**Location:** `platform.ts:151-157`

**Issue:** Access token refresh happens on a 50-minute interval, but API calls don't check token expiry before use.

**Scenario:**
1. Token expires at T+50min
2. Refresh interval runs at T+50min but takes 5 seconds
3. Meanwhile, `discoverCameras()` runs at T+50min+2sec and uses expired token
4. API call fails

**Fix:** Check expiry before API calls:
```typescript
private async ensureValidToken(): Promise<void> {
  if (!this.tokenExpiry || Date.now() >= this.tokenExpiry - 60000) {  // Refresh 1min early
    await this.refreshAccessToken();
  }
}

async discoverCameras(): Promise<void> {
  await this.ensureValidToken();  // ✅ Add this
  // ... rest of method
}
```

---

## 5. Code Quality & TypeScript

### 🟡 Moderate: `any` Types
**Locations:** `platform.ts:54`, `camera.ts:23`, etc.

**Issue:**
```typescript
private cameraController?: any; // CameraController
```

**Fix:** Import and use proper Homebridge types:
```typescript
import { CameraController } from 'homebridge';
private cameraController?: CameraController;
```

Check if Homebridge exports `CameraController` type. If not, at least define an interface.

---

### 🟡 Moderate: Global State
**Location:** `camera.ts:8`

```typescript
let nextRtmpPort = 0; // auto-incremented per camera
```

**Issue:** Module-level mutable state makes testing harder and doesn't survive plugin reloads cleanly.

**Fix:** Move into platform class:
```typescript
// In NanitPlatform
private rtmpPortCounter = 0;

public allocateRtmpPort(): number {
  return (this.config.localRtmpPort || 1935) + this.rtmpPortCounter++;
}
```

Then in `NanitCamera`:
```typescript
const rtmpPort = this.platform.allocateRtmpPort();
```

---

### 🟡 Moderate: Snapshot URL Format
**Location:** `localStreamingDelegate.ts:138`

**Issue:** The snapshot fallback uses the wrong URL format:
```typescript
const cloudUrl = `rtmps://media-secured.nanit.com/nanit/${this.name}.${this.getAccessToken()}`;
```

Should be `this.babyUid` not `this.name`:
```typescript
const cloudUrl = `rtmps://media-secured.nanit.com/nanit/${this.babyUid}.${this.getAccessToken()}`;
```

---

### 🟢 Good: TypeScript Strict Mode
`tsconfig.json` has `"strict": true` — excellent for catching bugs.

---

### 🟢 Good: Protobuf Types
Auto-generated protobuf code is comprehensive. The `.d.ts` file provides type safety.

---

## 6. npm Publishing Readiness

### 🔴 Critical: Missing LICENSE File
Already covered in Security section. **Must fix before publishing.**

---

### 🟡 Moderate: Missing `refreshToken` in Config Schema
**Location:** `config.schema.json`

**Issue:** The README and CLI helper reference a `refreshToken` field, but it's not in the schema.

**Fix:** Add to `config.schema.json`:
```json
{
  "properties": {
    "email": { ... },
    "password": { ... },
    "refreshToken": {
      "title": "Refresh Token",
      "type": "string",
      "description": "Long-lived refresh token from nanit-auth CLI (recommended over password)"
    },
    // ... rest
  }
}
```

And update the `layout` array to include it.

---

### 🟡 Moderate: No Tests
**Location:** `jest.config.js` exists but no test files

**Recommendation:** Add basic smoke tests before v1.0:
- Auth flow (mocked API)
- Token refresh logic
- Camera discovery
- Streaming delegate instantiation

Not critical for initial release, but plan to add tests for v1.1+.

---

### 🟢 Good: README Quality
Comprehensive, well-formatted, covers installation, setup, troubleshooting. Nice shields.io badges.

---

### 🟢 Good: package.json Metadata
Repository URL, author, keywords, engines — all present and correct.

---

### 🟢 Good: Homebridge UI Support
`config.schema.json` is well-structured for the Homebridge UI.

---

## 7. Bugs & Logic Errors

### 🟡 Moderate: Camera Name Sync Issue
**Location:** `platform.ts:181-188`

**Issue:** On accessory update, you set the name multiple times:
```typescript
existingAccessory.displayName = correctName;
existingAccessory.context.baby = baby;
existingAccessory
  .getService(this.api.hap.Service.AccessoryInformation)
  ?.setCharacteristic(this.api.hap.Characteristic.Name, correctName);
```

**This is fine**, but the `updatePlatformAccessories()` call might not be necessary if you're just updating the context.

**Clarification:** Only call `updatePlatformAccessories()` if the `displayName` or `category` changes. For context updates, it persists automatically.

---

### 🟡 Moderate: Sensor Update Edge Case
**Location:** `camera.ts:132-143`

**Issue:** `updateSensors()` is called with optional parameters, but there's no null check before calling `updateValue()`:

```typescript
if (temperature !== undefined && this.temperatureService) {
  this.temperatureService
    .getCharacteristic(this.hap.Characteristic.CurrentTemperature)
    .updateValue(temperature);  // ✅ Correct
}
```

This is actually fine — `updateValue(0)` would work if `temperature` is 0. But consider **null/undefined** from API:

```typescript
if (temperature !== undefined && temperature !== null && this.temperatureService) {
  // ...
}
```

Or just accept the current behavior (0 is a valid temperature).

---

### 🟢 Good: MFA Flow
The CLI helper's MFA flow is well-designed and handles edge cases (429 rate limit, phone suffix display).

---

## 8. Additional Observations

### Positive:
- ✅ Clean separation of concerns (platform, camera, delegates)
- ✅ Multiple streaming modes (cloud/local/auto) is a great feature
- ✅ Auto token refresh is robust
- ✅ Good logging with camera name prefixes
- ✅ Handles Nanit's quirky API (private_address IP extraction, etc.)

### Areas for Improvement:
- **Documentation:** Add JSDoc comments to public methods
- **Logging:** Consider log levels (debug/info/warn/error) more consistently
- **Performance:** Local streaming starts an RTMP server per camera — consider a single shared server with different stream keys
- **User Experience:** Add a "test connection" mode in the CLI helper

---

## Priority Fixes for v1.0 Release

### Must Fix (Blocking):
1. ✅ Add LICENSE file
2. ✅ Remove password requirement (refreshToken-only flow via CLI)
3. ✅ Add platform cleanup/shutdown handler
4. ✅ Fix FFmpeg process cleanup (use SIGTERM before SIGKILL)

### Should Fix (High Priority):
5. ✅ Add `refreshToken` to config schema
6. ✅ Fix global `nextRtmpPort` state
7. ✅ Add timeout/error handling for ffmpeg snapshots
8. ✅ Improve WebSocket error messages

### Nice to Have (Medium Priority):
9. Add basic unit tests
10. Document RTMP server lifecycle decision
11. Add `ensureValidToken()` guard on API calls

---

## Conclusion

This is a **solid plugin** with excellent core functionality. The streaming implementation (especially local mode) is impressively thorough, and the auth flow handles Nanit's complexity well.

The main concerns are **resource leaks** (FFmpeg/WebSocket/RTMP cleanup) and **missing LICENSE** file, both of which are straightforward to fix. With the priority fixes above, this is **ready for v1.0 publication** on npm.

Great work overall — this will be a valuable plugin for parents using Nanit cameras!

---

## Checklist for Publishing

- [ ] Add LICENSE file
- [ ] Remove password from config (CLI-only flow)
- [ ] Add platform shutdown handler
- [ ] Fix FFmpeg cleanup (SIGTERM → SIGKILL)
- [ ] Add refreshToken to config.schema.json
- [ ] Fix global RTMP port state
- [ ] Test on fresh Homebridge install
- [ ] Test with MFA-enabled account
- [ ] Test local streaming on LAN
- [ ] Test cloud fallback mode
- [ ] Publish to npm: `npm publish`
- [ ] Create GitHub release with changelog

**Estimated effort to fix critical issues:** 2-3 hours  
**Recommended release date:** After fixes above are complete

---

**End of Review**
