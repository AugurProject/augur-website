import { playOnce } from '@/lib/motion/play-once';
import { easing } from '@/lib/motion/timelines';
// Each round rises in after the one before, then the fork threshold (transform and opacity only).
const root = document.querySelector('[data-ladder]');
if (root)
  playOnce(
    root,
    (animate) => {
      root.querySelectorAll('[data-round]').forEach((round, index) => {
        animate(
          round.querySelector('.round-squares, .fork-threshold'),
          [
            { opacity: 0, transform: 'translateY(12px) scale(.92)' },
            { opacity: 1, transform: 'none' },
          ],
          { delay: 120 + index * 110, duration: 420, easing: easing.reveal },
        );
        animate(round.querySelector('.round-amount'), [{ opacity: 0 }, { opacity: 1 }], {
          delay: 220 + index * 110,
          duration: 320,
        });
      });
    },
    { threshold: 0.4 },
  );
