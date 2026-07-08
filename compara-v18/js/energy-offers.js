/* ComparaAcum.ro — oferte reale de energie electrică (clienți casnici)
 * Sursa: comparatorul oficial ANRE (posf.ro) + ofertele publicate de furnizori.
 * Prețuri finale cu TVA, zona de referință: Rețele Electrice Muntenia (București).
 * ACTUALIZARE: editează DATA_DATE și lista OFFERS la fiecare verificare lunară. */
(function(){
  var DATA_DATE = '1 iulie 2026';
  var DATA_DATE_EN = '1 July 2026';

  // preț final lei/kWh (TVA inclus), zona Muntenia; hidro are prețuri pe zone
  var OFFERS = [
    {provider:'Hidroelectrica', offer:'Viitor Hidro', price:1.06,
     zones:{muntenia:1.06, oltenia:1.09, transilvania:1.11, moldova:1.14},
     term:'12 luni', termEn:'12 months', green:true, greenLabel:'Energie hidro', greenLabelEn:'Hydro energy',
     features:['Preț fix 12 luni','Producător de stat','Factură online'],
     featuresEn:['Fixed price 12 months','State-owned producer','Online billing'],
     url:'https://www.hidroelectrica.ro/oferte-furnizare', badge:'Cel mai mic preț', badgeEn:'Lowest price'},
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

  var ICONS = {'Hidroelectrica':'💧','Nova Power & Gas':'⚡','PPC Energie':'🔌','E.ON Energie România':'🔋','Engie România':'🔥','Electrica Furnizare':'💡'};

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
              '<span style="font-size:1.5rem;">'+(ICONS[o.provider]||'⚡')+'</span>'+
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

  window.CAEnergy = {render:render, DATA_DATE:DATA_DATE, DATA_DATE_EN:DATA_DATE_EN, count:OFFERS.length};
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', render);
  else render();
})();
