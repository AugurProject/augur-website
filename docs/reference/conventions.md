# Conventions

The content, design and code rules every change to the site follows. External prototypes are not specifications or required dependencies.

## Content

- Preserve homepage copy unless edits are requested. Use “Augur Lituus” in full; write for traders and beginners and identify builder-specific language. Do not imply that holding REP requires reporting or challenging. Do not invent claims, partners, metrics, dates, addresses or guarantees; preserve unresolved review flags.
- Keep repeated facts and destinations in shared data. Use `src/data/links.ts` and `src/data/navigation.ts`; do not link to nonexistent local routes. Off-site actions use ↗; internal actions do not.

## Design

- Preserve the Navy/Paper/Green palette, dark scheme, official logo geometry and square corners. Use `src/styles/global.css` for shared tokens/utilities and shared Astro controls; keep specialized art/styles scoped.

## Code

- Keep Astro-rendered HTML with native browser enhancement. Adding hydration, React, an animation library, backend, wallet connection or third-party tracking requires a scoped request. The one approved tracking exception is Google Analytics 4 (`G-4VLMY3QMC9`), loaded on www.augur.net only, with no consent banner (jubalm, 30 October 2026; see [hosting reference](hosting.md#analytics)). Extend the explicit SVG registry in `src/components/primitives/Icon.astro`; preserve its hooks and license notice.
- Reuse `src/motion/` controllers. Preserve tab keyboard controls, labelled panels, native disclosures and mobile dialog focus behavior. Keep content usable without JavaScript, respect reduced motion and print, and pause ongoing scenes off-screen or hidden. Do not gate information behind animation.
- Give forms visible labels, autocomplete and associated errors/status feedback. With no newsletter provider configured, do not send data or claim subscription.
