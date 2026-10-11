/* Castle Rock SEO: local SEO self-audit, GBP checklist, NAP checker, AI readiness check. Runs in the browser only. */
(function(){
'use strict';
var d=document;
function $(s,c){return (c||d).querySelector(s)}
function $$(s,c){return [].slice.call((c||d).querySelectorAll(s))}
function esc(t){return String(t).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function store(k,v){try{if(v===undefined){return JSON.parse(localStorage.getItem(k)||'null')}localStorage.setItem(k,JSON.stringify(v))}catch(e){return null}}
function copyText(t,btn){var done=function(){var o=btn.textContent;btn.textContent='Copied';setTimeout(function(){btn.textContent=o},1600)};
 try{if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(done,function(){fallback()});return}}catch(e){}
 fallback();function fallback(){var ta=d.createElement('textarea');ta.value=t;ta.setAttribute('readonly','');ta.style.position='fixed';ta.style.left='-9999px';d.body.appendChild(ta);ta.select();try{d.execCommand('copy');done()}catch(e){btn.textContent='Select and copy the list below'}d.body.removeChild(ta)}}
function meterColor(p){return p>=80?'#166534':p>=50?'#b45309':'#b91c1c'}
function next(t){return '<div class="nextstep"><b>Next step:</b> '+t+' <a href="/contact/">Book a free Castle Rock strategy call</a> or call <a href="tel:18004818638">1-800-481-8638</a>.</div>'}

/* ---------- Generic weighted scorer (self-audit + AI readiness) ---------- */
function scorer(root,items,opts){
 var list=$('.sc-q',root),out=$('.sc-out',root),btn=$('.sc-go',root),groups={};
 items.forEach(function(it,i){if(!groups[it.c]){groups[it.c]=[]}groups[it.c].push(i)});
 var h='';Object.keys(groups).forEach(function(g){h+='<fieldset class="scg"><legend>'+esc(g)+'</legend>';
  groups[g].forEach(function(i){var it=items[i],n=root.id+'-'+i;
   h+='<div class="scr"><p class="scq">'+esc(it.q)+'</p><div class="seg" role="radiogroup" aria-label="'+esc(it.q)+'">'+
   '<label><input type="radio" name="'+n+'" value="1"><span>Yes</span></label>'+
   '<label><input type="radio" name="'+n+'" value=".5"><span>Partly</span></label>'+
   '<label><input type="radio" name="'+n+'" value="0"><span>No / not sure</span></label></div></div>'});
  h+='</fieldset>'});
 list.innerHTML=h;
 function run(){var tot=0,got=0,cats={},answered=0,gaps=[];
  items.forEach(function(it,i){var r=$('input[name="'+root.id+'-'+i+'"]:checked',root),v=r?parseFloat(r.value):0;if(r)answered++;
   tot+=it.w;got+=it.w*v;cats[it.c]=cats[it.c]||{t:0,g:0};cats[it.c].t+=it.w;cats[it.c].g+=it.w*v;
   if(v<1)gaps.push({it:it,loss:it.w*(1-v)})});
  var pct=Math.round(got/tot*100);gaps.sort(function(a,b){return b.loss-a.loss});
  var o='<div class="scbig"><div><div class="muted" style="font-size:14px;font-weight:700">'+esc(opts.label)+'</div><div class="stat" style="color:'+meterColor(pct)+'">'+pct+'<span style="font-size:.45em">/100</span></div></div><p style="margin:0">'+esc(pct>=80?opts.hi:pct>=50?opts.mid:opts.lo)+'</p></div>';
  o+='<div class="bars">';Object.keys(cats).forEach(function(c){var p=Math.round(cats[c].g/cats[c].t*100);o+='<div class="b"><span>'+esc(c)+'</span><div class="meter"><i style="width:'+Math.max(2,p)+'%;background:'+meterColor(p)+'"></i></div><span>'+p+'%</span></div>'});o+='</div>';
  if(answered<items.length)o+='<div class="res info">You left '+(items.length-answered)+' question'+(items.length-answered===1?'':'s')+' blank. Blank answers count as "No / not sure", so your real score may be higher.</div>';
  if(gaps.length){o+='<h3 style="margin-top:18px">Your top fixes, biggest impact first</h3><ol class="fixes">';
   gaps.slice(0,opts.top||5).forEach(function(g){o+='<li><b>'+esc(g.it.fix)+'</b><span class="when">'+esc(g.it.t)+'</span></li>'});o+='</ol>'}
  else o+='<div class="res ok">Every box is a yes. The remaining work is steady: fresh reviews, new photos, useful posts and content that answers new questions.</div>';
  o+=next(opts.next);out.innerHTML=o;out.scrollIntoView({behavior:'smooth',block:'nearest'})}
 btn.addEventListener('click',run);
 var rs=$('.sc-reset',root);if(rs)rs.addEventListener('click',function(){$$('input[type=radio]',root).forEach(function(x){x.checked=false});out.innerHTML=''});
}

var AUDIT=[
 {c:'Google Business Profile',w:10,q:'Your Google Business Profile is claimed and verified.',fix:'Claim and verify your Google Business Profile. Nothing else on this list matters as much.',t:'Usually days to a few weeks for verification'},
 {c:'Google Business Profile',w:8,q:'Your primary category is the most specific one that describes your main service (for example "Kitchen remodeler", not just "Contractor").',fix:'Change your primary category to the most specific match for your main service, then add a few accurate secondary categories.',t:'Often one of the fastest ranking changes'},
 {c:'Google Business Profile',w:6,q:'Hours, phone, website link, services and the business description are all filled in and current.',fix:'Fill in every profile field: hours (including holiday hours), services, description, website and appointment links.',t:'Edits typically show within days'},
 {c:'Google Business Profile',w:5,q:'If customers do not visit you, your address is hidden and your service area lists only the towns you really serve.',fix:'Set up your service area properly: hide the address if customers do not come to you, and list only the places you actually serve, such as Castle Rock, Castle Pines and Larkspur.',t:'Days to update; ranking effect varies'},
 {c:'Google Business Profile',w:4,q:'You have added real photos in the last 90 days (work, team, storefront or vehicles, not stock images).',fix:'Add real photos of your work, team and location every month.',t:'Ongoing habit'},
 {c:'Reviews',w:9,q:'You get new Google reviews every month, not just in bursts.',fix:'Set up a simple, rule-friendly review request after every finished job (text or email with your review link).',t:'Builds over 3 to 6 months'},
 {c:'Reviews',w:5,q:'You reply to reviews, good and bad, within a few days.',fix:'Reply to every review within a few days. Thank people by name and address complaints calmly.',t:'Start this week'},
 {c:'Reviews',w:3,q:'Your rating and review count are close to or ahead of the top three businesses in your category in Castle Rock.',fix:'Compare your review count and rating with the three businesses that show in the Map Pack for your main search, then set a monthly target.',t:'A 3 to 12 month project, depending on the gap'},
 {c:'Listings and citations',w:7,q:'Your business name, address and phone number are identical on Google, Apple, Bing, Yelp, Facebook and BBB.',fix:'Make your name, address and phone match exactly on every major listing. Use the NAP checker on our citation page.',t:'Weeks for platforms to update'},
 {c:'Listings and citations',w:4,q:'You are listed in Colorado and Castle Rock sources that make sense for you (Castle Rock Chamber, industry associations, local directories).',fix:'Add listings on relevant local and industry sites, such as the Castle Rock Chamber directory if you are a member and your trade association.',t:'1 to 3 months to pick up'},
 {c:'Listings and citations',w:3,q:'Old addresses, old phone numbers and duplicate listings have been cleaned up.',fix:'Find and fix old addresses, tracking numbers and duplicate listings, especially if you have moved.',t:'Weeks to months'},
 {c:'Website',w:7,q:'You have a dedicated page for each main service, written for Castle Rock customers.',fix:'Build one useful page per main service, with real Castle Rock details, prices or price ranges where possible, and an FAQ.',t:'2 to 6 months to rank, depending on competition'},
 {c:'Website',w:6,q:'Your site loads fast and is easy to use on a phone, with a tap-to-call button.',fix:'Speed up the mobile site and add a clear tap-to-call button on every page.',t:'Conversion gain is immediate'},
 {c:'Website',w:4,q:'Your homepage title and main heading say what you do and "Castle Rock".',fix:'Rewrite your homepage title and main heading to say exactly what you do and where.',t:'Weeks after Google recrawls'},
 {c:'Website',w:3,q:'Your site has LocalBusiness structured data that matches your profile.',fix:'Add LocalBusiness structured data with the same name, address, phone and hours as your profile.',t:'Weeks after recrawl'},
 {c:'AI answer readiness',w:4,q:'Each key page opens with a plain one or two sentence answer (what it is, who it is for, rough cost or time).',fix:'Open every key page with a short, plain answer. AI tools and Google both lift these.',t:'Weeks to months'},
 {c:'AI answer readiness',w:3,q:'Your robots.txt does not block search crawlers such as Googlebot, Bingbot or OAI-SearchBot.',fix:'Check robots.txt so search and AI search crawlers are not blocked by accident.',t:'Fix in minutes'},
 {c:'AI answer readiness',w:3,q:'Your business is also listed on Bing Places and Apple Business Connect.',fix:'Claim Bing Places and Apple Business Connect. Some assistants and map apps rely on those, not Google.',t:'Days to weeks'},
 {c:'Tracking',w:4,q:'You can see how many calls and form leads came from Google each month.',fix:'Turn on call and form tracking (Google Business Profile insights, Search Console and analytics) so you know what is working.',t:'Set up in a day'}
];
var AIR=[
 {c:'Can AI find you?',w:8,q:'Search crawlers (Googlebot, Bingbot, OAI-SearchBot, PerplexityBot) are allowed in robots.txt.',fix:'Unblock search crawlers in robots.txt. Blocking them can keep you out of AI answers that cite live web pages.',t:'Minutes to fix'},
 {c:'Can AI find you?',w:6,q:'Your key pages are indexed in Google and Bing (Search Console and Bing Webmaster Tools show them).',fix:'Verify your site in Google Search Console and Bing Webmaster Tools and make sure key pages are indexed.',t:'Days to weeks'},
 {c:'Can AI find you?',w:5,q:'You have claimed Google, Bing Places and Apple Business Connect listings.',fix:'Claim Google, Bing Places and Apple Business Connect so map-based answers have your details.',t:'Days to weeks'},
 {c:'Can AI understand you?',w:7,q:'Each service page starts with a direct, plain answer to the main question.',fix:'Add a one or two sentence answer at the top of each service page.',t:'Weeks'},
 {c:'Can AI understand you?',w:6,q:'Pages name the places you serve in Castle Rock in natural sentences, not keyword lists.',fix:'Describe the parts of Castle Rock you really serve in normal sentences, not a list of keywords.',t:'Weeks'},
 {c:'Can AI understand you?',w:5,q:'You publish price ranges, service lists or clear "what happens next" steps.',fix:'Publish price ranges or a clear process. Assistants comparing options lean on concrete details.',t:'Weeks'},
 {c:'Can AI understand you?',w:4,q:'LocalBusiness, Service and FAQ structured data match what is visible on the page.',fix:'Add structured data that matches your visible content exactly.',t:'Weeks after recrawl'},
 {c:'Can AI trust you?',w:7,q:'Your name, address and phone match everywhere online.',fix:'Make your name, address and phone consistent across every listing.',t:'Weeks'},
 {c:'Can AI trust you?',w:6,q:'You have recent, genuine reviews on Google and at least one other platform.',fix:'Earn steady genuine reviews on Google plus one other platform customers use.',t:'Months'},
 {c:'Can AI trust you?',w:4,q:'Local sites mention you (Chamber, local news, partners, sponsorships).',fix:'Earn real local mentions: Chamber membership, community sponsorships, partner businesses.',t:'Months'}
];

/* ---------- GBP completeness checklist ---------- */
var GBP=[
 ['Basics','Profile is claimed and verified under an owner account you control (not only an agency login).'],
 ['Basics','Business name matches your real-world signage exactly, with no added keywords or city names.'],
 ['Basics','Phone is a local or main line that rings a person during business hours.'],
 ['Basics','Website link goes to the most relevant page (homepage or the right location page).'],
 ['Basics','Regular hours are set, and holiday hours are added before each holiday.'],
 ['Categories and services','Primary category is the most specific match for your main service.'],
 ['Categories and services','Secondary categories are accurate (only services you really offer).'],
 ['Categories and services','Services list is filled in, with short plain descriptions.'],
 ['Categories and services','Products or menu items are added where your category supports them.'],
 ['Categories and services','Attributes that apply are set (for example accessibility, online appointments, owner details you choose to share).'],
 ['Location and service area','Storefront: the address and map pin are exact (check the pin on the map, not just the text).'],
 ['Location and service area','Service-area business: address is hidden and service areas list only towns you really serve.'],
 ['Location and service area','Service areas are realistic for your drive time (Castle Rock, Castle Pines, Larkspur, Franktown, Sedalia or Parker, as true for you).'],
 ['Description and content','Description says what you do, who you serve and where, in plain words, without links or keyword stuffing.'],
 ['Description and content','Opening date is set (helps customers and is shown on some profiles).'],
 ['Description and content','You have posted an update, offer or event in the last 30 days.'],
 ['Description and content','Common questions customers ask are answered on your website and reflected in your services and description.'],
 ['Photos and video','Logo and cover photo are uploaded and look sharp on a phone.'],
 ['Photos and video','At least 10 real photos: exterior, interior or vehicle, team and finished work.'],
 ['Photos and video','New photos were added in the last 90 days.'],
 ['Reviews','You have a short review link and ask every happy customer, in person, text or email.'],
 ['Reviews','You do not offer discounts or gifts for reviews and do not filter who gets asked.'],
 ['Reviews','Every review in the last 90 days has a reply.'],
 ['Messaging and leads','Calls from the profile are tracked or at least counted (profile performance report).'],
 ['Messaging and leads','Booking, quote or appointment link is added if your category supports it.'],
 ['Messaging and leads','Someone checks the profile weekly for edits suggested by the public and new questions.']
];
function initGBP(){var root=$('#gbp');if(!root)return;var key='crseo-gbp-v1',saved=store(key)||{},list=$('.gbp-list',root),h='',last='';
 GBP.forEach(function(r,i){if(r[0]!==last){if(last)h+='</fieldset>';h+='<fieldset class="scg"><legend>'+esc(r[0])+'</legend><div class="qz">';last=r[0]}
  h+='<label><input type="checkbox" data-i="'+i+'"'+(saved[i]?' checked':'')+'><span>'+esc(r[1])+'</span></label>';
  if(i===GBP.length-1||GBP[i+1][0]!==r[0])h+='</div>'});
 h+='</fieldset>';list.innerHTML=h;
 function upd(){var boxes=$$('input[type=checkbox]',list),n=0,s={},todo=[],sec={};
  boxes.forEach(function(b){var i=+b.getAttribute('data-i'),g=GBP[i][0];sec[g]=sec[g]||{t:0,n:0};sec[g].t++;if(b.checked){n++;s[i]=1;sec[g].n++}else todo.push(GBP[i])});
  store(key,s);var p=Math.round(n/boxes.length*100);
  $('.gbp-pct',root).textContent=p+'%';$('.gbp-n',root).textContent=n+' of '+boxes.length+' done';
  var m=$('.gbp-meter i',root);m.style.width=Math.max(2,p)+'%';m.style.background=meterColor(p);
  var msg=p===100?'Complete. Now keep it alive: new photos, posts and review replies every month.':p>=75?'Strong. Finish the last few items, then focus on reviews and fresh photos.':p>=40?'Halfway there. The unticked basics and categories are the quickest wins.':'Plenty of easy wins left. Start with the Basics and Categories sections.';
  $('.gbp-msg',root).textContent=msg;
  var sh='';Object.keys(sec).forEach(function(g){sh+='<span class="pill'+(sec[g].n===sec[g].t?' p':'')+'">'+esc(g)+': '+sec[g].n+'/'+sec[g].t+'</span>'});$('.gbp-sec',root).innerHTML=sh;
  root._todo=todo}
 list.addEventListener('change',upd);
 $('.gbp-copy',root).addEventListener('click',function(){var t='Google Business Profile to-do list (castlerock-seo.com/google-business-profile-castle-rock/)\n\n'+(root._todo.length?root._todo.map(function(r){return '[ ] '+r[0]+': '+r[1]}).join('\n'):'Everything is done.');copyText(t,this)});
 $('.gbp-reset',root).addEventListener('click',function(){$$('input[type=checkbox]',list).forEach(function(b){b.checked=false});upd()});
 upd()}

/* ---------- NAP consistency checker ---------- */
var ABBR={street:'st',st:'st',avenue:'ave',ave:'ave',av:'ave',boulevard:'blvd',blvd:'blvd',drive:'dr',dr:'dr',road:'rd',rd:'rd',lane:'ln',ln:'ln',court:'ct',ct:'ct',circle:'cir',cir:'cir',parkway:'pkwy',pkwy:'pkwy',pky:'pkwy',place:'pl',pl:'pl',highway:'hwy',hwy:'hwy',way:'way',trail:'trl',trl:'trl',terrace:'ter',ter:'ter',square:'sq',suite:'ste',ste:'ste',unit:'ste','#':'ste',apartment:'ste',apt:'ste',north:'n',n:'n',south:'s',s:'s',east:'e',e:'e',west:'w',w:'w',colorado:'co',co:'co',first:'1st',second:'2nd',third:'3rd',fourth:'4th',fifth:'5th',sixth:'6th'};
function normAddr(a){return String(a).toLowerCase().replace(/#\s*/g,' ste ').replace(/[.,]/g,' ').split(/\s+/).filter(Boolean).map(function(w){return ABBR.hasOwnProperty(w)?ABBR[w]:w}).join(' ').replace(/\busa?\b|\bunited states\b/g,'').replace(/\s+/g,' ').trim()}
function normName(n){return String(n).toLowerCase().replace(/&/g,' and ').replace(/[^a-z0-9 ]/g,' ').replace(/\b(llc|inc|co|corp|ltd|the)\b/g,' ').replace(/\s+/g,' ').trim()}
function normPhone(p){var x=String(p).replace(/\D/g,'');if(x.length===11&&x[0]==='1')x=x.slice(1);return x}
function initNAP(){var root=$('#nap');if(!root)return;var rows=$('.nap-rows',root),PL=['Google Business Profile','Apple Business Connect','Bing Places','Yelp','Facebook','BBB','Nextdoor','Castle Rock Chamber directory','Industry directory','Other'];
 function addRow(pl){var i=rows.children.length;if(i>=8)return;var div=d.createElement('div');div.className='nap-row';
  div.innerHTML='<div class="frow" style="margin:0"><div><label for="nap-p'+i+'">Where</label><select id="nap-p'+i+'">'+PL.map(function(p){return '<option'+(p===pl?' selected':'')+'>'+esc(p)+'</option>'}).join('')+'</select></div>'+
  '<div><label for="nap-n'+i+'">Name shown</label><input type="text" id="nap-n'+i+'" autocomplete="off"></div>'+
  '<div><label for="nap-a'+i+'">Address shown</label><input type="text" id="nap-a'+i+'" autocomplete="off" placeholder="Leave blank if hidden"></div>'+
  '<div><label for="nap-t'+i+'">Phone shown</label><input type="text" id="nap-t'+i+'" inputmode="tel" autocomplete="off"></div></div>';rows.appendChild(div)}
 ['Google Business Profile','Yelp','Facebook'].forEach(addRow);
 $('.nap-add',root).addEventListener('click',function(){addRow('Other');if(rows.children.length>=8)this.disabled=true});
 $('.nap-go',root).addEventListener('click',function(){var N=$('#nap-name').value,A=$('#nap-addr').value,T=$('#nap-tel').value,out=$('.nap-out',root);
  if(!N.trim()||!normPhone(T)){out.innerHTML='<div class="res warn">Add at least your official business name and phone number at the top first.</div>';return}
  var nN=normName(N),nA=normAddr(A),nT=normPhone(T),o='',issues=0,checked=0;
  $$('.nap-row',rows).forEach(function(r,i){var pl=$('select',r).value,n=$('#nap-n'+i).value,a=$('#nap-a'+i).value,t=$('#nap-t'+i).value;if(!n.trim()&&!a.trim()&&!t.trim())return;checked++;var probs=[],notes=[];
   if(n.trim()){if(normName(n)!==nN){probs.push('Name differs: "'+esc(n.trim())+'"'+(normName(n).indexOf(nN)>-1&&normName(n)!==nN?' (looks like extra words were added, which Google\'s guidelines do not allow on your profile)':''))}else if(n.trim()!==N.trim())notes.push('Name matches, with small punctuation or "LLC" differences. Fine, but identical is best.')}
   if(a.trim()){if(!nA)notes.push('This listing shows an address but your official address is blank. Service-area businesses that hide their address on Google should be consistent elsewhere too.');else if(normAddr(a)!==nA){var sa=normAddr(a).replace(/ ste \S+/,''),sb=nA.replace(/ ste \S+/,'');probs.push(sa===sb?'Suite or unit number differs: "'+esc(a.trim())+'"':'Address differs: "'+esc(a.trim())+'"')}else if(a.trim().toLowerCase()!==A.trim().toLowerCase())notes.push('Address matches after normalizing (for example "Street" vs "St"). That is fine.')}
   if(t.trim()){if(normPhone(t)!==nT)probs.push('Phone differs: '+esc(t.trim())+(normPhone(t).length!==10?' (not a 10-digit number)':''))}
   else probs.push('No phone entered for this listing.');
   if(probs.length)issues++;
   o+='<div class="res '+(probs.length?'bad':'ok')+'"><b>'+esc(pl)+':</b> '+(probs.length?probs.join('; ')+'.':'Matches.')+(notes.length?' <span style="opacity:.85">'+notes.join(' ')+'</span>':'')+'</div>'});
  if(!checked){out.innerHTML='<div class="res warn">Fill in at least one listing row to compare.</div>';return}
  var head=issues?'<div class="res warn"><b>'+issues+' of '+checked+' listing'+(checked===1?'':'s')+' need'+(issues===1?'s':'')+' fixing.</b> Update the listing on that platform itself, starting with Google, Apple, Bing and Yelp.</div>':'<div class="res ok"><b>All '+checked+' listings match.</b> Recheck after any move, phone change or rebrand.</div>';
  out.innerHTML=head+o+next('Consistent listings support Map Pack trust signals.')})}

function initScorers(){var a=$('#sa');if(a)scorer(a,AUDIT,{label:'Local SEO self-audit score',hi:'Strong foundations. Gains now come from steady reviews, content and local links.',mid:'Solid start with clear gaps. The fixes below are where the next calls come from.',lo:'Big room to grow. The good news: the first fixes are mostly free and fast.',top:6,next:'Want a second pair of eyes on these fixes?'});
 var b=$('#air');if(b)scorer(b,AIR,{label:'AI answer readiness',hi:'AI tools have what they need to find and describe you. Keep details fresh.',mid:'Partly ready. Close the gaps below so assistants can describe you with confidence.',lo:'AI assistants will struggle to recommend you yet. Start with the first fixes below.',top:5,next:'We can check how ChatGPT, Gemini and Google describe your business today.'})}

function init(){initScorers();initGBP();initNAP()}
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',init);else init();
})();
