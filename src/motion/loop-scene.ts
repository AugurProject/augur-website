import { motionTime } from './debug';
import type { Animate } from './play-once';

/** Continuous looping scenes (owner feedback, 5 Oct 2026: always moving).
 * Every track starts and ends on the static artwork, so the server-rendered
 * diagram is also the no-JavaScript, reduced-motion and print state. A scene
 * runs whenever any part of it is on screen, pauses off-screen or in a hidden
 * tab and resumes exactly where it was. Tracks may use a positive `delay` to
 * offset overlapping copies: before its first iteration a track shows the
 * static artwork, which is also where every iteration begins, unless the
 * scene adds a one-off lead-in (`iterations: 1`) that covers the delay. */
export function loopScene(root: Element, build: (animate: Animate) => void) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches || !('IntersectionObserver' in window) || typeof root.animate !== 'function') return;
  let animations: Animation[] = [];
  let started = false;
  let visible = false;
  const animate: Animate = (element, keyframes, options = {}) => {
    if (!element) return;
    // The cycle itself runs linearly; easing lives on the keyframes.
    const animation = element.animate(keyframes, { easing: 'linear', iterations: Infinity, fill: 'none', ...options, duration: motionTime(Number(options.duration ?? 320)), delay: motionTime(Number(options.delay ?? 0)) });
    animation.pause();
    animations.push(animation);
    return animation;
  };
  const running = () => visible && !document.hidden;
  const sync = () => {
    if (!started) {
      if (!running()) return;
      started = true;
      try { build(animate); } catch { stop(); return; }
    }
    // Pausing every effect together keeps the scene's tracks in step. A
    // finished one-off lead-in stays finished: play() would restart it.
    animations.forEach(animation => { if (animation.playState !== 'finished') running() ? animation.play() : animation.pause(); });
  };
  const reset = () => { animations.forEach(animation => animation.cancel()); animations = []; started = false; };
  const events = new AbortController();
  const observer = new IntersectionObserver(entries => {
    visible = entries[entries.length - 1]!.isIntersecting;
    sync();
  });
  const stop = () => { reset(); observer.disconnect(); events.abort(); };
  observer.observe(root);
  document.addEventListener('visibilitychange', sync, { signal: events.signal });
  reduced.addEventListener('change', () => { if (reduced.matches) stop(); }, { signal: events.signal });
  // Print shows the static artwork; the loop rebuilds afterwards if still visible.
  window.addEventListener('beforeprint', reset, { signal: events.signal });
  window.addEventListener('afterprint', sync, { signal: events.signal });
  window.addEventListener('pagehide', () => animations.forEach(animation => animation.pause()), { signal: events.signal });
  window.addEventListener('pageshow', sync, { signal: events.signal });
  return stop;
}
