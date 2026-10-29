import { heroChoreography, heroCycle } from './hero-choreography';
import { keyframes } from './choreography';
import { motionTime } from '../../../motion/debug';
import { easing } from '../../../motion/timelines';

/** Hero ambience and response (owner feedback, 6 Oct 2026: more dynamic and
 * more responsive to the cursor).
 *
 * - The 12 s story from hero-choreography.ts runs once the arrival has
 *   settled, while the hero is on screen and the tab is visible. Every track is
 *   transform or opacity on HTML boxes, so it runs on the compositor; the
 *   square drift uses `translate`, the pops `scale`.
 * - Fine pointers get a lens: squares within 130 px of the pointer part from
 *   it, grow and brighten, so no one can sit in the middle. It writes
 *   `transform`, independent of the loop, and eases through a CSS transition.
 * - A click or tap anywhere in the hero (not on a control) sends a Green
 *   ripple through the field.
 *
 * Reduced motion keeps the settled artwork with no loop, lens or ripple. */
const lens = { radius: 130, push: 24, grow: .55, light: .7 } as const;
const ripple = { speed: .75, reach: 560, flash: 760, pop: 1.3, popTime: 560, ring: 900, ringScale: 7 } as const;

export function initHeroAmbient(art: HTMLElement) {
  const hero = art.closest<HTMLElement>('[data-home-hero]');
  if (!hero || typeof art.animate !== 'function') return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover:hover) and (pointer:fine)');
  const squares = [...art.querySelectorAll<HTMLElement>('.hero-sq')];
  const geometry = squares.map(square => {
    const read = (name: string) => Number(square.style.getPropertyValue(name));
    return { x: read('--x'), y: read('--y'), size: read('--s'), ring: Number(square.dataset.ring) };
  });
  const points = geometry.map((square, index) => ({ x: square.x + square.size / 2, y: square.y + square.size / 2, size: square.size, lit: squares[index]!.querySelector<HTMLElement>('.lit')!, glow: squares[index]!.querySelector<HTMLElement>('.glow')! }));
  const tracks = heroChoreography(geometry);
  const lifecycle = new AbortController(), options = { signal: lifecycle.signal };
  let visible = false, loop: Animation[] = [], unit = 0;

  const settled = () => hero.dataset.heroArrival === 'settled';
  const allowed = () => !reduced.matches && settled();
  const running = () => visible && !document.hidden && allowed();
  const target = (id: string): Element | null => {
    if (id === 'hero-centre') return art.querySelector('[data-hero-centre]');
    const [kind, index] = id.split(':');
    const square = squares[Number(index)];
    return kind === 'hero-green' ? points[Number(index)]?.glow ?? null : square ?? null;
  };
  const build = (at = 0) => {
    unit = art.clientWidth / 572;
    loop = tracks.flatMap(track => {
      const element = target(track.id);
      if (!element) return [];
      const animation = element.animate(keyframes(track, heroCycle, value => `${(value * unit).toFixed(2)}px`), { duration: motionTime(heroCycle), iterations: Infinity, easing: 'linear' });
      animation.currentTime = at;
      animation.pause();
      return [animation];
    });
  };
  const clear = () => { loop.forEach(animation => animation.cancel()); loop = []; };
  const sync = () => {
    const state = !allowed() ? null : running() ? 'running' : 'paused';
    if (state) hero.dataset.ambient = state; else delete hero.dataset.ambient;
    if (!state) { clear(); resetLens(); return; }
    if (!loop.length) build();
    loop.forEach(animation => state === 'running' ? animation.play() : animation.pause());
  };
  // Drift distances are pixels at the current artwork size: rebuild in place on resize.
  new ResizeObserver(() => {
    if (!loop.length || Math.abs(art.clientWidth / 572 - unit) < .02) return;
    const at = Number(loop[0]!.currentTime ?? 0), playing = loop[0]!.playState === 'running';
    clear(); build(at);
    if (playing) loop.forEach(animation => animation.play());
  }).observe(art);
  new MutationObserver(sync).observe(hero, { attributes: true, attributeFilter: ['data-hero-arrival'] });
  const observer = new IntersectionObserver(entries => { visible = entries.some(entry => entry.isIntersecting); sync(); });
  observer.observe(hero);
  document.addEventListener('visibilitychange', sync, options);
  reduced.addEventListener('change', sync, options);
  window.addEventListener('beforeprint', () => { clear(); resetLens(); delete hero.dataset.ambient; }, options);
  window.addEventListener('afterprint', sync, options);

  // Lens: rAF-throttled; only squares inside the radius are written.
  let frame = 0, pointerX = 0, pointerY = 0, active = new Set<number>();
  function resetLens() {
    cancelAnimationFrame(frame); frame = 0;
    active.forEach(index => { squares[index]!.style.transform = ''; points[index]!.lit.style.opacity = ''; });
    active = new Set();
  }
  const applyLens = () => {
    frame = 0;
    const box = art.getBoundingClientRect(), scale = box.width / 572;
    const x = (pointerX - box.left) / scale, y = (pointerY - box.top) / scale;
    const next = new Set<number>();
    points.forEach((point, index) => {
      const dx = point.x - x, dy = point.y - y, distance = Math.hypot(dx, dy);
      if (distance >= lens.radius) return;
      const force = (1 - distance / lens.radius) ** 2, length = distance || 1;
      // Large inner squares grow less, so the centre keeps its shape.
      const grow = 1 + lens.grow * force * (point.size >= 18 ? .4 : 1);
      squares[index]!.style.transform = `translate(${(dx / length * lens.push * force * scale).toFixed(1)}px,${(dy / length * lens.push * force * scale).toFixed(1)}px) scale(${grow.toFixed(3)})`;
      point.lit.style.opacity = (lens.light * force ** .7).toFixed(2);
      next.add(index);
    });
    active.forEach(index => { if (!next.has(index)) { squares[index]!.style.transform = ''; points[index]!.lit.style.opacity = ''; } });
    active = next;
  };
  hero.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || !fine.matches || !running()) return;
    pointerX = event.clientX; pointerY = event.clientY;
    if (!frame) frame = requestAnimationFrame(applyLens);
  }, { ...options, passive: true });
  hero.addEventListener('pointerleave', resetLens, options);
  window.addEventListener('scroll', () => { if (active.size) resetLens(); }, { ...options, passive: true });

  // Ripple: a click or tap that is not on a control and not ending a text selection.
  hero.addEventListener('click', event => {
    if (!allowed() || !visible || (event.target as Element).closest('a,button,input,select,textarea,summary,label')) return;
    if (!(getSelection()?.isCollapsed ?? true)) return;
    const box = art.getBoundingClientRect(), scale = box.width / 572;
    const x = (event.clientX - box.left) / scale, y = (event.clientY - box.top) / scale;
    const ring = document.createElement('span');
    ring.className = 'hero-ripple';
    ring.style.left = `${x * scale}px`; ring.style.top = `${y * scale}px`;
    art.append(ring);
    ring.animate([{ transform: 'scale(.2)', opacity: .7 }, { transform: `scale(${ripple.ringScale})`, opacity: 0 }], { duration: motionTime(ripple.ring), easing: easing.reveal })
      .finished.then(() => ring.remove(), () => ring.remove());
    points.forEach((point, index) => {
      const distance = Math.hypot(point.x - x, point.y - y);
      if (distance > ripple.reach) return;
      const delay = motionTime(distance / ripple.speed);
      point.glow.animate([{ opacity: 0 }, { opacity: 1, offset: .15 }, { opacity: 0 }], { duration: motionTime(ripple.flash), delay, easing: 'ease-out' });
      squares[index]!.animate([{ transform: 'scale(1)' }, { transform: `scale(${ripple.pop})`, offset: .3 }, { transform: 'scale(1)' }], { duration: motionTime(ripple.popTime), delay, easing: easing.reveal, composite: 'add' });
    });
  }, options);

  window.addEventListener('pagehide', event => { resetLens(); clear(); if (!event.persisted) { observer.disconnect(); lifecycle.abort(); } }, options);
  window.addEventListener('pageshow', event => { if (event.persisted) { observer.observe(hero); sync(); } }, options);
  sync();
}
