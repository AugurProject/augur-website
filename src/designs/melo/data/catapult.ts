/** The /2/ Robust card: the Catapult (owner, 22 Oct 2026: "I love the catapult … like always doubling and idk
 * destroying the losing side when the winning wins", then "it gotta start empty. then it fills", polished on the
 * Tenet Motion Options board). A seesaw on a small platform: the lie's tray on the left, its blocks dark grey,
 * and the truth's on the right, its blocks Green.
 * - They keep doubling each other, a batch at a time: one, two, four, eight, sixteen, thirty-two. Each stack fills
 *   out in doubling shapes (1 × 1, 1 × 2, 2 × 2, 2 × 4, 4 × 4, then a second 4 × 4 layer), and the beam tips each
 *   way with a spring as a batch lands, a little further every time.
 * - The truth's thirty-two slam its side down, with a Green pulse on the ground: the lie's tray flicks up and
 *   throws its sixteen off to the left, where each bursts into three pieces that fly apart and fade.
 * - The truth's stack clears block by block and the beam comes back level.
 * The loop starts and ends empty and level, which is also the resting frame that no JavaScript, reduced motion
 * and print show. There are no words. The doubling is the challenge rule (whitepaper §4.1). iso-kit.ts has the
 * drawing and keyframe rules shared with the other two cards. */
import { COS, CYCLE, E, M, P, block, quad, node, keyframes, fit, shift, mix, r2, card, navy, paper, pewter, green, type Key, type Point, type State, type SvgNode } from './iso-kit';

const { tracks, animate } = keyframes('catapult');
const world: SvgNode[] = [];
const C = 50, R = 30, Z = 10, PZ = Z + 1.4, q = 3, cell = 3.3, b = 3, home = { x: 0, y: 0 };
const k = R / Math.SQRT2, LC: Point = [C - k, C + k], RC: Point = [C + k, C - k];
world.push(block({ x: 20, y: 20, z: -4, w: 60, d: 60, h: 4 }, M.base));

// The beam's angle (degrees; positive tips the truth's side down): a spring after each batch, then the slam, a
// hold, and back to level. The curves are CSS timing functions; `ease` solves them, so the shadows below, which
// follow the beam on keys of their own, match what the browser draws.
const curve = (x1: number, y1: number, x2: number, y2: number) => {
  const f = (a: number, c: number, t: number) => 3 * (1 - t) * (1 - t) * t * a + 3 * (1 - t) * t * t * c + t * t * t;
  return { css: `cubic-bezier(${x1},${y1},${x2},${y2})`, at(u: number) { let lo = 0, hi = 1; for (let i = 0; i < 40; i++) { const m = (lo + hi) / 2; if (f(x1, x2, m) < u) lo = m; else hi = m; } return f(y1, y2, (lo + hi) / 2); } };
};
const IN = curve(.33333, 0, .66667, .33333), OUT = curve(.33333, .66667, .66667, 1), SINE = curve(.37, 0, .63, 1);
const ease = new Map([[IN.css, IN.at], [OUT.css, OUT.at], [SINE.css, SINE.at], [E.lin, (u: number) => u]]);
const spring = (t: number, a: number, z: number): Key[] => [[t, { r: a }, E.lin], [t + 380, { r: r2(a + (z - a) * 1.18) }, OUT.css], [t + 640, { r: r2(a + (z - a) * .95) }, SINE.css], [t + 860, { r: z }, SINE.css]];
const SLAM = 6670, beam: Key[] = [[0, { r: 0 }, E.lin], ...spring(800, 0, -4), ...spring(1800, -4, 4), ...spring(2800, 4, -6.5), ...spring(3850, -6.5, 8), ...spring(5050, 8, -10),
  [6450, { r: -10 }, E.lin], [SLAM, { r: 16 }, IN.css], [SLAM + 180, { r: 11.5 }, OUT.css], [SLAM + 340, { r: 13.6 }, SINE.css], [SLAM + 500, { r: 13 }, SINE.css], [10500, { r: 13 }, E.lin], [11500, { r: 0 }, SINE.css]];
const angle = (t: number) => {
  for (let i = 1; i < beam.length; i++) {
    const [a, va] = beam[i - 1], [z, vz, e] = beam[i];
    if (t <= z) return z > a ? va.r! + (vz.r! - va.r!) * ease.get(e!)!((t - a) / (z - a)) : vz.r!;
  }
  return 0;
};

// The beam turns in an upright plane facing the viewer through the pin, which sits on the post half the beam's
// depth in front of its middle. A point R along it moves by R(cos a − 1) across and R sin a down, the across part
// drawn √1.5 times as wide.
const SC = r2(Math.SQRT2 * COS * 1e4) / 1e4, [e, f] = P(C + b / 2 / Math.SQRT2, C + b / 2 / Math.SQRT2, Z).map(r2), top = b * Math.SQRT1_2;
const facing = (children: SvgNode[]) => node('g', { transform: `matrix(${SC} 0 0 1 ${e} ${f})` }, children);
const box = (x: number, y: number, w: number, h: number, fill: string, attrs = {}) => node('rect', { x: r2(x), y: r2(y), width: r2(w), height: r2(h), fill, ...attrs });

// The trays' shadows on the floor follow them across and darken as they come down; the pulse marks the slam.
const shadows = ([[-1, LC], [1, RC]] as const).map(([side, c]) => { const s = quad(c[0] - 7.5, c[1] - 7.5, 15, 15, { fill: navy }); world.push(s); return { side, s }; });
const pulse = quad(RC[0] - 9.5, RC[1] - 9.5, 19, 19, { fill: 'none', stroke: green, 'stroke-width': 1.2 });
world.push(pulse);
animate(pulse, 'cat-pulse', [[SLAM + 120, { o: 0, s: 1 }], [SLAM + 200, { o: .85, s: 1.05 }], [SLAM + 1020, { o: 0, s: 1.6 }], [SLAM + 1021, { s: 1 }]], { o: 0 });
// The post on its foot, the beam, and the pin.
world.push(block({ x: C - 7, y: C - 7, z: 0, w: 14, d: 14, h: 1.2 }, M.slab), block({ x: C - 2, y: C - 2, z: 1.2, w: 4, d: 4, h: Z - 2.6 }, M.device));
const bar = node('g', { class: 'iso-pin' }, [box(-R - 6, -1.4 - top, 2 * R + 12, top, mix(pewter, card, .86)), box(-R - 6, -1.4, 2 * R + 12, 2.8, mix(pewter, card, .6)), box(-R - 6, -1.4, 2 * R + 12, .5, paper, { opacity: .4 })]);
world.push(facing([bar, box(-1.4, -1.4, 2.8, 2.8, paper)]));

// A tray on each end of the beam: its floor, back rims, blocks, the pieces they burst into, and front rims. It
// follows the beam's end exactly and stays level: it turns with the beam about the pin, then back again about the
// beam's end (a turn undone about another point is a pure move), in the beam's plane, and is drawn in the floor's
// own terms inside that.
const tray = (side: -1 | 1, c: Point) => {
  const x = c[0] - 7.5, y = c[1] - 7.5, cubes = node('g', {}, []), bits = node('g', {}, []);
  const inside = node('g', { transform: `matrix(${Math.round(1e6 / SC) / 1e6} 0 0 1 ${Math.round((-e / SC - side * R) * 1e6) / 1e6} ${-f})` }, [
    block({ x, y, z: PZ, w: 15, d: 15, h: 1.2 }, M.slab),
    block({ x, y, z: PZ + 1.2, w: 15, d: .8, h: 1.4 }, M.slab), block({ x, y: y + .8, z: PZ + 1.2, w: .8, d: 14.2, h: 1.4 }, M.slab),
    cubes, bits,
    node('g', {}, [block({ x: x + .8, y: y + 14.2, z: PZ + 1.2, w: 14.2, d: .8, h: 1.4 }, M.slab), block({ x: x + 14.2, y: y + .8, z: PZ + 1.2, w: .8, d: 13.4, h: 1.4 }, M.slab)]),
  ]);
  const level = node('g', { class: 'iso-pin' }, [inside]), turn = node('g', { class: 'iso-pin' }, [node('g', { transform: `translate(${side * R} 0)` }, [level])]);
  world.push(facing([turn]));
  return { turn, level, cubes, bits, x: x + .8, y: y + .8 };
};
const L = tray(-1, LC), Rt = tray(1, RC);
animate([bar, L.turn, Rt.turn], 'cat-beam', beam);
animate([L.level, Rt.level], 'cat-level', beam.map(([t, v, ease]): Key => [t, { r: -v.r! }, ease]));
// The shadows' keys: the beam's own times, with any stretch halved until straight lines between keys stay within
// 0.02 units and 0.003 opacity of the shadow's true path.
shadows.forEach(({ side, s }) => {
  const at = (t: number): Partial<State> => { const a = angle(t) * Math.PI / 180; return { x: side * SC * R * (Math.cos(a) - 1), y: 0, o: .3 + side * .13 * Math.sin(a) }; };
  const straight = (t0: number, t1: number) => { const a = at(t0), z = at(t1); for (let i = 1; i < 8; i++) { const t = t0 + (t1 - t0) * i / 8, v = at(t); if (Math.abs(a.x! + (z.x! - a.x!) * i / 8 - v.x!) > .02 || Math.abs(a.o! + (z.o! - a.o!) * i / 8 - v.o!) > .003) return false; } return true; };
  const keys: Key[] = [], split = (t0: number, t1: number) => { if (t1 - t0 <= 20 || straight(t0, t1)) { keys.push([t1, at(t1), E.lin]); return; } const m = (t0 + t1) / 2; split(t0, m); split(m, t1); };
  const times = [...new Set([...beam.map(([t]) => t), CYCLE])];
  for (let i = 1; i < times.length; i++) split(times[i - 1], times[i]);
  animate(s, `cat-shadow-${side < 0 ? 'lie' : 'truth'}`, keys, at(0));
});

// Where the n-th block of a stack goes: the shapes double, 1 × 1, 1 × 2, 2 × 2, 2 × 4, 4 × 4, then a layer above.
const CELLS = [[0, 0], [1, 0], [0, 1], [1, 1], [2, 0], [3, 0], [2, 1], [3, 1], [0, 2], [1, 2], [0, 3], [1, 3], [2, 2], [3, 2], [2, 3], [3, 3]];
// Batches: [first block, last block + 1, start, gap]; a stack only ever grows to double the other side's.
const LIE = [[0, 1, 500, 0], [1, 4, 2500, 70], [4, 16, 4600, 45]], TRUTH = [[0, 2, 1500, 90], [2, 8, 3500, 60], [8, 32, 5800, 28]];
const when = (batches: number[][], n: number) => { const [a, , t, gap] = batches.find(([a, z]) => n >= a && n < z)!; return t + (n - a) * gap; };
// A block drops onto its stack from 18 above at t: it fades in, falls, and bounces once.
const up = shift(0, 0, 18), bounce = shift(0, 0, 1.2);
const drop = (t: number): Key[] => [[t, { o: 0, ...up }], [t + 60, { o: 1 }], [t + 300, home, E.fall], [t + 370, bounce, E.out], [t + 440, home, E.in]];
const stack = (T: ReturnType<typeof tray>, count: number, m: typeof M.green, life: (g: SvgNode, s: { n: number; i: number; j: number; L: number }) => void) =>
  Array.from({ length: count }, (_, n) => ({ n, i: CELLS[n % 16][0], j: CELLS[n % 16][1], L: Math.floor(n / 16) })).sort((a, z) => a.L - z.L || (a.i + a.j) - (z.i + z.j)).forEach(s => {
    const g = block({ x: T.x + s.i * cell + .15, y: T.y + s.j * cell + .15, z: PZ + 1.2 + s.L * q, w: q, d: q, h: q }, m);
    T.cubes.children!.push(g);
    life(g, s);
  });
stack(L, 16, M.device, (g, s) => {
  // Thrown when the beam slams: out to the left, where the picture has room, and up a little, fanning out from
  // where it sat; at the top of its throw it bursts into three pieces that fly apart and fade.
  const t = when(LIE, s.n), tL = SLAM + 20 + s.n * 6, d = 11 + (s.n % 4) * 1.4, sx = (s.i - 1.5) * 1.1, sy = (s.j - 1.5) * 1.1, rise = 5 + (s.n % 3) * 1.1;
  const out = (dist: number, z: number) => shift(-dist * .707 + sx, dist * .707 + sy, z), mid = out(d * .55, rise * .85), apex = out(d, rise);
  animate(g, `cat-lie-${s.n}`, [...drop(t), [tL, home], [tL + 190, { ...mid, s: .95 }, E.out], [tL + 320, { ...apex, s: .85 }, E.out], [tL + 321, { o: 0, s: 1, ...up }]], { o: 0, ...up });
  [[-1, 1, 1.5], [-1.6, 1.2, -5], [1.2, 1.4, -4]].forEach(([u, v, dz], h) => {
    const bit = block({ x: L.x + s.i * cell + .7, y: L.y + s.j * cell + .7, z: PZ + 1.2 + .7, w: 1.6, d: 1.6, h: 1.6 }, M.device), far = out(d + 3 + h, rise + dz), apart = shift(u * 2.6, v * 2.6, 0);
    L.bits.children!.push(bit);
    animate(bit, `cat-bit-${s.n}-${h}`, [[tL + 319, { o: 0 }], [tL + 320, apex], [tL + 321, { o: 1 }], [tL + 760, { x: far.x + apart.x, y: far.y + apart.y, o: 0 }, E.out], [tL + 761, { o: 0, ...home }]], { o: 0 });
  });
});
stack(Rt, 32, M.green, (g, s) => {
  // Once the win has sunk in, the stack clears block by block, from the first laid to the last.
  const t = when(TRUTH, s.n);
  animate(g, `cat-truth-${s.n}`, [...drop(t), [9900 + s.n * 12, { o: 1, ...home }], [10350 + s.n * 12, { o: 0, ...shift(0, 0, -1.5) }], [10351 + s.n * 12, { o: 0, ...up }]], { o: 0, ...up });
});

// A small platform, drawn larger than the other scenes so the blocks on the trays match the size of the blocks
// on the other two cards.
export const catapult = { world, transform: fit(world, { cap: 2.3 }), tracks };
