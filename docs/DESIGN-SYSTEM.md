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
- `packages/design-system/docs/registry-contract.md`
- `resources/brand/PROVENANCE.md`
- `registry.json`
- `public/r/*.json`

## Registry

Upstream documents this GitHub-native form, but its component items are broken
at the adopted commit (details below). Do not use it to sync this website:

```bash
bunx shadcn@4.20.1 add "jubalm/augur-design-system/<item>#629868678fa05d9cd0d8d14617ec29bf8df5d290"
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

Use `bun run design:sync` for the website baseline. It downloads the immutable
`public/r/<item>.json` artifacts at the adopted SHA, rewrites only their
transitive registry addresses to local URLs for this same pinned set, and
serves them to shadcn 4.20.1 over loopback. No foundation values or component
source are hand-maintained in this repository. Extend its explicit item list
only when a concrete page needs another upstream item.

## Important consumer-support boundary

The design system's external registry contract is currently verified end-to-end against a **Vite + React 19 + Tailwind CSS v4** consumer. The upstream architecture expects Astro to work by shadcn convention, but explicitly does **not** claim Astro as a verified external registry consumer yet.

The design-system docs application being Astro does not prove this path: it consumes the workspace package directly, not the external source registry.

Therefore M1 begins with a compatibility gate:

1. keep Astro + React + Tailwind v4 close to the verified consumer assumptions;
2. run the pinned registry install;
3. verify source destinations, CSS merge, Fontsource delivery, semantic variables, theme selectors, focus/reduced-motion rules, and production build;
4. if it fails, fix/extend the upstream registry contract or choose an explicit supported consumption path;
5. do **not** hand-copy foundation CSS as a workaround.

This is a known integration question, not a reason to fork the design system.

### M1 consumer verification (2026-09-27)

The source for this installation is the pinned commit above, specifically its
`public/r/{augur-theme,utils,button,card,page-header,empty-state}.json` built
items. The source registry's `augur-theme` writes typography to
`src/styles/augur-typography.css` and imports it as
`./styles/augur-typography.css` from the configured Tailwind CSS entry. We set
that entry to `src/index.css`, matching the upstream consumer's source-root CSS
location. The import resolves in Astro without modifying any theme payload.

The upstream generator embeds consumer-shaped `content` in `public/r/*.json`:
it rewrites canonical package imports (`../../internal/cx` to `@/lib/utils`,
relative pattern imports to consumer aliases) and adds CSS imports. The root
`registry.json` drops that content and instead points `files.path` at the
untransformed package files. A GitHub Actions run of the documented
GitHub-native command completed but replaced the four baseline TSX files with
broken `internal/cx` / pattern-relative imports and removed CSS imports.
That is an upstream source-registry contract bug, separate from Astro.

The site sync uses the pinned **built-JSON channel**. Its transient local
server keeps every item field intact except `registryDependencies`, which it
maps to the matching pinned item on loopback. This prevents the unpinned
transitive addresses in upstream JSON from resolving to a moving default
branch or to broken GitHub-native source. The source artifacts themselves
still come from `raw.githubusercontent.com` at the fixed 40-character commit.
CI runs the sync and fails on any file drift, including untracked files.

This workspace's proxy blocks `raw.githubusercontent.com`; local verification
used connector-fetched copies of those exact pinned built items via the
script's `AUGUR_REGISTRY_SOURCE_DIR` test override, which is disabled in CI.
Its npm dependencies were installed separately at the items' exact versions
because the proxy-free loopback smoke could not reach npm. The production
GitHub runner must still establish that the committed built-JSON sync and
drift check pass over its actual network.

Observed results: `bun install` generated `bun.lock`; `bun run check` and
`bun run build` pass with Astro 7.3.1, React 19.2.8, and Tailwind CSS 4.1.17.
The production output includes Fontsource `@font-face` rules and local Sora and
Schibsted Grotesk WOFF2 assets, with no Google font host. It includes light and
dark semantic roles, `[data-theme]` selectors, system dark fallback, the focus
ring, and the reduced-motion rule. CI runs a frozen install, check, build,
route/link validation, a pinned built-JSON sync drift check, and four Chromium
shell checks at desktop/mobile sizes in light/dark. The browser job saves
screenshots as an Actions artifact for visual review; those shell checks do not
establish final homepage design acceptance.

`/design-conformance/` (noindex, outside site navigation) renders every
installed item — Button variants/sizes/states, Card, PageHeader, EmptyState
— plus the type roles, semantic color roles, spacing scale, focus ring and
supplied lockups, side by side in forced light and dark containers. Its
browser test checks equal structure and dimensions across themes, square
geometry, pinned families, the focus ring and supplied artwork. It is the
visual reference to compare against upstream guidance when the pin changes.

`components.json` has an empty `tailwind.baseColor`: shadcn 4.20.1 otherwise
requests an unrelated `ui.shadcn.com/r/colors/neutral.json` even though Augur
supplies all base roles. The empty value is accepted by the CLI and keeps the
install independent of that scaffold palette.

**Upstream repair:** generate consumer-shaped TSX files under the design
system's `registry-src/` from canonical source, point root `registry.json`
at those generated paths, and drift-check both forms. Its docs already
describe these transforms, but only built JSON currently carries them.
The generated `registryDependencies` are unversioned; they also need an
immutable release strategy or propagated ref before a direct native install
can claim full dependency-graph reproducibility. An upstream self-reference
cannot literally embed its own eventual commit SHA in that same commit. Track
the repair in `jubalm/augur-design-system` issue #92.

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
2. read affected `DESIGN.md`, foundation docs, component docs, registry contract, and changelog;
3. update the pin here and in `scripts/sync-design-system.sh`;
4. re-run the sync;
5. review the source/CSS/dependency diff;
6. test both themes, responsive layouts, keyboard/focus, fonts, and affected pages;
7. record any site composition adjustment separately from foundation changes.

Never update the pin merely to "get latest."
