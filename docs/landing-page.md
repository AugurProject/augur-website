# Landing page

This guide describes the current implementation and review limits. Update it when homepage structure, behavior, content decisions or validation evidence changes.

## Structure

[index.astro](../src/pages/index.astro) serves `/` with six sections: Hero, Tenets, Applications, How It Works, Roadmap and Learn More. Product pages and local blog or FAQ routes do not exist.

[PageLayout.astro](../src/layouts/PageLayout.astro) supplies the announcement, header, footer, skip link and decorative page field. It sets the page title, description, theme color, font preload and REP favicon. It does not emit canonical, Open Graph, Twitter, robots or structured-data tags, or implement CSP script-hash handling. The `indexable` export in [site.ts](../src/data/site.ts) is not connected to this layout; do not assume it controls indexing. Production metadata and security behavior have not been reviewed.

[astro.config.mjs](../astro.config.mjs) configures the Cloudflare adapter and Tailwind Vite plugin; adapter settings are in [deployment.md](deployment.md). [global.css](../src/styles/global.css) defines Tailwind v4 shared tokens, controls and utilities; specialized artwork and section styles remain scoped. Fonts are Sora and Schibsted Grotesk from Fontsource packages.

## Build inputs

[package.json](../package.json) and [package-lock.json](../package-lock.json) define the npm build. There is no separate asset or design-system generation step. Shared CSS is authored in [global.css](../src/styles/global.css) and [disclosures.css](../src/styles/disclosures.css); Tailwind runs through Vite. Tokens, typography, semantic roles and the focus and reduced-motion rules come from the `@augurproject/design-system` package (`theme.css` and `tokens.tailwind.css`); its version and update method are in [design-sources.md](design-sources.md). The site's own dark roles are scoped to `:root.dark`, which relies on the `dark` class that [PageLayout.astro](../src/layouts/PageLayout.astro) sets on `<html>`; the package also selects its dark roles from that class. Fontsource supplies Sora 400/600 and Schibsted Grotesk 400. The layout preloads the packaged Sora Latin 600 WOFF2; keep that preload aligned with the headline font when changing typography. Brand files, artwork geometry and packaged icons are local inputs; building requires no design-tool connection or external prototype checkout.

The page renders through Astro components; browser scripts enhance the rendered HTML without framework hydration. Keep browser-only APIs inside browser scripts and motion controllers rather than component frontmatter. Current application code requires no API keys or provider credentials. `PUBLIC_SITE_INDEXABLE` only sets the unused export described above; it is not a launch or indexing switch.

## Content and destinations

[navigation.ts](../src/data/navigation.ts) links to homepage sections and published resources. Products currently contains only Augur Lituus. This describes the current navigation, not a permanent product-scope decision. External destinations are centralized in [links.ts](../src/data/links.ts).

[home-resources.ts](../src/data/home-resources.ts) selects “Augur: Q2 2026 report” and “The Moon Fork report” for Learn More. This selection was an implementation substitution and has not received editorial approval. The earlier draft article choices were “Why disagreement makes an oracle stronger” and “Writing questions an oracle can answer”; neither has a local article route. Confirm the article selection and usable destinations before treating it as approved content. Learn More currently links to the whitepaper and published Augur blog.

Review flags in [faq.ts](../src/data/faq.ts) and [walkthrough.ts](../src/data/walkthrough.ts) remain unresolved content markers. Code presence and a successful build do not establish content approval.

[site.ts](../src/data/site.ts) sets the newsletter provider to `null`. [SiteFooter.astro](../src/components/layout/SiteFooter.astro) validates the form locally and reports that no email was sent or saved. It does not subscribe users.

## Interactions and assets

The homepage starts its section controllers in [index.astro](../src/pages/index.astro); shared browser behavior lives in [src/motion](../src/motion/). The query/REP explanation uses one walkthrough; only earlier completed steps have strikethrough and checks.

[timelines.ts](../src/motion/timelines.ts) holds shared timing; choreography files in [src/motion](../src/motion/) define the looping artwork. Reuse [play-once.ts](../src/motion/play-once.ts) and [loop-scene.ts](../src/motion/loop-scene.ts) to preserve session and visibility behavior. In development, [debug.ts](../src/motion/debug.ts) supports `?motion=slow` for five-times-longer timings and `?motion=replay` for replay comparisons. Production ignores both controls.

[tabs.ts](../src/motion/tabs.ts) reveals a selected panel after explicit interaction at widths up to 767px. [FaqItem.astro](../src/components/content/FaqItem.astro) similarly reveals an opened question. Scrolling respects reduced-motion preferences. These behaviors have not been verified in a phone viewport.

Brand assets are in [public/brand](../public/brand/) and article illustrations in [public/images/blog](../public/images/blog/). The hero renders component/data geometry; it does not use `public/brand/oracle-field.svg`.

[Icon.astro](../src/components/primitives/Icon.astro) renders 21 explicitly imported bold SVGs from `@phosphor-icons/core` (locked to 2.1.1), with no browser icon runtime. `chevron-down` aliases `caret-down-bold.svg`; unknown names throw. Preserve the nested spans, `web-icon`, `data-fixed-weight="bold"`, `data-glyph="bold"` and `aria-hidden="true"` hooks when changing the registry. Retain the [Phosphor MIT notice](../public/licenses/phosphor.txt).

## Verification limits

Recorded checks on 19 October 2026: `npm run build` passed for the landing page and after the icon package migration. Desktop review covered rendering, use-case selection and the combined walkthrough/REP display. The icon migration compared 25 previously copied SVGs with packaged shapes and matched all 82 rendered icon instances before and after replacement. These are historical checks, not checks rerun for documentation changes.

Browser checks on 26 October 2026, run against `main` at fd9018e (`npm run build`, then `astro preview`) in the Claude desktop app's built-in browser. Findings are filed as comments on Track task #7 and are not fixed here.

- Phone and tablet: at 390px and 768px the page had no horizontal overflow. The mobile menu dialog opened as a modal, kept Tab and Shift+Tab inside it, closed on Escape and returned focus to the menu button, and closed when an in-page link was chosen. Choosing a link left focus on the menu button instead of the target section. The FAQ reveal in [FaqItem.astro](../src/components/content/FaqItem.astro) brought the opened question into view. The tab reveal in [tabs.ts](../src/motion/tabs.ts) ran but overshot in the How taking part works tabs, leaving the panel top 40 to 88px above the viewport. Several small links (20px or 17px tall) fall under the 24px WCAG 2.2 target size.
- Keyboard: the tab order from the skip link through the header, hero and first tab was logical, every focused element had a 2px outline, tabs followed the manual-activation pattern (arrows and Home/End move focus, Enter selects), and the desktop navigation disclosure opened with Enter and closed with Escape. Not walked: the full page tab order below the first section.
- No JavaScript: scripts were blocked with a `script-src 'none'` response header. The page rendered without overflow, but only the first panel of the use cases, walkthrough and roadmap tabs was readable; the rest are hidden and unreachable. The `<noscript>` navigation fallback could not be exercised, because that method does not switch off scripting for `<noscript>`. A browser with JavaScript turned off is still needed.
- Reduced motion: simulated by rewriting the `prefers-reduced-motion` media queries and `matchMedia` through a local proxy, not by an operating-system setting. Infinite animations fell from 16 to 0, total running animations from 303 to 21 (the remainder were 0.01ms colour transitions), and smooth scrolling was off. Not checked: how each scene looks under the setting.
- Print: simulated by applying the `@media print` rules on screen. The header, announcement and footer were hidden and motion was removed. Print preview, page breaks and print colours are unchecked; the page may print light text on a white page.
- Accessibility: landmarks (banner, three named navigation regions, main, footer, a labelled complementary region), one `h1`, no duplicate ids, no unnamed links or buttons, a skip link whose target exists and a labelled newsletter field with an error association were present. Text contrast was computed for 483 text elements in the default dark state at 1024px: none fell below 4.5:1 (3:1 for large text) against solid backgrounds. Not checked: text over images or gradients, hover and focus states, non-text contrast, screen readers, forced colors, 200% zoom and light scheme.
- External links: all 22 `http` destinations in [links.ts](../src/data/links.ts) returned HTTP 200 on 26 October 2026 with GET after redirects. `x.com` pages answer 200 from a login wall, so they show reachability only; `xShare` redirects to the X login page. `mailto:contact@augur.net` was not tested and its inbox is unconfirmed. Of these, the 12 `http` destinations rendered on `/` were compared with the page.

Not checked: browsers other than the built-in Chromium-based pane, a real phone, widths above 1024px, Safari or Firefox behaviour, page performance, and the newsletter form (no form was submitted). No test suite was added or run. Use relevant checks for each change and state their limits; a build alone does not establish readiness.
