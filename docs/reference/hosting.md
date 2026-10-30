# Hosting reference

How the `augur-website-next` Worker serves the build, the metadata every page carries, and the REP supply endpoints. Cutover and refresh steps are in [deploy](../guides/deploy.md#cut-over-to-wwwaugurnet).

## Serving

- Every page is prerendered, so the build's Worker config, `dist/client/wrangler.json`, has no Worker script, and under `wrangler dev` Workers static assets answer every request: [\_headers](../../public/_headers) and [\_redirects](../../public/_redirects) apply to every response, including redirects and the 404 page.
- Deployed versions can differ. The Workers Builds preview build (`npx wrangler preview`, checked 30 October 2026) carries Astro's Worker script. Pages, redirects and the 404 page for browser navigations still come from static assets, but a non-navigation request for an unknown path (curl, a crawler's asset fetch) reaches the Worker, which answers a plain `404 Not found` without the `_headers` headers. Run `npm run check:launch` against the production workers.dev URL after merge to see which case production is in.
- Unknown paths get [404.astro](../../src/pages/404.astro), built to `dist/client/404.html`, with status 404 (`assets.not_found_handling: "404-page"` in [wrangler.jsonc](../../wrangler.jsonc)).
- `/mission` and `/team`, with or without the trailing slash, redirect 301 to `/about/` (`public/_redirects`).
- Trailing slashes: Workers static assets answer `/about` with a temporary 307. At build, [astro.config.mjs](../../astro.config.mjs) appends a `/about /about/ 301` rule to `dist/client/_redirects` for every folder that holds an `index.html`, pages and supply endpoints alike, after the hand-written rules, which win. Workers allows 2,000 static redirects; the build fails above that. `/about/index.html` still gets the 307 to `/about/`.

## Response headers

- Every path: `Strict-Transport-Security: max-age=86400` (no preload), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`, `Permissions-Policy: camera=(), microphone=(), geolocation=()` and a `Content-Security-Policy-Report-Only`.
- The CSP allows `'self'`, inline scripts and styles (the pages use inline `<script>`, `<style>` and `style` attributes), the GA4 hosts (`www.googletagmanager.com`, `*.google-analytics.com`, `*.analytics.google.com`) and `https://*.workers.dev` for the forms Worker in `connect-src` and `form-action`, because `PUBLIC_FORMS_URL` is not set yet. It names no report endpoint, so violations show only in the browser console.
- `X-Robots-Tag: noindex` on `https://:worker.:account.workers.dev/*`, which matches the Worker's workers.dev host and its preview hosts, so only the canonical host is indexed.
- Caching: HTML keeps the Workers default, `public, max-age=0, must-revalidate`. `/_astro/*` is `public, max-age=31536000, immutable` (added to `_headers` by the Cloudflare adapter at build). `/images/*`, the files directly in `/brand/` (`/brand/:file`, so not the `/brand/` page) and `/brand/kit/*` are `public, max-age=86400`.
- A header set by two matching rules is joined with a comma, so two rules must not set the same header for one path.

## Page metadata

- [PageLayout.astro](../../src/layouts/PageLayout.astro) emits `<link rel="canonical">` and `og:url` from `site` in `astro.config.mjs` (`https://www.augur.net`) and the page path, on every host. The 404 page passes `canonical={false}`, because it answers every unknown path. `noindex` pages keep their robots meta and also get a canonical.
- Open Graph and Twitter (`summary_large_image`) tags carry the page title, description and `shareImage` from [site.ts](../../src/data/site.ts); `twitter:site` comes from the X link in [links.ts](../../src/data/links.ts).
- [og-image.png](../../public/og-image.png) is 1200 × 630, the URL the old site used. It was made on 30 October 2026 from the brand kit: the reversed horizontal logo and `oracle-field.svg` from `public/brand/`, the Brand Foundation palette in [brand.ts](../../src/data/brand.ts), and Sora 600/400 and Schibsted Grotesk 400 from Fontsource, with the homepage headline and site description. It was rendered in headless Chrome and recompressed with sharp; no source file is kept.
- The sitemap ([@astrojs/sitemap](../../astro.config.mjs)) leaves out every page whose HTML has `<meta name="robots" content="noindex">` (the newsletter and contact result pages) and the 404 page. [robots.txt](../../public/robots.txt) allows everything and names `https://www.augur.net/sitemap-index.xml`.
- Indexing depends on the host, not the build: the same build serves www.augur.net and workers.dev, so there is no build-time indexing switch (`PUBLIC_SITE_INDEXABLE` was removed).

## Analytics

Google Analytics 4, property `G-4VLMY3QMC9` (`analyticsId` in [site.ts](../../src/data/site.ts)), the old augur.net's property. An inline script in `PageLayout.astro` loads gtag.js only when `location.hostname` is the host of `site` (`www.augur.net`), so workers.dev, previews and local builds are not counted. Its `config` call matches the old site's snippet, including `allow_google_signals` and `allow_ad_personalization_signals`; the old snippet's `astro:page-load` listener is left out because this site has no client-side router. There is no consent banner (jubalm, 30 October 2026).

## REP supply endpoints

CoinMarketCap reads these. They are static snapshots, copied byte for byte from the live old site on 30 October 2026 at 12:10 UTC.

| URL | File | Body | Served as |
|---|---|---|---|
| `/api/supply/total/` | [public/api/supply/total/index.html](../../public/api/supply/total/index.html) | `6546099.870765873711645614`: whole REP, a bare decimal with no trailing newline | `text/html; charset=utf-8` |
| `/api/supply/circulating/` | [public/api/supply/circulating/index.html](../../public/api/supply/circulating/index.html) | the same value: no locked, reserved or treasury allocations | `text/html; charset=utf-8` |
| `/api/supply/meta.json` | [public/api/supply/meta.json](../../public/api/supply/meta.json) | provenance: block 26304643, generated 2026-10-30T09:23:09.030Z, wei value as a string; tab-indented with a trailing newline | `application/json` |

- The value is ERC-20 `totalSupply()` of REPv2_Yes_1, `0xCf6A0A7826fa124B7705d6f3c675eAD76f1e540D`. Supply has been effectively fixed since the fork window closed on 3 August 2026.
- The old site's hourly pipeline that wrote these files (`scripts/generate-supply-endpoints.ts` in `AugurProject/augur-reboot-website`) is retired; nothing updates them now.
- `/api/supply/total` and `/api/supply/circulating` redirect 301 to the trailing-slash URL, as on the old site.
- The old site's other data feeds, `/data/fork-risk.json` and `/data/dispute-markets-seed.json`, are dropped on purpose and return 404.
