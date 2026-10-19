import { motionTime } from './debug';
import { fieldTimeline as t } from './timelines';

/** One heritage field for the whole site (owner, 19 Oct 2026: "homogenous across all website, even the
 * different backgrounds, except areas where there is text or stuff … subtle"). A single layer above the
 * page draws 3 px squares on a page-wide 40 px grid, but only in cells that touch no text, no control,
 * no picture and no object (a tile, a chip, a light band), with a margin; so it shows on Navy and on the
 * darker bands alike and never sits on content. The pattern is a hash of each cell, so recomputing after
 * a layout change only moves squares where content moved. A fine pointer lights the same empty cells as
 * it passes (every `greenEvery`th Green), and they fade behind it. The hero keeps its own field and lens
 * and is left out. Static after each draw; the trail is transform and opacity only, one rAF at most.
 * The trail is off for touch, reduced motion and print; the layer is hidden in print and forced colours. */
const GRID = 40, OFFSET = 20;
const SKIP = '[data-home-hero],.site-header,.announcement,[data-field-skip]';
const REPLACED = new Set(['IMG', 'SVG', 'CANVAS', 'VIDEO', 'IFRAME', 'INPUT', 'TEXTAREA', 'SELECT', 'BUTTON']);

const hash = (c: number, r: number, salt: number) => {
  let h = Math.imul(c + 1, 73856093) ^ Math.imul(r + 1, 19349663) ^ Math.imul(salt, 83492791);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
};
/** Relative luminance of a computed colour, or -1 when it is transparent. */
const luminance = (colour: string) => {
  const [r = 0, g = 0, b = 0, a = 1] = (colour.match(/[\d.]+/g) ?? []).map(Number);
  if (!a) return -1;
  const lin = (v: number) => { v /= 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; };
  return .2126 * lin(r) + .7152 * lin(g) + .0722 * lin(b);
};

export function initPageField() {
  const layer = document.querySelector<HTMLElement>('[data-page-field]');
  if (!layer || layer.dataset.ready) return;
  layer.dataset.ready = '';
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('aria-hidden', 'true'); svg.setAttribute('focusable', 'false');
  layer.append(svg);
  let occupied = new Set<string>(), cols = 0, rows = 0;

  const measure = () => {
    const root = document.documentElement, width = root.scrollWidth, height = root.scrollHeight;
    const x0 = scrollX, y0 = scrollY;
    cols = Math.ceil(width / GRID); rows = Math.ceil(height / GRID);
    occupied = new Set();
    const mark = (rect: DOMRect, margin: number = t.margin) => {
      if (!rect.width || !rect.height) return;
      const left = rect.left + x0 - margin, right = rect.right + x0 + margin, top = rect.top + y0 - margin, bottom = rect.bottom + y0 + margin;
      for (let c = Math.max(0, Math.ceil((left - OFFSET) / GRID)); c <= Math.min(cols - 1, Math.floor((right - OFFSET) / GRID)); c++)
        for (let r = Math.max(0, Math.ceil((top - OFFSET) / GRID)); r <= Math.min(rows - 1, Math.floor((bottom - OFFSET) / GRID)); r++) occupied.add(`${c},${r}`);
    };
    document.querySelectorAll(SKIP).forEach(element => mark(element.getBoundingClientRect(), 0));
    // Text, wherever it is.
    const range = document.createRange();
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode: node => node.nodeValue?.trim() && !node.parentElement?.closest(`script,style,noscript,template,[data-page-field],${SKIP}`) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT });
    for (let node = walker.nextNode(); node; node = walker.nextNode()) { range.selectNodeContents(node); for (const rect of range.getClientRects()) mark(rect); }
    // Objects: pictures and controls, and any box with its own background or border, except the
    // full-width dark bands the field is meant to sit on.
    for (const element of document.body.querySelectorAll<HTMLElement | SVGElement>('*')) {
      if (element.closest(`[data-page-field],${SKIP},script,style`)) continue;
      const rect = element.getBoundingClientRect();
      if (!rect.width || !rect.height) continue;
      if (REPLACED.has(element.tagName.toUpperCase())) { mark(rect); continue; }
      const style = getComputedStyle(element);
      if (style.visibility === 'hidden' || style.display === 'contents') continue;
      const background = luminance(style.backgroundColor), image = style.backgroundImage !== 'none';
      const border = ['Top', 'Right', 'Bottom', 'Left'].some(side => parseFloat(style.getPropertyValue(`border-${side.toLowerCase()}-width`)) > 0 && luminance(style.getPropertyValue(`border-${side.toLowerCase()}-color`)) >= 0);
      const band = rect.width >= width - 2 && background >= 0 && background < t.bandLuminance && !image;
      if ((background >= 0 || image || border) && !band) mark(rect);
    }
    draw(width, height);
  };

  const draw = (width: number, height: number) => {
    layer.style.width = `${width}px`; layer.style.height = `${height}px`;
    svg.setAttribute('width', String(width)); svg.setAttribute('height', String(height));
    // Squares are grouped into a few opacity steps per colour, so the layer is a handful of paths.
    const paths = new Map<string, string>();
    for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) {
      if (occupied.has(`${c},${r}`) || hash(c, r, 1) >= t.density) continue;
      const green = hash(c, r, 2) < t.green, step = Math.floor(hash(c, r, 3) * t.steps);
      const key = `${green ? 'g' : 'p'}${step}`, x = OFFSET + c * GRID - 1.5, y = OFFSET + r * GRID - 1.5;
      paths.set(key, (paths.get(key) ?? '') + `M${x} ${y}h3v3h-3z`);
    }
    svg.replaceChildren(...[...paths].map(([key, d]) => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path'), green = key[0] === 'g', step = Number(key.slice(1));
      const [low, high] = green ? t.greenOpacity : t.paperOpacity;
      path.setAttribute('d', d);
      path.setAttribute('fill', green ? 'var(--primary)' : 'var(--foreground)');
      path.setAttribute('fill-opacity', (low + (high - low) * step / Math.max(1, t.steps - 1)).toFixed(3));
      return path;
    }));
  };

  // Redraw once fonts have settled, and after any change of size, debounced.
  let timer = 0;
  const schedule = () => { clearTimeout(timer); timer = window.setTimeout(() => (window.requestIdleCallback ?? ((f: () => void) => setTimeout(f, 1)))(measure), t.debounce); };
  document.fonts?.ready.then(schedule, schedule); schedule();
  window.addEventListener('resize', schedule);
  new ResizeObserver(schedule).observe(document.body);

  // The trail: the nearest grid point under a fine pointer lights up if its cell is empty.
  if (typeof layer.animate !== 'function') return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)'), fine = matchMedia('(hover:hover) and (pointer:fine)');
  const pool = Array.from({ length: t.pool }, (_, i) => {
    const square = document.createElement('span');
    square.className = i % t.greenEvery === 0 ? 'field-light is-green' : 'field-light';
    layer.append(square);
    return square;
  });
  let next = 0, frame = 0, x = 0, y = 0, last = '';
  const clear = () => { cancelAnimationFrame(frame); frame = 0; last = ''; pool.forEach(square => square.getAnimations().forEach(a => a.cancel())); };
  const light = () => {
    frame = 0;
    const c = Math.round((x + scrollX - OFFSET) / GRID), r = Math.round((y + scrollY - OFFSET) / GRID), key = `${c},${r}`;
    if (key === last) return;
    last = key;
    if (c < 0 || r < 0 || c >= cols || r >= rows || occupied.has(key)) return;
    const at = `translate(${OFFSET + c * GRID - t.size / 2}px,${OFFSET + r * GRID - t.size / 2}px)`;
    const square = pool[next]!, peak = square.classList.contains('is-green') ? t.greenPeak : t.paperPeak;
    next = (next + 1) % pool.length;
    square.getAnimations().forEach(a => a.cancel());
    square.animate([
      { opacity: 0, transform: `${at} scale(${t.from})` },
      { offset: t.rise, opacity: peak, transform: `${at} scale(1)` },
      { opacity: 0, transform: `${at} scale(1)` },
    ], { duration: motionTime(t.fade), easing: 'ease-out' });
  };
  document.addEventListener('pointermove', event => {
    if (document.hidden || reduced.matches || !fine.matches || event.pointerType !== 'mouse') return;
    x = event.clientX; y = event.clientY;
    if (!frame) frame = requestAnimationFrame(light);
  }, { passive: true });
  document.documentElement.addEventListener('pointerleave', () => { last = ''; });
  reduced.addEventListener('change', clear);
  fine.addEventListener('change', clear);
  window.addEventListener('beforeprint', clear);
  window.addEventListener('pagehide', clear);
  document.addEventListener('visibilitychange', () => { if (document.hidden) clear(); });
}
