(function(){
'use strict';
if(window.__rocky)return;window.__rocky=1;
var d=document,ss=window.sessionStorage,PH='1-800-481-8638',TEL='tel:18004818638';
function get(k){try{return ss.getItem('rocky:'+k)}catch(e){return null}}function set(k,v){try{ss.setItem('rocky:'+k,v)}catch(e){}}
var css='.rt-peek{position:fixed;right:0;top:58vh;width:132px;height:150px;z-index:80;cursor:pointer;transform:translateX(62px);transition:transform .5s cubic-bezier(.2,1.4,.4,1);border:0;background:none;padding:0}'+
'.rt-peek:hover,.rt-peek:focus-visible{transform:translateX(8px)}.rt-peek .rw{width:132px;height:150px;transform:rotate(-9deg);animation:rtf 4s ease-in-out infinite}'+
'.rt-peek .hand{position:absolute;left:-2px;top:82px;width:34px;height:38px;transition:opacity .3s}.rt-peek:hover .hand{opacity:0}'+
'@keyframes rtf{0%,100%{translate:0 0}50%{translate:0 -7px}}'+
'.rt-bub{position:fixed;right:88px;top:calc(58vh + 16px);z-index:81;background:#fff;color:#0b1f3a;font:600 15px Outfit,system-ui,sans-serif;padding:10px 14px;border-radius:14px 14px 4px 14px;box-shadow:0 12px 30px rgba(11,31,58,.2);opacity:0;transform:translateY(6px) scale(.96);transition:.35s;pointer-events:none;max-width:230px}'+
'.rt-bub.on{opacity:1;transform:none}'+
'.rt-tilt{perspective:700px;width:100%;height:100%}.rt-tilt svg{width:100%;height:100%;transition:transform .15s ease-out;overflow:visible}'+
'.rt-eye{transform-box:fill-box;transform-origin:center;animation:rtb 5s infinite}@keyframes rtb{0%,94%,100%{transform:scaleY(1)}96%{transform:scaleY(.08)}}'+
'.rt-bulb{animation:rtp 2.4s ease-in-out infinite}@keyframes rtp{0%,100%{opacity:.7}50%{opacity:1}}.rt-cur{animation:rtc 1s steps(1) infinite}@keyframes rtc{50%{opacity:0}}'+
'.rt-talk .rt-mb{opacity:1}.rt-talk .rt-pr{opacity:0}.rt-mb{opacity:0}.rt-mb rect{transform-box:fill-box;transform-origin:center;animation:rte .5s ease-in-out infinite alternate}.rt-mb rect:nth-child(2){animation-delay:.12s}.rt-mb rect:nth-child(3){animation-delay:.24s}@keyframes rte{from{transform:scaleY(.3)}to{transform:scaleY(1)}}'+
'.rt-chat{position:fixed;right:16px;bottom:calc(16px + env(safe-area-inset-bottom,0px));width:min(390px,calc(100vw - 20px));height:min(600px,calc(100dvh - 110px));z-index:90;display:flex;flex-direction:column;border-radius:24px;background:rgba(255,255,255,.97);backdrop-filter:blur(18px) saturate(1.4);-webkit-backdrop-filter:blur(18px) saturate(1.4);border:1px solid #fff;box-shadow:0 30px 80px rgba(11,31,58,.3),0 0 0 1px rgba(11,31,58,.07);transform-origin:bottom right;transform:scale(.6) translateY(30px);opacity:0;visibility:hidden;transition:.4s cubic-bezier(.2,1.2,.4,1);font-family:Outfit,system-ui,sans-serif;color:#0b1f3a}'+
'.rt-chat.open{transform:none;opacity:1;visibility:visible}'+
'.rt-hd{display:flex;align-items:flex-end;gap:12px;padding:12px 14px 10px;border-bottom:1px solid #e6ecf3}.rt-hd .av{width:78px;height:88px;margin:-40px 0 -6px -4px;flex:none}'+
'.rt-hd b{font-size:18px}.rt-hd small{display:block;color:#4a5b73;font-size:13px}.rt-dot{display:inline-block;width:8px;height:8px;border-radius:50%;background:#22c55e;margin-right:6px}'+
'.rt-x{margin-left:auto;align-self:center;width:38px;height:38px;border-radius:50%;border:1px solid #dfe6ef;background:#fff;color:#0b1f3a;font-size:22px;line-height:1;cursor:pointer}'+
'.rt-log{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px}'+
'.rt-m{max-width:88%;padding:10px 13px;border-radius:18px;font-size:15px;line-height:1.5;animation:rti .3s ease-out}@keyframes rti{from{opacity:0;transform:translateY(6px)}}'+
'.rt-b{background:#fff;color:#0b1f3a;border:1px solid #e3eaf2;border-bottom-left-radius:6px}.rt-u{align-self:flex-end;background:#1557b0;color:#fff;border-bottom-right-radius:6px}.rt-m a{color:#1557b0;font-weight:700}'+
'.rt-ty{display:flex;gap:4px;padding:13px}.rt-ty i{width:7px;height:7px;border-radius:50%;background:#94a3b8;animation:rtt 1s infinite}.rt-ty i:nth-child(2){animation-delay:.15s}.rt-ty i:nth-child(3){animation-delay:.3s}@keyframes rtt{50%{transform:translateY(-5px);background:#1557b0}}'+
'.rt-qr{display:flex;flex-wrap:wrap;gap:8px;padding:0 14px 10px}.rt-qr button{font:inherit;font-size:14px;padding:8px 12px;border-radius:999px;border:1px solid #bcd4f5;background:#fff;color:#0f3f82;cursor:pointer}.rt-qr button:hover{background:#dbeafe;border-color:#1557b0}.rt-qr .hot{background:#b4410c;border-color:#b4410c;color:#fff}'+
'.rt-ft{display:flex;gap:8px;padding:10px 14px 14px;border-top:1px solid #e6ecf3}.rt-ft input{flex:1;min-width:0;font:inherit;font-size:16px;padding:11px 13px;border-radius:14px;border:1px solid #cfdae8;background:#fff;color:#0b1f3a}.rt-ft button{width:46px;border-radius:14px;border:0;background:#1557b0;color:#fff;font-size:18px;cursor:pointer}'+
'.rt-cb{display:grid;gap:8px;margin-top:6px}.rt-cb input{font:inherit;font-size:15px;padding:9px 11px;border-radius:10px;border:1px solid #cfdae8;color:#0b1f3a;background:#fff}.rt-cb button{font:700 15px Outfit,sans-serif;padding:10px;border-radius:10px;border:0;background:#b4410c;color:#fff;cursor:pointer}'+
'@media (max-width:700px){.rt-peek{top:auto;bottom:calc(84px + env(safe-area-inset-bottom,0px));width:92px;height:105px;transform:translateX(52px)}.rt-peek .rw{width:92px;height:105px}.rt-peek .hand{top:56px;width:24px;height:27px}.rt-bub{top:auto;bottom:calc(150px + env(safe-area-inset-bottom,0px));right:14px}}'+
'@media (prefers-reduced-motion:reduce){.rt-peek .rw,.rt-eye,.rt-bulb,.rt-cur,.rt-mb rect{animation:none}}';
var st=d.createElement('style');st.textContent=css;d.head.appendChild(st);
var defs='<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>'+
'<linearGradient id="rtShell" x1="0" y1="0" x2=".3" y2="1"><stop offset="0" stop-color="#5aa2ff"/><stop offset=".35" stop-color="#1f5fc4"/><stop offset=".75" stop-color="#0c3378"/><stop offset="1" stop-color="#071f4d"/></linearGradient>'+
'<radialGradient id="rtSpec" cx=".32" cy=".18" r=".55"><stop offset="0" stop-color="#fff" stop-opacity=".85"/><stop offset=".35" stop-color="#fff" stop-opacity=".18"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>'+
'<linearGradient id="rtRim" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7cf3ff"/><stop offset=".5" stop-color="#7cf3ff" stop-opacity="0"/></linearGradient>'+
'<linearGradient id="rtScr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d2747"/><stop offset="1" stop-color="#04101f"/></linearGradient>'+
'<linearGradient id="rtGl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".38"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/></linearGradient>'+
'<linearGradient id="rtMet" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6b7a90"/><stop offset=".45" stop-color="#e8eef6"/><stop offset=".6" stop-color="#b9c5d4"/><stop offset="1" stop-color="#55647a"/></linearGradient>'+
'<radialGradient id="rtPod" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#e9f0f9"/><stop offset=".5" stop-color="#9fb0c6"/><stop offset="1" stop-color="#4c5a70"/></radialGradient>'+
'<radialGradient id="rtBulb" cx=".38" cy=".32" r=".7"><stop offset="0" stop-color="#fff6de"/><stop offset=".4" stop-color="#ffb347"/><stop offset="1" stop-color="#d9590b"/></radialGradient>'+
'<radialGradient id="rtSh" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#0b1f3a" stop-opacity=".35"/><stop offset="1" stop-color="#0b1f3a" stop-opacity="0"/></radialGradient>'+
'<radialGradient id="rtEye" cx=".5" cy=".35" r=".7"><stop offset="0" stop-color="#eaffff"/><stop offset=".45" stop-color="#5ff0ff"/><stop offset="1" stop-color="#0ea5c6"/></radialGradient>'+
'<filter id="rtGlow" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="3.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>'+
'<filter id="rtSoft"><feGaussianBlur stdDeviation="2"/></filter><filter id="rtDrop" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="8" stdDeviation="7" flood-color="#0b1f3a" flood-opacity=".28"/></filter>'+
'<linearGradient id="rkBody" x1="0" y1="0" x2=".6" y2="1"><stop offset="0" stop-color="#f3c9a0"/><stop offset=".5" stop-color="#d4884e"/><stop offset="1" stop-color="#9a5426"/></linearGradient><linearGradient id="rkCap" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e5a36d"/><stop offset="1" stop-color="#b8612b"/></linearGradient><radialGradient id="pnFace" cx=".38" cy=".3" r=".8"><stop offset="0" stop-color="#ffc79a"/><stop offset=".45" stop-color="#d9803f"/><stop offset="1" stop-color="#8f3d12"/></radialGradient><linearGradient id="pnEdge" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f3b27c"/><stop offset=".5" stop-color="#9a4414"/><stop offset="1" stop-color="#5c2408"/></linearGradient></defs></svg>';
function head(){return '<svg viewBox="0 0 200 230" class="rt-svg" aria-hidden="true"><ellipse cx="100" cy="220" rx="66" ry="9" fill="url(#rtSh)"/><g filter="url(#rtDrop)">'+
'<path d="M22 208c4-44 14-76 30-96l10-22 14-8h48l14 8 10 22c16 20 26 52 30 96z" fill="url(#rkBody)"/>'+
'<path d="M58 92l8-24h68l8 24z" fill="url(#rkCap)"/><path d="M66 68v-10h12v10M94 68V54h12v14M122 68v-10h12v10" fill="#b8612b"/>'+
'<path d="M22 208c4-44 14-76 30-96" stroke="#fff" stroke-opacity=".4" stroke-width="5" fill="none" stroke-linecap="round"/>'+
'<path d="M40 170c20 4 40 2 60-2M44 190c30 4 70 4 110-2" stroke="#8a4a1e" stroke-opacity=".35" stroke-width="3" fill="none"/>'+
'<g class="rt-pu"><circle cx="78" cy="128" r="17" fill="#fff"/><circle cx="122" cy="128" r="17" fill="#fff"/><circle class="rt-eye" cx="80" cy="130" r="8" fill="#132337"/><circle class="rt-eye" cx="124" cy="130" r="8" fill="#132337"/><circle cx="83" cy="126" r="2.6" fill="#fff"/><circle cx="127" cy="126" r="2.6" fill="#fff"/></g>'+
'<ellipse cx="60" cy="152" rx="9" ry="5" fill="#ff8a7a" opacity=".45" filter="url(#rtSoft)"/><ellipse cx="140" cy="152" rx="9" ry="5" fill="#ff8a7a" opacity=".45" filter="url(#rtSoft)"/>'+
'<g class="rt-pr"><path d="M84 158q16 13 32 0" stroke="#132337" stroke-width="5" fill="none" stroke-linecap="round"/></g>'+
'<g class="rt-mb" fill="#132337"><rect x="88" y="154" width="5" height="12" rx="2.5"/><rect x="97" y="152" width="5" height="16" rx="2.5"/><rect x="106" y="154" width="5" height="12" rx="2.5"/></g>'+
'<g class="rt-bulb"><path d="M100 16l5 11 12 1-9 8 3 12-11-6-11 6 3-12-9-8 12-1z" fill="#f5a524" stroke="#b45309" stroke-width="2"/><path d="M100 48v6" stroke="#b45309" stroke-width="3"/></g></g></svg>'}
var hand='<svg class="hand" viewBox="0 0 40 44" aria-hidden="true"><g filter="url(#rtDrop)"><rect x="4" y="4" width="32" height="12" rx="6" fill="url(#rtMet)"/><rect x="4" y="17" width="32" height="12" rx="6" fill="url(#rtMet)"/><rect x="6" y="30" width="28" height="11" rx="5.5" fill="url(#rtMet)"/></g></svg>';
var wrap=d.createElement('div');wrap.className='rk-root';wrap.innerHTML=defs+
'<button class="rt-peek" type="button" aria-label="Open chat with Rocky, the Castle Rock guide"><div class="rw"><div class="rt-tilt">'+head()+'</div></div>'+hand+'</button>'+
'<div class="rt-bub" role="status"></div>'+
'<section class="rt-chat" aria-label="Chat with Rocky" aria-hidden="true"><div class="rt-hd"><div class="av rt-tilt">'+head()+'</div><div><b>Rocky</b><small><span class="rt-dot"></span>Castle Rock guide, rule-based assistant</small></div><button class="rt-x" type="button" aria-label="Close chat">&times;</button></div>'+
'<div class="rt-log" aria-live="polite"></div><div class="rt-qr"></div><form class="rt-ft"><input aria-label="Message Rocky" placeholder="Ask about Castle Rock marketing" maxlength="400"><button aria-label="Send">&#10148;</button></form></section>';
d.body.appendChild(wrap);
var peek=wrap.querySelector('.rt-peek'),bub=wrap.querySelector('.rt-bub'),chat=wrap.querySelector('.rt-chat'),log=wrap.querySelector('.rt-log'),qr=wrap.querySelector('.rt-qr'),form=wrap.querySelector('.rt-ft'),inp=form.querySelector('input');
var svgs=[].slice.call(wrap.querySelectorAll('.rt-svg'));
var raf=0,mx=0,my=0;
window.addEventListener('pointermove',function(e){mx=e.clientX;my=e.clientY;if(!raf)raf=requestAnimationFrame(track)},{passive:true});
function track(){raf=0;svgs.forEach(function(s){var r=s.getBoundingClientRect();if(!r.width)return;var cx=r.left+r.width/2,cy=r.top+r.height*.42,dx=Math.max(-1,Math.min(1,(mx-cx)/420)),dy=Math.max(-1,Math.min(1,(my-cy)/420));s.style.transform='rotateY('+(dx*18).toFixed(1)+'deg) rotateX('+(-dy*14).toFixed(1)+'deg)';var a=Math.atan2(my-cy,mx-cx),k=Math.min(1,Math.hypot(mx-cx,my-cy)/250);s.querySelector('.rt-pu').setAttribute('transform','translate('+(Math.cos(a)*7*k).toFixed(1)+' '+(Math.sin(a)*5*k).toFixed(1)+')')})}
var page=d.body.getAttribute('data-root')||'default';
var OPEN={
 default:["Hi, I'm Rocky. I know Castle Rock search inside and out. Are you trying to get found on Google, in Maps, or in AI answers?","Hey neighbor. Want to see how your business shows up when Castle Rock customers search?","Welcome! Growing a business in Castle Rock or Castle Pines? I can point you the right way."],
 local:["When someone in The Meadows searches for what you do, are you in the top three on the map?","Map Pack spots in Castle Rock are winnable. Want to know what yours needs?"],
 ads:["Thinking about ads in Castle Rock? Want help deciding between Google Ads, Local Services Ads and SEO?"],
 web:["Is your website helping or hurting you? Want a straight answer?"],
 tools:["Ran a tool? Tell me what it showed and I will tell you the next step."],
 ai:["When someone asks ChatGPT for a business like yours near Castle Rock, who gets named?"],
 learn:["Reading up first? Smart. Ask me anything about marketing in Castle Rock."]
};
var seen=+(get('op')||0);
function opener(){var a=OPEN[page]||OPEN.default;return a[seen%a.length]}
var K=[
 [/(call|phone|talk to|speak|someone|human|person|when can)/,'call'],
 [/(are you (a )?(bot|real|human|ai)|who are you|are you gpt)/,'who'],
 [/(price|pricing|cost|how much|budget|afford|\$)/,'cost'],
 [/(ad|ads|advertis|ppc|google ads|lsa|local services)/,'ads'],
 [/(map|maps|gbp|google business|near me|local|pack)/,'local'],
 [/(website|web site|web design|redesign|new site|99)/,'web'],
 [/(castle pines|parker|lone tree|larkspur|franktown|sedalia|douglas)/,'area'],
 [/(ai|chatgpt|gemini|perplexity|overview|llm|agent)/,'ai'],
 [/(tool|calculator|scorecard|market size|splitter)/,'tools'],
 [/(how long|timeline|results|when will|guarantee)/,'time'],
 [/(where|located|office|castle rock based)/,'where'],
 [/(seo|google|rank|found|search|leads?|traffic)/,'seo'],
 [/(email|mail)/,'email'],
 [/(thank|thx|cool|awesome|great)/,'thanks'],
 [/^(hi|hey|hello|yo|sup)\b/,'hello']
];
var R={
 call:function(){return say('Easy. Tap <a href="'+TEL+'">'+PH+'</a> and a real strategist answers. Or I can have someone call you. Which works better?').then(function(){opts([["Call now",R.dial,1],["Call me back",R.cb]])})},
 dial:function(){location.href=TEL;return say('Dialing '+PH+'. If it did not open, tap here: <a href="'+TEL+'">'+PH+'</a>.').then(menu)},
 cb:function(){return say('Two quick fields and you are done. No spam, no list.').then(cbForm)},
 who:function(){return say("Honest answer: I'm Rocky, a rule-based guide for this site. Not a person, not a large language model. I know Castle Rock marketing, and I know when you should talk to a real strategist.").then(next)},
 cost:function(){return say('It depends on your market and goals, so we quote after a free call. Websites start from $99 a month for qualifying businesses. The <a href="/tools/ad-budget-splitter/">ad budget splitter</a> shows how a budget could divide between SEO and ads.').then(next)},
 ads:function(){return say('Search ads buy calls now; SEO builds calls that keep coming. Most Castle Rock businesses do best with both. See <a href="/castle-rock-advertising/">Castle Rock advertising</a>, or try the <a href="/tools/ad-budget-splitter/">budget splitter</a>.').then(next)},
 local:function(){return say('The Map Pack is where most local calls start. Take the free <a href="/tools/map-pack-scorecard/">Map Pack scorecard</a> and see what your profile is missing. Want someone to look with you?').then(next)},
 web:function(){return say('If the site is slow or unclear, SEO leaks. See <a href="/castle-rock-web-design/">Castle Rock web design</a>. Qualifying businesses can get a custom site from $99 a month, subscribe-to-own.').then(next)},
 area:function(){return say('We cover Castle Rock, Castle Pines and all of Douglas County. See <a href="/castle-pines-seo/">Castle Pines SEO</a> and <a href="/douglas-county-seo/">Douglas County SEO</a>.').then(next)},
 ai:function(){return say('AI assistants recommend businesses whose details are clear and consistent across the web. See <a href="/castle-rock-ai-search/">AI search for Castle Rock</a>. Want to check where you stand?').then(next)},
 tools:function(){return say('Three free tools: the <a href="/tools/castle-rock-market-size/">market size calculator</a> (real Census data), the <a href="/tools/map-pack-scorecard/">Map Pack scorecard</a>, and the <a href="/tools/ad-budget-splitter/">ad budget splitter</a>.').then(next)},
 time:function(){return say("Honest answer: local SEO often shows movement within a few months and compounds over six to twelve. Nobody can guarantee rankings, and anyone who does is guessing.").then(next)},
 where:function(){return say("Our team is headquartered in Denver, about a 30-minute drive up I-25, and we grow businesses in Castle Rock and worldwide. Where is your business?").then(next)},
 seo:function(){return say("Before I suggest anything: is your site bringing in calls today, or is it mostly quiet?").then(function(){opts([["Mostly quiet",function(){return say("Common, and usually fixable. Most quiet local sites have a weak Google Business Profile, pages that do not answer buyer questions, or a site that is hard to use on a phone. Want to know which one is yours?").then(next)}],["Some calls, want more",function(){return say("Good problem. The next calls usually come from the pages and Maps listings already working. A quick look shows where.").then(next)}]])})},
 email:function(){var m='sales'+'@'+'eyetoad.com';return say('Sure: <a href="mai'+'lto:'+m+'">'+m+'</a>. For anything urgent, '+PH+' is faster.').then(next)},
 thanks:function(){return say("Anytime! Want to take the next step while it is fresh?").then(next)},
 hello:function(){return say("Hi! What brings you in today?").then(menu)},
 fallback:function(){return say("Good question. The fastest way to a real answer for your Castle Rock business is a quick call with a strategist.").then(next)}
};
function menu(){opts([["Rank on Google",R.seo],["Win the Map Pack",R.local],["Ads in Castle Rock",R.ads],["A new website",R.web],["Just call me",R.call,1]])}
function next(){opts([["Call "+PH,R.dial,1],["Have someone call me",R.cb],["Keep exploring",function(){return say('Sure. What else is on your mind?').then(menu)}]])}
function talk(on){svgs.forEach(function(s){s.classList.toggle('rt-talk',on)})}
function save(){try{var h=log.innerHTML;if(h.length>40000)h=h.slice(-40000);ss.setItem('root:log',h)}catch(e){}}
function add(cls,html){var m=d.createElement('div');m.className='rt-m '+cls;m.innerHTML=html;log.appendChild(m);log.scrollTop=1e6;save();return m}
function say(t){return new Promise(function(res){var ty=add('rt-b rt-ty','<i></i><i></i><i></i>');talk(true);setTimeout(function(){ty.remove();add('rt-b',t);setTimeout(function(){talk(false)},450);res()},600+Math.min(t.length*10,1300))})}
function me(t){var m=d.createElement('div');m.className='rt-m rt-u';m.textContent=t;log.appendChild(m);log.scrollTop=1e6;save()}
function opts(a){qr.innerHTML='';a.forEach(function(o){var b=d.createElement('button');b.type='button';b.textContent=o[0];if(o[2])b.className='hot';b.onclick=function(){me(o[0]);qr.innerHTML='';o[1]()};qr.appendChild(b)})}
function cbForm(){qr.innerHTML='';var f=d.createElement('form');f.className='rt-m rt-b rt-cb';f.innerHTML='<input name="name" placeholder="Your name" aria-label="Your name" autocomplete="name" required maxlength="80"><input name="phone" type="tel" placeholder="Best phone number" aria-label="Best phone number" autocomplete="tel" required maxlength="25"><input name="_honey" tabindex="-1" autocomplete="off" style="position:absolute;left:-5000px" aria-hidden="true"><button>Call me</button><small class="fm"></small>';log.appendChild(f);log.scrollTop=1e6;var t0=Date.now();
 f.onsubmit=function(e){e.preventDefault();var fd=new FormData(f),fm=f.querySelector('.fm');if(fd.get('_honey'))return;var ph=String(fd.get('phone')).replace(/\D/g,'');if(!String(fd.get('name')).trim()||ph.length<10){fm.textContent='Add your name and a 10-digit number.';return}if(Date.now()-t0<3500){fm.textContent='Give the form a moment, then send again.';return}
 fd.set('_subject','New lead \u2014 castlerock-seo.com');fd.set('_template','table');fd.set('_captcha','false');fd.append('page',location.pathname);fm.textContent='Sending...';
 fetch('https://formsubmit.co/ajax/'+atob('aW5mbw==')+String.fromCharCode(64)+atob('ZXlldG9hZC5jb20='),{method:'POST',headers:{Accept:'application/json'},body:fd}).then(function(r){return r.json().then(function(j){return r.ok&&j&&String(j.success)==='true'},function(){return false})}).then(function(sent){if(!sent){fm.textContent='That did not go through. Please call 1-800-481-8638.';return}f.remove();say("Sent. We'll get back to you shortly. If you would rather not wait: "+PH+".").then(menu)}).catch(function(){fm.textContent='That did not go through. Please call 1-800-481-8638.'})}}
function route(t){t=t.toLowerCase();for(var i=0;i<K.length;i++){if(K[i][0].test(t))return R[K[i][1]]()}return R.fallback()}
form.addEventListener('submit',function(e){e.preventDefault();var v=inp.value.trim();if(!v)return;me(v);inp.value='';qr.innerHTML='';route(v)});
function open(){hideBub();chat.classList.add('open');chat.setAttribute('aria-hidden','false');peek.style.display='none';set('state','open');if(!log.children.length){seen++;set('op',seen);say(opener()).then(menu)}else{menu()}setTimeout(function(){if(matchMedia('(min-width:701px)').matches)inp.focus({preventScroll:true})},350)}
function close(){chat.classList.remove('open');chat.setAttribute('aria-hidden','true');peek.style.display='';set('state','closed');set('bub','1');hideBub();try{peek.focus({preventScroll:true})}catch(e){}}
function hideBub(){bub.classList.remove('on')}
peek.addEventListener('click',open);wrap.querySelector('.rt-x').addEventListener('click',close);
d.addEventListener('keydown',function(e){if(e.key==='Escape'&&chat.classList.contains('open'))close()});
var saved=get('log');if(saved){log.innerHTML=saved;[].slice.call(log.querySelectorAll('.rt-ty,.rt-cb')).forEach(function(x){x.remove()})}
window.Rocky={open:open,close:close};
if(get('state')==='open'){open()}
else if(!get('bub')&&get('state')!=='closed'){var shown=false;var tryBub=function(){if(shown||window.scrollY<200)return;shown=true;window.removeEventListener('scroll',tryBub);setTimeout(function(){if(chat.classList.contains('open'))return;var t={local:"Are you in the Castle Rock Map Pack?",ads:"Ads or SEO? I can help.",tools:"Stuck on a result? Ask me."}[page]||"Psst. Want more Castle Rock customers?";bub.textContent=t;bub.classList.add('on');set('bub','1');setTimeout(hideBub,7000)},1500)};window.addEventListener('scroll',tryBub,{passive:true})}
})();
