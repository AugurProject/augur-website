import { close, pulses, type Key, type Pulse, type Track } from './choreography';

/** Hero ambience (owner feedback, 6 Oct 2026: the old ring wave was “weird,
 * not dynamic” and barely answered the cursor). One 12 s story, told by the
 * squares around the empty centre, shared with Figma Section details:
 *
 * 1. Ask: the dashed centre pulses and a Paper wave pops outward, ring by ring.
 * 2. Report: scattered squares flash Green, independently.
 * 3. Agree: a wave contracts inward and the inner ring holds Green around the
 *    still-empty centre.
 *
 * Between events every outer square drifts on its own small orbit. Pointer
 * and tap responses (a lens that parts the field, a Green ripple) are runtime
 * behaviour in hero-ambient.ts, not tracks. Times are milliseconds. */
export const heroCycle = 12000;
export const heroCentre = [286, 228.5] as const;
export const heroMotion = {
  /** Orbit periods divide the cycle; amplitude (px at 1440) by ring, 1 = inner. */
  drift: { periods: [4000, 6000, 12000], amplitude: [0, 0, 1.4, 2.2, 3, 3.8, 4.6, 5.4] },
  broadcast: { start: 240, stagger: 110, jitter: 70, rise: 170, fall: 380, scale: [1, 1.08, 1.14, 1.24, 1.4, 1.6, 1.8, 1.9] },
  reports: { share: [0, 0, .25, .4, .42, .38, .3, .25], window: [1800, 5400], rise: 90, hold: 260, fall: 700, scale: 1.22 },
  consensus: { start: 6300, stagger: 110, jitter: 50, rise: 180, fall: 440, scale: .82, inner: [7200, 7450, 8500, 9400] },
  centre: { ask: [0, 220, 760], scale: 1.22 },
} as const;

/** Deterministic variety: the same on every load, in every browser and in Figma. */
export const heroRandom = (index: number, salt: number) => {
  const x = Math.sin((index + 1) * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

/** The artwork's squares, in document order: read from the rendered HTML on
 * the website (so the geometry is not shipped twice) or from data/hero-art.ts
 * when exporting keyframes for Figma. */
export interface HeroSquareGeometry { x: number; y: number; size: number; ring: number }
export interface HeroSquareMotion { index: number; ring: number; centreX: number; centreY: number; report: number | null }
export const heroSquareMotion = (squares: readonly HeroSquareGeometry[]): HeroSquareMotion[] => squares.map((square, index) => {
  const r = heroMotion.reports, picked = heroRandom(index, 3) < (r.share[square.ring] ?? 0);
  return { index, ring: square.ring, centreX: square.x + square.size / 2, centreY: square.y + square.size / 2,
    report: picked ? Math.round(r.window[0] + heroRandom(index, 4) * (r.window[1] - r.window[0])) : null };
});

const pop = (start: number, rise: number, fall: number, peak: number): Key[] => [{ t: start, v: 1 }, { t: start + rise, v: peak, e: 'reveal' }, { t: start + rise + fall, v: 1, e: 'crossfade' }];

function squareTracks(square: HeroSquareMotion): Track[] {
  const m = heroMotion, tracks: Track[] = [], { index, ring } = square;
  // Drift: a small orbit about the resting place, radial or tangential, in or out.
  const amplitude = (m.drift.amplitude[ring] ?? 0) * (.7 + .6 * heroRandom(index, 5));
  if (amplitude > 0) {
    const period = m.drift.periods[Math.floor(heroRandom(index, 6) * m.drift.periods.length)]!;
    const radial = Math.atan2(square.centreY - heroCentre[1], square.centreX - heroCentre[0]);
    const angle = radial + (heroRandom(index, 7) < .5 ? 0 : Math.PI / 2) + (heroRandom(index, 8) < .5 ? 0 : Math.PI);
    const peak = [Math.round(Math.cos(angle) * amplitude * 10) / 10, Math.round(Math.sin(angle) * amplitude * 10) / 10] as const;
    const keys: Key[] = [{ t: 0, v: [0, 0] }];
    for (let t = 0; t < heroCycle; t += period) keys.push({ t: t + period / 2, v: peak, e: 'crossfade' }, { t: t + period, v: [0, 0], e: 'crossfade' });
    tracks.push({ id: `hero-drift:${index}`, prop: 'translate', keys: close(keys, heroCycle) });
  }
  // Pops: the question going out, a report coming in, the answer drawing together.
  const b = m.broadcast, c = m.consensus, r = m.reports;
  const out = b.start + (ring - 1) * b.stagger + Math.round(heroRandom(index, 9) * b.jitter);
  const back = c.start + (7 - ring) * c.stagger + Math.round(heroRandom(index, 10) * c.jitter);
  const scale: Key[] = [{ t: 0, v: 1 }, ...pop(out, b.rise, b.fall, b.scale[ring] ?? 1.2)];
  if (square.report !== null) scale.push(...pop(square.report, r.rise, r.hold + r.fall / 2, r.scale));
  scale.push({ t: back, v: 1 }, { t: back + c.rise, v: c.scale, e: 'crossfade' }, { t: back + c.rise + c.fall, v: 1, e: 'reveal' });
  tracks.push({ id: `hero-pop:${index}`, prop: 'scale', keys: close(scale, heroCycle) });
  // Green light: a report, or the inner ring holding the agreed answer.
  const green: Pulse[] = [];
  if (square.report !== null) green.push({ start: square.report, rise: r.rise, hold: r.hold, fall: r.fall });
  if (ring === 1) green.push({ start: c.inner[0], rise: c.inner[1] - c.inner[0], hold: c.inner[2] - c.inner[1], fall: c.inner[3] - c.inner[2] });
  if (green.length) tracks.push({ id: `hero-green:${index}`, prop: 'opacity', keys: pulses(green, heroCycle) });
  return tracks;
}

export const heroChoreography = (squares: readonly HeroSquareGeometry[]): Track[] => [
  ...heroSquareMotion(squares).flatMap(squareTracks),
  { id: 'hero-centre', prop: 'scale', keys: close([{ t: 0, v: 1 }, { t: heroMotion.centre.ask[1], v: heroMotion.centre.scale, e: 'reveal' }, { t: heroMotion.centre.ask[2], v: 1, e: 'crossfade' }], heroCycle) },
];
