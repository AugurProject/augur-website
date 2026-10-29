import {loopScene} from '../../../motion/loop-scene';
import {tenetChoreography,tenetCycle} from './tenet-choreography';
import {keyframes,type Track} from './choreography';
import {repCycle,repZoneTracks} from './rep-choreography';
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
