# Ghid: API oferte + tracking click-uri (Etapele 1 & 2)

Codul e gata în repo. Ca să devină funcțional pe site-ul live, sunt exact **3 pași**:

## Pasul 1 — Rulează SQL-ul în Supabase (~2 min)
1. Deschide Supabase → proiectul tău → **SQL Editor** → New query.
2. Copiază tot conținutul din `supabase/offers-clicks.sql` și apasă **Run**.
3. Verificare: Table Editor → tabelul `offers` trebuie să aibă **25 de rânduri**.
   (Scriptul e sigur de re-rulat — face upsert, nu dublează.)

## Pasul 2 — Copiază funcțiile la rădăcina repo-ului (~2 min)
Cloudflare Pages citește folderul `functions/` doar de la **rădăcina repo-ului GitHub**
(exact ca la chat-ul Bruno — `comparaacum-site/functions/api/chat.js`).

Copiază din `compara-v18/functions/api/` în `functions/api/` de la rădăcină:
- `offers.js`
- `go/[id].js`  (atenție: în folderul `go`, cu paranteze pătrate în nume)

Apoi commit + push → Cloudflare redeployează automat.

## Pasul 3 — Adaugă cheia secretă în Cloudflare (~2 min)
1. Supabase → Settings → API → copiază cheia **service_role** (cea SECRETĂ, nu anon).
2. Cloudflare → **Workers & Pages** → proiectul tău → **Settings** → secțiunea
   **Variables and Secrets** → **Add**: Type **Secret**, Variable name `SUPABASE_SERVICE_KEY`,
   Value = cheia copiată, Environment **Production** → Save.
   (Nu confunda cu secțiunea Bindings — acolo e binding-ul AI al chat-ului Bruno.)
3. Redeploy (Deployments → Retry deployment) ca variabila să fie preluată.

## Verificare finală
- `https://comparaacum.ro/api/offers?cat=energie` → trebuie să afișeze JSON cu 10 oferte.
- Deschide pagina de energie, apasă „Vezi oferta furnizorului" → ajungi la furnizor,
  iar în Supabase → Table Editor → `clicks` apare un rând nou.
- Statistici pentru parteneri: SQL Editor → `select * from clicks_stats;`

## Cum funcționează de acum
- Paginile de comparare încarcă ofertele din `/api/offers` (baza de date), cu **fallback
  automat** la datele din fișierele JS dacă API-ul nu răspunde — site-ul nu pică niciodată.
- **Actualizarea lunară a prețurilor** se face direct în Supabase (Table Editor → offers →
  editezi `data`/`verified_at`), FĂRĂ push pe GitHub. Fișierele JS rămân doar ca plasă de siguranță.
- Fiecare click pe o ofertă trece prin `/api/go/<id>` și e înregistrat (dată, categorie,
  țară, sursă) — cifrele pe care le arăți furnizorilor la negocieri.
