// The answer band's ribbon on the review copies (Tenets.astro renders this right after the section): home-art.ts's
// sweep, which "/" keeps, carried here so it can follow the section's lead (owner's ask, 29 Oct 2026: motion that leads
// the eye in reading order; the scroll-motion brief). The band carries data-answer-band-v2 instead of "/"'s
// data-answer-band, so home-art.ts leaves it alone. A Green ribbon grows from the left under the statement, led by three
// squares, and each word of the Navy copy rises into place as the front reaches it; the live statement underneath stays
// one text node. Unlike the other entrances it plays on every load, a reload included (owner, 6 Oct 2026), once 60% of
// the band is in view; while the heading row above it is still settling in (reveal-v2.js), it waits for the lead to land,
// so the answer comes after the question. Already on screen when this runs: the settled band. Reduced motion, print and
// page hide settle it. Timings from timelines.ts (ribbonTimeline, easing), written in at build time (review-inline.ts);
// timeAt is timelines.ts's, copied.
(() => {
const T = __RIBBON__, E = T.easing, R = T.timeline;
const band = document.querySelector('[data-answer-band-v2]'), text = band?.querySelector('[data-answer]');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
if (!band || !text || reduced.matches || !('IntersectionObserver' in window) || typeof band.animate !== 'function') return;
const box = band.getBoundingClientRect();
if (box.bottom > 0 && box.top < innerHeight) return;
const timeAt = (curve, progress) => { const [x1 = 0, y1 = 0, x2 = 1, y2 = 1] = (curve.match(/-?[\d.]+/g) || []).map(Number); const at = (a, b, s) => 3 * (1 - s) ** 2 * s * a + 3 * (1 - s) * s ** 2 * b + s ** 3; let low = 0, high = 1; for (let step = 0; step < 24; step++) { const mid = (low + high) / 2; if (at(y1, y2, mid) < progress) low = mid; else high = mid; } return at(x1, x2, (low + high) / 2); };
const fill = document.createElement('div'); fill.className = 'ribbon-fill';
const overlay = document.createElement('div'); overlay.className = 'ribbon-overlay'; overlay.setAttribute('aria-hidden', 'true'); overlay.append(text.cloneNode(true));
const copy = overlay.querySelector('[data-answer]'); copy?.removeAttribute('data-answer');
// Only the Navy copy moves, word by word; the live statement underneath stays whole.
const words = (copy?.textContent ?? '').split(' ').map(word => { const span = document.createElement('span'); span.className = 'ribbon-word'; span.textContent = word; return span; });
copy?.replaceChildren(...words.flatMap((word, i) => i ? [' ', word] : [word]));
const edge = document.createElement('div'); edge.className = 'ribbon-edge'; edge.append(...Array.from({ length: 3 }, () => document.createElement('i')));
band.append(fill, overlay, edge); band.dataset.ribbon = 'armed';
const lead = band.closest('section')?.querySelector('.section-heading .lead'), events = new AbortController();
let animations = [], visible = false;
const settle = () => { animations.forEach(a => a.cancel()); fill.remove(); overlay.remove(); edge.remove(); band.dataset.ribbon = 'settled'; observer.disconnect(); events.abort(); };
const play = () => {
observer.disconnect();
const timing = { duration: R.duration, easing: E.draw, fill: 'both' };
animations = [
fill.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], timing),
overlay.animate([{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0 0 0)' }], timing),
edge.animate([{ transform: 'translateX(0)' }, { transform: `translateX(${band.clientWidth}px)` }], timing),
edge.animate([{ opacity: 1 }, { opacity: 1, offset: 1 - R.edgeFade / R.duration }, { opacity: 0 }], { ...timing, easing: 'linear' }),
];
// The front reaches a word at its left edge; the word rises from there.
const left = band.getBoundingClientRect().left, width = band.clientWidth;
for (const span of words) animations.push(span.animate([{ opacity: 0, transform: `translateY(${R.word.rise}em)` }, { opacity: 1, transform: 'none' }], { duration: R.word.duration, delay: R.duration * timeAt(E.draw, Math.min(1, Math.max(0, (span.getBoundingClientRect().left - left) / width))), easing: E.hero, fill: 'both' }));
Promise.all(animations.map(a => a.finished)).then(settle, () => {});
};
// The sweep waits for the lead while it is still landing.
const begin = () => {
if (!visible || document.hidden) return;
const group = lead?.closest('[data-armed]');
if (group) { group.addEventListener('revealed', begin, { once: true, signal: events.signal }); return; }
play();
};
const observer = new IntersectionObserver(entries => { visible = entries.some(entry => entry.intersectionRatio >= R.threshold); begin(); }, { threshold: [0, R.threshold] });
observer.observe(band);
reduced.addEventListener('change', settle, { signal: events.signal });
addEventListener('beforeprint', settle, { signal: events.signal });
addEventListener('pagehide', settle, { signal: events.signal });
})();
