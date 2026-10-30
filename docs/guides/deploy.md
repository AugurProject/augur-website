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

What the Worker serves (headers, redirects, the 404 page, metadata, analytics and the supply endpoints) is in [hosting reference](../reference/hosting.md).

## Check a deployment

`npm run check:launch -- <baseURL>` (or `node scripts/check-launch.mjs <baseURL> [referenceURL]`) requests the served site and prints a pass/fail table: every URL in the old augur.net sitemap, `/mission/` and `/team/` redirects, the supply endpoints byte for byte against the reference (default `https://www.augur.net`, fetched in the same run), `/api/supply/total` redirecting, the dropped `/data/` files returning 404, the 404 page, the security headers, canonical and share tags, the GA snippet, `robots.txt`, the sitemap, `/rss.xml`, `/og-image.png`, trailing-slash redirects and caching. It exits 1 if any row fails.

- Locally: `npm run build`, then `npx wrangler dev`, then run the check against the printed `http://localhost:<port>`.
- `WARN` on `meta.json` means the supply and token match but `generatedAt` and `blockNumber` differ, because the old site regenerates it hourly. It does not fail the run.
- The `X-Robots-Tag` row is checked only against a `*.workers.dev` host (expects `noindex`) or `www.augur.net` (expects none). The apex row is checked only against `https://www.augur.net`.

## Cut over to www.augur.net

1. Deploy `main` and run `npm run check:launch -- https://augur-website-next.<account-subdomain>.workers.dev` while the old site still serves www.augur.net. No row may fail; this is the run that compares the supply endpoints with the old site. The `X-Robots-Tag` row confirms that the host-scoped `noindex` in `public/_headers` works on Cloudflare; it has only been checked under `wrangler dev`. If it fails, the canonical tags still point every page at www.augur.net.
2. Attach `www.augur.net` to the Worker as its custom domain, and redirect the apex `augur.net` to `https://www.augur.net/` permanently.
3. Check Cloudflare's managed robots.txt for the zone (AI Crawl Control). If it is on, Cloudflare can add to or replace [robots.txt](../../public/robots.txt); compare `curl https://www.augur.net/robots.txt` with the file.
4. Run `npm run check:launch -- https://www.augur.net`. The supply rows now compare the site with itself, so step 1 is the real comparison; this run adds the apex redirect.
5. Stop the old site's hourly workflow and GitHub Pages deploy in `AugurProject/augur-reboot-website`; the supply files here no longer follow it.
6. In GA4 Realtime for `G-4VLMY3QMC9`, confirm that page views arrive from www.augur.net.
7. Before switching the CSP from `Content-Security-Policy-Report-Only` to `Content-Security-Policy`, open the main pages and the forms and check the browser console for CSP reports. Once `PUBLIC_FORMS_URL` is set, replace `https://*.workers.dev` in `connect-src` and `form-action` with that origin.

`Strict-Transport-Security` is `max-age=86400` without `preload`; raise it only by owner decision.

## Refresh the REP supply snapshot

The supply files are static (see [hosting reference](../reference/hosting.md#rep-supply-endpoints)). To update them by hand:

1. From the repository root, read `totalSupply()` five blocks behind the tip and write the three files in the old format:

   ```sh
   node --input-type=module <<'EOF'
   import { writeFileSync } from 'node:fs';
   const rpc = 'https://ethereum-rpc.publicnode.com';
   const token = '0xCf6A0A7826fa124B7705d6f3c675eAD76f1e540D';
   const call = async (method, params) => (await (await fetch(rpc, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }) })).json()).result;
   const block = Number(await call('eth_blockNumber', [])) - 5;
   const wei = BigInt(await call('eth_call', [{ to: token, data: '0x18160ddd' }, `0x${block.toString(16)}`]));
   const fraction = (wei % 10n ** 18n).toString().padStart(18, '0').replace(/0+$/, '');
   const supply = `${wei / 10n ** 18n}${fraction ? `.${fraction}` : ''}`;
   for (const field of ['total', 'circulating']) writeFileSync(`public/api/supply/${field}/index.html`, supply);
   const meta = { generatedAt: new Date().toISOString(), blockNumber: block, note: 'Circulating equals total: no locked, reserved, or treasury allocations.', token: { address: token, symbol: 'REPv2_Yes_1', role: 'Current REP, the token of the winning/canonical child universe of the Moon Fork.', totalSupplyWei: wei.toString(), totalSupply: supply, circulatingSupply: supply } };
   writeFileSync('public/api/supply/meta.json', `${JSON.stringify(meta, null, '\t')}\n`);
   console.log(`${supply} REP at block ${block}`);
   EOF
   ```

2. `git diff public/api/supply`: the total and circulating files hold the same bare decimal, with no trailing newline, and the value is below the 11,000,000 REP genesis supply.
3. Update the snapshot date, block and value in [hosting reference](../reference/hosting.md#rep-supply-endpoints), commit and deploy.
4. Check `curl -i https://www.augur.net/api/supply/total/`.

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
