-- One row per address that asked for updates through the site. No IP, user agent or
-- tracking data; nothing is mailed from here, so this is the list to import later.
CREATE TABLE IF NOT EXISTS signups (
  email TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  consent_version TEXT NOT NULL,
  source TEXT NOT NULL
);
