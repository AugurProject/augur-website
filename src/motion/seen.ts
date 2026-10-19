import { replayMotion } from './debug';

/** Entrance scenes play once per tab session (owner feedback, 5 and 6 Oct 2026:
 * pressing F5 must not replay any animation). A reload or a history visit
 * always shows every scene settled, read from the navigation type so it holds
 * even where storage is blocked (the 6 Oct report came from a browser that
 * denies `sessionStorage`). On a fresh visit a scene is recorded when it starts,
 * so a later visit in the same session shows it settled while scenes the reader
 * has not reached yet still play. Without storage, a fresh visit plays them. */
const STORE = 'augur:motion-seen';
const counters = new Map<string, number>();
const navigation = performance.getEntriesByType?.('navigation')[0] as PerformanceNavigationTiming | undefined;
/** True for a reload or a back/forward visit (not for a new navigation or prerender). */
export const revisit = navigation?.type === 'reload' || navigation?.type === 'back_forward';

const read = (): string[] => {
  try { return JSON.parse(sessionStorage.getItem(STORE) ?? '[]') as string[]; } catch { return []; }
};

/** A stable key for the next scene on this page, in document script order. */
export function sceneKey(name = 'scene') {
  const base = `${location.pathname}:${name}`;
  const count = counters.get(base) ?? 0;
  counters.set(base, count + 1);
  return `${base}:${count}`;
}

export function hasSeen(key: string) {
  return !replayMotion && (revisit || read().includes(key));
}

export function markSeen(key: string) {
  try {
    const keys = read();
    if (!keys.includes(key)) sessionStorage.setItem(STORE, JSON.stringify([...keys, key]));
  } catch { /* Storage unavailable: the scene may play again next time. */ }
}
