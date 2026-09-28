# Agent and contributor instructions

## Orient before changing files

Read, in order:

1. `README.md`
2. `SPEC.md`
3. `ARCHITECTURE.md`
4. `docs/STRATEGY.md`
5. `docs/DESIGN-SYSTEM.md`
6. the selected issue or implementation task
7. only then the relevant current-site migration sources

Inspect the current repository and upstream design-system pin before editing. Planned behavior is not implemented behavior.

## Source authority

The website has three different kinds of authority. Do not collapse them:

### Website meaning and structure

The September 2026 website strategy governs audiences, product relationships, route purposes, homepage sequence, editorial/evidence rules, usability requirements, and migration decisions. `SPEC.md` and `docs/STRATEGY.md` encode that strategy for implementation.

If a new implementation idea conflicts with the strategy, surface the conflict instead of silently "improving" the brief.

### Shared interface language

`jubalm/augur-design-system` governs Augur-wide visual and interaction decisions. This repository currently adopts commit `a95bf329be66697c5dbd87a484a390139046aaf9`; see `docs/DESIGN-SYSTEM.md`.

Do not invent local replacements for design-system color, typography, spacing, radius, focus, theme, control behavior, or supplied identity artwork.

### Migration material

`jubalm/augur-reboot-website` and the existing public site are migration sources only. Preserve useful content, URLs, dates, authors, historical context, verified assets, and implementation evidence where the strategy says to preserve them. Do not copy the old site's information architecture or styling by default.

## Product/design-system boundary

Use this dependency direction:

```text
Augur Design System
  foundations → tokens → components → patterns
                                 ↓
                         augur-dot-net
                    website compositions/content
```

Website-owned examples include the homepage narrative, protocol resolution diagram, product relationship map, roadmap presentation, application-fit sections, research/source records, REP version presentation, blog/learn layouts, and site navigation/footer.

If a need is reusable across Augur products, open or link an upstream design-system issue instead of creating a competing local primitive. Do not block website progress on speculative abstraction: keep genuinely site-specific composition local.

## Design rules that should survive every implementation pass

- Lead with the page purpose, primary message, or next action.
- Prefer open composition before introducing cards/panels.
- Square geometry: standard surfaces and controls use 0px radius.
- Depth is tonal; no decorative shadows, glow, gradients, bevels, or textures.
- Green is a scarce intent/orientation signal. A coherent view or task area should usually have one dominant green carrier.
- Sora carries identity/headings/actions/navigation; Schibsted Grotesk carries prose/metadata/tables/dense records.
- Light and dark themes keep the same order, dimensions, spacing, hierarchy, and behavior.
- Responsive reflow preserves priority and reading order.
- State must be named in copy/semantics; color never carries state alone.
- Use supplied logo/glyph/REP artwork. Never redraw or approximate it.
- Use semantic design-system roles, not raw local brand values.

## Content and evidence rules

Never invent:

- adoption numbers or customer logos;
- implementation status;
- supported integration paths;
- dates/milestones;
- security guarantees;
- numerical examples presented as Augur measurements;
- reports, disputes, outcomes, or fixed durations for the worked example;
- token compatibility or universal migration paths.

Keep these categories visibly distinct:

1. proposed design,
2. implementation evidence,
3. measured/observed result,
4. illustrative possibility,
5. historical fact.

Claims that matter technically should resolve to a source record as defined in `docs/CONTENT-EVIDENCE.md`.

## Implementation behavior

- Work in a bounded issue/branch; do not absorb adjacent milestones silently.
- Prefer static HTML and native semantics. Add client JavaScript only for actual interaction.
- Keep editorial content in content collections; keep shared factual records in typed data modules.
- A Card is not the default wrapper for sections.
- Links navigate; buttons perform actions.
- Avoid generic landing-page patterns that exist only to make a page look "designed."
- Prototype with real strategy content, not lorem ipsum.
- Carry the same scientific-milestone question through the homepage and Protocol explanations unless a reviewed content change replaces it.
- Core routes must remain useful when entered directly without a Home visit.
- Keep essential qualifications beside the claims they qualify.

## Verification

For each meaningful slice:

- `bun run check`
- `bun run build`
- inspect desktop and mobile
- inspect both light and dark themes
- keyboard/focus pass
- reduced-motion pass where interaction exists
- check text zoom and overflow
- verify links/routes and source metadata
- compare visual work against the pinned design-system guidance, not memory

When the test stack expands, CI becomes blocking for deterministic checks. Passing automation does not establish visual acceptance.

## Hand-off

Every PR should state:

- strategy requirement or issue being implemented;
- changed routes/surfaces;
- design-system items used and pin;
- content/evidence sources touched;
- verification performed and observed result;
- remaining limitations or unresolved decisions;
- screenshots for meaningful visual changes.

Do not deploy production, change DNS, rewrite legal policy, or claim product/security readiness without explicit maintainer direction.
