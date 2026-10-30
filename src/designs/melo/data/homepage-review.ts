/** The web lab's homepage-version helpers, pinned to Melo's version (`v2`), the lab's homepage since
 * 29 Oct 2026. The lab's other versions (Ryan's, Ryan + Augus's) and its version switch are review-only and
 * not ported. The ported sections keep the lab's markup and read Melo's copy through `homeCopy`; Home.astro
 * passes `variant="v2"`. */
import {homeV2} from './homepage-v2';

export type ReviewVariant = 'v2';

/** Melo's copy. */
export const homeCopy = (_variant: ReviewVariant) => homeV2;
/** The wrapper's class: Melo's sheets scope every rule to `.home-v2`. */
export const pageClass = (_variant: ReviewVariant) => 'home-v2';
