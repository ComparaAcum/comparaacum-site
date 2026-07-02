# Ghid de instalare — Conturi & notificări (Supabase) pentru ComparaAcum.ro

Acest ghid te duce pas cu pas, de la zero, până când utilizatorii își pot crea cont, își salvează căutările și primesc emailuri când le expiră RCA-ul, energia, internetul etc. Nu trebuie să fii programator — copiezi și lipești.

Timp estimat: **30–45 de minute.**

---

## Ce am adăugat deja în site

Fișiere noi (toate în folderul `compara-v18`):

- `cont.html` — pagina de înregistrare / autentificare
- `contul-meu.html` — panoul utilizatorului (istoric căutări + mementouri + setări GDPR)
- `politica-confidentialitate.html` — politica de confidențialitate (GDPR)
- `js/supabase-config.js` — **aici pui cele 2 chei** (singurul fișier pe care îl editezi)
- `js/auth.js` — logica de cont (nu trebuie modificat)
- `supabase/schema.sql` — structura bazei de date
- `supabase/functions/send-reminders/index.ts` — trimite emailurile de expirare (zilnic)
- `supabase/functions/delete-account/index.ts` — ștergerea contului (GDPR)

Plus: în toate paginile am adăugat automat butonul **Cont / Contul meu** în meniu, iar pe homepage căutările se salvează automat dacă userul e logat.

> ⚠️ Până nu termini pașii de mai jos, paginile de cont vor afișa un mesaj „conturile nu sunt încă configurate". Asta e normal.

---

## Pasul 1 — Creează proiectul Supabase (5 min)

1. Intră pe **https://supabase.com** → **Start your project** → autentifică-te (cu GitHub e cel mai simplu).
2. **New project**. Completează:
   - **Name:** `comparaacum`
   - **Database password:** generează una și salveaz-o undeva sigur.
   - **Region:** alege **Frankfurt (eu-central-1)** sau altă regiune din UE (important pentru GDPR).
3. Apasă **Create new project** și așteaptă ~2 minute să se inițializeze.

## Pasul 2 — Ia cele 2 chei și pune-le în site (3 min)

1. În proiect: meniul din stânga → **Project Settings** (rotița) → **API**.
2. Copiază:
   - **Project URL** (ex: `https://abcd1234.supabase.co`)
   - **Project API keys → anon / public** (un șir lung)
3. Deschide `js/supabase-config.js` și înlocuiește cele două valori:

```js
window.COMPARAACUM_SUPABASE = {
  url:  "https://abcd1234.supabase.co",       // ← Project URL
  anon: "eyJhbGciOiJIUzI1NiIsInR5cCI6..."     // ← cheia anon public
};
```

> Cheia `anon` este publică prin design — nu e o problemă că apare în site. Securitatea reală vine din regulile RLS pe care le activăm la Pasul 3.

## Pasul 3 — Creează tabelele în baza de date (3 min)

1. În Supabase: meniul stâng → **SQL Editor** → **New query**.
2. Deschide fișierul `supabase/schema.sql`, copiază **tot** conținutul și lipește-l în editor.
3. Apasă **Run** (sau Ctrl/Cmd+Enter). Trebuie să apară „Success".

Asta creează tabelele `profiles`, `searches`, `reminders`, `notifications_log`, regulile de securitate (fiecare user își vede doar datele lui) și crearea automată a profilului la înregistrare.

## Pasul 4 — Reglaje de autentificare (5 min)

1. Meniul stâng → **Authentication** → **Sign In / Providers**. **Email** trebuie să fie activat (e implicit).
2. **Authentication → URL Configuration:**
   - **Site URL:** `https://comparaacum.ro`
   - **Redirect URLs:** adaugă `https://comparaacum.ro/contul-meu.html` (și, pentru teste locale, `http://localhost:3000/contul-meu.html` dacă folosești asta).
3. **Confirmarea pe email:** implicit, Supabase cere utilizatorului să confirme emailul printr-un link. E recomandat să o lași pornită. (Authentication → Sign In / Providers → Email → „Confirm email".)

> **Google login (opțional):** dacă vrei butonul „Continuă cu Google" să funcționeze, activează providerul Google din **Authentication → Providers → Google** și urmează instrucțiunile de acolo (necesită un cont Google Cloud). Dacă nu îl configurezi, butonul pur și simplu nu va face nimic util — restul site-ului funcționează normal.

## Pasul 5 — Cont Resend pentru emailuri (7 min)

Notificările de expirare se trimit prin **Resend** (serviciu de email, plan gratuit: 3.000 emailuri/lună).

1. Creează cont pe **https://resend.com**.
2. **API Keys → Create API Key** → copiază cheia (`re_...`). O folosești la Pasul 6.
3. **Domains → Add Domain** → `comparaacum.ro`. Resend îți va da câteva înregistrări **DNS (DKIM/SPF)** pe care le adaugi în **Cloudflare** (Dashboard Cloudflare → comparaacum.ro → DNS → Add record). După verificare, vei putea trimite de pe o adresă gen `notificari@comparaacum.ro`.

> Până verifici domeniul, poți testa folosind adresa de probă pusă la dispoziție de Resend (`onboarding@resend.dev`), dar pentru producție folosește domeniul tău.

## Pasul 6 — Publică funcțiile de email (10 min)

Funcțiile rulează pe serverele Supabase („Edge Functions"). Ai nevoie de **Supabase CLI**.

**a) Instalează CLI** (o singură dată):
- Cu npm: `npm install -g supabase`
- Verifică: `supabase --version`

**b) Conectează-te la proiect** (dintr-un terminal, în folderul `compara-v18`):
```bash
supabase login
supabase link --project-ref ABCD1234     # „project ref" = partea din URL: https://ABCD1234.supabase.co
```

**c) Setează secretele** (cheile pe care funcția le folosește):
```bash
supabase secrets set RESEND_API_KEY=re_cheia_ta_de_la_resend
supabase secrets set FROM_EMAIL="ComparaAcum <notificari@comparaacum.ro>"
```
(`SUPABASE_URL` și `SUPABASE_SERVICE_ROLE_KEY` sunt setate automat — nu le adăuga manual.)

**d) Publică ambele funcții:**
```bash
supabase functions deploy send-reminders
supabase functions deploy delete-account
```

## Pasul 7 — Programează verificarea zilnică (5 min)

Vrem ca `send-reminders` să ruleze automat în fiecare zi (ex. la 9:00).

1. Supabase → **SQL Editor** → New query. Rulează o singură dată (activează extensiile de programare):
```sql
create extension if not exists pg_cron;
create extension if not exists pg_net;
```
2. Apoi programează apelul zilnic. **Înlocuiește** `ABCD1234` cu project ref-ul tău și `CHEIA_ANON` cu cheia anon public:
```sql
select cron.schedule(
  'send-reminders-daily',
  '0 9 * * *',           -- în fiecare zi la 09:00 UTC
  $$
  select net.http_post(
    url:='https://ABCD1234.supabase.co/functions/v1/send-reminders',
    headers:='{"Authorization":"Bearer CHEIA_ANON","Content-Type":"application/json"}'::jsonb
  );
  $$
);
```

Gata — în fiecare zi funcția verifică toate mementourile și trimite email celor cu contracte care expiră în 30, 7 sau 1 zi.

> **Test rapid:** poți apela funcția manual din Supabase → Edge Functions → `send-reminders` → **Invoke**, sau adăugând în contul tău un memento cu data de expirare exact peste 30 / 7 / 1 zile și apoi invocând funcția.

## Pasul 8 — Urcă site-ul și testează (5 min)

1. Urcă folderul actualizat pe GitHub (fluxul tău obișnuit) → Cloudflare Pages publică automat.
2. **Purge Everything** în Cloudflare → deschide site-ul în incognito.
3. Verifică, în ordine:
   - Apare butonul **👤 Cont** în meniu.
   - Pe `/cont.html` îți creezi un cont, primești emailul de confirmare, confirmi, te loghezi.
   - În meniu apare acum **Contul meu** cu inițialele tale.
   - Faci o comparație pe homepage → apare în „Istoricul căutărilor".
   - Adaugi un memento (ex. RCA cu dată de expirare) → apare în listă cu zilele rămase.
   - Butoanele „Descarcă-mi datele" și „Șterge-mi contul" funcționează.

---

## Cum funcționează (pe scurt)

- **Conturi:** Supabase Auth gestionează parolele (criptate) și sesiunile. Tu nu vezi niciodată parolele.
- **Datele userului:** stocate în tabelele tale, cu RLS — fiecare utilizator poate citi/scrie DOAR rândurile lui. Cheia anon din site nu permite accesul la datele altcuiva.
- **Notificări:** o funcție rulează zilnic, calculează câte zile mai sunt până la expirare și trimite email prin Resend la pragurile alese (30/7/1 zile). Un memento nu primește de două ori același prag (câmpul `last_notified_window`).
- **GDPR:** consimțământ explicit la înregistrare, politică de confidențialitate, export date și ștergere completă a contului.

## De completat înainte de lansarea reală

- În `politica-confidentialitate.html`: datele operatorului (denumire SRL, CUI, sediu). Le adaugi după ce înființezi societatea.
- Personalizează textul emailurilor de sistem din Supabase (Authentication → Email Templates) în limba română.
- Opțional: leagă și emailurile de confirmare/resetare prin Resend (SMTP custom) pentru un branding consistent.

## Probleme frecvente

- **„Conturile nu sunt încă configurate"** → cheile din `js/supabase-config.js` lipsesc sau sunt încă cele de tip `INLOCUIESTE...`.
- **Nu primesc emailul de confirmare** → verifică folderul Spam; pentru producție, confirmă domeniul în Resend și setează SMTP custom în Supabase.
- **Notificările nu pleacă** → verifică `RESEND_API_KEY`, că domeniul e verificat în Resend, și log-ul funcției în Supabase → Edge Functions → send-reminders → Logs.
- **„new row violates row-level security"** → asigură-te că ai rulat tot `schema.sql` (inclusiv policy-urile).
