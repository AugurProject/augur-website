import { easing, timing } from './timelines';
import { motionTime } from './debug';
const initialized = new WeakSet<HTMLElement>();

/** Shared ARIA tabs: roving focus, automatic or manual activation, Home/End.
 * Server-rendered aria-selected and hidden attributes define the no-JS state.
 * A tab's aria-controls may list more than one panel: the first is its panel and
 * animates; the rest (the walkthrough's REP panel) show and hide with it. */
export function setupTabs(root: HTMLElement) {
  if(initialized.has(root)) return; initialized.add(root);
  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[role="tab"]')).filter(tab=>tab.closest('[data-tabs]')===root);
  const controlled = tabs.map(tab=>(tab.getAttribute('aria-controls') ?? '').split(/\s+/).map(id=>document.getElementById(id)));
  const panels = controlled.map(list=>list[0] ?? null);
  const show = (index:number) => controlled.forEach((list,i)=>list.forEach(panel=>{if(panel)panel.hidden=i!==index;}));
  let selected = Math.max(0,tabs.findIndex(tab=>tab.getAttribute('aria-selected')==='true'));
  let transition = 0;
  let panelMotion: Animation | undefined;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const settle = () => {
    transition++;
    root.getAnimations({subtree:true}).forEach(animation=>{try{animation.finish();}catch{/* A canceled effect is already settled. */}animation.cancel();});
    panelMotion=undefined;
    show(selected);
    root.dispatchEvent(new Event('tabssettled'));
  };
  reduced.addEventListener('change',()=>{if(reduced.matches)settle();});
  window.addEventListener('beforeprint',settle);
  window.addEventListener('pagehide',settle);
  window.addEventListener('resize',settle);
  const animatePanel = async (panel:HTMLElement|null, entering:boolean, opacity='1') => {
    if(!panel || reduced.matches || typeof panel.animate!=='function') return;
    try {
      panelMotion=panel.animate(entering ? [{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}] : [{opacity},{opacity:0}],{duration:motionTime(entering?timing.panel:timing.fadeOut),easing:easing.reveal});
      await panelMotion.finished.catch(()=>undefined);
    } catch { /* Unavailable animation support leaves the native state change instant. */ }
  };
  const activate = async (index:number) => {
    if(index===selected) return;
    const previous=selected; const current=++transition;
    // A rapid selection can arrive while the earlier panel is still fading.
    // Retarget the visible panel, rather than a selected-but-hidden one.
    const outgoing=panels.find(panel=>panel&&!panel.hidden)??null;
    const opacity=outgoing?getComputedStyle(outgoing).opacity:'1';
    root.dispatchEvent(new CustomEvent('tabsbeforechange',{detail:{index,previous},bubbles:false}));
    panelMotion?.cancel();panelMotion=undefined;
    selected=index;
    tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;});
    root.dataset.active=String(index);
    root.dispatchEvent(new CustomEvent('tabschange',{detail:{index,previous},bubbles:false}));
    // Panels that share one layout (the query card) swap in place; their
    // controller animates only the parts that change.
    if(root.hasAttribute('data-panel-swap')){show(index);root.dispatchEvent(new Event('tabspanelshown'));return;}
    await animatePanel(outgoing,false,opacity);
    if(current!==transition)return;
    show(index);
    root.dispatchEvent(new Event('tabspanelshown'));
    await animatePanel(panels[index]??null,true);
  };
  // On a stacked layout, a selected example can be below the entire tab list.
  // Reveal it after the swap, only when the reader explicitly picked a tab.
  let revealRequested = false;
  root.addEventListener('tabspanelshown', () => {
    if (!revealRequested) return;
    revealRequested = false;
    if (!matchMedia('(max-width: 767px)').matches) return;
    requestAnimationFrame(() => {
      const panel = panels[selected];
      if (!panel) return;
      const top = panel.getBoundingClientRect().top;
      if (top < 24 || top > innerHeight * .55) {
        panel.scrollIntoView({block:'start', behavior:reduced.matches?'instant':'smooth'});
      }
    });
  });
  tabs.forEach((tab,index)=>{
    tab.addEventListener('click',event=>{revealRequested=event.isTrusted && index!==selected;void activate(index);});
    tab.addEventListener('keydown',event=>{
      let next=index;
      if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(index+1)%tabs.length;
      else if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(index+tabs.length-1)%tabs.length;
      else if(event.key==='Home')next=0;
      else if(event.key==='End')next=tabs.length-1;
      else return;
      event.preventDefault();tabs.forEach((item,i)=>item.tabIndex=i===next?0:-1);tabs[next]?.focus();
      if(root.dataset.activation!=='manual'){revealRequested=true;void activate(next);}
    });
  });
}
export function setupAllTabs(){document.querySelectorAll<HTMLElement>('[data-tabs]').forEach(setupTabs);}
