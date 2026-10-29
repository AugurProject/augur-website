// How it works on /2/ to /4/ (Ryan 12, 21 Oct 2026): the example sits behind “Walk through an example”.
// Rendered inline right after the section (review-inline.ts), so it runs while the page parses: the
// example closes before it is first painted, and only when this script runs, so without JavaScript,
// or if the CSP blocked it, the example simply stays open and the controls stay hidden.
// It imports nothing: a shared module would split a chunk "/" also loads. Timings live in CSS.
// The example's [hidden] is the state (the strip's CSS reads it too); the toggle's aria-expanded follows.
(()=>{
const demo=document.getElementById('how-demo'),toggle=document.querySelector('[data-how-toggle]'),strip=document.querySelector('[data-how-strip]'),root=demo&&demo.querySelector('[data-walkthrough]');
if(!root)return;
const tabs=root.querySelectorAll('[role=tab]'),html=document.documentElement;
// Opening re-measures the steps' reserved height and restarts the REP loop on the laid-out example
// (home-interactions.ts and home-art.ts already listen for tabssettled).
const settle=()=>root.dispatchEvent(new Event('tabssettled'));
// page-field.ts sizes its layer to the page's scrollHeight, which counts the layer itself, so the layer
// can grow but never shrink: closing the example left 1,316 px of empty field under the footer at 390
// (618 at 1440), and closing an FAQ answer or a shorter use case left less ("/" has the same, 21 Oct 2026).
// When the page's content changes height, the layer drops to the content's height first, so
// page-field's next measure (debounced, after this) reads the page instead of the layer's old size.
new ResizeObserver(()=>{const field=document.querySelector('[data-page-field]');if(!field)return;field.style.height='0';field.style.height=html.scrollHeight+'px';}).observe(document.body);
// Closed, the example is hidden="until-found", so find in page and text fragments can still open it;
// where that isn't supported (Safari) the same assignment makes it plainly hidden.
const set=open=>{demo.hidden=!open&&'until-found';toggle.ariaExpanded=open;if(open)settle();};
// A press opens or closes in a same-document view transition (home-v2.css); reduced motion and
// browsers without view transitions change at once. From a step, the example opens at that step and
// focus moves to its tab, since the step's own button goes; the toggle keeps focus (a disclosure).
// A press during the 380 ms transition is ignored, so a double click opens once instead of skipping
// the first transition (an unhandled AbortError) and closing again.
// Focus moves without scrolling, so the transition's snapshots line up. Once the example has landed,
// the step's tab comes into view by the least distance (block nearest, at the page's own scroll
// behaviour): the example's tabs run taller than the strip, so a tile pressed low on the screen left
// the focused step below the fold (review fix, 21 Oct 2026). A tab already in view doesn't move.
const change=(open,step)=>{
if('howTransition' in html.dataset)return;
const tab=tabs[step],update=()=>{if(tab)tab.click();set(open);if(tab)tab.focus({preventScroll:true});},show=()=>{if(tab)tab.scrollIntoView({block:'nearest'});};
if(matchMedia('(prefers-reduced-motion: reduce)').matches||!document.startViewTransition){update();return show();}
html.dataset.howTransition='';
const tidy=()=>delete html.dataset.howTransition;
document.startViewTransition(update).finished.then(()=>{tidy();show();},tidy);
};
toggle.addEventListener('click',()=>change(!!demo.hidden));
demo.addEventListener('beforematch',()=>{toggle.ariaExpanded=true;requestAnimationFrame(settle);});
// Arrivals open at once, with no transition, because the page is scrolling there: the hero's
// “See how it works” (its markup is shared with "/"), any other link to #how-it-works, and a load
// or hash change to it. One delegated listener serves those links and the strip's steps.
const arrive=()=>{if(demo.hidden)set(true);};
document.addEventListener('click',({target})=>{const step=target.closest('[data-how-step]');if(step)change(true,step.dataset.howStep);else if(target.closest('a[href="#how-it-works"]'))arrive();});
addEventListener('hashchange',()=>{if(location.hash==='#how-it-works')arrive();});
set(location.hash==='#how-it-works');
toggle.hidden=strip.hidden=false;
})();
