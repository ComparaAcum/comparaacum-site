/* ═══════════════════════════════════════════════════════════
   ComparaAcum.ro — Strat de autentificare & cont (Supabase)
   Necesită încărcate înainte: supabase-js (CDN) + supabase-config.js
   ═══════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var CFG = window.COMPARAACUM_SUPABASE || {};
  var LANG = (document.documentElement.lang || "ro").toLowerCase().indexOf("en") === 0 ? "en" : "ro";

  // Texte localizate
  var T = {
    ro: { login: "Cont", account: "Contul meu", logout: "Ieși din cont" },
    en: { login: "Account", account: "My account", logout: "Log out" }
  }[LANG];

  // Căi absolute (site servit din rădăcina domeniului), în funcție de limbă
  var URL_LOGIN = LANG === "en" ? "/en/account-en.html" : "/cont.html";
  var URL_ACCOUNT = LANG === "en" ? "/en/my-account-en.html" : "/contul-meu.html";

  // ── Client Supabase (memoizat) ──────────────────────────────
  var _client = null;
  function client() {
    if (_client) return _client;
    if (!window.supabase || !CFG.url || CFG.url.indexOf("INLOCUIESTE") !== -1) return null;
    _client = window.supabase.createClient(CFG.url, CFG.anon, {
      auth: { persistSession: true, autoRefreshToken: true }
    });
    return _client;
  }

  // ── API public: window.CA ───────────────────────────────────
  var CA = {
    lang: LANG,
    client: client,
    isConfigured: function () { return !!client(); },

    signUp: function (email, password, fullName, marketingConsent) {
      var c = client(); if (!c) return Promise.reject(new Error("not-configured"));
      return c.auth.signUp({
        email: email,
        password: password,
        options: { data: { full_name: fullName || "", marketing_consent: !!marketingConsent } }
      });
    },

    signIn: function (email, password) {
      var c = client(); if (!c) return Promise.reject(new Error("not-configured"));
      return c.auth.signInWithPassword({ email: email, password: password });
    },

    signInWithGoogle: function () {
      var c = client(); if (!c) return Promise.reject(new Error("not-configured"));
      return c.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: window.location.origin + URL_ACCOUNT }
      });
    },

    resetPassword: function (email) {
      var c = client(); if (!c) return Promise.reject(new Error("not-configured"));
      return c.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + URL_ACCOUNT });
    },

    signOut: function () {
      var c = client(); if (!c) return Promise.resolve();
      return c.auth.signOut().then(function () { window.location.href = "/"; });
    },

    getUser: function () {
      var c = client(); if (!c) return Promise.resolve(null);
      return c.auth.getUser().then(function (r) { return (r && r.data) ? r.data.user : null; });
    },

    requireAuth: function () {
      return CA.getUser().then(function (u) {
        if (!u) { window.location.href = URL_LOGIN; return null; }
        return u;
      });
    },

    // Salvează o căutare în istoric (doar dacă userul e logat)
    saveSearch: function (category, params) {
      var c = client(); if (!c) return Promise.resolve();
      return c.auth.getUser().then(function (r) {
        var u = r && r.data ? r.data.user : null;
        if (!u) return;
        return c.from("searches").insert({
          user_id: u.id,
          category: category,
          params: params || {}
        });
      }).catch(function (e) { console.warn("saveSearch:", e && e.message); });
    }
  };
  window.CA = CA;

  // ── Injectează link-ul de cont în navbar ────────────────────
  function injectNav(user) {
    var links = document.querySelector(".navbar-links");
    if (!links) return;
    var old = links.querySelector("#ca-account-link, #ca-account-wrap");
    if (old) old.remove();

    if (user) {
      var name = (user.user_metadata && user.user_metadata.full_name) || user.email || "";
      var initials = name.trim().split(/\s+/).map(function (s) { return s.charAt(0); })
        .join("").slice(0, 2).toUpperCase() || "•";
      var wrap = document.createElement("div");
      wrap.className = "nav-dropdown";
      wrap.id = "ca-account-wrap";
      wrap.innerHTML =
        '<a href="' + URL_ACCOUNT + '" style="display:flex;align-items:center;gap:.5rem;">' +
          '<span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:var(--accent);color:#000;font-weight:800;font-size:.78rem;">' + initials + '</span>' +
          '<span>' + T.account + '</span>' +
        '</a>' +
        '<div class="dropdown-menu">' +
          '<a href="' + URL_ACCOUNT + '">📋 ' + (LANG === "en" ? "Dashboard" : "Panou cont") + '</a>' +
          '<a href="#" id="ca-logout">🚪 ' + T.logout + '</a>' +
        '</div>';
      var cta = links.querySelector(".navbar-cta");
      links.insertBefore(wrap, cta || null);
      var lo = wrap.querySelector("#ca-logout");
      if (lo) lo.addEventListener("click", function (e) { e.preventDefault(); CA.signOut(); });
    } else {
      var a = document.createElement("a");
      a.id = "ca-account-link";
      a.href = URL_LOGIN;
      a.innerHTML = "👤 " + T.login;
      var cta2 = links.querySelector(".navbar-cta");
      links.insertBefore(a, cta2 || null);
    }
  }

  // ── Deconectare automată după 30 de zile de inactivitate ────
  var INACT_KEY = "ca_last_seen", INACT_MS = 30 * 24 * 60 * 60 * 1000;
  function touchOrExpire(user) {
    if (!user) { try { localStorage.removeItem(INACT_KEY); } catch (e) {} return user; }
    try {
      var last = parseInt(localStorage.getItem(INACT_KEY) || "0", 10);
      if (last && (Date.now() - last) > INACT_MS) {
        // sesiune veche: deconectăm fără redirect agresiv
        var c = client();
        if (c) c.auth.signOut();
        localStorage.removeItem(INACT_KEY);
        return null;
      }
      localStorage.setItem(INACT_KEY, String(Date.now()));
    } catch (e) {}
    return user;
  }

  function refreshNav() {
    var c = client();
    if (!c) { injectNav(null); return; }
    CA.getUser().then(function (u) { injectNav(touchOrExpire(u)); }).catch(function () { injectNav(null); });
    c.auth.onAuthStateChange(function (_e, session) {
      injectNav(session ? session.user : null);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", refreshNav);
  } else {
    refreshNav();
  }
})();
