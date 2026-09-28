# Deployment example: Cloudflare Workers

Status: **example only.** This repository has no deployment configuration,
workflow, or credentials, and it is expected to be transferred. The new owner
decides the account, Worker name, domain, and CI. Production deployment and
DNS changes need explicit maintainer direction (`AGENTS.md`).

The site builds to portable static files in `dist/` (`astro.config.mjs`,
`output: "static"`). A Cloudflare Worker with **static assets** serves them;
no Worker script is needed yet.

Cloudflare references (checked 2026-09-28):
[static assets](https://developers.cloudflare.com/workers/static-assets/),
[`wrangler deploy`](https://developers.cloudflare.com/workers/wrangler/commands/workers/),
[Previews](https://developers.cloudflare.com/workers/previews/).

## One-off manual deploy (interactive)

From a machine logged in with `npx wrangler login`:

```bash
bun install --frozen-lockfile
bun run build
npx wrangler deploy dist
```

Passing a directory deploys it as a static-assets Worker. Wrangler prompts for
a name and prints a `*.workers.dev` URL. Cloudflare documents that this
positional directory form **only works in interactive mode**, not CI. The URL
is public. Placeholder routes are `noindex`, but anyone with the link can open
them. Remove the test Worker afterwards with `npx wrangler delete --name <name>`.

## Repeatable deploy (config file)

For CI or repeat deploys, add a `wrangler.jsonc` at the repository root:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "augur-dot-net",
  "compatibility_date": "2026-09-28",
  "assets": {
    "directory": "./dist",
    // Serve dist/404.html with a real 404 status for unknown paths; never
    // fall back to the homepage (docs/MIGRATION.md §404/recovery).
    "not_found_handling": "404-page"
  }
}
```

Then run `bun run build && npx wrangler deploy`. In CI, set
`CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`, pin Wrangler as a dev
dependency, and never expose the token to pull requests from forks.

**API token.** Use a user-owned custom token scoped to the target account. For
static assets alone, the expected minimum is **Account › Workers Scripts ›
Edit** and **Account › Account Settings › Read**. Cloudflare does not publish
an exact minimum; its Workers Builds default token also grants KV, R2, route
and user-detail scopes. Confirm on first use. An
[open workers-sdk issue](https://github.com/cloudflare/workers-sdk/issues/15797)
reports `wrangler preview` failing with an account-owned Workers Editor token.

**Per-PR previews** (`wrangler preview`, Wrangler 4.135.0+) are optional. See
Cloudflare's GitHub Actions example linked above.

## Before production

These are launch work (M5), not part of this example:

- the two retired supply APIs must return **410 Gone** with a machine-readable
  message (`docs/MIGRATION.md`). That needs a small Worker script (`main`) in
  front of the assets, or equivalent edge rules. A redirect to HTML is not
  acceptable;
- the explicit legacy redirect table (`/mission/`, `/team/`, `/whitepapers/`,
  …);
- canonical host, sitemap/robots, and custom domain/DNS cutover.
