import { heroRandom } from '../motion/hero-choreography';

/** The /2/ hero flock (owner, 22 Oct 2026: the hero "looks awful and weird", make it "more fancy").
 * A Roman augur read the flight of birds and carried a curved staff, the lituus; the spiral named after
 * it (r²θ = a², Cotes 1722) has the staff's crook. Small clusters of Augur squares stream in from the
 * top of the hero along that spiral, like a flock with no leader, and curl into one dashed answer square:
 * many independent reports, one answer that no one controls.
 *
 * One source for the resting frame and the loop (hero-flock-v2.js reads `flockMotion`). Every cluster
 * follows one of six classes of keys on the 12 s cycle: three speed profiles (each class reaches the
 * pole at the end of its cycle but runs ahead or behind on the way, so the clusters pass each other and
 * gather again) times two phases of a lateral sway. A key is the cluster's pose,
 * [x, y, angle°, scale, opacity], in units of the 572 × 457 artwork; the website writes it as
 * `transform: translate() rotate() scale()` and `opacity`, so the loop runs on the compositor. A cluster
 * starts at its own point in the cycle (`phase`), and its static pose is the key at that point, so the
 * cycle opens and closes on the resting frame. Coordinates are deterministic (heroRandom). */
export const flockArt = { width: 572, height: 457 } as const;
export const flockCycle = 12000;
const lituus = { pole: [290, 236], a: 270, turn: -1.6, from: .16, to: 3.4 * Math.PI } as const;
const steps = 1200, keys = 72, clusters = 320, glyphCount = 16;
/** Speed profile b (the class runs at 1 + b·cos 2πτ of the mean speed) and sway phase. */
const classes = [-.3, 0, .3].flatMap(b => [0, Math.PI].map(sway => ({ b, sway })));

const curve = Array.from({ length: steps + 1 }, (_, i) => {
  const theta = lituus.from * (lituus.to / lituus.from) ** (i / steps), r = lituus.a / Math.sqrt(theta);
  return [lituus.pole[0] + r * Math.cos(theta + lituus.turn), lituus.pole[1] + r * Math.sin(theta + lituus.turn)] as const;
});
const lengths = curve.reduce<number[]>((list, point, i) => { list.push(i ? list[i - 1]! + Math.hypot(point[0] - curve[i - 1]![0], point[1] - curve[i - 1]![1]) : 0); return list; }, []);
const total = lengths.at(-1)!;
/** Point and tangent angle at a share of the spiral's length. */
function along(share: number) {
  const distance = Math.min(1, Math.max(0, share)) * total;
  let low = 0, high = steps;
  while (high - low > 1) { const mid = (low + high) >> 1; if (lengths[mid]! < distance) low = mid; else high = mid; }
  const a = curve[low]!, b = curve[high]!, f = (distance - lengths[low]!) / ((lengths[high]! - lengths[low]!) || 1);
  return { x: a[0] + (b[0] - a[0]) * f, y: a[1] + (b[1] - a[1]) * f, angle: Math.atan2(b[1] - a[1], b[0] - a[0]) };
}
const smooth = (v: number) => { const t = Math.min(1, Math.max(0, v)); return t * t * (3 - 2 * t); };
export type Pose = readonly [x: number, y: number, angle: number, scale: number, opacity: number];
function pose({ b, sway }: (typeof classes)[number], tau: number): Pose {
  // Clusters slow as they near the answer, so the curl holds more of them than the tail does.
  const lead = tau + b * Math.sin(2 * Math.PI * tau) / (2 * Math.PI), share = 1 - (1 - lead) ** 1.35, at = along(share);
  // A lateral sway, three waves per run, fading towards the pole.
  const offset = 9 * Math.sin(6 * Math.PI * tau + sway) * (1 - share);
  let x = at.x - Math.sin(at.angle) * offset, y = at.y + Math.cos(at.angle) * offset, scale = 1.25 - .7 * share;
  // The last stretch draws every cluster into the pole and shrinks it into the answer square.
  const pull = smooth((share - .86) / .14);
  x += (lituus.pole[0] - x) * pull; y += (lituus.pole[1] - y) * pull; scale *= 1 - .65 * pull;
  const opacity = Math.max(0, Math.min(1, share / .03, (1 - share) / .05));
  return [x, y, at.angle * 180 / Math.PI, scale, opacity];
}
const round = ([x, y, angle, scale, opacity]: Pose): Pose => [+x.toFixed(1), +y.toFixed(1), +angle.toFixed(1), +scale.toFixed(3), +opacity.toFixed(2)];
/** keys + 1 poses per class, the angle unwrapped so rotate() never turns the long way round. */
const samples = classes.map(type => {
  let last = 0;
  return Array.from({ length: keys + 1 }, (_, k) => {
    const value = pose(type, k / keys);
    let angle = value[2];
    if (k) { while (angle - last > 180) angle -= 360; while (angle - last < -180) angle += 360; }
    last = angle;
    return round([value[0], value[1], angle, value[3], value[4]]);
  });
});
/** The pose between keys, as the Web Animations API interpolates it (linearly, value by value). */
export function poseAt(type: number, tau: number): Pose {
  const list = samples[type]!, k = (tau - Math.floor(tau)) * keys, i = Math.min(keys - 1, Math.floor(k)), f = k - i;
  const a = list[i]!, b = list[i + 1]!;
  return a.map((value, n) => value + (b[n]! - value) * f) as unknown as Pose;
}

/** The squares a cluster carries: 2 to 5 on a 3-unit grid within ±9 of its centre, 3 to 6 units wide. */
export type Tone = 'mist' | 'pewter' | 'paper' | 'green';
export interface FlockSquare { x: number; y: number; size: number; tone: Tone }
export const flockGlyphs: FlockSquare[][] = Array.from({ length: glyphCount }, (_, g) => {
  const count = 2 + Math.floor(heroRandom(g, 11) * 4), taken = new Set<string>(), squares: FlockSquare[] = [];
  for (let n = 0; squares.length < count && n < 40; n++) {
    const x = (Math.floor(heroRandom(g * 40 + n, 12) * 7) - 3) * 3, y = (Math.floor(heroRandom(g * 40 + n, 13) * 7) - 3) * 3;
    if (taken.has(`${x},${y}`)) continue;
    taken.add(`${x},${y}`);
    const pick = heroRandom(g * 40 + n, 14), size = pick < .5 ? 3 : pick < .85 ? 4 : 6;
    const shade = heroRandom(g * 40 + n, 15);
    // Every fourth glyph carries one Green square: the reports.
    const tone: Tone = g % 4 === 1 && !squares.some(s => s.tone === 'green') ? 'green' : shade < .45 ? 'mist' : shade < .8 ? 'pewter' : 'paper';
    squares.push({ x, y, size, tone });
  }
  return squares;
});

/** Each cluster: its class, its point in the cycle, its lateral place in the stream and its glyph.
 * Phases come in loose groups, so the stream has denser and thinner stretches. */
export interface FlockCluster { type: number; phase: number; lateral: number; glyph: number; pose: Pose }
const gauss = (i: number, salt: number) => Math.sqrt(-2 * Math.log(Math.max(1e-6, heroRandom(i, salt)))) * Math.cos(2 * Math.PI * heroRandom(i, salt + 1));
export const flockClusters: FlockCluster[] = (() => {
  const list: FlockCluster[] = [];
  for (let group = 0; list.length < clusters; group++) {
    const centre = heroRandom(group, 21), size = 2 + Math.floor(heroRandom(group, 22) * 6);
    for (let n = 0; n < size && list.length < clusters; n++) {
      const i = list.length, phase = ((centre + gauss(i, 23) * .008) % 1 + 1) % 1;
      const type = Math.floor(heroRandom(i, 25) * classes.length), lateral = +Math.max(-50, Math.min(50, gauss(i, 26) * 20)).toFixed(1);
      list.push({ type, phase: +phase.toFixed(4), lateral, glyph: Math.floor(heroRandom(i, 28) * glyphCount), pose: round(poseAt(type, +phase.toFixed(4))) });
    }
  }
  return list;
})();
export const flockPole = lituus.pole;
/** The answer square breathes three times a cycle (scale), opening and closing at rest. */
export const flockPulse: readonly (readonly [number, number])[] = [[0, 1], [3900, 1], [4200, 1.14], [4900, 1], [7900, 1], [8200, 1.14], [8900, 1], [11600, 1], [11900, 1.08], [12000, 1]];
/** What the website's loop reads: the keys per class, the artwork width and the answer pulse. */
export const flockMotion = { width: flockArt.width, cycle: flockCycle, samples, pulse: flockPulse } as const;
