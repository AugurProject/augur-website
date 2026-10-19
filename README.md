# Augur Website

[augur.net](https://augur.net)

This repository is the canonical codebase for the intended production Augur site.
It uses the C3 Astro/Cloudflare scaffold and currently serves one landing page at `/`.
Production deployment has not been verified.

## Documentation

The [documentation index](docs/README.md) links to implementation context and documentation guidance.

Use npm with `package-lock.json` and Node `>=22.22.0`:

```sh
npm ci
npm run dev -- --background
```

Manage the server with `npm run astro -- dev status`,
`npm run astro -- dev logs`, and `npm run astro -- dev stop`.
`npm run build` creates the production build; it does not deploy it.
