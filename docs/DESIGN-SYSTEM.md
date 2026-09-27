# Augur Design System consumer contract

## Adopted upstream revision

Repository: `jubalm/augur-design-system`

Pinned commit:

```text
629868678fa05d9cd0d8d14617ec29bf8df5d290
```

Commit summary: `feat(theme): separate control edges from panel edges; keep filled-button hover in family (#90)`.

This pin is deliberate. A newer upstream `main` is not automatically adopted.

## Authority

Upstream precedence for this website:

1. `DESIGN.md` for representable adopted values.
2. generated theme/tokens derived from it.
3. maintained foundation/component/pattern docs for concepts outside that schema.
4. component/pattern implementation for delivered behavior.
5. brand foundation/provenance for fixed supplied identity artwork.

Do not treat screenshots or memory of the docs site as specification.

## High-signal upstream files

At the pin above:

- `DESIGN.md`
- `ARCHITECTURE.md`
- `AGENTS.md`
- `apps/docs/src/content/foundations/visual-direction.mdx`
- `apps/docs/src/content/foundations/layout-geometry.mdx`
- `apps/docs/src/content/foundations/interaction.mdx`
- `apps/docs/src/content/foundations/identity.mdx`
- `apps/docs/src/content/reference/component-conventions.mdx`
- `resources/brand/PROVENANCE.md`
- `registry.json`
- `public/r/*.json`

## Registry

Immutable registry base for this pin:

```text
https://raw.githubusercontent.com/jubalm/augur-design-system/629868678fa05d9cd0d8d14617ec29bf8df5d290/public/r/
```

Available items at bootstrap:

- `augur-theme`
- `utils`
- `button`
- `card`
- `input`
- `form-field`
- `dialog`
- `page-header`
- `empty-state`

Use `scripts/sync-design-system.sh` for the website baseline. Install additional current items only when a page needs them.

## Visual contract

### Core expression

The system aims to be clear-eyed, credible, neutral, and human. The governing idea is **make what matters clear**.

Lead with the page purpose/message/action. Keep secondary detail available without equal visual competition.

### Color

Core palette:

- Navy `#0E0E21`
- Green `#2AE7A8`
- Paper `#F5F5F8`
- Graphite `#4A4B61`
- Pewter `#A1A1B8`
- Deep `#095E42`
- Wash `#C9FFE5`
- dark surfaces `#161629`, `#1D1D30`, `#242438`
- Mist `#71728A`

These values are documented here for recognition, **not** to authorize local copies. Consume semantic roles installed by the theme.

Green is an intent/orientation signal, not decoration. A coherent task area should usually have one dominant green carrier.

At this pin, filled buttons hover within their own palette family; input/outline control edges are distinct from panel hairlines.

### Typography

- Sora: identity, display, headings, navigation, controls, primary actions.
- Schibsted Grotesk: body, helper text, metadata, tables, technical/dense records.
- Editorial titles/sections use regular-weight Sora so size can carry hierarchy.
- Long prose should stay near 65 characters.

### Spacing / geometry

Component scale: `4, 8, 12, 16, 24, 32px`.

Large `48/64/80px` values are composition roles, not extra component-padding tokens.

Standard surfaces/controls are square: 0px radius.

Prefer open composition. Card/panel is not the default wrapper.

### Depth

Tonal surfaces + hairlines. No decorative shadows, glows, gradients, bevels, or textures.

### Interaction

- `:focus-visible`: shared 2px ring + 2px offset.
- immediate/quiet state feedback;
- no decorative transitions by default;
- native behavior first;
- states named by semantics/copy;
- direct-touch controls on coarse pointers expose at least 44×44px target.

### Themes

Light and dark are equal expressions. Theme changes color roles, not content order, spacing, dimensions, hierarchy, or behavior.

### Responsive behavior

Stack before compressing. Preserve primary heading/action and reading order. Let dense records/tables use wider lanes where necessary.

## Identity artwork

Use the verified upstream assets; do not recreate the mark.

Rules:

- horizontal lockup preferred;
- Color variant on Paper/White;
- Reversed on Navy/approved dark surfaces;
- vertical only where width genuinely constrains;
- glyph only where context already names Augur;
- horizontal minimum 150×50px;
- vertical minimum 94×93px;
- glyph minimum 50×45px, controlling pyramid at least 24px;
- preserve 1a clearspace;
- REP token is separate protocol identity and not generic Augur chrome.

Upstream PNGs are lossless extractions from the canonical brand foundation PDF. Do not trace them into "official" SVGs.

## Consumer update procedure

When intentionally adopting a newer design-system revision:

1. inspect upstream commits since this pin;
2. read affected `DESIGN.md`, foundation docs, component docs, and changelog;
3. update the pin here and in `scripts/sync-design-system.sh`;
4. re-run the sync;
5. review the source diff;
6. test both themes, responsive layouts, keyboard/focus, and affected pages;
7. record any site composition adjustment separately from foundation changes.

Never update the pin merely to "get latest."
