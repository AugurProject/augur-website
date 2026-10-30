# Verification

Dated checks, newest first, with what each did and did not cover. A check is evidence for the revision it ran against, not for later changes. Use relevant checks for each change and state their limits; a build alone does not establish readiness. No test suite has been added or run.

## Not yet checked

- Phone layouts on a real phone, browsers other than a Chromium-based one (Safari, Firefox), and widths above 1024px.
- No-JavaScript behavior in a browser with JavaScript turned off, including the `<noscript>` navigation fallback.
- How each motion scene looks under reduced motion, and animation playback in other browsers.
- Print preview, page breaks and print colours.
- Full accessibility: text over images or gradients, hover and focus states, non-text contrast, screen readers, forced colors, 200% zoom and light scheme; the full keyboard tab order below the first section.
- Page performance.
- The newsletter form against a deployed `augur-forms` Worker and remote D1 database; it has been checked only locally (29 October 2026).
- `mailto:contact@augur.net`; its inbox is unconfirmed.
- The contact form against Proton's real SMTP server and a deployed `augur-forms` Worker; it has been checked only locally, with the `log` provider and a fake SMTP server (29 October 2026).
- Live inspection of the Figma file, and a visual-conformity audit against it. Hover, focus, error, reduced-motion and responsive states need browser checks before conformity with the design is claimed.

## 30 October 2026: Workers Builds preview of the launch branch

`node scripts/check-launch.mjs https://launch-replace-augur-net-augur-website-next.bytebros.workers.dev` against the preview build (`npx wrangler preview`): 69 passed, 0 failed, 1 skipped (the apex redirect). The preview carries Astro's Worker script: a browser navigation to an unknown path gets the 404 page, while a non-navigation request gets the Worker's plain 9-byte `Not found` with status 404 and without the `_headers` headers ([hosting](../reference/hosting.md#serving)). `X-Robots-Tag: noindex` is present on the preview host, but it also appears on the Worker's own 404, so Cloudflare may add it to preview URLs itself; the `_headers` rule for the production workers.dev host is confirmed only under `wrangler dev`.

## 30 October 2026: merged launch branch under `wrangler dev`

Checked against `launch/replace-augur-net` after merging the content port and the launch plumbing, with the Blog navigation item made local. `npm run build` (59 pages) and `npm run check:designs` (`current`, `melo`) pass. The build was served by `npx wrangler dev` and checked with `node scripts/check-launch.mjs http://127.0.0.1:8811`: 67 passed, 0 failed, 2 skipped (the workers.dev `X-Robots-Tag` and the apex redirect, which need the real hosts). Every URL in the old sitemap answers 200, or 301 to `/about/` for `/mission/` and `/team/`; the supply endpoints are byte-identical to www.augur.net; the sitemap lists 51 pages and no form result pages; the header Blog link points to `/blog/` without ↗.

Not checked: everything listed as not checked in the two entries below, and a deploy to Cloudflare.

## 30 October 2026: launch plumbing under `wrangler dev`

Checked against the `launch/plumbing` branch (base `84d15a3`), before the blog, whitepaper, fork guides, privacy, terms and RSS were merged in. `npm run build` and `npm run check:designs` pass. The build was served by `npx wrangler dev` (Wrangler 4.151) and checked with `node scripts/check-launch.mjs http://127.0.0.1:8799`: 31 passed, 36 failed, 2 skipped. All 36 failures are routes that branch did not have yet (17 blog URLs, 6 fork guides, 10 whitepaper URLs, `/privacy/`, `/terms/`, `/rss.xml`).

- Supply endpoints byte-identical to www.augur.net, served as `text/html; charset=utf-8` and `application/json`; `/api/supply/total` 301s to `/api/supply/total/`.
- `/mission`, `/mission/`, `/team` and `/team/` 301 to `/about/`; `/about` 301s to `/about/`, keeping a query string, with no loop. `/data/fork-risk.json` and unknown paths return 404 with the 404 page.
- The `_headers` security headers arrive on pages, on the 404 response and on redirects. HTML is `public, max-age=0, must-revalidate`; `/brand/` stays revalidated while its files get one day.
- With `Host: augur-website-next.bytebros.workers.dev` or a preview-style host, `/` carries `X-Robots-Tag: noindex`; with `www.augur.net`, `augur.net` or `127.0.0.1`, it does not.
- In headless Chrome with `www.augur.net` mapped to the local server, the GA4 script is added; at `127.0.0.1` it is not. No hit was confirmed in GA.
- The 404 page and footer were looked at in headless Chrome at 1440 and 1024 px. Narrower widths were not: headless Chrome would not size the window below about 500 px.

Not checked: anything on Cloudflare itself (the deployed Worker, the host-scoped header on real workers.dev hosts, managed robots.txt, the custom domain and apex redirect), CSP reports in a browser, share-card rendering on social sites, and phone widths.

## 30 October 2026: content ported from the old augur.net

Checked against `launch/port-content` at `c0355d9` ([ported content](../reference/ported-content.md)), with the old site's source at `ba18725` and the live www.augur.net for comparison.

- `npm run build` and `npm run check:designs` (`current` and `melo`) pass; each commit on the branch builds on its own.
- Every blog, whitepaper, fork-guide, privacy and terms URL in the old sitemap (35) has `dist/client/<path>/index.html`.
- `dist/client/rss.xml` is byte-identical to the live `https://www.augur.net/rss.xml` (16 items).
- Text of the 16 posts, 6 fork guides and 9 whitepaper pages, tags removed, matches the live pages except for the listed differences: the monitor removals, the guide titles moved to the header, the "References" heading, and two posts where the old site had turned `$…$` into math. Privacy and terms match word for word apart from the case of the three community links.
- In the ported pages, 2,003 internal links and fragments resolve to built files and ids, and all 84 image URLs exist in `dist/client`. The appendices carry KaTeX markup, and the KaTeX stylesheet is linked from the whitepaper pages only.
- No `↗` or arrow icon on any `/blog/` link except the navigation's Blog entry (see [open decisions](open-decisions.md#ported-content)). `fork-risk`, `/data/fork`, "fork monitor" and "gauge" appear nowhere in `src/` or `dist/client/`.
- `wrangler dev` on the build: the ported pages, `/rss.xml`, the whitepaper `.md` files and a figure answer 200 with HTML, XML, Markdown and JPEG types; `/blog` and `/learn/fork` 307 to the trailing slash.
- Headless Chrome screenshots at 1440 px (blog index and post, a fork guide, the migration record, whitepaper appendix and index, privacy) and at 390 px through an iframe (blog index, a fork guide, a whitepaper appendix): layout holds, wide tables scroll inside their box, and inline and display math render.

Not checked: Safari and Firefox, a real phone, JavaScript turned off, keyboard and screen-reader use, reduced motion, print, and a deployed Worker.

## 29 October 2026: contact form sending through a real SMTP server

Checked against the #35 branch after `36862df`, with the SMTP timeout raised to 25 seconds. The forms Worker ran under `wrangler dev` with `MAIL_PROVIDER=proton`, pointed by `PROTON_SMTP_HOST` and `PROTON_SMTP_PORT` at Ethereal (`smtp.ethereal.email:587`), a free test SMTP service that accepts and keeps mail without delivering it, using a throwaway account the owner created. This exercises the same path Proton will use: STARTTLS on 587, `AUTH PLAIN`, `MAIL FROM`, `RCPT TO`, `DATA`.

- Three JSON submits returned 200 `accepted` in 4.4 to 6.3 seconds; a form post 303'd to `/contact/sent/` in 8 seconds; a submit from the `/contact/` page in the browser showed "Message sent. We’ll reply to the email you gave." after 4 seconds and cleared the form.
- With the earlier 15-second limit, four of five submits returned 503 `unavailable` ("timed out"), and one of those was a form post that still reached `/contact/sent/` only because it happened to finish in 8 seconds. Ethereal pauses 2 to 4 seconds before some replies (a direct session took 8.5 seconds from greeting to `QUIT` without logging in), so the limit is now 25 seconds. A timeout reports "not sent" even if the server got the message, never the reverse.

Not checked: the messages' arrival in the Ethereal mailbox (the owner can see it there), Proton itself, and how long Proton takes.

## 29 October 2026: contact page and `POST /contact`

Checked against the #35 branch on top of `main` at `41e9317`. Local only: the forms Worker under `wrangler dev` (Wrangler 4.155) and the static build served by a plain static file server, in the desktop app's Chromium-based browser.

- `npm run build`, `npm run check:designs` (both designs) and the Worker's `npm run check` (`tsc`) pass. The build emits `/contact/` and the four result pages.
- Worker, `log` provider, with curl: valid submit 200 `accepted` (JSON) and 303 to `/contact/sent/` (form post); blank name, `a@b` and an `ftp://` website give 422 with one message per field; a name with a line break gives 422 "Keep this to one line."; an invalid form post 303s to `/contact/invalid/`; a filled honeypot 400 `rejected`; a JSON body 400; a 20 KB body 400; a foreign `Origin` 403; the fourth post in a minute from one IP 429, and as a form post 303 to `/contact/rate-limited/`; `OPTIONS` 204 with the allowed origin; `/subscribe` still routed.
- Delivery failure, `proton` provider pointed at a local fake SMTP server without TLS: the Worker's real socket sent EHLO and STARTTLS, the TLS upgrade failed, and the route answered 503 `unavailable` (JSON) and 303 to `/contact/error/` (form post). The log line was `contact unavailable connection failed: Error`, with no submitted values.
- SMTP dialogue against a scripted fake server, in Node with the same `smtp.ts`: STARTTLS before `AUTH`, then `MAIL FROM`, `RCPT TO`, `DATA` and `QUIT`; a 535 login, a 554 after `DATA`, a server that never greets (timeout) and a refused connection each throw. The built message decodes back to the original UTF-8 subject, names and body, and encoded words stay under 75 characters.
- Browser, with JavaScript: an empty submit shows three field errors, the summary "Please correct the 3 highlighted fields." and focuses Name; an `ftp://` website shows its error; a valid submit shows "Message sent. We’ll reply to the email you gave." and clears the form.
- Browser, native form post (the page script's handler bypassed with `HTMLFormElement.prototype.submit`, JavaScript still on): lands on `/contact/sent/`. With browser validation on, `pattern` rejects a blank name, `a@b` and an `ftp://` website, matching the server.
- Labels: each of the five fields has a visible label tied to its input. Keyboard: five Tabs from Name reach "Send message", skipping the honeypot; the focused button shows its outline.
- Phone width (375 px): one-column form, no horizontal overflow.
- Homepage: every “Talk to us” links to `/contact/`; clicking “Why Augur” (now `/#why-augur`) scrolls to the section without reloading.

Not checked: real Proton delivery (no token yet), a deployed Worker, JavaScript actually turned off, reduced motion (the page adds no motion of its own), screen readers, Safari and Firefox.

## 29 October 2026: homepage design structure

Checked against `main` at `8e929c2` (before) and the change that moves the homepage into `src/designs/current/`, adds `src/designs/melo/` as a copy, the `homeDesign` switch, `HOME_DESIGN` and `npm run check:designs`. Builds only; nothing was checked in a browser, because the rendered output is unchanged.

- Built output for `current`: `dist/` before and after have the same files except two renamed by the move: the page script is now `Home.astro_astro_type_script_index_0_lang.*.js` (was `index.astro_…`), and `index.*.css` has a new hash. Every other file, including `dist/server/`, is byte-identical. `index.html` and the CSS differ only in the 16 `data-astro-cid-*` scoped-style ids, which Astro derives from each component's file path; mapped one to one, both files are byte-identical. The page script has the same length (33,964 bytes) but a different module order. Built unminified, before and after have the same 2,351 lines once `//#region` path comments and chunk hashes are removed; the only move is the answer-ribbon block (now `src/motion/answer-ribbon.ts`, first in the bundle) and one import line.
- Only the live design ships: a dynamic `import()` per design was tried first and rejected, because the build then emitted both designs' chunks and `/` linked both designs' CSS. The build now resolves `virtual:home-design` to the live design's `Home.astro` in `astro.config.mjs`, so the other design never enters the build: `dist/` for `current` has the same file list as before.
- `HOME_DESIGN=melo` builds; its `index.html` carries `melo`'s own scoped ids, and is otherwise identical to `current`'s. `HOME_DESIGN=melo` in `astro dev` serves `src/designs/melo/Home.astro`. An unknown name stops the build with `Unknown HOME_DESIGN`.
- `npm run check:designs` builds `current` and `melo`. With a broken import in `melo` it reports `melo: build failed` and exits 1.
- With `src/designs/melo/` deleted and its entry removed from `src/designs/index.ts`, `npm run build` and `npm run check:designs` pass, and `current`'s output is as above.
- Preview command: `HOME_DESIGN=melo npm run build`, then `npx wrangler versions upload --dry-run` compiles the upload with no errors (Wrangler 4.151.2). `npx wrangler preview --name home-melo` itself was not run: it needs Cloudflare access to the account.

- Rebased onto `main` at `f740422` (the newsletter change): `npm run build` and `npm run check:designs` pass, and against that revision's build the result is the same as above. The three `/newsletter/` pages are byte-identical, and `dist/client/wrangler.json` differs only in the absolute path of the folder it was built in.

Not checked: a real Cloudflare preview deployment, `astro check` (not installed), and the rendered page in a browser.

## 29 October 2026: newsletter interest list

Run against the newsletter change on its task branch, with the forms Worker under `wrangler dev` on port 8790 (local D1, `SITE_URL` and `ALLOWED_ORIGINS` set to `http://localhost:4335`) and the site under `astro dev` on port 4335 with `PUBLIC_FORMS_URL=http://localhost:8790`, in the Claude desktop app's built-in browser and with `curl`. `npm run build` passed with and without `PUBLIC_FORMS_URL`; `tsc` passed for the Worker; `wrangler deploy --dry-run` bundled it. No remote database existed; nothing was sent to production.

- Worker, JSON (`Accept: application/json`, allowed Origin): a new address returned 200 `accepted` and was stored lowercased with `created_at`, `consent_version` `2026-10-29` and `source` `footer`; the same address again returned 200 `accepted` and no second row; `nope` and an empty address returned 422 `invalid` with an `email` field error; a filled `nickname` honeypot returned 400 `rejected` and stored nothing; a JSON body and a 20 KB body returned 400 `rejected`; responses carried `Access-Control-Allow-Origin` for the allowed origin and `Vary: Origin`, and `OPTIONS` answered 204 with the same origin.
- Worker, refusals: a foreign Origin and a missing Origin returned 403; `GET` returned 405; an unknown path returned 404.
- Worker, without JavaScript: valid and invalid addresses redirected 303 to `/newsletter/subscribed/` and `/newsletter/invalid/` on `SITE_URL`. With the table renamed to simulate a database failure, JSON returned 503 `unavailable`, the form POST redirected to `/newsletter/error/`, and the log line held only the D1 error text.
- Rate limit: the sixth request from one IP within a minute (invalid attempts count) was answered as rate-limited, redirecting to `/newsletter/error/`.
- Browser, with JavaScript: the form posted cross-origin from `localhost:4335` to `localhost:8790` as one `POST` with no preflight. Typing an address, Tab to Subscribe and Enter showed the thanks message in the `role="status"` element, cleared the field and left focus on the button. The field kept its visible label, `autocomplete="email"` and `aria-describedby` (error and consent); the honeypot had `tabindex="-1"`. Earlier the same day, against the first build, the invalid-address error kept focus in the field and the layout had no overflow at 375px; those parts are unchanged.
- Browser, no-JavaScript path: simulated by submitting with `HTMLFormElement.prototype.submit`, which bypasses the script; it landed on `localhost:4335/newsletter/subscribed/` with title "Interest noted | Augur", `noindex` and the message. JavaScript was not turned off in the browser.
- Offline build (no `PUBLIC_FORMS_URL`, `astro preview` on port 4336): the form had `method="dialog"`, no `action`, no consent line and no honeypot; submitting said "Email sign-up isn’t connected yet, so nothing was sent or saved." and stayed on the page.

Not checked: a browser with JavaScript turned off, a real screen reader, Safari and Firefox, a deployed Worker or remote D1 database, the rate limit across Cloudflare locations, and the JavaScript path's server-side error messages in the browser (checked only as JSON).

## 26 October 2026: homepage browser checks

Run against `main` at fd9018e (`npm run build`, then `astro preview`) in the Claude desktop app's built-in browser. Findings are filed as comments on Track task #7 and are not fixed here.

- Phone and tablet: at 390px and 768px the page had no horizontal overflow. The mobile menu dialog opened as a modal, kept Tab and Shift+Tab inside it, closed on Escape and returned focus to the menu button, and closed when an in-page link was chosen. Choosing a link left focus on the menu button instead of the target section. The FAQ reveal in [FaqItem.astro](../../src/components/content/FaqItem.astro) brought the opened question into view. The tab reveal in [tabs.ts](../../src/motion/tabs.ts) ran but overshot in the How taking part works tabs, leaving the panel top 40 to 88px above the viewport. Several small links (20px or 17px tall) fall under the 24px WCAG 2.2 target size.
- Keyboard: the tab order from the skip link through the header, hero and first tab was logical, every focused element had a 2px outline, tabs followed the manual-activation pattern (arrows and Home/End move focus, Enter selects), and the desktop navigation disclosure opened with Enter and closed with Escape. Not walked: the full page tab order below the first section.
- No JavaScript: scripts were blocked with a `script-src 'none'` response header. The page rendered without overflow, but only the first panel of the use cases, walkthrough and roadmap tabs was readable; the rest are hidden and unreachable. The `<noscript>` navigation fallback could not be exercised, because that method does not switch off scripting for `<noscript>`. A browser with JavaScript turned off is still needed.
- Reduced motion: simulated by rewriting the `prefers-reduced-motion` media queries and `matchMedia` through a local proxy, not by an operating-system setting. Infinite animations fell from 16 to 0, total running animations from 303 to 21 (the remainder were 0.01ms colour transitions), and smooth scrolling was off. Not checked: how each scene looks under the setting.
- Print: simulated by applying the `@media print` rules on screen. The header, announcement and footer were hidden and motion was removed. Print preview, page breaks and print colours are unchecked; the page may print light text on a white page.
- Accessibility: landmarks (banner, three named navigation regions, main, footer, a labelled complementary region), one `h1`, no duplicate ids, no unnamed links or buttons, a skip link whose target exists and a labelled newsletter field with an error association were present. Text contrast was computed for 483 text elements in the default dark state at 1024px: none fell below 4.5:1 (3:1 for large text) against solid backgrounds. Not checked: text over images or gradients, hover and focus states, non-text contrast, screen readers, forced colors, 200% zoom and light scheme.
- External links: all 22 `http` destinations in [links.ts](../../src/data/links.ts) returned HTTP 200 on 26 October 2026 with GET after redirects. `x.com` pages answer 200 from a login wall, so they show reachability only; `xShare` redirects to the X login page. `mailto:contact@augur.net` was not tested and its inbox is unconfirmed. Of these, the 12 `http` destinations rendered on `/` were compared with the page.

Not checked in this run: browsers other than the built-in Chromium-based pane, a real phone, widths above 1024px, Safari or Firefox behaviour, page performance, and the newsletter form (no form was submitted).

## 27 October 2026: design-system 0.3.0 square-cut icons

Checked on the #28 task branch against its base (`main` at `b20c1c1`) with the `0.3.0` tarball installed, using Chrome driven over the DevTools protocol against two dev servers (base and branch). `npm run build` completes. The six glyphs render square-cut at 320, 390 and 1280px in the dark scheme: the desktop header chevrons, the footer and hero arrows, the announcement close, the walkthrough details chevron (closed and rotated open), the walkthrough and outcome checks, the roadmap check and plus, and the answer-chip and gate checks. The page has no horizontal overflow at 320px, and the rendered icon boxes match each call site's size (10 to 22px). Both hand-drawn checks draw in under normal motion (dash offset 1.05 to 0, total length 15.56, matching the DS path) and end complete. With `prefers-reduced-motion: reduce` they render complete with no running animation. Under print media they render complete. In the built `dist/client/index.html` all six glyph paths are inlined and both checks are polylines with a static `stroke-dasharray:1 3`, so they show complete without JavaScript. Light does not apply: `PageLayout.astro` hardcodes `class="dark"` and there is no light scheme. Before and after screenshots of each affected section at the three widths were taken as viewport-clipped element captures, not full-page; they are not stored in the repository. Not checked: a real no-JavaScript browser session (checked from the built HTML only), other browsers, a real phone, and the print preview's page layout.

## 24 October 2026: design-system 0.2.0 alignment

Checked on 24 October 2026 against `main` with the `0.2.0` tarball installed from the release URL: `npm ci` and `npm run build` complete, and React is not installed; at 1280 and 390px, in light and dark OS schemes, with reduced motion, full motion and without JavaScript, computed element styles match except the font fallback lists after the first family and the reduced-motion durations. Full-page screenshots are identical at 1280px and without JavaScript. At 390px with reduced motion, after a viewport resize, `main` leaves a 28px gap under the walkthrough steps that this version does not; injecting the 0.01ms duration into `main` removes it. Link focus is 2px Green at 6px once the ring's transition settles, and filled-button hover and pressed, the tenet hover edge, `--card` and `--border` resolve to the same values as on `main`. Not checked: animation playback and other browsers.

## 19 October 2026: landing page and icon migration

`npm run build` passed for the landing page and after the icon package migration. Desktop review covered rendering, use-case selection and the combined walkthrough/REP display. The icon migration compared 25 previously copied SVGs with packaged shapes and matched all 82 rendered icon instances before and after replacement.
