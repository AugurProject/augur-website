# Design sources and adaptations

Read this before changing identity tokens, shared controls or homepage geometry. Update it when an owner decision or an approved adaptation changes.

## Ownership

This repository owns its approved website decisions: content, composition, artwork, choreography and the adaptations below. The Augur design system ([jubalm/augur-design-system](https://github.com/jubalm/augur-design-system)) owns the shared foundation contract. The two projects should move toward alignment, but synchronization is not automatic. Website improvements may become upstream proposals; upstream changes are reviewed before the website adopts them. Each cross-project change needs its own review. Nothing here authorizes edits or pushes to the other project.

Before changing a shared token or reusable control, identify its owner and check the impact in both projects. When adopting a design update, record the source, the intended role or state change, and any deliberate divergence with a short rationale. An inherited difference without a recorded approval is not, by itself, a defect.

Repository rules are in [AGENTS.md](../AGENTS.md). Build inputs and motion tools are in [landing-page.md](landing-page.md).

## Design references

- **Homepage (Figma).** Canonical frame `28:7`: https://www.figma.com/design/3RgHvLRqEZDsAmcBQ7tvVa/Augur.net?node-id=28-7
- **Homepage components (Figma).** Components at `214:1205`: https://www.figma.com/design/3RgHvLRqEZDsAmcBQ7tvVa/Augur.net?node-id=214-1205
- **Brand foundation (PDF).** [resources/brand/augur-brand-foundation.pdf](https://github.com/jubalm/augur-design-system/blob/f3c089a7785270ecef97e9316194272262d49c73/resources/brand/augur-brand-foundation.pdf) in the design-system repository at commit `f3c089a`. Version 1.0, revised 31 August 2026, SHA-256 `65acce8b247ddda10834d0c068e84bc315f7afc118f5570d1d90386de8ed9c0c`.

- **Design-system theme.** `augur-theme` registry item (`public/r/augur-theme.json`) at tag `v0.1.0` (commit `7e2f1a8`) in the design-system repository. Copied by hand into two files:
  - [augur-typography.css](../src/styles/augur-typography.css): byte-identical to the item's file entry (`packages/design-system/src/styles/typography.css`).
  - [augur-theme.css](../src/styles/augur-theme.css): the item's `cssVars.theme` and `css` blocks written out as CSS. The three `@fontsource` imports are omitted because [global.css](../src/styles/global.css) loads them, and the typography import points to `./augur-typography.css`.

  Do not edit either file by hand; replace both from a newer tag. The item places `@import` after a `:root` rule, which plain CSS ignores. Tailwind inlines it anyway, so the typography rules are in the build.

The live Figma file has not been inspected for this document. The website may have diverged from it, so treat these frames as intent, not as the current implementation.

## Adaptations

Each adaptation is a source-level fact, not a claim of rendered conformity. "Approval not found" means no owner decision was located; it does not mean the choice was never made.

- **Colour roles.** The card role maps to Dark 2 (`#1d1d30`, `--card`, `--color-tile`); the secondary role maps to Dark 1. Upstream maps the card role to Dark 1 and secondary to Dark 2. Approval not found.
- **Hover edge on clickable outline controls.** Owner decision, 19 October 2026: "a subtle green border when the user hovers … where it makes sense." Implemented as Green at 50% opacity (`--web-hover-edge`, `global.css`). Upstream has since moved to `--input-hover`, so this site deliberately differs.
- **Filled-button hover and pressed states.** Green hover `#27d19b`, pressed `#24bc8d`. Upstream's proposal moves each filled variant to a neighbouring palette colour instead. Approval not found.
- **Control sizing and type.** Controls are at least 48px tall with 16/24 labels; fields are at least 48px, filled, with a bottom border. Upstream uses 36px and 40px controls with 14/20 labels. Approval not found.
- **Error state.** Invalid fields use `border-bottom: 2px solid #cf294e` through `[aria-invalid=true]` (`global.css`). Error text is Paper (`.field-error`), so the text carries the message and the colour only marks it. Approval not found.
- **Focus.** Links use a 2px Green outline with a 6px offset through an unlayered `a:focus-visible` rule (`global.css`) that overrides the theme. Other focusable elements get the theme's `:focus-visible` ring: 2px `--ring` (Green in the dark scheme) with a 2px offset, unless a scoped component rule overrides it. Owner decision, confirmed 24 October 2026: links keep the 6px offset. The difference from the theme is tracked upstream in jubalm/augur-design-system#8.
- **Type and composition.** Display text scales to 72px with a 78px line height (`.display`). Sora 400/600 and Schibsted Grotesk 400 load through Fontsource. Content width, gutters, section grids and artwork are owned by shared CSS and the [home components](../src/components/home/). Approval not found.
- **Integration.** The site uses native Astro controls and local CSS, not a React runtime. [AGENTS.md](../AGENTS.md) requires a scoped request before adding one.

## Token alignment with v0.1.0

Rule: the site declares a token only where the theme's resolved dark-mode value differs from the site's value. Where they match, the theme supplies the value and the site does not redeclare it. Recheck this list when the theme is re-pinned.

Removed from [global.css](../src/styles/global.css) because the theme already sets the same dark value: `--background`, `--foreground`, `--primary`, `--primary-foreground`, `--muted-foreground`, `--border-quiet`, `--ring`.

Kept because the theme's dark value differs:

- `--card`: site `#1d1d30` (`--color-tile`); theme `#161629`.
- `--border`: site `#71728a` (`--color-mist`); theme `#242438`.
- `--font-sans`: site Schibsted Grotesk; theme Sora.

Kept for a different reason: `--color-muted` in the site's `@theme` has the same resolved value as the theme's mapping. Removing it changed the computed value in the browser, and the cause has not been traced, so it stays until checked.

Checked: computed dark-mode values on the dev server match the values above, and `npm run build` completes. On 24 October 2026, the homepage was compared with `main` at 1280 and 390px, in light and dark OS schemes, with reduced motion, with full motion and without JavaScript. Computed element styles matched, and full-page screenshots were identical. Keyboard focus changed as described under Focus. Not checked: animation playback, and how visible the ring is beside Green-filled walkthrough tabs. The site is dark-only, so the theme's light values are unused here.

## Open decisions

- Whether the website adopts upstream's `--input-hover` edges and family-based filled hover, or keeps its own Green treatments.
- Whether the Green shades, Crimson border and colour-role mapping need owner approval records.

## Verification limits

No live design-file inspection or visual-conformity audit was performed for this document. Hover, focus, error, reduced-motion and responsive states still need browser checks before conformity is claimed; see the verification notes in [landing-page.md](landing-page.md).

## Pending assets

This document will be firmed up once the missing assets and confirmations below are provided. Until then, items marked unconfirmed, unverified or missing are not established.

- **Written record of the hover-edge decision (19 October 2026).** Reported by the owner; not yet recorded in this repository.
- **Owner approvals for the other adaptations.** None found yet.
- **Earlier prototype and design-file frames.** No reachable copy. Historical only; not a specification or a source to keep in sync.
- **Design-system alignment.** Theme pinned to `v0.1.0`; the brand foundation PDF reference stays at `f3c089a`. Alignment with later design-system changes is not established.
