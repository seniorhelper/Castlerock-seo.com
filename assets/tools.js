(function(){
'use strict';
var d=document;function $(s,c){return (c||d).querySelector(s)}function $$(s,c){return [].slice.call((c||d).querySelectorAll(s))}
function res(k,t){return '<div class="res '+k+'">'+t+'</div>'}
function money(n){return '$'+Math.round(n).toLocaleString()}
function num(n){return Math.round(n).toLocaleString()}
function next(t){return '<div class="nextstep"><b>Next step:</b> '+t+' <a href="/contact/">Get a free Castle Rock strategy call</a> or call <a href="tel:18004818638">1-800-481-8638</a>.</div>'}
function bar(l,v,max,c,t){var w=Math.max(2,Math.min(100,v/max*100));return '<div class="b"><span>'+l+'</span><div class="meter"><i style="width:'+w.toFixed(1)+'%;background:'+c+'"></i></div><span>'+t+'</span></div>'}
/* 1. Castle Rock market size (U.S. Census Bureau QuickFacts) */
var HH=28219,MHI=145197,POP=83815;
function initMS(){var box=$('#ms');if(!box)return;
 function calc(){var pct=+$('#ms-p',box).value,val=+$('#ms-v',box).value,share=+$('#ms-s',box).value,freq=+$('#ms-f',box).value;
  $('#ms-pv',box).textContent=pct+'%';$('#ms-vv',box).textContent=money(val);$('#ms-sv',box).textContent=share+'%';$('#ms-fv',box).textContent=freq+'x';
  var buyers=HH*pct/100,jobs=buyers*freq,mine=jobs*share/100,rev=mine*val;
  var h='<div class="grid g4" style="gap:12px"><div class="card" style="box-shadow:none;padding:16px"><div class="muted" style="font-size:13px">Castle Rock households</div><div class="stat" style="color:var(--sky);font-size:36px">'+num(HH)+'</div></div>'+
  '<div class="card" style="box-shadow:none;padding:16px"><div class="muted" style="font-size:13px">Households buying your service a year</div><div class="stat" style="color:var(--dusk);font-size:36px">'+num(buyers)+'</div></div>'+
  '<div class="card" style="box-shadow:none;padding:16px"><div class="muted" style="font-size:13px">Jobs a year you could win</div><div class="stat" style="color:var(--pine);font-size:36px">'+num(mine)+'</div></div>'+
  '<div class="card" style="box-shadow:none;padding:16px"><div class="muted" style="font-size:13px">Revenue potential a year</div><div class="stat" style="color:var(--sand);font-size:36px">'+money(rev)+'</div></div></div>';
  h+='<div class="bars" style="margin-top:12px">'+bar('Whole market (jobs/yr)',jobs,jobs,'#6d28d9',num(jobs))+bar('Your share',mine,jobs,'#b4410c',num(mine))+'</div>';
  h+=res('info','Households and median household income ('+money(MHI)+') come from U.S. Census Bureau QuickFacts for Castle Rock town (2020-2024 estimates); population estimate '+num(POP)+' (July 2025). Your inputs set the rest, so the result is only as realistic as your guesses. It counts Castle Rock town only, not Castle Pines or the rest of Douglas County.');
  if(share>25)h+=res('warn','A share above 25% is ambitious for most local markets. Plan with a conservative number and treat anything higher as upside.');
  h+=next('Knowing the size of the prize is step one. Winning your share takes Map Pack visibility, pages that answer buyer questions, and a site that turns visits into calls.');
  $('#ms-out',box).innerHTML=h}
 $$('input',box).forEach(function(e){e.addEventListener('input',calc)});calc()}
/* 2. Map Pack scorecard */
var MP=[['Your Google Business Profile is claimed and verified',10,'Claim and verify your profile. Nothing else works until you do.'],['Primary category is the most specific one that fits',10,'Choose the most specific primary category. It is one of the strongest relevance signals.'],['Services and products are listed with descriptions',6,'Add every service with a short description. It helps you match more searches.'],['Hours are accurate, including holidays',5,'Keep hours exact, including holidays. Wrong hours cost trust and calls.'],['You have at least 15 real photos of your work, team or location',6,'Add real photos regularly. Profiles with fresh photos look active and trustworthy.'],['You get new Google reviews every month',12,'Build a simple routine: ask every happy customer for a review, every time.'],['You reply to every review, good and bad',6,'Reply to every review. Future customers read the replies.'],['Your name, address and phone match everywhere online',10,'Make your name, address and phone identical across directories and social profiles.'],['Your website has a page for each core service',9,'Give each core service its own page with a direct answer and a clear call to action.'],['Your site mentions Castle Rock areas you serve naturally',6,'Mention the Castle Rock areas you serve where it is genuinely useful to customers.'],['Your site has LocalBusiness structured data',6,'Add LocalBusiness schema so search engines and AI assistants read your details without guessing.'],['You post updates on your profile at least monthly',4,'Post monthly: offers, recent projects, seasonal tips.'],['Your site loads fast and works well on phones',10,'Speed up the mobile site. Most local searches happen on phones.']];
function initMP(){var box=$('#mp');if(!box)return;var list=$('#mp-q',box);
 list.innerHTML=MP.map(function(q,i){return '<label><input type="checkbox" class="mp-f" data-i="'+i+'"> '+q[0]+'</label>'}).join('');
 function calc(){var max=0,pts=0,miss=[];$$('.mp-f',box).forEach(function(f){var q=MP[+f.getAttribute('data-i')];max+=q[1];if(f.checked)pts+=q[1];else miss.push(q)});
  var sc=Math.round(pts/max*100),col=sc>=80?'#166534':sc>=50?'#b45309':'#b91c1c',lab=sc>=80?'Strong. You are competing for the top three.':sc>=50?'Close. A few fixes could move you up.':'Big gaps. Competitors with complete profiles will outrank you.';
  miss.sort(function(a,b){return b[1]-a[1]});
  var h='<div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap"><div class="stat" style="color:'+col+'">'+sc+'<span style="font-size:20px">/100</span></div><div><b style="font-size:20px">'+lab+'</b><div class="muted" style="font-size:15px">'+(MP.length-miss.length)+' of '+MP.length+' Map Pack signals in place</div></div></div><div class="meter"><i style="width:'+sc+'%;background:'+col+'"></i></div>';
  if(miss.length){h+='<h3 style="margin-top:14px">Your top fixes, in order</h3>';miss.slice(0,4).forEach(function(q,i){h+=res(i===0?'bad':'warn','<b>'+(i+1)+'.</b> '+q[2])})}else h+=res('ok','Every signal on this list is in place. The next edge comes from review velocity, local content and links.');
  h+=res('info','Weights reflect how Google describes local ranking (relevance, distance and prominence) and common local SEO practice. This is a checklist score, not your actual ranking.');
  h+=next('A checklist shows the gaps. Closing them in the right order, and outworking competitors on reviews and content, is where a local SEO plan earns its keep.');
  $('#mp-out',box).innerHTML=h}
 box.addEventListener('change',calc);calc()}
/* 3. Ad budget splitter */
var SPLIT={now:{seo:25,ads:55,lsa:20},quarter:{seo:45,ads:40,lsa:15},long:{seo:70,ads:20,lsa:10}};
function initAB(){var box=$('#ab');if(!box)return;
 function calc(){var b=+$('#ab-b',box).value,u=$('#ab-u',box).value,t=$('#ab-t',box).value,cpc=Math.max(.5,+$('#ab-c',box).value||0),cr=Math.max(.1,+$('#ab-r',box).value||0);
  $('#ab-bv',box).textContent=money(b);
  var s=Object.assign({},SPLIT[u]);if(t!=='home'){s.ads+=s.lsa;s.lsa=0}
  var seo=b*s.seo/100,ads=b*s.ads/100,lsa=b*s.lsa/100,clicks=ads/cpc,leads=clicks*cr/100;
  var h='<div class="bars">'+bar('SEO and Maps',s.seo,100,'#166534',money(seo))+bar('Google Ads (search)',s.ads,100,'#1557b0',money(ads))+(s.lsa?bar('Local Services Ads',s.lsa,100,'#6d28d9',money(lsa)):'')+'</div>';
  h+='<div class="grid g2" style="gap:12px;margin-top:10px"><div class="card" style="box-shadow:none;padding:16px"><div class="muted" style="font-size:13px">Estimated ad clicks a month (your CPC)</div><div class="stat" style="color:var(--sky);font-size:38px">'+num(clicks)+'</div></div><div class="card" style="box-shadow:none;padding:16px"><div class="muted" style="font-size:13px">Estimated ad leads a month (your conversion rate)</div><div class="stat" style="color:var(--sand);font-size:38px">'+(leads<10?leads.toFixed(1):num(leads))+'</div></div></div>';
  if(t!=='home')h+=res('info','Local Services Ads are only available for certain business categories, such as many home services, so this split moves that share into search ads.');
  if(b<800&&u==='now')h+=res('warn','Small budgets spread across too many channels move nothing. At this level, pick one: a tightly targeted Google Ads campaign, or your Google Business Profile and reviews.');
  h+=res('info','Clicks and leads are estimates from the cost per click and conversion rate you entered. Check real cost-per-click figures for your terms in Google Ads Keyword Planner. SEO results build over months and are not included in the lead estimate.');
  h+=next('The split is a starting point. The right mix depends on your category, competitors and how fast you need calls.');
  $('#ab-out',box).innerHTML=h}
 $$('input,select',box).forEach(function(e){e.addEventListener('input',calc);e.addEventListener('change',calc)});calc()}
[initMS,initMP,initAB].forEach(function(f){try{f()}catch(e){if(window.console)console.error(e)}});
})();
