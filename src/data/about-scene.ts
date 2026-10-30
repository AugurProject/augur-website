/** The About hero's scene (owner, 30 Oct 2026: "layers it is. polish a little bit then add it there", picked from
 * five isometric options on the About hero scenes board). Augur Lituus comes next, on top of Augur's earlier
 * versions: a dark base, a Mist layer and the Green block, a stepped stack in the Why Augur cards' kit (iso-kit.ts),
 * drawn at the kit's largest scale so its lines weigh what theirs do. Once a loop the Green block lifts off and is
 * set down again; while it is up, its footprint shows on the layer below. The resting frame, which no JavaScript,
 * reduced motion and print show, is the finished stack. There are no words. AboutScene.astro draws it and plays
 * the track on the site's 12 s cycle. It draws with Melo's iso kit, which lives in the melo homepage design. */
import { CYCLE, E, M, P, block, quad, node, keyframes, shift, mix, r2, mist, card, paper, navy, type Box, type Material, type Point, type SvgNode } from '../designs/melo/data/iso-kit';

const { tracks, animate } = keyframes('about');
// A shade darker than the kit's device grey, so the Mist layer's shaded face stays apart from the base's top.
const dark: Material = { top: mix(mist, card, .28), left: mix(mist, card, .2), right: mix(mist, card, .12), rim: mix(paper, mix(mist, card, .28), .3) };
const base: Box = { x: 0, y: 0, z: 0, w: 75, d: 75, h: 12.5 };
const layer: Box = { x: 12.5, y: 12.5, z: 12.5, w: 50, d: 50, h: 12.5 };
const top: Box = { x: 25, y: 25, z: 25, w: 25, d: 25, h: 15 };
// How far the Green block rises, in world units.
const LIFT = 20;

const lifted = node('g', {}, [block(top, M.green)]);
const world: SvgNode[] = [
  block(base, dark),
  block(layer, M.mist),
  quad(top.x, top.y, top.w, top.d, { fill: navy, opacity: .35 }, top.z),
  lifted,
];
// At 1 s it lifts over 600 ms, waits 400 ms and is set down over 600 ms; the other 10.4 s rest on the stack.
animate(lifted, 'about-top', [[1000, {}], [1600, shift(0, 0, LIFT), E.cross], [2000, {}], [2600, { x: 0, y: 0 }, E.out]]);

// The box is the resting stack at the kit's 1.75 cap, 2 px clear all round; the lift rises above it.
const K = 1.75, PAD = 2;
const corners = ({ x, y, z, w, d, h }: Box): Point[] => [0, 1].flatMap(i => [0, 1].flatMap(j => [0, 1].map(k => P(x + i * w, y + j * d, z + k * h))));
const all = [base, layer, top].flatMap(corners), xs = all.map(p => p[0]), ys = all.map(p => p[1]);
const [ax, ay] = [Math.min(...xs), Math.min(...ys)];

export const aboutScene = {
  world,
  motion: { cycle: CYCLE, tracks },
  width: Math.ceil((Math.max(...xs) - ax) * K + 2 * PAD),
  height: Math.ceil((Math.max(...ys) - ay) * K + 2 * PAD),
  transform: `matrix(${K} 0 0 ${K} ${r2(PAD - ax * K)} ${r2(PAD - ay * K)})`,
};
