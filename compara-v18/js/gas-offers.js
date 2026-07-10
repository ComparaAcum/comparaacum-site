/* ComparaAcum.ro — gaze naturale, date reale (clienți casnici)
 * Cadru: OUG 12/2026 (1 apr. 2026 – 31 mar. 2027): factura = min(preț contract, preț de referință);
 * efectiv, prețul final cu TVA nu depășește 0,31 lei/kWh. Ofertele competitive: ~0,28–0,30 lei/kWh.
 * Surse: ANRE/POSF, Monitorul Oficial (OUG 12/2026), paginile furnizorilor. Verificat: iulie 2026. */
(function(){
  var CAP = 0.31;
  var COMPETITIVE = 0.28;

  var OFFERS = [
    {provider:'Nova Power & Gas', offer:'Nova Casnic preț fix 12 luni', price:0.30, approx:true,
     note:'conform datelor ANRE (apr. 2026)', noteEn:'per ANRE data (Apr 2026)',
     term:'12 luni', termEn:'12 months', url:'https://vreaulanova.ro/oferte',
     badge:'Printre cele mai ieftine', badgeEn:'Among the cheapest'},
    {provider:'E.ON Energie România', offer:'Pachetul Standard Gaz', price:CAP, capped:true,
     term:'nedeterminat', termEn:'open-ended', url:'https://www.eon.ro/'},
    {provider:'PPC Energie', offer:'PPC Gaz Easy', price:CAP, capped:true,
     term:'12 luni', termEn:'12 months', url:'https://www.ppcenergy.ro/gaze-naturale/'},
    {provider:'Engie România', offer:'Oferte gaze Engie', price:CAP, capped:true,
     term:'12 luni', termEn:'12 months', url:'https://www.engie.ro/gaze-naturale/'},
    {provider:'Premier Energy', offer:'Ofertă gaze casnic', price:CAP, capped:true,
     term:'12 luni', termEn:'12 months', url:'https://premierenergy.ro/'},
    {provider:'Electrica Furnizare', offer:'Gaz Stabil', price:CAP, capped:true,
     term:'nedeterminat', termEn:'open-ended', url:'https://www.electricafurnizare.ro/'}
  ];

  function fmt(n){ return n.toFixed(2).replace('.', ','); }

  var INIT_CONS=(function(){
    try{
      var q={}; new URLSearchParams(typeof location!=='undefined'?location.search:'').forEach(function(v,k){q[k]=v;});
      if(q.consum){
        var kwh=Math.round(parseInt(q.consum,10)*10.55);
        if(kwh>0) return [300,600,1000,1500].reduce(function(a,b){return Math.abs(b-kwh)<Math.abs(a-kwh)?b:a;});
      }
    }catch(e){}
    return 600;
  })();

  function render(){
    var box=document.getElementById('gas-app');
    if(!box) return;
    var isEN=(document.documentElement.lang||'ro').toLowerCase().indexOf('en')===0;
    var t=isEN?{
      calc:'Estimate for:', c1:'300 kWh/month (cooking + hot water)', c2:'600 kWh/month (small home, heating)',
      c3:'1000 kWh/month (average home, winter)', c4:'1500 kWh/month (house, winter)',
      maxBill:'Guaranteed maximum bill (OUG 12/2026 cap, 0.31 RON/kWh):', compBill:'With a competitive offer (~0.28 RON/kWh):',
      perMonth:'RON/month', see:'See provider offer →', term:'Contract',
      capLbl:'≤ 0,31 RON', capNote:'effective cap — OUG 12/2026: you pay the lower of your contract price and the monthly reference price, applied automatically',
      perKwh:'/ kWh (incl. VAT)'
    }:{
      calc:'Estimează pentru:', c1:'300 kWh/lună (gătit + apă caldă)', c2:'600 kWh/lună (locuință mică, încălzire)',
      c3:'1000 kWh/lună (locuință medie, iarna)', c4:'1500 kWh/lună (casă, iarna)',
      maxBill:'Factura maximă garantată (plafon OUG 12/2026, 0,31 lei/kWh):', compBill:'Cu o ofertă competitivă (~0,28 lei/kWh):',
      perMonth:'lei/lună', see:'Vezi oferta furnizorului →', term:'Contract',
      capLbl:'≤ 0,31 lei', capNote:'plafon efectiv — OUG 12/2026: plătești automat minimul dintre prețul din contract și prețul de referință lunar',
      perKwh:'/ kWh (cu TVA)'
    };
    var consEl=document.getElementById('gas-consum');
    var cons=consEl?parseInt(consEl.value,10):INIT_CONS;

    var html='';
    html+='<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);padding:1.25rem;margin-bottom:1rem;display:flex;gap:1rem;flex-wrap:wrap;align-items:center;">'+
      '<span style="font-size:.85rem;color:var(--text-secondary);font-weight:600;">'+t.calc+'</span>'+
      '<select id="gas-consum" onchange="CAGas.render()" style="background:var(--bg-secondary);border:1px solid var(--border);color:var(--text-primary);padding:.5rem .75rem;border-radius:8px;font-size:.85rem;">'+
        '<option value="300"'+(cons===300?' selected':'')+'>'+t.c1+'</option>'+
        '<option value="600"'+(cons===600?' selected':'')+'>'+t.c2+'</option>'+
        '<option value="1000"'+(cons===1000?' selected':'')+'>'+t.c3+'</option>'+
        '<option value="1500"'+(cons===1500?' selected':'')+'>'+t.c4+'</option>'+
      '</select></div>';
    html+='<div style="background:rgba(0,230,118,.06);border:1px solid rgba(0,230,118,.2);border-radius:var(--radius);padding:1rem 1.25rem;margin-bottom:1.5rem;font-size:.9rem;color:var(--text-secondary);line-height:1.7;">'+
      t.maxBill+' <strong style="color:var(--text-primary);">'+Math.round(cons*CAP)+' '+t.perMonth+'</strong> · '+
      t.compBill+' <strong style="color:var(--success);">~'+Math.round(cons*COMPETITIVE)+' '+t.perMonth+'</strong></div>';

    html+='<div class="results-list">';
    OFFERS.forEach(function(o){
      var priceHtml=o.capped
        ? '<div class="result-price-main">'+t.capLbl+'</div><div class="result-price-period">'+t.perKwh+'</div>'
        : '<div class="result-price-main">≈'+fmt(o.price)+' RON</div><div class="result-price-period">'+t.perKwh+'</div>';
      var badge=o.badge?('<span class="saving-badge">'+(isEN?o.badgeEn:o.badge)+'</span>'):'';
      var note=o.capped?t.capNote:(isEN?o.noteEn:o.note);
      html+='<div class="result-card"><div class="result-card-top"><div>'+
        '<div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.35rem;flex-wrap:wrap;"><span style="font-size:1.5rem;"><svg class="ca-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.5-2-1-3-1.1-2.2-.2-4.1 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.2.5-2.3 1-3 0 1.4 1.1 2.5 2.5 2.5z"/></svg></span><div class="result-provider">'+o.provider+'</div>'+badge+'</div>'+
        '<div style="font-size:.9rem;color:var(--text-primary);font-weight:600;">'+o.offer+'</div>'+
        '<div style="margin-top:.5rem;font-size:.85rem;color:var(--text-secondary);">'+t.term+': '+(isEN?o.termEn:o.term)+'</div>'+
        '</div><div class="result-price">'+priceHtml+'</div></div>'+
        '<p style="font-size:.75rem;color:var(--text-muted);margin:.6rem 0 0;">'+note+'</p>'+
        '<div class="result-actions"><a class="btn-select" href="'+(o.id?('/api/go/'+o.id):o.url)+'" target="_blank" rel="noopener nofollow sponsored">'+t.see+'</a></div>'+
        '</div>';
    });
    html+='</div>';
    box.innerHTML=html;
  }

  window.CAGas={render:render};
  function loadOffers(){try{fetch('/api/offers?cat=gaze').then(function(r){return r.ok?r.json():Promise.reject();}).then(function(rows){if(Array.isArray(rows)&&rows.length){OFFERS=rows;render();}}).catch(function(){});}catch(e){}}
  function boot(){render();loadOffers();}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot);
  else boot();
})();
