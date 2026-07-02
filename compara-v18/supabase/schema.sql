-- ═══════════════════════════════════════════════════════════
-- ComparaAcum.ro — Schema bazei de date (Supabase / PostgreSQL)
-- Rulează acest fișier o singură dată în: Supabase → SQL Editor → New query
-- ═══════════════════════════════════════════════════════════

-- ── 1. PROFILES ────────────────────────────────────────────
-- Un rând per utilizator, legat de auth.users
create table if not exists public.profiles (
  id                uuid primary key references auth.users(id) on delete cascade,
  full_name         text,
  marketing_consent boolean not null default false,
  created_at        timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- Creează automat profilul la înregistrare
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, marketing_consent)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce((new.raw_user_meta_data->>'marketing_consent')::boolean, false)
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- ── 2. SEARCHES (istoric căutări) ──────────────────────────
create table if not exists public.searches (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  category   text not null,            -- rca, casco, casa, sanatate, energie, gaze, internet, tv
  params     jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists searches_user_idx on public.searches(user_id, created_at desc);

alter table public.searches enable row level security;

drop policy if exists "searches_all_own" on public.searches;
create policy "searches_all_own" on public.searches
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);


-- ── 3. REMINDERS (contracte cu date de expirare) ───────────
create table if not exists public.reminders (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users(id) on delete cascade,
  type           text not null,        -- rca, casco, casa, sanatate, energie, gaze, internet, tv
  provider       text,
  policy_number  text,
  expiry_date    date not null,
  notify_30      boolean not null default true,
  notify_7       boolean not null default true,
  notify_1       boolean not null default true,
  last_notified_at timestamptz,        -- ultima notificare trimisă (anti-duplicat)
  last_notified_window int,            -- 30 / 7 / 1: ce prag a fost notificat ultima dată
  created_at     timestamptz not null default now()
);

create index if not exists reminders_user_idx on public.reminders(user_id);
create index if not exists reminders_expiry_idx on public.reminders(expiry_date);

alter table public.reminders enable row level security;

drop policy if exists "reminders_all_own" on public.reminders;
create policy "reminders_all_own" on public.reminders
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);


-- ── 4. NOTIFICATIONS LOG (audit, opțional dar util) ────────
create table if not exists public.notifications_log (
  id          uuid primary key default gen_random_uuid(),
  reminder_id uuid references public.reminders(id) on delete set null,
  user_id     uuid,
  email       text,
  window_days int,
  sent_at     timestamptz not null default now(),
  status      text default 'sent'
);
-- Fără policy de SELECT pentru utilizatori: tabel doar pentru server (service role).
alter table public.notifications_log enable row level security;
