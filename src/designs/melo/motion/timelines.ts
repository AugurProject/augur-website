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
  /** /2/ only (hero review, 22 Oct 2026): the underline draws as "decentralized" settles, before the
   * actions arrive, and retracts 300 ms sooner, so the scroll cue fades in once it has gone. */
  v2:{underline:{start:450,end:1020},underlineOut:{start:1900,end:2400}},
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
/** Use cases on the review copies (owner, 25 Oct 2026): each case is a product card that waits, gets its answer
 * and acts (use-cases-v2.js, which gets this and `easing` written in). A pick draws the 2 px Green line from the
 * tab over `link`, fades the shown case out over `out` and the picked one in from `at` over `in`.
 * Each card loops (owner, 28 Oct 2026: "all animations should be going in a loop"), keyed by `loop` on one
 * `cycle` that opens and closes on the finished card, from when `threshold` of the stage is in view. The reset
 * is soft, never a cut (owner, 28 Oct 2026): every part but the status chip dims to `dim` over `fade`; from
 * `reset` each finished value fades out over `resetOut`, and the first state fades in over `resetIn`, where
 * Asked grows in from `statusFrom` scale and a Paper ring lights it over `glow`, `swapIn` later. A
 * pick, or a press on the case shown, starts the case where its finished values are gone (`reset` +
 * `resetOut`); a press dips its card out over `out` and back in over `in` first.
 * Then one part is lit at a time (owner, 28 Oct 2026: "our eyes are not going to where it should be going"),
 * each change of light over `light`, centred on its moment: at `focus` the app's part lights and the chip
 * steps back to `past`, and the app's part plays; at `reported` the light moves to Augur Lituus, the app's part
 * steps back to `past`, and a 2 px line fades in over `waitIn`, `waitIn` after the report, and fills until
 * `final`; at `final` the Yes turns Green and its seal grows in, with its check, from `swapIn` over `seal`; at
 * `paid` the app's part lights again and acts; from `rest` everything is back up, and the finished card holds
 * to the end of the cycle (3.3 s). A rising price slides `slide` percent up as it rises; a word swaps in place,
 * the old one gone over `out` before the new one is in by `in`. Transform and opacity only, so the loop runs
 * off the main thread (the check's stroke no longer draws: drawn on every cycle, it restyled every frame).
 * The market card (owner, 26 Oct 2026, "Split it is") plays the whitepaper's order (§4.5): the price's digits
 * climb a step at each of `ticks` (to 99¢: consensus, not settlement), and it pays at `paid`. The insurance card,
 * a relay (owner, 28 Oct 2026, "Relay it is"), adds `relay`: the flight's leg lights and its stop comes in at
 * `depart`, and its stretch of line runs Paper from `focus` to the last of `ticks`, when it lands; at `reported`
 * Augur Lituus's stop comes in with a Paper Yes, and the next stretch fills Pewter until `final`, when the stop
 * becomes the seal; from `paid` the line runs Green to the cover over `pay` (travel easing), and `arrive` after
 * `paid` the cover's stop fills and "Paid" comes in. The DAO card, a switch (owner, 29 Oct 2026, "implement the
 * Switch into /melo"), adds `switch`: at `close` the vote has Passed and the go-live switch slides on over
 * `slide` (travel easing), its knob and ring turning Paper (`close` comes before the market's last tick, so Passed
 * is read before the light moves on). Augur Lituus, the larger part, shows both answers: at `reported` Yes's
 * ring lights, the line for the day it's open to challenge fills until `final`, then the Green sweeps across
 * Yes over `in`, its checked label shows `pick` later, and No steps back to `other`. At `paid` the switch slides
 * back off over `slide`, its knob turning Green halfway, and the status turns to Blocked.
 * Ryan's and Augus's DAO card, a proposal, loops on the same cycle: its pending words show from the reset, and
 * from `focus` a Mist line runs under its pending check over `scan`. At `reported` each pending word and that
 * line go over `swapOut`, and each answer comes in from `swapIn` over `swap` (a value rising `rise` px, the
 * status from `statusFrom` scale); the footer rises `footRise` px from `footAt` over `foot`, and the result
 * fades in from `resultAt` over `result`. */
export const useCaseTimeline = { threshold:.6, link:240, out:160, at:160, in:320, scan:600, swapOut:140, swapIn:120, swap:320, rise:4, statusFrom:.92, footAt:160, foot:420, footRise:6, resultAt:520, result:320, loop:{ cycle:12000, fade:600, reset:400, resetOut:300, resetIn:400, out:200, in:520, light:400, dim:.35, past:.5, slide:55, glow:1400, focus:1400, ticks:[1800, 2400, 3000], reported:4400, waitIn:280, final:6400, seal:420, paid:7200, rest:8300 }, relay:{ depart:1200, pay:640, arrive:560 }, switch:{ close:2600, slide:480, pick:240, other:.4 } } as const;
/** How it works on /2/ (owner, 25 Oct 2026, item 4: "build A on /2", four steps over one stage; how-path-v2.js,
 * which gets this, `easing` and how-scenes.ts's acts written in). Steps are picked by press or key, never hover
 * (owner, 26 Oct 2026). Once per tab session, after `threshold` of the stage is in view, the shown step's scene acts from
 * `entrance` and the heading's "paid" draws from `underlineAt` over `underline` (draw). A pick swaps the stage:
 * the shown step fades out over `out` and the picked one fades in from `at` over `in`; on every pick its scene acts
 * from `pick`. Each act's own timing (the magnet, 26 Oct 2026) lives with its drawing in
 * how-scenes.ts. The links between the two steps draw in order (29 Oct 2026), each over `rail` (draw),
 * `railStagger` apart, one run: forward top to bottom, each square lighting (opacity .3 and 60% to full, newcomer)
 * over `light` from `lightAt` into the link that reaches it; back bottom to top, the picked square lighting at once. The words never move. Opening the example: its
 * four sentences rise `rise` px and fade in over `row` (settle), `stagger` apart (0.65 s in all). Closing is
 * instant. */
export const howPathTimeline = { threshold:.5, entrance:200, underlineAt:360, underline:560, out:160, at:160, in:320, pick:200, rail:360, railStagger:360, lightAt:300, light:280, rise:8, row:320, stagger:110 } as const;
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
