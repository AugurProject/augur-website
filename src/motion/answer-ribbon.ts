import {motionTime} from './debug';
import {easing,ribbonTimeline,timeAt} from './timelines';
/** The answer band: a Green ribbon sweeps in under the statement once per
 * load, led by three squares. The statement stays real, readable text
 * throughout: Paper on Navy ahead of the sweep, Navy on Green behind it, where
 * each word rises into place as the ribbon's front reaches it. Unlike the other
 * entrance scenes it also plays after a reload or a return visit (owner,
 * 6 Oct 2026), so it does not go through seen.ts. */
export function initAnswerRibbon(){
 const band=document.querySelector<HTMLElement>('[data-answer-band]');
 const text=band?.querySelector<HTMLElement>('[data-answer]');
 if(!band||!text||matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window)||typeof band.animate!=='function')return;
 // Already on screen when the script runs: keep the settled band, no flash.
 const box=band.getBoundingClientRect();if(box.bottom>0&&box.top<innerHeight)return;
 const fill=document.createElement('div');fill.className='ribbon-fill';
 const overlay=document.createElement('div');overlay.className='ribbon-overlay';overlay.setAttribute('aria-hidden','true');overlay.append(text.cloneNode(true));
 const copy=overlay.querySelector<HTMLElement>('[data-answer]');copy?.removeAttribute('data-answer');
 // Only the Navy copy moves, word by word; the live statement underneath stays whole.
 const words=(copy?.textContent??'').split(' ').map(word=>{const span=document.createElement('span');span.className='ribbon-word';span.textContent=word;return span;});
 copy?.replaceChildren(...words.flatMap((word,index)=>index?[' ',word]:[word]));
 const edge=document.createElement('div');edge.className='ribbon-edge';edge.append(...Array.from({length:3},()=>document.createElement('i')));
 band.append(fill,overlay,edge);band.dataset.ribbon='armed';
 const events=new AbortController();let animations:Animation[]=[];
 const settle=()=>{animations.forEach(a=>a.cancel());fill.remove();overlay.remove();edge.remove();band.dataset.ribbon='settled';observer.disconnect();events.abort();};
 const play=()=>{
  observer.disconnect();
  const timing={duration:motionTime(ribbonTimeline.duration),easing:easing.draw,fill:'both'} as const;
  animations=[
   fill.animate([{transform:'scaleX(0)'},{transform:'scaleX(1)'}],timing),
   overlay.animate([{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0 0 0)'}],timing),
   edge.animate([{transform:'translateX(0)'},{transform:`translateX(${band.clientWidth}px)`}],timing),
   edge.animate([{opacity:1},{opacity:1,offset:1-ribbonTimeline.edgeFade/ribbonTimeline.duration},{opacity:0}],{...timing,easing:'linear'}),
  ];
  // The front reaches a word at its left edge; the word rises from there.
  const left=band.getBoundingClientRect().left,width=band.clientWidth,{word}=ribbonTimeline;
  for(const span of words)animations.push(span.animate([{opacity:0,transform:`translateY(${word.rise}em)`},{opacity:1,transform:'none'}],{duration:motionTime(word.duration),delay:timing.duration*timeAt(easing.draw,Math.min(1,Math.max(0,(span.getBoundingClientRect().left-left)/width))),easing:easing.hero,fill:'both'}));
  void Promise.all(animations.map(a=>a.finished)).then(settle,()=>undefined);
 };
 const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.intersectionRatio>=ribbonTimeline.threshold)&&!document.hidden)play();},{threshold:[0,ribbonTimeline.threshold]});
 observer.observe(band);
 matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',settle,{signal:events.signal});
 window.addEventListener('beforeprint',settle,{signal:events.signal});
 window.addEventListener('pagehide',settle,{signal:events.signal});
}
