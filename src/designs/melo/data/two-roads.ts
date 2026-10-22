/** The /2/ Permissionless card: Two roads in cubes (owner, 22 Oct 2026: chosen over flat-square and figure
 * versions on the Tenet Motion Options board, then "lgtm" for v2).
 * - At the back, a gated road: a line of cubes waits at a booth and a barrier. Once a loop the barrier lifts
 *   in its own upright plane, the front cube drives off, the rest step up and a new cube joins the back.
 * - In front, the Augur Lituus road, paved in the brand's deep accent green (--augur-color-accent-deep): cubes
 *   glide past at a steady pace, and each turns Green as
 *   it crosses a finish line of Paper and Navy squares, with a Green pulse on the ground.
 * The Augur glyph, painted small where the open road begins, says whose road it is; there are no words.
 * iso-kit.ts has the drawing and keyframe rules shared with the other two cards. The keyframes are exact: steady
 * speeds, no cube ever trades places with another (each is drawn at its true depth), instant swaps only where
 * the frames just before and after are identical, and the loop's end matches its start shape for shape. */
import { CYCLE, COS, E, M, P, block, quad, node, plane, rect, keyframes, fit, mix, r2, card, navy, mist, paper, green, deep, lane, screen, mark, type SvgNode } from './iso-kit';

const { tracks, animate, loop } = keyframes('two-roads');

/* The scene ------------------------------------------------------------------ */
const x0 = 8, x1 = 132, L = x1 - x0, FIN = 98, Y = 51, S = 10, C = 22 / 8;
const D = (a: number, b: number, y = 5) => { const p = P(a, y), q = P(b, y); return { x: q[0] - p[0], y: q[1] - p[1] }; };
const world: SvgNode[] = [];
// The floor, the gated road with grey marks, and the Augur Lituus road in deep accent green with Green marks.
world.push(block({ x: x0, y: -22, z: -4, w: L, d: 94, h: 4 }, M.base));
world.push(quad(x0, -6, L, 22, { fill: lane }));
for (let x = x0 + 6; x < x1 - 6; x += 16) world.push(quad(x, 4.4, 7, 1.2, { fill: mark }));
world.push(quad(x0, 40, L, 22, { fill: deep }));
for (let x = x0 + 22; x < x1 - 6; x += 16) if (x + 7 < FIN - C - 2 || x > FIN + C + 2) world.push(quad(x, 50.4, 7, 1.2, { fill: green }));
// The finish line: two rows of squares, Paper and Navy, across the Augur Lituus road.
for (let r = 0; r < 2; r++) for (let k = 0; k < 8; k++) world.push(quad(FIN - C + r * C, 40 + k * C, C, C, { fill: (r + k) % 2 ? paper : navy }));
// The Augur glyph, painted small where the Augur Lituus road begins, in place of its first Green mark (owner,
// 22 Oct 2026: "the glyph gotta be extremely small make an exception like add in the street"; an exception to
// the brand's 50 px minimum). IsoScene.astro nests the supplied reversed master's
// paths unchanged; this lays them flat on the road turned to face the viewer, as a decal on an isometric floor
// shows: upright, its width times √1.5 and its height times √0.5. Cubes drive over it.
{
  const s = 14 / 121, [cx, cy] = P(20, Y), wide = Math.SQRT2 * COS * s, flat = Math.SQRT1_2 * s;
  world.push(node('g', { class: 'roads-glyph', transform: `matrix(${[wide, 0, 0, flat, cx - 54 * wide, cy - 60.5 * flat].map(v => Math.round(v * 1e5) / 1e5).join(' ')})` }));
}
// The gatekeeper's booth (seen through its window) and the barrier's post.
{
  const b = { x: 88, y: -20, z: 0, w: 13, d: 10, h: 15 }, ww = b.w - 5, cx = 2.5 + ww / 2;
  world.push(block(b, M.device), plane('left', b.x, b.y + b.d, b.z + b.h, [rect(2.5, 3, ww, 7, screen), node('path', { d: `M${r2(cx - 3.4)} 10a3.4 2.6 0 0 1 6.8 0Z`, fill: mix(mist, card, .8) }), node('circle', { cx: r2(cx), cy: 5.4, r: 1.9, fill: mist })]), block({ x: b.x - 1.5, y: b.y - 1.5, z: b.z + b.h, w: b.w + 3, d: b.d + 3, h: 1.6 }, M.slab));
  world.push(block({ x: 80, y: -12, z: 0, w: 3, d: 3, h: 11 }, M.device));
}
// A cube with its square shadow, standing on (x, y).
const cube = (x: number, y: number, m = M.mist) => node('g', {}, [quad(x - 3.5, y - 3.5, 10, 10, { fill: navy, opacity: .45 }), block({ x: x - S / 2, y: y - S / 2, z: 0, w: S, d: S, h: S }, m)]);
// The line, drawn back to front. When the barrier lifts, the front cube drives off, the others step up and a
// new cube joins at the back; at 11.5 s, with the line standing still, each cube returns to its starting
// place in the same instant, so the loop ends on its first frame and no cube is ever drawn at a wrong depth.
const spots = [66, 54, 42, 30], t = 4300, SWAP = 11500;
const fresh = cube(spots[3], 5), [c3, c2, c1, c0] = [3, 2, 1, 0].map(i => cube(spots[i], 5));
world.push(fresh, c3, c2, c1, c0);
[c1, c2, c3].forEach((g, i) => { const d = D(spots[i + 1], spots[i]), a = t + 600 + i * 150; animate(g, `roads-wait-${i + 1}`, [[a, { x: 0, y: 0 }], [a + 800, { x: d.x, y: d.y }, E.cross], [SWAP, { x: d.x, y: d.y }], [SWAP, { x: 0, y: 0 }]]); });
const back = D(spots[3], x0 + 2), te = 7600;
animate(fresh, 'roads-join', [[te, { o: 0, x: back.x, y: back.y }], [te + 250, { o: 1 }], [te + 1300, { x: 0, y: 0 }, E.cross], [SWAP, { o: 1, x: 0, y: 0 }], [SWAP, { o: 0, x: back.x, y: back.y }]], { o: 0, x: back.x, y: back.y });
// The front cube pulls away, passes under the lifted barrier and drives off. Just past the barrier it hands over
// to a twin drawn in front of the barrier, in the same instant and place.
const v = 32, p70 = D(66, 70), p86 = D(66, 86), p116 = D(66, 116.6), p126 = D(66, 126), th = t + 450 + 16 * v, tz = th + 40 * v;
animate(c0, 'roads-front', [[t, { x: 0, y: 0 }], [t + 450, { x: p70.x, y: p70.y }, E.in], [th, { x: p86.x, y: p86.y }, E.lin], [th, { o: 0 }], [SWAP, { o: 0 }], [SWAP, { o: 1, x: 0, y: 0 }]]);
// The barrier: a striped arm on the post, lifting in its own upright plane.
const arm = node('g', {}, [rect(0, -1.1, 26, 2.2, paper), ...[3, 11, 19].map(u => rect(u, -1.1, 4, 2.2, mist))]);
world.push(plane('right', 81.5, 17, 9.5, [arm]));
animate(arm, 'roads-arm', [[3600, { r: 0 }], [4450, { r: 80 }, E.cross], [5800, { r: 80 }], [6650, { r: 0 }, E.cross]]);
const c0b = cube(spots[0], 5);
world.push(c0b);
animate(c0b, 'roads-away', [[th, { o: 0, x: p86.x, y: p86.y }], [th, { o: 1 }], [tz - 300, { x: p116.x, y: p116.y }, E.lin], [tz, { o: 0, x: p126.x, y: p126.y }, E.lin]], { o: 0, x: p86.x, y: p86.y });
// The Augur Lituus road: five cubes glide past at a steady pace and turn Green at the finish line, each with a
// pulse on the ground. Their phases leave the resting frame with one cube on its way and one Green past the line.
const n = 5, xs = [12, 128], dur = (xs[1] - xs[0]) * 42, cross = (FIN - xs[0]) / (xs[1] - xs[0]) * dur, end = D(xs[0], xs[1], Y);
const rings = Array.from({ length: n }, () => quad(FIN - 6, Y - 6, 12, 12, { fill: 'none', stroke: green, 'stroke-width': 1.2 }));
world.push(...rings);
for (let k = 0; k < n; k++) {
  const T0 = k * CYCLE / n - 4400, at = (f: number) => ({ x: end.x * f, y: end.y * f });
  const lit = block({ x: xs[0] - S / 2, y: Y - S / 2, z: 0, w: S, d: S, h: S }, M.green);
  const g = node('g', {}, [quad(xs[0] - 3.5, Y - 3.5, 10, 10, { fill: navy, opacity: .45 }), block({ x: xs[0] - S / 2, y: Y - S / 2, z: 0, w: S, d: S, h: S }, M.mist), lit]);
  world.push(g);
  loop(g, `roads-car-${k}`, T0, [[0, { ...at(0), o: 0 }], [300, { ...at(300 / dur), o: 1 }], [dur - 300, { ...at(1 - 300 / dur), o: 1 }], [dur, { ...at(1), o: 0 }], [dur + 1, { ...at(0), o: 0 }]]);
  loop(lit, `roads-green-${k}`, T0, [[0, { o: 0 }], [cross - 30, { o: 0 }], [cross + 220, { o: 1 }], [dur, { o: 1 }], [dur + 1, { o: 0 }]]);
  loop(rings[k], `roads-pulse-${k}`, T0, [[0, { o: 0, s: 1 }], [cross, { o: 0, s: 1 }], [cross + 80, { o: .85, s: 1.1 }], [cross + 700, { o: 0, s: 2.2 }], [cross + 701, { o: 0, s: 1 }]]);
}

export const twoRoads = { world, transform: fit(world), tracks };
