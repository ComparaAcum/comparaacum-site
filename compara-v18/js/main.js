/* ═══════════════════════════════════════════════
   Compara.ro — Main Stylesheet
   ═══════════════════════════════════════════════ */
@import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Epilogue:ital,wght@0,300;0,400;0,500;1,300&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --ink:#08111f;--ink2:#0d1c30;
  --rim:rgba(255,255,255,0.07);--rim2:rgba(255,255,255,0.13);
  --electric:#00d4ff;--electric2:#0099cc;
  --lime:#b8ff57;--amber:#ffb830;--rose:#ff5e7d;--purple:#a78bfa;
  --green:#22c55e;
  --text:#e8f0fe;--muted:#6b8299;--muted2:#8fa5bc;--white:#ffffff;
}
html{scroll-behavior:smooth}
body{font-family:'Epilogue',sans-serif;background:var(--ink);color:var(--text);overflow-x:hidden}

/* BG */
.bg-mesh{position:fixed;inset:0;z-index:0;background:
  radial-gradient(ellipse 70% 55% at 15% 20%,rgba(0,212,255,0.09) 0%,transparent 60%),
  radial-gradient(ellipse 55% 45% at 85% 75%,rgba(184,255,87,0.05) 0%,transparent 55%);
  pointer-events:none}
.bg-grid{position:fixed;inset:0;z-index:0;
  background-image:linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px);
  background-size:64px 64px;pointer-events:none;
  mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 40%,transparent 100%)}

/* NAV */
nav{position:fixed;top:0;left:0;right:0;z-index:100;
  display:flex;align-items:center;justify-content:space-between;
  padding:18px 5%;background:rgba(8,17,31,0.9);backdrop-filter:blur(20px);
  border-bottom:1px solid var(--rim)}
.logo{font-family:'Clash Display',sans-serif;font-weight:700;font-size:1.35rem;
  letter-spacing:-0.03em;text-decoration:none;color:var(--text)}
.logo-dot{width:7px;height:7px;background:var(--electric);border-radius:50%;
  display:inline-block;margin-left:1px;box-shadow:0 0 8px var(--electric);
  animation:blink 2s ease infinite}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}
.nav-links{display:flex;gap:1.8rem}
.nav-links a{color:var(--muted);text-decoration:none;font-size:0.88rem;transition:color .2s}
.nav-links a:hover{color:var(--white)}
.nav-right{display:flex;align-items:center;gap:10px}
.lang-switch{display:flex;gap:4px;background:rgba(255,255,255,0.05);
  border:1px solid var(--rim2);border-radius:8px;padding:4px}
.lang-btn{padding:5px 10px;border-radius:5px;border:none;background:transparent;
  color:var(--muted);font-size:0.78rem;font-weight:600;cursor:pointer;transition:all .2s}
.lang-btn.active{background:var(--electric);color:var(--ink)}
.nav-cta{background:var(--electric);color:var(--ink);border:none;
  padding:9px 20px;border-radius:8px;font-family:'Epilogue',sans-serif;
  font-size:0.85rem;font-weight:600;cursor:pointer;transition:all .2s}
.nav-cta:hover{background:var(--white);transform:translateY(-1px)}

/* HERO */
.hero{position:relative;z-index:1;min-height:100vh;display:flex;
  flex-direction:column;align-items:center;justify-content:center;
  padding:120px 5% 60px;text-align:center}
.hero-badge{display:inline-flex;align-items:center;gap:8px;
  background:rgba(0,212,255,0.08);border:1px solid rgba(0,212,255,0.2);
  color:var(--electric);padding:7px 18px;border-radius:100px;
  font-size:0.78rem;font-weight:600;letter-spacing:0.06em;
  text-transform:uppercase;margin-bottom:28px;
  opacity:0;animation:fadeUp .6s .2s ease forwards}
.badge-dot{width:6px;height:6px;background:var(--electric);border-radius:50%;
  animation:pulse 1.8s infinite}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.3;transform:scale(1.5)}}
.hero h1{font-family:'Clash Display',sans-serif;
  font-size:clamp(2.8rem,6.5vw,5.5rem);font-weight:700;
  line-height:1.05;letter-spacing:-0.04em;margin-bottom:24px;
  opacity:0;animation:fadeUp .7s .35s ease forwards}
.hero h1 .accent{background:linear-gradient(135deg,var(--electric),var(--lime));
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero h1 .strike{position:relative;color:var(--muted);
  text-decoration:line-through;text-decoration-color:var(--rose);text-decoration-thickness:3px}
.hero-sub{font-size:1.1rem;color:var(--muted2);max-width:520px;line-height:1.7;
  font-weight:300;margin-bottom:44px;
  opacity:0;animation:fadeUp .7s .5s ease forwards}
@keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}

/* WIDGET */
.widget{width:100%;max-width:700px;
  background:rgba(13,28,48,0.85);border:1px solid var(--rim2);
  border-radius:20px;padding:28px;backdrop-filter:blur(20px);
  box-shadow:0 32px 80px rgba(0,0,0,0.5);
  opacity:0;animation:fadeUp .8s .65s ease forwards}
.tabs{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:22px;
  padding-bottom:18px;border-bottom:1px solid var(--rim)}
.tab{display:flex;align-items:center;gap:6px;padding:8px 14px;
  border-radius:9px;border:1px solid transparent;background:transparent;
  color:var(--muted);font-family:'Epilogue',sans-serif;font-size:0.82rem;
  cursor:pointer;transition:all .2s}
.tab:hover{color:var(--text);background:rgba(255,255,255,0.04);border-color:var(--rim2)}
.tab.active{background:rgba(0,212,255,0.1);border-color:rgba(0,212,255,0.3);color:var(--electric)}
.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px}
.field label{display:block;font-size:0.7rem;text-transform:uppercase;
  letter-spacing:0.08em;color:var(--muted);font-weight:600;margin-bottom:6px}
.field select,.field input{width:100%;background:rgba(255,255,255,0.04);
  border:1px solid var(--rim2);color:var(--text);border-radius:10px;
  padding:12px 14px;font-family:'Epilogue',sans-serif;font-size:0.9rem;
  outline:none;transition:border-color .2s;appearance:none}
.field select:focus,.field input:focus{border-color:var(--electric);background:rgba(0,212,255,0.04)}
.field select option{background:#0d1c30}
.field input::placeholder{color:var(--muted)}
.compare-btn{width:100%;background:linear-gradient(135deg,var(--electric),var(--electric2));
  color:var(--ink);border:none;padding:15px;border-radius:12px;
  font-family:'Clash Display',sans-serif;font-size:0.95rem;font-weight:600;
  cursor:pointer;transition:all .2s;margin-top:6px}
.compare-btn:hover{transform:translateY(-2px);box-shadow:0 10px 36px rgba(0,212,255,0.4)}

/* TRUST BAR */
.trust-bar{position:relative;z-index:1;display:flex;justify-content:center;
  gap:0;padding:28px 5%;border-top:1px solid var(--rim);
  border-bottom:1px solid var(--rim);background:rgba(255,255,255,0.015)}
.trust-item{padding:0 36px;text-align:center;border-right:1px solid var(--rim)}
.trust-item:last-child{border-right:none}
.trust-num{font-family:'Clash Display',sans-serif;font-size:2rem;font-weight:700;
  color:var(--electric);letter-spacing:-0.03em}
.trust-label{font-size:0.78rem;color:var(--muted);margin-top:3px}

/* SECTIONS */
.section{position:relative;z-index:1;padding:80px 5%}
.section-tag{display:inline-flex;align-items:center;gap:8px;font-size:0.72rem;
  text-transform:uppercase;letter-spacing:0.1em;color:var(--electric);
  font-weight:600;margin-bottom:12px}
.section-tag::before{content:'';width:24px;height:1px;background:var(--electric)}
.section-title{font-family:'Clash Display',sans-serif;
  font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:700;
  letter-spacing:-0.03em;line-height:1.1;margin-bottom:14px}
.section-sub{color:var(--muted2);font-size:1rem;max-width:480px;
  line-height:1.65;font-weight:300;margin-bottom:48px}

/* CATEGORIES */
.cats-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.cat-card{background:var(--ink2);border:1px solid var(--rim);border-radius:18px;
  padding:28px 24px;cursor:pointer;transition:all .3s;text-decoration:none;
  color:inherit;display:block;position:relative;overflow:hidden}
.cat-card::before{content:'';position:absolute;inset:0;opacity:0;transition:opacity .3s}
.cat-card:hover{border-color:var(--rim2);transform:translateY(-4px);
  box-shadow:0 20px 60px rgba(0,0,0,0.4)}
.cat-card:hover::before{opacity:1}
.cat-card:nth-child(1)::before{background:radial-gradient(circle at 0 0,rgba(255,184,48,0.08),transparent 60%)}
.cat-card:nth-child(2)::before{background:radial-gradient(circle at 0 0,rgba(0,212,255,0.08),transparent 60%)}
.cat-card:nth-child(3)::before{background:radial-gradient(circle at 0 0,rgba(184,255,87,0.08),transparent 60%)}
.cat-card:nth-child(4)::before{background:radial-gradient(circle at 0 0,rgba(255,94,125,0.08),transparent 60%)}
.cat-card:nth-child(5)::before{background:radial-gradient(circle at 0 0,rgba(160,100,255,0.08),transparent 60%)}
.cat-card:nth-child(6)::before{background:radial-gradient(circle at 0 0,rgba(34,197,94,0.08),transparent 60%)}
.cat-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px}
.cat-icon{font-size:2rem;line-height:1}
.cat-arrow{color:var(--muted);transition:transform .2s,color .2s}
.cat-card:hover .cat-arrow{transform:translate(3px,-3px);color:var(--electric)}
.cat-title{font-family:'Clash Display',sans-serif;font-size:1.05rem;font-weight:600;margin-bottom:8px}
.cat-desc{font-size:0.82rem;color:var(--muted);line-height:1.55;margin-bottom:14px}
.cat-badge{font-size:0.7rem;font-weight:600;text-transform:uppercase;
  letter-spacing:0.06em;padding:3px 10px;border-radius:5px}

/* HOW IT WORKS */
.steps-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0;position:relative}
.steps-grid::before{content:'';position:absolute;top:27px;left:10%;right:10%;
  height:1px;background:linear-gradient(90deg,transparent,var(--rim2),var(--rim2),transparent)}
.step{text-align:center;padding:0 16px}
.step-num{width:54px;height:54px;border:1px solid var(--rim2);border-radius:50%;
  background:var(--ink2);display:flex;align-items:center;justify-content:center;
  font-family:'Clash Display',sans-serif;font-size:1rem;font-weight:700;
  color:var(--electric);margin:0 auto 20px;position:relative;z-index:1;transition:all .3s}
.step:hover .step-num{background:var(--electric);color:var(--ink);border-color:var(--electric);
  box-shadow:0 0 28px rgba(0,212,255,0.4)}
.step-title{font-family:'Clash Display',sans-serif;font-size:0.95rem;font-weight:600;margin-bottom:8px}
.step-desc{font-size:0.82rem;color:var(--muted);line-height:1.6}

/* BLOG CARDS */
.blog-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.blog-card{background:var(--ink2);border:1px solid var(--rim);border-radius:16px;
  overflow:hidden;text-decoration:none;color:inherit;transition:all .25s;display:block}
.blog-card:hover{border-color:var(--rim2);transform:translateY(-3px);
  box-shadow:0 16px 48px rgba(0,0,0,0.35)}
.blog-img{height:140px;display:flex;align-items:center;justify-content:center;font-size:3rem}
.blog-body{padding:20px}
.blog-cat{font-size:0.68rem;font-weight:700;text-transform:uppercase;
  letter-spacing:0.07em;margin-bottom:10px;display:inline-block;
  padding:3px 9px;border-radius:5px}
.blog-title{font-family:'Clash Display',sans-serif;font-size:0.95rem;font-weight:600;
  line-height:1.3;margin-bottom:8px}
.blog-excerpt{font-size:0.78rem;color:var(--muted);line-height:1.6;margin-bottom:14px}
.blog-meta{display:flex;justify-content:space-between;font-size:0.72rem;color:var(--muted)}

/* TESTIMONIALS */
.testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.testi{background:var(--ink2);border:1px solid var(--rim);border-radius:16px;padding:24px}
.testi-text{font-size:0.88rem;color:var(--muted2);line-height:1.65;
  font-style:italic;margin-bottom:18px;font-weight:300}
.testi-text::before{content:'"';font-family:'Clash Display',sans-serif;font-size:2rem;
  color:var(--electric);opacity:0.5;display:block;line-height:1;margin-bottom:6px}
.testi-author{display:flex;align-items:center;gap:12px}
.testi-avatar{width:38px;height:38px;border-radius:50%;display:flex;
  align-items:center;justify-content:center;font-family:'Clash Display',sans-serif;
  font-size:0.82rem;font-weight:700;color:var(--ink);flex-shrink:0}
.testi-name{font-size:0.85rem;font-weight:500}
.testi-meta{font-size:0.72rem;color:var(--muted);margin-top:2px}
.testi-saving{font-size:0.72rem;font-weight:600;color:var(--lime);margin-top:3px}
.stars{color:var(--amber);font-size:0.75rem}

/* CTA BANNER */
.cta-banner{position:relative;z-index:1;margin:0 5% 80px;
  background:linear-gradient(135deg,rgba(0,212,255,0.1),rgba(184,255,87,0.05));
  border:1px solid rgba(0,212,255,0.18);border-radius:24px;
  padding:60px;text-align:center;overflow:hidden}
.cta-banner::before{content:'';position:absolute;top:-50%;left:-20%;
  width:500px;height:500px;background:radial-gradient(circle,rgba(0,212,255,0.08),transparent 60%);
  pointer-events:none}
.cta-banner h2{font-family:'Clash Display',sans-serif;font-size:clamp(1.8rem,3.5vw,2.8rem);
  font-weight:700;letter-spacing:-0.03em;margin-bottom:14px;position:relative;z-index:1}
.cta-banner p{color:var(--muted2);font-size:1rem;max-width:480px;
  margin:0 auto 30px;line-height:1.65;font-weight:300;position:relative;z-index:1}
.cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;position:relative;z-index:1}
.btn-primary{background:var(--electric);color:var(--ink);border:none;
  padding:14px 32px;border-radius:11px;font-family:'Clash Display',sans-serif;
  font-size:0.92rem;font-weight:600;cursor:pointer;transition:all .2s;
  box-shadow:0 6px 28px rgba(0,212,255,0.3)}
.btn-primary:hover{background:var(--white);transform:translateY(-2px)}
.btn-ghost{background:transparent;border:1px solid var(--rim2);color:var(--muted2);
  padding:14px 32px;border-radius:11px;font-family:'Epilogue',sans-serif;
  font-size:0.9rem;cursor:pointer;transition:all .2s}
.btn-ghost:hover{border-color:var(--electric);color:var(--electric)}

/* FOOTER */
footer{position:relative;z-index:1;padding:48px 5% 28px;border-top:1px solid var(--rim)}
.footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:40px;margin-bottom:40px}
.footer-brand .logo{margin-bottom:12px;display:block}
.footer-brand p{font-size:0.82rem;color:var(--muted);line-height:1.65;max-width:220px}
.footer-col h5{font-family:'Clash Display',sans-serif;font-size:0.78rem;font-weight:600;
  text-transform:uppercase;letter-spacing:.08em;color:var(--muted2);margin-bottom:14px}
.footer-col a{display:block;color:var(--muted);text-decoration:none;
  font-size:0.82rem;margin-bottom:9px;transition:color .2s}
.footer-col a:hover{color:var(--text)}
.footer-bottom{display:flex;justify-content:space-between;align-items:center;
  padding-top:22px;border-top:1px solid var(--rim);font-size:0.77rem;
  color:var(--muted);flex-wrap:wrap;gap:12px}
.footer-badges{display:flex;gap:8px;flex-wrap:wrap}
.fbadge{display:flex;align-items:center;gap:5px;background:rgba(255,255,255,0.04);
  border:1px solid var(--rim);padding:4px 11px;border-radius:6px;font-size:0.7rem}

/* REVEAL ANIMATIONS */
.reveal{opacity:0;transform:translateY(28px);transition:opacity .6s ease,transform .6s ease}
.reveal.visible{opacity:1;transform:none}
.rd1{transition-delay:.08s}.rd2{transition-delay:.16s}.rd3{transition-delay:.24s}
.rd4{transition-delay:.32s}.rd5{transition-delay:.4s}

/* NOTIFICATION */
.notif{position:fixed;bottom:24px;right:24px;z-index:500;
  background:var(--ink2);border:1px solid rgba(0,212,255,0.3);
  border-radius:12px;padding:16px 20px;
  display:flex;align-items:center;gap:12px;
  box-shadow:0 16px 48px rgba(0,0,0,0.5);
  transform:translateY(100px);opacity:0;
  transition:all .4s cubic-bezier(0.175,0.885,0.32,1.275)}
.notif.show{transform:translateY(0);opacity:1}
.notif-icon{font-size:1.2rem}
.notif-text{font-size:0.85rem;font-weight:500}

/* RESPONSIVE */
@media(max-width:900px){
  .cats-grid{grid-template-columns:1fr 1fr}
  .steps-grid{grid-template-columns:1fr 1fr}.steps-grid::before{display:none}
  .blog-grid{grid-template-columns:1fr 1fr}
  .testi-grid{grid-template-columns:1fr}
  .footer-grid{grid-template-columns:1fr 1fr}
  .trust-bar{flex-wrap:wrap;gap:20px}.trust-item{border-right:none;padding:12px 20px}
}
@media(max-width:640px){
  .nav-links{display:none}
  .form-grid{grid-template-columns:1fr}
  .cats-grid,.blog-grid,.steps-grid{grid-template-columns:1fr}
  .cta-banner{padding:36px 24px}
  .footer-grid{grid-template-columns:1fr}
}
