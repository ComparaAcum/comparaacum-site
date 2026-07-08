/* ComparaAcum.ro — internet fix (fibră), prețuri de listă reale
 * Surse: digi.ro, orange.ro, vodafone.ro (prețuri de listă publicate de operatori).
 * Verificat: iulie 2026. Prețurile promoționale/condiționate sunt marcate explicit. */
(function(){
  var OFFERS = [
    {provider:'Digi (RCS & RDS)', offer:'FiberLink 500', price:30, down:'500 Mbps', up:'250 Mbps',
     features:['Fibră optică FTTH','Router Wi-Fi inclus','Fără costuri de instalare'],
     featuresEn:['FTTH optical fibre','Wi-Fi router included','No installation fees'],
     url:'https://www.digi.ro/servicii/internet/internet-fix', badge:'Cel mai mic preț', badgeEn:'Lowest price'},
    {provider:'Digi (RCS & RDS)', offer:'FiberLink 1000', price:40, down:'940 Mbps', up:'450 Mbps',
     features:['Fibră optică FTTH','Router Wi-Fi 6','Ideal pentru familii'],
     featuresEn:['FTTH optical fibre','Wi-Fi 6 router','Great for families'],
     url:'https://www.digi.ro/servicii/internet/internet-fix'},
    {provider:'Digi (RCS & RDS)', offer:'FiberLink 2.5G / 10G', price:50, from:true, down:'2,5–10 Gbps', up:'—',
     features:['Doar în orașele mari','Necesită echipamente compatibile'],
     featuresEn:['Big cities only','Requires compatible equipment'],
     url:'https://www.digi.ro/servicii/internet/internet-fix'},
    {provider:'Orange', offer:'Home Net 1000', price:55, euro:'11 €', down:'1000 Mbps', up:'500 Mbps',
     features:['Router Wi-Fi inclus','Reduceri la pachet cu mobil/TV'],
     featuresEn:['Wi-Fi router included','Discounts when bundled with mobile/TV'],
     url:'https://www.orange.ro/internet/abonament-home-net-fibra/'},
    {provider:'Vodafone', offer:'Internet fix până la 1 Gbps', price:25, from:true, euro:'de la 4,9 €', euroEn:'from €4.9', down:'până la 1 Gbps', downEn:'up to 1 Gbps', up:'—',
     cond:'preț condiționat: pentru clienții cu abonament mobil Vodafone; ofertele standard diferă',
     condEn:'conditional price: for customers with a Vodafone mobile plan; standard offers differ',
     features:['Router Wi-Fi inclus','Promoții pentru clienții de mobil'],
     featuresEn:['Wi-Fi router included','Promos for mobile customers'],
     url:'https://www.vodafone.ro/serviciifixe/internet'}
  ];

  function render(){
    var box=document.getElementById('net-app');
    if(!box) return;
    var isEN=(document.documentElement.lang||'ro').toLowerCase().indexOf('en')===0;
    var t=isEN?{perMonth:'RON/month',see:'See provider offer →',down:'Download',up:'Upload',from:'from '}
              :{perMonth:'lei/lună',see:'Vezi oferta furnizorului →',down:'Download',up:'Upload',from:'de la '};
    var sorted=OFFERS.slice().sort(function(a,b){return a.price-b.price;});
    var html='<div class="results-list">';
    sorted.forEach(function(o){
      var badge=o.badge?('<span class="saving-badge">'+(isEN?o.badgeEn:o.badge)+'</span>'):'';
      var feats=(isEN?o.featuresEn:o.features).map(function(f){return '<span class="feature-badge">✓ '+f+'</span>';}).join('');
      var euro=o.euro?(' <span style="font-size:.75rem;color:var(--text-muted);">('+(isEN&&o.euroEn?o.euroEn:o.euro)+')</span>'):'';
      var cond=o.cond?('<p style="font-size:.75rem;color:var(--text-muted);margin:.6rem 0 0;">'+(isEN?o.condEn:o.cond)+'</p>'):'';
      html+='<div class="result-card"><div class="result-card-top"><div>'+
        '<div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.35rem;flex-wrap:wrap;"><span style="font-size:1.5rem;">📡</span><div class="result-provider">'+o.provider+'</div>'+badge+'</div>'+
        '<div style="font-size:.9rem;color:var(--text-primary);font-weight:600;">'+o.offer+'</div>'+
        '<div style="margin-top:.5rem;font-size:.85rem;color:var(--text-secondary);">'+t.down+': '+(isEN&&o.downEn?o.downEn:o.down)+(o.up!=='—'?(' · '+t.up+': '+o.up):'')+'</div>'+
        '</div><div class="result-price">'+
        '<div class="result-price-main">'+(o.from?t.from:'')+o.price+' RON</div>'+
        '<div class="result-price-period">/ '+(isEN?'month':'lună')+euro+'</div>'+
        '</div></div>'+
        '<div class="result-features">'+feats+'</div>'+cond+
        '<div class="result-actions"><a class="btn-select" href="'+o.url+'" target="_blank" rel="noopener nofollow">'+t.see+'</a></div>'+
        '</div>';
    });
    html+='</div>';
    box.innerHTML=html;
  }

  window.CANet={render:render};
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',render);
  else render();
})();
