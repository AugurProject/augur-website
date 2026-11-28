# Augur Website

This repository is the live Augur website, [www.augur.net](https://www.augur.net). The site presents Augur Lituus, the next generation of Augur's oracle. It replaced `AugurProject/augur-reboot-website` and keeps that site's blog, whitepaper and fork guides at their old URLs.

The site is an Astro build of static files, with no server code. The [Pages workflow](.github/workflows/pages.yml) deploys `main` to this repository's GitHub Pages site, which serves www.augur.net. Cloudflare Workers can serve the same build ([wrangler.jsonc](wrangler.jsonc)). See [hosting](docs/reference/hosting.md) for what each host serves.

## Run it locally

You need Node `>=22.23.4` (the minimum for the Astro version in `package-lock.json`) and npm. Install from the lockfile and start the dev server:

```sh
npm ci
npm run dev -- --background
```

`npm ci` downloads `@augurproject/design-system` as a release tarball from [AugurProject/augur-design-system](https://github.com/AugurProject/augur-design-system) on GitHub, not from the npm registry. To upgrade it, see [update the design system](docs/guides/update-design-system.md).

To manage the dev server, run `npm run astro -- dev --help`.

## Scripts

- `npm run build`: builds the site to `dist/`. Without `PUBLIC_FORMS_URL`, the newsletter and contact forms stay offline ([build](docs/guides/deploy.md#build)).
- `npm run preview`: builds the site and serves `dist/` locally.
- `npm run check:launch -- <baseURL>`: checks a served deployment and exits 1 if any row fails ([check a deployment](docs/guides/deploy.md#check-a-deployment)).
- `npm run supply`: reads the REP supply on Ethereum mainnet and rewrites `public/api/supply/` ([refresh the REP supply snapshot](docs/guides/deploy.md#refresh-the-rep-supply-snapshot)).
- `npm run refresh:x-posts`: refreshes the X post excerpts in `src/data/x-post-snapshots.json` ([refresh X post snapshots](docs/guides/refresh-x-posts.md)).

## Where things live

- `src/pages/`: routes, including the generated `/faq.md` and `/rss.xml`.
- `src/data/`: shared facts, links and navigation (`links.ts`, `navigation.ts`) and the FAQ entries.
- `src/content/`: the blog, fork guides, Augur v2 whitepaper and the Learn worked example, in Markdown and MDX.
- `public/`: files served as-is, including `llms.txt` and the hand-written `.md` copies of the listed pages ([Markdown pages](docs/reference/markdown-pages.md)).
- `scripts/`: the code behind `check:launch`, `supply` and `refresh:x-posts`.
- `workers/forms/`: the separate `augur-forms` Worker for the forms ([README](workers/forms/README.md)).
- `docs/`: guides, reference, explanation and records ([index](docs/README.md)).

## Deploy

Merge one pull request at a time. Before you merge the next, wait until the deploy is live and `npm run check:launch` passes against production ([one deploy at a time](docs/guides/deploy.md#one-deploy-at-a-time)). For setup, recovery and the forms Worker, see [deploy](docs/guides/deploy.md).
