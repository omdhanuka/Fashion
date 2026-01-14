# Frontend (React + Vite) — Fashion eCommerce Admin

This document covers setup, environment variables, running, and deploying the frontend admin UI.

## Prerequisites

- Node.js 18+ and npm
- Firebase project with a Web app (for Authentication)
- Backend API running (by default at `http://localhost:5000/api`)

## Files

- `src/config/firebase.config.ts` — Firebase client initialization
- `.env` (root) — Frontend environment variables (see example in `.env.example`)

## Required environment variables

Create or update the root `.env` file with the following variables:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...

VITE_API_URL=http://localhost:5000/api
VITE_ADMIN_EMAILS=admin@example.com
```

- `VITE_ADMIN_EMAILS` should contain one or more comma-separated admin emails allowed to access the admin UI.

## Local development

Install dependencies (project root):

```bash
npm install
```

Start frontend dev server:

```bash
npm run dev
```

Open the app at the URL printed by Vite (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview   # optional: preview built files locally
```

## Firebase setup notes

1. In Firebase Console, create or open your project.
2. Add a Web app (</>) and copy the config values into `.env` (VITE_FIREBASE_* variables).
3. In Authentication → Sign-in method, enable Email/Password.
4. Optionally create an admin user under Authentication → Users. Add that user's email to `VITE_ADMIN_EMAILS`.

## Admin login flow

- The admin UI uses Firebase client auth to sign in. After sign-in, the frontend attaches the Firebase ID token to API requests (`Authorization: Bearer <token>`).
- The backend verifies the token and checks the email against the backend `ADMIN_EMAIL` (backend `.env`) for admin-only routes. Ensure both frontend `VITE_ADMIN_EMAILS` and backend `ADMIN_EMAIL` contain the admin email(s).

## Deploying to Vercel / Netlify

1. Add build command: `npm run build` and publish directory: `dist`.
2. Add environment variables in the host (use the same `VITE_*` keys as in `.env`).
3. Ensure `VITE_API_URL` points to your deployed backend.

## Common issues

- 403 Forbidden on `/api/admin/*` routes:
  - Ensure the signed-in user's email is listed in both frontend `VITE_ADMIN_EMAILS` and backend `ADMIN_EMAIL`.
  - Ensure the backend is running and reachable at `VITE_API_URL`.
- `Failed to resolve import "../config/firebase.config"`:
  - Use the correct relative path: `../../config/firebase.config` from pages under `src/pages/admin/`.
- Environment changes require restarting the dev server.

## Quick checklist

- [ ] `.env` populated with Firebase values
- [ ] `VITE_ADMIN_EMAILS` set
- [ ] Backend running on `VITE_API_URL`
- [ ] Firebase Email/Password auth enabled

If you want, I can also add a small `README` inside `src/pages/admin/` with admin-specific notes or create a `docs/` folder for deployment scripts. Would you like that?
