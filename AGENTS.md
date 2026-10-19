# Working on Augur Website

This is the canonical C3 Astro/Cloudflare codebase for the intended production
site. Current code and approved decisions govern development. Read the
[documentation index](docs/README.md) for project context; external prototypes
are not specifications or required dependencies.

Before editing files under `docs/`, read [docs/AGENTS.md](docs/AGENTS.md).

## Scope and implementation

- Keep changes within the request and preserve unrelated work. Do not modify
  sibling checkouts, commit, push, publish or deploy without a request.
- Preserve homepage copy unless edits are requested. Use “Augur Lituus” in full;
  write for traders and beginners and identify builder-specific language. Do not
  imply that holding REP requires reporting or challenging. Do not invent claims,
  partners, metrics, dates, addresses or guarantees; preserve unresolved review flags.
- Keep repeated facts and destinations in shared data. Use `src/data/links.ts`
  and `src/data/navigation.ts`; do not link to nonexistent local routes. Off-site
  actions use ↗; internal actions do not.
- Preserve the Navy/Paper/Green palette, dark scheme, official logo geometry and
  square corners. Use `src/styles/global.css` for shared tokens/utilities and
  shared Astro controls; keep specialized art/styles scoped.
- Keep Astro-rendered HTML with native browser enhancement. Adding hydration,
  React, an animation library, backend, wallet connection or third-party tracking
  requires a scoped request. Extend the explicit SVG registry in
  `src/components/primitives/Icon.astro`; preserve its hooks and license notice.
- Reuse `src/motion/` controllers. Preserve tab keyboard controls, labelled panels,
  native disclosures and mobile dialog focus behavior. Keep content usable without
  JavaScript, respect reduced motion and print, and pause ongoing scenes off-screen
  or hidden. Do not gate information behind animation.
- Give forms visible labels, autocomplete and associated errors/status feedback.
  With no newsletter provider configured, do not send data or claim subscription.

## Development

Use npm and `package-lock.json`; the Node requirement is in `package.json`.
Use `npm ci` for the locked install.

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

Equivalent npm commands are `npm run dev -- --background` and
`npm run astro -- dev stop`, `npm run astro -- dev status`,
`npm run astro -- dev logs`.

## Verification

Use `npm run build` when implementation changes warrant it. Do not add or run tests
unless requested. Check relevant responsive, keyboard/focus, no-JavaScript and
reduced-motion states; report unchecked behavior. A build does not establish
content approval, accessibility or deployment readiness.

## Astro documentation

Use the official Astro Docs MCP at `https://mcp.docs.astro.build/mcp` for
task-specific Astro documentation.

If Astro Docs MCP tools are unavailable, notify the user/client that the connection
is unavailable and provide the endpoint for setup. Do not install or change client configuration without a request. See the [official setup guide](https://docs.astro.build/en/guides/build-with-ai/).
