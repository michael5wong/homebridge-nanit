# homebridge-nanit

Homebridge plugin for Nanit baby monitors - exposes cameras and sensors to HomeKit.

## Features

- **Live video streaming** via RTMPS
- **Temperature sensor** (if available)
- **Humidity sensor** (if available)
- Automatic token refresh
- Multiple camera support

## Requirements

- **Homebridge** v1.6.0 or higher
- **ffmpeg** - Required for video streaming (install via `brew install ffmpeg` on macOS)
- Node.js v18.17.0 or higher

## Installation

```bash
sudo npm install -g homebridge-nanit
```

Or install from local directory:

```bash
sudo npm install -g ~/Projects/homebridge-nanit/
```

## Configuration

Add to your Homebridge `config.json`:

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

### Configuration Options

- **email** (required): Your Nanit account email
- **password** (required): Your Nanit account password
- **mfa_code** (optional): MFA code if your account has multi-factor authentication enabled (only needed for first setup)
- **refreshInterval** (optional): How often to refresh camera list and sensor data in seconds (default: 300)

### MFA Setup

If your Nanit account has MFA enabled:

1. On first run, the plugin will fail and log an MFA token
2. Add `"mfa_code": "your-code"` to your config
3. Restart Homebridge
4. After successful authentication, you can remove the MFA code from config

The plugin will store a refresh token and won't require MFA on subsequent restarts.

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch for changes
npm run watch

# Clean build artifacts
npm run clean
```

## API Details

This plugin uses the Nanit REST API:
- Authentication endpoint: `https://api.nanit.com/login`
- Babies/cameras endpoint: `https://api.nanit.com/babies`
- Streaming: RTMPS via `rtmps://media-secured.nanit.com/nanit/{baby_uid}.{access_token}`

## License

MIT
