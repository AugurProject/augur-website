import { playOnce } from '@/lib/motion/play-once';
import { easing } from '@/lib/motion/timelines';
// The branches draw out of the fork node (SVG stroke draw), then the REP slides along them into
// each universe, one square after another; the square left behind stays put.
const root = document.querySelector('[data-fork-diagram]');
if (root) playOnce(root, animate => {
 root.querySelectorAll('.fork-connector path').forEach((path, index) => animate(path, [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { delay: 150 + index * 80, duration: 520, easing: easing.draw }));
 root.querySelectorAll('[data-arrive]').forEach((square, index) => animate(square, [{ opacity: 0, transform: 'translateX(-48px)' }, { opacity: 1, transform: 'none' }], { delay: 560 + index * 110, duration: 520, easing: easing.reveal }));
 animate(root.querySelector('.trunk-note'), [{ opacity: 0 }, { opacity: 1 }], { delay: 1200, duration: 320 });
}, { threshold: .5 });
