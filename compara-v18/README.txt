<!DOCTYPE html>
<html lang="ro">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>ComparaAcum.ro — Compară asigurări, energie și internet din România</title>
<meta name="description" content="ComparaAcum.ro este prima platformă independentă de comparare a asigurărilor, energiei și internetului din România. Gratuit, obiectiv, în 60 de secunde."/>
<meta name="keywords" content="comparare asigurari romania, rca ieftin, asigurare auto ieftina, comparare furnizori energie, internet ieftin romania, compara asigurari"/>
<meta name="author" content="ComparaAcum.ro"/>
<meta name="robots" content="index, follow"/>
<link rel="canonical" href="https://comparaacum.ro/"/>

<!-- Open Graph -->
<meta property="og:title" content="ComparaAcum.ro — Compară și economisești"/>
<meta property="og:description" content="Prima platformă independentă de comparare a asigurărilor, energiei și internetului din România."/>
<meta property="og:type" content="website"/>
<meta property="og:url" content="https://comparaacum.ro"/>
<meta property="og:locale" content="ro_RO"/>
<meta property="og:locale:alternate" content="en_GB"/>

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="ComparaAcum.ro — Compară și economisești"/>
<meta name="twitter:description" content="Compară sute de oferte de asigurare și energie în 60 de secunde. Gratuit."/>

<!-- Schema.org JSON-LD -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "ComparaAcum.ro",
  "url": "https://comparaacum.ro",
  "description": "Prima platformă independentă de comparare a asigurărilor, energiei și internetului din România",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://comparaacum.ro/rezultate.html?q={search_term_string}",
    "query-input": "required name=search_term_string"
  },
  "publisher": {
    "@type": "Organization",
    "name": "ComparaAcum.ro",
    "url": "https://comparaacum.ro",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "contact@comparaacum.ro",
      "contactType": "customer service",
      "availableLanguage": ["Romanian", "English"]
    }
  }
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "name": "ComparaAcum.ro",
  "description": "Platformă de comparare asigurări și energie România",
  "url": "https://comparaacum.ro",
  "areaServed": "RO",
  "serviceType": ["Insurance comparison", "Energy comparison", "Internet comparison"]
}
</script>

<link rel="stylesheet" href="css/main.css"/>
<link href="https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Epilogue:ital,wght@0,300;0,400;0,500;1,300&display=swap" rel="stylesheet"/>
</head>
<body>

<div class="bg-mesh"></div>
<div class="bg-grid"></div>

<!-- NAV -->
<nav>
  <a href="index.html" class="logo">Compara<span style="color:var(--electric)">.</span>ro<span class="logo-dot"></span></a>
  <div class="nav-links">
    <a href="index.html#categorii" data-t="nav_auto"></a>
    <a href="index.html#categorii" data-t="nav_casa"></a>
    <a href="index.html#categorii" data-t="nav_energie"></a>
    <a href="index.html#categorii" data-t="nav_internet"></a>
    <a href="blog.html" data-t="nav_blog"></a>
  </div>
  <div class="nav-right">
    <div class="lang-switch">
      <button class="lang-btn active" data-lang="ro">RO</button>
      <button class="lang-btn" data-lang="en">EN</button>
    </div>
    <button class="nav-cta" data-t="nav_cta" onclick="document.querySelector('.widget').scrollIntoView({behavior:'smooth'})"></button>
  </div>
</nav>

<!-- HERO -->
<section class="hero">
  <div class="hero-badge"><span class="badge-dot"></span><span data-t="badge"></span></div>
  <h1>
    <span data-t="h1_line1"></span>
    <span class="strike" data-t="h1_strike"></span><br/>
    <span data-t="h1_line3"></span> <span class="accent" data-t="h1_accent"></span>
  </h1>
  <p class="hero-sub" data-t="hero_sub"></p>

  <!-- WIDGET -->
  <div class="widget">
    <div class="tabs">
      <button class="tab" data-tab="rca" onclick="switchTab('rca')" data-t="tab_rca"></button>
      <button class="tab" data-tab="casa" onclick="switchTab('casa')" data-t="tab_casa"></button>
      <button class="tab" data-tab="energie" onclick="switchTab('energie')" data-t="tab_energie"></button>
      <button class="tab" data-tab="internet" onclick="switchTab('internet')" data-t="tab_internet"></button>
      <button class="tab" data-tab="sanatate" onclick="switchTab('sanatate')" data-t="tab_sanatate"></button>
    </div>

    <!-- RCA -->
    <div data-form="rca">
      <div class="form-grid">
        <div class="field"><label data-t="f_marca"></label>
          <select><option>Dacia</option><option>Volkswagen</option><option>BMW</option><option>Toyota</option><option>Ford</option><option>Renault</option><option>Hyundai</option><option>Skoda</option></select></div>
        <div class="field"><label data-t="f_an"></label>
          <select><option>2024</option><option>2023</option><option>2022</option><option>2021</option><option>2020</option><option>2019</option><option>2018</option></select></div>
        <div class="field"><label data-t="f_judet"></label>
          <select><option>București</option><option>Cluj</option><option>Timiș</option><option>Iași</option><option>Constanța</option><option>Brașov</option><option>Bacău</option><option>Galați</option></select></div>
        <div class="field"><label data-t="f_varsta"></label>
          <select><option>18–25</option><option>26–35</option><option>36–50</option><option>51–65</option><option>65+</option></select></div>
      </div>
    </div>

    <!-- CASA -->
    <div data-form="casa" style="display:none">
      <div class="form-grid">
        <div class="field"><label data-t="f_tip_loc"></label>
          <select><option>Apartament</option><option>Casă</option><option>Vilă</option></select></div>
        <div class="field"><label data-t="f_sup"></label>
          <input type="number" placeholder="75"/></div>
        <div class="field"><label data-t="f_judet"></label>
          <select><option>București</option><option>Cluj</option><option>Timiș</option><option>Iași</option><option>Bacău</option></select></div>
        <div class="field"><label data-t="f_val"></label>
          <input type="number" placeholder="150000"/></div>
      </div>
    </div>

    <!-- ENERGIE -->
    <div data-form="energie" style="display:none">
      <div class="form-grid">
        <div class="field"><label data-t="f_utilitate"></label>
          <select><option>Electricitate</option><option>Gaz natural</option><option>Ambele</option></select></div>
        <div class="field"><label data-t="f_consum"></label>
          <input type="number" placeholder="300"/></div>
        <div class="field"><label data-t="f_judet"></label>
          <select><option>București</option><option>Cluj</option><option>Timiș</option><option>Bacău</option></select></div>
        <div class="field"><label>Tip contract</label>
          <select><option>Persoană fizică</option><option>Persoană juridică</option></select></div>
      </div>
    </div>

    <!-- INTERNET -->
    <div data-form="internet" style="display:none">
      <div class="form-grid">
        <div class="field"><label data-t="f_tip_internet"></label>
          <select><option>Fibra optică</option><option>Cablu coaxial</option><option>Wireless 4G/5G</option></select></div>
        <div class="field"><label data-t="f_viteza"></label>
          <select><option>100 Mbps</option><option>300 Mbps</option><option>500 Mbps</option><option>1 Gbps+</option></select></div>
        <div class="field"><label data-t="f_judet"></label>
          <select><option>București</option><option>Cluj</option><option>Timiș</option><option>Bacău</option></select></div>
        <div class="field"><label>Pachet dorit</label>
          <select><option>Internet only</option><option>Internet + TV</option><option>Internet + TV + Telefon</option></select></div>
      </div>
    </div>

    <!-- SANATATE -->
    <div data-form="sanatate" style="display:none">
      <div class="form-grid">
        <div class="field"><label data-t="f_varsta_s"></label>
          <select><option>18–30</option><option>31–45</option><option>46–60</option><option>60+</option></select></div>
        <div class="field"><label data-t="f_plan"></label>
          <select><option>Individual</option><option>Familie (2 pers.)</option><option>Familie (3+ pers.)</option></select></div>
        <div class="field"><label data-t="f_judet"></label>
          <select><option>București</option><option>Cluj</option><option>Timiș</option><option>Bacău</option></select></div>
        <div class="field"><label>Buget lunar</label>
          <select><option>Sub 100 RON</option><option>100–200 RON</option><option>200–400 RON</option><option>Peste 400 RON</option></select></div>
      </div>
    </div>

    <button class="compare-btn" data-t="compare_btn" onclick="doCompare()"></button>
  </div>
</section>

<!-- TRUST BAR -->
<div class="trust-bar">
  <div class="trust-item reveal">
    <div class="trust-num" data-count="240000" data-suffix="">0</div>
    <div class="trust-label" data-t="trust_comp"></div>
  </div>
  <div class="trust-item reveal rd1">
    <div class="trust-num" data-count="48" data-suffix="+">0</div>
    <div class="trust-label" data-t="trust_furn"></div>
  </div>
  <div class="trust-item reveal rd2">
    <div class="trust-num">1.200 RON</div>
    <div class="trust-label" data-t="trust_eco"></div>
  </div>
  <div class="trust-item reveal rd3">
    <div class="trust-num">60 sec</div>
    <div class="trust-label" data-t="trust_timp"></div>
  </div>
</div>

<!-- HOW IT WORKS -->
<section class="section">
  <div class="section-tag" data-t="sec_cum_tag"></div>
  <h2 class="section-title reveal" data-t="sec_cum_title" style="white-space:pre-line"></h2>
  <p class="section-sub reveal" data-t="sec_cum_sub"></p>
  <div class="steps-grid">
    <div class="step reveal rd1"><div class="step-num">1</div>
      <div class="step-title" data-t="step1_title"></div>
      <div class="step-desc" data-t="step1_desc"></div></div>
    <div class="step reveal rd2"><div class="step-num">2</div>
      <div class="step-title" data-t="step2_title"></div>
      <div class="step-desc" data-t="step2_desc"></div></div>
    <div class="step reveal rd3"><div class="step-num">3</div>
      <div class="step-title" data-t="step3_title"></div>
      <div class="step-desc" data-t="step3_desc"></div></div>
    <div class="step reveal rd4"><div class="step-num">4</div>
      <div class="step-title" data-t="step4_title"></div>
      <div class="step-desc" data-t="step4_desc"></div></div>
  </div>
</section>

<!-- CATEGORIES -->
<section class="section" id="categorii" style="padding-top:0">
  <div class="section-tag" data-t="sec_cat_tag"></div>
  <h2 class="section-title reveal" data-t="sec_cat_title"></h2>
  <p class="section-sub reveal" data-t="sec_cat_sub"></p>
  <div class="cats-grid">
    <a href="rezultate.html" class="cat-card reveal">
      <div class="cat-top"><span class="cat-icon">🚗</span><span class="cat-arrow">↗</span></div>
      <div class="cat-title" data-t="cat1_title"></div>
      <div class="cat-desc" data-t="cat1_desc"></div>
      <span class="cat-badge" style="background:rgba(255,184,48,0.1);color:var(--amber)" data-t="cat1_badge"></span>
    </a>
    <a href="rezultate.html" class="cat-card reveal rd1">
      <div class="cat-top"><span class="cat-icon">🏠</span><span class="cat-arrow">↗</span></div>
      <div class="cat-title" data-t="cat2_title"></div>
      <div class="cat-desc" data-t="cat2_desc"></div>
      <span class="cat-badge" style="background:rgba(0,212,255,0.1);color:var(--electric)" data-t="cat2_badge"></span>
    </a>
    <a href="rezultate.html" class="cat-card reveal rd2">
      <div class="cat-top"><span class="cat-icon">⚡</span><span class="cat-arrow">↗</span></div>
      <div class="cat-title" data-t="cat3_title"></div>
      <div class="cat-desc" data-t="cat3_desc"></div>
      <span class="cat-badge" style="background:rgba(184,255,87,0.1);color:var(--lime)" data-t="cat3_badge"></span>
    </a>
    <a href="rezultate.html" class="cat-card reveal">
      <div class="cat-top"><span class="cat-icon">🌐</span><span class="cat-arrow">↗</span></div>
      <div class="cat-title" data-t="cat4_title"></div>
      <div class="cat-desc" data-t="cat4_desc"></div>
      <span class="cat-badge" style="background:rgba(0,212,255,0.1);color:var(--electric)" data-t="cat4_badge"></span>
    </a>
    <a href="rezultate.html" class="cat-card reveal rd1">
      <div class="cat-top"><span class="cat-icon">❤️</span><span class="cat-arrow">↗</span></div>
      <div class="cat-title" data-t="cat5_title"></div>
      <div class="cat-desc" data-t="cat5_desc"></div>
      <span class="cat-badge" style="background:rgba(255,94,125,0.1);color:var(--rose)" data-t="cat5_badge"></span>
    </a>
    <a href="rezultate.html" class="cat-card reveal rd2">
      <div class="cat-top"><span class="cat-icon">🌱</span><span class="cat-arrow">↗</span></div>
      <div class="cat-title" data-t="cat6_title"></div>
      <div class="cat-desc" data-t="cat6_desc"></div>
      <span class="cat-badge" style="background:rgba(0,212,255,0.1);color:var(--electric)" data-t="cat6_badge"></span>
    </a>
  </div>
</section>

<!-- BLOG -->
<section class="section" style="padding-top:0">
  <div class="section-tag" data-t="sec_blog_tag"></div>
  <h2 class="section-title reveal" data-t="sec_blog_title"></h2>
  <p class="section-sub reveal" data-t="sec_blog_sub"></p>
  <div class="blog-grid">
    <a href="blog/rca-2026.html" class="blog-card reveal">
      <div class="blog-img" style="background:linear-gradient(135deg,rgba(255,184,48,.15),rgba(255,184,48,.03))">🚗</div>
      <div class="blog-body">
        <span class="blog-cat" style="background:rgba(255,184,48,.1);color:var(--amber)" data-t="blog1_cat"></span>
        <div class="blog-title" data-t="blog1_title"></div>
        <div class="blog-excerpt" data-t="blog1_excerpt"></div>
        <div class="blog-meta"><span>Mai 2026</span><span>⏱️ <span data-t="blog1_time"></span></span></div>
      </div>
    </a>
    <a href="blog/energie-2026.html" class="blog-card reveal rd1">
      <div class="blog-img" style="background:linear-gradient(135deg,rgba(184,255,87,.15),rgba(184,255,87,.03))">⚡</div>
      <div class="blog-body">
        <span class="blog-cat" style="background:rgba(184,255,87,.1);color:var(--lime)" data-t="blog2_cat"></span>
        <div class="blog-title" data-t="blog2_title"></div>
        <div class="blog-excerpt" data-t="blog2_excerpt"></div>
        <div class="blog-meta"><span>Mai 2026</span><span>⏱️ <span data-t="blog2_time"></span></span></div>
      </div>
    </a>
    <a href="blog/internet-2026.html" class="blog-card reveal rd2">
      <div class="blog-img" style="background:linear-gradient(135deg,rgba(0,212,255,.15),rgba(0,212,255,.03))">🌐</div>
      <div class="blog-body">
        <span class="blog-cat" style="background:rgba(0,212,255,.1);color:var(--electric)" data-t="blog3_cat"></span>
        <div class="blog-title" data-t="blog3_title"></div>
        <div class="blog-excerpt" data-t="blog3_excerpt"></div>
        <div class="blog-meta"><span>Mai 2026</span><span>⏱️ <span data-t="blog3_time"></span></span></div>
      </div>
    </a>
  </div>
</section>

<!-- TESTIMONIALS -->
<section class="section" style="background:rgba(255,255,255,.015);border-top:1px solid var(--rim);border-bottom:1px solid var(--rim)">
  <div class="section-tag" data-t="sec_testi_tag"></div>
  <h2 class="section-title reveal" data-t="sec_testi_title"></h2>
  <div class="testi-grid">
    <div class="testi reveal">
      <div class="testi-text" data-t="t1_text"></div>
      <div class="testi-author">
        <div class="testi-avatar" style="background:linear-gradient(135deg,var(--electric),var(--lime))">AM</div>
        <div>
          <div class="testi-name" data-t="t1_name"></div>
          <div class="testi-meta" data-t="t1_meta"></div>
          <div class="stars">★★★★★</div>
          <div class="testi-saving" data-t="t1_save"></div>
        </div>
      </div>
    </div>
    <div class="testi reveal rd1">
      <div class="testi-text" data-t="t2_text"></div>
      <div class="testi-author">
        <div class="testi-avatar" style="background:linear-gradient(135deg,var(--rose),var(--amber))">IP</div>
        <div>
          <div class="testi-name" data-t="t2_name"></div>
          <div class="testi-meta" data-t="t2_meta"></div>
          <div class="stars">★★★★★</div>
          <div class="testi-saving" data-t="t2_save"></div>
        </div>
      </div>
    </div>
    <div class="testi reveal rd2">
      <div class="testi-text" data-t="t3_text"></div>
      <div class="testi-author">
        <div class="testi-avatar" style="background:linear-gradient(135deg,var(--lime),var(--electric))">RC</div>
        <div>
          <div class="testi-name" data-t="t3_name"></div>
          <div class="testi-meta" data-t="t3_meta"></div>
          <div class="stars">★★★★★</div>
          <div class="testi-saving" data-t="t3_save"></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<div class="cta-banner reveal">
  <h2 data-t="cta_title"></h2>
  <p data-t="cta_sub"></p>
  <div class="cta-btns">
    <button class="btn-primary" data-t="cta_btn1" onclick="window.scrollTo({top:0,behavior:'smooth'})"></button>
    <a href="despre.html" class="btn-ghost" data-t="cta_btn2" style="display:inline-flex;align-items:center;text-decoration:none"></a>
  </div>
</div>

<!-- FOOTER -->
<footer>
  <div class="footer-grid">
    <div class="footer-brand">
      <a href="index.html" class="logo">Compara<span style="color:var(--electric)">.</span>ro<span class="logo-dot"></span></a>
      <p data-t="footer_desc"></p>
    </div>
    <div class="footer-col">
      <h5 data-t="fc1"></h5>
      <a href="rezultate.html" data-t="fl1_1"></a>
      <a href="rezultate.html" data-t="fl1_2"></a>
      <a href="rezultate.html" data-t="fl1_3"></a>
      <a href="rezultate.html" data-t="fl1_4"></a>
      <a href="rezultate.html" data-t="fl1_5"></a>
    </div>
    <div class="footer-col">
      <h5 data-t="fc2"></h5>
      <a href="despre.html" data-t="fl2_1"></a>
      <a href="blog.html" data-t="fl2_2"></a>
      <a href="contact.html" data-t="fl2_3"></a>
      <a href="contact.html" data-t="fl2_4"></a>
      <a href="contact.html" data-t="fl2_5"></a>
    </div>
    <div class="footer-col">
      <h5 data-t="fc3"></h5>
      <a href="gdpr.html" data-t="fl3_1"></a>
      <a href="termeni.html" data-t="fl3_2"></a>
      <a href="cookies.html" data-t="fl3_3"></a>
      <a href="#" data-t="fl3_4"></a>
      <a href="#" data-t="fl3_5"></a>
    </div>
  </div>
  <div class="footer-bottom">
    <span data-t="footer_copy"></span>
    <div class="footer-badges">
      <span class="fbadge">🛡️ GDPR</span>
      <span class="fbadge">🏅 ASF</span>
      <span class="fbadge">🔒 SSL</span>
    </div>
  </div>
</footer>

<!-- NOTIFICATION -->
<div class="notif" id="notif">
  <span class="notif-icon">🔍</span>
  <span class="notif-text"></span>
</div>

<!-- COOKIE BANNER -->
<div id="cookieBanner" style="display:none;position:fixed;bottom:0;left:0;right:0;z-index:300;background:rgba(13,28,48,0.98);border-top:1px solid var(--rim2);padding:18px 5%;display:none;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap;backdrop-filter:blur(20px)">
  <p style="font-size:0.82rem;color:var(--muted2);max-width:600px;line-height:1.6">
    🍪 Folosim cookie-uri pentru a îmbunătăți experiența ta. Poți accepta toate cookie-urile sau doar cele esențiale.
    <a href="cookies.html" style="color:var(--electric)">Află mai mult</a>
  </p>
  <div style="display:flex;gap:10px">
    <button id="declineCookies" style="background:transparent;border:1px solid var(--rim2);color:var(--muted2);padding:9px 18px;border-radius:8px;cursor:pointer;font-family:'Epilogue',sans-serif;font-size:0.82rem">Doar esențiale</button>
    <button id="acceptCookies" style="background:var(--electric);color:var(--ink);border:none;padding:9px 18px;border-radius:8px;cursor:pointer;font-family:'Epilogue',sans-serif;font-size:0.82rem;font-weight:600">Acceptă toate</button>
  </div>
</div>

<script src="js/main.js"></script>
</body>
</html>
