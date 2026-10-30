/** Motion source: Figma 121:152 and 250:717; owner brief §8; polish brief
 * (5 Oct 2026) for the answer ribbon.
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
/** The hero's arrival (hero review, 22 Oct 2026; the scroll-motion brief, 29 Oct 2026). On phones the support
 * paragraph is the Largest Contentful Paint (measured), and a fade held it back, so the headline and the support line
 * are visible from the first paint and only rise 8 px, each under 300 ms: the lines `lines`, then the support `copy`. The
 * underline draws as "decentralized" settles, before the actions arrive, and retracts before the scroll cue
 * fades in. The art (`field`) fades in once the text has landed and is in by the time it used to be, because at
 * 1440 the floor's still is the LCP element and counts only once its fade ends. */
export const heroTimeline = {
  lines:[{start:0,end:280},{start:40,end:320},{start:80,end:360}], copy:{start:120,end:400}, actions:{start:420,end:720},
  underline:{start:280,end:800}, underlineOut:{start:1900,end:2400}, underlineHover:320, field:{start:600,end:2000},
  /** Scroll cue: fades in once the underline has gone, then loops until the page scrolls. */
  scrollCue:{start:2400,end:2800,cycle:2400},
} as const;
/** One-time answer ribbon: a Green band sweeps under the statement. */
/** Each word of the statement rises `rise` em into place, in Navy, as the
 * ribbon's front reaches it (owner, 6 Oct 2026: the text should move too). */
export const ribbonTimeline = { threshold: .6, duration: 900, edgeFade: 180, word: { duration: 420, rise: .45 } } as const;
export const roadmapTimeline = {track:1000,stopStagger:110,stopDuration:320,evidence:850} as const;
/** Use cases (owner, 25 Oct 2026): each case is a product card that waits, gets its answer
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
 * back off over `slide`, its knob turning Green halfway, and the status turns to Blocked. The query's status chip
 * comes in from `statusFrom` scale. */
export const useCaseTimeline = { threshold:.6, link:240, out:160, at:160, in:320, swapIn:120, statusFrom:.92, loop:{ cycle:12000, fade:600, reset:400, resetOut:300, resetIn:400, out:200, in:520, light:400, dim:.35, past:.5, slide:55, glow:1400, focus:1400, ticks:[1800, 2400, 3000], reported:4400, waitIn:280, final:6400, seal:420, paid:7200, rest:8300 }, relay:{ depart:1200, pay:640, arrive:560 }, switch:{ close:2600, slide:480, pick:240, other:.4 } } as const;
/** How it works on /2/ (owner, 25 Oct 2026, item 4: "build A on /2", four steps over one stage; how-path-v2.js,
 * which gets this, `easing` and how-scenes.ts's acts written in). Steps are picked by press or key, never hover
 * (owner, 26 Oct 2026). A pick swaps the stage: the shown step fades out over `out` and the picked one fades in from
 * `at` over `in`; on every pick its scene acts from `pick`. Each act's own timing (the magnet, 26 Oct 2026) lives
 * with its drawing in how-scenes.ts. The links between the two steps draw in order (29 Oct 2026), each over `rail`
 * (draw), `railStagger` apart, one run: forward top to bottom, each square lighting (opacity .3 and 60% to full,
 * newcomer) over `light` from `lightAt` into the link that reaches it; back bottom to top, the picked square lighting
 * at once. The words never move.
 * The entrance follows the section's reading order (scroll-motion brief, 29 Oct 2026): the heading's "paid" draws over
 * `underline` (draw), once per tab session, once `threshold` of the heading is in view and the section's lead has
 * landed; then, once `revealTimeline.ready` of the stage has stayed on screen for `revealTimeline.dwell` and, while the
 * heading is in view, "paid" is in, the shown step's scene acts. The scene acts each time the stage comes on screen, a
 * reload included, waiting on its first frame until then (owner, 29 Oct 2026: the "ask" animation should "start
 * automatically … when the user scroll gets to them"). (A walk down the steps was tried and cut: moving light through
 * the steps while the stage stayed on Ask read, in two cold reads, as a stepper that had lost its content or as focus
 * moving by itself.)
 * Opening the example: its four sentences rise `rise` px and fade in over `row` (settle), `stagger` apart (0.65 s
 * in all). Closing is instant. */
export const howPathTimeline = { threshold:.6, underline:560, out:160, at:160, in:320, pick:200, rail:360, railStagger:360, lightAt:300, light:280, rise:8, row:320, stagger:110 } as const;
/** Section reveal on the review copies (owner, 29 Oct 2026: "content should appear little by little while scrolling";
 * the scroll-motion brief; reveal-v2.js, which gets this, `easing` and `timing.panel` written in). Each [data-reveal]
 * group armed below the fold settles in once, when its top passes `line` of the screen: it fades in as it rises `rise`
 * px over `timing.panel` (the heading `headingRise` over `heading`), on the settle curve, `stagger` after the group
 * before it in its section and `itemStagger` between the cards of one row, so a section lands within about 700 ms. A
 * section's own scene (How it works' scene, the roadmap's track) starts once `ready` of it has stayed on screen for
 * `dwell`, so a fly-by (End, a jump) never spends it off screen, and the lead above it has landed. */
export const revealTimeline = { line:.9, heading:400, headingRise:12, rise:8, stagger:80, itemStagger:60, ready:.9, dwell:120 } as const;
/** Sitewide field (owner, 19 Oct 2026): cells within `margin` px of text or an object stay empty; full-width
 * bands darker than `bandLuminance` count as background. A `density` share of the rest hold a 3 px square,
 * `green` of them Green, in `steps` opacity steps across `paperOpacity` / `greenOpacity`; redrawn `debounce`
 * ms after a size change. Trail: `pool` squares of `size` px, every `greenEvery`th Green, growing from `from`
 * to full by `rise` of `fade` and peaking at `greenPeak` / `paperPeak`. */
export const fieldTimeline = { margin:12, bandLuminance:.06, density:.22, green:.18, steps:4, paperOpacity:[.05,.12], greenOpacity:[.12,.26], debounce:200, pool:24, greenEvery:3, size:5, from:.4, rise:.18, fade:800, greenPeak:.5, paperPeak:.22 } as const;
/** FAQ: the question box eases to its new height over `transition`; the toggle,
 * Green edge and answer text follow over `panel`, the answer lines `stagger` apart. */
export const faqTimeline = { transition:380, panel:timing.panel, stagger:50 } as const;
