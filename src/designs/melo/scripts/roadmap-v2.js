// The roadmap on the review copies (Roadmap.astro renders this right after the section). The picker's motion, as
// home-interactions.ts plays it on "/" (which binds only "/"'s [data-roadmap]): a pick moves the selected box and draws
// the picked panel's evidence bars. And the track's entrance, chained in the section (owner's ask, 29 Oct 2026; the
// scroll-motion brief): once the stops are on screen and the lead above them has landed (reveal-v2.js), the track draws
// to Now with its Green leg last, the road ahead fades in over the track's last two fifths and the stops pop in turn.
// The shown panel's evidence bars no longer draw with it: three things moving at once pulled the eye three ways. Phones
// (no track below 768 px) skip it.
// seen.ts's rules, mirrored under its storage key: once per tab session, never on a reload or a history visit. A press,
// focus or key in it, a resize, print or page hide (the controller's tabssettled), a hidden page, the stops leaving the
// screen or reduced motion settle it on the final frame, which is the markup. Transform and opacity only; timings and
// easings come from timelines.ts (roadmapTimeline, timing, easing and revealTimeline.ready), written in at build time
// (review-inline.ts).
(() => {
const T = __ROADMAP__, E = T.easing, L = T.timeline, root = document.querySelector('[data-roadmap-v2]');
if (!root) return;
const reduced = matchMedia('(prefers-reduced-motion: reduce)'), animates = typeof Element.prototype.animate === 'function';
// Now's slow pulse (Roadmap.astro's CSS loop) rests while the roadmap is off screen (data-still, home-v2-only.css): its
// ring restyled the page on every frame that anything else drew, up in the hero or while scrolling (measured 29 Oct 2026).
if ('IntersectionObserver' in window) { root.toggleAttribute('data-still', true); new IntersectionObserver(entries => root.toggleAttribute('data-still', !entries[entries.length - 1].isIntersecting)).observe(root); }
root.addEventListener('tabschange', ({ detail: { index } }) => {
root.style.setProperty('--selected', String(index));
if (reduced.matches || !animates) return;
root.querySelectorAll('[role="tabpanel"]')[index]?.querySelectorAll('[data-evidence-bar]').forEach(bar => {
bar.getAnimations().forEach(animation => animation.cancel());
bar.animate([{ transform: 'scaleX(0)' }, { transform: 'none' }], { delay: T.fadeOut, duration: L.evidence, easing: E.reveal, fill: 'backwards' });
});
});
const STORE = 'augur:motion-seen', KEY = `${location.pathname}:roadmap:entrance`, nav = performance.getEntriesByType?.('navigation')[0];
const read = () => { try { return JSON.parse(sessionStorage.getItem(STORE) ?? '[]'); } catch { return []; } };
const stops = root.querySelector('[role="tablist"]'), lead = root.closest('section')?.querySelector('.section-heading .lead'), track = root.querySelector('[data-track-done]');
// Phones show the milestones as a list with no track (below 768 px), so there the list simply stands under its heading.
if (!stops || !track?.getClientRects().length || reduced.matches || !animates || !('IntersectionObserver' in window) || nav?.type === 'reload' || nav?.type === 'back_forward' || read().includes(KEY)) return;
let motion = [], state = 'waiting', ready = false, timer = 0;
const settle = () => { state = 'done'; clearTimeout(timer); motion.forEach(animation => animation.cancel()); motion = []; observer.disconnect(); };
const go = (el, keyframes, delay, duration, easing = E.reveal) => { if (el) motion.push(el.animate(keyframes, { delay, duration, easing, fill: 'backwards' })); };
const draw = [{ transform: 'scaleX(0)' }, { transform: 'none' }];
// Built now and held on its first frame, so the track never shows, vanishes and draws again while the lead lands.
go(track, draw, 0, L.track, E.draw);
go(root.querySelector('[data-track-live]'), draw, L.track * 2 / 3, L.track / 3, E.draw);
go(root.querySelector('[data-track-ahead]'), [{ opacity: 0 }, { opacity: 1 }], L.track * 3 / 5, L.track * 2 / 5);
root.querySelectorAll('[data-stop]').forEach((stop, i) => go(stop, [{ opacity: 0, transform: 'scale(.3)' }, { opacity: 1, transform: 'none' }], i * L.stopStagger, L.stopDuration));
motion.forEach(animation => animation.pause());
const play = () => {
state = 'playing';
try { const keys = read(); if (!keys.includes(KEY)) sessionStorage.setItem(STORE, JSON.stringify([...keys, KEY])); } catch { /* Storage blocked: a later visit may play it again. */ }
motion.forEach(animation => animation.play());
Promise.all(motion.map(animation => animation.finished)).then(settle, () => {});
};
// The track waits for the lead (reveal-v2.js) while it is still landing, and for the stops to stay on screen for
// `dwell`, so a fly-by (End, a jump) never spends it off screen.
const begin = () => {
clearTimeout(timer);
if (state !== 'waiting' || !ready || document.hidden) return;
const group = lead?.closest('[data-armed]');
if (group) { group.addEventListener('revealed', begin, { once: true }); return; }
timer = setTimeout(() => { if (state === 'waiting' && ready && !document.hidden) play(); }, T.dwell);
};
const observer = new IntersectionObserver(entries => {
const { isIntersecting, intersectionRatio, intersectionRect, rootBounds } = entries[entries.length - 1];
ready = isIntersecting && (intersectionRatio >= T.ready || intersectionRect.height >= (rootBounds?.height ?? innerHeight) * T.ready);
if (!isIntersecting && state === 'playing') { settle(); return; }
begin();
}, { threshold: [0, .25, .5, .75, T.ready] });
observer.observe(stops);
['pointerdown', 'focusin', 'keydown'].forEach(type => root.addEventListener(type, settle));
root.addEventListener('tabssettled', settle);
reduced.addEventListener('change', settle);
document.addEventListener('visibilitychange', () => { if (document.hidden && state === 'playing') settle(); });
})();
