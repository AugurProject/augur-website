// The homepage's first-visit veil (owner, 10 Nov 2026: "an initial page sort of loader so that it's not right in
// our face the first time ... wait for fonts or something that shifts the layouts"). Inlined in <head>, so it
// arms before the first paint: a Navy veil with the glyph and a short Green line covers the page (PageLayout's
// intro style) while the three web fonts load, for at least MIN ms from when it arms and at most MAX, then dissolves. The hero's
// arrival and the floor's build wait under it (hero-arrival.js, hero-floor-v2.js, the paused animations) and
// start as it lifts, so the intro plays once, on settled type. Like every entrance it shows once per tab
// session: a reload, a history visit, a #section, a hidden tab or reduced motion skip it, and so does no
// JavaScript. The page underneath paints as usual; the veil only covers it.
(() => {
  const root = document.documentElement, armed = performance.now(), MIN = 700, MAX = 3000, LIFT = 520;
  const navigation = performance.getEntriesByType ? performance.getEntriesByType('navigation')[0] : undefined;
  const reload = !!navigation && navigation.type === 'reload';
  if ((navigation && navigation.type !== 'navigate' && !reload) || location.hash || document.hidden || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  try { if (!reload && sessionStorage.getItem('augur:intro-seen') === '1') return; sessionStorage.setItem('augur:intro-seen', '1'); } catch {}
  // `introPlayed` stays for the page's life: the hero stages its arrival behind the veil (page-intro.css).
  root.dataset.intro = 'loading'; root.dataset.introPlayed = '';
  let lifted = false;
  const lift = () => {
    if (lifted) return;
    lifted = true;
    root.dataset.intro = 'lifting';
    document.dispatchEvent(new Event('augur:intro'));
    setTimeout(() => { delete root.dataset.intro; }, LIFT);
  };
  setTimeout(lift, MAX);
  addEventListener('pagehide', lift);
  document.addEventListener('visibilitychange', () => { if (document.hidden) lift(); });
  const faces = ['600 1em Sora', '400 1em Sora', '400 1em "Schibsted Grotesk"'];
  // Each face is asked for by name, so it loads even before the page uses it. Astro links the page's sheets after
  // this script, so their @font-face rules don't exist yet: the first animation frame comes once those render-blocking
  // sheets have loaded, so the faces are asked for there. Then the veil waits for the document's whole font set.
  const set = document.fonts;
  const wait = async () => {
    if (!set || !set.load) return;
    await new Promise(done => requestAnimationFrame(() => done()));
    await Promise.all(faces.map(face => set.load(face))).catch(() => {});
    await set.ready;
  };
  wait().catch(() => {}).then(() => setTimeout(lift, Math.max(0, (reload ? 300 : MIN) - (performance.now() - armed))));
})();
