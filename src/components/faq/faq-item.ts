import { faqTimeline } from '@/lib/motion/timelines';
import { motionTime } from '@/lib/motion/debug';
// Opening a question: the answer is revealed by an eased, clipped height
// change (same-document view transition), the toggle turns from plus to
// minus, a Green edge draws down and the answer rises in. Questions below
// slide rather than jump. Native details keep keyboard and exclusive-group
// behaviour; without view transitions the change is instant apart from the
// small CSS transitions. Nothing animates on page load.
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const transitions = typeof document.startViewTransition === 'function';
const root = document.documentElement;
root.style.setProperty('--faq-transition-time', `${motionTime(faqTimeline.transition)}ms`);
document.querySelectorAll<HTMLDetailsElement>('.faq-item').forEach((item) => {
  if (item.dataset.faqMotion !== undefined) return;
  item.dataset.faqMotion = transitions ? 'transition' : '';
  item.style.setProperty('--faq-answer-time', `${motionTime(faqTimeline.panel)}ms`);
  item.style.setProperty('--faq-answer-stagger', `${motionTime(faqTimeline.stagger)}ms`);
  let revealOnOpen = false;
  // Keep the question and start of its answer visible after a mobile expansion.
  item.addEventListener('toggle', (event) => {
    const requested = revealOnOpen;
    revealOnOpen = false;
    if (!requested || !item.open || !matchMedia('(max-width: 767px)').matches) return;
    requestAnimationFrame(() => {
      const summary = item.querySelector('summary');
      if (!summary) return;
      const top = summary.getBoundingClientRect().top;
      if (top < 24 || top > innerHeight * 0.55)
        summary.scrollIntoView({ block: 'start', behavior: reduced.matches ? 'instant' : 'smooth' });
    });
  });
  item.querySelector('summary')?.addEventListener('click', (event) => {
    revealOnOpen = event.isTrusted && !item.open;
    if (reduced.matches) return;
    const opening = !item.open;
    if (opening) {
      item.dataset.faqOpening = '';
      window.setTimeout(() => delete item.dataset.faqOpening, motionTime(faqTimeline.transition + faqTimeline.panel));
    }
    if (!transitions) return;
    event.preventDefault();
    // Name every question in this accordion (and its frame) for the transition only.
    const scope = item.closest('.faq-accordion');
    const items = [...(scope ?? document).querySelectorAll<HTMLDetailsElement>('.faq-item')];
    items.forEach((other, i) => other.style.setProperty('view-transition-name', `faq-${i}`));
    scope?.setAttribute('style', 'view-transition-name:faq-frame');
    root.dataset.faqTransition = '';
    const tidy = () => {
      items.forEach((other) => other.style.removeProperty('view-transition-name'));
      scope?.removeAttribute('style');
      delete root.dataset.faqTransition;
    };
    const transition = document.startViewTransition(() => {
      item.open = opening;
    });
    transition.finished.then(tidy, tidy);
  });
});
