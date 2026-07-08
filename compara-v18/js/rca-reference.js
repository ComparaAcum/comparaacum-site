/* ComparaAcum.ro — RCA: tarife de referință oficiale ASF (ediția mai 2026, valabilă de la 1 iunie 2026)
 * Sursa: Autoritatea de Supraveghere Financiară — https://www.asfromania.ro/ro/a/3489/tarife-de-referinta-rca-2026
 * Tarifele de referință sunt un reper statistic, NU prețuri comerciale. Prețul real se obține
 * doar prin ofertare la asigurători; poate fi cu 10–30% sub referință pentru profiluri bune.
 * ACTUALIZARE: ASF publică tarife noi semestrial (de regulă ianuarie și iulie). */
(function(){
  var KW_LABELS=['≤ 50 kW','51–75 kW','76–100 kW','101–125 kW','126–150 kW','151–200 kW','201–300 kW','> 300 kW'];
  var AGE_LABELS=['18–25','26–30','31–40','41–50','50+'];
  // Persoane fizice, lei — rânduri: kW; coloane: grupe de vârstă
  var BIF=[ [3974,2205,2232,2143,2215],[4199,2486,2425,2319,2417],[4760,2666,2695,2566,2693],
            [4281,2877,2899,2796,2959],[4258,3029,3057,2974,3088],[5325,4030,4088,3941,4077],
            [5186,4047,4035,3855,4186],[4956,3821,3793,3676,3978] ];
  var REST=[ [2361,1356,1368,1283,1359],[2571,1469,1481,1420,1471],[2896,1634,1642,1584,1665],
             [3055,1739,1760,1686,1758],[3254,1835,1860,1812,1891],[4344,2456,2493,2382,2500],
             [4163,2389,2438,2352,2499],[3998,2266,2344,2249,2416] ];
  var FACTOR_N=1.36; // prag risc ridicat (ASF)

  var INSURERS=[
    {name:'Allianz-Țiriac', url:'https://www.allianztiriac.ro/'},
    {name:'Asirom VIG', url:'https://www.asirom.ro/'},
    {name:'Axeria IARD', url:null},
    {name:'Eazy Insurance', url:null},
    {name:'Generali', url:'https://www.generali.ro/'},
    {name:'Grawe România', url:'https://www.grawe.ro/'},
    {name:'Groupama', url:'https://www.groupama.ro/'},
    {name:'Hellas Direct', url:null},
    {name:'Omniasig VIG', url:'https://www.omniasig.ro/'}
  ];

  // preselecție din parametrii URL (trimiși de widgetul de pe homepage)
  var INIT=(function(){
    var zone=null, age=null;
    try{
      var q={}; new URLSearchParams(typeof location!=='undefined'?location.search:'').forEach(function(v,k){q[k]=v;});
      if(q.judet){ var j=q.judet.toLowerCase(); zone=(j.indexOf('bucure')===0||j==='bucharest'||j==='ilfov')?'bif':'rest'; }
      if(q.varsta){
        var m=q.varsta.match(/^(\d+)/), n=m?parseInt(m[1],10):0;
        if(/peste|over/i.test(q.varsta)||n>50) age=4;
        else if(n>=41) age=3; else if(n>=31) age=2; else if(n>=26) age=1; else if(n>=18) age=0;
      }
    }catch(e){}
    return {zone:zone, age:age};
  })();

  function render(){
    var box=document.getElementById('rca-app');
    if(!box) return;
    var isEN=(document.documentElement.lang||'ro').toLowerCase().indexOf('en')===0;
    var t=isEN?{
      title:'Official ASF reference tariff calculator',
      intro:'MTPL (RCA) prices are personalised — the official ASF reference tariff (May 2026 edition) is the statistical market benchmark for your profile:',
      zone:'Registration area', zBIF:'Bucharest–Ilfov', zREST:'Rest of the country',
      age:'Driver age', kw:'Engine power (kW — field P.2 in the registration certificate)',
      ref:'ASF reference tariff', year:'RON / year',
      high:'High-risk threshold (×1.36):',
      note:'The reference tariff is a statistical benchmark, not a commercial price. Insurers often quote 10–30% below it for good profiles (no-claims bonus can halve it). If 3 offers exceed the high-risk threshold, you are entitled to a policy allocated via BAAR.',
      insurers:'Authorised RCA insurers you can get quotes from',
      insNote:'Indicative list, verified July 2026 — the official up-to-date list is maintained by <a href="https://www.baar.ro/" target="_blank" rel="noopener" style="color:var(--accent);">BAAR</a>.',
      quote:'Get a quote →'
    }:{
      title:'Calculator oficial: tariful de referință ASF',
      intro:'Prețul RCA este personalizat — tariful de referință ASF (ediția mai 2026) este reperul statistic al pieței pentru profilul tău:',
      zone:'Zona de înmatriculare', zBIF:'București–Ilfov', zREST:'Restul țării',
      age:'Vârsta șoferului', kw:'Putere motor (kW — rubrica P.2 din talon)',
      ref:'Tarif de referință ASF', year:'lei / an',
      high:'Prag „risc ridicat" (×1,36):',
      note:'Tariful de referință este un reper statistic, nu un preț comercial. Asigurătorii oferă frecvent prețuri cu 10–30% sub referință pentru profiluri bune (clasa bonus poate înjumătăți prețul). Dacă 3 oferte depășesc pragul de risc ridicat, ai dreptul la o poliță alocată prin BAAR.',
      insurers:'Asigurători RCA autorizați de la care poți cere oferte',
      insNote:'Listă orientativă, verificată în iulie 2026 — lista oficială actualizată este publicată de <a href="https://www.baar.ro/" target="_blank" rel="noopener" style="color:var(--accent);">BAAR</a>.',
      quote:'Cere ofertă →'
    };

    var zEl=document.getElementById('rca-zona'), aEl=document.getElementById('rca-varsta'), kEl=document.getElementById('rca-kw');
    var zone=zEl?zEl.value:(INIT.zone||'rest');
    var age=aEl?parseInt(aEl.value,10):(INIT.age!=null?INIT.age:2);
    var kw=kEl?parseInt(kEl.value,10):2;
    var tarif=(zone==='bif'?BIF:REST)[kw][age];
    var prag=Math.round(tarif*FACTOR_N);

    function opts(labels,sel){return labels.map(function(l,i){return '<option value="'+i+'"'+(i===sel?' selected':'')+'>'+l+'</option>';}).join('');}
    var selStyle='background:var(--bg-secondary);border:1px solid var(--border);color:var(--text-primary);padding:.5rem .75rem;border-radius:8px;font-size:.85rem;';

    var html='';
    html+='<div style="background:var(--bg-card);border:1px solid var(--border-accent);border-radius:var(--radius-lg);padding:1.75rem;margin-bottom:1.5rem;">'+
      '<h2 style="font-size:1.15rem;font-weight:800;margin-bottom:.5rem;">'+t.title+'</h2>'+
      '<p style="font-size:.85rem;color:var(--text-secondary);margin-bottom:1rem;line-height:1.6;">'+t.intro+'</p>'+
      '<div style="display:flex;gap:1rem;flex-wrap:wrap;align-items:flex-end;">'+
        '<label style="font-size:.75rem;color:var(--text-secondary);display:grid;gap:.3rem;">'+t.zone+
          '<select id="rca-zona" onchange="CARca.render()" style="'+selStyle+'">'+
          '<option value="rest"'+(zone==='rest'?' selected':'')+'>'+t.zREST+'</option>'+
          '<option value="bif"'+(zone==='bif'?' selected':'')+'>'+t.zBIF+'</option></select></label>'+
        '<label style="font-size:.75rem;color:var(--text-secondary);display:grid;gap:.3rem;">'+t.age+
          '<select id="rca-varsta" onchange="CARca.render()" style="'+selStyle+'">'+opts(AGE_LABELS,age)+'</select></label>'+
        '<label style="font-size:.75rem;color:var(--text-secondary);display:grid;gap:.3rem;">'+t.kw+
          '<select id="rca-kw" onchange="CARca.render()" style="'+selStyle+'">'+opts(KW_LABELS,kw)+'</select></label>'+
      '</div>'+
      '<div style="display:flex;gap:2rem;flex-wrap:wrap;align-items:baseline;margin-top:1.25rem;">'+
        '<div><div style="font-size:.75rem;color:var(--text-secondary);">'+t.ref+'</div>'+
        '<div style="font-size:2rem;font-weight:900;color:var(--accent);">'+tarif.toLocaleString(isEN?'en-GB':'ro-RO')+' <span style="font-size:.9rem;font-weight:600;">'+t.year+'</span></div></div>'+
        '<div style="font-size:.85rem;color:var(--text-secondary);">'+t.high+' <strong style="color:var(--text-primary);">'+prag.toLocaleString(isEN?'en-GB':'ro-RO')+' '+t.year+'</strong></div>'+
      '</div>'+
      '<p style="font-size:.75rem;color:var(--text-muted);margin-top:1rem;line-height:1.6;">'+t.note+'</p>'+
    '</div>';

    html+='<h3 style="font-size:1rem;font-weight:800;margin:1.5rem 0 .75rem;">'+t.insurers+'</h3>'+
      '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:.75rem;">';
    INSURERS.forEach(function(a){
      html+='<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);padding:1rem;display:flex;align-items:center;justify-content:space-between;gap:.5rem;">'+
        '<span style="font-weight:700;font-size:.9rem;">🛡️ '+a.name+'</span>'+
        (a.url?('<a href="'+a.url+'" target="_blank" rel="noopener nofollow" style="font-size:.75rem;color:var(--accent);white-space:nowrap;">'+t.quote+'</a>'):'')+
        '</div>';
    });
    html+='</div><p style="font-size:.75rem;color:var(--text-muted);margin-top:.75rem;">'+t.insNote+'</p>';

    box.innerHTML=html;
  }

  window.CARca={render:render};
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',render);
  else render();
})();
