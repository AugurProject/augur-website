// Loops like the Why Augur scenes: while the stack is on screen and the tab is visible it plays on the 12 s cycle,
// otherwise it pauses and later resumes where it was. Reduced motion never starts it, and print shows the rest.
const svg = document.querySelector<SVGSVGElement>('svg[data-about-scene]');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
if (svg && !reduced.matches && 'IntersectionObserver' in window && typeof svg.animate === 'function') {
  const { cycle, tracks } = JSON.parse(svg.dataset.aboutScene!) as { cycle: number; tracks: [string, Keyframe[]][] };
  let animations: Animation[] = [], visible = false, printing = false;
  const running = () => visible && !document.hidden && !printing && !reduced.matches;
  const sync = () => {
    if (!animations.length) {
      if (!running()) return;
      const start = document.timeline.currentTime;
      tracks.forEach(([id, keyframes]) => svg.querySelectorAll(`[data-iso="${id}"]`).forEach(el => {
        const animation = el.animate(keyframes, { duration: cycle, iterations: Infinity });
        animation.startTime = start;
        animations.push(animation);
      }));
      return;
    }
    animations.forEach(a => running() ? a.play() : a.pause());
  };
  const reset = () => { animations.forEach(a => a.cancel()); animations = []; };
  new IntersectionObserver(entries => { visible = entries[entries.length - 1].isIntersecting; sync(); }).observe(svg);
  document.addEventListener('visibilitychange', sync);
  reduced.addEventListener('change', () => reduced.matches ? reset() : sync());
  addEventListener('beforeprint', () => { printing = true; reset(); });
  addEventListener('afterprint', () => { printing = false; sync(); });
}

// Marks this file as a module, so its names stay out of the global scope.
export {};
