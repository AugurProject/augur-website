// The review copies' use cases (owner, 25 Oct 2026): product cards (Applications.astro renders this right after
// the section). Each card is rendered answered, so no JavaScript, reduced motion and print show the finished
// card. Each card loops (owner, 28 Oct 2026: "all animations should be going in a loop"): one choreography on
// a 12 s cycle that opens and closes on the finished card. The card resets softly, never a cut (owner, 28 Oct
// 2026): it dims, and its values cross-fade back to the start. Then its query is asked, the app plays its part,
// Augur Lituus answers and goes Final, the app acts, and the finished card holds until the cycle ends. One part
// is lit at a time (owner, 28 Oct 2026: "our eyes are not going to where it should be going"): the part in play
// is lit, a part still to come waits at `dim` and a part that has played steps back to `past`. The status chip
// in the corner is lit only while the query is asked, so its later changes never pull the eye away from the
// card; at the end everything comes back up.
// The market card is a query split in two (owner, 26 Oct 2026, "Split it is"): Asked while the market's price
// climbs to 99¢, then the report, open to challenge while a line fills, then Final, then the market pays. The
// insurance card is the same query as a relay (owner, 28 Oct 2026, "Relay it is"): the flight's stretch runs
// while it's in the air, the next stretch fills while the report is open to challenge, and the line runs Green
// to the cover as it pays. The DAO card is the same query as a switch (owner, 29 Oct 2026, "implement the Switch
// into /melo"): the vote turns the upgrade's go-live switch on, Augur Lituus's larger part answers Yes on the
// DAO's written rules, and the switch goes back off. Ryan's and Augus's DAO card, a proposal, loops on the same
// cycle: its check runs and its answers come in.
// The loop starts once 60% of the stage is in view and runs while any of it is on screen; off screen or in a
// hidden tab it pauses and resumes where it was. A pick starts the picked case from the top, and pressing the
// case already shown restarts it (owner, 26 Oct 2026), its card dipping out and back in; a pick also draws the
// 2 px Green line from the tab and fades the words. A press, focus or key in the stage stops the loop on the
// finished card until the next pick, or until the stage has left the screen. The tabs controller ends every
// animation on a resize, so the loop is rebuilt where it was; print shows the finished card. Transform and
// opacity only, so the loop runs off the main thread. Timings and easings come from timelines.ts
// (useCaseTimeline, easing), written in at build time (review-inline.ts).
(() => {
const T = __USE_CASES__, E = T.easing, U = T.timeline, L = U.loop;
const root = document.querySelector('[data-use-cases]');
if (!root || typeof Element.prototype.animate !== 'function' || !('IntersectionObserver' in window)) return;
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const tabs = [...root.querySelectorAll('[role="tab"]')], panels = [...root.querySelectorAll('[role="tabpanel"]')], stage = root.querySelector('.case-stage');
let open = Math.max(0, tabs.findIndex(tab => tab.getAttribute('aria-selected') === 'true'));
// `loop` holds the shown case's tracks and `once` a pick's line and fades. The loop keeps its own clock: `on`
// from its start until the reader stops it, `playing` from `epoch` while the stage is on screen, else paused
// at `frozen`.
let loop = [], once = [], on = false, held = false, printing = false, visible = false, playing = false, epoch = 0, frozen = 0;
const now = () => document.timeline.currentTime ?? performance.now();
const running = () => visible && !document.hidden;
const phase = () => playing ? (now() - epoch) % L.cycle : frozen;
// The reset: by `back` the finished values are gone, and the first states come in from there.
const back = L.reset + L.resetOut;
const animate = (el, keyframes, o = {}) => { if (!el) return; const a = el.animate(keyframes, { easing: E.reveal, fill: 'both', ...o }); once.push(a); return a; };
const link = i => animate(tabs[i]?.querySelector('.case-link'), [{ transform: 'scaleX(0)' }, { transform: 'none' }], { duration: U.link, easing: E.settle, fill: 'backwards' });
// One track of the loop, keyed in ms on the cycle from the look the page already has (at 0). It closes on that
// look again, so every cycle begins and ends on the finished card.
const track = (el, keys) => {
if (!el) return;
const frames = keys.map(({ at, ...look }) => ({ ...look, offset: Math.min(1, at / L.cycle) }));
const { offset, easing, ...rest } = frames[0];
loop.push(el.animate([...frames, { ...rest, offset: 1 }], { duration: L.cycle, iterations: Infinity, easing: 'linear' }));
};
// A part's light: from its look at rest it eases to each level at that level's moment, over `light` unless the
// step says otherwise. A change that marks an event is centred on it; at the reset every part dims softly.
const light = (el, steps, rest = 1) => {
const keys = [{ opacity: rest, at: 0 }];
steps.forEach(([at, opacity, over = L.light, easing = E.reveal]) => keys.push({ opacity: keys[keys.length - 1].opacity, at, easing }, { opacity, at: at + over }));
track(el, keys);
};
const around = at => at - L.light / 2, reset = [0, L.dim, L.fade, E.crossfade];
// A stack of states in one cell, the resting one last. At the reset it fades out and the first fades in, in
// place; then each next one comes in at its moment as the one before goes. A rising price slides up, a falling
// one down, and a word slides up; `fade(k)` swaps the kth state in place instead, the old one gone before the
// new one comes in. `times[0]` is the reset, where the first state comes in from `from`. One track per state
// moves both its opacity and its transform: two transform animations on one element can't leave the main
// thread.
const states = (cell, times, fade = () => false, from = 'none') => {
if (!cell) return;
const spans = [...cell.children], n = spans.length - 1, v = spans.map(s => parseFloat(s.dataset.v ?? s.textContent.replace(/[^\d.]/g, '')));
const shift = k => !k || fade(k) ? 0 : v[k] < v[k - 1] ? -L.slide : L.slide;
const shown = { opacity: 1, transform: 'none' }, hidden = s => ({ opacity: 0, transform: `translateY(${s}%)` });
spans.forEach((el, k) => {
const keys = k === n ? [{ ...shown, at: 0 }, { ...shown, at: L.reset, easing: E.crossfade }, { ...hidden(0), at: back }] : [{ opacity: 0, transform: k ? 'none' : from, at: 0 }];
if (k) keys.push({ ...hidden(shift(k)), at: times[k] + (shift(k) ? 0 : L.out), easing: E.settle }, { ...shown, at: times[k] + L.in });
else keys.push({ opacity: 0, transform: from, at: back, easing: E.crossfade }, { ...shown, at: back + L.resetIn });
if (k < n) keys.push({ ...shown, at: times[k + 1], easing: E.settle }, { ...hidden(-shift(k + 1)), at: times[k + 1] + L.out });
track(el, keys);
});
};
// A stretch of line that has run fades at the reset, then runs again in its turn.
const fill = (el, from, to, easing) => track(el, [{ opacity: 1, transform: 'none', at: 0 }, { opacity: 1, transform: 'none', at: L.reset, easing: E.crossfade }, { opacity: 0, transform: 'none', at: back }, { opacity: 0, transform: 'scaleX(0)', at: back + 1 }, { opacity: 1, transform: 'scaleX(0)', at: back + 2 }, { opacity: 1, transform: 'scaleX(0)', at: from, easing }, { opacity: 1, transform: 'none', at: to }]);
// A mark (a stop, the seal) fades at the reset and grows in from `from` scale at its moment.
const grow = (el, at, from) => track(el, [{ opacity: 1, transform: 'none', at: 0 }, { opacity: 1, transform: 'none', at: L.reset, easing: E.crossfade }, { opacity: 0, transform: 'none', at: back }, { opacity: 0, transform: `scale(${from})`, at, easing: E.settle }, { opacity: 1, transform: 'none', at: at + L.seal }]);
// A layer shown at rest goes at the reset and fades back in from its moment, over `over`.
const appear = (el, at, over = L.in) => track(el, [{ opacity: 1, at: 0 }, { opacity: 1, at: L.reset, easing: E.crossfade }, { opacity: 0, at: back }, { opacity: 0, at, easing: E.reveal }, { opacity: 1, at: at + over }]);
// The query's status in the corner: Asked, Reported, Final. While the query is asked it's the one part lit:
// Asked comes in from `statusFrom` and a Paper ring lights it over `glow`. Then it steps back until the end.
const chip = card => {
const status = card.querySelector('[data-card="status"]'), glow = back + U.swapIn;
states(status, [0, L.reported, L.final], () => true, `scale(${U.statusFrom})`);
track(status?.firstElementChild?.querySelector('.st-glow'), [{ opacity: 0, at: 0 }, { opacity: 0, at: glow }, { opacity: 1, at: glow + L.glow / 4 }, { opacity: 0, at: glow + L.glow }]);
light(status, [[around(L.focus), L.past], [L.rest, 1]]);
};
// At Final the seal grows in with its check.
const seal = card => grow(card.querySelector('.split-seal, .relay-seal'), L.final + U.swapIn, .5);
// While the report is open to challenge, the waiting line fades in and fills; it goes at Final.
const waiting = wait => {
const from = L.reported + L.waitIn;
track(wait, [{ opacity: 0, at: 0 }, { opacity: 0, at: from, easing: E.settle }, { opacity: 1, at: from + L.waitIn }, { opacity: 1, at: L.final }, { opacity: 0, at: L.final + L.out }]);
track(wait?.firstElementChild, [{ transform: 'scaleX(0)', at: 0 }, { transform: 'scaleX(0)', at: from }, { transform: 'none', at: L.final }, { transform: 'none', at: L.final + L.out }]);
};
// The market card, in the whitepaper's order (§4.5): the query is asked as the market opens; the market lights
// and its price climbs to 99¢ (consensus, not settlement); the report lands, Yes open to challenge, and the
// light moves to Augur Lituus while a line fills under it; the answer is Final and not challenged, the Yes
// turns Green and its seal grows in; then the market lights again and pays. Only the price's digits change
// until it pays.
const query = card => {
const q = name => card.querySelector(`[data-card="${name}"]`);
chip(card);
light(q('market'), [reset, [around(L.focus), 1], [around(L.reported), L.past], [around(L.paid), 1]]);
light(q('oracle'), [reset, [around(L.reported), 1]]);
states(q('price'), [0, ...L.ticks]);
states(q('price-value'), [0, L.paid], () => true);
states(q('price-note'), [0, L.paid], () => true);
states(q('answer'), [0, L.reported, L.final], k => k === 2);
states(q('answer-note'), [0, L.reported, L.final], () => true);
seal(card);
waiting(q('wait'));
};
// The insurance card, a relay read left to right, each leg lit in its turn: the flight's stop comes in and its
// stretch of line runs Paper while it's in the air, then it lands; the report brings Augur Lituus's stop and a
// Yes, and the next stretch fills Pewter while it's open to challenge; at Final the stop becomes the seal; then
// the cover lights, the line runs Green to it, its stop fills and it pays.
const relay = card => {
const R = U.relay, q = name => card.querySelector(`[data-card="${name}"]`), arrive = L.paid + R.arrive, from = L.reported + L.waitIn;
chip(card);
light(q('leg-flight'), [reset, [R.depart, 1], [around(L.reported), L.past], [L.rest, 1]]);
light(q('oracle'), [reset, [around(L.reported), 1]]);
light(q('leg-cover'), [reset, [around(L.paid), 1]]);
grow(q('stop-flight'), R.depart, .4);
fill(q('run'), L.focus, L.ticks[2], 'linear');
states(q('flight'), [0, L.ticks[2]], () => true);
states(q('flight-note'), [0, L.ticks[2]], () => true);
track(q('stop-oracle'), [{ opacity: 0, at: 0 }, { opacity: 0, at: L.reported, easing: E.settle }, { opacity: 1, at: L.reported + L.in }, { opacity: 1, at: L.final }, { opacity: 0, at: L.final + U.swapIn }]);
states(q('answer'), [0, L.reported, L.final], k => k === 2);
states(q('answer-note'), [0, L.reported, L.final], () => true);
track(q('wait'), [{ opacity: 0, transform: 'scaleX(0)', at: 0 }, { opacity: 0, transform: 'scaleX(0)', at: from }, { opacity: 1, transform: 'scaleX(0)', at: from + 1 }, { opacity: 1, transform: 'none', at: L.final }, { opacity: 1, transform: 'none', at: L.paid + R.pay }, { opacity: 0, transform: 'none', at: L.paid + R.pay + 1 }]);
seal(card);
fill(q('paid'), L.paid, L.paid + R.pay, E.travel);
grow(q('stop-paid'), arrive, .4);
states(q('cover'), [0, arrive], () => true);
states(q('cover-note'), [0, arrive], () => true);
};
// The DAO card, a switch read top to bottom: the upgrade's row lights while the vote is open; the vote passes and
// the go-live switch slides on, knob and ring Paper, to go live in two days. The light moves down to Augur
// Lituus, the larger part: the report rings Yes, the line for the day it's open to challenge fills, and at Final
// the Green sweeps across Yes with its check while No steps back. Then the row lights again and the switch slides
// back off, its knob Green: Blocked. The knob's colours are three stacked squares that cross-fade, so only
// transform and opacity move.
const switchCard = card => {
const S = U.switch, q = name => card.querySelector(`[data-card="${name}"]`), knob = q('knob');
const on = `translateX(${(knob && getComputedStyle(knob).getPropertyValue('--travel').trim()) || '32px'})`;
const lit = [{ opacity: 0, at: 0 }, { opacity: 0, at: S.close + U.swapIn, easing: E.reveal }, { opacity: 1, at: S.close + S.slide }, { opacity: 1, at: L.paid, easing: E.reveal }, { opacity: 0, at: L.paid + S.slide / 2 }];
chip(card);
light(q('app'), [reset, [around(L.focus), 1], [around(L.reported), L.past], [around(L.paid), 1]]);
light(q('oracle'), [reset, [around(L.reported), 1]]);
states(q('app-value'), [0, S.close, L.paid], () => true);
states(q('app-note'), [0, S.close, L.paid], () => true);
track(knob, [{ transform: 'none', at: 0 }, { transform: 'none', at: S.close, easing: E.travel }, { transform: on, at: S.close + S.slide }, { transform: on, at: L.paid, easing: E.travel }, { transform: 'none', at: L.paid + S.slide }]);
track(q('switch-on'), lit);
track(q('knob-on'), lit);
appear(q('knob-win'), L.paid + S.slide / 2, S.slide / 2);
appear(q('yes-ring'), L.reported);
fill(q('yes-fill'), L.final, L.final + L.in, E.settle);
appear(q('yes-pick'), L.final + S.pick);
light(q('no'), [[0, 1, L.fade, E.crossfade], [L.final, S.other]], S.other);
states(q('answer-note'), [0, L.reported, L.final], () => true);
waiting(q('wait'));
};
// Ryan's and Augus's DAO card, a proposal: its pending words show from the reset, a Mist line runs under its
// pending check, and at the answer each pending word goes and its answer comes in; then the footer.
const proposal = card => {
const q = name => card.querySelector(`[data-card="${name}"]`), qa = name => [...card.querySelectorAll(`[data-card="${name}"]`)], at = L.reported;
// Two looks of one value: `was` shows from the reset until the answer, and the resting `now` is back after it.
const swap = (was, now, from) => {
track(was, [{ opacity: 0, at: 0 }, { opacity: 0, at: back, easing: E.crossfade }, { opacity: 1, at: back + L.resetIn }, { opacity: 1, at }, { opacity: 0, at: at + U.swapOut }]);
track(now, [{ opacity: 1, transform: 'none', at: 0 }, { opacity: 1, transform: 'none', at: L.reset, easing: E.crossfade }, { opacity: 0, transform: 'none', at: back }, { opacity: 0, transform: from, at: at + U.swapIn, easing: E.settle }, { opacity: 1, transform: 'none', at: at + U.swapIn + U.swap }]);
};
swap(q('status-wait'), q('status-done'), `scale(${U.statusFrom})`);
const now = qa('now');
qa('was').forEach((el, k) => swap(el, now[k], `translateY(${U.rise}px)`));
track(q('scan'), [{ opacity: 0, transform: 'scaleX(0)', at: 0 }, { opacity: 1, transform: 'scaleX(0)', at: L.focus, easing: E.travel }, { opacity: 1, transform: 'none', at: L.focus + U.scan }, { opacity: 1, transform: 'none', at }, { opacity: 0, transform: 'none', at: at + U.swapOut }]);
track(q('foot'), [{ opacity: 1, transform: 'none', at: 0 }, { opacity: 1, transform: 'none', at: L.reset, easing: E.crossfade }, { opacity: 0, transform: 'none', at: back }, { opacity: 0, transform: `translateY(${U.footRise}px)`, at: at + U.footAt, easing: E.settle }, { opacity: 1, transform: 'none', at: at + U.footAt + U.foot }]);
track(q('result'), [{ opacity: 1, at: 0 }, { opacity: 1, at: back }, { opacity: 0, at: back + 1 }, { opacity: 0, at: at + U.resultAt }, { opacity: 1, at: at + U.resultAt + U.result }]);
};
const kinds = { query, relay, switch: switchCard, proposal };
const clear = () => { loop.forEach(a => a.cancel()); loop = []; };
const settle = () => { once.forEach(a => a.cancel()); once = []; };
// Builds the shown case's loop at `at` on the cycle: playing while the stage is on screen, else paused there.
const start = at => {
clear();
const card = panels[open]?.querySelector('.case-card');
if (!on || !card || printing || reduced.matches) return;
kinds[card.dataset.cardKind]?.(card);
playing = running();
if (playing) { epoch = now() - at; loop.forEach(a => { a.startTime = epoch; }); }
else { frozen = at; loop.forEach(a => { a.pause(); a.currentTime = at; }); }
};
const sync = () => {
if (!on || !loop.length || running() === playing) return;
if (running()) { epoch = now() - frozen; loop.forEach(a => { a.startTime = epoch; }); }
else { frozen = phase(); loop.forEach(a => { a.pause(); a.currentTime = frozen; }); }
playing = running();
};
const halt = () => { on = false; settle(); clear(); };
const observer = new IntersectionObserver(entries => {
const entry = entries[entries.length - 1];
visible = entry.isIntersecting;
// Leaving the screen ends a reader's stop: back in view, the case plays again.
if (!visible) held = false;
if (!on && !held && !reduced.matches && entry.intersectionRatio >= U.threshold) { on = true; start(0); }
else sync();
}, { threshold: [0, U.threshold] });
observer.observe(stage);
root.addEventListener('tabsbeforechange', () => { settle(); clear(); });
root.addEventListener('tabschange', ({ detail: { index, previous } }) => {
open = index;
if (reduced.matches) return;
held = false; on = true;
link(index);
animate(panels[previous], [{ visibility: 'visible', opacity: 1 }, { visibility: 'visible', opacity: 0 }], { duration: U.out, easing: 'linear', fill: 'none' });
animate(panels[index], [{ opacity: 0 }, { opacity: 1 }], { delay: U.at, duration: U.in, easing: E.reveal, fill: 'backwards' });
start(back);
});
// Pressing the case already shown changes nothing in the controller, so it fires no tabschange: the shown case
// starts again from the top. Its card dips out and comes back in on the start, so the restart is never a cut.
// Read in the capture phase, before the controller's own press handler runs.
root.addEventListener('click', event => {
const i = tabs.indexOf(event.target.closest?.('[role="tab"]'));
if (i < 0 || i !== open || reduced.matches) return;
settle(); held = false; on = true; link(i);
const panel = panels[i], dip = animate(panel, [{ opacity: 1 }, { opacity: 0 }], { duration: U.out, easing: 'linear', fill: 'forwards' });
dip.finished.then(() => { if (open !== i || !on) return; start(back); animate(panel, [{ opacity: 0 }, { opacity: 1 }], { duration: U.in, easing: E.reveal, fill: 'none' }); dip.cancel(); }, () => {});
}, true);
['pointerdown', 'focusin', 'keydown'].forEach(type => stage.addEventListener(type, () => { if (on) { held = true; halt(); } }));
// The tabs controller ends every animation on a resize, print, a hidden page or reduced motion: the loop comes
// back where it was, unless printing or reduced.
root.addEventListener('tabssettled', () => start(phase()));
reduced.addEventListener('change', () => { if (reduced.matches) halt(); else if (visible && !held) { on = true; start(0); } });
document.addEventListener('visibilitychange', sync);
addEventListener('beforeprint', () => { printing = true; clear(); });
addEventListener('afterprint', () => { printing = false; start(phase()); });
})();
