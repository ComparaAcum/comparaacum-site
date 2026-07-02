// ═══════════════════════════════════════════════════════════
// ComparaAcum.ro — Edge Function: delete-account
// Șterge definitiv contul utilizatorului autentificat (GDPR -
// dreptul la ștergere). Datele asociate (profil, căutări,
// mementouri) se șterg automat prin "on delete cascade".
// ═══════════════════════════════════════════════════════════
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return new Response(JSON.stringify({ error: "missing auth" }), { status: 401, headers: CORS });

    const url = Deno.env.get("SUPABASE_URL")!;
    // Client cu tokenul userului ca să aflăm cine e
    const userClient = createClient(url, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: uErr } = await userClient.auth.getUser();
    if (uErr || !user) return new Response(JSON.stringify({ error: "invalid user" }), { status: 401, headers: CORS });

    // Client admin (service role) care șterge userul
    const admin = createClient(url, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { error: dErr } = await admin.auth.admin.deleteUser(user.id);
    if (dErr) throw dErr;

    return new Response(JSON.stringify({ ok: true }), { headers: { ...CORS, "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: String(e) }), { status: 500, headers: { ...CORS, "Content-Type": "application/json" } });
  }
});
