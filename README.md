# Augur.net

A ground-up rebuild of Augur's public website around the September 2026 website strategy and the maintained Augur Design System.

This repository is not a visual port of the current site. The governing order is:

1. **Website strategy** — audience, product hierarchy, information architecture, page purpose, editorial/evidence rules, usability requirements, and migration decisions.
2. **Augur Design System** — shared visual language, interaction behavior, identity, tokens, components, patterns, and accessibility conventions.
3. **Current reboot website** — migration source for useful content, URLs, assets, historical material, and implementation evidence. It is not design authority.

## Start here

Read these before implementation:

- [SPEC.md](SPEC.md) — durable product and website contract.
- [ARCHITECTURE.md](ARCHITECTURE.md) — technical structure, design-system consumption, content/data boundaries, and testing direction.
- [AGENTS.md](AGENTS.md) — operating rules for coding agents and contributors.
- [docs/STRATEGY.md](docs/STRATEGY.md) — implementation-oriented transcript of the September 2026 website strategy.
- [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md) — current Augur Design System pin, authority, registry, and high-signal rules.
- [docs/CONTENT-EVIDENCE.md](docs/CONTENT-EVIDENCE.md) — content models and claim/source discipline.
- [docs/MIGRATION.md](docs/MIGRATION.md) — legacy route handling, redirects, archive rules, and retired APIs.
- [docs/IMPLEMENTATION-PLAN.md](docs/IMPLEMENTATION-PLAN.md) — staged execution plan and acceptance gates.

## Current state

This bootstrap establishes implementation context and a minimal Astro route scaffold. It intentionally does **not** attempt the final homepage, visual composition, content migration, or deployment.

The first meaningful implementation slice is the homepage vertical slice described in the strategy, after the design-system theme and required primitives are installed and verified.

## Stack direction

- Astro 7, static-first.
- Bun 1.4.0.
- TypeScript.
- React only where a design-system or interactive component requires it.
- Markdown/MDX/content collections for editorial material.
- Augur Design System consumed through its pinned shadcn-compatible source registry.
- Deployment target intentionally left separate from site architecture; static output should remain portable.

## Development

```bash
bun install
bun run design:sync
bun run dev
```

Checks:

```bash
bun run check
bun run build
```

The bootstrap does not include a lockfile because dependencies have not yet been installed in this repository. The first implementation pass should generate and commit `bun.lock`, then CI should move to frozen installs.

## Upstream projects

- Design system: `jubalm/augur-design-system`
- Design-system pin for this bootstrap: `629868678fa05d9cd0d8d14617ec29bf8df5d290`
- Migration/source site: `jubalm/augur-reboot-website`

Do not silently follow newer design-system `main`. Compare changes and deliberately update the pin in [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md) when adopting them.
