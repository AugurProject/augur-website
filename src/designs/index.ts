/** Homepage designs, each a folder here with its own `Home.astro`. The build resolves
 * `virtual:home-design` to the live design's `Home.astro` (astro.config.mjs), so the other designs
 * never enter the build and `/` carries only the live design's markup, CSS and JS. Remove a design by
 * deleting its folder and its entry here. */
export const designs = ['current', 'melo'] as const;
export type HomeDesign = (typeof designs)[number];
