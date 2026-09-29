(function(){
'use strict';
var d=document,b=d.body;
function $(s,c){return (c||d).querySelector(s)}function $$(s,c){return [].slice.call((c||d).querySelectorAll(s))}
var bg=$('.burger');
if(bg){bg.addEventListener('click',function(){var o=b.classList.toggle('menu-open');bg.setAttribute('aria-expanded',o?'true':'false')})}
$$('.nav>li>button').forEach(function(btn){btn.addEventListener('click',function(e){e.stopPropagation();var li=btn.parentNode,o=!li.classList.contains('open');$$('.nav>li.open').forEach(function(x){x.classList.remove('open');x.firstElementChild.setAttribute('aria-expanded','false')});if(o){li.classList.add('open');btn.setAttribute('aria-expanded','true')}})});
d.addEventListener('click',function(e){if(!e.target.closest('.nav')){$$('.nav>li.open').forEach(function(x){x.classList.remove('open')})}});
d.addEventListener('keydown',function(e){if(e.key==='Escape'){$$('.nav>li.open').forEach(function(x){x.classList.remove('open')});b.classList.remove('menu-open')}});
$$('.nav a').forEach(function(a){a.addEventListener('click',function(){b.classList.remove('menu-open')})});
$$('.draw').forEach(function(s){$$('path,line,polyline,circle,rect',s).forEach(function(p){try{var l=Math.ceil(p.getTotalLength?p.getTotalLength():600);p.style.setProperty('--len',l)}catch(e){}})});
var els=$$('.rv,.draw,[data-count]');
function count(el){var t=parseFloat(el.getAttribute('data-count'))||0,dec=(el.getAttribute('data-count').split('.')[1]||'').length,s=performance.now(),pre=el.getAttribute('data-pre')||'',suf=el.getAttribute('data-suf')||'';(function f(n){var p=Math.min(1,(n-s)/1400),v=t*(1-Math.pow(1-p,3));el.textContent=pre+v.toFixed(dec)+suf;if(p<1)requestAnimationFrame(f)})(s)}
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');if(x.target.hasAttribute('data-count'))count(x.target);io.unobserve(x.target)}})},{rootMargin:'0px 0px -8% 0px'});els.forEach(function(e){io.observe(e)})}else{els.forEach(function(e){e.classList.add('in')})}
$$('[data-em]').forEach(function(a){var m=a.getAttribute('data-em')+'@'+(a.getAttribute('data-dom')||'eyetoad.com');function set(){a.href='mai'+'lto:'+m}a.addEventListener('click',set);a.addEventListener('mouseenter',set);a.addEventListener('focus',set);if(a.hasAttribute('data-show'))a.textContent=m});
$$('[data-year]').forEach(function(e){e.textContent=new Date().getFullYear()});
$$('form[data-lead]').forEach(function(f){var t0=Date.now();f.addEventListener('submit',function(e){e.preventDefault();var msg=$('.fmsg',f);
 if($('.hp input',f).value){msg.textContent='Thanks!';return}
 if(Date.now()-t0<3500){msg.textContent='One moment, then try again.';return}
 var fd=new FormData(f),ok=true;fd.forEach(function(v){if(String(v).length>3000)ok=false});
 var ph=String(fd.get('phone')||'').replace(/\D/g,''),nm=String(fd.get('name')||'').trim();
 if(!nm||ph.length<10){msg.textContent='Add your name and a 10-digit phone number.';return}
 if(!ok){msg.textContent='That message is a little long. Trim it and try again.';return}
 fd.delete('_hp');fd.append('_subject','CastleRock-SEO lead: '+(fd.get('topic')||'website'));fd.append('_template','table');fd.append('page',location.pathname);
 var to='in'+'fo'+'@'+'eyetoad'+'.com';msg.textContent='Sending...';
 fetch('https://formsubmit.co/ajax/'+to,{method:'POST',headers:{'Accept':'application/json'},body:fd}).then(function(r){return r.json()}).then(function(){f.reset();msg.textContent='Got it. A strategist will reach out shortly. Faster? Call 1-800-481-8638.'}).catch(function(){msg.textContent='Could not send. Please call 1-800-481-8638.'})})});
function load(src){var s=d.createElement('script');s.src=src;s.defer=true;d.body.appendChild(s)}
if(b.hasAttribute('data-tools'))load('/assets/tools.js?v=1');
var idle=window.requestIdleCallback||function(f){setTimeout(f,1200)};
idle(function(){load('/assets/rocky.js?v=1')},{timeout:3000});
})();
