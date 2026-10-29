// The /2/ hero's live floor (owner, 22 Oct 2026: "Let's try live first, implement in the website"), tuned
// with the owner in the Augur Hero Loops artifact: Consensus fill on a tilted floor of royal navy squares.
// Reports run along the grid into one 8 x 8 block, which fills Green square by square and rises, sends one
// pulse out across the floor at 0.74 of the loop, settles from 0.84 and rests, on a 12 s loop whose every
// motion repeats a whole number of times, so it closes exactly. It draws a 16:9 scene on a canvas in the
// hero video's layer, cropped like object-fit: cover at 90% 50% (home-v2-only.css places and fades the
// layer), from 1024 px only, at 30 frames a second. The markup is a still of the loop's 0.76 point, the
// complete block, rendered from this code; no-JavaScript visitors keep it, the loop starts on that frame
// so the swap is invisible, and reduced motion draws it and stops. A first-visit arrival fades the layer
// in from nothing, so there the loop starts at its rest point instead: the floor arrives calm and the
// block builds once the copy has been read (hero review, 22 Oct 2026). Like the other loops it plays while
// the hero is on screen and the tab is visible,
// and holds its frame otherwise. Print and forced colours hide it and show the flock.
// While it plays it answers the visitor (owner: "make it interactive"), as the flock did: a fine pointer
// carries a soft light across the floor, and a click or tap on a square sends a report from it, with a
// ripple where it starts and a flash where it reaches the block. The layer itself never takes the pointer;
// the hero listens, and links, buttons and the copy are left alone.
(() => {
const box = document.querySelector('[data-hero-floor]');
const hero = box && box.closest('[data-home-hero]');
const canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
if (!hero || !ctx || !('IntersectionObserver' in window) || !('ResizeObserver' in window)) return;
const TAU = Math.PI * 2, LOOP = 12, FPS = 30, STILL = .76;
// Page Navy, the floor's royal navy at rest and lit (the owner's request, not yet a brand token), and the
// floor's Green: brand Green at 65% over Navy, with no glow, so the hero's button keeps the only full Green
// on the screen (owner, 22 Oct 2026: "light the floor's block at about 60–70% Green with no glow").
const NAVY = '#0e0e21', BASE = [27, 39, 102], LIT = [46, 72, 178], GREEN = [42, 231, 168].map((v, i) => [14, 14, 33][i] + (v - [14, 14, 33][i]) * .65);
// 31 x 31 squares with 22% gaps, an 8 x 8 block, reports at 90 squares a loop, the camera 42 degrees down
// and still (the artifact's 2 degree sway would mean projecting every square every frame), in a 1600 x 900
// scene with the block at 70% across.
const C = 15, R = 15, BLOCK = 8, HALF = 4, TILE = .39, LIFT = .45, BLINK = .8, OLD = .063, SPEED = 90;
// About a fifth of the squares twinkle (by 45% either way), the rest hold still in the cached floor.
const TWINKLE = .22, DEPTH = .45;
const VW = 1600, VH = 900, CX = VW * .7, CY = VH * .52, MAXD = 15;
const PITCH = 42 * Math.PI / 180, DIST = C * 1.9 + 6, F = (VH / 2) / Math.tan(19 * Math.PI / 180);
const CA = Math.cos(PITCH), SA = Math.sin(PITCH);
const smooth = x => { const t = Math.min(1, Math.max(0, x)); return t * t * (3 - 2 * t); };
const band = (a, b, x) => smooth((x - a) / (b - a));
const pulse = (x, w) => Math.exp(-(x / w) * (x / w));

// The field, seeded so every visit draws the same floor as the artifact.
let seed = 2020;
const random = () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
const order = Array.from({ length: BLOCK * BLOCK }, (_, i) => i);
for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
const cells = [];
for (let j = -R; j <= R; j++) for (let i = -C; i <= C; i++) {
const d = Math.max(Math.abs(i), Math.abs(j)), inBlock = i >= -HALF && i < HALF && j >= -HALF && j < HALF;
const c = { idx: cells.length, i, j, inBlock, rank: inBlock ? order[(j + HALF) * BLOCK + i + HALF] : 0, r1: random(), r2: random(), r3: random(), r4: random(), r5: random() };
// Lit from the block, dimmer toward the edges; dissolving into Navy at the back and the sides.
c.dim = (.34 + .26 * c.r2) * (.55 + .55 * pulse(d / MAXD, .62)) * .89;
c.fog = (1 - band(C - 7, C + .5, Math.abs(i))) * (1 - band(R - 9, R + .5, j));
c.ring = Math.max(Math.max(-HALF - i, i - HALF + 1, 0), Math.max(-HALF - j, j - HALF + 1, 0));
// Squares that change on every frame and so never rest in the cached floor.
c.twinkle = !inBlock && c.r1 < TWINKLE; c.old = !inBlock && c.r5 < OLD; c.always = inBlock || c.twinkle || c.old;
cells.push(c);
}
// Each block square is reached by one report running straight along its row or column from outside the block.
const signals = [], at = (i, j) => (j + R) * (2 * C + 1) + i + C;
for (const c of cells) if (c.inBlock) {
c.tf = .24 + .46 * c.rank / (BLOCK * BLOCK);
const alongRow = random() < .55, side = random() < .5 ? -1 : 1, reach = alongRow ? C : R;
const out = 2 + Math.floor(random() * Math.max(1, reach - HALF - 2));
const start = side < 0 ? -HALF - out : HALF - 1 + out, end = alongRow ? c.i : c.j, step = Math.sign(end - start), path = [];
for (let k = start; ; k += step) { path.push(alongRow ? at(k, c.j) : at(c.i, k)); if (k === end) break; }
signals.push({ path, tf: c.tf, t0: c.tf - (path.length - 1) / SPEED });
}
// Far rows first, so nearer squares and the risen block draw over them.
const drawOrder = cells.slice().sort((a, b) => (b.j - a.j) || (Math.abs(b.i) - Math.abs(a.i)));
const lightA = new Float32Array(cells.length), lightB = new Float32Array(cells.length), lightG = new Float32Array(cells.length);

// One square at phase p: opacity, lift toward the lit navy, amount of Green and height.
let A = 0, B = 0, G = 0, H = 0;
const square = (c, p) => {
const base = c.twinkle ? c.dim * (1 - DEPTH + DEPTH * (1 + Math.sin(TAU * ((c.r3 < .5 ? 1 : 2) * p + c.r4)))) : c.dim;
if (c.inBlock) {
const g = p >= c.tf && p < .84 ? smooth((p - c.tf) / .03) : p >= .84 ? 1 - smooth((p - .84) / .12) : 0;
A = base + (.92 - base) * g; B = p >= c.tf ? pulse(p - c.tf - .008, .012) * BLINK : 0; G = g; H = LIFT * .35 * g;
return;
}
const ring = p > .74 && p < .995 ? pulse(c.ring - (p - .74) * 70, 1.3) * Math.max(0, 1 - c.ring / MAXD) * .7 * BLINK : 0;
const old = c.old ? Math.pow(.5 + .5 * Math.sin(TAU * (p + c.r4)), 12) * BLINK : 0;
A = base + .6 * Math.max(ring, old); B = ring; G = old; H = 0;
};
// The reports' light, laid down before the squares are drawn.
const reports = p => {
lightA.fill(0); lightB.fill(0); lightG.fill(0);
for (const s of signals) {
if (p < s.t0 - .03 || p > s.tf + .12) continue;
const head = (p - s.t0) * SPEED;
for (let q = 0; q < s.path.length; q++) {
const dq = head - q;
let I = dq >= 0 ? Math.exp(-dq / 2.2) : pulse(dq, .45);
if (q === 0) I = Math.max(I, pulse(p - s.t0 + .012, .01));
if (I < .02) continue;
I *= BLINK;
const k = s.path[q];
lightA[k] = Math.max(lightA[k], I); lightB[k] = Math.max(lightB[k], I); lightG[k] = Math.max(lightG[k], I * .9);
}
}
};

// The visitor's light: the lens under a fine pointer, and the reports sent by clicks and taps, which run
// at 14 squares a second along the row, then the column, into the nearest block square.
const TAP_SPEED = 14, clamp = (v, a, b) => Math.min(b, Math.max(a, v));
let lens = 0, lensX = 0, lensZ = 0, aimX = 0, aimZ = 0, aimOn = false;
const taps = [];
const tap = (i, j, now) => {
const ti = clamp(i, -HALF, HALF - 1), tj = clamp(j, -HALF, HALF - 1), path = [at(i, j)];
for (let k = i; k !== ti;) { k += Math.sign(ti - k); path.push(at(k, j)); }
for (let k = j; k !== tj;) { k += Math.sign(tj - k); path.push(at(ti, k)); }
if (taps.length > 5) taps.shift();
taps.push({ path, i, j, t0: now, arrive: (path.length - 1) / TAP_SPEED });
};
const visitor = now => {
lens += ((aimOn ? 1 : 0) - lens) * .18; lensX += (aimX - lensX) * .35; lensZ += (aimZ - lensZ) * .35;
for (let n = taps.length - 1; n >= 0; n--) if ((now - taps[n].t0) / 1000 > taps[n].arrive + 1.2) taps.splice(n, 1);
if (lens < .01 && !taps.length) return;
for (const c of cells) {
let a = 0, b = 0, g = 0;
if (lens >= .01) { const d = Math.hypot(c.i - lensX, c.j - lensZ), L = lens * pulse(d, 2.4); a = .75 * L; b = L; g = .6 * lens * pulse(d, .8); }
for (const t of taps) {
const s = (now - t.t0) / 1000, rd = Math.max(Math.abs(c.i - t.i), Math.abs(c.j - t.j));
const ring = pulse(rd - s * 10, .9) * Math.max(0, 1 - rd / 6) * .7;
a = Math.max(a, ring); b = Math.max(b, ring);
}
const k = c.idx;
lightA[k] = Math.max(lightA[k], a); lightB[k] = Math.max(lightB[k], b); lightG[k] = Math.max(lightG[k], g);
}
for (const t of taps) {
const s = (now - t.t0) / 1000, head = s * TAP_SPEED, last = t.path.length - 1;
for (let q = 0; q <= last; q++) {
const dq = head - q, I = dq >= 0 ? Math.exp(-dq / 2.2) : pulse(dq, .45);
if (I < .02) continue;
const k = t.path[q];
lightA[k] = Math.max(lightA[k], I); lightB[k] = Math.max(lightB[k], I); lightG[k] = Math.max(lightG[k], I);
}
const flash = s > t.arrive ? pulse(s - t.arrive - .15, .35) : 0, k = t.path[last];
lightA[k] = Math.max(lightA[k], flash); lightB[k] = Math.max(lightB[k], flash); lightG[k] = Math.max(lightG[k], flash);
}
};

// Camera: a point on the floor (x across, y up, z away) to the scene. The camera holds still, so every
// square's corners are projected once: on the floor, and for the block also at its full height.
const project = (x, y, z) => {
const dy = y - DIST * SA, dz = z + DIST * CA, Y = dy * CA + dz * SA, Z = -dy * SA + dz * CA;
return [CX + F * x / Z, CY - F * Y / Z];
};
const RISE = LIFT * .35;
const corners = (c, y) => [project(c.i - TILE, y, c.j - TILE), project(c.i + TILE, y, c.j - TILE), project(c.i + TILE, y, c.j + TILE), project(c.i - TILE, y, c.j + TILE)].flat();
for (const c of cells) { c.low = corners(c, 0); if (c.inBlock) c.high = corners(c, RISE); }
const blockOrder = drawOrder.filter(c => c.inBlock);

// Colours come in 17 steps of lift and 17 of Green, for the top face and the block's two darker sides.
const STEPS = 16, styles = new Map();
const style = (qb, qg, k) => {
const key = (qb * 17 + qg) * 3 + k;
let s = styles.get(key);
if (!s) {
const b = qb / STEPS, g = qg / STEPS, shade = [1, .5, .32][k];
const r0 = BASE[0] + (LIT[0] - BASE[0]) * b, g0 = BASE[1] + (LIT[1] - BASE[1]) * b, b0 = BASE[2] + (LIT[2] - BASE[2]) * b;
s = `rgb(${(r0 + (GREEN[0] - r0) * g) * shade | 0},${(g0 + (GREEN[1] - g0) * g) * shade | 0},${(b0 + (GREEN[2] - b0) * g) * shade | 0})`;
styles.set(key, s);
}
return s;
};
const quad = (g, pts) => { g.moveTo(pts[0], pts[1]); g.lineTo(pts[2], pts[3]); g.lineTo(pts[4], pts[5]); g.lineTo(pts[6], pts[7]); g.closePath(); };
let view = [1, 0, 0], rest = null;
// The floor at rest, drawn once per size: Navy and every square that only changes when light passes over it,
// batched by opacity (the same 32 steps the frames use, so a square looks the same cached or redrawn).
const makeRest = () => {
rest = document.createElement('canvas'); rest.width = canvas.width; rest.height = canvas.height;
const g = rest.getContext('2d'), groups = new Map();
g.fillStyle = NAVY; g.fillRect(0, 0, rest.width, rest.height);
g.setTransform(view[0], 0, 0, view[0], view[1], view[2]); g.fillStyle = style(0, 0, 0);
for (const c of cells) if (!c.always) { const qa = Math.round(Math.min(1, c.dim) * c.fog * 31); if (qa) { if (!groups.has(qa)) groups.set(qa, []); groups.get(qa).push(c); } }
for (const [qa, list] of groups) { g.globalAlpha = qa / 31; g.beginPath(); for (const c of list) quad(g, c.low); g.fill(); }
};
const keys = new Uint32Array(cells.length), alphas = new Float32Array(cells.length), heights = new Float32Array(cells.length), qbs = new Uint8Array(cells.length), qgs = new Uint8Array(cells.length);
const draw = (p, now) => {
reports(p);
if (now) visitor(now);
ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1;
ctx.drawImage(rest, 0, 0);
ctx.setTransform(view[0], 0, 0, view[0], view[1], view[2]);
// Then only the squares that change this frame: the twinkling and blinking ones, the block, and any that
// a report, the ring or the visitor lights. One that rests in the cached floor is wiped back to Navy first.
// Flat squares never overlap, so they are batched by colour and opacity, one fill per batch.
const ringOn = p > .74 && p < .995, front = (p - .74) * 70;
let n = 0, wipe = false;
ctx.beginPath();
for (const c of cells) {
const k = c.idx;
if (!c.always && lightA[k] < .01 && lightB[k] < .01 && lightG[k] < .01 && !(ringOn && Math.abs(c.ring - front) < 4.5)) continue;
square(c, p);
const a = Math.max(A, lightA[k]), b = Math.max(B, lightB[k]), g = Math.max(G, lightG[k]);
const alpha = Math.min(1, a) * c.fog;
if (c.inBlock) { alphas[k] = alpha; qbs[k] = Math.round(b * STEPS); qgs[k] = Math.round(g * STEPS); heights[k] = H; continue; }
if (!c.always) { quad(ctx, c.low); wipe = true; }
if (alpha < .01) continue;
const qa = Math.round(alpha * 31), qb = Math.round(b * STEPS), qg = Math.round(g * STEPS);
keys[n++] = (((qa * 17 + qb) * 17 + qg) << 10) | k;
}
if (wipe) { ctx.globalAlpha = 1; ctx.fillStyle = NAVY; ctx.fill(); }
const list = keys.subarray(0, n).sort();
for (let s = 0; s < n;) {
const key = list[s] >>> 10, qg = key % 17, qb = (key / 17 | 0) % 17, qa = key / 289 | 0;
ctx.beginPath();
for (; s < n && list[s] >>> 10 === key; s++) quad(ctx, cells[list[s] & 1023].low);
ctx.globalAlpha = qa / 31; ctx.fillStyle = style(qb, qg, 0); ctx.fill();
}
// The block: each square far to near, with its front and outer side once it rises.
for (const c of blockOrder) {
const alpha = alphas[c.idx];
if (alpha < .01) continue;
const t = heights[c.idx] / RISE, pts = c.low.map((v, k) => v + (c.high[k] - v) * t), qb = qbs[c.idx], qg = qgs[c.idx];
ctx.globalAlpha = alpha;
if (t > .03) {
ctx.beginPath(); ctx.moveTo(c.low[0], c.low[1]); ctx.lineTo(c.low[2], c.low[3]); ctx.lineTo(pts[2], pts[3]); ctx.lineTo(pts[0], pts[1]); ctx.closePath();
ctx.fillStyle = style(qb, qg, 1); ctx.fill();
if (c.i) {
const [u, v] = c.i > 0 ? [0, 6] : [2, 4];
ctx.beginPath(); ctx.moveTo(c.low[u], c.low[u + 1]); ctx.lineTo(c.low[v], c.low[v + 1]); ctx.lineTo(pts[v], pts[v + 1]); ctx.lineTo(pts[u], pts[u + 1]); ctx.closePath();
ctx.fillStyle = style(qb, qg, 2); ctx.fill();
}
}
ctx.beginPath(); quad(ctx, pts); ctx.fillStyle = style(qb, qg, 0); ctx.fill();
}
ctx.globalAlpha = 1;
};

// Size the canvas to the layer (layout size, so the arrival's scale doesn't count) and crop the scene like cover.
const size = () => {
const w = box.clientWidth, h = box.clientHeight, dpr = Math.min(2, window.devicePixelRatio || 1);
if (!w || !h) return false;
const pw = Math.round(w * dpr), ph = Math.round(h * dpr);
if (canvas.width !== pw || canvas.height !== ph) { canvas.width = pw; canvas.height = ph; }
const s = Math.max(w / VW, h / VH);
view = [s * dpr, (w - VW * s) * .9 * dpr, (h - VH * s) / 2 * dpr];
makeRest();
return true;
};

const wide = matchMedia('(min-width:1024px)');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let phase = hero.dataset.heroArrival === 'entering' ? 0 : STILL, last = 0, drawn = 0, raf = 0, visible = false, printing = false, mounted = false;
const running = () => visible && !document.hidden && !reduced.matches;
const stop = () => { if (raf) cancelAnimationFrame(raf); raf = 0; last = 0; };
const frame = now => {
raf = 0;
if (!running()) { sync(); return; }
if (last) phase = (phase + (now - last) / 1000 / LOOP) % 1;
last = now;
if (now - drawn >= 1000 / FPS - 2) { draw(phase, now); drawn = now; }
raf = requestAnimationFrame(frame);
};
const sync = () => {
if (!wide.matches || printing) { stop(); return; }
if (!mounted) { if (!size()) return; canvas.setAttribute('aria-hidden', 'true'); box.append(canvas); mounted = true; draw(phase); }
if (reduced.matches) { stop(); phase = STILL; draw(phase); box.dataset.floor = 'still'; return; }
if (!running()) { stop(); box.dataset.floor = 'paused'; return; }
box.dataset.floor = 'running';
if (!raf) raf = requestAnimationFrame(frame);
};

// A pointer to the floor square under it: undo the cover crop, then run the camera's ray down to the floor.
const toFloor = (x, y) => {
const r = box.getBoundingClientRect(), w = box.clientWidth, h = box.clientHeight;
if (!mounted || !r.width || !w) return null;
const dpr = canvas.width / w, sx = ((x - r.left) * w / r.width * dpr - view[1]) / view[0], sy = ((y - r.top) * h / r.height * dpr - view[2]) / view[0];
const u = (sx - CX) / F, v = (CY - sy) / F, den = SA - v * CA;
if (den < .02) return null;
const h0 = DIST * SA, dz = h0 * (CA + v * SA) / den;
return [u * (h0 * SA + dz * CA), dz - DIST * CA];
};
const onFloor = f => f && Math.abs(f[0]) <= C - 2 && f[1] >= -R && f[1] <= R - 4;
const fine = matchMedia('(hover: hover) and (pointer: fine)');
const ignore = target => target instanceof Element && !!target.closest('a, button, input, .hero-copy');
hero.addEventListener('pointermove', e => {
if (e.pointerType !== 'mouse' || !fine.matches) return;
const f = toFloor(e.clientX, e.clientY);
aimOn = onFloor(f) && !ignore(e.target);
if (aimOn) { if (lens < .01) { lensX = f[0]; lensZ = f[1]; } aimX = f[0]; aimZ = f[1]; }
}, { passive: true });
hero.addEventListener('pointerleave', () => { aimOn = false; }, { passive: true });
hero.addEventListener('pointerdown', e => {
if (!e.isPrimary || e.button > 0 || ignore(e.target) || box.dataset.floor !== 'running') return;
const f = toFloor(e.clientX, e.clientY);
if (!onFloor(f)) return;
tap(Math.round(f[0]), Math.round(f[1]), performance.now());
}, { passive: true });

new IntersectionObserver(entries => { visible = entries.some(entry => entry.isIntersecting); sync(); }).observe(hero);
new ResizeObserver(() => { if (mounted && size()) draw(phase); }).observe(box);
document.addEventListener('visibilitychange', sync);
wide.addEventListener('change', sync);
reduced.addEventListener('change', sync);
addEventListener('beforeprint', () => { printing = true; sync(); });
addEventListener('afterprint', () => { printing = false; sync(); });
addEventListener('pageshow', event => { if (event.persisted) sync(); });
})();
