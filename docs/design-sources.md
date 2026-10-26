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

- **Design-system package.** `@augurproject/design-system` `0.2.0`, installed from the tarball attached to the design system's `v0.2.0` GitHub Release (see [package.json](../package.json)). [global.css](../src/styles/global.css) imports its `theme.css` and `tokens.tailwind.css` after Tailwind, and loads fonts itself rather than through the package's `fonts.css`. All design-system rules sit in `@layer augur`, which follows Tailwind's layers, so the site's unlayered rules override them. Upgrade by installing the next release's tarball; do not copy or edit the package's CSS.

The live Figma file has not been inspected for this document. The website may have diverged from it, so treat these frames as intent, not as the current implementation.

## Adaptations

Each adaptation is a source-level fact, not a claim of rendered conformity. "Approval not found" means no owner decision was located; it does not mean the choice was never made.

- **Colour roles.** The card role is Dark 2 (`#1d1d30`) and the dark border is Mist (`#71728a`). Adopted upstream in `0.2.0` (jubalm/augur-design-system#9), so the site no longer declares them.
- **Hover edge on clickable outline controls.** Owner decision, 19 October 2026: "a subtle green border when the user hovers … where it makes sense." Green at 50% opacity, now the design system's `--brand-hover-edge` (adopted in `0.2.0`). Controls upstream keep the neutral `--input-hover`.
- **Filled-button hover and pressed states.** Green hover `#27d19b`, pressed `#24bc8d`: the design system's dark `--primary-hover` and `--primary-active` since `0.2.0`.
- **Control sizing and type.** Controls are at least 48px tall with 16/24 labels; fields are at least 48px, filled, with a bottom border. Upstream `0.2.0` adds a matching `xl` size; the site's own `.button` and `.field` styles do not use the package's component CSS.
- **Error state.** Invalid fields use `border-bottom: 2px solid #cf294e` through `[aria-invalid=true]` (`global.css`). Error text is Paper (`.field-error`), so the text carries the message and the colour only marks it. Approval not found.
- **Focus.** The design system paints a 2px `--ring` (Green in the dark scheme) for `:focus-visible`, with a 6px offset on links and 2px elsewhere, unless a scoped component rule overrides it. Owner decision, confirmed 24 October 2026: links keep the 6px offset; adopted upstream in `0.2.0` (jubalm/augur-design-system#8).
- **Type and composition.** Display text scales to 72px with a 78px line height (`.display`). Sora 400/600 and Schibsted Grotesk 400 load through Fontsource. `font-sans` (Schibsted Grotesk) and `font-heading` (Sora) come from the package's Tailwind bridge. Content width, gutters, section grids and artwork are owned by shared CSS and the [home components](../src/components/home/). Approval not found.
- **Integration.** The site uses native Astro controls and local CSS, not a React runtime. [AGENTS.md](../AGENTS.md) requires a scoped request before adding one.

## Design-system alignment

The site declares a design-system role only where its value differs from the package's. With `0.2.0` none differ: the site no longer redeclares `--card`, `--border`, `--font-sans`, `--font-heading`, the link focus rule, or its own hover-edge and filled-button colours. Site-only roles (`--web-*`, `--mark-*`) stay in [global.css](../src/styles/global.css). Recheck this when upgrading the package.

`--color-muted` in the site's `@theme` does not match the package's mapping, so it stays. The package's bridge maps `--color-muted` to `var(--muted)`, the quiet surface role (`--augur-color-surface-dark-1`, `#161629`, in dark). The site uses `text-muted` for placeholder and disabled-button text and needs the text colour (`--augur-color-secondary-dark`, `#a1a1b8`), which the package exposes as `--muted-foreground`. Without the override, the placeholder and disabled-button text compute to `#161629`, the same colour as their `bg-quiet` background, so they become invisible. The override is a naming collision between shadcn's `muted` (a surface) and the site's `muted` (a text colour), not a cascade-layer or `@theme inline` effect. Removing it would need the two `text-muted` uses in [global.css](../src/styles/global.css) to become `text-muted-foreground`; this is not done here.

The package's reduced-motion rule is a layered `!important` rule, so it outranks the site's unlayered one: transitions and animations collapse to 0.01ms rather than the site's 0.001ms.

Checked on 24 October 2026 against `main` with the `0.2.0` tarball installed from the release URL: `npm ci` and `npm run build` complete, and React is not installed; at 1280 and 390px, in light and dark OS schemes, with reduced motion, full motion and without JavaScript, computed element styles match except the font fallback lists after the first family and the reduced-motion durations. Full-page screenshots are identical at 1280px and without JavaScript. At 390px with reduced motion, after a viewport resize, `main` leaves a 28px gap under the walkthrough steps that this version does not; injecting the 0.01ms duration into `main` removes it. Link focus is 2px Green at 6px once the ring's transition settles, and filled-button hover and pressed, the tenet hover edge, `--card` and `--border` resolve to the same values as on `main`. Not checked: animation playback and other browsers.

## Open decisions

- Whether the Green shades, Crimson border and colour-role mapping need owner approval records.

## Verification limits

No live design-file inspection or visual-conformity audit was performed for this document. Hover, focus, error, reduced-motion and responsive states still need browser checks before conformity is claimed; see the verification notes in [landing-page.md](landing-page.md).

## Pending assets

This document will be firmed up once the missing assets and confirmations below are provided. Until then, items marked unconfirmed, unverified or missing are not established.

- **Written record of the hover-edge decision (19 October 2026).** Reported by the owner; not yet recorded in this repository.
- **Owner approvals for the other adaptations.** None found yet.
- **Earlier prototype and design-file frames.** No reachable copy. Historical only; not a specification or a source to keep in sync.
- **Design-system alignment.** Package pinned to `0.2.0`; the brand foundation PDF reference stays at `f3c089a`. Alignment with later design-system changes is not established.
