/** The web lab's homepage-version helpers, pinned to Melo's version (`v2`). The ported sections keep the
 * lab's markup and branch on these: Home.astro passes `variant="v2"`, and the `v1` branches are what the
 * sections looked like before the port (left for cleanup). */
import {homeV2} from './homepage-v2';

export type HomeVariant = 'v1' | 'v2';
export type ReviewVariant = Exclude<HomeVariant, 'v1'>;

/** Melo's copy, or undefined for v1 (which keeps its copy in the components). */
export const homeCopy = (variant: HomeVariant) => variant === 'v2' ? homeV2 : undefined;
/** The wrapper's class: Melo's sheets scope every rule to `.home-v2`. */
export const pageClass = (variant: HomeVariant) => variant === 'v2' ? 'home-v2' : undefined;
/** Melo's design: scenes, product cards, four steps and doors. */
export const ownerVersion = (variant: HomeVariant) => variant !== 'v1';
