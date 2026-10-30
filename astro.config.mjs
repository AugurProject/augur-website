// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';

import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

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
  // Canonical origin (www stays canonical; the apex redirects to it). Used for canonical URLs, the sitemap and RSS.
  site: 'https://www.augur.net',
  adapter: cloudflare(),
  // Keep false. Otherwise the Cloudflare adapter enables a KV session binding,
  // which fails the Workers preview build with error 10021 (missing namespace_id).
  session: false,
  // Ported content from the old augur.net: MDX for the blog and fork guides, KaTeX math for the whitepaper.
  markdown: { remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex] },
  integrations: [mdx(), sitemap()],
  vite: { plugins: [homeDesignPlugin, tailwindcss()] }
});
