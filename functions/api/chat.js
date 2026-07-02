// ═══════════════════════════════════════════════════════════
// ComparaAcum.ro — Cloudflare Pages Function: /api/chat
// „Chat cu Bruno" — alimentat de Cloudflare Workers AI (gratuit
// din alocația zilnică). Cheia AI nu apare în site; totul rulează
// pe server la Cloudflare.
//
// NECESITĂ un binding în Cloudflare Pages:
//   Pages → proiectul tău → Settings → Functions → Bindings →
//   Add binding → Workers AI → Variable name: AI
// ═══════════════════════════════════════════════════════════

const SYSTEM_PROMPT = `Ești Bruno, ursulețul-ghid prietenos al ComparaAcum.ro — prima platformă independentă din România de comparare a prețurilor la asigurări (RCA, Casco, asigurare casă, sănătate), energie electrică, gaze naturale și internet/TV.

ROLUL TĂU: ajuți vizitatorii să înțeleagă termeni (ex. RCA, franciză, bonus-malus, kWh), să navigheze pe site și să înțeleagă cum funcționează comparația. Răspunzi scurt, clar și prietenos, în limba română (sau în limba în care ți se scrie).

REGULI STRICTE:
- NU da sfaturi financiare sau de asigurare personalizate și NU spune ce produs anume să cumpere cineva. Dacă ești întrebat „ce să aleg?", explică factorii de luat în calcul și îndeamnă utilizatorul să compare ofertele pe site și, la nevoie, să consulte un specialist autorizat.
- NU inventa prețuri, oferte sau nume de produse. Platforma este în faza de lansare și afișează date demonstrative; spune asta clar dacă cineva cere prețuri exacte.
- Rămâi la subiectele legate de ComparaAcum și de asigurări / energie / internet. Dacă ești întrebat altceva, spune politicos că nu e domeniul tău și revino la temă.
- Dacă nu știi ceva, recunoaște pe scurt. Nu inventa.
- Nu cere și nu reține date personale sensibile (CNP, date de card, parole).
- Fii concis: 2-5 propoziții, ton cald. Poți folosi ocazional un emoji potrivit.`;

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    if (!env.AI) {
      return json({ error: "Asistentul nu este încă activat (lipsește binding-ul AI în Cloudflare Pages)." }, 503);
    }

    const body = await request.json().catch(() => ({}));
    let msgs = Array.isArray(body.messages) ? body.messages : [];

    // Sanitizare: doar user/assistant, ultimele 8, text limitat
    msgs = msgs
      .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
      .slice(-8)
      .map((m) => ({ role: m.role, content: m.content.slice(0, 1500) }));

    if (msgs.length === 0) return json({ error: "empty" }, 400);

    const messages = [{ role: "system", content: SYSTEM_PROMPT }, ...msgs];

    const out = await env.AI.run("@cf/google/gemma-3-12b-it", {
      messages,
      max_tokens: 400,
      temperature: 0.3,
    });

    const reply = (out && (out.response || (out.result && out.result.response))) || "";
    if (!reply) return json({ error: "no-reply" }, 502);

    return json({ reply: reply.trim() });
  } catch (e) {
    return json({ error: String(e && e.message ? e.message : e) }, 500);
  }
}
