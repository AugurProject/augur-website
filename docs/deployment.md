# Deployment

The site builds to static files in `dist/`. Any static host can serve them.

## Build

1. `npm ci`
2. `npm run build`: writes the output to `dist/`.
3. `npm run preview`: builds and serves the output locally.

## Deploy to Cloudflare Workers

Worker name: `augur-website` (from `wrangler.jsonc`).

1. In the Cloudflare dashboard, connect the Worker to this repository through the Git integration.
2. Set the production branch to `main`.
3. Set the preview build command to `npx wrangler preview`.
4. Set the deploy command to `npx wrangler deploy`.

Other branches and pull requests then get preview builds.

To deploy from a local machine, run `npm run deploy`. It requires Cloudflare access.

`astro.config.mjs` must set `session: false` on the Cloudflare adapter. Without it, the adapter's default KV session binding fails the Workers preview build with error 10021 (missing `namespace_id`).

## Before going public

- Choose the production deployment target.
- Configure the custom domain and routes.
- Set the public hostname and response-header policy.
