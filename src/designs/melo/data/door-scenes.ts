/** The Learn more doors on /2/ (owner, 26 Oct 2026: "we agreed on not using generic icons … Maybe an SVG?"). Each
 * door is marked by a small object from the site's own isometric kit (iso-kit.ts), the blocks of Why Augur and How it
 * works, drawn at rest at build time, with no words:
 * - FAQ: the answer pedestal from How it works, its sign a question mark. Hovered, the question gets its answer: the
 *   ? gives way to the ✓.
 * - Blog: a pile of posts, thin slabs each a little off the one under it, the latest on top in Green with its lines
 *   of text. Hovered, the latest lifts off the pile.
 * - Community: the people around Augur as blocks, as Why Augur draws its peers: two behind, and you in front between
 *   them in Green. Hovered, you hop.
 * One Green piece in each. One camera for the three, so a block is the same size in every door, and each object
 * stands on the foot of its box, left-aligned with the words below it. No block hides or touches another (their
 * screen spans never overlap). The hover parts are `data-door-part`: CSS moves them with transform and opacity;
 * touch, no JavaScript, reduced motion and print show the rest frame. */
import { M, P, block, node, plane, quad, mix, r2, card, navy, green, deep, type Box, type Material, type SvgNode, type Point } from './iso-kit';

export type DoorKind = 'faq' | 'blog' | 'community';
// The emblem's box in px at 1440, and the one scale its objects are drawn at.
export const doorBox = { w: 104, h: 64 } as const;
const K = 2.3;
// How far the lifting parts rise when hovered, in world units (CSS moves them in the scaled group's units).
const LIFT = 3;

const screen = mix(navy, card, .7);
const corners = ({ x, y, z, w, d, h }: Box): Point[] => [0, 1].flatMap(i => [0, 1].flatMap(j => [0, 1].map(k => P(x + i * w, y + j * d, z + k * h))));
const part = (name: string, children: SvgNode[], attrs: Record<string, string | number> = {}) => node('g', { 'data-door-part': name, ...attrs }, children);

// FAQ: How it works' answer pedestal, a little smaller, with its sign on the face toward you (local u runs right,
// v down): a dark panel and a Green ?, and the ✓ that takes its place.
const S = 14, H = 12;
const sign = { fill: 'none', stroke: green, 'stroke-width': 1.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' } as const;
const question = node('g', {}, [
  node('path', { d: 'M5 4.75C5 3.55 5.9 2.85 7 2.85S9 3.5 9 4.6C9 5.7 8 5.95 7.35 6.5 7.1 6.75 7 7 7 7.45', ...sign }),
  node('circle', { cx: 7, cy: 9.3, r: .95, fill: green }),
]);
const tick = node('polyline', { points: '4.3,6.3 6.25,8.25 9.8,4.25', ...sign });
const faqBoxes: Box[] = [{ x: 0, y: 0, z: 0, w: S, d: S, h: H }];
const faq: SvgNode[] = [
  block(faqBoxes[0], M.device),
  plane('left', 0, S, H, [node('rect', { x: 1.5, y: 1.5, width: S - 3, height: H - 3, fill: screen }), part('ask', [question]), part('answer', [tick], { opacity: 0 })]),
];

// Blog: four thin slabs, each a little off the one under it, so every edge of the pile shows; the top one Green with
// three lines of text.
const SW = 16, SD = 12, SH = 1.8, GAP = .5;
const pile: [number, number][] = [[0, 0], [1.8, -1.4], [-.6, .6], [1, .1]];
const slabs: Box[] = pile.map(([x, y], i) => ({ x, y, z: i * (SH + GAP), w: SW, d: SD, h: SH }));
const top = slabs[slabs.length - 1];
const lines = [11, 9, 6].map((len, i) => quad(top.x + 2.6, top.y + 2.6 + i * 2.5, len, 1.1, { fill: deep }, top.z + top.h));
const blog: SvgNode[] = [...slabs.slice(0, -1).map(b => block(b, M.slab)), part('lift', [block(top, M.green), ...lines])];
const blogBoxes: Box[] = [...slabs, { ...top, z: top.z + LIFT }];

// Community: three blocks, two behind and you in front between them. Their screen spans leave a gap, so none hides
// another.
const B = 7;
const peers: Box[] = [{ x: -8.2, y: 8.2, z: 0, w: B, d: B, h: B }, { x: 8.2, y: -8.2, z: 0, w: B, d: B, h: B }];
const you: Box = { x: 7, y: 7, z: 0, w: B, d: B, h: B };
const community: SvgNode[] = [...peers.map(b => block(b, M.mist)), part('lift', [block(you, M.green as Material)])];
const communityBoxes: Box[] = [...peers, you, { ...you, z: LIFT }];

// Each object on the foot of its box, from its left edge, at the one scale.
function place(boxes: Box[]) {
  const all = boxes.flatMap(corners), xs = all.map(p => p[0]), ys = all.map(p => p[1]);
  const [ax, bx, ay, by] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  if ((bx - ax) * K + 1 > doorBox.w || (by - ay) * K + 1 > doorBox.h) throw new Error('door scene: object larger than its box');
  return `matrix(${K} 0 0 ${K} ${r2(-ax * K + .5)} ${r2(doorBox.h - by * K - .5)})`;
}

export const doorScenes: Record<DoorKind, { world: SvgNode[]; transform: string }> = {
  faq: { world: faq, transform: place(faqBoxes) },
  blog: { world: blog, transform: place(blogBoxes) },
  community: { world: community, transform: place(communityBoxes) },
};
