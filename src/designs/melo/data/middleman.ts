/** The /2/ Trustless card: Middleman crumbles (owner, 22 Oct 2026: "maybe in trustless we can have like a bunch of
 * blocks communicating to each other without a central intermediary or something that breaks the central
 * intermediary", then "we using the middleman crushes", chosen from six network versions on the Tenet Motion
 * Options board).
 * - Six blocks on a ring, joined by dashed links on the floor, talk directly. A Green message slides along a link,
 *   under both blocks, so it shows only on its way; it lights its link, then the top of the block it reaches, with
 *   a Green outline pulse at that block's foot.
 * - A tower of cubes drops into the middle and links to every block; the direct links dim. Messages now go through
 *   the tower: in Green, a wait, and out grey, lighting nothing.
 * - The tower cracks and crumbles, its cubes falling, shrinking and fading. The links come back and the blocks
 *   talk directly again.
 * The resting frame, which no JavaScript, reduced motion and print show, is the ring with no one in the middle.
 * There are no words. iso-kit.ts has the drawing and keyframe rules shared with the other two cards. */
import { E, M, P, block, quad, node, keyframes, fit, shift, navy, green, pewter, mark, type Key, type Point, type SvgNode } from './iso-kit';

const { tracks, animate } = keyframes('middleman');
const world: SvgNode[] = [];
type Spot = { at: Point; s: number; hits: number[]; top?: SvgNode };

// Six spots on a ring around (50, 50), the first at the view's left edge, and the middle.
const ring = Array.from({ length: 6 }, (_, k): Point => { const a = (135 + 60 * k) * Math.PI / 180; return [50 + 34 * Math.cos(a), 50 + 34 * Math.sin(a)]; });
const hub: Spot = { at: [50, 50], s: 12, hits: [] };
// A dashed link on the floor between two spots: squares centred along it, stopping 7.5 short of each end.
function dashes([ax, ay]: Point, [bx, by]: Point, fill = mark): SvgNode {
  const L = Math.hypot(bx - ax, by - ay), ux = (bx - ax) / L, uy = (by - ay) / L, inset = 7.5, step = 4, size = 1.5;
  const n = Math.max(1, Math.floor((L - 2 * inset) / step) + 1), d0 = (L - (n - 1) * step) / 2;
  return node('g', {}, Array.from({ length: n }, (_, i) => { const d = d0 + i * step; return quad(ax + ux * d - size / 2, ay + uy * d - size / 2, size, size, { fill }); }));
}

// The floor, the ring's links and the spokes the tower brings; the links dim while the tower stands.
world.push(block({ x: 0, y: 0, z: -4, w: 100, d: 100, h: 4 }, M.base));
const LINKS = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [0, 2], [2, 4], [4, 0], [1, 3], [3, 5], [5, 1]];
const mesh = node('g', {}, LINKS.map(([a, b]) => dashes(ring[a], ring[b]))), spokes = node('g', {}, ring.map(s => dashes(s, hub.at)));
world.push(mesh, spokes);
animate(mesh, 'mid-mesh', [[3900, { o: 1 }], [4400, { o: .15 }], [7900, { o: .15 }], [8500, { o: 1 }]]);
animate(spokes, 'mid-spokes', [[3900, { o: 0 }], [4400, { o: 1 }], [7700, { o: 1 }], [8200, { o: 0 }]], { o: 0 });
// Under the blocks: links lit by a message, the pulses at a block's foot, and the messages themselves.
const glow = node('g', {}, []), rings = node('g', {}, []), msgs = node('g', {}, []);
world.push(glow, rings, msgs);

// The blocks and the tower, drawn back to front. A block: its shadow, the cube and a Green top that lights when a
// message reaches it. The tower: 2 × 2 × 3 cubes of 6 units on the middle.
const spots: Spot[] = ring.map(at => ({ at, s: 10, hits: [] }));
const cubes: { g: SvgNode; i: number; j: number; k: number }[] = [];
const drawBlock = (spot: Spot) => {
  const [x, y] = spot.at, s = spot.s;
  spot.top = quad(x - s / 2, y - s / 2, s, s, { fill: green, opacity: 0 }, s);
  return node('g', {}, [quad(x - s / 2 + 1.5, y - s / 2 + 1.5, s, s, { fill: navy, opacity: .45 }), block({ x: x - s / 2, y: y - s / 2, z: 0, w: s, d: s, h: s }, M.mist), spot.top]);
};
const drawTower = (x: number, y: number) => node('g', {}, [[0, 0], [1, 0], [0, 1], [1, 1]].flatMap(([i, j]) => [0, 1, 2].map(k => {
  const g = block({ x: x + i * 6, y: y + j * 6, z: k * 6, w: 6, d: 6, h: 6 }, M.device);
  cubes.push({ g, i, j, k });
  return g;
})));
([...spots.map(s => [s.at[0] + s.at[1], () => drawBlock(s)]), [100, () => drawTower(44, 44)]] as [number, () => SvgNode][]).sort((a, b) => a[0] - b[0]).forEach(([, draw]) => world.push(draw()));

// The tower's life: its cubes drop in one by one from 26 above at 3.2 s, bottom layer first; at 7.6 s it cracks,
// shudders and collapses, each cube falling from its height as it spreads out from the middle, shrinking about
// its foot and fading.
const TC = 7600, rise = shift(0, 0, 26);
cubes.slice().sort((a, b) => a.k - b.k || (a.i + a.j) - (b.i + b.j)).forEach((c, n) => {
  const a = 3200 + n * 55, out = (u: number, dz = 0) => { const s = shift((c.i ? 1 : -1) * u, 0), t = shift(0, (c.j ? 1 : -1) * u); return { x: s.x + t.x, y: s.y + t.y + dz }; };
  const crack = out(1.2), down = out(1 + c.k * 2.2, c.k * 6), fall = TC + 300 + (2 - c.k) * 90;
  animate(c.g, `mid-cube-${n}`, [[a, { o: 0, ...rise, s: 1 }], [a + 70, { o: 1 }], [a + 330, { x: 0, y: 0 }, E.fall], [TC, { x: 0, y: 0 }], [TC + 120, crack, E.out], [TC + 200, { x: crack.x + .8, y: crack.y }, E.cross], [TC + 280, crack, E.cross], [fall, crack], [fall + 420, { ...down, s: .55 }, E.fall], [fall + 650, { o: 0 }], [fall + 651, { ...rise, s: 1 }]], { o: 0, ...rise });
});

// A message from A to B, leaving at t at a steady pace: a square sliding along the floor under both blocks, which
// lights its link in its own colour while it travels and, unless `quiet`, pulses at B's foot and lights B's top.
// `hide` shows it only on its way, for one that starts in the middle, which isn't always there.
let sent = 0;
function send(A: Spot, B: Spot, t: number, { fill = green, quiet = false, hide = false } = {}) {
  const id = sent++, dur = Math.hypot(B.at[0] - A.at[0], B.at[1] - A.at[1]) / .05, s = 4.2, at = t + dur;
  const [p, q] = [P(...A.at), P(...B.at)], d = { x: q[0] - p[0], y: q[1] - p[1] };
  const m = quad(A.at[0] - s / 2, A.at[1] - s / 2, s, s, { fill }, .15), lit = dashes(A.at, B.at, fill);
  msgs.children!.push(m);
  glow.children!.push(lit);
  if (hide) animate(m, `mid-msg-${id}`, [[t - 1, { o: 0 }], [t, { o: 1 }], [at, { x: d.x, y: d.y }, E.lin], [at + 1, { o: 0, x: 0, y: 0 }, E.lin]], { o: 0 });
  else animate(m, `mid-msg-${id}`, [[t, { x: 0, y: 0 }], [at, { x: d.x, y: d.y }, E.lin], [at + 1, { x: 0, y: 0 }, E.lin]]);
  animate(lit, `mid-link-${id}`, [[t, { o: 0 }], [t + 120, { o: 1 }], [at, { o: 1 }], [at + 350, { o: 0 }]], { o: 0 });
  if (!quiet) {
    const w = B.s * 1.5, pulse = quad(B.at[0] - B.s * .75, B.at[1] - B.s * .75, w, w, { fill: 'none', stroke: green, 'stroke-width': 1.2 });
    rings.children!.push(pulse);
    animate(pulse, `mid-pulse-${id}`, [[at, { o: 0, s: 1 }], [at + 80, { o: .85, s: 1.05 }], [at + 900, { o: 0, s: 1.6 }]], { o: 0 });
    B.hits.push(at);
  }
  return at;
}
// Block to block, before the tower and after it. The board's last message left at 10.3 s for block 1 and lit it
// past the loop's end; it goes to its neighbour, block 0, so every light is out before the loop closes.
([[0, 1, 300], [3, 5, 900], [1, 3, 1500], [4, 3, 2100], [5, 0, 2700], [2, 4, 8700], [0, 2, 9300], [3, 2, 9900], [5, 0, 10300]] as const).forEach(([a, b, t]) => send(spots[a], spots[b], t));
// Through the middle while the tower stands: in Green, a wait, and out grey.
([[1, 4, 4400], [5, 2, 5000], [3, 0, 5600], [0, 3, 6200]] as const).forEach(([a, b, t]) => { const at = send(spots[a], hub, t, { quiet: true }); send(hub, spots[b], at + 350, { fill: pewter, quiet: true, hide: true }); });
// Each block's top lights as a message reaches it; one that arrives before the light has faded keeps it lit.
spots.forEach((spot, i) => {
  const spans: [number, number][] = [];
  spot.hits.sort((a, b) => a - b).forEach(t => { const last = spans[spans.length - 1]; if (last && t < last[1] + 600) last[1] = Math.max(last[1], t + 510); else spans.push([t, t + 510]); });
  if (spans.length) animate(spot.top!, `mid-top-${i}`, spans.flatMap(([a, b]): Key[] => [[a, { o: 0 }], [a + 90, { o: .9 }, E.out], [b, { o: .9 }], [b + 500, { o: 0 }, E.cross]]), { o: 0 });
});

// The fit keeps the tower's full height in view as it drops in.
const [lx] = P(44, 56), [rx] = P(56, 44), [, ty] = P(44, 44, 18 + 26);
export const middleman = { world, transform: fit(world, { extra: [[lx, ty], [rx, ty + 10]] }), tracks };
