// Without JavaScript the form posts to the augur-forms Worker, which redirects to a result page.
// Here it validates first, posts in place and shows the Worker's message: only `ok` means stored.
// A form-urlencoded body keeps the cross-origin POST a simple request, with no CORS preflight.
// Offline (no PUBLIC_FORMS_URL in the build), method="dialog" keeps submits local and the
// script says plainly that nothing was sent.
import {isEmail,newsletter} from '@/lib/forms/newsletter';
const form=document.querySelector<HTMLFormElement>('[data-newsletter]');
if(form){
 form.noValidate=true;
 const input=form.querySelector<HTMLInputElement>('input[type=email]')!;
 const error=form.querySelector<HTMLElement>('#newsletter-email-error')!;
 const status=form.querySelector<HTMLElement>('[data-newsletter-status]')!;
 // A flag, not button.disabled: disabling the focused button would drop keyboard focus.
 let sending=false;
 const showError=(message:string)=>{error.textContent=message;error.hidden=!message;input.setAttribute('aria-invalid',String(Boolean(message)));};
 const validate=()=>{
  const value=input.value.trim();
  const message=!value?'Enter your email address.':input.validity.typeMismatch||!isEmail(value)?newsletter.messages.invalid:'';
  showError(message);
  return !message;
 };
 input.addEventListener('blur',()=>{if(input.value.trim()||input.getAttribute('aria-invalid')==='true')validate();});
 input.addEventListener('input',()=>{status.replaceChildren();if(input.getAttribute('aria-invalid')==='true')validate();});
 form.addEventListener('submit',async event=>{
  event.preventDefault();if(sending)return;status.replaceChildren();
  if(!validate()){input.focus();return;}
  if(form.dataset.newsletter==='offline'){
   const blog=document.createElement('a');blog.href='/blog/';blog.textContent='Follow the blog';
   status.append('Email sign-up isn’t connected yet, so nothing was sent or saved. ',blog,' for updates in the meantime.');
   return;
  }
  sending=true;form.setAttribute('aria-busy','true');
  try{
   const body=new URLSearchParams([...new FormData(form)].map(([key,value])=>[key,String(value)]));
   const response=await fetch(form.action,{method:'POST',body,headers:{accept:'application/json'}});
   const result=await response.json() as {ok:boolean;status:string;message:string;fieldErrors?:Record<string,string>};
   if(result.status==='invalid'){showError(result.fieldErrors?.email??result.message);input.focus();}
   else{status.textContent=result.message;if(result.ok)form.reset();}
  }catch{status.textContent=newsletter.messages.error;}
  finally{sending=false;form.removeAttribute('aria-busy');}
 });
}
