/* ═══════════════════════════════════════════════════════════
   ComparaAcum.ro — Widget „Chat cu Bruno"
   Buton flotant + panou de chat, alimentat de /api/chat
   (Cloudflare Pages Function → Workers AI). Self-contained.
   ═══════════════════════════════════════════════════════════ */
(function () {
  "use strict";
  if (window.__brunoChatLoaded) return;
  window.__brunoChatLoaded = true;

  var EN = (document.documentElement.lang || "ro").toLowerCase().indexOf("en") === 0;
  var T = EN ? {
    title: "Chat with Bruno", sub: "Your guide to comparing",
    greet: "Hi! I'm Bruno 🐻 Ask me anything about insurance, energy or internet — how it works, what a term means, how to compare. I give general info, not financial advice.",
    placeholder: "Write a message…", send: "Send", open: "Chat with Bruno",
    disclaimer: "Bruno gives general info, not financial advice.",
    limit: "You've reached the daily message limit. Please come back tomorrow. 🐻",
    error: "Sorry, I can't respond right now. Please try again in a moment."
  } : {
    title: "Chat cu Bruno", sub: "Ghidul tău în comparații",
    greet: "Salut! Sunt Bruno 🐻 Întreabă-mă orice despre asigurări, energie sau internet — cum funcționează, ce înseamnă un termen, cum compari. Ofer informații generale, nu sfaturi financiare.",
    placeholder: "Scrie un mesaj…", send: "Trimite", open: "Chat cu Bruno",
    disclaimer: "Bruno oferă informații generale, nu sfaturi financiare.",
    limit: "Ai atins limita zilnică de mesaje. Revino mâine, te rog. 🐻",
    error: "Momentan nu pot răspunde. Încearcă din nou peste puțin timp."
  };

  var DAILY_LIMIT = 25;

  // ── Stil ────────────────────────────────────────────────────
  var css = document.createElement("style");
  css.textContent =
  '#bruno-fab{position:fixed;bottom:20px;right:20px;z-index:8999;display:flex;align-items:center;gap:.55rem;background:var(--accent,#00d4ff);color:#001018;border:none;border-radius:50px;padding:.5rem .95rem .5rem .55rem;box-shadow:0 8px 28px rgba(0,0,0,.45);font-family:var(--font,Inter,sans-serif);font-weight:800;font-size:.9rem;transition:transform .2s ease,box-shadow .2s ease;}' +
  '#bruno-fab:hover{transform:translateY(-2px);box-shadow:0 12px 34px rgba(0,0,0,.5);}' +
  '#bruno-fab img{width:34px;height:34px;border-radius:50%;background:#fff;object-fit:cover;}' +
  '#bruno-panel{position:fixed;bottom:20px;right:20px;z-index:9000;width:370px;max-width:calc(100vw - 32px);height:540px;max-height:calc(100vh - 40px);display:none;flex-direction:column;background:var(--bg-card,#1a1a2e);border:1px solid var(--border,rgba(255,255,255,.1));border-radius:18px;box-shadow:0 24px 70px rgba(0,0,0,.6);overflow:hidden;font-family:var(--font,Inter,sans-serif);}' +
  '#bruno-panel.open{display:flex;}' +
  '.bc-head{display:flex;align-items:center;gap:.6rem;padding:.85rem 1rem;background:var(--bg-secondary,#12121a);border-bottom:1px solid var(--border,rgba(255,255,255,.08));}' +
  '.bc-head img{width:38px;height:38px;border-radius:50%;background:#fff;object-fit:cover;}' +
  '.bc-head .bc-t{font-weight:800;font-size:.95rem;color:var(--text-primary,#fff);}' +
  '.bc-head .bc-s{font-size:.72rem;color:var(--text-muted,#8a8aa0);}' +
  '.bc-close{margin-left:auto;background:none;border:none;color:var(--text-secondary,#a0a0b8);font-size:1.3rem;line-height:1;cursor:pointer;padding:.2rem .4rem;}' +
  '.bc-msgs{flex:1;overflow-y:auto;padding:1rem;display:flex;flex-direction:column;gap:.6rem;}' +
  '.bc-msg{max-width:85%;padding:.6rem .8rem;border-radius:14px;font-size:.88rem;line-height:1.5;white-space:pre-wrap;word-wrap:break-word;}' +
  '.bc-msg.bot{align-self:flex-start;background:var(--bg-secondary,#12121a);color:var(--text-primary,#e8f0fe);border:1px solid var(--border,rgba(255,255,255,.08));border-bottom-left-radius:4px;}' +
  '.bc-msg.me{align-self:flex-end;background:var(--accent,#00d4ff);color:#001018;font-weight:600;border-bottom-right-radius:4px;}' +
  '.bc-typing{align-self:flex-start;color:var(--text-muted,#8a8aa0);font-size:.85rem;padding:.3rem .2rem;}' +
  '.bc-foot{border-top:1px solid var(--border,rgba(255,255,255,.08));padding:.6rem;}' +
  '.bc-inrow{display:flex;gap:.5rem;}' +
  '.bc-inrow input{flex:1;background:var(--bg-secondary,#12121a);border:1px solid var(--border,rgba(255,255,255,.12));color:var(--text-primary,#fff);border-radius:10px;padding:.6rem .8rem;font-size:.9rem;font-family:inherit;outline:none;}' +
  '.bc-inrow input:focus{border-color:var(--accent,#00d4ff);}' +
  '.bc-inrow button{background:var(--accent,#00d4ff);color:#001018;border:none;border-radius:10px;padding:0 .95rem;font-weight:800;font-size:.85rem;cursor:pointer;}' +
  '.bc-inrow button:disabled{opacity:.5;cursor:not-allowed;}' +
  '.bc-disc{font-size:.68rem;color:var(--text-muted,#707090);text-align:center;margin-top:.45rem;line-height:1.4;}' +
  '@media(max-width:480px){#bruno-panel{bottom:0;right:0;width:100vw;max-width:100vw;height:100vh;max-height:100vh;border-radius:0;}#bruno-fab span{display:none;}}';
  document.head.appendChild(css);

  // ── DOM ─────────────────────────────────────────────────────
  var fab = document.createElement("button");
  fab.id = "bruno-fab";
  fab.setAttribute("aria-label", T.open);
  fab.innerHTML = '<img src="/images/bruno-head.png" alt="Bruno"/><span>' + T.open + '</span>';

  var panel = document.createElement("div");
  panel.id = "bruno-panel";
  panel.innerHTML =
    '<div class="bc-head"><img src="/images/bruno-head.png" alt="Bruno"/>' +
    '<div><div class="bc-t">' + T.title + '</div><div class="bc-s">' + T.sub + '</div></div>' +
    '<button class="bc-close" aria-label="Close">✕</button></div>' +
    '<div class="bc-msgs" id="bc-msgs"></div>' +
    '<div class="bc-foot"><div class="bc-inrow">' +
    '<input id="bc-input" type="text" placeholder="' + T.placeholder + '" autocomplete="off" maxlength="1000"/>' +
    '<button id="bc-send">' + T.send + '</button></div>' +
    '<div class="bc-disc">' + T.disclaimer + '</div></div>';

  document.body.appendChild(fab);
  document.body.appendChild(panel);

  var msgsEl = panel.querySelector("#bc-msgs");
  var inputEl = panel.querySelector("#bc-input");
  var sendEl = panel.querySelector("#bc-send");
  var history = [];   // {role, content}
  var busy = false;
  var greeted = false;

  function addMsg(role, text) {
    var d = document.createElement("div");
    d.className = "bc-msg " + (role === "me" ? "me" : "bot");
    d.textContent = text;
    msgsEl.appendChild(d);
    msgsEl.scrollTop = msgsEl.scrollHeight;
    return d;
  }

  // ── Limită zilnică (per browser) ────────────────────────────
  function usage() {
    var today = new Date().toISOString().slice(0, 10);
    var raw = {};
    try { raw = JSON.parse(localStorage.getItem("bruno_usage") || "{}"); } catch (e) {}
    if (raw.date !== today) raw = { date: today, count: 0 };
    return raw;
  }
  function bump() {
    var u = usage(); u.count++;
    try { localStorage.setItem("bruno_usage", JSON.stringify(u)); } catch (e) {}
    return u.count;
  }

  function openPanel() {
    panel.classList.add("open");
    if (!greeted) { greeted = true; addMsg("bot", T.greet); }
    setTimeout(function () { inputEl.focus(); }, 50);
  }
  function closePanel() { panel.classList.remove("open"); }

  fab.addEventListener("click", function () {
    panel.classList.contains("open") ? closePanel() : openPanel();
  });
  panel.querySelector(".bc-close").addEventListener("click", closePanel);

  function send() {
    if (busy) return;
    var text = inputEl.value.trim();
    if (!text) return;

    if (usage().count >= DAILY_LIMIT) { addMsg("bot", T.limit); return; }

    inputEl.value = "";
    addMsg("me", text);
    history.push({ role: "user", content: text });
    bump();

    busy = true; sendEl.disabled = true;
    var typing = document.createElement("div");
    typing.className = "bc-typing"; typing.textContent = "Bruno…";
    msgsEl.appendChild(typing); msgsEl.scrollTop = msgsEl.scrollHeight;

    fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: history.slice(-8) })
    })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (res) {
        typing.remove();
        if (res.ok && res.j && res.j.reply) {
          addMsg("bot", res.j.reply);
          history.push({ role: "assistant", content: res.j.reply });
        } else {
          addMsg("bot", T.error);
        }
      })
      .catch(function () { typing.remove(); addMsg("bot", T.error); })
      .finally(function () { busy = false; sendEl.disabled = false; inputEl.focus(); });
  }

  sendEl.addEventListener("click", send);
  inputEl.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  });
})();
