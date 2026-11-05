# Homebridge Nanit

[![npm](https://img.shields.io/npm/v/homebridge-nanit)](https://www.npmjs.com/package/homebridge-nanit)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A [Homebridge](https://homebridge.io) plugin that exposes [Nanit](https://www.nanit.com) baby monitors as HomeKit cameras with live streaming, temperature, and humidity sensors.

## Features

- 📹 **Live video streaming** via HomeKit (Home app, Control Center)
- 🌡️ **Temperature sensor** — ambient room temperature from the Nanit
- 💧 **Humidity sensor** — ambient humidity from the Nanit
- 🏠 **Local streaming** — the camera streams straight to Homebridge over your LAN
- ☁️ **Cloud streaming** — via Nanit's RTMPS servers
- 🔄 **Auto mode** (default) — tries local first, falls back to cloud
- 🔐 **Token auto-refresh** — handles Nanit's rotating refresh tokens

## Requirements

- Homebridge 1.6+ or 2.0+
- Node.js 18.17+
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
| `streamMode` | `"auto"` | `"auto"` (local, falling back to cloud), `"local"`, or `"cloud"` |
| `localRtmpPort` | `1935` | Port of the RTMP server cameras publish to in local/auto mode (shared by all cameras) |
| `localAddress` | Auto-detect | Host IP cameras should publish to. Set this if Homebridge has several network interfaces |
| `refreshInterval` | `300` | Seconds between camera list / sensor refreshes |

## Streaming Modes

### Auto (default, recommended)
Tries local streaming first. If the camera doesn't start publishing within ~12 seconds, falls back to cloud.

### Local
The camera pushes its RTMP stream straight to Homebridge over your LAN. Lower latency, but the camera must be able to reach Homebridge on `localRtmpPort`.

### Cloud
Streams via Nanit's RTMPS servers. Works everywhere, slightly higher latency.

## How It Works

1. **Authentication**: Uses Nanit's REST API with refresh token (auto-rotates on each use)
2. **Camera Discovery**: Queries the `/babies` API endpoint to find cameras
3. **Cloud Streaming**: Connects to `rtmps://media-secured.nanit.com` with auth token
4. **Local Streaming**:
   - Starts a local RTMP server on the Homebridge host (once, shared by all cameras)
   - Asks the camera, over Nanit's cloud signaling WebSocket, to publish to it under a random stream key
   - The camera pushes RTMP directly to Homebridge over the LAN; concurrent viewers share one feed
   - ffmpeg transcodes to HomeKit-compatible SRTP

## Token Lifecycle & Restarts

Nanit refresh tokens are **single-use** — each time the plugin refreshes its access token, it gets a new refresh token back and stores it automatically. This means:

- ✅ **Normal operation**: Token auto-refreshes every 50 minutes. No action needed.
- ✅ **Restarts**: The plugin saves the latest token to `nanit/tokens.json` in the Homebridge storage directory and picks up where it left off.
- ✅ **Network outages**: If Nanit can't be reached, the plugin keeps retrying on the next refresh.
- ⚠️ **Token rejected** (e.g., revoked, or a rotated token was lost): The plugin logs an error and **never** falls back to password login, so you won't get MFA texts. After Nanit rejects the token 3 times in a row, it stops trying until Homebridge restarts.

### If your token expires:

1. Run `npx nanit-auth` on your machine (you'll get one MFA SMS)
2. Copy the new `refreshToken` into your Homebridge config
3. Restart Homebridge

## Troubleshooting

### "Nanit rejected the refresh token" in logs
Your refresh token is expired or was revoked. Run `npx nanit-auth` to get a fresh one, update your config, and restart Homebridge.

### Camera shows but no video
- Check that `ffmpeg` is installed: `ffmpeg -version`
- Check Homebridge logs for ffmpeg errors
- Try `"streamMode": "cloud"` if local streaming has issues

### "USER_LOGGED_OUT" in logs
Your refresh token has expired. Run `npx nanit-auth` again to get a new one.

### Local streaming not working
- Ensure camera and Homebridge are on the same network/subnet
- Check that the RTMP port (default 1935) on the Homebridge host isn't blocked by a firewall
- If Homebridge has several network interfaces (Docker, VPN), set `localAddress` to its LAN IP
- Look for "falling back to cloud" in the logs, which includes the reason

## Credits

- Protocol reference: [gregory-m/nanit](https://github.com/gregory-m/nanit) (Go implementation)
- Built with [Homebridge](https://homebridge.io)

## License

MIT
