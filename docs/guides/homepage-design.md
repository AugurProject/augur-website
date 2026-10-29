# Homepage designs

Switch the live homepage design, preview another design, or retire one. Each design is a folder in `src/designs/` with its own `Home.astro`; the list of designs is [src/designs/index.ts](../../src/designs/index.ts), and the live one is `homeDesign` in [site.ts](../../src/data/site.ts). The build includes only the live design, so a design that isn't live never reaches `dist/`.

## Check every design

Run this with `npm run build` whenever a shared file changes (layout, header, footer, primitives, shared data, `global.css`, `src/motion/`):

1. `npm run check:designs`: builds the site once per design with `HOME_DESIGN=<name>`, into a temporary folder, and fails if any build fails or if a folder in `src/designs/` and the list in `index.ts` disagree.

## Switch the live design

1. In [site.ts](../../src/data/site.ts), set `homeDesign` to the design's name.
2. `npm run build` and `npm run check:designs`.
3. Commit, and merge through the normal review. The merge to `main` deploys it.

Never set `HOME_DESIGN` in the Cloudflare dashboard's build variables: it would change the production build outside review.

## Preview another design

1. Locally, without changing `site.ts`: `HOME_DESIGN=melo npm run dev`, or `HOME_DESIGN=melo npm run build` then `npx astro preview`.
2. For a shareable Cloudflare preview of `augur-website-next`, from a clean build:

   ```sh
   HOME_DESIGN=melo npm run build
   npx wrangler preview --name home-melo
   ```

   `wrangler preview` (open beta in Wrangler 4.151) creates a named Preview deployment of the Worker and prints its URL; it does not change the production deployment. It needs Cloudflare access to the Worker's account. `HOME_DESIGN` must be set for the build, not passed as `--var`: the homepage is static, so a Worker variable has no effect on it.
3. Delete the preview when the review is done: `npx wrangler preview delete` (see `npx wrangler preview delete --help`).
4. Run `npm run build` again before any other deploy, so `dist/` holds the live design.

Where production runs is still open ([open decisions](../records/open-decisions.md#deployment)); this preview applies to the Cloudflare Worker.

## Retire a design

1. Delete its folder in `src/designs/` and its entry in [index.ts](../../src/designs/index.ts). Remove its name from the `homeDesign` type in [site.ts](../../src/data/site.ts).
2. `npm run build` and `npm run check:designs`.
3. If anything else breaks, a file the retired design owned was in a shared place: move the code that still needs it into the remaining design, or delete it.
