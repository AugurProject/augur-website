# Deploy

The site builds to static files in `dist/`. Any static host can serve them. Forms post to a separate Worker, `augur-forms`; see [Forms Worker](#forms-worker-augur-forms). Configuration facts are in [wrangler.jsonc](../../wrangler.jsonc) and [astro.config.mjs](../../astro.config.mjs); production decisions still open are in [open decisions](../records/open-decisions.md#deployment).

## Build

1. `npm ci`
2. `npm run build`: writes the output to `dist/`. Set `PUBLIC_FORMS_URL` to the `augur-forms` origin (for example `PUBLIC_FORMS_URL=https://augur-forms.<account-subdomain>.workers.dev npm run build`). Without it the build passes but the newsletter and contact forms stay offline: they send nothing and say so.
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

[workers/forms](../../workers/forms/) is a separate Worker with its own `package.json` and [wrangler.jsonc](../../workers/forms/wrangler.jsonc). It serves `POST /subscribe` for the newsletter form, storing addresses in the D1 database `augur-website-signups` (binding `SIGNUPS`), and `POST /contact` for the contact page, which emails messages through Augur's Proton account (see [contact page](../reference/contact.md)). Its one secret is `PROTON_SMTP_TOKEN`. Run every command below in `workers/forms`; the package scripts pass `--config wrangler.jsonc`, because otherwise Wrangler also finds the site build's `.wrangler/deploy/config.json` and stops.

- Variables: `SITE_URL` (where no-JavaScript submits are redirected) and `ALLOWED_ORIGINS` (comma-separated origins allowed to post). Set both to wherever the site is served.
- Rate limits: `SUBSCRIBE_RATE_LIMITER`, `namespace_id` `1001`, 5 per 60 seconds per IP; `CONTACT_RATE_LIMITER`, `namespace_id` `1002`, 3 per 60 seconds per IP. Change an id if another Worker on the account already uses it.
- Contact mail variables: `MAIL_PROVIDER` (`proton`; `log` sends nothing and is refused when `ENVIRONMENT` is `production`), `ENVIRONMENT` (`production`), `PROTON_SMTP_USER` (the sending address, `contact-form@augur.net`) and `CONTACT_TO` (the inbox that receives messages, `contact@augur.net`).
- Secret: `PROTON_SMTP_TOKEN`, the SMTP token Proton issues for `PROTON_SMTP_USER`. Never put it in `wrangler.jsonc` or a committed file.

First deploy:

1. `npm ci`
2. `npx wrangler d1 create augur-website-signups --config wrangler.jsonc`
3. Put the returned `database_id` in `wrangler.jsonc`, replacing `REPLACE_WITH_ID_FROM_WRANGLER_D1_CREATE`.
4. `npm run db:migrate`: creates the `signups` table in the remote database.
5. In Proton (paid plan with the augur.net domain): create the address `contact-form@augur.net`, then generate an SMTP token for that address in Proton Mail's settings (Proton's [SMTP submission](https://proton.me/support/smtp-submission) help page has the steps).
6. `npx wrangler secret put PROTON_SMTP_TOKEN --config wrangler.jsonc`, and paste the token when asked. Without it every contact message gets the honest `unavailable` answer.
7. `npm run deploy`: publishes `augur-forms` on `workers.dev` and prints its URL.
8. Build the site with `PUBLIC_FORMS_URL` set to that URL, and deploy the site.

Local development: `npm run db:migrate:local` once, then `npm run dev` (port 8788, allowing `http://localhost:4321`). Start the site with `npm run dev` in the site folder; in development the forms post to `http://localhost:8788` unless `PUBLIC_FORMS_URL` says otherwise. `npm run dev` uses the `log` mail provider, so contact messages are accepted and nothing is sent. To send real mail locally, put a separate test address's token in `workers/forms/.dev.vars` as `PROTON_SMTP_TOKEN=…`, add `PROTON_SMTP_USER=` and `CONTACT_TO=` lines naming that test address and a test inbox, and run `npm run dev:proton`. Never use the production token or inbox for tests.

Export the list for import into a newsletter service:

- `npx wrangler d1 export augur-website-signups --config wrangler.jsonc --remote --table signups --output signups.sql`
- or JSON: `npx wrangler d1 execute augur-website-signups --config wrangler.jsonc --remote --json --command "SELECT email, created_at, consent_version FROM signups"`

Remove an address on request: `npx wrangler d1 execute augur-website-signups --config wrangler.jsonc --remote --command "DELETE FROM signups WHERE email = 'name@example.com'"`. Addresses are stored in lowercase.
