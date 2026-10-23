// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
  // Keep false. Otherwise the Cloudflare adapter enables a KV session binding,
  // which fails the Workers preview build with error 10021 (missing namespace_id).
  session: false,
  vite: { plugins: [tailwindcss()] }
});
