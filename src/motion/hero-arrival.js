// Inlined before the hero content so its first painted frame starts the sequence.
// CSS owns the finite motion; without this script the entire hero is visible.
(() => {
  const root = document.currentScript?.parentElement;
  if (!root || root.dataset.heroArrival) return;
  root.dataset.heroArrival = 'settled';

  // Scrolling back up to the hero replays the arrival: once the hero has been fully out of view and any of it comes back,
  // the layer, the floor (hero-floor-v2.js listens for `heroreplay`) and the text play again, once per exit, unless motion
  // is reduced, the tab is hidden or focus is inside the hero.
  if ('IntersectionObserver' in window) {
    let away = false, timer = 0, replay;
    const end = () => { clearTimeout(timer); if (replay) replay.abort(); root.dataset.heroArrival = 'settled'; };
    new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) { away = true; return; }
      if (!away) return;
      away = false;
      if (document.hidden || root.dataset.heroArrival === 'entering' || root.contains(document.activeElement) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      clearTimeout(timer);
      if (replay) replay.abort();
      replay = new AbortController();
      const keep = { capture: true, passive: true, signal: replay.signal };
      for (const type of ['focusin', 'pointerdown', 'keydown']) root.addEventListener(type, end, keep);
      document.documentElement.dataset.introPlayed = '';
      delete root.dataset.heroReplay;
      root.dataset.heroArrival = 'settled';
      void root.offsetWidth;
      root.dataset.heroReplay = '';
      root.dataset.heroArrival = 'entering';
      timer = setTimeout(end, 3800);
      root.dispatchEvent(new Event('heroreplay'));
    }).observe(root);
  }

  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches || document.hidden || root.contains(document.activeElement)) return;
  // The build substitutes a literal false in production, excluding debug behaviour.
  const debug = __DEV__ ? new URLSearchParams(location.search).get('motion') : null;
  // Arrival plays once per tab session, and again on a reload (F5): a history visit or a
  // later return to the homepage keeps the settled hero. Scrolling back up replays it (below).
  const navigation = performance.getEntriesByType ? performance.getEntriesByType('navigation')[0] : undefined;
  let arrived = false;
  try { arrived = sessionStorage.getItem('augur:hero-arrived') === '1'; sessionStorage.setItem('augur:hero-arrived', '1'); } catch {}
  const reload = !!navigation && navigation.type === 'reload';
  if (debug !== 'replay' && !reload && (arrived || (navigation && navigation.type !== 'navigate'))) return;
  const factor = debug === 'slow' ? 5 : 1;
  root.style.setProperty('--hero-motion-factor', String(factor));

  const lifecycle = new AbortController();
  let settled = false;
  function settle() {
    if (settled) return;
    settled = true;
    clearTimeout(cleanup);
    root.dataset.heroArrival = 'settled';
    lifecycle.abort();
  }

  // Backwards fill returns to visible base styles independently of this timer.
  const complete = () => {
    if (debug !== 'replay') { settle(); return; }
    root.dataset.heroArrival = 'settled';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (settled) return;
      root.dataset.heroArrival = 'entering';
      cleanup = setTimeout(complete, 3000);
    }));
  };
  // Under the first-visit veil (page-intro.js) the arrival's animations wait, paused, and so does its clock.
  let cleanup;
  const begin = () => { if (!settled) cleanup = setTimeout(complete, 3800 * factor); };
  if (document.documentElement.dataset.intro === 'loading') document.addEventListener('augur:intro', begin, { once: true }); else begin();
  const inputOptions = { capture: true, passive: true, signal: lifecycle.signal };
  root.addEventListener('focusin', settle, inputOptions);
  root.addEventListener('pointerdown', settle, inputOptions);
  root.addEventListener('keydown', settle, inputOptions);
  preference.addEventListener('change', settle, { signal: lifecycle.signal });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) settle();
  }, { signal: lifecycle.signal });
  // Returning from the history cache leaves the finished composition on screen.
  window.addEventListener('pagehide', settle, { signal: lifecycle.signal });
  window.addEventListener('beforeprint', settle, { signal: lifecycle.signal });

  root.dataset.heroArrival = 'entering';
})();
