// ═══════════════════════════════════════════════════════════
// ComparaAcum.ro — Edge Function: send-reminders
// Rulează ZILNIC (cron). Găsește contractele care expiră în
// 30 / 7 / 1 zile și trimite un email de avertizare prin Resend.
//
// Secrete necesare (Supabase → Edge Functions → Secrets):
//   SUPABASE_URL                (setat automat)
//   SUPABASE_SERVICE_ROLE_KEY   (setat automat)
//   RESEND_API_KEY              (de la resend.com)
//   FROM_EMAIL                  ex: "ComparaAcum <notificari@comparaacum.ro>"
// ═══════════════════════════════════════════════════════════
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const TYPE_LABEL: Record<string, string> = {
  rca: "asigurarea RCA", casco: "polița Casco", casa: "asigurarea locuinței",
  sanatate: "asigurarea de sănătate", energie: "contractul de energie electrică",
  gaze: "contractul de gaze naturale", internet: "abonamentul de internet",
  tv: "abonamentul TV",
};
const COMPARE_URL: Record<string, string> = {
  rca: "https://comparaacum.ro/rezultate.html", casco: "https://comparaacum.ro/rezultate.html",
  casa: "https://comparaacum.ro/rezultate-casa.html", sanatate: "https://comparaacum.ro/rezultate-sanatate.html",
  energie: "https://comparaacum.ro/rezultate-energie.html", gaze: "https://comparaacum.ro/rezultate-gaze.html",
  internet: "https://comparaacum.ro/rezultate-internet.html", tv: "https://comparaacum.ro/rezultate-tv.html",
};

function daysUntil(dateStr: string): number {
  const today = new Date(); today.setUTCHours(0, 0, 0, 0);
  const exp = new Date(dateStr + "T00:00:00Z");
  return Math.round((exp.getTime() - today.getTime()) / 86400000);
}

// Formatează YYYY-MM-DD în ZZ.LL.AAAA (format românesc)
function fmtRo(dateStr: string): string {
  const p = dateStr.split("-");
  return p.length === 3 ? `${p[2]}.${p[1]}.${p[0]}` : dateStr;
}

function emailHtml(name: string, type: string, days: number, expiry: string, provider: string | null): string {
  const label = TYPE_LABEL[type] || "contractul";
  const url = COMPARE_URL[type] || "https://comparaacum.ro";
  const when = days === 0 ? "astăzi" : days === 1 ? "mâine" : `în ${days} zile`;
  const prov = provider ? ` (${provider})` : "";
  return `<!DOCTYPE html><html><body style="margin:0;background:#0a0a0f;font-family:Inter,Arial,sans-serif;color:#e8f0fe;">
  <div style="max-width:520px;margin:0 auto;padding:32px 24px;">
    <div style="font-size:22px;font-weight:800;margin-bottom:24px;">Compara<span style="color:#00d4ff;">Acum</span>.ro</div>
    <div style="background:#1a1a2e;border:1px solid rgba(0,212,255,.3);border-radius:16px;padding:28px;">
      <div style="font-size:40px;margin-bottom:8px;">🔔</div>
      <h1 style="font-size:20px;margin:0 0 12px;">Salut${name ? ", " + name : ""}!</h1>
      <p style="font-size:15px;line-height:1.6;color:#a0a0b8;margin:0 0 16px;">
        Îți reamintim că <strong style="color:#fff;">${label}${prov}</strong> expiră <strong style="color:#ffd740;">${when}</strong>
        (${fmtRo(expiry)}). E momentul perfect să compari ofertele și să economisești înainte de reînnoire.
      </p>
      <a href="${url}" style="display:inline-block;background:#00d4ff;color:#000;text-decoration:none;font-weight:800;padding:12px 24px;border-radius:8px;font-size:15px;">Compară ofertele acum →</a>
    </div>
    <p style="font-size:12px;color:#606080;margin-top:20px;line-height:1.6;">
      Primești acest email pentru că ai setat un memento în contul tău ComparaAcum.ro.
      Poți gestiona sau șterge mementourile din <a href="https://comparaacum.ro/contul-meu.html" style="color:#00d4ff;">contul tău</a>.
    </p>
  </div></body></html>`;
}

Deno.serve(async (_req) => {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
    const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "ComparaAcum <notificari@comparaacum.ro>";

    // Praguri de notificare
    const WINDOWS = [30, 7, 1];

    // Ia toate mementourile care încă nu au expirat
    const todayISO = new Date().toISOString().slice(0, 10);
    const { data: reminders, error } = await supabase
      .from("reminders")
      .select("*")
      .gte("expiry_date", todayISO);
    if (error) throw error;

    let sent = 0;
    for (const r of reminders ?? []) {
      const days = daysUntil(r.expiry_date);
      if (days < 0) continue;
      // Praguri activate care au fost deja atinse (au mai rămas <= w zile)
      const eligible = WINDOWS.filter((w) =>
        days <= w &&
        ((w === 30 && r.notify_30) || (w === 7 && r.notify_7) || (w === 1 && r.notify_1))
      );
      if (eligible.length === 0) continue;
      // Cel mai urgent prag atins (cel mai mic)
      const win = Math.min(...eligible);
      // Anti-duplicat: trimite doar dacă e un prag mai urgent decât ultimul notificat
      if (r.last_notified_window != null && win >= r.last_notified_window) continue;

      // Emailul utilizatorului
      const { data: u } = await supabase.auth.admin.getUserById(r.user_id);
      const email = u?.user?.email;
      if (!email) continue;
      const name = ((u?.user?.user_metadata as any)?.full_name || "").split(" ")[0] || "";

      // Trimite prin Resend
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Authorization": `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: email,
          subject: `🔔 ${TYPE_LABEL[r.type] || "Contractul tău"} expiră ${days === 1 ? "mâine" : days === 0 ? "azi" : "în " + days + " zile"}`,
          html: emailHtml(name, r.type, days, r.expiry_date, r.provider),
        }),
      });
      const ok = res.ok;

      await supabase.from("notifications_log").insert({
        reminder_id: r.id, user_id: r.user_id, email, window_days: win,
        status: ok ? "sent" : "failed",
      });
      if (ok) {
        await supabase.from("reminders").update({
          last_notified_at: new Date().toISOString(), last_notified_window: win,
        }).eq("id", r.id);
        sent++;
      }
    }

    return new Response(JSON.stringify({ ok: true, checked: reminders?.length ?? 0, sent }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: String(e) }), {
      status: 500, headers: { "Content-Type": "application/json" },
    });
  }
});
