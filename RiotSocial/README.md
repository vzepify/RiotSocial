# RiotSocial

A Riot-style social dashboard designed to run with a GitHub Pages frontend and a separate backend.

## Project structure

- `website/` — static GitHub Pages frontend
- `backend/` — Node.js/Express backend
- `backend/.env.example` — server configuration template

## Important

The project intentionally does **not** collect Riot passwords, cookies, or session tokens. The Riot login flow should use Riot's approved authentication mechanism once your application has the required access.

## Local frontend

You can open `website/index.html` directly for the UI prototype, or serve it with any static server.

## Backend

```bash
cd backend
npm install
npm start
```

Copy `.env.example` to `.env` and fill in values when your approved Riot authentication configuration is available.

## GitHub Pages

The contents of `website/` can be published as the GitHub Pages site.

The backend must be hosted separately because GitHub Pages is static hosting.
