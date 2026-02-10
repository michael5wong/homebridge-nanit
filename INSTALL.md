# Installation Guide for homebridge-nanit

## Prerequisites

1. **Homebridge** must be installed (v1.6.0 or higher)
2. **Node.js** v18.17.0+ / v20.9.0+ / v22.0.0+
3. **ffmpeg** - Required for video streaming
   ```bash
   # macOS
   brew install ffmpeg
   
   # Ubuntu/Debian
   sudo apt-get install ffmpeg
   
   # Verify installation
   ffmpeg -version
   ```

## Installation Methods

### Method 1: Global Install (Recommended for Production)

```bash
sudo npm install -g ~/Projects/homebridge-nanit/
```

This installs the plugin globally so Homebridge can discover it.

### Method 2: Development Link (For Testing)

```bash
cd ~/Projects/homebridge-nanit
npm link
```

This creates a symlink to the local development directory.

## Configuration

### Step 1: Add Platform to Homebridge Config

Edit your Homebridge config (usually at `~/.homebridge/config.json`):

```json
{
  "platforms": [
    {
      "platform": "NanitCamera",
      "email": "your-nanit-email@example.com",
      "password": "your-nanit-password",
      "refreshInterval": 300
    }
  ]
}
```

### Step 2: Configure MFA (If Enabled)

If your Nanit account has MFA enabled:

1. Start Homebridge - it will fail and log an MFA request
2. Add `"mfa_code": "your-6-digit-code"` to the config
3. Restart Homebridge
4. After successful authentication, remove the `mfa_code` line

The plugin will store a refresh token and won't require MFA on subsequent restarts.

### Configuration Options

| Option | Required | Default | Description |
|--------|----------|---------|-------------|
| `platform` | Yes | `"NanitCamera"` | Must be "NanitCamera" |
| `email` | Yes | - | Your Nanit account email |
| `password` | Yes | - | Your Nanit account password |
| `mfa_code` | No | - | MFA code (only for initial setup) |
| `refreshInterval` | No | `300` | How often to refresh cameras (seconds) |

## Verification

### Check Plugin is Installed

```bash
# List installed Homebridge plugins
npm list -g homebridge-nanit

# Or check Homebridge logs
tail -f ~/.homebridge/homebridge.log
```

Look for log lines like:
```
[Nanit] Initializing Nanit platform
[Nanit] Logging in to Nanit
[Nanit] Successfully authenticated with Nanit
[Nanit] Found 2 camera(s)
[Nanit] Adding new camera: Daphne
[Nanit] Adding new camera: Zachary
```

### Test Camera Discovery

After starting Homebridge:
1. Open the Home app on iOS
2. Look for new camera accessories
3. Tap to view live stream

## Troubleshooting

### "Email and password are required in config"
- Check that `email` and `password` are in your `config.json`
- Make sure they're inside the platform object

### "MFA required"
- Add `"mfa_code": "123456"` to your config
- Get the code from your authenticator app
- Restart Homebridge

### "FFmpeg not found"
- Install ffmpeg: `brew install ffmpeg`
- Make sure ffmpeg is on PATH: `which ffmpeg`

### "Authentication failed"
- Check your email/password are correct
- Try logging in to the Nanit app to verify credentials
- Check for typos in the config

### Camera doesn't stream
- Check ffmpeg is installed and on PATH
- Check Homebridge logs for ffmpeg errors
- Try viewing the stream URL manually:
  ```bash
  ffmpeg -i "rtmps://media-secured.nanit.com/nanit/{baby_uid}.{token}" -frames:v 1 test.jpg
  ```

### Token refresh fails
- The plugin will automatically re-authenticate
- Check Homebridge logs for authentication errors
- Try removing the stored token and restarting

## Uninstall

```bash
# Global install
sudo npm uninstall -g homebridge-nanit

# Development link
npm unlink homebridge-nanit
```

Then remove the platform configuration from `config.json`.

## Support

For issues, check:
1. Homebridge logs: `~/.homebridge/homebridge.log`
2. System logs if running as a service
3. GitHub issues (if repository is public)

## Testing Credentials

For Michael Wong's setup:
- Email: michael.wong@aya.yale.edu
- Password: Abcd1234!
- Two cameras: Daphne (417fc18e), Zachary (96c50f0c)
