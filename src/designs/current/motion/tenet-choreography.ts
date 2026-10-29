import { crossAnywhere, peerMesh, noAuthority } from '../data/diagrams';

/** Tenet diagram choreography (owner feedback, 6 Oct 2026: “more dynamic,
 * alive”). One source for the website loops and the Figma keyframes in
 * Section details 250:717: every track is a list of keys on a 12 s cycle, in
 * milliseconds, and opens and closes on the static diagram, so the
 * server-rendered artwork is also the no-JavaScript, reduced-motion and print
 * state. A key's easing shapes the segment that arrives at it (Figma's
 * convention); the website converts it for the Web Animations API.
 *
 * - Permissionless: newcomers cross the open edge one after another without
 *   stopping on it, light Green as they enter, stay on as Paper members,
 *   settle to Mist, and later leave again. Two are usually lit at once.
 * - Decentralized: a relay tours the mesh without ever turning back, through
 *   every square and along all 16 links, leaving a fading lit trail.
 * - Trustless: each lane fires like a neuron. The sender flashes, a Paper
 *   signal crosses the empty middle and the receiver fires Green.
 *
 * Every square that lights up also pulses (owner pick, 6 Oct 2026): it pops
 * and sends out a thin outline of itself that grows and fades.
 */
export const tenetCycle = 12000;
export type { Ease, Value, Key, Track } from './choreography';
import { close as closeOn, pulses as pulsesOn, type Key, type Pulse, type Track, type Value } from './choreography';
import { easing } from '../../../motion/timelines';
const pulses = (list: Pulse[], options?: { base?: number; from?: number }) => pulsesOn(list, tenetCycle, options);
const close = (keys: Key[]) => closeOn(keys, tenetCycle);

/* Pulse --------------------------------------------------------------------- */

/** A square lighting up pops to `scale` and back, and its outline (a 1 px
 * square of the same size, Paper or Green) grows to `ringScale` as it fades. */
export const pulseTiming = { pop: [140, 420], scale: 1.16, ring: 700, ringRise: 40, ringPeak: .85, ringScale: 1.75 } as const;
const pops = (id: string, starts: number[], { delay, scale = pulseTiming.scale, pop = pulseTiming.pop }: { delay?: number; scale?: number; pop?: readonly [number, number] } = {}): Track =>
  ({ id, prop: 'scale', delay, keys: close([{ t: 0, v: 1 }, ...starts.flatMap((at): Key[] => [{ t: at, v: 1 }, { t: at + pop[0], v: scale, e: 'reveal' }, { t: at + pop[1], v: 1, e: 'crossfade' }])]) });
const rings = (id: string, starts: number[], delay?: number): Track[] => {
  const r = pulseTiming;
  return [
    { id, prop: 'opacity', delay, keys: pulses(starts.map(at => ({ start: at, rise: r.ringRise, hold: 0, fall: r.ring - r.ringRise, peak: r.ringPeak }))) },
    // The outline snaps back to its own size once it has faded.
    { id, prop: 'scale', delay, keys: close([{ t: 0, v: 1 }, ...starts.flatMap((at): Key[] => [{ t: at, v: 1 }, { t: at + r.ring, v: r.ringScale, e: 'reveal' }, { t: at + r.ring + 1, v: 1, e: 'hold' }])]) },
  ];
};

/* Permissionless ------------------------------------------------------------ */

/** Each crosser starts on the edge (the static diagram) and cycles: it finishes
 * crossing, lights Green as it passes the edge, stays on as a Paper member,
 * settles to Mist, leaves back across the edge and slides in again. The four
 * are 3 s apart, so one crosses every 3 s and one is usually leaving. A crosser
 * never stops on the edge (owner, 6 Oct 2026): it comes back at the speed it
 * carries into its seat, and while the later three wait for their first turn
 * they leave and come back instead of holding the static frame. */
export const crossTiming = { stagger: 3000, enter: 700, lit: [350, 600], green: 2400, member: [3200, 4000, 5600], leave: [6400, 6700, 7300], away: 11200, fadeIn: 160, retreat: 600, trail: 300,
  seat: { first: 300, every: 900, rise: 300, hold: 300, fall: 900, peak: .55 } } as const;
/** Seated members take turns brightening in a scattered order (participant indices). */
const seatOrder: readonly number[] = [5, 9, 2, 7, 0, 10, 4, 11, 1, 6, 3, 8];
/** Just inside the edge for each crosser (top, right, bottom, Green newcomer on the left). */
const arrivals: readonly (readonly [number, number])[] = [[0, 26], [-28, 0], [0, -26], [28, 0]];
/** How long each crosser takes to slide in from outside to the edge (ms): a
 * steady speed equal to the speed at which its curve into the seat begins. */
export const crossApproach = crossAnywhere.crossers.map((square, i) => {
  const [x1 = 1, y1 = 1] = (easing[i === 3 ? 'newcomer' : 'reveal'].match(/-?[\d.]+/g) ?? []).map(Number);
  const speed = y1 / x1 * Math.hypot(...arrivals[i]!) / crossTiming.enter;
  return Math.round(Math.hypot(square.dx, square.dy) / speed);
});
function crossTracks(): Track[] {
  const t = crossTiming, tracks: Track[] = [];
  crossAnywhere.crossers.forEach((square, i) => {
    const delay = i * t.stagger, inside = arrivals[i]!, away: Value = [square.dx, square.dy];
    const back = tenetCycle - crossApproach[i]!, early = delay - crossApproach[i]!;
    tracks.push({ id: `cross:${i}`, prop: 'translate', delay, keys: [
      { t: 0, v: [0, 0] }, { t: t.enter, v: inside, e: i === 3 ? 'newcomer' : 'reveal' }, { t: t.leave[1], v: inside },
      { t: t.leave[2], v: away, e: 'crossfade' }, { t: back, v: away }, { t: tenetCycle, v: [0, 0], e: 'linear' },
    ], lead: delay ? [{ t: 0, v: [0, 0] }, { t: t.retreat, v: away, e: 'crossfade' }, { t: early, v: away }, { t: delay, v: [0, 0], e: 'linear' }] : undefined });
    tracks.push({ id: `cross:${i}`, prop: 'opacity', delay, keys: close([
      { t: 0, v: 1 }, { t: t.leave[1] + 200, v: 1 }, { t: t.leave[2], v: 0, e: 'crossfade' }, { t: back, v: 0 }, { t: back + t.fadeIn, v: 1, e: 'crossfade' },
    ]), lead: delay ? [{ t: 0, v: 1 }, { t: t.retreat, v: 0, e: 'crossfade' }, { t: early, v: 0 }, { t: early + t.fadeIn, v: 1, e: 'crossfade' }, { t: delay, v: 1 }] : undefined });
    // Green as it crosses in. The newcomer is Green already, so it only stays Green.
    if (i !== 3) tracks.push({ id: `cross-green:${i}`, prop: 'opacity', delay, keys: pulses([{ start: t.lit[0], rise: t.lit[1] - t.lit[0], hold: t.green - t.lit[1], fall: t.member[0] - t.green }]) });
    // Paper while it is a new member, and again as it leaves.
    tracks.push({ id: `cross-paper:${i}`, prop: 'opacity', delay, keys: pulses([
      { start: t.green, rise: t.member[0] - t.green, hold: t.member[1] - t.member[0], fall: t.member[2] - t.member[1] },
      { start: t.leave[0], rise: t.leave[1] - t.leave[0], hold: t.leave[2] - t.leave[1], fall: 100, peak: .9 },
    ]) });
    // It pulses Green as it crosses the edge.
    tracks.push(pops(`cross-pop:${i}`, [t.lit[0]], { delay }), ...rings(`cross-ring:${i}`, [t.lit[0]], delay));
    // The newcomer settles to Mist like everyone else, then is Green again before it returns.
    if (i === 3) tracks.push({ id: `cross-mist:${i}`, prop: 'opacity', delay, keys: close([
      { t: 0, v: 0 }, { t: t.member[1], v: 0 }, { t: t.member[2], v: 1, e: 'crossfade' }, { t: t.away, v: 1 }, { t: t.away + 1, v: 0, e: 'hold' },
    ]) });
  });
  // Each trail fades as its crosser passes the edge and returns as it slides in again.
  crossAnywhere.trails.forEach((trail, j) => {
    const i = Math.floor(j / 2), delay = i * t.stagger, back = tenetCycle - crossApproach[i]!, early = delay - crossApproach[i]!;
    tracks.push({ id: `cross-trail:${j}`, prop: 'opacity', delay, keys: [
      { t: 0, v: trail.opacity }, { t: t.trail, v: 0, e: 'crossfade' }, { t: back, v: 0 }, { t: tenetCycle, v: trail.opacity, e: 'crossfade' },
    ], lead: delay ? [{ t: 0, v: trail.opacity }, { t: t.trail, v: 0, e: 'crossfade' }, { t: early, v: 0 }, { t: delay, v: trail.opacity, e: 'crossfade' }] : undefined });
  });
  // Members inside are active too: one brightens softly every 0.9 s, all within the cycle.
  crossAnywhere.participants.forEach((_, j) => {
    const start = t.seat.first + seatOrder.indexOf(j) * t.seat.every;
    tracks.push({ id: `cross-seat:${j}`, prop: 'opacity', keys: pulses([{ start, rise: t.seat.rise, hold: t.seat.hold, fall: t.seat.fall, peak: t.seat.peak }]) },
      pops(`cross-seat-pop:${j}`, [start]), ...rings(`cross-seat-ring:${j}`, [start]));
  });
  return tracks;
}

/* Decentralized ------------------------------------------------------------- */

/** A closed route through the mesh that never turns straight back and covers all
 * 16 links (participant indices; it starts and ends on the square lit at rest).
 * Found by search: no route visits every square exactly once. */
export const meshTour = [8, 9, 10, 5, 1, 2, 6, 10, 11, 7, 3, 6, 10, 9, 4, 0, 1, 5, 4, 8] as const;
export const meshTiming = { dwell: 140, home: 900, linkRise: 120, trail: 900, nodeLead: 80, nodeRise: 160 } as const;
const centre = (i: number) => { const [x, y] = peerMesh.participants[i]!; return [x + 10, y + 10] as const; };
const linkIndex = (a: number, b: number) => peerMesh.links.findIndex(([x1, y1, x2, y2]) => {
  const [ax, ay] = centre(a), [bx, by] = centre(b);
  return (x1 === ax && y1 === ay && x2 === bx && y2 === by) || (x1 === bx && y1 === by && x2 === ax && y2 === ay);
});
/** Departure and arrival times for each hop: constant speed, a short handoff at
 * each square, and a longer one at home so the trail has faded when the loop restarts. */
export function meshHops() {
  const m = meshTiming, hops = meshTour.slice(1).map((to, k) => {
    const from = meshTour[k]!, [ax, ay] = centre(from), [bx, by] = centre(to);
    return { from, to, link: linkIndex(from, to), length: Math.hypot(bx - ax, by - ay) };
  });
  const travel = tenetCycle - (hops.length - 1) * m.dwell - m.home, total = hops.reduce((sum, hop) => sum + hop.length, 0);
  let clock = 0;
  return hops.map(hop => {
    const depart = clock, arrive = depart + travel * hop.length / total;
    clock = arrive + m.dwell;
    return { ...hop, depart, arrive };
  });
}
function meshTracks(): Track[] {
  const m = meshTiming, hops = meshHops(), home = meshTour[0];
  const nodes = peerMesh.participants.map(() => [] as Pulse[]), links = peerMesh.links.map(() => [] as Pulse[]), lands = peerMesh.participants.map(() => [] as number[]);
  hops.forEach((hop, k) => {
    links[hop.link]!.push({ start: hop.depart, rise: m.linkRise, hold: hop.arrive - hop.depart - m.linkRise, fall: m.trail });
    const leaves = hops[k + 1]?.depart ?? tenetCycle;
    lands[hop.to]!.push(hop.arrive - m.nodeLead);
    if (hop.to !== home) nodes[hop.to]!.push({ start: hop.arrive - m.nodeLead, rise: m.nodeRise, hold: leaves - hop.arrive - m.nodeRise + m.nodeLead, fall: m.trail });
  });
  // Home is lit at rest: it fades as the relay leaves and relights on its return.
  const last = hops.at(-1)!;
  // Its last pulse holds past the cycle end, so the track closes lit.
  nodes[home]!.push({ start: last.arrive - m.nodeLead, rise: m.nodeRise, hold: tenetCycle, fall: m.trail });
  const tracks: Track[] = [];
  nodes.forEach((list, i) => tracks.push({ id: `mesh-node:${i}`, prop: 'opacity', keys: i === home ? pulses([{ start: 0, rise: 0, hold: 0, fall: m.trail }, ...list], { from: 1 }) : pulses(list) }));
  links.forEach((list, i) => { if (list.length) tracks.push({ id: `mesh-link:${i}`, prop: 'opacity', keys: pulses(list) }); });
  lands.forEach((list, i) => { if (list.length) tracks.push(pops(`mesh-pop:${i}`, list), ...rings(`mesh-ring:${i}`, list)); });
  const [hx, hy] = centre(home), at = (i: number): Value => { const [x, y] = centre(i); return [x - hx, y - hy]; };
  const packet: Key[] = [{ t: 0, v: [0, 0] }];
  hops.forEach(hop => { if (hop.depart > 0) packet.push({ t: hop.depart, v: at(hop.from) }); packet.push({ t: hop.arrive, v: at(hop.to), e: 'crossfade' }); });
  tracks.push({ id: 'mesh-packet', prop: 'translate', keys: close(packet) });
  return tracks;
}

/* Trustless ----------------------------------------------------------------- */

/** When each lane fires (ms): irregular, like neurons, never overlapping on a
 * lane and finished by the cycle end; together they leave no quiet moment. */
export const laneFires = [[0, 2900, 6100, 9000], [1100, 4700, 9700], [2200, 5600, 8400]] as const;
export const fireTiming = { flash: [80, 360], pop: [120, 380], leave: 100, travel: 1200, fade: 60, lag: [60, 120], line: [[100, 200, 520], [850, 950, 1300]], land: [1250, 1330, 1650, 2300], landPop: [1400, 1750] } as const;
const distance = noAuthority.right - 6 - 28;
function authorityTracks(): Track[] {
  const f = fireTiming, tracks: Track[] = [];
  laneFires.forEach((fires, lane) => {
    tracks.push({ id: `auth-flash:${lane}`, prop: 'opacity', keys: pulses(fires.map(at => ({ start: at, rise: f.flash[0], hold: 0, fall: f.flash[1] - f.flash[0] }))) });
    tracks.push({ id: `auth-sender:${lane}`, prop: 'scale', keys: close([{ t: 0, v: 1 }, ...fires.flatMap((at): Key[] => [{ t: at, v: 1 }, { t: at + f.pop[0], v: 1.18, e: 'reveal' }, { t: at + f.pop[1], v: 1, e: 'crossfade' }])]) });
    // The signal and its two fainter followers cross at constant speed.
    [0, ...f.lag].forEach((lag, part) => {
      const peak = [1, .5, .25][part]!, id = part ? `auth-trace:${lane}:${part}` : `auth-signal:${lane}`;
      tracks.push({ id, prop: 'opacity', keys: close([{ t: 0, v: 0 }, ...fires.flatMap((at): Key[] => {
        const go = at + f.leave + lag;
        return [{ t: go, v: 0 }, { t: go + f.fade, v: peak, e: 'linear' }, { t: go + f.travel - f.fade, v: peak }, { t: go + f.travel, v: 0, e: 'linear' }];
      })]) });
      tracks.push({ id, prop: 'translate', keys: close([{ t: 0, v: [0, 0] }, ...fires.flatMap((at): Key[] => {
        const go = at + f.leave + lag;
        return [{ t: go, v: [0, 0] }, { t: go + f.travel, v: [distance, 0], e: 'linear' }, { t: go + f.travel + 1, v: [0, 0], e: 'hold' }];
      })]) });
    });
    // The solid lane segments light as the signal runs along them; the middle stays dark.
    f.line.forEach(([start, top, end], side) => tracks.push({ id: `auth-line:${lane}:${side}`, prop: 'opacity', keys: pulses(fires.map(at => ({ start: at + start, rise: top - start, hold: 0, fall: end - top, peak: .9 }))) }));
    tracks.push({ id: `auth-fire:${lane}`, prop: 'opacity', keys: pulses(fires.map(at => ({ start: at + f.land[0], rise: f.land[1] - f.land[0], hold: f.land[2] - f.land[1], fall: f.land[3] - f.land[2] }))) });
    tracks.push(...rings(`auth-sender-ring:${lane}`, [...fires]), ...rings(`auth-receiver-ring:${lane}`, fires.map(at => at + f.land[0])));
    tracks.push({ id: `auth-receiver:${lane}`, prop: 'scale', keys: close([{ t: 0, v: 1 }, ...fires.flatMap((at): Key[] => [{ t: at + f.land[0], v: 1 }, { t: at + f.landPop[0], v: 1.16, e: 'reveal' }, { t: at + f.landPop[1], v: 1, e: 'crossfade' }])]) });
  });
  return tracks;
}

export const tenetChoreography = { cross: crossTracks(), mesh: meshTracks(), authority: authorityTracks() } as const;
