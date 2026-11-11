/** The isometric scenes of the three Why Augur cards: Two roads for Permissionless
 * (two-roads.ts), Middleman crumbles for Trustless (middleman.ts) and the Catapult for Robust (catapult.ts).
 * Each module builds its drawing at the resting frame and its loop's keyframes with kit.ts. IsoScene.astro
 * draws a scene; scene-loop.js plays every scene's tracks, which Tenets.astro writes into the page as JSON. */
import { twoRoads } from './two-roads';
import { middleman } from './middleman';
import { catapult } from './catapult';
export type { SvgNode } from '@/lib/iso/kit';

export const isoScenes = { roads: twoRoads, middleman, catapult };
export type IsoKind = keyof typeof isoScenes;
// Every scene's tracks by kind, as scene-loop.js reads them.
export const isoTracks = Object.fromEntries(Object.entries(isoScenes).map(([kind, scene]) => [kind, scene.tracks]));
