# Augur Website

The Astro source of the live Augur website, [www.augur.net](https://www.augur.net). It replaces `AugurProject/augur-reboot-website`, the repository behind the previous site, and keeps that site's URLs working. It builds to static files in `dist/` with no server code. The [Pages workflow](.github/workflows/pages.yml) deploys `main` to this repository's GitHub Pages site, which serves www.augur.net; the same build can also be served by Cloudflare Workers static assets ([wrangler.jsonc](wrangler.jsonc)). What each host serves and how to deploy are in [hosting](docs/reference/hosting.md) and [deploy](docs/guides/deploy.md).

## Requirements

- Node `>=22.23.4`, the minimum of the Astro version in `package-lock.json`.
- npm with `package-lock.json`: install with `npm ci`.
- Access to GitHub: `npm ci` downloads `@augurproject/design-system` as a release tarball from [AugurProject/augur-design-system](https://github.com/AugurProject/augur-design-system), not from the npm registry. Upgrading it is in [update the design system](docs/guides/update-design-system.md).

## Local development

```sh
npm ci
npm run dev -- --background
```

See `npm run astro -- dev --help` for server management options.

## Scripts

- `npm run build`: builds the site to `dist/`. Without `PUBLIC_FORMS_URL` the newsletter and contact forms stay offline ([deploy](docs/guides/deploy.md#build)).
- `npm run preview`: builds, then serves `dist/` locally.
- `npm run check:launch -- <baseURL>`: checks a served deployment (redirects, headers, metadata, supply endpoints and more) and exits 1 if any row fails ([check a deployment](docs/guides/deploy.md#check-a-deployment)).
- `npm run supply`: reads the REP supply on Ethereum mainnet and rewrites `public/api/supply/` ([refresh the REP supply snapshot](docs/guides/deploy.md#refresh-the-rep-supply-snapshot)).
- `npm run refresh:x-posts`: refreshes the checked-in X post excerpts in `src/data/x-post-snapshots.json` ([refresh X post snapshots](docs/guides/refresh-x-posts.md)).

## Project layout

- `src/pages/`: routes, including the generated `/faq.md`, `/rss.xml` and the Augur v2 whitepaper's Markdown endpoints.
- `src/data/`: shared facts, links, navigation and page data, such as `links.ts`, `navigation.ts` and the FAQ entries in `faq/`.
- `src/content/`: Markdown and MDX sources: the blog, fork guides and Augur v2 whitepaper collections, and the Learn worked example.
- `public/`: static files served as-is, including the hand-written `.md` copy of each page, `llms.txt`, `_headers`, `_redirects` and the REP supply endpoints in `api/supply/` ([markdown pages](docs/reference/markdown-pages.md)).
- `scripts/`: `check-launch.mjs`, `generate-supply.mjs` and `refresh-x-posts.mjs`, behind the scripts above.
- `workers/forms/`: the separate `augur-forms` Worker behind the newsletter and contact forms, with its own [README](workers/forms/README.md).
- `docs/`: project documentation.

## Deploy and launch check

Merge one pull request at a time, wait for its deploy and run `npm run check:launch` against production before merging the next. Steps, the GitHub Pages and Cloudflare setup and recovery are in [deploy](docs/guides/deploy.md).

## Documentation

The [documentation index](docs/README.md) lists the guides, references, explanations and records for this project.
