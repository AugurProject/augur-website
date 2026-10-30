// The review copies' section reveal (owner, 29 Oct 2026: "content should appear little by little while scrolling"; the
// scroll-motion brief). Each section settles in once, in reading order, as the reader reaches it: its heading, its lead,
// its main block and its foot, each a [data-reveal] group ("item" marks one card of a row). A group fades in as it rises,
// a beat after the group before it in its section, once its top passes 90% of the screen (revealTimeline and easing from
// timelines.ts, written in at build time by review-inline.ts). The markup is the settled page: this arms (hides) only
// groups that lie wholly below the fold, under data-armed (home-v2-only.css), and lifts it as each group lands, so no
// JavaScript, reduced motion, forced colours, print and whatever is already on screen show everything at once.
// seen.ts's rules, mirrored under its storage key: a reload or a history visit shows everything (read from the navigation
// type, so it holds where storage is blocked), a later visit in the tab session shows the groups already seen, and an
// arrival at a #section shows everything. Groups passed in a jump (End, an anchor, find in page) are simply there, and
// groups of different sections entering together arrive together, without the stagger. Focus moving into an armed
// group, a hash change, print, page hide, reduced motion or forced colours settle every group at once. A scene in a
// group (the Why Augur scenes, the use-case card) or under a section's lead (How it works' “paid” and scene, the roadmap's track)
// waits for that group's "revealed" event, so a reveal and a scene never start together. Rendered once, after the
// footer ([version].astro).
(() => {
const T = __REVEAL__, E = T.easing, R = T.timeline, groups = [...document.querySelectorAll('[data-reveal]')];
const reduced = matchMedia('(prefers-reduced-motion: reduce)'), forced = matchMedia('(forced-colors: active)'), nav = performance.getEntriesByType?.('navigation')[0];
if (!groups.length || reduced.matches || forced.matches || location.hash || nav?.type === 'reload' || nav?.type === 'back_forward' || !('IntersectionObserver' in window) || typeof Element.prototype.animate !== 'function') return;
const STORE = 'augur:motion-seen', key = group => `${location.pathname}:reveal:${index.get(group)}`;
const read = () => { try { return JSON.parse(sessionStorage.getItem(STORE) ?? '[]'); } catch { return []; } };
const seen = read(), index = new Map(groups.map((group, i) => [group, i]));
// One read of the layout, then the writes.
const armed = groups.filter(group => !seen.includes(key(group)) && group.getClientRects().length && group.getBoundingClientRect().top >= innerHeight);
if (!armed.length) return;
const pending = new Set(armed), running = new Set(), clock = new Map(), events = new AbortController();
const release = group => {
if (!group.hasAttribute('data-armed')) return;
group.removeAttribute('data-armed');
group.dispatchEvent(new Event('revealed'));
if (!pending.size && !running.size) events.abort();
};
const play = (group, delay) => {
const heading = group.tagName === 'H2';
const animation = group.animate([{ opacity: 0, transform: `translateY(${heading ? R.headingRise : R.rise}px)` }, { opacity: 1, transform: 'none' }], { delay, duration: heading ? R.heading : T.duration, easing: E.settle, fill: 'backwards' });
running.add(animation);
const done = () => { running.delete(animation); animation.cancel(); release(group); };
animation.finished.then(done, done);
};
const settle = () => {
observer.disconnect(); pending.clear();
running.forEach(animation => { try { animation.finish(); } catch { animation.cancel(); } });
armed.forEach(release); events.abort();
};
const observer = new IntersectionObserver(entries => {
try {
const line = entries[0].rootBounds?.bottom ?? innerHeight * R.line, due = new Set();
entries.forEach(({ target, isIntersecting, boundingClientRect }) => { if (pending.has(target) && (isIntersecting || boundingClientRect.top < line)) due.add(target); });
if (!due.size) return;
// Reading order: every group above the last one due lands first.
const last = Math.max(...[...due].map(group => index.get(group)));
pending.forEach(group => { if (index.get(group) < last) due.add(group); });
const list = [...due].sort((a, b) => index.get(a) - index.get(b)), boxes = list.map(group => group.getBoundingClientRect());
const together = new Set(list.map(group => group.closest('section, footer'))).size > 1, now = performance.now(), keys = read();
list.forEach((group, n) => {
pending.delete(group); observer.unobserve(group);
if (!keys.includes(key(group))) keys.push(key(group));
// Passed in a jump: simply there.
if (boxes[n].bottom <= 0) { release(group); return; }
const section = group.closest('section, footer'), item = group.dataset.reveal === 'item', before = clock.get(section);
const at = together || !before ? now : Math.max(now, before.at + (item && before.item ? R.itemStagger : R.stagger));
clock.set(section, { at, item });
play(group, at - now);
});
try { sessionStorage.setItem(STORE, JSON.stringify(keys)); } catch { /* Storage blocked: a later visit may play them again. */ }
if (!pending.size) observer.disconnect();
} catch { settle(); }
}, { rootMargin: `0px 0px -${Math.round((1 - R.line) * 100)}% 0px` });
try {
armed.forEach(group => { group.setAttribute('data-armed', ''); observer.observe(group); });
document.addEventListener('focusin', ({ target }) => { if (target instanceof Element && target.closest('[data-armed]')) settle(); }, { signal: events.signal });
['hashchange', 'beforeprint', 'pagehide'].forEach(type => addEventListener(type, settle, { signal: events.signal }));
[reduced, forced].forEach(query => query.addEventListener('change', settle, { signal: events.signal }));
} catch { settle(); }
})();
