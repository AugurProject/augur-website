/** Shared easing and timing tokens. Timings are milliseconds. */
export const easing = {
  reveal: 'cubic-bezier(.22,.61,.36,1)', hero: 'cubic-bezier(.22,.7,.22,1)',
  draw: 'cubic-bezier(.45,0,.2,1)', crossfade: 'cubic-bezier(.45,0,.55,1)',
  newcomer: 'cubic-bezier(.45,1.45,.8,1)',
  /** Use cases: `settle` lands fast and long, for text,
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
/** Sitewide field: cells within `margin` px of text or an object stay empty; full-width
 * bands darker than `bandLuminance` count as background. A `density` share of the rest hold a 3 px square,
 * `green` of them Green, in `steps` opacity steps across `paperOpacity` / `greenOpacity`; redrawn `debounce`
 * ms after a size change. Trail: `pool` squares of `size` px, every `greenEvery`th Green, growing from `from`
 * to full by `rise` of `fade` and peaking at `greenPeak` / `paperPeak`. */
export const fieldTimeline = { margin:12, bandLuminance:.06, density:.22, green:.18, steps:4, paperOpacity:[.05,.12], greenOpacity:[.12,.26], debounce:200, pool:24, greenEvery:3, size:5, from:.4, rise:.18, fade:800, greenPeak:.5, paperPeak:.22 } as const;
/** FAQ: the question box eases to its new height over `transition`; the toggle,
 * Green edge and answer text follow over `panel`, the answer lines `stagger` apart. */
export const faqTimeline = { transition:380, panel:timing.panel, stagger:50 } as const;
