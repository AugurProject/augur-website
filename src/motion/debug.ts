/** Comparison controls are erased by the production build. */
const mode = import.meta.env.DEV ? new URLSearchParams(location.search).get('motion') : null;
export const motionFactor = mode === 'slow' ? 5 : 1;
export const replayMotion = mode === 'replay';
export const motionTime = (milliseconds: number) => milliseconds * motionFactor;

if (import.meta.env.DEV && motionFactor !== 1) {
  document.documentElement.style.setProperty('--motion-factor', String(motionFactor));
}
