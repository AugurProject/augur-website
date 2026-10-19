// Inlined before the hero content so its first painted frame starts the sequence.
// CSS owns the finite motion; without this script the entire hero is visible.
(() => {
  const root = document.currentScript?.parentElement;
  if (!root || root.dataset.heroArrival) return;
  root.dataset.heroArrival = 'settled';

  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches || document.hidden || root.contains(document.activeElement)) return;
  // The build substitutes a literal false in production, excluding debug behaviour.
  const debug = __DEV__ ? new URLSearchParams(location.search).get('motion') : null;
  // Arrival plays once per tab session: a reload (F5), a history visit or a
  // later return to the homepage keeps the settled hero.
  const navigation = performance.getEntriesByType ? performance.getEntriesByType('navigation')[0] : undefined;
  let arrived = false;
  try { arrived = sessionStorage.getItem('augur:hero-arrived') === '1'; sessionStorage.setItem('augur:hero-arrived', '1'); } catch {}
  if (debug !== 'replay' && (arrived || (navigation && navigation.type !== 'navigate'))) return;
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
  let cleanup = setTimeout(complete, 3000 * factor);
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
