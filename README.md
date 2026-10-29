# Augur Website

The future home of the Augur website [augur.net](https://augur.net).

## Documentation

The [documentation index](docs/README.md) links to implementation context and documentation guidance.

## Development

Use npm with `package-lock.json` and Node `>=22.23.4`:

```sh
npm ci
npm run dev -- --background
```

See `npm run astro -- dev --help` for server management options.

## Build

`npm run build`, then `npm run check:designs` to build every homepage design.
