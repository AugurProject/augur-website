import { close, type Key, type Track } from './choreography';
import { pulseTiming } from './tenet-choreography';

/** The “Your REP” panels' loop under the How it works steps (19 Oct 2026), one
 * source for the website and the Figma keyframes. Only the shown step's panel runs,
 * from rest, on one 12 s cycle that opens and closes on the static artwork (every
 * square at full strength). Twice a cycle it tells the step's story:
 * - flow (Report, Challenge): what comes back dims to “not yet”; the bond lifts off
 *   the stake (the stake fades as an identical copy appears over it) and glides along
 *   the arrow; as it lands, what comes back lights up, the returned bond and the payoff
 *   figure give a small bump and the Green winnings pop; a few seconds later the stake
 *   settles back.
 * - receipt (Get paid): all three groups dim, then light up one by one, each with a pop,
 *   and the payoff figure bumps after the last.
 * - meter (A question opens): the reward fill fades, restarts at 0 and rises back to
 *   its resting sixth of the fee over most of the cycle (scaleX only).
 * Glide values are fractions of the stake-to-bond distance, which the page measures.
 * A track's `target` is a selector inside the panel; otherwise its id names a
 * `data-motion` element. */
export const repCycle = 12000;
export const repTiming = {
  sends: [600, 6600], dim: 300, rest: .28, lift: 150, travel: 1300, land: 120, fadeOut: 200, peak: .95,
  bump: { rise: 140, fall: 420, scale: 1.08 }, popAfter: 60, popStagger: 90, earned: 2400, restore: 400, stakeRest: .3,
  receipt: { windows: [300, 6300], dim: 300, first: 300, stagger: 220, light: 140 },
  meter: { rest: 1 / 6, fadeAt: 1400, fade: 300, restart: 200, rise: 9000 },
} as const;

const pop = (at: number, scale: number = pulseTiming.scale, [rise, fall]: readonly [number, number] = pulseTiming.pop): Key[] => [{ t: at, v: 1 }, { t: at + rise, v: scale, e: 'reveal' }, { t: at + fall, v: 1, e: 'crossfade' }];
const scaleTrack = (id: string, starts: readonly number[], target?: string, scale?: number, timing?: readonly [number, number]): Track => ({ id, target, prop: 'scale', keys: close([{ t: 0, v: 1 }, ...starts.flatMap(at => pop(at, scale, timing))], repCycle) });

/** Tracks for one panel; ids and targets match RepFlow.astro. `gains` counts the
 * panel's popping groups (Green winnings in a flow, every group in a receipt). */
export function repZoneTracks(kind: 'meter' | 'flow' | 'receipt', gains: number): Track[] {
  const t = repTiming;
  if (kind === 'meter') {
    const m = t.meter, gone = m.fadeAt + m.fade, back = gone + m.restart;
    return [
      { id: 'zone-meter', prop: 'scale', keys: close([{ t: 0, v: [m.rest, 1] }, { t: gone, v: [m.rest, 1] }, { t: gone + 1, v: [0, 1], e: 'hold' }, { t: back, v: [0, 1] }, { t: back + m.rise, v: [m.rest, 1], e: 'linear' }], repCycle) },
      { id: 'zone-meter-fade', prop: 'opacity', keys: close([{ t: 0, v: 1 }, { t: m.fadeAt, v: 1 }, { t: gone, v: 0, e: 'crossfade' }, { t: gone + 1, v: 1, e: 'hold' }], repCycle) },
    ];
  }
  if (kind === 'receipt') {
    const r = t.receipt, lights = (k: number) => r.windows.map(at => at + r.dim + r.first + k * r.stagger);
    // The groups no longer dim (owner, 19 Oct 2026: the faded squares read as missing); they only pop in turn.
    return [scaleTrack('zone-stat', lights(gains - 1).map(at => at + r.light), '.zone-stat strong', t.bump.scale, [t.bump.rise, t.bump.fall]), ...Array.from({ length: gains }, (_, k) => scaleTrack(`zone-pop-${k}`, lights(k)))];
  }
  const lands = t.sends.map(at => at + t.travel);
  const outcome: Track = { id: 'zone-outcome', target: '.flow-outcome', prop: 'opacity', keys: close([{ t: 0, v: 1 }, ...t.sends.flatMap((at, i): Key[] => [{ t: at - t.dim, v: 1 }, { t: at, v: t.rest, e: 'crossfade' }, { t: lands[i]!, v: t.rest }, { t: lands[i]! + t.land, v: 1, e: 'reveal' }])], repCycle) };
  const stake: Track = { id: 'zone-stake', target: '[data-stake] .squares', prop: 'opacity', keys: close([{ t: 0, v: 1 }, ...t.sends.flatMap((at, i): Key[] => [{ t: at, v: 1 }, { t: at + t.lift, v: t.stakeRest, e: 'crossfade' }, { t: lands[i]! + t.earned, v: t.stakeRest }, { t: lands[i]! + t.earned + t.restore, v: 1, e: 'crossfade' }])], repCycle) };
  const ghost: Track = { id: 'zone-ghost', prop: 'opacity', keys: close([{ t: 0, v: 0 }, ...t.sends.flatMap((at, i): Key[] => [{ t: at, v: 0 }, { t: at + t.lift, v: t.peak, e: 'crossfade' }, { t: lands[i]!, v: t.peak }, { t: lands[i]! + t.fadeOut, v: 0, e: 'crossfade' }])], repCycle) };
  // The copy jumps back to the stake while hidden, then slides onto the returned bond.
  const glide: Track = { id: 'zone-glide', prop: 'translate', keys: close([{ t: 0, v: [0, 0] }, ...t.sends.flatMap((at, i): Key[] => [{ t: at, v: [0, 0] }, { t: lands[i]!, v: [1, 1], e: 'draw' }, { t: lands[i]! + t.fadeOut + 1, v: [0, 0], e: 'hold' }])], repCycle) };
  const bump = scaleTrack('zone-back', lands, '[data-bond-back] .squares', t.bump.scale, [t.bump.rise, t.bump.fall]);
  const stat = scaleTrack('zone-stat', lands.map(at => at + t.popAfter), '.zone-stat strong', t.bump.scale, [t.bump.rise, t.bump.fall]);
  return [outcome, stake, ghost, glide, bump, stat, ...Array.from({ length: gains }, (_, k) => scaleTrack(`zone-pop-${k}`, lands.map(at => at + t.popAfter + k * t.popStagger)))];
}
