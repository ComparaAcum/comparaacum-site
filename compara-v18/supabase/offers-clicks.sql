-- ═══════════════════════════════════════════════════════════
-- ComparaAcum.ro — Oferte + tracking click-uri (Etapele 1 & 2)
-- Rulează în Supabase: SQL Editor → New query → Run
-- Sigur de re-rulat (idempotent): upsert pe id.
-- ═══════════════════════════════════════════════════════════

-- 1. Tabelul de oferte (sursa unică de adevăr pentru paginile de comparare)
create table if not exists public.offers (
  id          text primary key,
  category    text not null check (category in ('energie','gaze','internet','tv')),
  sort_order  int  not null default 100,
  active      boolean not null default true,
  url         text not null,
  data        jsonb not null,      -- obiectul exact pe care îl randază front-end-ul
  verified_at date,
  updated_at  timestamptz not null default now()
);

alter table public.offers enable row level security;
drop policy if exists offers_public_read on public.offers;
create policy offers_public_read on public.offers
  for select using (active = true);
-- scrierea: doar cu service_role (dashboard / API server-side); nicio politică de insert/update pentru anon

-- 2. Tabelul de click-uri (dovada de trafic pentru parteneri)
create table if not exists public.clicks (
  id         bigint generated always as identity primary key,
  offer_id   text not null references public.offers(id),
  category   text,
  ts         timestamptz not null default now(),
  referer    text,
  lang       text,
  country    text,
  ua         text
);
alter table public.clicks enable row level security;
-- fără politici: anon nu poate citi/scrie; funcția /api/go scrie cu service_role

-- 3. Statistici rapide (rulează manual în SQL Editor când ai nevoie de cifre)
create or replace view public.clicks_stats as
  select o.category, c.offer_id, (o.data->>'provider') as provider,
         count(*) as total_clicks,
         count(*) filter (where c.ts > now() - interval '30 days') as clicks_30d,
         max(c.ts) as last_click
  from public.clicks c join public.offers o on o.id = c.offer_id
  group by o.category, c.offer_id, o.data->>'provider'
  order by total_clicks desc;
revoke all on public.clicks_stats from anon, authenticated;

-- 4. Datele actuale (seed) — upsert
insert into public.offers (id, category, sort_order, active, url, data, verified_at) values
('en-hidro-viitor','energie',10,true,'https://client.hidroelectrica.ro/contractare','{"provider": "Hidroelectrica", "offer": "Viitor Hidro", "price": 1.06, "zones": {"muntenia": 1.06, "oltenia": 1.09, "transilvania": 1.11, "moldova": 1.14}, "term": "12 luni", "termEn": "12 months", "green": true, "greenLabel": "Energie hidro", "greenLabelEn": "Hydro energy", "features": ["Preț fix 12 luni", "Producător de stat", "Factură online"], "featuresEn": ["Fixed price 12 months", "State-owned producer", "Online billing"], "badge": "Cel mai mic preț", "badgeEn": "Lowest price"}'::jsonb,'2026-07-01'),
('en-nova-fix3','energie',20,true,'https://vreaulanova.ro/oferte','{"provider": "Nova Power & Gas", "offer": "Nova Preț fix 3 luni", "price": 1.17, "term": "3 luni", "termEn": "3 months", "features": ["Preț fix 3 luni", "Contract scurt", "Contractare online"], "featuresEn": ["Fixed price 3 months", "Short contract", "Online sign-up"]}'::jsonb,'2026-07-01'),
('en-ppc-fix-online','energie',30,true,'https://www.ppcenergy.ro/energie-electrica/','{"provider": "PPC Energie", "offer": "PPC Fix Online", "price": 1.19, "term": "12 luni", "termEn": "12 months", "features": ["Preț fix 12 luni", "App MyPPC", "Contractare online"], "featuresEn": ["Fixed price 12 months", "MyPPC app", "Online sign-up"]}'::jsonb,'2026-07-01'),
('en-ppc-fix-verde','energie',40,true,'https://www.ppcenergy.ro/energie-electrica/','{"provider": "PPC Energie", "offer": "PPC Fix Verde", "price": 1.24, "term": "12 luni", "termEn": "12 months", "green": true, "greenLabel": "Verde 100%", "greenLabelEn": "100% green", "features": ["Preț fix 12 luni", "Energie verde certificată"], "featuresEn": ["Fixed price 12 months", "Certified green energy"]}'::jsonb,'2026-07-01'),
('en-nova-fix12','energie',50,true,'https://vreaulanova.ro/oferte','{"provider": "Nova Power & Gas", "offer": "Nova Preț fix 12 luni", "price": 1.27, "term": "12 luni", "termEn": "12 months", "features": ["Preț fix 12 luni", "Contractare online"], "featuresEn": ["Fixed price 12 months", "Online sign-up"]}'::jsonb,'2026-07-01'),
('en-ppc-bluepass','energie',60,true,'https://www.ppcenergy.ro/energie-electrica/','{"provider": "PPC Energie", "offer": "PPC Energie bluePASS", "price": 1.28, "term": "12 luni", "termEn": "12 months", "green": true, "greenLabel": "Verde 100%", "greenLabelEn": "100% green", "features": ["Preț fix 12 luni", "Energie verde"], "featuresEn": ["Fixed price 12 months", "Green energy"]}'::jsonb,'2026-07-01'),
('en-eon-casa-fix','energie',70,true,'https://www.eon.ro/','{"provider": "E.ON Energie România", "offer": "Casa Mea Fix", "price": 1.33, "term": "12 luni", "termEn": "12 months", "features": ["Preț fix 12 luni", "Factură online", "Suport E.ON Myline"], "featuresEn": ["Fixed price 12 months", "Online billing", "E.ON Myline support"]}'::jsonb,'2026-07-01'),
('en-ppc-relaxat','energie',80,true,'https://www.ppcenergy.ro/energie-electrica/','{"provider": "PPC Energie", "offer": "PPC Relaxat", "price": 1.36, "term": "12 luni", "termEn": "12 months", "features": ["Preț fix 12 luni", "Fără angajament online"], "featuresEn": ["Fixed price 12 months", "No online commitment"]}'::jsonb,'2026-07-01'),
('en-engie-fix','energie',90,true,'https://www.engie.ro/electricitate/','{"provider": "Engie România", "offer": "Engie Fix Acasă", "price": 1.37, "term": "până la 30 sept. 2026", "termEn": "until 30 Sep 2026", "features": ["Preț fix", "Factură online"], "featuresEn": ["Fixed price", "Online billing"]}'::jsonb,'2026-07-01'),
('en-electrica-casa','energie',100,true,'https://www.electricafurnizare.ro/','{"provider": "Electrica Furnizare", "offer": "Electrica Casa", "price": 1.45, "term": "nedeterminat", "termEn": "open-ended", "features": ["Preț valabil până la 31 dec. 2026"], "featuresEn": ["Price valid until 31 Dec 2026"]}'::jsonb,'2026-07-01'),
('gz-nova-fix12','gaze',10,true,'https://vreaulanova.ro/oferte','{"provider": "Nova Power & Gas", "offer": "Nova Casnic preț fix 12 luni", "price": 0.3, "approx": true, "note": "conform datelor ANRE (apr. 2026)", "noteEn": "per ANRE data (Apr 2026)", "term": "12 luni", "termEn": "12 months", "badge": "Printre cele mai ieftine", "badgeEn": "Among the cheapest"}'::jsonb,'2026-07-01'),
('gz-eon-standard','gaze',20,true,'https://www.eon.ro/','{"provider": "E.ON Energie România", "offer": "Pachetul Standard Gaz", "price": 0.31, "capped": true, "term": "nedeterminat", "termEn": "open-ended"}'::jsonb,'2026-07-01'),
('gz-ppc-easy','gaze',30,true,'https://www.ppcenergy.ro/gaze-naturale/','{"provider": "PPC Energie", "offer": "PPC Gaz Easy", "price": 0.31, "capped": true, "term": "12 luni", "termEn": "12 months"}'::jsonb,'2026-07-01'),
('gz-engie','gaze',40,true,'https://www.engie.ro/gaze-naturale/','{"provider": "Engie România", "offer": "Oferte gaze Engie", "price": 0.31, "capped": true, "term": "12 luni", "termEn": "12 months"}'::jsonb,'2026-07-01'),
('gz-premier','gaze',50,true,'https://premierenergy.ro/','{"provider": "Premier Energy", "offer": "Ofertă gaze casnic", "price": 0.31, "capped": true, "term": "12 luni", "termEn": "12 months"}'::jsonb,'2026-07-01'),
('gz-electrica-stabil','gaze',60,true,'https://www.electricafurnizare.ro/','{"provider": "Electrica Furnizare", "offer": "Gaz Stabil", "price": 0.31, "capped": true, "term": "nedeterminat", "termEn": "open-ended"}'::jsonb,'2026-07-01'),
('net-digi-500','internet',10,true,'https://www.digi.ro/servicii/internet/internet-fix','{"provider": "Digi (RCS & RDS)", "offer": "FiberLink 500", "price": 30, "down": "500 Mbps", "up": "250 Mbps", "features": ["Fibră optică FTTH", "Router Wi-Fi inclus", "Fără costuri de instalare"], "featuresEn": ["FTTH optical fibre", "Wi-Fi router included", "No installation fees"], "badge": "Cel mai mic preț", "badgeEn": "Lowest price"}'::jsonb,'2026-07-08'),
('net-digi-1000','internet',20,true,'https://www.digi.ro/servicii/internet/internet-fix','{"provider": "Digi (RCS & RDS)", "offer": "FiberLink 1000", "price": 40, "down": "940 Mbps", "up": "450 Mbps", "features": ["Fibră optică FTTH", "Router Wi-Fi 6", "Ideal pentru familii"], "featuresEn": ["FTTH optical fibre", "Wi-Fi 6 router", "Great for families"]}'::jsonb,'2026-07-08'),
('net-digi-10g','internet',30,true,'https://www.digi.ro/servicii/internet/internet-fix','{"provider": "Digi (RCS & RDS)", "offer": "FiberLink 2.5G / 10G", "price": 50, "from": true, "down": "2,5–10 Gbps", "up": "—", "features": ["Doar în orașele mari", "Necesită echipamente compatibile"], "featuresEn": ["Big cities only", "Requires compatible equipment"]}'::jsonb,'2026-07-08'),
('net-orange-1000','internet',40,true,'https://www.orange.ro/internet/abonament-home-net-fibra/','{"provider": "Orange", "offer": "Home Net 1000", "price": 55, "euro": "11 €", "down": "1000 Mbps", "up": "500 Mbps", "features": ["Router Wi-Fi inclus", "Reduceri la pachet cu mobil/TV"], "featuresEn": ["Wi-Fi router included", "Discounts when bundled with mobile/TV"]}'::jsonb,'2026-07-08'),
('net-vodafone-1g','internet',50,true,'https://www.vodafone.ro/serviciifixe/internet','{"provider": "Vodafone", "offer": "Internet fix până la 1 Gbps", "price": 25, "from": true, "euro": "de la 4,9 €", "euroEn": "from €4.9", "down": "până la 1 Gbps", "downEn": "up to 1 Gbps", "up": "—", "cond": "preț condiționat: pentru clienții cu abonament mobil Vodafone; ofertele standard diferă", "condEn": "conditional price: for customers with a Vodafone mobile plan; standard offers differ", "features": ["Router Wi-Fi inclus", "Promoții pentru clienții de mobil"], "featuresEn": ["Wi-Fi router included", "Promos for mobile customers"]}'::jsonb,'2026-07-08'),
('tv-digi-digital','tv',10,true,'https://www.digi.ro/servicii/televiziune','{"provider": "Digi (RCS & RDS)", "offer": "Digi TV Digital (cablu)", "price": 30, "tech": "Cablu digital", "techEn": "Digital cable", "features": ["180+ canale", "60+ canale HD", "3 canale 4K", "Decodor/CI+ inclus"], "featuresEn": ["180+ channels", "60+ HD channels", "3 4K channels", "Decoder/CI+ included"], "badge": "Cel mai bun raport preț/canale", "badgeEn": "Best price per channel"}'::jsonb,'2026-07-08'),
('tv-digi-satelit','tv',20,true,'https://www.digi.ro/servicii/televiziune','{"provider": "Digi (RCS & RDS)", "offer": "Digi TV Satelit (DTH)", "price": 25, "from": true, "tech": "Satelit", "techEn": "Satellite", "features": ["Pentru zone fără fibră", "Grilă mai restrânsă decât pe cablu"], "featuresEn": ["For areas without fibre", "Smaller channel line-up than cable"]}'::jsonb,'2026-07-08'),
('tv-focussat','tv',30,true,'https://www.focussat.ro/','{"provider": "Focus Sat", "offer": "Pachet standard satelit", "price": 44, "tech": "Satelit", "techEn": "Satellite", "features": ["Acoperire națională prin satelit", "TV online inclus în UE"], "featuresEn": ["Nationwide satellite coverage", "Online TV included in the EU"]}'::jsonb,'2026-07-08'),
('tv-orange-home','tv',40,true,'https://www.orange.ro/tv/abonament-tv-satelit/','{"provider": "Orange", "offer": "Home TV (cablu / satelit)", "price": 0, "quote": true, "tech": "Cablu / Satelit", "techEn": "Cable / Satellite", "features": ["Reduceri la pachet cu Home Net", "Până la 3 receivere suplimentare"], "featuresEn": ["Discounts bundled with Home Net", "Up to 3 extra receivers"]}'::jsonb,'2026-07-08')
on conflict (id) do update set
  category=excluded.category, sort_order=excluded.sort_order, active=excluded.active,
  url=excluded.url, data=excluded.data, verified_at=excluded.verified_at, updated_at=now();

-- Actualizare lunară a prețurilor: UPDATE public.offers SET data = jsonb_set(data,'{price}','1.08'), verified_at='2026-08-01', updated_at=now() WHERE id='en-hidro-viitor';
-- Dezactivare ofertă expirată: UPDATE public.offers SET active=false WHERE id='...';
