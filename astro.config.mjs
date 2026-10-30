// @ts-check
import { defineConfig } from 'astro/config';
import { appendFileSync, existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
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

// The built client folder (dist/client, or <outDir>/client for check:designs), set once the config is final.
let clientDir = '';

/** Workers static assets answer `/about` with a temporary 307 to `/about/`. This appends a permanent
 * `/about /about/ 301` rule to `_redirects` for every folder with an index.html (pages, and the supply
 * endpoints in public/api/supply), after the hand-written rules in public/_redirects, which win.
 * @type {import('astro').AstroIntegration} */
const permanentTrailingSlash = {
  name: 'permanent-trailing-slash',
  hooks: {
    'astro:config:done': ({ config }) => { clientDir = fileURLToPath(config.build.client).replace(/[\\/]$/, ''); },
    'astro:build:done': () => {
      const file = join(clientDir, '_redirects');
      const existing = existsSync(file) ? readFileSync(file, 'utf8') : '';
      const sources = new Set(existing.split('\n').map(line => line.trim().split(/\s+/)[0]).filter(source => source && !source.startsWith('#')));
      const folders = readdirSync(clientDir, { recursive: true, withFileTypes: true })
        .filter(entry => entry.isFile() && entry.name === 'index.html' && entry.parentPath !== clientDir)
        .map(entry => `/${entry.parentPath.slice(clientDir.length).split(/[\\/]/).filter(Boolean).join('/')}`)
        .filter(path => !sources.has(path) && !sources.has(`${path}/`)).sort();
      // Workers static assets allow 2,000 static redirects; fail here rather than lose rules at deploy.
      if (sources.size + folders.length > 2000) throw new Error(`_redirects would hold ${sources.size + folders.length} rules; the limit is 2,000.`);
      appendFileSync(file, `${existing && !existing.endsWith('\n') ? '\n' : ''}# Permanent trailing-slash redirects, added at build (astro.config.mjs).\n${folders.map(path => `${path} ${path}/ 301\n`).join('')}`);
    },
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
  integrations: [mdx(), sitemap(), permanentTrailingSlash],
  vite: { plugins: [homeDesignPlugin, tailwindcss()] }
});
