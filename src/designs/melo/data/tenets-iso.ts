/** The isometric scenes of the three Why Augur cards on /2/ (owner, 22 Oct 2026: "Let's go with isometric for
 * all three"; each scene then chosen on the Tenet Motion Options board): Two roads for Permissionless
 * (two-roads.ts), Middleman crumbles for Trustless (middleman.ts) and the Catapult for Robust (catapult.ts).
 * Each module builds its drawing at the resting frame and its loop's keyframes with iso-kit.ts. IsoScene.astro
 * draws a scene; tenets-iso-v2.js plays every scene's tracks, which review-inline.ts writes into it. */
import { twoRoads } from './two-roads';
import { middleman } from './middleman';
import { catapult } from './catapult';
export type { SvgNode } from './iso-kit';

export const isoScenes = { roads: twoRoads, middleman, catapult };
export type IsoKind = keyof typeof isoScenes;
// Every scene's tracks by kind, as tenets-iso-v2.js reads them.
export const isoTracks = Object.fromEntries(Object.entries(isoScenes).map(([kind, scene]) => [kind, scene.tracks]));
