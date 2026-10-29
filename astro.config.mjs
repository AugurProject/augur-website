// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';

import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

import { site } from './src/data/site.ts';
import { designs } from './src/designs/index.ts';

// The live homepage design: `site.homeDesign`, unless `HOME_DESIGN` names another one for this build.
const homeDesign = process.env.HOME_DESIGN || site.homeDesign;
if (!(/** @type {readonly string[]} */ (designs)).includes(homeDesign)) throw new Error(`Unknown HOME_DESIGN "${homeDesign}". Designs: ${designs.join(', ')}.`);

/** Resolves `virtual:home-design` to the live design's Home.astro at build time. A dynamic import would
 * still bundle every design and link their CSS into `/`. @type {import('vite').Plugin} */
const homeDesignPlugin = {
  name: 'home-design',
  enforce: 'pre',
  resolveId(id) {
    if (id === 'virtual:home-design') return fileURLToPath(new URL(`./src/designs/${homeDesign}/Home.astro`, import.meta.url));
  },
};

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
  // Keep false. Otherwise the Cloudflare adapter enables a KV session binding,
  // which fails the Workers preview build with error 10021 (missing namespace_id).
  session: false,
  vite: { plugins: [homeDesignPlugin, tailwindcss()] }
});
