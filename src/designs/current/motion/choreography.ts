import { easing } from '../../../motion/timelines';

/** Shared keyframe language for looping scenes that exist both on the website
 * and as Figma keyframes (tenet diagrams, hero ambience). A track is a list of
 * keys on one cycle, in milliseconds, opening and closing on the static
 * artwork. A key's easing shapes the segment arriving at it (Figma's
 * convention); `keyframes()` converts that for the Web Animations API, which
 * eases the segment leaving each keyframe. */
export type Ease = 'linear' | 'reveal' | 'crossfade' | 'draw' | 'newcomer' | 'hold';
export type Value = number | readonly [number, number];
export interface Key { t: number; v: Value; e?: Ease }
/** `lead` keys play once over a track's `delay`, before its first cycle: they
 * open on the static artwork and end where the cycle begins, so an element
 * waiting for its turn keeps moving instead of holding the static frame. */
export interface Track { id: string; prop: 'opacity' | 'translate' | 'scale'; keys: Key[]; delay?: number; lead?: Key[]; target?: string }
/* A `scale` value may be a pair, written as scale(x, y): the REP zone's reward meter
   fills with scaleX only (rep-choreography.ts). */
export interface Pulse { start: number; rise: number; hold: number; fall: number; peak?: number }

/** Ends a track on the cycle boundary with the value it began with. */
export function close(keys: Key[], cycle: number): Key[] {
  const sorted = keys.filter(key => key.t >= 0 && key.t <= cycle).sort((a, b) => a.t - b.t);
  if (sorted.at(-1)!.t < cycle) sorted.push({ t: cycle, v: sorted[0]!.v });
  return sorted;
}

/** Keys for a series of pulses; a pulse that begins before the last one has
 * faded continues from the current level instead of jumping. */
export function pulses(list: Pulse[], cycle: number, { base = 0, from = base }: { base?: number; from?: number } = {}): Key[] {
  const keys: Key[] = [{ t: 0, v: from }];
  const valueAt = (t: number) => {
    const after = keys.findIndex(key => key.t > t);
    if (after === -1) return keys.at(-1)!.v as number;
    const a = keys[after - 1]!, b = keys[after]!;
    return (a.v as number) + ((b.v as number) - (a.v as number)) * ((t - a.t) / (b.t - a.t));
  };
  for (const pulse of [...list].sort((a, b) => a.start - b.start)) {
    const level = valueAt(pulse.start);
    while (keys.length && keys.at(-1)!.t > pulse.start) keys.pop();
    if (keys.at(-1)?.t !== pulse.start) keys.push({ t: pulse.start, v: level });
    const peak = pulse.peak ?? 1, top = pulse.start + pulse.rise, end = top + pulse.hold + pulse.fall;
    if (pulse.rise > 0) keys.push({ t: top, v: peak, e: 'crossfade' }); else keys.at(-1)!.v = peak;
    if (pulse.hold > 0) keys.push({ t: top + pulse.hold, v: peak });
    keys.push({ t: end, v: base, e: 'crossfade' });
  }
  return close(keys, cycle);
}

const curve = (name?: Ease) => name === 'hold' ? 'step-end' : name && name !== 'linear' ? easing[name] : 'linear';
/** Web Animations keyframes for a track (each keyframe takes its successor's easing). */
export function keyframes(track: Track, cycle: number, unit: (value: number) => string = value => `${value}px`, { individual = true } = {}): Keyframe[] {
  const move = (v: Value) => `${unit((v as readonly number[])[0]!)} ${unit((v as readonly number[])[1]!)}`;
  const value = (v: Value): Keyframe => track.prop === 'opacity' ? { opacity: v as number }
    : track.prop === 'scale' ? (individual ? { scale: String(v) } : { transform: `scale(${v})` })
    : individual ? { translate: move(v) } : { transform: `translate(${move(v).replace(' ', ',')})` };
  return track.keys.map((key, i) => ({ offset: key.t / cycle, ...value(key.v), easing: curve(track.keys[i + 1]?.e) }));
}
