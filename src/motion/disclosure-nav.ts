import { easing } from './timelines';
import { motionTime } from './debug';

/** Header disclosures: native details/summary, enhanced for fine pointers.
 * Hover opens a panel after a short intent delay; leaving the navigation closes
 * a hover-opened panel after a grace period. A Green line glides under the
 * item under the pointer (or the open item) and rests under the current
 * section. Moving between items
 * with a panel open glides the panel from the old item to the new one, resizing
 * its frame while the new links fade in, so there is never a close/reopen flash
 * or gap.
 * Click, tap, keyboard and Escape keep their native disclosure behaviour.
 * Only transform and opacity animate. No ARIA menu roles are used. */
const OPEN_DELAY = 80;
const CLOSE_DELAY = 220;
const GLIDE = 260;

export function initNavigation() {
  const root=document.querySelector<HTMLElement>('[data-site-header]');
  if(!root)return;
  const lifecycle=new AbortController(),options={signal:lifecycle.signal};
  const nav=root.querySelector<HTMLElement>('.desktop-nav');
  const disclosures=[...root.querySelectorAll<HTMLDetailsElement>('[data-nav-disclosure]')];
  const items=[...(nav?.querySelectorAll<HTMLElement>('.nav-item')??[])];
  const highlight=root.querySelector<HTMLElement>('[data-nav-highlight]');
  const hoverCapable=matchMedia('(hover:hover) and (pointer:fine)');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const openedBy=new WeakMap<HTMLDetailsElement,'hover'|'click'>();
  let openTimer=0,closeTimer=0,hovered:HTMLElement|null=null,pendingFrom:DOMRect|null=null;
  root.dataset.navEnhanced='';

  // Highlight line: a 2 px rule on the item's bottom edge, moved with translate
  // and scaleX only. It draws in from its left end, glides between items and
  // retracts to that end when nothing is highlighted. A line still retracting
  // glides back instead of starting over.
  // It spans what the item shows, from the label's first stroke to the
  // chevron's tip (or the label's last stroke), so it is centred under it: the
  // label's side bearings come from the font, the chevron's inset from its
  // glyph inside the icon's box. Layout boxes, so a turning chevron is ignored.
  const pen=document.createElement('canvas').getContext('2d');
  const ink=(item:HTMLElement)=>{
    const rect=item.getBoundingClientRect(),label=item.querySelector<HTMLElement>('.nav-item-label')??item,box=label.getBoundingClientRect();
    let left=box.left,right=box.right;
    if(pen){
      const font=getComputedStyle(label);pen.font=`${font.fontWeight} ${font.fontSize} ${font.fontFamily}`;
      const text=pen.measureText(label.textContent??'');
      left-=text.actualBoundingBoxLeft;right+=text.actualBoundingBoxRight-text.width;
    }
    // Phosphor's caret is filled; Augur's own (the review copies) is a stroke,
    // half of which lies outside its path.
    const glyph=item.querySelector<SVGSVGElement>('.nav-chevron svg'),view=glyph?.viewBox.baseVal;
    if(glyph&&view?.width){
      const shape=glyph.getBBox(),paint=getComputedStyle(glyph),stroke=paint.stroke==='none'?0:parseFloat(paint.strokeWidth)/2;
      right=rect.right-parseFloat(getComputedStyle(item).paddingRight)-(view.x+view.width-shape.x-shape.width-stroke)/view.width*parseFloat(paint.width);
    }
    return {left,width:right-left,top:rect.bottom-2};
  };
  let lineAt='';
  const place=(item:HTMLElement|null)=>{
    if(!highlight||!nav)return;
    if(!item){
      if(highlight.dataset.visible!==undefined){delete highlight.dataset.visible;highlight.style.transform=`${lineAt} scaleX(0)`;}
      return;
    }
    const from=nav.getBoundingClientRect(),line=ink(item);
    lineAt=`translate(${line.left-from.left}px,${line.top-from.top}px)`;
    // A placement already marked instant (settle) skips the draw-in.
    if(highlight.dataset.visible===undefined&&highlight.dataset.instant===undefined&&!highlight.getAnimations().length){
      highlight.dataset.instant='';highlight.style.transform=`${lineAt} scaleX(0)`;
      void highlight.offsetWidth;delete highlight.dataset.instant;
    }
    highlight.style.transform=`${lineAt} scaleX(${line.width/100})`;
    highlight.dataset.visible='';
  };
  const openSummary=()=>disclosures.find(item=>item.open)?.querySelector<HTMLElement>('summary')??null;
  // At rest the line marks the current section, if any.
  const current=nav?.querySelector<HTMLElement>('.nav-link[data-current],.nav-disclosure[data-current]>.nav-item')??null;
  const syncHighlight=()=>place(hovered??openSummary()??current);
  // Placed without drawing: on load, resize and font swap the line just sits.
  const settle=()=>{if(!highlight)return;highlight.dataset.instant='';syncHighlight();requestAnimationFrame(()=>delete highlight.dataset.instant);};
  settle();
  document.fonts?.ready.then(settle);

  const clearTimers=()=>{clearTimeout(openTimer);clearTimeout(closeTimer);};
  const sync=(item:HTMLDetailsElement)=>item.querySelector('summary')?.setAttribute('aria-expanded',String(item.open));
  const close=(except?:HTMLDetailsElement)=>disclosures.forEach(item=>{if(item!==except&&item.open){item.open=false;sync(item);}});
  const panelOf=(item:HTMLDetailsElement)=>item.querySelector<HTMLElement>('.nav-panel');
  const openPanelBox=(except:HTMLDetailsElement)=>{const other=disclosures.find(item=>item!==except&&item.open);return other?panelOf(other)?.getBoundingClientRect()??null:null;};
  // Outgoing panels close without their fade; the incoming one starts where the
  // outgoing one was and glides into place.
  const suppress=()=>{root.dataset.navSwitching='';requestAnimationFrame(()=>requestAnimationFrame(()=>delete root.dataset.navSwitching));};
  const glide=(item:HTMLDetailsElement,from:DOMRect)=>{
    const panel=panelOf(item);
    if(!panel||reduced.matches||typeof panel.animate!=='function')return;
    const to=panel.getBoundingClientRect(),timing={duration:motionTime(GLIDE),easing:easing.reveal};
    panel.getAnimations().forEach(animation=>animation.cancel());
    panel.animate([{transform:`translateX(${from.left-to.left}px)`},{transform:'none'}],timing);
    panel.animate([{transform:`scale(${from.width/to.width},${from.height/to.height})`},{transform:'none'}],{...timing,pseudoElement:'::before'});
    panel.querySelector('ul')?.animate([{opacity:0},{opacity:1}],{duration:motionTime(180),delay:motionTime(70),easing:'ease-out',fill:'backwards'});
  };
  const show=(item:HTMLDetailsElement,source:'hover'|'click')=>{
    const from=openPanelBox(item);
    if(from)suppress();
    openedBy.set(item,source);
    if(!item.open){item.open=true;sync(item);}
    close(item);
    if(from)glide(item,from);
  };

  disclosures.forEach(item=>{
    item.addEventListener('toggle',()=>{
      sync(item);
      if(item.open){close(item);if(pendingFrom){glide(item,pendingFrom);pendingFrom=null;}}
      else openedBy.delete(item);
      syncHighlight();
    },options);
    const summary=item.querySelector('summary');
    item.addEventListener('pointerenter',event=>{
      if(event.pointerType!=='mouse'||!hoverCapable.matches)return;
      clearTimers();
      if(item.open)return;
      if(disclosures.some(other=>other.open))show(item,'hover');
      else openTimer=window.setTimeout(()=>show(item,'hover'),OPEN_DELAY);
    },options);
    item.addEventListener('pointerleave',event=>{if(event.pointerType==='mouse')clearTimeout(openTimer);},options);
    // A click on a panel the pointer has already opened keeps it open and
    // pins it; a second click closes it natively. A click that switches from
    // another open panel glides like hover does.
    summary?.addEventListener('click',event=>{
      clearTimeout(openTimer);
      if(item.open&&openedBy.get(item)==='hover'&&event.detail>0){event.preventDefault();openedBy.set(item,'click');return;}
      if(!item.open){openedBy.set(item,'click');pendingFrom=openPanelBox(item);if(pendingFrom)suppress();}
    },options);
  });
  items.forEach(item=>{
    item.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse'){hovered=item;place(item);}},options);
    item.addEventListener('pointerleave',event=>{if(event.pointerType==='mouse'&&hovered===item){hovered=null;}},options);
  });
  nav?.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse')clearTimeout(closeTimer);},options);
  // A plain link in the bar (About) dismisses a panel the pointer opened.
  nav?.querySelectorAll<HTMLElement>(':scope > a').forEach(link=>link.addEventListener('pointerenter',event=>{
    if(event.pointerType!=='mouse')return;clearTimers();
    const current=disclosures.find(item=>item.open);if(current&&openedBy.get(current)==='hover')close();
  },options));
  nav?.addEventListener('pointerleave',event=>{
    if(event.pointerType!=='mouse')return;
    clearTimeout(openTimer);hovered=null;syncHighlight();
    const current=disclosures.find(item=>item.open);
    if(current&&openedBy.get(current)==='hover')closeTimer=window.setTimeout(()=>close(),CLOSE_DELAY);
  },options);
  // Inside an open panel the line stays on that panel's item.
  disclosures.forEach(item=>panelOf(item)?.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse'){hovered=null;syncHighlight();}},options));
  document.addEventListener('pointerdown',event=>{if(event.target instanceof Node&&!root.contains(event.target)){clearTimers();close();}},options);
  root.addEventListener('focusout',event=>{
    const next=event.relatedTarget;
    if(next instanceof Node&&nav&&!nav.contains(next)&&disclosures.some(item=>item.open)){clearTimers();close();}
  },options);
  root.addEventListener('keydown',event=>{if(event.key==='Escape'){const current=disclosures.find(item=>item.open);if(current){event.preventDefault();clearTimers();close();current.querySelector('summary')?.focus();}}},options);
  hoverCapable.addEventListener('change',()=>{clearTimers();},options);
  window.addEventListener('resize',settle,options);
  const dialog=root.querySelector<HTMLDialogElement>('dialog');
  const trigger=root.querySelector<HTMLButtonElement>('[data-mobile-open]');
  trigger?.addEventListener('click',()=>{dialog?.showModal();trigger.setAttribute('aria-expanded','true');document.documentElement.style.overflow='hidden';},options);
  const reset=()=>{trigger?.setAttribute('aria-expanded','false');document.documentElement.style.overflow='';trigger?.focus();};
  dialog?.addEventListener('close',reset,options);
  root.querySelector('[data-mobile-close]')?.addEventListener('click',()=>dialog?.close(),options);
  dialog?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>dialog.close(),options));
  window.addEventListener('pagehide',event=>{clearTimers();close();dialog?.close();hovered=null;place(null);document.documentElement.style.overflow='';if(!event.persisted)lifecycle.abort();},options);
}
