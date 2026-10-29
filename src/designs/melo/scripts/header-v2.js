// The owner's header (owner, 22 Oct 2026: "scrolling down removes the header scrolling up make it appears
// i like this ux"), on every page but "/" since 26 Oct 2026. A partially persistent header (NN/g): once the
// page has scrolled past the header's own place, scrolling down slides it out of view and any scroll up
// brings it back. Native scroll throughout: this only reads scrollY and sets attributes; the slide is a
// transform (chrome-v2.css).
// It stays while a menu is open or keyboard focus is inside it, and focus moving in shows it at once
// (WCAG 2.4.11: focus not obscured). Small moves under 6 px add up before they count, so a trackpad's
// jitter doesn't flicker it. Without JavaScript the header stays in the flow, as it ships.
(() => {
const header = document.querySelector('[data-site-header]');
if (!header) return;
header.setAttribute('data-headroom', '');
let last = Math.max(scrollY, 0), queued = false;
const busy = () => header.querySelector('details[open], dialog[open], :focus-visible') !== null;
const update = () => {
queued = false;
const bar = document.querySelector('.announcement');
const start = bar && bar.offsetParent ? bar.getBoundingClientRect().bottom + scrollY : 0;
const y = Math.max(scrollY, 0), delta = y - last;
header.toggleAttribute('data-stuck', y > start);
if (y <= start + header.offsetHeight) { header.removeAttribute('data-hidden'); last = y; return; }
if (Math.abs(delta) < 6) return;
if (delta > 0 && !busy()) header.setAttribute('data-hidden', '');
if (delta < 0) header.removeAttribute('data-hidden');
last = y;
};
addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(update); } }, { passive: true });
header.addEventListener('focusin', () => header.removeAttribute('data-hidden'));
update();
})();
