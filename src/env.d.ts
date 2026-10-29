type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
	interface Locals extends Runtime {}
}

// The live homepage design's Home.astro, resolved at build time (astro.config.mjs, src/designs/index.ts).
declare module 'virtual:home-design' {
	const Home: import('astro/runtime/server/index.js').AstroComponentFactory;
	export default Home;
}
