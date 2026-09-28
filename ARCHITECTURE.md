# Augur.net architecture

## 1. Architectural goal

Keep the public website simple enough that content, evidence, and design decisions remain inspectable.

The site is primarily editorial/static. Prefer Astro-rendered HTML and content collections. Introduce client-side React only where a reusable Augur Design System component or a real interaction requires it.

## 2. Dependency direction

```text
Website strategy
      ↓
site information/content model

Augur Design System
foundations → tokens → components → patterns
                                  ↓
                         website compositions
                                  ↓
                              pages/routes
```

The current reboot website sits beside this flow as migration input, not upstream authority.

## 3. Stack

Bootstrap target:

- Bun 1.4.0
- Astro 7.3.x
- TypeScript
- React 19.2.x through Astro integration
- Tailwind CSS v4 only as the shadcn/registry CSS integration layer; website compositions should still prefer semantic Augur roles over ad-hoc utility styling
- MDX for editorial content requiring structured embeds
- Astro content collections for Learn, Blog, and Research
- shadcn-compatible Augur source registry for shared theme/components

No CMS, database, client state framework, or server runtime is required by the strategy today. Add one only when a concrete requirement appears.

## 4. Repository shape

```text
/
├── README.md
├── AGENTS.md
├── SPEC.md
├── ARCHITECTURE.md
├── docs/
│   ├── STRATEGY.md
│   ├── DESIGN-SYSTEM.md
│   ├── CONTENT-EVIDENCE.md
│   ├── MIGRATION.md
│   └── IMPLEMENTATION-PLAN.md
├── scripts/
│   └── sync-design-system.sh
├── src/
│   ├── components/          # website-owned compositions + registry targets
│   ├── content/
│   │   ├── blog/
│   │   ├── learn/
│   │   └── research/
│   ├── layouts/
│   ├── lib/
│   │   ├── evidence.ts
│   │   └── site.ts
│   ├── pages/
│   ├── index.css             # registry theme merge target
│   └── styles/              # registry typography + website composition
└── public/
```

Registry-installed generic components should land in their configured source locations. Do not duplicate those components under a second local implementation.

## 5. Design-system consumption

The design system publishes shadcn-compatible built JSON alongside its GitHub-native source registry.

This repository pins design-system commit:

`a95bf329be66697c5dbd87a484a390139046aaf9`

At this pin, GitHub-native item addresses install untransformed package TSX with broken internal imports and missing component CSS imports. `scripts/sync-design-system.sh` instead fetches the commit-addressed `public/r/` built items, maps their transitive references to the same pinned set on a temporary loopback registry, and installs them with shadcn. See `docs/DESIGN-SYSTEM.md` and the upstream issue #92 for the evidence and repair path. Installed source is committed here so website builds do not depend on GitHub at runtime.

The registry's typography import is relative to the consumer CSS entry. For this Astro consumer, `components.json` points to `src/index.css`; the upstream `./styles/augur-typography.css` import then resolves to its registry target without modifying the theme payload. `src/styles/site.css` holds only website composition.

### Compatibility gate

The built-item payload has now been consumed by Astro + React 19 + Tailwind v4 and built successfully. Its CSS, self-hosted fonts, theme selectors, and browser shell checks are verified in M1. The GitHub-native source path remains broken upstream and is not this site's sync mechanism.

Do not paper over registry incompatibility by copying foundation CSS. Either make the consumer path work and record evidence, or adjust the upstream distribution contract.

Rules:

- do not hand-edit registry-installed foundation values just to satisfy a page;
- site-specific composition CSS may consume semantic roles and composition spacing;
- do not create a parallel palette/type/radius/focus system;
- update the upstream pin deliberately and review the resulting source diff;
- if a local need is broadly reusable across Augur, upstream it.

## 6. Composition values vs foundation values

Foundation values come from the design system.

The website may define **composition contracts** the design system intentionally leaves product-specific: e.g. the website's page frame, a homepage grid, section rhythm, or a diagram-specific layout.

Composition variables may organize design-system values but must not redefine brand primitives. Name them for their role, not as a new token scale.

M1 shell composition uses `--site-frame-max: 80rem`, `--site-gutter: clamp(1rem, 3vw, 3rem)`, and `--site-section-gap: clamp(3rem, 6vw, 5rem)` in `src/styles/site.css`. These govern website layout, not Augur foundation values.

Example acceptable local concerns:

- `--site-frame-max`
- `--site-gutter`
- `--home-section-gap`

Example unacceptable local concerns:

- `--augur-green-new`
- `--site-radius-md`
- `--site-font-heading`

## 7. Content architecture

### Editorial collections

`blog`, `learn`, and `research` are content collections because each contains authored documents with metadata and stable routes.

### Typed factual records

Shared factual records belong in typed data/modules rather than prose duplication:

- product identity/status;
- roadmap entries;
- source records;
- claim records;
- REP version records;
- navigation.

When a value appears on several pages, it should usually have one maintained record.

### Claims and sources

See `docs/CONTENT-EVIDENCE.md`. Technical claims should be referenceable to an exact version/edition/commit and expose limitations near the claim.

## 8. Route architecture

Pages follow the strategy's route boundaries rather than one generic "marketing page" template.

Core direct-entry routes:

```text
/
protocol/
developers/
research/
rep/
learn/
blog/
faq/
about/
history/
terms/
privacy/
```

A route can share shell/navigation/footer while keeping its own question and content boundary.

## 9. Rendering and interactivity

Default: server/static-rendered HTML.

Use client hydration only for real behavior such as:

- menu disclosure where native HTML is insufficient;
- theme selection if provided;
- accessible copy actions;
- interactive diagrams only where interaction materially improves explanation.

Do not hydrate purely decorative animation.

## 10. Deployment boundary

The site should emit portable static output unless a strategy requirement proves otherwise. Cloudflare is a natural deployment option given the existing Augur infrastructure, but deployment configuration is a separate implementation decision and should not force server-side architecture into editorial pages. The documented example is a Cloudflare Worker serving `dist/` as static assets; see `docs/DEPLOYMENT.md`. The repository ships no deployment configuration or credentials.

The two retired supply endpoints are an exception: production routing must return explicit 410 responses with a short machine-readable message. Their implementation depends on the chosen edge/deployment layer.

## 11. Verification direction

Baseline:

- Astro check/build;
- registry-consumer compatibility proof;
- internal route/link validation;
- content-schema validation;
- responsive browser checks;
- accessibility/axe checks when browser tests land;
- design-system theme/component conformance;
- font self-hosting/no-third-party check;
- screenshot review for visual changes;
- migration redirect/410 tests before launch.

Add Playwright when the first visual vertical slice lands. Test behavior and meaningful layout invariants rather than brittle pixel-perfect pages unless a specific visual regression is worth locking.

## 12. Deliberate non-decisions

Not selected by this bootstrap:

- production host/domain cutover method;
- CMS;
- analytics;
- search;
- comment system;
- runtime API/backend;
- final contact mechanism;
- exact live roadmap source;
- exact source of current product status.

These need concrete evidence/requirements rather than placeholder architecture.
