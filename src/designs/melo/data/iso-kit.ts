/** The isometric kit for the /2/ Why Augur cards (owner, 22 Oct 2026): Two roads (two-roads.ts), Middleman
 * crumbles (middleman.ts) and the Catapult (catapult.ts), each ported from its approved sketch on the Tenet
 * Motion Options board. A scene is a tree of SVG nodes drawn at its resting frame, which IsoScene.astro renders,
 * so no JavaScript, reduced motion and print show it, and its loop's keyframes, built here at build time, one
 * track per `data-iso` name, which tenets-iso-v2.js plays on one 12 s cycle. The keyframes are exact: each
 * track opens and closes on the resting frame, and only what changes is animated. Transform and opacity only. */

export type Attrs = Record<string, string | number | undefined>;
export interface SvgNode { tag: string; attrs: Attrs; children?: SvgNode[] }
export interface Keyframe { offset: number; transform?: string; opacity?: number; easing?: string }
export type Point = [number, number];
export type Box = { x: number; y: number; z: number; w: number; d: number; h: number };
export type Material = { top: string; left: string; right: string; rim?: string };
export type State = { x: number; y: number; r: number; s: number; o: number };
export type Key = [number, Partial<State>, string?];
export type Track = [string, Keyframe[]];

export const CYCLE = 12000, COS = Math.cos(Math.PI / 6);
export const E = { reveal: 'cubic-bezier(.22,.61,.36,1)', cross: 'cubic-bezier(.45,0,.55,1)', lin: 'linear', in: 'cubic-bezier(.7,0,.84,0)', fall: 'cubic-bezier(.55,0,1,.45)', out: 'cubic-bezier(.16,1,.3,1)' };
export const card = '#1d1d30', navy = '#0e0e21', mist = '#71728a', paper = '#f5f5f8', green = '#2ae7a8', deep = '#095e42', pewter = '#a1a1b8';
export const mix = (a: string, b: string, t: number) => '#' + [0, 1, 2].map(i => Math.round(parseInt(a.slice(1 + i * 2, 3 + i * 2), 16) * t + parseInt(b.slice(1 + i * 2, 3 + i * 2), 16) * (1 - t)).toString(16).padStart(2, '0')).join('');
export const r2 = (v: number) => Math.round(v * 100) / 100;
// The 30° projection: a point on the floor (x, y) at height z, in the drawing's own units.
const O: Point = [168, 84];
export const P = (x: number, y: number, z = 0): Point => [O[0] + (x - y) * COS, O[1] + (x + y) * .5 - z];
// The screen offset of a move in the world.
export const shift = (dx: number, dy: number, dz = 0) => { const p = P(0, 0, 0), q = P(dx, dy, dz); return { x: q[0] - p[0], y: q[1] - p[1] }; };
export const pts = (list: Point[]) => list.map(([x, y]) => `${r2(x)},${r2(y)}`).join(' ');
// Faces lit from the top left, with a thin rim along the top's front edges.
const tone = (c: string, l: number, r: number): Material => ({ top: c, left: mix(c, card, l), right: mix(c, card, r), rim: mix(paper, c, .38) });
const mat = (t: number, l: number, r: number): Material => ({ top: mix(mist, card, t), left: mix(mist, card, l), right: mix(mist, card, r), rim: mix(paper, mix(mist, card, t), .3) });
export const M = { mist: tone(mist, .72, .5), green: tone(green, .7, .48), device: mat(.52, .36, .24), slab: mat(.4, .27, .17), base: { top: mix(navy, card, .55), left: mix(navy, card, .3), right: navy, rim: mix(mist, card, .3) } };
export const lane = mix(mist, card, .1), screen = mix(navy, card, .7), mark = mix(paper, card, .18);

export const node = (tag: string, attrs: Attrs = {}, children?: SvgNode[]): SvgNode => ({ tag, attrs, children });
export function block({ x, y, z, w, d, h }: Box, m: Material, attrs: Attrs = {}): SvgNode {
  const face = (list: Point[], fill: string) => node('polygon', { points: pts(list), fill, stroke: fill });
  const kids = [
    face([P(x, y + d, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x, y + d, z + h)], m.left),
    face([P(x + w, y, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x + w, y, z + h)], m.right),
    face([P(x, y, z + h), P(x + w, y, z + h), P(x + w, y + d, z + h), P(x, y + d, z + h)], m.top),
  ];
  if (m.rim) {
    kids.push(node('polyline', { points: pts([P(x, y + d, z + h), P(x + w, y + d, z + h), P(x + w, y, z + h)]), fill: 'none', stroke: m.rim, 'stroke-width': .7, 'stroke-linecap': 'round' }));
    if (h > 2.5) { const [a, b] = [P(x + w, y + d, z), P(x + w, y + d, z + h)]; kids.push(node('line', { x1: r2(a[0]), y1: r2(a[1]), x2: r2(b[0]), y2: r2(b[1]), stroke: m.rim, 'stroke-width': .5, 'stroke-opacity': .45 })); }
  }
  return node('g', { 'stroke-width': .6, 'stroke-linejoin': 'round', ...attrs }, kids);
}
// A flat square on the floor, or at height z.
export const quad = (x: number, y: number, w: number, d: number, attrs: Attrs, z = 0) => node('polygon', { points: pts([P(x, y, z), P(x + w, y, z), P(x + w, y + d, z), P(x, y + d, z)]), ...attrs });
// A drawing plane on a block face: local u runs right and v runs down (left face: +x and −z; right face: −y and −z).
const AX = { left: [COS, .5, 0, 1], right: [COS, -.5, 0, 1] } as const;
export const plane = (side: keyof typeof AX, x: number, y: number, z: number, children: SvgNode[]) => { const [a, b, c, d] = AX[side], [e, f] = P(x, y, z); return node('g', { transform: `matrix(${[a, b, c, d, e, f].map(v => r2(v * 100) / 100).join(' ')})` }, children); };
export const rect = (x: number, y: number, w: number, h: number, fill: string) => node('rect', { x, y, width: w, height: h, fill });

/* A scene's loop: one track per `data-iso` name. A key is [ms, { x, y (px), r (deg), s, o }, easing into this key];
   values carry forward and the loop closes on its first frame. Keys at the same moment make an instant change. Only
   what changes is animated, and only the transform parts a track uses are written. A track can play on several
   elements at once (a beam and the trays that turn with it). */
export function keyframes(scene: string) {
  const tracks: Track[] = [];
  function animate(targets: SvgNode | SvgNode[], id: string, keys: Key[], init: Partial<State> = {}) {
    keys.forEach(([t], i) => {
      if (i && t < keys[i - 1][0]) throw new Error(`${scene}: keys out of order in ${id}`);
      if (t < 0 || t > CYCLE) throw new Error(`${scene}: ${id} has a key outside the loop`);
    });
    const first: State = { x: 0, y: 0, r: 0, s: 1, o: 1, ...init };
    if (first.r || first.s !== 1) throw new Error(`${scene}: ${id} must rest unturned and unscaled`);
    const states: [number, State, string][] = [[0, first, E.lin]];
    let cur = first;
    for (const [t, v, e] of keys) { cur = { ...cur, ...v }; states.push([t, cur, e ?? E.reveal]); }
    if (states[states.length - 1][0] < CYCLE) states.push([CYCLE, first, E.lin]);
    const moves = states.some(([, v]) => v.x || v.y), turns = states.some(([, v]) => v.r), scales = states.some(([, v]) => v.s !== 1);
    const T = (v: State) => [moves && `translate(${r2(v.x)}px,${r2(v.y)}px)`, turns && `rotate(${r2(v.r)}deg)`, scales && `scale(${r2(v.s)})`].filter(Boolean).join(' ') || 'none';
    const same = (a: State, b: State) => a.x === b.x && a.y === b.y && a.r === b.r && a.s === b.s && a.o === b.o;
    const out: Keyframe[] = states.map(([t, v], i) => {
      const next = states[i + 1];
      return { offset: Math.round(t / CYCLE * 1e5) / 1e5, transform: T(v), opacity: Math.round(v.o * 1000) / 1000, easing: next && next[2] !== E.lin && !same(v, next[1]) ? next[2] : undefined };
    });
    if (out.every(f => f.transform === out[0].transform)) out.forEach(f => { delete f.transform; });
    if (out.every(f => f.opacity === out[0].opacity)) out.forEach(f => { delete f.opacity; });
    out.forEach(f => { if (f.easing === undefined) delete f.easing; });
    for (const target of [targets].flat()) {
      target.attrs['data-iso'] = id;
      if (first.o !== 1) target.attrs.opacity = first.o;
      if (first.x || first.y) target.attrs.transform = `translate(${r2(first.x)} ${r2(first.y)})`;
    }
    if (out[0].transform !== undefined || out[0].opacity !== undefined) tracks.push([id, out]);
  }
  // A track that repeats every cycle from T0 (possibly negative): stops are [ms after T0, values], linear between
  // stops and wrapping across the end of the cycle exactly; the last stop returns to the first state.
  function loop(target: SvgNode, id: string, T0: number, stops: [number, Partial<State>][]) {
    const props = Object.keys(stops[0][1]) as (keyof State)[];
    const at = (t: number): Partial<State> => {
      const u = ((t - T0) % CYCLE + CYCLE) % CYCLE;
      for (let i = 0; i < stops.length; i++) {
        const [a, va] = stops[i], [b, vb]: [number, Partial<State>] = i + 1 < stops.length ? stops[i + 1] : [CYCLE, stops[0][1]];
        if (u >= a && u <= b) { const f = b > a ? (u - a) / (b - a) : 0, v: Partial<State> = {}; props.forEach(p => { v[p] = va[p]! + (vb[p]! - va[p]!) * f; }); return v; }
      }
      return { ...stops[0][1] };
    };
    const times = [0, CYCLE, ...stops.map(([s]) => ((T0 + s) % CYCLE + CYCLE) % CYCLE)].sort((a, b) => a - b).filter((t, i, all) => i === 0 || t - all[i - 1] > .5);
    animate(target, id, times.slice(1).map(t => [t, at(t), E.lin]), at(0));
  }
  return { tracks, animate, loop };
}

// Fit a scene's resting frame to the 336 × 168 view: the box of everything visible at rest, and of any points the
// loop must keep in view, less an 8 px margin, and drawn at most `cap` times its own size.
export function fit(world: SvgNode[], { cap = 1.75, extra = [] as Point[] } = {}) {
  type Matrix = [number, number, number, number, number, number];
  let ax = Infinity, ay = Infinity, bx = -Infinity, by = -Infinity;
  const take = ([x, y]: Point) => { ax = Math.min(ax, x); ay = Math.min(ay, y); bx = Math.max(bx, x); by = Math.max(by, y); };
  const times = (m: Matrix, n: Matrix): Matrix => [m[0] * n[0] + m[2] * n[1], m[1] * n[0] + m[3] * n[1], m[0] * n[2] + m[2] * n[3], m[1] * n[2] + m[3] * n[3], m[0] * n[4] + m[2] * n[5] + m[4], m[1] * n[4] + m[3] * n[5] + m[5]];
  const own = (tf: Attrs[string]): Matrix | null => {
    if (typeof tf !== 'string') return null;
    const v = tf.slice(tf.indexOf('(') + 1, -1).trim().split(/[\s,]+/).map(Number);
    return tf.startsWith('matrix') ? v as Matrix : [1, 0, 0, 1, v[0], v[1] ?? 0];
  };
  const walk = (list: SvgNode[], m: Matrix) => list.forEach(nd => {
    if (nd.attrs.opacity === 0) return;
    const tf = own(nd.attrs.transform), mm = tf ? times(m, tf) : m;
    const put = (x: number, y: number) => take([mm[0] * x + mm[2] * y + mm[4], mm[1] * x + mm[3] * y + mm[5]]);
    if (typeof nd.attrs.points === 'string') nd.attrs.points.split(' ').forEach(p => { const [x, y] = p.split(',').map(Number); put(x, y); });
    if (nd.tag === 'rect') { const [x, y, w, h] = [nd.attrs.x, nd.attrs.y, nd.attrs.width, nd.attrs.height].map(Number); put(x, y); put(x + w, y); put(x, y + h); put(x + w, y + h); }
    if (nd.children) walk(nd.children, mm);
  });
  walk(world, [1, 0, 0, 1, 0, 0]);
  extra.forEach(take);
  const k = Math.round(Math.min(cap, (336 - 16) / (bx - ax), (168 - 16) / (by - ay)) * 1e5) / 1e5;
  const tx = (336 - (bx - ax) * k) / 2 - ax * k, ty = (168 - (by - ay) * k) / 2 - ay * k;
  return `matrix(${k} 0 0 ${k} ${r2(tx)} ${r2(ty)})`;
}
