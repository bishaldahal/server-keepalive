# Server Keepalive

A professional Node.js/Express server designed to keep APIs alive by periodically pinging internal and external endpoints. It features a `/api/developer` endpoint that returns sarcastic developer messages to mimic human-like activity, helping bypass AI verification. If external APIs are down, it sends push notifications via Expo.

## Features
- **Internal API**: `/api/developer` returns one of 20 sarcastic developer messages.
- **Cron Jobs**: Periodically pings internal and external APIs (every 5 minutes by default).
- **External API Monitoring**: Checks the status of external APIs and logs their availability.
- **Push Notifications**: Sends Expo push notifications when external APIs are down.
- **Environment Variables**: Configurable via `.env` for secure and flexible deployment.

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo account for push notifications
- A publicly accessible domain for the server

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/bishaldahal/server-keepalive.git
   cd server-keepalive
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your configuration:
   - `PORT`: Server port (e.g., `3000`)
   - `HOSTED_DOMAIN`: Public server URL (e.g., `https://your-domain.com`)
   - `EXTERNAL_APIS`: Comma-separated list of external API URLs
   - `PUSH_TOKENS`: Comma-separated list of Expo push tokens

4. Run the server:
   ```bash
   npm start
   ```
   For development with auto-restart:
   ```bash
   npm run dev
   ```

## Configuration
Edit `.env` to configure:
- `PORT`: The port the server runs on.
- `HOSTED_DOMAIN`: The public URL of your server (must use HTTPS in production).
- `EXTERNAL_APIS`: List of external APIs to monitor (e.g., `https://api1.com,https://api2.com`).
- `PUSH_TOKENS`: Expo push tokens for notifications (e.g., `ExponentPushToken[xxxx]`).

**Note**: Do not commit `.env` to version control. Use `.env.example` as a template.

## API Endpoints
- **GET /api/developer**: Returns a random sarcastic message related to software development.

## Deployment
Deploy to a platform like Render, Heroku, or AWS:
1. Set environment variables in the platform’s dashboard.
2. Ensure `HOSTED_DOMAIN` matches the deployed URL.
3. Verify HTTPS is enabled.
4. Test the `/api/developer` endpoint and cron jobs.

## Security
- **Authentication**: Consider adding API key authentication to `/api/developer` for public deployments.
- **Environment Variables**: Store sensitive data in `.env` and exclude it from version control.
- **HTTPS**: Use HTTPS for `HOSTED_DOMAIN` to ensure secure communication.

## Testing
- **Local Testing**: Use `curl https://your-domain.com/api/developer` or ngrok for local development.
- **Push Notifications**: Test with Expo’s push notification tool (https://expo.dev/notifications).
- **Cron Jobs**: Check server logs to verify internal and external API pings.

## Contributing
Contributions are welcome! Please open an issue or pull request on GitHub.

## License
MIT License