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

Nanit uses MFA (multi-factor authentication), so you can't just put your password in the config. Instead, run the included auth helper **once** to get a refresh token:

```bash
npx nanit-auth
```

This will:
1. Ask for your Nanit email and password
2. Send an MFA code to your phone via SMS
3. Output a `refreshToken` to add to your config

**⚠️ Important:** The plugin uses *only* the refresh token for authentication. It will **never** attempt password login automatically — this prevents MFA SMS spam if the token expires during Homebridge restart loops.

### 2. Configure the Plugin

Add this to your Homebridge `config.json` under `platforms`:

```json
{
    "platform": "NanitCamera",
    "email": "your@email.com",
    "refreshToken": "your-refresh-token-from-step-1"
}
```

That's it. No password needed in the config.

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

1. **Authentication**: Uses Nanit's REST API with refresh token (auto-rotates on each use)
2. **Camera Discovery**: Queries the `/babies` API endpoint to find cameras
3. **Cloud Streaming**: Connects to `rtmps://media-secured.nanit.com` with auth token
4. **Local Streaming**: 
   - Starts a local RTMP server on the Homebridge host
   - Connects to the camera via WebSocket (signaling)
   - Camera pushes RTMP stream directly to Homebridge
   - ffmpeg transcodes to HomeKit-compatible SRTP

## Token Lifecycle & Restarts

Nanit refresh tokens are **single-use** — each time the plugin refreshes its access token, it gets a new refresh token back and stores it automatically. This means:

- ✅ **Normal operation**: Token auto-refreshes every 50 minutes. No action needed.
- ✅ **Clean restart**: The plugin saves the latest token to Homebridge storage. On restart, it picks up where it left off.
- ⚠️ **Token expired** (e.g., long downtime, unclean shutdown): The plugin will log an error and **stop gracefully** — it will NOT spam you with MFA texts. After 3 consecutive failures, it activates a circuit breaker and stops retrying entirely.

### If your token expires:

1. Run `npx nanit-auth` on your machine (you'll get one MFA SMS)
2. Copy the new `refreshToken` into your Homebridge config
3. Restart Homebridge

## Troubleshooting

### "Authentication disabled (circuit breaker)" in logs
The plugin failed to authenticate 3 times and stopped trying. Run `npx nanit-auth` to get a fresh refresh token, update your config, and restart Homebridge.

### "Refresh token invalid, password login disabled" in logs
Your stored refresh token is expired or was rotated. Same fix: `npx nanit-auth` → update config → restart.

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
