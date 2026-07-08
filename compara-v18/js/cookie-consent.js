/* ComparaAcum.ro — consimțământ cookies (GDPR/ePrivacy)
 * Google Analytics se încarcă DOAR după acordul explicit al utilizatorului. */
(function(){
  var KEY='ca_consent'; // 'granted' | 'denied'
  var GA_ID='G-RN97LTXFW4';
  var isEN=(document.documentElement.lang||'ro').toLowerCase().indexOf('en')===0;
  var policyUrl=isEN?'/en/cookie-policy-en.html':'/politica-cookies.html';

  function loadGA(){
    if(window.__caGaLoaded) return;
    window.__caGaLoaded=true;
    var s=document.createElement('script');
    s.async=true;
    s.src='https://www.googletagmanager.com/gtag/js?id='+GA_ID;
    document.head.appendChild(s);
    window.dataLayer=window.dataLayer||[];
    window.gtag=window.gtag||function(){dataLayer.push(arguments);};
    gtag('js',new Date());
    gtag('config',GA_ID,{anonymize_ip:true});
  }

  function setChoice(v){
    try{localStorage.setItem(KEY,v);}catch(e){}
    var b=document.getElementById('ca-cookie-banner');
    if(b) b.parentNode.removeChild(b);
    if(v==='granted') loadGA();
  }

  function showBanner(){
    if(document.getElementById('ca-cookie-banner')) return;
    var t=isEN?{
      msg:'We use cookies for anonymous traffic statistics (Google Analytics) — only with your consent. Essential cookies (e.g. your account login) always work.',
      more:'Cookie policy',
      acc:'Accept all',
      dec:'Essential only'
    }:{
      msg:'Folosim cookies pentru statistici anonime de trafic (Google Analytics) — doar cu acordul tău. Cookie-urile esențiale (de ex. autentificarea în cont) funcționează mereu.',
      more:'Politica de cookies',
      acc:'Accept toate',
      dec:'Doar esențiale'
    };
    var d=document.createElement('div');
    d.id='ca-cookie-banner';
    d.setAttribute('role','dialog');
    d.setAttribute('aria-label','Cookies');
    d.innerHTML=
      '<div class="ca-cb-inner">'+
        '<p class="ca-cb-text">🍪 '+t.msg+' <a href="'+policyUrl+'">'+t.more+'</a></p>'+
        '<div class="ca-cb-actions">'+
          '<button type="button" class="ca-cb-btn ca-cb-acc">'+t.acc+'</button>'+
          '<button type="button" class="ca-cb-btn ca-cb-dec">'+t.dec+'</button>'+
        '</div>'+
      '</div>';
    var st=document.createElement('style');
    st.textContent=
      '#ca-cookie-banner{position:fixed;left:0;right:0;bottom:0;z-index:8000;padding:1rem;background:rgba(10,10,15,.97);border-top:1px solid rgba(255,255,255,.12);backdrop-filter:blur(8px);}'+
      '#ca-cookie-banner .ca-cb-inner{max-width:1100px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;gap:1rem;justify-content:space-between;}'+
      '#ca-cookie-banner .ca-cb-text{margin:0;color:#c9c9d4;font-size:.85rem;line-height:1.6;flex:1 1 320px;}'+
      '#ca-cookie-banner .ca-cb-text a{color:#ffd740;text-decoration:underline;}'+
      '#ca-cookie-banner .ca-cb-actions{display:flex;gap:.6rem;flex:0 0 auto;}'+
      '#ca-cookie-banner .ca-cb-btn{cursor:pointer;border-radius:8px;padding:.6rem 1.1rem;font-size:.85rem;font-weight:700;border:1px solid rgba(255,255,255,.2);}'+
      '#ca-cookie-banner .ca-cb-acc{background:#ffd740;color:#0a0a0f;border-color:#ffd740;}'+
      '#ca-cookie-banner .ca-cb-dec{background:transparent;color:#c9c9d4;}';
    document.head.appendChild(st);
    document.body.appendChild(d);
    d.querySelector('.ca-cb-acc').addEventListener('click',function(){setChoice('granted');});
    d.querySelector('.ca-cb-dec').addEventListener('click',function(){setChoice('denied');});
  }

  // API publică: CAConsent.reset() — pentru linkul „Schimbă-ți alegerea" din politica de cookies
  window.CAConsent={
    reset:function(){try{localStorage.removeItem(KEY);}catch(e){} location.reload();},
    status:function(){try{return localStorage.getItem(KEY);}catch(e){return null;}}
  };

  var choice=null;
  try{choice=localStorage.getItem(KEY);}catch(e){}
  if(choice==='granted'){ loadGA(); }
  else if(choice!=='denied'){
    if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',showBanner);
    else showBanner();
  }
})();
