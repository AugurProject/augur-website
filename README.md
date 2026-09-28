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
- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) — example Cloudflare Workers static-assets deploy (not configured here).
- [docs/IMPLEMENTATION-PLAN.md](docs/IMPLEMENTATION-PLAN.md) — staged execution plan and acceptance gates.

## Current state

The site currently has a verified Astro foundation and shared shell around direct-entry route placeholders. The placeholders are marked `noindex` and are not publication-ready content. `/design-conformance/` is a noindex specimen of every installed design-system item in both themes. The final homepage, content migration, contact/operator review, and production deployment are later work.

The pinned registry source is committed so ordinary builds do not fetch GitHub. Its generated CSS enters at `src/index.css`; website-only frame, gutter, section rhythm, and shell layout live in `src/styles/site.css`. See [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md) for the registry proof and its limits.

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
bun install --frozen-lockfile
bun run dev
```

Checks:

```bash
bun run check
bun run build
node scripts/check-internal-links.mjs
```

`bun run design:sync` intentionally refreshes the committed registry source from the pinned upstream revision. Review its source, CSS, and dependency diff before committing an update. The command needs network access to GitHub and the package registry; normal install/check/build does not need GitHub.

## Upstream projects

- Design system: `jubalm/augur-design-system`
- Design-system pin for this bootstrap: `8fa34fefc8b28360a61e14df967a2a710e7b252e`
- Migration/source site: `jubalm/augur-reboot-website`

Do not silently follow newer design-system `main`. Compare changes and deliberately update the pin in [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md) when adopting them.
