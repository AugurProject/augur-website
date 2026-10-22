// The /2/ hero's lituus flock (owner, 22 Oct 2026; geometry, classes and resting poses in
// src/data/hero-flock.ts, drawn by FlockArt.astro). The build replaces __FLOCK__ with the keys. Same rules
// as the other loops: every cluster keys transform and opacity on one 12 s cycle and starts at its own
// point in it, so the cycle opens and closes on the server-rendered frame; it runs while the hero is on
// screen and the tab is visible, pauses otherwise
// and resumes where it was; print shows the resting frame; reduced motion never starts it. Hero arrival
// only fades the flock in (home-v2-only.css). From 1024 px the hero's background loop replaces the flock
// (hero-video-v2.js) and hides it, so the flock rests there and never builds its animations.
// Fine pointers get a lens that parts the clusters near the pointer and grows them; it is written every
// frame while the pointer is over the hero, because the clusters keep flowing through it. A click or tap
// that is not on a control sends a Green ring out and pops the clusters it passes.
(() => {
const art = document.querySelector('[data-flock]');
const hero = art && art.closest('[data-home-hero]');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const fine = matchMedia('(hover:hover) and (pointer:fine)');
if (!hero || reduced.matches || !('IntersectionObserver' in window) || typeof art.animate !== 'function') return;
const F = __FLOCK__;
const C = F.cycle, K = F.samples[0].length - 1, W = F.width;
const cq = v => `${(v * 100 / W).toFixed(3)}cqw`;
const frames = F.samples.map(list => list.map(([x, y, a, s, o], k) => ({ offset: k / K, transform: `translate(${cq(x)},${cq(y)}) rotate(${a}deg) scale(${s})`, opacity: o })));
const birds = [...art.querySelectorAll('.flock-c')].map(el => ({ el, lens: el.firstElementChild, type: +el.dataset.c, phase: +el.dataset.p, lateral: +el.dataset.l }));
const centre = art.querySelector('[data-flock-centre]');
const reveal = 'cubic-bezier(.22,.61,.36,1)';
const lens = { radius: 120, push: 26, grow: .5 };
const ripple = { speed: .75, reach: 520, pop: 1.7, popTime: 560, ring: 900, ringScale: 7 };
let loop = [], visible = false, printing = false;

const wide = matchMedia('(min-width:1024px)');
const shown = () => art.getClientRects().length > 0;
const running = () => visible && shown() && !document.hidden && !printing && !reduced.matches;
const build = () => {
loop = birds.map(b => {
const animation = b.el.animate(frames[b.type], { duration: C, iterations: Infinity });
animation.currentTime = b.phase * C;
animation.pause();
return animation;
});
if (centre) {
const pulse = centre.animate(F.pulse.map(([t, s]) => ({ offset: t / C, transform: `scale(${s})` })), { duration: C, iterations: Infinity, easing: 'ease-in-out' });
pulse.pause();
loop.push(pulse);
}
};
const clear = () => { loop.forEach(animation => animation.cancel()); loop = []; };
const sync = () => {
if (printing || reduced.matches) { clear(); lensOff(); delete hero.dataset.flock; return; }
if (!shown()) { loop.forEach(animation => animation.pause()); lensOff(); hero.dataset.flock = 'paused'; return; }
if (!loop.length) build();
const run = running();
loop.forEach(animation => run ? animation.play() : animation.pause());
hero.dataset.flock = run ? 'running' : 'paused';
if (!run) lensOff();
};

// Where a cluster is now: the same linear interpolation between keys the animation uses.
const elapsed = () => loop.length ? Number(loop[0].currentTime) - birds[0].phase * C : 0;
const poseOf = (b, time) => {
const list = F.samples[b.type], tau = ((b.phase * C + time) % C + C) % C / C, k = tau * K, i = Math.min(K - 1, Math.floor(k)), f = k - i;
return list[i].map((value, n) => value + (list[i + 1][n] - value) * f);
};
const centreOf = (b, time) => {
const [x, y, a, s, o] = poseOf(b, time), r = a * Math.PI / 180;
return { x: x - Math.sin(r) * b.lateral * s, y: y + Math.cos(r) * b.lateral * s, r, s, o };
};

let frame = 0, pointer = null, active = new Set();
function lensOff() {
cancelAnimationFrame(frame); frame = 0;
active.forEach(b => { b.lens.style.transform = ''; });
active = new Set();
}
const applyLens = () => {
frame = 0;
if (!pointer || !running()) { lensOff(); return; }
const box = art.getBoundingClientRect(), unit = box.width / W, px = (pointer.x - box.left) / unit, py = (pointer.y - box.top) / unit, time = elapsed();
const next = new Set();
birds.forEach(b => {
const at = centreOf(b, time), dx = at.x - px, dy = at.y - py, distance = Math.hypot(dx, dy);
if (distance >= lens.radius || at.o < .05) return;
const force = (1 - distance / lens.radius) ** 2, length = distance || 1;
// The push is a world offset; the lens element sits inside the cluster's rotated, scaled frame.
const wx = dx / length * lens.push * force * unit, wy = dy / length * lens.push * force * unit;
const cos = Math.cos(at.r), sin = Math.sin(at.r), lx = (wx * cos + wy * sin) / at.s, ly = (-wx * sin + wy * cos) / at.s;
b.lens.style.transform = `translate(${lx.toFixed(1)}px,${ly.toFixed(1)}px) scale(${(1 + lens.grow * force).toFixed(3)})`;
next.add(b);
});
active.forEach(b => { if (!next.has(b)) b.lens.style.transform = ''; });
active = next;
frame = requestAnimationFrame(applyLens);
};
hero.addEventListener('pointermove', event => {
if (event.pointerType !== 'mouse' || !fine.matches || !running()) return;
pointer = { x: event.clientX, y: event.clientY };
if (!frame) frame = requestAnimationFrame(applyLens);
}, { passive: true });
hero.addEventListener('pointerleave', () => { pointer = null; lensOff(); });
addEventListener('scroll', () => { if (active.size) { pointer = null; lensOff(); } }, { passive: true });

hero.addEventListener('click', event => {
if (!running() || event.target.closest('a,button,input,select,textarea,summary,label')) return;
if (!(getSelection()?.isCollapsed ?? true)) return;
const box = art.getBoundingClientRect(), unit = box.width / W, x = (event.clientX - box.left) / unit, y = (event.clientY - box.top) / unit, time = elapsed();
const ring = document.createElement('span');
ring.className = 'flock-ripple';
ring.style.left = `${x * unit}px`; ring.style.top = `${y * unit}px`;
art.append(ring);
ring.animate([{ transform: 'scale(.2)', opacity: .7 }, { transform: `scale(${ripple.ringScale})`, opacity: 0 }], { duration: ripple.ring, easing: reveal })
.finished.then(() => ring.remove(), () => ring.remove());
birds.forEach(b => {
const at = centreOf(b, time), distance = Math.hypot(at.x - x, at.y - y);
if (distance > ripple.reach || at.o < .05) return;
b.lens.animate([{ transform: 'scale(1)' }, { transform: `scale(${ripple.pop})`, offset: .3 }, { transform: 'scale(1)' }], { duration: ripple.popTime, delay: distance / ripple.speed, easing: reveal, composite: 'add' });
});
});

const observer = new IntersectionObserver(entries => { visible = entries.some(entry => entry.isIntersecting); sync(); });
observer.observe(hero);
document.addEventListener('visibilitychange', sync);
reduced.addEventListener('change', sync);
wide.addEventListener('change', sync);
addEventListener('beforeprint', () => { printing = true; sync(); });
addEventListener('afterprint', () => { printing = false; sync(); });
addEventListener('pagehide', () => { pointer = null; lensOff(); });
addEventListener('pageshow', event => { if (event.persisted) sync(); });
})();
