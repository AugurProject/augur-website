import { easing } from './timelines';
import { motionTime, replayMotion } from './debug';
import { hasSeen, markSeen, sceneKey } from './seen';
export type Animate = (element: Element | null, keyframes: Keyframe[] | PropertyIndexedKeyframes, options?: KeyframeAnimationOptions) => Animation | undefined;

/** No styles are changed until enhancement runs. Static and reduced-motion
 * documents therefore expose the fully settled artwork without JavaScript.
 * A scene already seen this session (see `seen.ts`) stays settled. */
export function playOnce(root: Element, build: (animate: Animate) => void, { threshold = .12 }: { threshold?: number } = {}) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const key = sceneKey();
  if (reduced.matches || !('IntersectionObserver' in window) || hasSeen(key)) return;
  let played = false;
  let settled = false;
  let visible = false;
  let animations: Animation[] = [];
  let replayTimer = 0;
  const events = new AbortController();
  const animate: Animate = (element, keyframes, options = {}) => {
    if (!element) return;
    const animation = element.animate(keyframes, { easing:easing.reveal,fill:'both',...options,duration:motionTime(Number(options.duration ?? 320)),delay:motionTime(Number(options.delay ?? 0)) });
    animations.push(animation);
    return animation;
  };
  const settle = () => {
    if (settled) return;
    settled = true;
    clearTimeout(replayTimer);
    animations.forEach(a => { try { a.finish(); } catch { a.cancel(); } });
    animations.forEach(a => a.cancel());
    observer.disconnect(); events.abort();
  };
  const pause = () => {
    clearTimeout(replayTimer);
    animations.forEach(a => { if(a.playState !== 'finished') a.pause(); });
  };
  const start = () => {
    if (settled || !visible || document.hidden || played) return;
    played = true;
    markSeen(key);
    try { build(animate); } catch { settle(); return; }
    if (!animations.length) { settle(); return; }
    void Promise.all(animations.map(a=>a.finished.catch(()=>undefined))).then(()=> {
      if (replayMotion && !settled) {
        animations.forEach(a=>a.cancel()); animations=[]; played=false;
        // No new intersection callback occurs while a scene remains visible.
        // Explicitly begin another DEV comparison cycle, while retaining all
        // normal interaction, hidden-page and off-screen settlement rules.
        if (visible && !document.hidden) replayTimer = window.setTimeout(start, 250);
      }
      else settle();
    });
  };
  const resume = () => {
    if (settled || document.hidden || !visible) return;
    if (!played) { start(); return; }
    animations.forEach(a => { if(a.playState === 'paused') a.play(); });
  };
  const observer = new IntersectionObserver(entries => {
    visible = entries.some(entry => entry.isIntersecting);
    if (visible) resume(); else pause();
  }, {threshold});
  observer.observe(root);
  root.addEventListener('pointerdown',settle,{signal:events.signal});
  root.addEventListener('focusin',settle,{signal:events.signal});
  root.addEventListener('keydown',settle,{signal:events.signal});
  reduced.addEventListener('change',settle,{signal:events.signal});
  window.addEventListener('pagehide',settle,{signal:events.signal});
  window.addEventListener('beforeprint',settle,{signal:events.signal});
  document.addEventListener('visibilitychange',()=>document.hidden ? pause() : visible && resume(),{signal:events.signal});
  return settle;
}
