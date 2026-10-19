import {loopScene} from './loop-scene';
import {motionTime} from './debug';
import {tenetChoreography,tenetCycle} from './tenet-choreography';
import {keyframes,type Track} from './choreography';
import {repCycle,repZoneTracks} from './rep-choreography';
import {easing,ribbonTimeline,timeAt} from './timelines';
/** The three tenet diagrams loop while any part is on screen (loop-scene.ts),
 * every element on its own 12 s track from tenet-choreography.ts, a delayed
 * track after a one-off lead-in. SVG elements
 * animate `transform`, not the individual `translate`/`scale` properties: in
 * Chromium the latter re-layerized the diagrams every frame (measured 6 Oct
 * 2026: about 2 s of main thread per 5 s, against 0.05 s with `transform`). */
/** A delayed track's lead-in plays once over the delay, on the element's
 * `data-lead` wrapper: in Chromium a loop that starts beside a second animation
 * of the same property on its element stays on the main thread after that
 * animation ends (measured 6 Oct 2026: about 830 ms per 5 s for Permissionless,
 * against 10 ms). The element shows its static frame meanwhile, so the wrapper
 * plays the lead-in relative to it. */
const leadIn=(track:Track):Track=>{
 const rest=track.keys[0]!.v;
 return{...track,keys:track.lead!.map(key=>({...key,v:typeof rest==='number'?(key.v as number)/rest:[(key.v as readonly number[])[0]!-rest[0],(key.v as readonly number[])[1]!-rest[1]] as const}))};
};
export function initTenets(){
 const scenes=[['[data-cross]',tenetChoreography.cross],['[data-mesh]',tenetChoreography.mesh],['[data-authority]',tenetChoreography.authority]] as const;
 for(const [selector,tracks] of scenes)document.querySelectorAll<SVGSVGElement>(selector).forEach(svg=>loopScene(svg,animate=>{
  for(const track of tracks){
   if(track.lead&&track.delay)animate(svg.querySelector(`[data-lead="${track.id}"]`),keyframes(leadIn(track),track.delay,undefined,{individual:false}),{duration:track.delay,iterations:1});
   animate(svg.querySelector(`[data-motion="${track.id}"]`),keyframes(track,tenetCycle,undefined,{individual:false}),{duration:tenetCycle,delay:track.delay??0});
  }
 }));
}

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
/** “Your REP” in the How it works query card (rep-choreography.ts): only the shown
 * step's zone loops, from rest, while it is on screen. It restarts from rest when
 * the step changes and after the tabs settle (resize, print, page hide), since the
 * glide is measured: the stake-to-bond distance follows the layout. */
export function initRepZone(){
 document.querySelectorAll<HTMLElement>('[data-walkthrough]').forEach(root=>{
  let stop:(()=>void)|undefined;
  const start=()=>{
   stop?.();
   const zone=root.querySelector<HTMLElement>('.rep-panel:not([hidden]) [data-rep-zone]');
   stop=zone?loopScene(zone,animate=>{
    const find=(id:string)=>zone.querySelector(`[data-motion="${id}"]`);
    const from=find('zone-ghost')?.getBoundingClientRect(),to=zone.querySelector('[data-bond-back] .squares')?.getBoundingClientRect();
    const dx=from&&to?to.left-from.left:0,dy=from&&to?to.top-from.top:0;
    for(const track of repZoneTracks(zone.dataset.repZone as 'meter'|'flow'|'receipt',zone.querySelectorAll('[data-motion^="zone-pop-"]').length)){
     const measured=track.prop==='translate'?{...track,keys:track.keys.map(key=>({...key,v:[(key.v as readonly number[])[0]!*dx,(key.v as readonly number[])[1]!*dy] as const}))}:track;
     const animation=animate(track.target?zone.querySelector(track.target):find(track.id),keyframes(measured,repCycle,undefined,{individual:false}),{duration:repCycle});
     if(animation)animation.id='rep-loop';
    }
   }):undefined;
  };
  root.addEventListener('tabspanelshown',start);
  root.addEventListener('tabssettled',start);
  start();
 });
}
