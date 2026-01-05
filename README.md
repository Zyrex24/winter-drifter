# Winter Drifter

A minimal HTML5 Canvas game with floaty physics and aesthetic UI.

## Overview

Players control a character drifting upward through a storm, avoiding clouds and collecting lights. Features include:
- Single-file game logic (HTML/JS/CSS).
- Custom physics engine for drift movement.
- Procedural particle systems for snow and environment.
- Serverless leaderboard backend using Vercel KV.

## Stack

- **Frontend**: Vanilla JavaScript, HTML5 Canvas.
- **Backend**: Vercel Serverless Functions (Node.js).
- **Database**: Vercel KV (Redis).

## Deployment

Hosted on Vercel.

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Local Development**
   Open `public/index.html` in a browser for the frontend.
   For backend functionality, use `vercel dev`.

3. **Production**
   Deploy via Vercel CLI:
   ```bash
   vercel --prod
   ```

   **Environment Variables Required:**
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`

## License

MIT

