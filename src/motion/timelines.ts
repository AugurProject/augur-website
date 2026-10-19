/** Motion source: Figma 121:152 and 250:717; owner brief §8; polish brief
 * (5 Oct 2026) for the looping tenet diagrams, answer ribbon and hero ambience.
 * Timings are milliseconds. */
export const easing = {
  reveal: 'cubic-bezier(.22,.61,.36,1)', hero: 'cubic-bezier(.22,.7,.22,1)',
  draw: 'cubic-bezier(.45,0,.2,1)', crossfade: 'cubic-bezier(.45,0,.55,1)',
  newcomer: 'cubic-bezier(.45,1.45,.8,1)',
  /** Use cases (owner, 19 Oct 2026: "polished, professional"): `settle` lands fast and long, for text,
   * fills and rules; `travel` moves a mark from rest to rest; `approach` brakes hard into a stop. */
  settle: 'cubic-bezier(.16,1,.3,1)', travel: 'cubic-bezier(.65,0,.35,1)', approach: 'cubic-bezier(.5,0,.1,1)',
} as const;
export const timing = { hover:180, fadeOut:160, panel:320, longPanel:850, stagger:110 } as const;
/** The moment, as a fraction of the duration, at which a cubic-bezier easing
 * whose output rises steadily reaches `progress`. */
export function timeAt(curve:string,progress:number){
 const [x1=0,y1=0,x2=1,y2=1]=(curve.match(/-?[\d.]+/g)??[]).map(Number);
 const at=(a:number,b:number,s:number)=>3*(1-s)**2*s*a+3*(1-s)*s**2*b+s**3;
 let low=0,high=1;
 for(let step=0;step<24;step++){const mid=(low+high)/2;if(at(y1,y2,mid)<progress)low=mid;else high=mid;}
 return at(x1,x2,(low+high)/2);
}
export const heroTimeline = {
  lines: [{start:0,end:700},{start:100,end:800},{start:200,end:900}],
  copy: {start:400,end:900}, actions:{start:650,end:950},
  underline:{start:750,end:1320}, underlineOut:{start:2200,end:2700}, underlineHover:320,
  /** Scroll cue: fades in once the underline has gone, then loops until the page scrolls. */
  scrollCue:{start:2400,end:2800,cycle:2400},
  field:{start:500,end:2100}, rings:[600,500,400,300,200,100,0],
  squareMove:1200,squareFade:800,orbit:{start:1100,end:1700},centre:{start:1750,end:2300},
} as const;
/** Hero ambience after arrival lives in hero-choreography.ts (one source for
 * the website and the Figma keyframes). */
/** The tenet diagram loops live in tenet-choreography.ts (one source for the
 * website and the Figma keyframes). */
/** One-time answer ribbon: a Green band sweeps under the statement. */
/** Each word of the statement rises `rise` em into place, in Navy, as the
 * ribbon's front reaches it (owner, 6 Oct 2026: the text should move too). */
export const ribbonTimeline = { threshold: .6, duration: 900, edgeFade: 180, word: { duration: 420, rise: .45 } } as const;
export const roadmapTimeline = {track:1000,stopStagger:110,stopDuration:320,evidence:850} as const;
/** Use cases (owner, 19 Oct 2026: "polished, professional"), one sentence played top to bottom: ask,
 * answer, act. A pick fades the shown case out over `out` and starts the next `start` later. Text rises
 * `rise` px over `enter` (summary, question, then the line saying who did not decide, the action, its
 * explanation and any note at their keys). The chips rise from `options`, `optionStagger` apart, over
 * `optionEnter`. At `decide` the Green fill sweeps across the picked chip over `fill`, the chip gives
 * under it (`press` down, then back), its label shows `label` later and its check draws `check` later
 * over `checkDraw`; the other chip steps back to `dim` opacity over `dimFade`. The picture
 * starts at `graphic`. Prediction markets first plays once `threshold` of it is in view. */
export const applicationTimeline = { threshold:.6, out:160, start:120, enter:640, rise:14, summary:0, question:40, options:140, optionStagger:70, optionEnter:520, decide:760, fill:520, press:[80,420], label:120, check:190, checkDraw:380, dim:.4, dimFade:420, by:920, action:1040, explanation:1100, graphic:1200, fallback:1320 } as const;
/** Sitewide field (owner, 19 Oct 2026): cells within `margin` px of text or an object stay empty; full-width
 * bands darker than `bandLuminance` count as background. A `density` share of the rest hold a 3 px square,
 * `green` of them Green, in `steps` opacity steps across `paperOpacity` / `greenOpacity`; redrawn `debounce`
 * ms after a size change. Trail: `pool` squares of `size` px, every `greenEvery`th Green, growing from `from`
 * to full by `rise` of `fade` and peaking at `greenPeak` / `paperPeak`. */
export const fieldTimeline = { margin:12, bandLuminance:.06, density:.22, green:.18, steps:4, paperOpacity:[.05,.12], greenOpacity:[.12,.26], debounce:200, pool:24, greenEvery:3, size:5, from:.4, rise:.18, fade:800, greenPeak:.5, paperPeak:.22 } as const;
/** Case pictures (owner, 19 Oct 2026: "polished, professional"), from `applicationTimeline.graphic`. The
 * picture fades in over `fade`; a ring marks the moment the answer acts, growing over `pulse`.
 * Market: the grid draws over `grid`, `gridStagger` apart; from `lead` the prices draw over `draw`,
 * reaching the answer at `arrive` of it, waiting until `hold`, jumping to settled by `settle`, then running
 * out to the edge; the end labels rise `ends` before the draw ends.
 * Flight: from `lead` the arrival travels over `travel`; as it passes +2 hours the ring marks the limit and
 * the insured seats fill, `wave` ms a column and `rowWave` a row apart, each over `seat`.
 * Gate: from `lead` the proposal travels over `travel` and brakes into the review; the pause bars rise
 * `close` before it arrives, `barStagger` apart, and it bumps them over `bump`. The later lane shows at
 * `later`, its check draws over `check`, and from `laterRun` its proposal travels over `laterTravel` to Live. */
export const caseGraphicTimeline = { fade:420, pulse:820, market:{grid:700, gridStagger:70, lead:180, draw:2200, arrive:.5, hold:.58, settle:.64, ends:160}, flight:{lead:160, travel:1600, wave:14, rowWave:28, seat:380}, gate:{lead:160, travel:1100, close:320, barStagger:70, bump:460, later:1700, check:380, laterRun:1960, laterTravel:1400} } as const;
/** FAQ: the question box eases to its new height over `transition`; the toggle,
 * Green edge and answer text follow over `panel`, the answer lines `stagger` apart. */
export const faqTimeline = { transition:380, panel:timing.panel, stagger:50 } as const;
/** How it works outcome board, on a step forward: each new bond square drops in from `drop`,
 * `dropStagger` apart, over `dropIn` (newcomer); then, `frameAfter` the last square, the standing
 * frame appears at its outcome (over `appear`) or glides to it from the outcome it left (over
 * `glide`, draw easing), and the check pops over `check` as the frame lands.
 * When the answer turns final (`resolve`): the ruled-out tiles switch off where they stood by `out`
 * (shrinking to 92%), the frame and the answer widen from `widenAt` over `widen` (draw easing, the
 * name growing from its old size), the ruled-out outcomes return as small chips from `backAt` over
 * `back`, and their strikes draw from `strikeAt`, 60 apart. */
export const outcomeTimeline = { drop:60, dropStagger:90, dropIn:timing.panel, frameAfter:200, appear:timing.panel, glide:520, check:timing.panel,
  resolve:{ out:180, widenAt:120, widen:560, backAt:480, back:300, strikeAt:760 } } as const;
