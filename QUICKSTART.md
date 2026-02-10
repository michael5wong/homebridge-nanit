# Quick Start Guide

## Prerequisites

1. **Homebridge** installed and running (v1.8.0+)
2. **Node.js** v18 or later
3. **FFmpeg** installed (`brew install ffmpeg` on macOS)

## Installation

### 1. Link the plugin to Homebridge

```bash
cd ~/Projects/homebridge-nanit
npm link
```

This makes the plugin available globally so Homebridge can find it.

### 2. Configure Homebridge

Edit your Homebridge `config.json` (usually at `~/.homebridge/config.json` or `/var/lib/homebridge/config.json`):

```json
{
  "bridge": {
    "name": "Homebridge",
    "username": "...",
    "port": 51826,
    "pin": "..."
  },
  "platforms": [
    {
      "platform": "NanitCamera",
      "email": "your-nanit-email@example.com",
      "password": "your-nanit-password",
      "rtmpPort": 1935,
      "debug": true
    }
  ]
}
```

**Important**: Use `"debug": true` for initial testing so you can see what's happening.

### 3. Restart Homebridge

```bash
# If using systemd (Linux):
sudo systemctl restart homebridge

# If using launchd (macOS):
brew services restart homebridge

# Or manually:
homebridge -D
```

### 4. Check Logs

Watch the Homebridge logs for:

```
[NanitCamera] Nanit Platform initializing...
[NanitCamera] RTMP server started successfully
[NanitCamera] Homebridge finished launching, discovering Nanit cameras...
[NanitCamera] Found X Nanit camera(s)
[NanitCamera] Adding new accessory: [Camera Name]
[NanitCamera] Camera WebSocket connected
```

### 5. Verify in Home App

1. Open Apple Home app on your iPhone/iPad
2. Look for your Nanit camera(s)
3. Tap on a camera to view live feed (may take a moment to connect)
4. Check temperature and humidity sensors

## Troubleshooting

### Plugin not loading
```bash
# Verify plugin is linked
npm list -g homebridge-nanit

# Check Homebridge recognizes the plugin
homebridge -P
```

### Authentication errors
- Verify email/password are correct in config.json
- If you have MFA enabled, add `"refreshToken": "..."` to config

### RTMP port already in use
Change `rtmpPort` in config to a different port (e.g., 1936):
```json
{
  "platform": "NanitCamera",
  "rtmpPort": 1936
}
```

### Camera not streaming
1. Check that Nanit camera and Homebridge are on the same network
2. Verify firewall isn't blocking the RTMP port
3. Check logs for WebSocket connection errors

### Enable debug logging
```json
{
  "platform": "NanitCamera",
  "debug": true
}
```

## Next Steps

Once basic functionality is confirmed:

1. Set `"debug": false` to reduce log verbosity
2. Consider publishing to npm: `npm publish` (after testing)
3. Report issues or contribute improvements

## Network Requirements

- Homebridge server must be reachable from Nanit camera on the RTMP port
- Both should be on the same LAN for best performance
- If using firewall, allow incoming connections on RTMP port (default: 1935)

## Example Working Config

```json
{
  "bridge": {
    "name": "Homebridge",
    "username": "CC:22:3D:E3:CE:30",
    "port": 51826,
    "pin": "031-45-154"
  },
  "platforms": [
    {
      "platform": "NanitCamera",
      "email": "parent@example.com",
      "password": "SecurePassword123!",
      "rtmpPort": 1935,
      "debug": true
    }
  ]
}
```

## Support

- Check `README.md` for detailed documentation
- Review `BUILD_SUMMARY.md` for technical details
- Enable debug logging and check Homebridge logs

---

**Ready to test?** Follow the steps above and report any issues!
