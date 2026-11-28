# Augur Website

Source for [www.augur.net](https://www.augur.net), the website for Augur Lituus, the next generation of Augur's oracle. It replaced `AugurProject/augur-reboot-website`; the old site's blog, whitepaper and fork guides keep their URLs.

Astro builds the site to static files in `dist/`. [pages.yml](.github/workflows/pages.yml) deploys `main` to GitHub Pages, which serves www.augur.net. [Hosting](docs/reference/hosting.md) covers what each host serves, including the optional Cloudflare Workers host.

## Setup

Requires Node `>=22.23.4` (`engines` in [package.json](package.json)) and npm.

```sh
npm ci
npm run dev -- --background
```

`npm ci` fetches `@augurproject/design-system` from a GitHub release tarball, so it needs access to github.com. Dev server options: `npm run astro -- dev --help`. Other scripts are in [package.json](package.json).

## Layout

- `src/pages/`: routes
- `src/data/`: shared facts, links and navigation
- `src/content/`: blog, fork guides, Augur v2 whitepaper and the Learn worked example
- `public/`: static files, including `llms.txt` and hand-written Markdown copies of the main pages
- `scripts/`: launch check, REP supply and X post refresh
- `workers/forms/`: the `augur-forms` Worker behind the forms
- `docs/`: documentation

## Documentation

Build, deploy and the launch check are in [deploy](docs/guides/deploy.md). [docs/README.md](docs/README.md) indexes the rest.
