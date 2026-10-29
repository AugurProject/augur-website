/** Pointer-only work is rAF-throttled; twinkle is CSS on twelve selected marks. */
export function initHeritageGlow(field:SVGSVGElement){
 const hero=field.closest<HTMLElement>('[data-home-hero]'),circle=field.querySelector<SVGCircleElement>('[data-heritage-radius]');if(!hero||!circle)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(hover:hover) and (pointer:fine)');
 const lifecycle=new AbortController(),options={signal:lifecycle.signal};let visible=true,frame=0,x=0,y=0;
 const reset=()=>{cancelAnimationFrame(frame);frame=0;delete field.dataset.pointerActive;};
 const sync=()=>{if(visible&&!document.hidden&&!reduced.matches)field.dataset.active='';else{delete field.dataset.active;reset();}};
 hero.addEventListener('pointermove',event=>{if(!visible||document.hidden||reduced.matches||!fine.matches||event.pointerType!=='mouse')return;x=event.clientX;y=event.clientY;if(frame)return;frame=requestAnimationFrame(()=>{frame=0;const matrix=field.getScreenCTM();if(!matrix)return;const p=new DOMPoint(x,y).matrixTransform(matrix.inverse());circle.setAttribute('cx',String(p.x));circle.setAttribute('cy',String(p.y));circle.setAttribute('r',String(200/Math.hypot(matrix.a,matrix.b)));field.dataset.pointerActive='';});},{...options,passive:true});
 ['pointerleave','pointercancel'].forEach(type=>hero.addEventListener(type,reset,options));window.addEventListener('resize',reset,options);window.addEventListener('scroll',reset,{...options,passive:true});reduced.addEventListener('change',sync,options);fine.addEventListener('change',reset,options);document.addEventListener('visibilitychange',sync,options);
 const observer=new IntersectionObserver(entries=>{visible=entries.some(e=>e.isIntersecting);sync();});observer.observe(hero);sync();
 window.addEventListener('pagehide',event=>{reset();delete field.dataset.active;observer.disconnect();if(!event.persisted)lifecycle.abort();},options);
 window.addEventListener('pageshow',event=>{if(event.persisted){observer.observe(hero);sync();}},options);
}
