# Ghid — „Chat cu Bruno" (agent AI gratuit pe Cloudflare Workers AI)

Un asistent AI în colțul site-ului, alimentat de **Cloudflare Workers AI** (gratuit din alocația zilnică de 10.000 „neuroni"). Cheia AI nu apare nicăieri în site — totul rulează pe server, la Cloudflare.

## Ce am adăugat
- `functions/api/chat.js` — funcția de server (Cloudflare Pages Function) care vorbește cu modelul AI. Are guardrails: Bruno explică și ghidează, dar NU dă sfaturi financiare personalizate și NU inventează prețuri.
- `js/bruno-chat.js` — widget-ul (buton flotant + panou de chat), în stilul site-ului, RO + EN, cu limită de 25 de mesaje/zi per vizitator.
- Scriptul a fost injectat în toate paginile.

## Pas 1 — Urcă folderul (ca de obicei)
GitHub → Cloudflare Pages publică automat. Folderul include acum și directorul `functions/` — Cloudflare Pages îl detectează singur ca „Pages Functions".

## Pas 2 — Activează binding-ul Workers AI (o singură dată)
Fără acest pas, chat-ul va afișa „Asistentul nu este încă activat".

1. Cloudflare Dashboard → **Workers & Pages** → proiectul tău (ComparaAcum).
2. **Settings** → **Functions** (sau **Bindings**) → secțiunea **Bindings** → **Add binding**.
3. Alege tipul **Workers AI**.
4. La **Variable name** scrie exact: `AI`
5. **Save**.

> Dacă ai și un mediu de „Preview" separat, adaugă binding-ul și acolo, nu doar pe „Production".

## Pas 3 — Redeploy
După ce adaugi un binding, declanșează o publicare nouă ca să intre în vigoare:
- fie faci un push nou pe GitHub,
- fie în Cloudflare Pages → **Deployments** → **Retry deployment** / **Create deployment**.

## Pas 4 — Test
1. Cloudflare → **Purge Everything**.
2. Deschide site-ul în incognito → apare butonul **„Chat cu Bruno"** dreapta-jos.
3. Întreabă ceva: „Ce înseamnă franciza?", „Cum funcționează comparația?", „Ce e bonus-malus?".

## Cum funcționează & costuri
- Model: `@cf/meta/llama-3.1-8b-instruct` (rapid, ieftin în neuroni).
- Gratuit: 10.000 neuroni/zi incluși în planul Workers Free. Un mesaj scurt consumă puțin, deci acoperi zeci–sute de conversații/zi fără cost.
- Protecție: limită de 25 mesaje/zi per vizitator (în `js/bruno-chat.js`, poți schimba `DAILY_LIMIT`). Așa, chiar dacă vine trafic mare, nu depășești ușor alocația.
- Dacă atingi totuși plafonul zilnic, Bruno răspunde „momentan nu pot răspunde" până a doua zi. Nicio taxă neașteptată pe planul Free.

## Cum ajustezi
- **Personalitatea / regulile lui Bruno:** editează `SYSTEM_PROMPT` din `functions/api/chat.js`.
- **Limita per user:** `DAILY_LIMIT` din `js/bruno-chat.js`.
- **Alt model:** schimbă numele modelului în `functions/api/chat.js` (listă: Cloudflare → Workers AI → Models).

## Idei de întărire (mai târziu, opțional)
- Limită pe server (nu doar în browser) folosind Cloudflare KV, ca protecție împotriva abuzului.
- Restrângere doar la utilizatori logați.
- „Grounding" pe conținutul tău (blog/FAQ) pentru răspunsuri și mai precise.
