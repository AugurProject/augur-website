// The isometric Why Augur scenes, /2/ only (owner, 22 Oct 2026): Two roads, Middleman crumbles and the
// Catapult (src/data/tenets-iso.ts lists them; IsoScene.astro draws each one's resting frame). Every scene's
// keyframes are built with it, at build time: the build replaces __SCENES__ with them, as
// { scene: [[data-iso name, keyframes], ...] }, and a track plays on every element of its scene with that name.
// Same rules as the v1 loops (loop-scene.ts): every track is keyed on one 12 s cycle and opens and closes on the
// server-rendered frame, a scene runs while any part of it is on screen, pauses off-screen or in a hidden tab
// and resumes where it was, print shows the resting frame, and reduced motion never starts it. Transform and
// opacity only. The three scenes share one clock so they stay in step. A scene whose card is still settling in
// (the section reveal, reveal-v2.js) starts once it has landed: a reveal and a loop never start together.
(() => {
const svgs = [...document.querySelectorAll('svg[data-iso-scene]')];
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
if (!svgs.length || reduced.matches || !('IntersectionObserver' in window) || typeof svgs[0].animate !== 'function') return;
const CYCLE = 12000, SCENES = __SCENES__;
let epoch = null;
svgs.forEach(svg => {
let animations = [], started = false, visible = false, printing = false;
const build = () => {
(SCENES[svg.getAttribute('data-iso-scene')] || []).forEach(([id, keyframes]) => svg.querySelectorAll(`[data-iso="${id}"]`).forEach(el => animations.push(el.animate(keyframes, { duration: CYCLE, iterations: Infinity }))));
if (epoch === null) epoch = document.timeline.currentTime;
animations.forEach(a => { a.startTime = epoch; });
};
const running = () => visible && !document.hidden && !printing && !reduced.matches;
const sync = () => {
if (!started) {
if (!running()) return;
const card = svg.closest('[data-armed]');
if (card) { card.addEventListener('revealed', sync, { once: true, signal: events.signal }); return; }
started = true; try { build(); } catch { stop(); return; } return;
}
animations.forEach(a => running() ? a.play() : a.pause());
};
const reset = () => { animations.forEach(a => a.cancel()); animations = []; started = false; };
const events = new AbortController();
const observer = new IntersectionObserver(entries => { visible = entries[entries.length - 1].isIntersecting; sync(); });
const stop = () => { reset(); observer.disconnect(); events.abort(); };
observer.observe(svg);
document.addEventListener('visibilitychange', sync, { signal: events.signal });
reduced.addEventListener('change', () => { if (reduced.matches) stop(); }, { signal: events.signal });
addEventListener('beforeprint', () => { printing = true; reset(); }, { signal: events.signal });
addEventListener('afterprint', () => { printing = false; sync(); }, { signal: events.signal });
addEventListener('pagehide', () => animations.forEach(a => a.pause()), { signal: events.signal });
addEventListener('pageshow', sync, { signal: events.signal });
});
})();
