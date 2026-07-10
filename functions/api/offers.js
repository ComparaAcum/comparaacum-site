// ═══════════════════════════════════════════════════════════
// ComparaAcum.ro — Cloudflare Pages Function: GET /api/offers?cat=energie
// Servește ofertele din Supabase (tabelul public.offers).
// Front-end-ul (js/*-offers.js) le încarcă de aici, cu fallback local.
//
// IMPORTANT deploy: folderul functions/ trebuie să stea la RĂDĂCINA
// repo-ului GitHub (lângă compara-v18/), la fel ca la /api/chat.
// Cheia anon e publică prin design (securitatea = RLS în Supabase).
// ═══════════════════════════════════════════════════════════

const SUPA_URL = "https://bdauzbcgylnizkaewyru.supabase.co";
const SUPA_ANON = "sb_publishable_Yq_kTwqptsRutIqJh9KV9A_XqSwzFXN";
const CATS = ["energie", "gaze", "internet", "tv"];

export async function onRequestGet({ request, env }) {
  const cat = (new URL(request.url).searchParams.get("cat") || "").toLowerCase();
  if (!CATS.includes(cat)) {
    return new Response(JSON.stringify({ error: "cat invalid" }), {
      status: 400, headers: { "content-type": "application/json" }
    });
  }
  const anon = env.SUPABASE_ANON_KEY || SUPA_ANON;
  const url = (env.SUPABASE_URL || SUPA_URL) +
    "/rest/v1/offers?category=eq." + cat +
    "&active=eq.true&order=sort_order.asc&select=id,url,data,verified_at";
  let rows;
  try {
    const r = await fetch(url, {
      headers: { apikey: anon, authorization: "Bearer " + anon }
    });
    if (!r.ok) throw new Error("upstream " + r.status);
    rows = await r.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: "indisponibil" }), {
      status: 502, headers: { "content-type": "application/json" }
    });
  }
  // aplatizează: {id, url, verifiedAt, ...data} — exact forma pe care o randază modulele
  const out = rows.map(x => Object.assign({ id: x.id, url: x.url, verifiedAt: x.verified_at }, x.data));
  return new Response(JSON.stringify(out), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=300",   // 5 min cache la edge/browser
      "access-control-allow-origin": "*"
    }
  });
}
