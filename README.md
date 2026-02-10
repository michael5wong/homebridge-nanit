# Homebridge Nanit

[![npm](https://img.shields.io/npm/v/homebridge-nanit)](https://www.npmjs.com/package/homebridge-nanit)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A [Homebridge](https://homebridge.io) plugin that exposes [Nanit](https://www.nanit.com) baby monitors as HomeKit cameras with live streaming, temperature, and humidity sensors.

## Features

- 📹 **Live video streaming** via HomeKit (Home app, Control Center)
- 🌡️ **Temperature sensor** — ambient room temperature from the Nanit
- 💧 **Humidity sensor** — ambient humidity from the Nanit
- 🏠 **Local streaming** — stream directly from camera over LAN (lower latency)
- ☁️ **Cloud streaming** — fallback via Nanit's RTMPS servers
- 🔄 **Auto mode** — tries local first, falls back to cloud
- 🔐 **Token auto-refresh** — handles Nanit's rotating refresh tokens

## Requirements

- Homebridge 1.6+ or 2.0+
- Node.js 18+
- Nanit camera (Gen 2+ recommended)
- `ffmpeg` installed on your Homebridge host

## Installation

### Via Homebridge UI

Search for `homebridge-nanit` in the Homebridge plugin search.

### Via CLI

```bash
sudo npm install -g homebridge-nanit
```

## Setup

### 1. Get Your Refresh Token

Nanit requires MFA (multi-factor authentication). Run the included auth helper to get a refresh token:

```bash
npx nanit-auth
```

This will:
1. Ask for your Nanit email and password
2. Send an MFA code to your phone
3. Output a `refreshToken` to add to your config

### 2. Configure the Plugin

Add this to your Homebridge `config.json` under `platforms`:

**Recommended (refresh token only):**
```json
{
    "platform": "NanitCamera",
    "email": "your@email.com",
    "refreshToken": "your-refresh-token-from-step-1"
}
```

**Alternative (with password as backup):**
```json
{
    "platform": "NanitCamera",
    "email": "your@email.com",
    "refreshToken": "your-refresh-token-from-step-1",
    "password": "your-nanit-password"
}
```

### Optional Settings

```json
{
    "platform": "NanitCamera",
    "email": "your@email.com",
    "refreshToken": "your-refresh-token",
    "streamMode": "auto",
    "localRtmpPort": 1935,
    "localAddress": "192.168.1.100"
}
```

| Setting | Default | Description |
|---------|---------|-------------|
| `streamMode` | `"cloud"` | `"cloud"`, `"local"`, or `"auto"` (tries local first) |
| `localRtmpPort` | `1935` | Base RTMP port for local streaming (each camera gets its own port starting here) |
| `localAddress` | Auto-detect | Optional: Override the automatically detected host IP for local streaming |

## Streaming Modes

### Cloud (default)
Streams via Nanit's RTMPS servers. Works everywhere, slightly higher latency.

### Local
Streams directly from the camera over your LAN via WebSocket signaling + RTMP. Lower latency, but requires the camera and Homebridge to be on the same network.

### Auto (recommended)
Tries local streaming first. If the camera's local IP isn't available, falls back to cloud.

## How It Works

1. **Authentication**: Uses Nanit's REST API with email/password + refresh token (handles MFA)
2. **Camera Discovery**: Queries the `/babies` API endpoint to find cameras
3. **Cloud Streaming**: Connects to `rtmps://media-secured.nanit.com` with auth token
4. **Local Streaming**: 
   - Starts a local RTMP server on the Homebridge host
   - Connects to the camera via WebSocket (signaling)
   - Camera pushes RTMP stream directly to Homebridge
   - ffmpeg transcodes to HomeKit-compatible SRTP

## Troubleshooting

### "MFA required" on startup
Run `npx nanit-auth` to get a fresh refresh token and update your config.

### Camera shows but no video
- Check that `ffmpeg` is installed: `ffmpeg -version`
- Check Homebridge logs for ffmpeg errors
- Try `"streamMode": "cloud"` if local streaming has issues

### "USER_LOGGED_OUT" in logs
Your refresh token has expired. Run `npx nanit-auth` again to get a new one.

### Local streaming not working
- Ensure camera and Homebridge are on the same network/subnet
- Check that the RTMP port (default 1935) isn't blocked by a firewall
- Port 442 (camera WebSocket) must be reachable from Homebridge

## Credits

- Protocol reference: [gregory-m/nanit](https://github.com/gregory-m/nanit) (Go implementation)
- Built with [Homebridge](https://homebridge.io)

## License

MIT
