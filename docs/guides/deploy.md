# Deploy

The site builds to static files in `dist/`, with no adapter, and the same build deploys to two hosts from `main`: GitHub Pages, which serves www.augur.net once the [cutover](#cut-over-to-wwwaugurnet) is done, and the Cloudflare Worker `augur-website-next`, built by Workers Builds, which serves its workers.dev URL, pull request previews and a standby copy. Forms post to a separate Worker, `augur-forms`, deployed by hand; see [Forms Worker](#forms-worker-augur-forms). Configuration facts are in [wrangler.jsonc](../../wrangler.jsonc), [astro.config.mjs](../../astro.config.mjs) and [the Pages workflow](../../.github/workflows/pages.yml); what each host serves differently is in [hosting reference](../reference/hosting.md); deployment steps still open are in [open decisions](../records/open-decisions.md#deployment).

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

The Worker has no script: `wrangler.jsonc` points Workers static assets at `dist/`, which serves [\_headers](../../public/_headers) and [\_redirects](../../public/_redirects). A checkout that was built before the adapter was removed can hold a stale `.wrangler/deploy/config.json` that sends Wrangler to `dist/client/wrangler.json`; delete `.wrangler/deploy/` if `wrangler dev` or `wrangler deploy` says that file doesn't exist.

What the Worker serves (headers, redirects, the 404 page, metadata, analytics and the supply endpoints) is in [hosting reference](../reference/hosting.md).

## Deploy to GitHub Pages

[pages.yml](../../.github/workflows/pages.yml) runs on every push to `main`, every hour (at minute 17) and on demand. It runs `npm ci`, refreshes the REP supply endpoints with `npm run supply` (the job stops there if every RPC endpoint fails, so the last deploy stays live), runs `npm run build`, removes the Cloudflare-only `dist/_headers` and `dist/_redirects`, and deploys `dist/` with `actions/deploy-pages`.

One-time setup (repository admin):

1. Settings → Pages → Build and deployment → Source: **GitHub Actions**.
2. Optional: add an Actions secret `ETH_RPC_URL` (Settings → Secrets and variables → Actions) naming a mainnet RPC endpoint. Without it, `npm run supply` uses the public endpoints listed in [generate-supply.mjs](../../scripts/generate-supply.mjs).
3. Run the workflow once from the Actions tab. Until www.augur.net is this repository's custom domain, the deploy lives at `https://augurproject.github.io/augur-website/`, where pages load but their root-relative assets and links don't; nothing links there.

The site assumes it is served from the root of its host, so there is no base path setting.

### One deploy at a time

Every merge to `main` starts its own Workers Build, and the build that finishes last becomes the Worker's production, whatever its commit. Two merges close together can race: on 31 October 2026 PR #1's build finished after PR #2's and put the old site back on production ([verification](../records/verification.md#31-october-2026-production-after-the-deploy-race)). The Pages workflow doesn't race: its runs queue in one `concurrency` group, and each builds the commit it was started for.

1. Merge one pull request.
2. Wait until its Workers Build has deployed and its Pages run has finished.
3. Run `npm run check:launch -- https://www.augur.net` and `npm run check:launch -- https://augur-website-next.<account-subdomain>.workers.dev`. No row may fail.
4. Merge the next pull request.

If an older build has overwritten production:

1. In the Cloudflare dashboard, find the Worker version built from the latest `main` commit (Workers Builds lists each build's commit and version).
2. Deploy that version to 100% with `cf workers deployments create`; nothing is rebuilt. Or retry the latest `main` build in Workers Builds.
3. Run `npm run check:launch` against production again.

## Check a deployment

`npm run check:launch -- <baseURL>` (or `node scripts/check-launch.mjs <baseURL> [referenceURL]`) requests the served site and prints a pass/fail table: every URL in the old augur.net sitemap, `/mission/` and `/team/` redirects, the supply endpoints byte for byte against the reference (default `https://www.augur.net`, fetched in the same run), `/api/supply/total` redirecting, the dropped `/data/` files returning 404, the 404 page, the security headers, canonical and share tags, the GA snippet, `robots.txt`, the sitemap, `/rss.xml`, `/og-image.png`, trailing-slash redirects and caching. It exits 1 if any row fails.

- Locally: `npm run build`, then `npx wrangler dev`, then run the check against the printed `http://localhost:<port>`.
- The check detects a GitHub Pages host from its `Server: GitHub.com` header and prints which it found. On Pages, `/mission` and `/team` must reach the meta-refresh page Astro writes (a 301 to the trailing slash first is fine), the security header rows are `SKIP` because Pages sends no custom headers, and every `Cache-Control` row expects Pages' fixed `max-age=600`. The referrer `<meta>` row applies on both hosts.
- `WARN` on `meta.json` means the supply and token match but `generatedAt` and `blockNumber` differ, because the reference regenerates it hourly. It does not fail the run. A `FAIL` on the supply rows against the Cloudflare host means its committed snapshot is behind the reference; see [Refresh the REP supply snapshot](#refresh-the-rep-supply-snapshot).
- The `X-Robots-Tag` row is checked only against a `*.workers.dev` host (expects `noindex`) or `www.augur.net` (expects none). The apex row is checked only against `https://www.augur.net`.

## Cut over to www.augur.net

www.augur.net moves from `AugurProject/augur-reboot-website` (the old site) to this repository's GitHub Pages site (owner, 2 November 2026). DNS stays at Njalla and doesn't change: the apex `A` records already point at GitHub Pages, `www` is a `CNAME` to `augurproject.github.io`, and augur.net is a verified domain of the AugurProject organization. Mail records are untouched. Every step needs admin rights on both repositories.

Before, with the old site still live:

1. The [Pages workflow](#deploy-to-github-pages) has deployed `main` at least once, and `npm run check:launch -- https://augur-website-next.<account-subdomain>.workers.dev` passes (it serves the same build).
2. Pick a quiet hour. Between steps 3 and 4 www.augur.net serves GitHub's 404 page, and the certificate check in step 5 can add time.

Switch:

3. In `AugurProject/augur-reboot-website`: Settings → Pages → Custom domain → **Remove**. Then Actions → *Build and Deploy Augur Site with Fork Risk Monitoring* → **Disable workflow**, so its hourly run doesn't redeploy.
4. In `AugurProject/augur-website`: Settings → Pages → Custom domain: enter `www.augur.net` → **Save**. Wait for the DNS check to pass.
5. Tick **Enforce HTTPS** once GitHub allows it (it is greyed out until the certificate is issued).
6. Run `npm run check:launch -- https://www.augur.net`. No row may fail. It should report a GitHub Pages host and pass the apex row (GitHub redirects `augur.net` to `https://www.augur.net/`).

After:

7. Run *Deploy to GitHub Pages* once by hand so the supply endpoints are fresh, and check `curl -i https://www.augur.net/api/supply/total/`.
8. In GA4 Realtime for `G-4VLMY3QMC9`, confirm that page views arrive from www.augur.net.
9. Keep the old repository as it is for a week as the rollback, then archive it if nothing needs it.

Rollback: remove the custom domain from this repository, add `www.augur.net` back to `AugurProject/augur-reboot-website` and re-enable its workflow. The DNS never changed, so nothing else moves back.

On Pages the `public/_headers` headers, including `Strict-Transport-Security`, aren't sent; the Cloudflare host keeps them. HSTS is `max-age=86400` without `preload` there; raise it only by owner decision (open: see [open decisions](../records/open-decisions.md#analytics-and-headers)). Before switching the CSP from `Content-Security-Policy-Report-Only` to `Content-Security-Policy` on Cloudflare, open the main pages and the forms and check the browser console for CSP reports. Once `PUBLIC_FORMS_URL` is set, replace `https://*.workers.dev` in `connect-src` and `form-action` with that origin.

## Refresh the REP supply snapshot

On GitHub Pages the supply endpoints are regenerated hourly by the workflow (see [hosting reference](../reference/hosting.md#rep-supply-endpoints)). The committed files, which the Cloudflare host serves, change only when someone commits a refresh:

1. `npm run supply`: reads `totalSupply()` five blocks behind the tip and rewrites `public/api/supply/`. It refuses to write anything unless the on-chain symbol is `REPv2_Yes_1`, decimals are 18 and the supply is within (0, 11,000,000] REP. Set `ETH_RPC_URL` to try another endpoint first.
2. `git diff public/api/supply`: the total and circulating files hold the same bare decimal, with no trailing newline.
3. Commit and deploy.

## Forms Worker (`augur-forms`)

[workers/forms](../../workers/forms/) is a separate Worker with its own `package.json` and [wrangler.jsonc](../../workers/forms/wrangler.jsonc). It serves `POST /subscribe` for the newsletter form, storing addresses in the D1 database `augur-website-signups` (binding `SIGNUPS`), and `POST /contact` for the contact page, which emails messages through Augur's Proton account (see [contact page](../reference/contact.md)). Its one secret is `PROTON_SMTP_TOKEN`. Run every command below in `workers/forms`; the package scripts pass `--config wrangler.jsonc`, because otherwise Wrangler can find a `.wrangler/deploy/config.json` left in the site folder by an older build and stop.

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
