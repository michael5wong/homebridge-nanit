# homebridge-nanit - Implementation Summary

## Status: ✅ Complete and Compiled

Built on: 2026-02-10

## What Was Built

A complete Homebridge plugin for Nanit baby monitors that exposes cameras and sensors to HomeKit.

### Core Components

1. **NanitPlatform** (`src/platform.ts`)
   - Dynamic platform plugin that discovers and manages Nanit cameras
   - Handles authentication with login + token refresh
   - Stores refresh tokens in Homebridge persistent storage
   - Supports MFA (multi-factor authentication) for initial setup
   - Auto-refreshes access token every 50 minutes
   - Auto-discovers cameras at configured intervals (default: 5 minutes)

2. **NanitCamera** (`src/camera.ts`)
   - Camera accessory implementation for each baby/camera
   - Configures HomeKit camera controller with streaming delegate
   - Exposes temperature sensor (if available from camera data)
   - Exposes humidity sensor (if available from camera data)
   - Provides stream URL with current access token

3. **NanitStreamingDelegate** (`src/streamingDelegate.ts`)
   - Implements `CameraStreamingDelegate` for HomeKit video streaming
   - Handles snapshot requests (single frame via ffmpeg)
   - Handles live stream requests (RTMPS → ffmpeg → HomeKit)
   - Transcodes RTMPS stream to HomeKit-compatible format
   - Supports multiple simultaneous streams

4. **Settings & Types** (`src/settings.ts`)
   - Platform configuration interface
   - Nanit API response types
   - Platform and plugin name constants

5. **Entry Point** (`src/index.ts`)
   - Registers the platform with Homebridge

### Configuration Schema

Included `config.schema.json` for Homebridge Config UI X:
- Email (required)
- Password (required)
- MFA code (optional, for initial setup)
- Refresh interval (optional, default 300 seconds)

### Package Structure

```
homebridge-nanit/
├── src/
│   ├── index.ts              # Entry point
│   ├── platform.ts           # Platform plugin
│   ├── camera.ts             # Camera accessory
│   ├── streamingDelegate.ts  # Video streaming
│   └── settings.ts           # Types and config
├── dist/                     # Compiled JavaScript (generated)
├── package.json              # npm package config
├── tsconfig.json             # TypeScript compiler config
├── config.schema.json        # Homebridge UI config schema
└── README.md                 # Documentation

```

## API Integration

### Authentication
- POST `https://api.nanit.com/login`
  - Headers: `nanit-api-version: 1`
  - Body: `{"email":"...","password":"...","mfa_code":"..."}`
  - Returns: `access_token` (JWT, 60 min expiry) + `refresh_token`
  - Handles 482 status for MFA requirement

- POST `https://api.nanit.com/tokens/refresh`
  - Body: `{"refresh_token":"..."}`
  - Returns: New `access_token` + `refresh_token`
  - Refresh tokens stored in Homebridge persistent storage

### Camera Discovery
- GET `https://api.nanit.com/babies`
  - Headers: `Authorization: {access_token}` (no "Bearer" prefix)
  - Returns: Array of babies with camera info (uid, name, camera details)

### Video Streaming
- RTMPS URL: `rtmps://media-secured.nanit.com/nanit/{baby_uid}.{access_token}`
- Token embedded in URL, regenerated on each stream request
- ffmpeg transcodes to HomeKit-compatible format

## Build & Install

### Build
```bash
cd ~/Projects/homebridge-nanit
npm install
npm run build
```

### Install to Homebridge
```bash
# Global install (requires Homebridge installed)
sudo npm install -g ~/Projects/homebridge-nanit/

# Or symlink for development
npm link
```

### Configuration Example
Add to Homebridge `config.json`:
```json
{
  "platforms": [
    {
      "platform": "NanitCamera",
      "email": "michael.wong@aya.yale.edu",
      "password": "Abcd1234!",
      "refreshInterval": 300
    }
  ]
}
```

## Testing Credentials

Located in `~/.openclaw/credentials/nanit.json`:
- Two cameras: Daphne (417fc18e) and Zachary (96c50f0c)
- Credentials: michael.wong@aya.yale.edu / Abcd1234!

## What Was NOT Implemented (per requirements)

- ❌ WebSocket/protobuf streaming (too complex for v1)
- ❌ Two-way audio (complex)
- ❌ Local streaming via private_address (requires protobuf + TLS handling)

## Dependencies

**Runtime:**
- `node-fetch@^2.7.0` - HTTP requests to Nanit API

**Dev:**
- `typescript@^5.3.0` - TypeScript compiler
- `homebridge@^1.8.0` - Homebridge types (dev dependency)
- `@types/node@^20.11.0` - Node.js types
- `@types/node-fetch@^2.6.11` - node-fetch types

**External:**
- `ffmpeg` - Required for video streaming (must be on PATH)

## Code Quality

- ✅ TypeScript with strict mode enabled
- ✅ Proper error handling
- ✅ Logging at appropriate levels (info, debug, error)
- ✅ No hardcoded credentials
- ✅ Clean separation of concerns
- ✅ Follows Homebridge plugin patterns

## Next Steps (Not Done Yet)

1. Install Homebridge if not present
2. Configure the plugin in Homebridge config.json
3. Test live streaming with ffmpeg
4. Test temperature/humidity sensors if available
5. Test MFA flow
6. Test token refresh after 50 minutes
7. Test multiple cameras simultaneously

## Notes

- Homebridge is not currently installed on this machine
- Plugin compiles successfully with no errors
- Ready for installation and testing when Homebridge is available
- All source files are clean and well-documented
