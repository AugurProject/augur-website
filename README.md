# Augur Website

This repository is the future home of the Augur website for [augur.net](https://augur.net). It is not yet the augur.net site. It uses the C3 Astro/Cloudflare scaffold and currently serves one landing page at `/`. For build, preview and deployment details, see the [deployment guide](docs/deployment.md).

## Documentation

The [documentation index](docs/README.md) links to implementation context and documentation guidance.

Use npm with `package-lock.json` and Node `>=22.23.4`:

```sh
npm ci
npm run dev -- --background
```

Manage the server with `npm run astro -- dev status`, `npm run astro -- dev logs`, and `npm run astro -- dev stop`. `npm run build` creates the production build; it does not deploy it.
