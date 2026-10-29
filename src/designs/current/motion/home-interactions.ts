import {setupAllTabs} from '../../../motion/tabs';
import {bindMarketScrub,playCaseGraphic} from './case-graphics';
import {motionTime} from '../../../motion/debug';
import {playOnce,type Animate} from '../../../motion/play-once';
import {bindWalkthroughScroll} from './walkthrough-scroll';
import {easing,applicationTimeline,roadmapTimeline,outcomeTimeline,timing} from '../../../motion/timelines';
const enhanced=new WeakSet<HTMLElement>();
export function initHomeInteractions(){
 setupAllTabs();
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const animationsAvailable=typeof Element.prototype.animate==='function';
 document.querySelectorAll<HTMLElement>('[data-applications]').forEach(root=>{
  if(enhanced.has(root))return;enhanced.add(root);
  // Each use case plays as one sentence, top to bottom (owner, 19 Oct 2026: "polished, professional"):
  // the question rises, both answers rise in, the Green fill sweeps across the answer and its check
  // draws, the other answer steps back, and what the app does rises in before its picture plays.
  // Prediction markets plays once in view (once per session, playOnce); every case plays again
  // whenever it is picked, after the case it replaces fades out.
  const panels=[...root.querySelectorAll<HTMLElement>('[role="tabpanel"]')];
  // `way` is 1 when the picked case is lower in the list than the one it replaces, -1 when higher:
  // the content rises from below or settles from above, the way the marker travels.
  const story=(panel:HTMLElement|undefined,add:Animate,start:number,way=1)=>{
   if(!panel)return;const t=applicationTimeline;
   const rise=(node:Element|null,at:number,distance:number=t.rise)=>add(node,[{opacity:0,transform:`translateY(${distance*way}px)`},{opacity:1,transform:'none'}],{delay:start+at,duration:t.enter,easing:easing.settle,fill:'backwards'});
   // One animation from timed looks (ms from the story's start), each eased into the next, for an
   // element whose entrance and answer beat move the same property.
   const steps=(node:Element|null,looks:(Keyframe&{at:number})[])=>{const from=looks[0]!.at,span=looks[looks.length-1]!.at-from;add(node,looks.map(({at,...look})=>({...look,offset:(at-from)/span})),{delay:start+from,duration:span,easing:'linear',fill:'backwards'});};
   rise(panel.querySelector('.case-summary'),t.summary);
   rise(panel.querySelector('.case-question'),t.question);
   // Both answers rise in as equals. At the answer the picked chip gives a little under the fill, and
   // the other steps back.
   const enter=(i:number)=>({at:t.options+i*t.optionStagger,opacity:0,transform:`translateY(${10*way}px)`,easing:easing.settle});
   const landed=(i:number)=>({at:t.options+i*t.optionStagger+t.optionEnter,opacity:1,transform:'none'});
   panel.querySelectorAll('.case-option').forEach((chip,i)=>steps(chip,chip.classList.contains('is-answer')
    ?[enter(i),landed(i),{at:t.decide,opacity:1,transform:'none',easing:'cubic-bezier(.3,0,.5,1)'},{at:t.decide+t.press[0],opacity:1,transform:'scale(.96)',easing:easing.settle},{at:t.decide+t.press[1],opacity:1,transform:'none'}]
    :[enter(i),landed(i),{at:t.decide,opacity:1,transform:'none',easing:easing.crossfade},{at:t.decide+t.dimFade,opacity:t.dim,transform:'none'}]));
   add(panel.querySelector('.case-fill'),[{transform:'scaleX(0)'},{transform:'none'}],{delay:start+t.decide,duration:t.fill,easing:easing.settle,fill:'backwards'});
   add(panel.querySelector('.case-pick'),[{opacity:0},{opacity:1}],{delay:start+t.decide+t.label,duration:200,easing:'linear',fill:'backwards'});
   add(panel.querySelector('.case-check polyline'),[{strokeDashoffset:1.05},{strokeDashoffset:0}],{delay:start+t.decide+t.check,duration:t.checkDraw,easing:easing.settle,fill:'backwards'});
   rise(panel.querySelector('.case-by'),t.by,6);
   // Then the app acts: the action and its explanation rise, and the picture plays.
   rise(panel.querySelector('.case-action'),t.action);
   rise(panel.querySelector('.case-explanation'),t.explanation);
   rise(panel.querySelector('.case-fallback'),t.fallback,6);
   playCaseGraphic(panel,add,start+t.graphic);
  };
  const settleIntro=panels[0]?playOnce(panels[0],add=>story(panels[0],add,0),{threshold:applicationTimeline.threshold}):undefined;
  let motion:Animation[]=[];
  const stop=()=>{motion.forEach(a=>a.cancel());motion=[];};
  const animate:Animate=(element,keyframes,options={})=>{if(!element)return;const animation=element.animate(keyframes,{easing:easing.reveal,fill:'both',...options,duration:motionTime(Number(options.duration??320)),delay:motionTime(Number(options.delay??0))});motion.push(animation);return animation;};
  root.addEventListener('tabsbeforechange',()=>{settleIntro?.();stop();});
  root.addEventListener('tabschange',event=>{
   if(reduced.matches||!animationsAvailable)return;
   const {index,previous}=(event as CustomEvent<{index:number;previous:number}>).detail,way=index>previous?1:-1;
   // The shown case fades out while it is still in the shared cell (from 1024 up the panels overlap,
   // and hidden ones are only invisible), drifting a few pixels against the marker's travel, then the
   // picked one plays. `fill: none`, so once the fade ends the hidden case is invisible again.
   animate(panels[previous]??null,[{visibility:'visible',opacity:1,transform:'none'},{visibility:'visible',opacity:0,transform:`translateY(${-6*way}px)`}],{duration:applicationTimeline.out,easing:'linear',fill:'none'});
   story(panels[index],animate,applicationTimeline.start,way);
  });
  // Hover (owner, 19 Oct 2026: "a little interactive when hovering"): the faint hover copy of the
  // marker sits on the unpicked row under the mouse or keyboard focus. Coming from nowhere it fades in
  // on that row; moving between rows it glides (the CSS transition). Never on the picked row.
  const tabs=[...root.querySelectorAll<HTMLElement>('[role="tab"]')],ghost=root.querySelector<HTMLElement>('.case-hover');
  if(ghost){
   let shown=false;
   const show=(row:number|null)=>{
    if(row===null||tabs[row]?.getAttribute('aria-selected')==='true'){ghost.classList.remove('is-shown');shown=false;return;}
    if(!shown){ghost.style.transition='none';ghost.style.setProperty('--hover',String(row));void ghost.offsetWidth;ghost.style.transition='';}
    else ghost.style.setProperty('--hover',String(row));
    ghost.classList.add('is-shown');shown=true;
   };
   tabs.forEach((tab,row)=>{
    tab.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse')show(row);});
    tab.addEventListener('focus',()=>{if(tab.matches(':focus-visible'))show(row);});
    tab.addEventListener('blur',()=>{if(!tab.parentElement?.matches(':hover'))show(null);});
   });
   tabs[0]?.parentElement?.addEventListener('pointerleave',()=>{const focused=tabs.findIndex(tab=>tab.matches(':focus-visible'));show(focused<0?null:focused);});
   root.addEventListener('tabschange',()=>{const hovered=tabs.findIndex(tab=>tab.matches(':hover'));show(hovered<0?null:hovered);});
  }
  // The market chart reads its prices under the pointer.
  root.querySelectorAll<HTMLElement>('[data-case-graphic="market"]').forEach(bindMarketScrub);
  reduced.addEventListener('change',stop);
  root.addEventListener('tabssettled',stop);
  window.addEventListener('pagehide',stop);
 });
 document.querySelectorAll<HTMLElement>('[data-roadmap]').forEach(root=>{
  if(enhanced.has(root))return;enhanced.add(root);
  playOnce(root,animate=>{
   animate(root.querySelector('[data-track-done]'),[{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{duration:roadmapTimeline.track,easing:easing.draw});
   animate(root.querySelector('[data-track-live]'),[{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{delay:roadmapTimeline.track*2/3,duration:roadmapTimeline.track/3,easing:easing.draw});
   animate(root.querySelector('[data-track-ahead]'),[{opacity:0},{opacity:1}],{delay:600,duration:400});
   root.querySelectorAll('[data-stop]').forEach((stop,i)=>animate(stop,[{opacity:0,transform:'scale(.3)'},{opacity:1,transform:'scale(1)'}],{delay:i*roadmapTimeline.stopStagger,duration:roadmapTimeline.stopDuration}));
   root.querySelectorAll('[role="tabpanel"]:not([hidden]) [data-evidence-bar]').forEach(bar=>animate(bar,[{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{delay:300,duration:roadmapTimeline.evidence}));
  });
  root.addEventListener('tabschange',event=>{
   const {index}=(event as CustomEvent<{index:number}>).detail;root.style.setProperty('--selected',String(index));
   if(reduced.matches||!animationsAvailable)return;
   const panel=root.querySelectorAll('[role="tabpanel"]')[index];panel?.querySelectorAll('[data-evidence-bar]').forEach(bar=>{bar.getAnimations().forEach(a=>a.cancel());bar.animate([{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{delay:motionTime(timing.fadeOut),duration:motionTime(roadmapTimeline.evidence),easing:easing.reveal,fill:'backwards'});});
  });
 });
 document.querySelectorAll<HTMLElement>('[data-walkthrough]').forEach(root=>{
  if(enhanced.has(root))return;enhanced.add(root);
  // The open step's description runs to different lengths, so the steps column reserves
  // the tallest open state, measured with each step open in turn (transitions off, read in
  // one frame, nothing painted), and the REP panel and the page never move between steps.
  const steps=root.querySelector<HTMLElement>('[role="tablist"]');
  const reserve=()=>{
   if(!steps)return;const tabs=[...steps.querySelectorAll<HTMLElement>('[role="tab"]')],chosen=tabs.map(tab=>tab.getAttribute('aria-selected'));
   steps.style.minHeight='';steps.classList.add('is-measuring');
   const tallest=Math.max(...tabs.map(open=>{tabs.forEach(tab=>tab.setAttribute('aria-selected',String(tab===open)));return steps.offsetHeight;}));
   tabs.forEach((tab,i)=>tab.setAttribute('aria-selected',chosen[i]!));void steps.offsetHeight;steps.classList.remove('is-measuring');
   steps.style.minHeight=`${tallest}px`;
  };
  reserve();document.fonts?.ready.then(reserve,()=>undefined);root.addEventListener('tabssettled',reserve);
  // Scrolling moves through the steps where the walkthrough fits the screen.
  bindWalkthroughScroll(root);
  // Every card's Question details open and close together: the cards share their rows, so
  // open details on a hidden card would leave a gap under the shown one.
  const descriptions=[...root.querySelectorAll<HTMLDetailsElement>('.query-details')];
  descriptions.forEach(details=>details.addEventListener('toggle',()=>descriptions.forEach(other=>{if(other.open!==details.open)other.open=details.open;})));
  // “paid” in the heading: its Green underline draws in once per visit (playOnce).
  const heading=root.closest('section')?.querySelector('[data-paid-heading]');
  if(heading)playOnce(heading,animate=>animate(heading.querySelector('.paid-mark'),[{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{delay:200,duration:700,easing:easing.draw}),{threshold:.6});
  // The query card stays put between steps; only what changed moves: the
  // status, the outcome board and the newest Activity entry (transform and
  // opacity only). Going back shows the earlier state without motion.
  root.addEventListener('tabschange',event=>{
   if(reduced.matches||!animationsAvailable)return;const {index,previous}=(event as CustomEvent<{index:number;previous:number}>).detail;
   const panel=root.querySelector(`#walkthrough-panel-${index}`);if(!panel)return;
   const quick={duration:motionTime(timing.hover),easing:easing.reveal,fill:'backwards'} as const;
   panel.querySelector('.query-status')?.animate([{opacity:0},{opacity:1}],quick);
   // Every step-forward move below: keyframes, then duration and delay in timeline ms.
   const play=(node:Element|null|undefined,keys:Keyframe[],duration:number,delay:number,ease:string,extra?:KeyframeAnimationOptions)=>node?.animate(keys,{duration:motionTime(duration),delay:motionTime(delay),easing:ease,fill:'backwards',...extra});
   if(index>previous)play(panel.querySelector('[data-ledger-current]'),[{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],timing.panel,80,easing.reveal);
   if(index>previous){
    // A challenge that lands strikes through the report it replaced; a final answer
    // strikes through the outcomes it ruled out.
    const strike=(node:Element|null,delay:number)=>play(node,[{transform:'scaleX(0)'},{transform:'scaleX(1)'}],timing.panel,delay,easing.draw,{pseudoElement:'::after'});
    panel.querySelectorAll<HTMLElement>('[data-replaced-at]').forEach(node=>{const at=Number(node.dataset.replacedAt);if(previous<at&&at<=index)strike(node.querySelector('s'),160);});
    play(panel.querySelector('[data-ledger-current] .ledger-node'),[{transform:'scale(.4)',opacity:0},{transform:'scale(1)',opacity:1}],timing.panel,120,easing.newcomer);
    // The outcome board tells the step as cause, then effect: the bonds this step staked
    // drop into their outcome as squares, then the standing frame appears on the answer
    // they back, or glides there from the answer they overturned, and its check pops as
    // it lands.
    const o=outcomeTimeline,before=root.querySelector(`#walkthrough-panel-${previous}`);
    const dropped=[...panel.querySelectorAll<HTMLElement>('[data-bond-at]')].filter(square=>{const at=Number(square.dataset.bondAt);return previous<at&&at<=index&&square.offsetParent;});
    dropped.forEach((square,i)=>play(square,[{opacity:0,transform:'translateY(-12px) scale(.6)'},{opacity:1,transform:'none'}],o.dropIn,o.drop+i*o.dropStagger,easing.newcomer));
    const frame=panel.querySelector<HTMLElement>('.standing-frame'),oldFrame=before?.querySelector<HTMLElement>('.standing-frame');
    const at=o.drop+Math.max(0,dropped.length-1)*o.dropStagger+o.frameAfter;
    let landed:number|null=null;
    if(panel.querySelector('.outcome-board.is-final')&&!before?.querySelector('.outcome-board.is-final')){
     // The answer turns final and takes the board (a FLIP from the previous step's
     // layout, which stays laid out under this card): the ruled-out tiles switch off
     // where they stood and come back small in the side column, while the answer's tile
     // slides and its frame widens from where they stood, its name growing as it goes.
     const r=o.resolve,oldTiles=[...(before?.querySelectorAll<HTMLElement>('.outcome-tile')??[])],span=r.backAt+r.back;
     const widen=(node:Element|null|undefined,keys:Keyframe[])=>play(node,keys,r.widen,r.widenAt,easing.draw);
     panel.querySelectorAll<HTMLElement>('.outcome-tile').forEach((tile,n)=>{
      const a=oldTiles[n]?.getBoundingClientRect(),b=tile.getBoundingClientRect();if(!a||!b.width)return;
      const from=`translate(${a.left-b.left}px,${a.top-b.top}px)`;
      if(tile.classList.contains('is-selected')){
       widen(tile,[{transform:from},{transform:'none'}]);
       const name=tile.querySelector<HTMLElement>('.outcome-name'),oldName=oldTiles[n]!.querySelector<HTMLElement>('.outcome-name');
       if(name&&oldName)widen(name,[{transform:`scale(${parseFloat(getComputedStyle(oldName).fontSize)/parseFloat(getComputedStyle(name).fontSize)})`},{transform:'none'}]);
      }else{
       const scale=a.width/b.width;
       play(tile,[{opacity:1,transform:`${from} scale(${scale})`,easing:easing.crossfade},{opacity:0,transform:`${from} scale(${scale*.92})`,offset:r.out/span},{opacity:0,transform:'translateY(6px)',offset:r.backAt/span,easing:easing.reveal},{opacity:1,transform:'none'}],span,0,'linear');
      }
     });
     const b=frame?.getBoundingClientRect(),a=oldFrame?.getBoundingClientRect();
     if(b&&a?.width)widen(frame,[{transform:`translateX(${a.left-b.left}px) scaleX(${a.width/b.width})`,transformOrigin:'0 50%'},{transform:'none',transformOrigin:'0 50%'}]);
     else play(frame,[{opacity:0},{opacity:1}],o.appear,r.widenAt,easing.reveal);
     landed=r.widenAt+r.widen*.8;
     panel.querySelectorAll('[data-out] s').forEach((node,i)=>strike(node,r.strikeAt+i*60));
    }else if(frame){
     // The frame rests on a CSS transform (its outcome's column); the keyframes use the
     // measured pitch between tiles, so they land on that same spot at any width.
     const tiles=panel.querySelectorAll('.outcome-tile'),pitch=tiles.length>1?tiles[1]!.getBoundingClientRect().left-tiles[0]!.getBoundingClientRect().left:0;
     const place=(column:number,scale=1)=>`translateX(${column*pitch}px) scale(${scale})`;
     const to=Number(frame.dataset.standing),from=Number(oldFrame?.dataset.standing??-1);
     if(from<0){play(frame,[{opacity:0,transform:place(to,.94)},{opacity:1,transform:place(to)}],o.appear,at,easing.reveal);landed=at+o.appear*.6;}
     else if(from!==to){play(frame,[{transform:place(from)},{transform:place(to)}],o.glide,at,easing.draw);landed=at+o.glide*.8;}
    }
    if(landed!==null)play(panel.querySelector('.outcome-tile.is-selected .outcome-check'),[{opacity:0,transform:'scale(.5)'},{opacity:1,transform:'none'}],o.check,landed,easing.newcomer);
   }
  });
 });
}
