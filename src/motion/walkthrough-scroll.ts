/** Scrolling steps through the How it works walkthrough (owner, 19 Oct 2026: "the scroll should move to
 * the next section, from A question opens to Report what happened"). Where the walkthrough fits the
 * screen with two columns (from 768 px), it pins in the middle of the screen while the page scrolls
 * past a run of about half a screen per step, and the step follows the scroll. Picking a step by hand
 * scrolls the page to that step's place in the run, so the two never disagree; the walkthrough is
 * pinned there, so only the step changes. Where it does not fit (phones, short windows, Question
 * details open on a short screen) it scrolls as a normal block and steps are picked by hand. */
export function bindWalkthroughScroll(root: HTMLElement) {
  const track = root.closest<HTMLElement>('[data-walkthrough-track]');
  const tabs = [...root.querySelectorAll<HTMLElement>('[role="tab"]')];
  if (!track || tabs.length < 2) return;
  const wide = matchMedia('(min-width: 768px)'), reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let pinned = false, step = 1, pinTop = 0, run = 0, size = '', driving = false, frame = 0, settle = 0;
  // While the page glides to a picked step, the steps it passes do not take over.
  let steering: number | null = null, steerTimer = 0;
  const progress = () => pinTop - track.getBoundingClientRect().top;
  const active = () => Number(root.dataset.active ?? 0);
  // The page offset where a step sits in the middle of its stretch of the run.
  const placeOf = (index: number) => Math.round(scrollY - progress() + index * step);
  const follow = () => {
    frame = 0;
    if (!pinned) return;
    if (steering !== null) { if (Math.abs(scrollY - steering) > 2) return; steering = null; }
    const index = Math.min(tabs.length - 1, Math.max(0, Math.floor(progress() / step + .5)));
    if (index !== active()) { driving = true; tabs[index]!.click(); driving = false; }
  };
  const layout = (keep: boolean) => {
    const height = root.offsetHeight, now = `${height}:${innerHeight}:${wide.matches}`;
    if (keep && now === size) return;
    size = now;
    const was = pinned, before = root.getBoundingClientRect().top;
    pinned = wide.matches && height + 48 <= innerHeight;
    step = Math.round(Math.min(420, Math.max(280, innerHeight * .45)));
    pinTop = Math.max(24, Math.round((innerHeight - height) / 2));
    // Each step owns one stretch; the first and last stretches are half on either side of the pin.
    run = Math.round((tabs.length - .5) * step);
    track.classList.toggle('is-pinned', pinned);
    track.style.setProperty('--pin-top', `${pinTop}px`);
    track.style.setProperty('--pin-run', `${run}px`);
    if (!keep) return;
    // A change mid-run keeps the shown step and, when it unpins, keeps the walkthrough where it was.
    const at = progress();
    if (pinned && at > 0 && at < run) scrollTo({ top: placeOf(active()), behavior: 'instant' });
    else if (was && !pinned) scrollBy({ top: root.getBoundingClientRect().top - before, behavior: 'instant' });
  };
  root.addEventListener('tabschange', event => {
    if (driving || !pinned) return;
    const { index } = (event as CustomEvent<{ index: number }>).detail, top = placeOf(index);
    if (Math.abs(top - scrollY) < 2) return;
    steering = top; clearTimeout(steerTimer);
    steerTimer = window.setTimeout(() => { steering = null; follow(); }, 1500);
    scrollTo({ top, behavior: reduced.matches ? 'instant' : 'smooth' });
  });
  // The reader's own wheel or touch takes over from a glide.
  for (const type of ['wheel', 'touchstart']) addEventListener(type, () => { steering = null; }, { passive: true });
  addEventListener('scroll', () => { if (!frame) frame = requestAnimationFrame(follow); }, { passive: true });
  // Question details open and close with a transition, so the layout waits until the size rests.
  const later = () => { clearTimeout(settle); settle = window.setTimeout(() => { layout(true); follow(); }, 150); };
  addEventListener('resize', later);
  new ResizeObserver(later).observe(root);
  layout(false);
  follow();
}
