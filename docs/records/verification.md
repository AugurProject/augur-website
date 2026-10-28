# Verification

Dated checks, newest first, with what each did and did not cover. A check is evidence for the revision it ran against, not for later changes. Use relevant checks for each change and state their limits; a build alone does not establish readiness. No test suite has been added or run.

## Not yet checked

- Phone layouts on a real phone, browsers other than a Chromium-based one (Safari, Firefox), and widths above 1024px.
- No-JavaScript behavior in a browser with JavaScript turned off, including the `<noscript>` navigation fallback.
- How each motion scene looks under reduced motion, and animation playback in other browsers.
- Print preview, page breaks and print colours.
- Full accessibility: text over images or gradients, hover and focus states, non-text contrast, screen readers, forced colors, 200% zoom and light scheme; the full keyboard tab order below the first section.
- Page performance, and the newsletter form (no form has been submitted).
- `mailto:contact@augur.net`; its inbox is unconfirmed.
- Live inspection of the Figma file, and a visual-conformity audit against it. Hover, focus, error, reduced-motion and responsive states need browser checks before conformity with the design is claimed.

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
