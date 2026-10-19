# Design sources and adaptations

Read this before changing identity tokens, shared controls or homepage geometry.
Update it when a design source, an owner decision or an approved adaptation changes.

## Ownership

This repository owns its approved website decisions: content, composition,
artwork, choreography and the adaptations listed below. The Augur design system
owns the shared foundation contract. The two projects are related and should move
toward alignment, but synchronization is not automatic. Website improvements may
become upstream proposals; upstream changes are reviewed before the website adopts
them. Each cross-project change needs its own review. Nothing here authorizes edits
or pushes to the other project.

Before changing a shared token or reusable control, identify its owner and check
the impact in both projects. When adopting a design update, record the source,
the intended role or state change and any deliberate divergence with a short
rationale. Ask when a decision exceeds the authorized scope or needs an identity
source that is not available. An inherited difference without a recorded approval
is not, by itself, a defect.

Repository rules for identity and implementation are in [AGENTS.md](../AGENTS.md).
Build inputs and motion tools are in [landing-page.md](landing-page.md).

## Adaptations

Each adaptation is a source-level fact, not a claim of rendered conformity.
"Approval not found" means no owner decision was located in any source below;
it does not mean the choice was never made.

- **Colour roles.** The website maps the card role to Dark 2 (`#1d1d30`, the
  `--card` token, `--color-tile`) and the secondary role to Dark 1. The Web Lab's
  `augur.css` maps the foundation card to Dark 1 and secondary to Dark 2. Approval
  not found.
- **Hover edge on clickable outline controls.** Owner decision, 19 October 2026:
  "a subtle green border when the user hovers … where it makes sense." The
  implementation is Green at 50% opacity (`--web-hover-edge`, `global.css`). The
  decision is recorded in the Web Lab's `tokens.css`, not in this repository. The
  earlier prototype note specifying a Mist edge is no longer the implemented rule.
  Upstream has since moved to `--input-hover` (Graphite in light, Pewter in dark),
  so the website deliberately differs from upstream here.
- **Filled-button hover and pressed states.** The website uses Green hover
  `#27d19b` and pressed `#24bc8d`. Upstream's proposal moves each filled variant to
  a neighbouring palette colour instead. The website shades are described in the
  Web Lab's `DESIGN.md`; no approval was found.
- **Control sizing and type.** The website's controls are at least 48px tall with
  16/24 labels; fields are at least 48px, filled, with a bottom border (the footer
  form). The foundation used 36px and 40px controls with 14/20 labels. Approval not
  found.
- **Error state.** Invalid fields use `border-bottom: 2px solid #cf294e` through
  `[aria-invalid=true]` (`global.css`). Crimson has no named token here. Error text
  is Paper (`.field-error`). The Web Lab's contrast table lists Crimson at 3.70:1
  on Navy, so the colour marks the error and the text carries the message. The site
  has no destructive button, and the prototype's destructive and loading states are
  not promised. Approval not found.
- **Focus.** Links use a 2px Green outline with a 6px offset (`global.css`). The Web
  Lab's `DESIGN.md` specifies a 2px Pewter ring with a 3px offset. This is a real
  discrepancy. No decision was found, and it is not yet verified for other
  focusable elements.
- **Type and composition.** Display text scales up to 72px with a 78px line height
  (`.display`). The site loads Sora 400/600 and Schibsted Grotesk 400 through
  Fontsource. Content width, gutters, section grids and artwork are owned by
  shared CSS and the [home components](../src/components/home/). Approval not
  found.
- **Prototype integration.** The prototype used generated foundation CSS and a
  React Button. This site uses native controls and local CSS, and
  [AGENTS.md](../AGENTS.md) requires a scoped request before adding a React runtime.
  The integration is not restored.

## Open decisions

- Whether the website adopts upstream's `--input-hover` edges and family-based
  filled hover, or keeps its own Green treatments.
- The focus ring's colour and offset.
- Whether the Green shades, Crimson border and colour-role mapping need owner
  approval records.

## Verification limits

No live Figma, current upstream state or visual-conformity audit was performed for
this document. Hover, focus, error, reduced-motion and responsive states still need
browser checks before conformity is claimed; see the verification section of
[AGENTS.md](../AGENTS.md).

## Sources

Links are pinned to the commit inspected, so they stay stable when the sources move on.

- **Homepage (Figma).** Canonical frame `28:7`; components at `214:1205`.
  [Homepage](https://www.figma.com/design/3RgHvLRqEZDsAmcBQ7tvVa/Augur.net?node-id=28-7),
  [components](https://www.figma.com/design/3RgHvLRqEZDsAmcBQ7tvVa/Augur.net?node-id=214-1205).
  Live Figma was not inspected; the website may have diverged from it.
- **Design system ([jubalm/augur-design-system](https://github.com/jubalm/augur-design-system)).**
  Two commits matter. The pin, [`fb354701`](https://github.com/jubalm/augur-design-system/tree/fb354701afe182613f58c61b1c7dca21818cff86),
  is the prototype's snapshot, retrieved 12 September 2026; the prototype's
  `provenance.json` names `melodrd/augur-design-system` as its source, but this
  link uses the documented upstream, where the commit is in history. The HEAD
  inspected is [`f3c089a`](https://github.com/jubalm/augur-design-system/tree/f3c089a7785270ecef97e9316194272262d49c73),
  107 commits after the pin. Version 0.1.0 (28 September 2026) changed control
  edges and filled-button hover, so the pinned values are not current upstream.
  Alignment with this HEAD is not established.
- **Brand Foundation (identity reference).**
  [`resources/brand/augur-brand-foundation.pdf`](https://github.com/jubalm/augur-design-system/blob/f3c089a7785270ecef97e9316194272262d49c73/resources/brand/augur-brand-foundation.pdf)
  in the upstream repository, at `f3c089a`. SHA-256
  `65acce8b247ddda10834d0c068e84bc315f7afc118f5570d1d90386de8ed9c0c`. The file
  states "1.0 / 31 August 2026" on its cover and in its text, and it is the only
  copy found: 17 checkouts under `~/Projects/jubalm` hold this same hash.
  Unverified: the Web Lab's source-material record describes a "1.0 / 7 September
  2026" copy, byte-identical to the one above. No such file was found, and this
  file does not carry that date.
- **Web Lab (prototype workspace).**
  [jubalm/augur-web-lab at `4884a66`](https://github.com/jubalm/augur-web-lab/tree/4884a662e6718d3959b5d93875a3b885673d01dd).
  Relevant files: `vendor/augur/provenance.json` (pins five registry files; their
  hashes matched the working tree), `DESIGN.md`, `src/styles/tokens.css` and
  `src/styles/augur.css`. The 19 October decision was read from the working tree,
  not confirmed at this commit.
- **Prototype handoff.** The former prototype is historical evidence, not a
  specification or build dependency. Its open migration decisions are in
  [port-handoff.md](port-handoff.md).
