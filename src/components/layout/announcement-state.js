// Inlined right after the announcement bar so a dismissed bar never paints.
// Without JavaScript the bar stays and its close button stays hidden.
// On a fresh visit it also arms the bar's drop-in (owner, 29 Oct 2026: "appear like 3 seconds after in a
// animation going down smoothly"; AnnouncementBar.astro): the bar waits above the page, every element
// after it lifted by the bar's height, before the header paints. Like every entrance it plays once per tab
// session: a reload, a history visit, a link to a #section, a hidden tab or reduced motion shows the bar in
// place.
(() => {
  const bar = document.currentScript?.previousElementSibling;
  if (!bar) return;
  const root = document.documentElement;
  try {
    if (localStorage.getItem('augur:announcement-dismissed') === bar.dataset.announcement) {
      root.dataset.announcement = 'dismissed';
      bar.remove();
      return;
    }
  } catch {}
  bar.querySelector('[data-announcement-dismiss]')?.removeAttribute('hidden');
  const navigation = performance.getEntriesByType ? performance.getEntriesByType('navigation')[0] : undefined;
  if ((navigation && navigation.type !== 'navigate') || location.hash || scrollY || document.hidden || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  // The same session record as seen.ts, under one key for the whole site.
  const key = `announcement:${bar.dataset.announcement}`;
  try {
    const seen = JSON.parse(sessionStorage.getItem('augur:motion-seen') ?? '[]');
    if (seen.includes(key)) return;
    sessionStorage.setItem('augur:motion-seen', JSON.stringify([...seen, key]));
  } catch {}
  root.dataset.announcement = 'arriving';
  // The lift is the bar's own height, which wraps differently at every width; the observer reports it
  // before the first paint.
  if (typeof ResizeObserver === 'function') new ResizeObserver(() => root.style.setProperty('--announcement-lift', `${bar.offsetHeight}px`)).observe(bar);
})();
