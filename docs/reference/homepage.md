# Homepage reference

The homepage's structure, build inputs, content sources and interactions as currently implemented. Open decisions about this content are in [open decisions](../records/open-decisions.md#homepage); what has been checked is in [verification](../records/verification.md).

This repository is the canonical site. The homepage was ported from the former Web Lab prototype, which was a disposable design reference: matching it is not an ongoing requirement, and no prototype checkout is needed.

## Structure

[index.astro](../../src/pages/index.astro) serves `/` with six sections: Hero, Tenets, Applications, How It Works, Roadmap and Learn More. Product pages and local blog or FAQ routes do not exist. The only other pages are the newsletter form's result pages: see [Newsletter interest list](#newsletter-interest-list).

[PageLayout.astro](../../src/layouts/PageLayout.astro) supplies the announcement, header, footer, skip link and decorative page field. It sets the page title, description, theme color, font preload and REP favicon. Optional props set a different `title`, add `noindex`, or drop the announcement, header and footer (`bare`). Its metadata is narrower than the earlier prototype's layout: apart from that `noindex`, it does not emit canonical, Open Graph, Twitter, robots or structured-data tags, or implement CSP script-hash handling. The `indexable` export in [site.ts](../../src/data/site.ts) is not connected to this layout; do not assume it controls indexing.

[astro.config.mjs](../../astro.config.mjs) configures the Cloudflare adapter and Tailwind Vite plugin; the comment there explains the adapter's `session: false`. [global.css](../../src/styles/global.css) defines Tailwind v4 shared tokens, controls and utilities; specialized artwork and section styles remain scoped. Fonts are Sora and Schibsted Grotesk from Fontsource packages. Controls are native Astro components, such as [Button.astro](../../src/components/primitives/Button.astro), not framework button primitives.

## Build inputs

[package.json](../../package.json) and [package-lock.json](../../package-lock.json) define the npm build. There is no separate asset or design-system generation step. Shared CSS is authored in [global.css](../../src/styles/global.css) and [disclosures.css](../../src/styles/disclosures.css); Tailwind runs through Vite. Tokens, typography, semantic roles and the focus and reduced-motion rules come from the `@augurproject/design-system` package (`theme.css` and `tokens.tailwind.css`); its version is in [design reference](design.md) and the update steps in [update the design system](../guides/update-design-system.md).

The site's own dark roles are scoped to `:root.dark`, which relies on the `dark` class that [PageLayout.astro](../../src/layouts/PageLayout.astro) sets on `<html>`; the package also selects its dark roles from that class. Fontsource supplies Sora 400/600 and Schibsted Grotesk 400. The layout preloads the packaged Sora Latin 600 WOFF2; keep that preload aligned with the headline font when changing typography. Brand files, artwork geometry and packaged icons are local inputs; building requires no design-tool connection or external prototype checkout.

The page renders through Astro components; browser scripts enhance the rendered HTML without framework hydration. Keep browser-only APIs inside browser scripts and motion controllers rather than component frontmatter. Current application code requires no API keys or provider credentials. `PUBLIC_SITE_INDEXABLE` only sets the unused export described above; it is not a launch or indexing switch.

## Content and destinations

[navigation.ts](../../src/data/navigation.ts) links to homepage sections and published resources. Products currently contains only Augur Lituus. This describes the current navigation, not a permanent product-scope decision. External destinations are centralized in [links.ts](../../src/data/links.ts).

[home-resources.ts](../../src/data/home-resources.ts) selects “Augur: Q2 2026 report” and “The Moon Fork report” for Learn More. This selection was an implementation substitution and has not received editorial approval. The earlier draft article choices were “Why disagreement makes an oracle stronger” and “Writing questions an oracle can answer”; neither has a local article route. Learn More currently links to the whitepaper and published Augur blog.

Review flags in [faq.ts](../../src/data/faq.ts) (`needsReview`) and [walkthrough.ts](../../src/data/walkthrough.ts) (`walkthroughReview`) are unresolved content markers. Code presence and a successful build do not establish content approval.

## Newsletter interest list

The footer form collects addresses for a later newsletter; the site sends no email and uses no newsletter service. The site stays static: the form posts to the separate `augur-forms` Worker in [workers/forms](../../workers/forms/). Wording, the consent version and the shared address check are in [newsletter.ts](../../src/data/newsletter.ts); the Worker's address and the honeypot field name are in [forms.ts](../../src/data/forms.ts). The Worker imports both files.

- [SiteFooter.astro](../../src/components/layout/SiteFooter.astro) posts `email`, plus an off-screen honeypot field `nickname`, to `PUBLIC_FORMS_URL` + `/subscribe`. With JavaScript, its script validates first, posts form-urlencoded with `Accept: application/json` (a simple cross-origin request, no preflight) and shows the returned message in the status or error element.
- Without `PUBLIC_FORMS_URL` in a production build, the form is offline: `method="dialog"`, no consent line, and the script says nothing was sent or saved. Development defaults to `http://localhost:8788`.
- The Worker checks the `Origin` against `ALLOWED_ORIGINS` (403 otherwise), accepts only form bodies up to 16 KB, rejects a filled honeypot with the generic failure (never the thanks message), rate-limits, validates, then inserts into the `signups` table, ignoring duplicates. New and duplicate addresses get the same answer. Responses: JSON `{ ok, status, message, fieldErrors? }` with 200, 422 invalid, 400 rejected, 429 rate-limited or 503 unavailable; or, without JavaScript, a 303 to `SITE_URL` + `/newsletter/subscribed/`, `/newsletter/invalid/` or `/newsletter/error/`.
- Those result pages are prerendered by [[result].astro](../../src/pages/newsletter/[result].astro) as `bare`, `noindex` pages.
- A row holds `email`, `created_at`, `consent_version` and `source` only; the table is defined in [0001_signups.sql](../../workers/forms/migrations/0001_signups.sql). No IP or user agent is stored, and logs carry only the error text, never the address.
- Nobody is mailed or confirmed. A later newsletter service's double opt-in is the confirmation step.

Deploy, database, export and removal commands are in [deploy](../guides/deploy.md#forms-worker-augur-forms).

## Interactions and assets

The homepage starts its section controllers in [index.astro](../../src/pages/index.astro); shared browser behavior lives in [src/motion](../../src/motion/). The query/REP explanation uses one walkthrough; only earlier completed steps have strikethrough and checks.

[timelines.ts](../../src/motion/timelines.ts) holds shared timing; choreography files in [src/motion](../../src/motion/) define the looping artwork. Reuse [play-once.ts](../../src/motion/play-once.ts) and [loop-scene.ts](../../src/motion/loop-scene.ts) to preserve session and visibility behavior. In development, [debug.ts](../../src/motion/debug.ts) supports `?motion=slow` for five-times-longer timings and `?motion=replay` for replay comparisons. Production ignores both controls.

[tabs.ts](../../src/motion/tabs.ts) reveals a selected panel after explicit interaction at widths up to 767px. [FaqItem.astro](../../src/components/content/FaqItem.astro) similarly reveals an opened question. Scrolling respects reduced-motion preferences.

Brand assets are in [public/brand](../../public/brand/) and article illustrations in [public/images/blog](../../public/images/blog/). The hero renders component/data geometry; it does not use `public/brand/oracle-field.svg`.

[Icon.astro](../../src/components/primitives/Icon.astro) renders 21 explicitly imported SVGs with no browser icon runtime: six square-cut glyphs from `@augurproject/design-system/icons/` (`arrow-right`, `arrow-up-right`, `check`, `chevron-down`, `plus`, `x`) and 15 bold SVGs from `@phosphor-icons/core` (locked to 2.1.1). Unknown names throw. Preserve the nested spans, `web-icon`, `data-fixed-weight="bold"`, `data-glyph="bold"` and `aria-hidden="true"` hooks when changing the registry. Retain the [Phosphor MIT notice](../../public/licenses/phosphor.txt).
