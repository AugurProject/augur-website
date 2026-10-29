/** How it works on /2/: the magnet made literal (owner, 26 Oct 2026, item 4 scenes board version 7: "make more
 * explicit … that each side represents a possible answer", "each block means REP", no words; then "keep blocks" and
 * "the small block should also jump!"). One machine for all four steps, drawn with iso-kit.ts.
 * - Two pedestals, one per answer, each with its sign on the face toward you: ✓ is Yes, ✗ is No. A sign lights
 *   (Paper) while its answer stands and turns Green when it is final.
 * - Blocks are REP, sized as in the example (walkthrough.ts): their report is one block (the 15 REP bond), your
 *   challenge two (30 REP). At the end the top fifth of theirs burns (3 REP, the 20%) and the rest flies over onto
 *   yours (owner: "going to right … above the right blocks"), +12 REP, the 80%.
 * - The reward, a small Paper block, rides a sled on the rail to whichever answer stands, and at the end jumps onto
 *   your stack. Its size is no figure: the example gives none.
 * - One clock on a post behind the rail: the time to challenge. Each new stake sends its hand back to twelve; when
 *   it goes all the way round, the answer is final.
 * - Their stake is Mist and yours Green. No words in the drawing.
 * - The steps are one story. State 0 is before Ask and state k is after step k. Each step's scene is drawn at its
 *   state (no JavaScript, reduced motion and print show it). Its act is a set of keyframe tracks from the state
 *   before, built here and played by how-path-v2.js with transform and opacity only.
 * One camera for all four, the drawing about three quarters of the stage wide, as on the board. */
import { M, E, P, block, quad, node, plane, mix, shift, r2, card, navy, mist, paper, green, pewter, type Material, type SvgNode, type Keyframe, type Point } from './iso-kit';

export type HowKind = 'ask' | 'report' | 'challenge' | 'paid';
// A part's state: its screen offset, opacity, turn in degrees and scale, the last two about its origin.
type State = { x: number; y: number; o: number; r: number; s: number };
// A key: [ms into the act, values that carry forward, easing into this key].
type Key = [number, Partial<State>, string?];
type Act = { p: string; keys: Key[] }[];

const tone = (c: string, l: number, r: number): Material => ({ top: c, left: mix(c, card, l), right: mix(c, card, r), rim: mix(paper, c, .38) });
// The reward, and the top of their block as it heats before it burns.
const paperM = tone(mix(paper, pewter, .6), .7, .5), hotM = tone(mix(paper, mist, .82), .72, .5);
const snap = 'cubic-bezier(.6,0,.1,1)';
const range = (n: number) => Array.from({ length: n }, (_, i) => i);
const screen = mix(navy, card, .7), dim = mix(mist, card, .62);

const parts: Record<string, { origin: Point; init: Partial<State> }> = {};
const part = (name: string, opts: { o?: number; origin?: Point }, children: SvgNode[]) => {
  parts[name] = { origin: (opts.origin ?? [0, 0]).map(r2) as Point, init: opts.o === undefined ? {} : { o: opts.o } };
  return node('g', { 'data-how-part': name }, children);
};

// The clock: a dark dial with twelve ticks, and a hand (Paper, with a Green twin for the end) that turns about the
// dial's centre.
const clock = (id: string, cu: number, cv: number, R: number): SvgNode[] => {
  const hand = (fill: string) => node('rect', { x: r2(cu - .32), y: r2(cv - R + 1.4), width: .64, height: r2(R - 1.4), fill });
  return [
    node('circle', { cx: cu, cy: cv, r: R, fill: screen, stroke: mix(mist, card, .8), 'stroke-width': .55 }),
    ...range(12).map(i => { const a = i * Math.PI / 6, rr = R - .95; return node('rect', { x: r2(cu + Math.sin(a) * rr - .3), y: r2(cv - Math.cos(a) * rr - .3), width: .6, height: .6, fill: mix(pewter, card, .8) }); }),
    part(id, { origin: [cu, cv] }, [hand(paper), part(id + 'G', { o: 0 }, [hand(green)])]),
    node('circle', { cx: cu, cy: cv, r: .75, fill: paper }),
  ];
};
// An answer's sign on its pedestal's left face (local u runs right, v down): a dark panel with ✓ or ✗.
const panel = node('rect', { x: 2, y: 2, width: 12, height: 10, fill: screen });
const tick = (stroke: string) => node('polyline', { points: '4.7,7.1 7,9.4 11.3,4.6', fill: 'none', stroke, 'stroke-width': 1.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
const cross = (stroke: string) => node('path', { d: 'M5.2 4.2L10.8 9.8M10.8 4.2L5.2 9.8', fill: 'none', stroke, 'stroke-width': 1.5, 'stroke-linecap': 'round' });

// Pedestals (side, height), where No's starts, the rail's middle, the clock's x; a stake block's side, and the four
// fifths of theirs that come to you.
const PW = 16, PH = 14, XN = 76, MID = 46, CLX = 34, SB = 10, B4 = SB * .8;
// Where the sled stops by each answer: far enough that, drawn in front, it never seems to touch the pedestal.
const NEAR = { yes: PW + 19, no: XN - 17 };
// The top of your stack once theirs has landed on it.
const TOP = PH + 2 * SB + B4;
// A stake block on its pedestal (x0 is the pedestal's), its base z0 above the pedestal's top.
const cube = (x0: number, z0: number, h: number, m: Material) => block({ x: x0 + 3, y: 3, z: PH + z0, w: SB, d: SB, h }, m);
const prize = { x: MID - 3, y: 5, z: 8, w: 6, d: 6, h: 4 };
// The sparks of the burn, about the top of their block.
const SPARK: Point[] = [[-5.2, -1.4], [-2.4, -3.6], [1.4, -4], [4.6, -1.8], [-3.4, 1.6], [3.6, 1.4]];
const [sx, sy] = P(8, 8, PH + SB);

// Back to front: the final ring under No, the clock, Yes, the rail and the sled, No, your blocks, then theirs and
// the sparks, and the reward last, so each can fly over everything onto your stack.
const world: SvgNode[] = [
  part('ring', { o: 0, origin: P(XN + 8, 8) }, [quad(XN - 3, -3, PW + 6, PW + 6, { fill: 'none', stroke: green, 'stroke-width': 1, 'stroke-linejoin': 'round' })]),
  block({ x: CLX - 2, y: -15, z: 0, w: 4, d: 3, h: 12 }, M.slab), block({ x: CLX - 8, y: -12.6, z: 10, w: 16, d: 2, h: 16 }, M.device),
  plane('left', CLX - 8, -10.6, 26, [...clock('hd', 8, 8, 6.6), part('dG', { o: 0 }, [node('circle', { cx: 8, cy: 8, r: 6.6, fill: 'none', stroke: green, 'stroke-width': .7 })])]),
  block({ x: 0, y: 0, z: 0, w: PW, d: PW, h: PH }, M.device), plane('left', 0, PW, PH, [panel, tick(dim), part('sY', { o: 0 }, [tick(paper)])]),
  block({ x: PW, y: 6, z: 3, w: XN - PW, d: 4, h: 2 }, M.slab),
  part('sl', {}, [block({ x: MID - 6, y: 3, z: 5, w: 12, d: 10, h: 3 }, M.device)]),
  block({ x: XN, y: 0, z: 0, w: PW, d: PW, h: PH }, M.device), plane('left', XN, PW, PH, [panel, cross(dim), part('sN', { o: 0 }, [cross(paper)]), part('sNG', { o: 0 }, [cross(green)])]),
  part('y1', { o: 0 }, [cube(XN, 0, SB, M.green)]), part('y2', { o: 0 }, [cube(XN, SB, SB, M.green)]),
  // Theirs drops whole; at the end it splits into the four fifths that fly and the fifth that burns.
  part('th', { o: 0 }, [part('thW', {}, [cube(0, 0, SB, M.mist)]),
    part('thS', { o: 0 }, [part('tg', {}, [part('tgM', {}, [cube(0, 0, B4, M.mist)]), part('tgG', { o: 0 }, [cube(0, 0, B4, M.green)])]),
      part('t4', {}, [cube(0, B4, SB - B4, M.mist), part('t4H', { o: 0 }, [cube(0, B4, SB - B4, hotM)])])])]),
  ...SPARK.map(([dx, dy], i) => part('f' + i, { o: 0 }, [node('rect', { x: r2(sx + dx - .7), y: r2(sy + dy - .7), width: 1.4, height: 1.4, fill: i % 2 ? paper : mix(paper, mist, .6), transform: `rotate(45 ${r2(sx + dx)} ${r2(sy + dy)})` })])),
  part('rw', { o: 0, origin: P(MID, 8, 8) }, [block(prize, paperM), part('rwG', { o: 0 }, [block(prize, M.green)])]),
];

const at = (t: number, v: Partial<State> = {}, e?: string): Key => [t, v, e];
const drop = (t: number, H: number, dur = 460, bounce = 1.4): Key[] => [at(t, { y: -H, o: 0 }), at(t + 60, { o: 1 }, E.lin), at(t + dur, { y: 0 }, E.fall), ...(bounce ? [at(t + dur + 100, { y: -bounce }, E.out), at(t + dur + 210, { y: 0 }, E.in)] : [])];
const fade = (t: number, d: number, o: number, e = E.reveal): Key[] => [at(t), at(t + d, { o }, e)];
const move = (t: number, d: number, v: Partial<State>, e = E.cross): Key[] => [at(t), at(t + d, v, e)];
const blink = (t: number, up = 200, hold = 300, down = 380): Key[] => [at(t), at(t + up, { o: 1 }, E.lin), at(t + up + hold), at(t + up + hold + down, { o: 0 })];
const pulse = (t: number, d = 800, s = 1.25): Key[] => [at(t, { o: 0, s: 1 }), at(t + 40, { o: .9 }, E.lin), at(t + d, { o: 0, s }, E.reveal)];
const off = (dx: number, dy: number, dz = 0) => { const { x, y } = shift(dx, dy, dz); return { x: r2(x), y: r2(y) }; };
// An arc from one screen offset to another, `h` high at its top.
const sine = (u: number) => (1 - Math.cos(Math.PI * u)) / 2;
const hop = (t: number, d: number, from: [number, number], to: [number, number], h: number, n: number): Key[] =>
  [at(t, { x: from[0], y: from[1] }), ...range(n).map(i => { const u = (i + 1) / n, f = sine(u); return at(r2(t + d * u), { x: r2(from[0] + (to[0] - from[0]) * f), y: r2(from[1] + (to[1] - from[1]) * f - 4 * h * f * (1 - f)) }, E.lin); })];
// Where their four fifths land (on your two blocks), where the sled stops by Yes and by No, and where the reward
// lands on top of your stack.
const LAND = off(XN, 0, 2 * SB), BY_YES = off(NEAR.yes - MID, 0), BY_NO = off(NEAR.no - MID, 0), ON_TOP = off(XN + 8 - MID, 0, TOP - 8);

const acts: Act[] = [
  // Ask: the two answers' signs light in turn, then the reward lands on the sled and grows.
  [{ p: 'sY', keys: blink(150) }, { p: 'sN', keys: blink(520) },
   { p: 'rw', keys: [at(1250, { y: -16, o: 0, s: .5 }), at(1310, { o: 1 }, E.lin), at(1640, { y: 0 }, E.fall), at(1730, { y: -.6 }, E.out), at(1820, { y: 0 }, E.in), at(2050), at(2350, { s: .78 }, E.out), at(2650), at(2950, { s: 1 }, E.out)] }],
  // Report: their block lands on Yes, Yes lights, the reward rides over to it on the sled, and the clock runs most
  // of the way.
  [{ p: 'th', keys: drop(150, 18) }, { p: 'sY', keys: fade(700, 300, 1) },
   { p: 'sl', keys: move(850, 650, BY_YES, snap) }, { p: 'rw', keys: move(850, 650, BY_YES, snap) }, { p: 'hd', keys: [at(1550), at(3150, { r: 240 }, E.lin)] }],
  // Challenge: your first block, the same as theirs, lands on No, then a second on top (double theirs). No lights,
  // Yes dims, the hand goes back to twelve, the reward rides over to No, and the clock runs again.
  [{ p: 'y1', keys: drop(150, 18) }, { p: 'y2', keys: drop(700, 18) }, { p: 'sN', keys: fade(1250, 300, 1) }, { p: 'sY', keys: fade(1250, 300, 0) },
   { p: 'hd', keys: [at(1250), at(1550, { r: 0 }, E.cross), at(2350), at(2750, { r: 60 }, E.lin)] },
   { p: 'sl', keys: move(1450, 850, BY_NO, snap) }, { p: 'rw', keys: move(1450, 850, BY_NO, snap) }],
  // Get paid: the hand goes all the way round. No is final: the dial and its sign turn Green and a ring pulses. The
  // top fifth of their block heats and breaks into sparks, the rest flies over onto yours and turns Green, and the
  // reward jumps on top, Green too.
  [{ p: 'hd', keys: [at(100), at(1500, { r: 360 }, E.lin)] }, { p: 'hdG', keys: fade(1550, 300, 1) }, { p: 'dG', keys: fade(1550, 300, 1) },
   { p: 'sNG', keys: fade(1550, 300, 1) }, { p: 'ring', keys: pulse(1600) },
   { p: 'thW', keys: [at(1950), at(1951, { o: 0 }, E.lin)] }, { p: 'thS', keys: [at(1950), at(1951, { o: 1 }, E.lin)] },
   { p: 't4H', keys: [at(1960), at(2080, { o: 1 }, E.lin)] }, { p: 't4', keys: [at(2120), at(2420, { o: 0 }, E.lin)] },
   ...SPARK.map(([dx, dy], i) => ({ p: 'f' + i, keys: [at(2080 + i * 20, { o: 0 }), at(2120 + i * 20, { o: 1 }, E.lin), at(2720 + i * 20, { x: r2(dx * 1.4), y: r2(dy * 1.2 - 9), o: 0 }, E.out)] })),
   { p: 'tg', keys: [...hop(2550, 900, [0, 0], [LAND.x, LAND.y], 16, 16), at(3550, { y: r2(LAND.y - 1) }, E.out), at(3660, { y: LAND.y }, E.in)] },
   { p: 'tgM', keys: fade(3150, 300, 0) }, { p: 'tgG', keys: fade(3150, 300, 1) },
   { p: 'rw', keys: [...hop(3700, 650, [BY_NO.x, BY_NO.y], [ON_TOP.x, ON_TOP.y], 14, 12), at(4450, { y: r2(ON_TOP.y - .8) }, E.out), at(4560, { y: ON_TOP.y }, E.in)] },
   { p: 'rwG', keys: fade(4050, 300, 1) }],
];

// The five states: each part's values after each act.
const states: Record<string, State>[] = [Object.fromEntries(Object.entries(parts).map(([n, { init }]) => [n, { x: 0, y: 0, o: 1, r: 0, s: 1, ...init }]))];
acts.forEach((act, i) => {
  const next = Object.fromEntries(Object.entries(states[i]).map(([n, st]) => [n, { ...st }]));
  act.forEach(({ p, keys }) => {
    if (!next[p]) throw new Error(`how-scenes: no part ${p}`);
    keys.forEach(([t, v], j) => { if (j && t < keys[j - 1][0]) throw new Error(`how-scenes: keys out of order in ${p}`); Object.assign(next[p], v); });
  });
  states.push(next);
});

// A state as an SVG transform attribute, and as CSS for the act's keyframes; both turn and scale about the origin.
const attr = ({ x, y, r, s }: State, [ox, oy]: Point) => [x || y ? `translate(${r2(x)} ${r2(y)})` : '', r || s !== 1 ? `translate(${ox} ${oy})${r ? ` rotate(${r2(r)})` : ''}${s !== 1 ? ` scale(${r2(s)})` : ''} translate(${-ox} ${-oy})` : ''].filter(Boolean).join(' ') || undefined;
const css = ({ x, y, r, s }: State, [ox, oy]: Point, use: { m: boolean; t: boolean }) => [use.m && `translate(${r2(x)}px,${r2(y)}px)`, use.t && `translate(${ox}px,${oy}px) rotate(${r2(r)}deg) scale(${r2(s)}) translate(${-ox}px,${-oy}px)`].filter(Boolean).join(' ') || 'none';

// A step's scene: the world with every part at that step's state.
const drawn = (k: number): SvgNode[] => {
  const walk = (list: SvgNode[]): SvgNode[] => list.map(nd => {
    const name = nd.attrs['data-how-part'] as string | undefined, children = nd.children && walk(nd.children);
    if (!name) return { ...nd, children };
    const st = states[k][name];
    return { ...nd, attrs: { ...nd.attrs, transform: attr(st, parts[name].origin), opacity: st.o === 1 ? undefined : st.o }, children };
  });
  return walk(world);
};
// A step's act, as [part, delay, duration, keyframes] from the state before it.
const tracks = (k: number) => acts[k - 1].map(({ p, keys }) => {
  const t0 = keys[0][0], t1 = keys[keys.length - 1][0], origin = parts[p].origin;
  let st = { ...states[k - 1][p] };
  const seq = keys.map(([t, v]) => { st = { ...st, ...v }; return [t, st] as const; });
  const use = { m: seq.some(([, v]) => v.x || v.y), t: seq.some(([, v]) => v.r || v.s !== 1) };
  const fades = seq.some(([, v]) => v.o !== seq[0][1].o);
  const frames: Keyframe[] = seq.map(([t, v], i) => {
    const f: Keyframe = { offset: r2((t - t0) / (t1 - t0) * 1e3) / 1e3, transform: css(v, origin, use) };
    if (fades) f.opacity = v.o;
    const next = keys[i + 1];
    if (next) f.easing = next[2] ?? E.reveal;
    return f;
  });
  return [p, t0, t1 - t0, frames] as const;
});

// The camera: everything at home plus the end (your stack with theirs and the reward on top), within about three
// quarters of the width and 86% of the height.
function camera(list: SvgNode[], extra: Point[]) {
  let ax = Infinity, ay = Infinity, bx = -Infinity, by = -Infinity;
  type Matrix = [number, number, number, number, number, number];
  const take = (px: number, py: number) => { ax = Math.min(ax, px); ay = Math.min(ay, py); bx = Math.max(bx, px); by = Math.max(by, py); };
  const times = (m: Matrix, n: Matrix): Matrix => [m[0] * n[0] + m[2] * n[1], m[1] * n[0] + m[3] * n[1], m[0] * n[2] + m[2] * n[3], m[1] * n[2] + m[3] * n[3], m[0] * n[4] + m[2] * n[5] + m[4], m[1] * n[4] + m[3] * n[5] + m[5]];
  const walk = (nodes: SvgNode[], m: Matrix) => nodes.forEach(nd => {
    const tf = typeof nd.attrs.transform === 'string' && nd.attrs.transform.startsWith('matrix') ? times(m, nd.attrs.transform.slice(7, -1).trim().split(/[\s,]+/).map(Number) as Matrix) : m;
    if (typeof nd.attrs.points === 'string') nd.attrs.points.split(' ').forEach(p => { const [x, y] = p.split(',').map(Number); take(tf[0] * x + tf[2] * y + tf[4], tf[1] * x + tf[3] * y + tf[5]); });
    if (nd.children) walk(nd.children, tf);
  });
  walk(list, [1, 0, 0, 1, 0, 0]);
  extra.forEach(([x, y]) => take(x, y));
  const k = r2(Math.min(.74 * 336 / (bx - ax), .86 * 168 / (by - ay), 2.6) * 1e3) / 1e3;
  return `matrix(${k} 0 0 ${k} ${r2(168 - (ax + bx) / 2 * k)} ${r2(84 - (ay + by) / 2 * k)})`;
}

const kinds: HowKind[] = ['ask', 'report', 'challenge', 'paid'];
export const howScenes = { worlds: Object.fromEntries(kinds.map((kind, i) => [kind, drawn(i + 1)])) as Record<HowKind, SvgNode[]>, transform: camera(world, [P(XN + 3, 3, TOP), P(XN + 3, 3 + SB, TOP), P(XN + 5, 5, TOP + 4)]) };
export const howActs = Object.fromEntries(kinds.map((kind, i) => [kind, tracks(i + 1)])) as Record<HowKind, ReturnType<typeof tracks>>;
