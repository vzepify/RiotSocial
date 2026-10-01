import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || "http://localhost:5500",
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || "change-this-secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax"
  }
}));

app.get("/", (_req, res) => {
  res.json({
    name: "RiotSocial API",
    status: "online",
    authConfigured: Boolean(process.env.RIOT_CLIENT_ID)
  });
});

/*
 * This route is intentionally a placeholder.
 *
 * Once Riot has approved the application's authentication access,
 * this route should construct the official Riot authorization URL
 * using the exact parameters documented for your approved client.
 */
app.get("/auth/riot", (_req, res) => {
  if (!process.env.RIOT_CLIENT_ID) {
    return res.status(501).json({
      error: "riot_auth_not_configured",
      message: "Configure the approved Riot authentication client before enabling login."
    });
  }

  res.status(501).json({
    error: "riot_auth_implementation_pending",
    message: "The secure Riot OAuth flow should be added here using Riot's approved documentation."
  });
});

app.get("/api/me", (req, res) => {
  if (!req.session.account) {
    return res.status(401).json({ authenticated: false });
  }

  res.json({
    authenticated: true,
    account: req.session.account
  });
});

app.post("/auth/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
});

app.listen(port, () => {
  console.log(`RiotSocial API listening on http://localhost:${port}`);
});
