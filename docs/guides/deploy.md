# Deploy

The site builds to static files in `dist/`. Any static host can serve them. Forms post to a separate Worker, `augur-forms`; see [Forms Worker](#forms-worker-augur-forms). Configuration facts are in [wrangler.jsonc](../../wrangler.jsonc) and [astro.config.mjs](../../astro.config.mjs); production decisions still open are in [open decisions](../records/open-decisions.md#deployment).

## Build

1. `npm ci`
2. `npm run build`: writes the output to `dist/`. Set `PUBLIC_FORMS_URL` to the `augur-forms` origin (for example `PUBLIC_FORMS_URL=https://augur-forms.<account-subdomain>.workers.dev npm run build`). Without it the build passes but the newsletter form stays offline: it sends nothing and says so.
3. `npm run preview`: builds and serves the output locally.

## Deploy to Cloudflare Workers

Worker name: `augur-website-next` (from `wrangler.jsonc`).

1. In the Cloudflare dashboard, connect the Worker to this repository through the Git integration.
2. Set the production branch to `main`.
3. Set the preview build command to `npx wrangler preview`.
4. Set the deploy command to `npx wrangler deploy`.

Other branches and pull requests then get preview builds.

To deploy from a local machine, run `npm run deploy`. It requires Cloudflare access.

Keep `session: false` in `astro.config.mjs`; the comment there says why.

## Forms Worker (`augur-forms`)

[workers/forms](../../workers/forms/) is a separate Worker with its own `package.json` and [wrangler.jsonc](../../workers/forms/wrangler.jsonc). It serves `POST /subscribe` for the newsletter form and stores addresses in the D1 database `augur-website-signups` (binding `SIGNUPS`). It needs no secrets. Run every command below in `workers/forms`; the package scripts pass `--config wrangler.jsonc`, because otherwise Wrangler also finds the site build's `.wrangler/deploy/config.json` and stops.

- Variables: `SITE_URL` (where no-JavaScript submits are redirected) and `ALLOWED_ORIGINS` (comma-separated origins allowed to post). Set both to wherever the site is served.
- Rate limit: `SUBSCRIBE_RATE_LIMITER`, `namespace_id` `1001`, 5 per 60 seconds per IP. Change the id if another Worker on the account already uses it.

First deploy:

1. `npm ci`
2. `npx wrangler d1 create augur-website-signups --config wrangler.jsonc`
3. Put the returned `database_id` in `wrangler.jsonc`, replacing `REPLACE_WITH_ID_FROM_WRANGLER_D1_CREATE`.
4. `npm run db:migrate`: creates the `signups` table in the remote database.
5. `npm run deploy`: publishes `augur-forms` on `workers.dev` and prints its URL.
6. Build the site with `PUBLIC_FORMS_URL` set to that URL, and deploy the site.

Local development: `npm run db:migrate:local` once, then `npm run dev` (port 8788, allowing `http://localhost:4321`). Start the site with `npm run dev` in the site folder; in development the form posts to `http://localhost:8788` unless `PUBLIC_FORMS_URL` says otherwise.

Export the list for import into a newsletter service:

- `npx wrangler d1 export augur-website-signups --config wrangler.jsonc --remote --table signups --output signups.sql`
- or JSON: `npx wrangler d1 execute augur-website-signups --config wrangler.jsonc --remote --json --command "SELECT email, created_at, consent_version FROM signups"`

Remove an address on request: `npx wrangler d1 execute augur-website-signups --config wrangler.jsonc --remote --command "DELETE FROM signups WHERE email = 'name@example.com'"`. Addresses are stored in lowercase.
