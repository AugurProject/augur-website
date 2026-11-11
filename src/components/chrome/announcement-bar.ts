// Dismissal is remembered per browser; the header slides up over the fading bar (transform and
// opacity only), or the bar simply goes with reduced motion.
const bar=document.querySelector<HTMLElement>('aside[data-announcement]');
bar?.querySelector('[data-announcement-dismiss]')?.addEventListener('click',()=>{
  try{localStorage.setItem('augur:announcement-dismissed',bar.dataset.announcement!);}catch{}
  const followers:HTMLElement[]=[];
  for(let el=bar.nextElementSibling;el;el=el.nextElementSibling)if(el instanceof HTMLElement&&!(el instanceof HTMLScriptElement))followers.push(el);
  const header=followers[0];
  if(bar.contains(document.activeElement))header?.querySelector<HTMLElement>('a[href],button')?.focus({preventScroll:true});
  const before=header?.getBoundingClientRect().top??0;
  bar.style.cssText=`position:absolute;left:0;right:0;top:${bar.getBoundingClientRect().top+scrollY}px`;
  document.documentElement.dataset.announcement='dismissed';
  const delta=before-(header?.getBoundingClientRect().top??0);
  if(!delta||matchMedia('(prefers-reduced-motion: reduce)').matches){bar.remove();return;}
  const timing={duration:320,easing:'cubic-bezier(.22,.61,.36,1)'};
  bar.animate([{opacity:1},{opacity:0}],{duration:200,easing:'ease-out',fill:'forwards'});
  const slides=followers.map(el=>el.animate([{transform:`translateY(${delta}px)`},{transform:'none'}],timing));
  slides[0]?.finished.finally(()=>bar.remove());
});
// The drop-in, armed by announcement-state.inline.js. Every moving element runs the same CSS animation, started
// together here. Anything the reader does first settles it in place instead: the lift goes and the page
// scrolls by the bar's height in the same frame, so nothing moves under the pointer or the eye, and the bar
// is there above. Focus arriving in the bar itself (a screen reader, say) brings it down at once.
const root=document.documentElement;
if(bar&&root.dataset.announcement==='arriving'){
  const drops=(document.getAnimations?.()??[]).filter((a):a is CSSAnimation=>a instanceof CSSAnimation&&a.animationName.startsWith('announcement-drop'));
  const start=Math.min(...drops.map(a=>a.startTime===null?Infinity:Number(a.startTime)));
  if(Number.isFinite(start))for(const a of drops)a.startTime=start;
  const delay=(a:CSSAnimation)=>Number(a.effect?.getTiming().delay??0);
  const waiting=()=>drops.some(a=>Number(a.currentTime??0)<delay(a));
  const lifecycle=new AbortController(),signal=lifecycle.signal;
  const done=()=>{lifecycle.abort();if(root.dataset.announcement==='arriving')delete root.dataset.announcement;};
  const settle=()=>{if(!waiting())return;const lift=bar.offsetHeight;done();scrollBy({top:lift,behavior:'instant'});};
  addEventListener('scroll',settle,{passive:true,signal});
  for(const type of ['pointerdown','keydown'])addEventListener(type,settle,{capture:true,passive:true,signal});
  matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',settle,{signal});
  bar.addEventListener('focusin',()=>{if(waiting())for(const a of drops)a.currentTime=delay(a);},{signal});
  bar.addEventListener('animationend',event=>{if(event.target===bar)done();},{signal});
}

// Marks this file as a module, so its names stay out of the global scope.
export {};
