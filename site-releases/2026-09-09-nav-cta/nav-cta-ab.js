/* TOP desktop CTA experiment. 50:50, consent gated, 30-day browser assignment. */
(function(){
'use strict';
if(!['/','/index.html'].includes(location.pathname))return;
const ID='nav_cta_20260909_v1',KEY='ms_'+ID,SESSION=KEY+'_session';
const params=new URLSearchParams(location.search),qa=params.has('ms_qa')||location.hostname!=='mobispace.jp';
let variant='A',eligible=false,button,bound=false,viewTimer,plays=0;
const consent=()=>{try{return localStorage.getItem('ms_cookie_consent')==='granted'}catch(e){return false}};
function assign(){eligible=false;variant='A';if(qa&&['A','B'].includes(params.get('ms_variant'))){variant=params.get('ms_variant');return}if(!consent())return;try{let s=JSON.parse(localStorage.getItem(KEY)||'null');if(!s||s.expires<Date.now()||!['A','B'].includes(s.variant)){const n=new Uint32Array(1);crypto.getRandomValues(n);s={variant:n[0]%2?'A':'B',expires:Date.now()+30*86400000};localStorage.setItem(KEY,JSON.stringify(s))}variant=s.variant;eligible=true}catch(e){}}
function visible(){if(!button||document.hidden)return false;const r=button.getBoundingClientRect(),s=getComputedStyle(button);return s.visibility!=='hidden'&&r.width>0&&r.height>0&&r.top>=0&&r.bottom<=innerHeight&&r.left>=0&&r.right<=innerWidth}
function session(){try{let s=JSON.parse(sessionStorage.getItem(SESSION)||'null');if(!s||s.variant!==variant||Date.now()-s.at>=1800000)s={variant,view:false,click:false,at:Date.now()};return s}catch(e){return null}}
function send(name){if(qa||!eligible||!consent()||typeof window.msTrack!=='function')return false;window.msTrack(name,{experiment_id:ID,variant_id:variant,cta_location:'header_desktop',cta_name:'nav_consult',section_id:'header',content_version:'20260909-nav-cta-v1',cta_text:'相談する',page_path:location.pathname});return true}
function record(kind){if(!visible())return;let s=session();if(!s)return;try{sessionStorage.setItem(SESSION,JSON.stringify(s))}catch(e){return}if(kind==='click'&&!s.view){if(send('nav_cta_view'))s.view=true}if(!s[kind]&&send(kind==='view'?'nav_cta_view':'nav_cta_click'))s[kind]=true;s.at=Date.now();try{sessionStorage.setItem(SESSION,JSON.stringify(s))}catch(e){}}
function scheduleView(){clearTimeout(viewTimer);if(visible())viewTimer=setTimeout(()=>record('view'),1000)}
function pulse(){if(plays>=3)return;if(visible()&&!matchMedia('(prefers-reduced-motion: reduce)').matches){button.classList.add('cta-idle');setTimeout(()=>button.classList.remove('cta-idle'),550);plays++}if(plays<3)setTimeout(pulse,6000)}
function init(){button=document.querySelector('.h-nav.only-pc .h-nav_contact');if(!button)return;assign();button.classList.add('ms-nav-cta');button.dataset.variant=variant;button.setAttribute('aria-label','開発について相談する');button.innerHTML='相談する <span class="cta-arrow" aria-hidden="true">↗</span>';if(bound){scheduleView();return}bound=true;button.addEventListener('click',()=>record('click'));new IntersectionObserver(scheduleView,{threshold:1}).observe(button);setTimeout(pulse,1200);scheduleView()}
const mo=new MutationObserver(()=>{if(document.querySelector('.h-nav.only-pc .h-nav_contact')){mo.disconnect();init()}});mo.observe(document.documentElement,{childList:true,subtree:true});
document.addEventListener('visibilitychange',scheduleView);window.addEventListener('resize',scheduleView);document.addEventListener('click',e=>{if(e.target.closest('.ms-consent_accept,.ms-consent_decline'))setTimeout(init,0)});window.addEventListener('storage',e=>{if(e.key==='ms_cookie_consent')init()});if(document.querySelector('.h-nav.only-pc .h-nav_contact')){mo.disconnect();init()}
})();
