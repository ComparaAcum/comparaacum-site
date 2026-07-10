// ═══════════════════════════════════════════════════════════
// ComparaAcum.ro — Cloudflare Pages Function: GET /api/go/:id
// Redirect către oferta furnizorului + înregistrează clickul în
// Supabase (tabelul public.clicks) — dovada de trafic pentru parteneri.
//
// NECESITĂ variabila de mediu (Cloudflare Pages → Settings →
// Environment variables, tip Secret):
//   SUPABASE_SERVICE_KEY = cheia "service_role" din Supabase
// Fără ea, redirectul funcționează, dar clickul nu se loghează.
// ═══════════════════════════════════════════════════════════

const SUPA_URL = "https://bdauzbcgylnizkaewyru.supabase.co";
const SUPA_ANON = "sb_publishable_Yq_kTwqptsRutIqJh9KV9A_XqSwzFXN";

export async function onRequestGet(context) {
  const { params, request, env } = context;
  const id = String(params.id || "").toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 60);
  const base = env.SUPABASE_URL || SUPA_URL;
  const anon = env.SUPABASE_ANON_KEY || SUPA_ANON;

  // 1. găsește oferta (citire publică prin RLS)
  let offer = null;
  try {
    const r = await fetch(base + "/rest/v1/offers?id=eq." + id + "&active=eq.true&select=id,url,category", {
      headers: { apikey: anon, authorization: "Bearer " + anon }
    });
    if (r.ok) { const rows = await r.json(); offer = rows[0] || null; }
  } catch (e) { /* cădem pe redirect spre homepage */ }

  if (!offer || !offer.url) {
    return Response.redirect(new URL("/", request.url).toString(), 302);
  }

  // 2. loghează clickul (best-effort, nu blochează redirectul)
  const svc = env.SUPABASE_SERVICE_KEY;
  if (svc) {
    const click = {
      offer_id: offer.id,
      category: offer.category,
      referer: (request.headers.get("referer") || "").slice(0, 300),
      lang: (request.headers.get("accept-language") || "").slice(0, 40),
      country: (request.cf && request.cf.country) || null,
      ua: (request.headers.get("user-agent") || "").slice(0, 300)
    };
    context.waitUntil(
      fetch(base + "/rest/v1/clicks", {
        method: "POST",
        headers: {
          apikey: svc, authorization: "Bearer " + svc,
          "content-type": "application/json", prefer: "return=minimal"
        },
        body: JSON.stringify(click)
      }).catch(() => {})
    );
  }

  // 3. redirect către furnizor
  return Response.redirect(offer.url, 302);
}
