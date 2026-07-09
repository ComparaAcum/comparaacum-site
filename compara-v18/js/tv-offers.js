/* ComparaAcum.ro — televiziune, prețuri de listă reale
 * Surse: digi.ro, focussat.ro, orange.ro (prețuri de listă publicate de operatori).
 * Verificat: iulie 2026. */
(function(){
  var OFFERS = [
    {provider:'Digi (RCS & RDS)', offer:'Digi TV Digital (cablu)', price:30, tech:'Cablu digital', techEn:'Digital cable',
     features:['180+ canale','60+ canale HD','3 canale 4K','Decodor/CI+ inclus'],
     featuresEn:['180+ channels','60+ HD channels','3 4K channels','Decoder/CI+ included'],
     url:'https://www.digi.ro/servicii/televiziune', badge:'Cel mai bun raport preț/canale', badgeEn:'Best price per channel'},
    {provider:'Digi (RCS & RDS)', offer:'Digi TV Satelit (DTH)', price:25, from:true, tech:'Satelit', techEn:'Satellite',
     features:['Pentru zone fără fibră','Grilă mai restrânsă decât pe cablu'],
     featuresEn:['For areas without fibre','Smaller channel line-up than cable'],
     url:'https://www.digi.ro/servicii/televiziune'},
    {provider:'Focus Sat', offer:'Pachet standard satelit', price:44, tech:'Satelit', techEn:'Satellite',
     features:['Acoperire națională prin satelit','TV online inclus în UE'],
     featuresEn:['Nationwide satellite coverage','Online TV included in the EU'],
     url:'https://www.focussat.ro/'},
    {provider:'Orange', offer:'Home TV (cablu / satelit)', price:0, quote:true, tech:'Cablu / Satelit', techEn:'Cable / Satellite',
     features:['Reduceri la pachet cu Home Net','Până la 3 receivere suplimentare'],
     featuresEn:['Discounts bundled with Home Net','Up to 3 extra receivers'],
     url:'https://www.orange.ro/tv/abonament-tv-satelit/'}
  ];

  function render(){
    var box=document.getElementById('tv-app');
    if(!box) return;
    var isEN=(document.documentElement.lang||'ro').toLowerCase().indexOf('en')===0;
    var t=isEN?{see:'See provider offer →',tech:'Technology',from:'from ',quote:'price on the provider’s site',month:'month'}
              :{see:'Vezi oferta furnizorului →',tech:'Tehnologie',from:'de la ',quote:'preț pe site-ul operatorului',month:'lună'};
    var sorted=OFFERS.slice().sort(function(a,b){
      if(a.quote) return 1; if(b.quote) return -1; return a.price-b.price;
    });
    var html='<div class="results-list">';
    sorted.forEach(function(o){
      var badge=o.badge?('<span class="saving-badge">'+(isEN?o.badgeEn:o.badge)+'</span>'):'';
      var feats=(isEN?o.featuresEn:o.features).map(function(f){return '<span class="feature-badge">✓ '+f+'</span>';}).join('');
      var priceHtml=o.quote
        ? '<div class="result-price-main" style="font-size:1rem;">'+t.quote+'</div>'
        : '<div class="result-price-main">'+(o.from?t.from:'')+o.price+' RON</div><div class="result-price-period">/ '+t.month+'</div>';
      html+='<div class="result-card"><div class="result-card-top"><div>'+
        '<div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.35rem;flex-wrap:wrap;"><span style="font-size:1.5rem;"><svg class="ca-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg></span><div class="result-provider">'+o.provider+'</div>'+badge+'</div>'+
        '<div style="font-size:.9rem;color:var(--text-primary);font-weight:600;">'+o.offer+'</div>'+
        '<div style="margin-top:.5rem;font-size:.85rem;color:var(--text-secondary);">'+t.tech+': '+(isEN?o.techEn:o.tech)+'</div>'+
        '</div><div class="result-price">'+priceHtml+'</div></div>'+
        '<div class="result-features">'+feats+'</div>'+
        '<div class="result-actions"><a class="btn-select" href="'+o.url+'" target="_blank" rel="noopener nofollow">'+t.see+'</a></div>'+
        '</div>';
    });
    html+='</div>';
    box.innerHTML=html;
  }

  window.CATv={render:render};
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',render);
  else render();
})();
