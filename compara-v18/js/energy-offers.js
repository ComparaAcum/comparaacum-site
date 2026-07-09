/* ComparaAcum.ro — oferte reale de energie electrică (clienți casnici)
 * Sursa: comparatorul oficial ANRE (posf.ro) + ofertele publicate de furnizori.
 * Prețuri finale cu TVA, zona de referință: Rețele Electrice Muntenia (București).
 * ACTUALIZARE: editează DATA_DATE și lista OFFERS la fiecare verificare lunară. */
(function(){
  var DATA_DATE = '1 iulie 2026';
  var DATA_DATE_EN = '1 July 2026';

  var OFFERS = [
    {provider:'Hidroelectrica', offer:'Viitor Hidro', price:1.06,
     zones:{muntenia:1.06, oltenia:1.09, transilvania:1.11, moldova:1.14},
     term:'12 luni', termEn:'12 months', green:true, greenLabel:'Energie hidro', greenLabelEn:'Hydro energy',
     features:['Preț fix 12 luni','Producător de stat','Factură online'],
     featuresEn:['Fixed price 12 months','State-owned producer','Online billing'],
     url:'https://client.hidroelectrica.ro/contractare', badge:'Cel mai mic preț', badgeEn:'Lowest price'},
    {provider:'Nova Power & Gas', offer:'Nova Preț fix 3 luni', price:1.17,
     term:'3 luni', termEn:'3 months',
     features:['Preț fix 3 luni','Contract scurt','Contractare online'],
     featuresEn:['Fixed price 3 months','Short contract','Online sign-up'],
     url:'https://vreaulanova.ro/oferte'},
    {provider:'PPC Energie', offer:'PPC Fix Online', price:1.19,
     term:'12 luni', termEn:'12 months',
     features:['Preț fix 12 luni','App MyPPC','Contractare online'],
     featuresEn:['Fixed price 12 months','MyPPC app','Online sign-up'],
     url:'https://www.ppcenergy.ro/energie-electrica/'},
    {provider:'PPC Energie', offer:'PPC Fix Verde', price:1.24,
     term:'12 luni', termEn:'12 months', green:true, greenLabel:'Verde 100%', greenLabelEn:'100% green',
     features:['Preț fix 12 luni','Energie verde certificată'],
     featuresEn:['Fixed price 12 months','Certified green energy'],
     url:'https://www.ppcenergy.ro/energie-electrica/'},
    {provider:'Nova Power & Gas', offer:'Nova Preț fix 12 luni', price:1.27,
     term:'12 luni', termEn:'12 months',
     features:['Preț fix 12 luni','Contractare online'],
     featuresEn:['Fixed price 12 months','Online sign-up'],
     url:'https://vreaulanova.ro/oferte'},
    {provider:'PPC Energie', offer:'PPC Energie bluePASS', price:1.28,
     term:'12 luni', termEn:'12 months', green:true, greenLabel:'Verde 100%', greenLabelEn:'100% green',
     features:['Preț fix 12 luni','Energie verde'],
     featuresEn:['Fixed price 12 months','Green energy'],
     url:'https://www.ppcenergy.ro/energie-electrica/'},
    {provider:'E.ON Energie România', offer:'Casa Mea Fix', price:1.33,
     term:'12 luni', termEn:'12 months',
     features:['Preț fix 12 luni','Factură online','Suport E.ON Myline'],
     featuresEn:['Fixed price 12 months','Online billing','E.ON Myline support'],
     url:'https://www.eon.ro/'},
    {provider:'PPC Energie', offer:'PPC Relaxat', price:1.36,
     term:'12 luni', termEn:'12 months',
     features:['Preț fix 12 luni','Fără angajament online'],
     featuresEn:['Fixed price 12 months','No online commitment'],
     url:'https://www.ppcenergy.ro/energie-electrica/'},
    {provider:'Engie România', offer:'Engie Fix Acasă', price:1.37,
     term:'până la 30 sept. 2026', termEn:'until 30 Sep 2026',
     features:['Preț fix','Factură online'],
     featuresEn:['Fixed price','Online billing'],
     url:'https://www.engie.ro/electricitate/'},
    {provider:'Electrica Furnizare', offer:'Electrica Casa', price:1.45,
     term:'nedeterminat', termEn:'open-ended',
     features:['Preț valabil până la 31 dec. 2026'],
     featuresEn:['Price valid until 31 Dec 2026'],
     url:'https://www.electricafurnizare.ro/'}
  ];

  var ICONS = {'Hidroelectrica':'<svg class="ca-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2.7l5.7 5.7a8 8 0 1 1-11.3 0z"/></svg>','Nova Power & Gas':'<svg class="ca-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>','PPC Energie':'<svg class="ca-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8z"/><path d="M12 22v-5"/></svg>','E.ON Energie România':'<svg class="ca-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="1" y="6" width="18" height="12" rx="2"/><line x1="23" y1="13" x2="23" y2="11"/><line x1="6" y1="10" x2="6" y2="14"/><line x1="10" y1="10" x2="10" y2="14"/></svg>','Engie România':'<svg class="ca-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.5-2-1-3-1.1-2.2-.2-4.1 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.2.5-2.3 1-3 0 1.4 1.1 2.5 2.5 2.5z"/></svg>','Electrica Furnizare':'<svg class="ca-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>'};

  function fmt(n){ return n.toFixed(2).replace('.', ','); }

  function render(){
    var box = document.getElementById('energy-results');
    if(!box) return;
    var isEN = (document.documentElement.lang||'ro').toLowerCase().indexOf('en')===0;
    var cons = parseInt((document.getElementById('energy-consum')||{}).value||'150',10);
    var zone = (document.getElementById('energy-zona')||{}).value||'muntenia';

    var t = isEN ? {
      perKwh:'/ kWh', perMonth:'RON/month', term:'Contract', see:'See provider offer →',
      cheaper:'Save ~%s RON/yr vs. the most expensive listed offer',
      zoneNote:'reference price, Muntenia area (Bucharest); may differ slightly in your area'
    } : {
      perKwh:'/ kWh', perMonth:'RON/lună', term:'Contract', see:'Vezi oferta furnizorului →',
      cheaper:'Economisești ~%s RON/an față de cea mai scumpă ofertă listată',
      zoneNote:'preț de referință, zona Muntenia (București); poate diferi ușor în zona ta'
    };

    var priced = OFFERS.map(function(o){
      var p = (o.zones && o.zones[zone]) ? o.zones[zone] : o.price;
      var exact = !!(o.zones && o.zones[zone]) || zone==='muntenia';
      return {o:o, p:p, exact:exact};
    }).sort(function(a,b){ return a.p-b.p; });

    var maxMonthly = Math.max.apply(null, priced.map(function(x){ return x.p*cons; }));
    var html = '';
    priced.forEach(function(x){
      var o=x.o, monthly=x.p*cons, savingYr=Math.round((maxMonthly-monthly)*12);
      var feats=(isEN?o.featuresEn:o.features).map(function(f){return '<span class="feature-badge">✓ '+f+'</span>';}).join('');
      var badge=o.badge?('<span class="saving-badge">'+(isEN?o.badgeEn:o.badge)+'</span>'):'';
      var greenTag=o.green?('<span style="background:rgba(0,230,118,.1);border:1px solid rgba(0,230,118,.2);color:var(--success);font-size:.7rem;font-weight:700;padding:.15rem .5rem;border-radius:4px;">'+(isEN?o.greenLabelEn:o.greenLabel)+'</span>'):'';
      var approx=x.exact?'':'~';
      html+=
      '<div class="result-card">'+
        '<div class="result-card-top">'+
          '<div>'+
            '<div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.35rem;flex-wrap:wrap;">'+
              '<span style="font-size:1.5rem;">'+(ICONS[o.provider]||'<svg class="ca-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>')+'</span>'+
              '<div class="result-provider">'+o.provider+'</div>'+badge+greenTag+
            '</div>'+
            '<div style="font-size:.9rem;color:var(--text-primary);font-weight:600;">'+o.offer+'</div>'+
            '<div style="margin-top:.5rem;font-size:.85rem;color:var(--text-secondary);">'+t.term+': '+(isEN?o.termEn:o.term)+'</div>'+
          '</div>'+
          '<div class="result-price">'+
            '<div class="result-price-main">'+approx+fmt(x.p)+' RON</div>'+
            '<div class="result-price-period">'+t.perKwh+'</div>'+
            '<div style="font-size:.85rem;color:var(--text-secondary);margin-top:4px;">'+approx+Math.round(monthly)+' '+t.perMonth+'</div>'+
          '</div>'+
        '</div>'+
        '<div class="result-features">'+feats+'</div>'+
        '<div class="result-actions">'+
          '<a class="btn-select" href="'+o.url+'" target="_blank" rel="noopener nofollow">'+t.see+'</a>'+
          (savingYr>0?('<span class="saving-badge">'+t.cheaper.replace('%s',savingYr.toLocaleString(isEN?'en-GB':'ro-RO'))+'</span>'):'')+
        '</div>'+
        (x.exact?'':'<p style="font-size:.72rem;color:var(--text-muted);margin-top:.5rem;">'+t.zoneNote+'</p>')+
      '</div>';
    });
    box.innerHTML = html;
    var cnt=document.getElementById('energy-count');
    if(cnt) cnt.textContent = priced.length;
  }

  // preselecție din parametrii URL (trimiși de widgetul de pe homepage)
  function norm(s){return s.toLowerCase().replace(/[ăâ]/g,'a').replace(/[î]/g,'i').replace(/ș/g,'s').replace(/ț/g,'t').replace(/-/g,' ').trim();}
  var ZONE_MAP={};
  ['bucuresti','bucharest','ilfov','giurgiu','prahova','dambovita','buzau','braila','galati','vrancea','constanta','calarasi','ialomita','tulcea'].forEach(function(j){ZONE_MAP[j]='muntenia';});
  ['dolj','gorj','mehedinti','olt','valcea','arges','teleorman'].forEach(function(j){ZONE_MAP[j]='oltenia';});
  ['bacau','botosani','iasi','neamt','suceava','vaslui'].forEach(function(j){ZONE_MAP[j]='moldova';});
  // restul județelor (Transilvania + Banat) → 'transilvania'
  function applyUrl(){
    try{
      var q={}; new URLSearchParams(typeof location!=='undefined'?location.search:'').forEach(function(v,k){q[k]=v;});
      if(q.judet){
        var z=ZONE_MAP[norm(q.judet)]||'transilvania';
        var el=document.getElementById('energy-zona'); if(el) el.value=z;
      }
      if(q.consum){
        var c=parseInt(q.consum,10);
        if(c>0){
          var best=[150,250,350,500].reduce(function(a,b){return Math.abs(b-c)<Math.abs(a-c)?b:a;});
          var el2=document.getElementById('energy-consum'); if(el2) el2.value=String(best);
        }
      }
    }catch(e){}
  }
  function boot(){applyUrl();render();}

  window.CAEnergy = {render:render, DATA_DATE:DATA_DATE, DATA_DATE_EN:DATA_DATE_EN, count:OFFERS.length};
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
