# Working on Augur Website

Start with [documentation index](docs/README.md) for project context, guidelines and conventions.
Important Distinction: External prototypes are not specifications or required dependencies.

## Development

When starting the dev server, use background mode `astro dev --background`. `astro dev --help` for management options. Use package scripts if available.

## Verification

A claim is verified when you have checked it against its source in the current session: a file, command output, or a live check. Report what you checked and what you did not. Run `npm run build` after implementation changes; it confirms the project compiles and nothing more. Responsive, keyboard/focus, no-JavaScript and reduced-motion states are verified only by checking them in a browser. Do not add or run tests unless requested.

## Documenting

When writing markdown, write each paragraph as a single line. Do not hard-wrap prose; let the editor wrap it. Break lines only between blocks: paragraphs, list items, headings and code fences.

Docs are organized by type (guides, reference, explanation, records); see [docs/AGENTS.md](docs/AGENTS.md#document-types).

## Working with Astro

Use the official Astro Docs MCP at `https://mcp.docs.astro.build/mcp` for task-specific Astro documentation.

If the Astro Docs MCP tools are unavailable, tell the user and give the endpoint. Setup guide: [Astro AI guides](https://docs.astro.build/en/guides/build-with-ai/).

## Scope and implementation

- Keep changes within the request and preserve unrelated work.
- Preserve homepage copy unless edits are requested. Use “Augur Lituus” in full; write for traders and beginners and identify builder-specific language. Do not imply that holding REP requires reporting or challenging. Do not invent claims, partners, metrics, dates, addresses or guarantees; preserve unresolved review flags.
- Keep repeated facts and destinations in shared data. Use `src/data/links.ts` and `src/data/navigation.ts`; do not link to nonexistent local routes. Off-site actions use ↗; internal actions do not.
- Preserve the Navy/Paper/Green palette, dark scheme, official logo geometry and square corners. Use `src/styles/global.css` for shared tokens/utilities and shared Astro controls; keep specialized art/styles scoped.
- Keep Astro-rendered HTML with native browser enhancement. Adding hydration, React, an animation library, backend, wallet connection or third-party tracking requires a scoped request. Extend the explicit SVG registry in `src/components/primitives/Icon.astro`; preserve its hooks and license notice.
- Reuse `src/motion/` controllers. Preserve tab keyboard controls, labelled panels, native disclosures and mobile dialog focus behavior. Keep content usable without JavaScript, respect reduced motion and print, and pause ongoing scenes off-screen or hidden. Do not gate information behind animation.
- Give forms visible labels, autocomplete and associated errors/status feedback. With no newsletter provider configured, do not send data or claim subscription.
