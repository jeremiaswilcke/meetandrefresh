-- Meet & Refresh — Initial Schema
-- Ausführen im Supabase SQL Editor.

-- === 1. Profile (erweitert auth.users) ===
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Automatisches Anlegen eines Profils beim Auth-Signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- === 2. Registrations (oeffentliches Buchungsformular) ===
-- Nicht jeder, der sich anmeldet, muss gleich Account haben.
-- user_id bleibt null, bis das passende Konto das Registrations-Row
-- beansprucht (via Supabase Service-Role Code oder manuelles Linking).

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  event_slug text not null,
  user_id uuid references auth.users(id) on delete set null,
  full_name text not null,
  email text not null,
  phone text,
  package_slug text not null,                   -- legacy/kompatibel: room_type
  workshop_round_1 text,                        -- legacy: Workshops werden nicht mehr vorab gebucht
  workshop_round_2 text,
  room_type text not null default 'double_unknown'
    check (room_type in ('single', 'double_known', 'double_unknown', 'multi')),
  room_variant text check (room_variant is null or room_variant in ('3', '4')),
  roommate_name text,
  matching_code text,
  group_members jsonb not null default '[]'::jsonb,
  dietary_notes text,
  privacy_accepted boolean not null default false,
  status text not null default 'pending_match'
    check (status in (
      'pending',
      'confirmed',
      'pending_match',
      'waiting_for_roommate',
      'matched',
      'payment_requested',
      'paid',
      'payment_failed',
      'cancelled'
    )),
  payment_status text not null default 'not_requested'
    check (payment_status in ('not_requested', 'open', 'paid', 'failed')),
  stripe_checkout_session_id text,
  participant_token text not null default gen_random_uuid()::text,
  amount_cents integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists registrations_event_slug_idx on public.registrations(event_slug);
create index if not exists registrations_email_idx on public.registrations(email);
create index if not exists registrations_user_id_idx on public.registrations(user_id) where user_id is not null;
create index if not exists registrations_room_status_idx on public.registrations(room_type, status);
create unique index if not exists registrations_participant_token_idx on public.registrations(participant_token);

create table if not exists public.room_inventory (
  id uuid primary key default gen_random_uuid(),
  room_type text not null unique,
  total_capacity integer not null,
  booked_count integer not null default 0,
  reserved_count integer not null default 0,
  created_at timestamptz not null default now()
);

insert into public.room_inventory (room_type, total_capacity, booked_count, reserved_count)
values ('single', 12, 0, 0)
on conflict (room_type) do nothing;

create table if not exists public.room_matches (
  id uuid primary key default gen_random_uuid(),
  booking_ids jsonb not null,
  room_type text not null,
  match_status text not null default 'matched',
  created_at timestamptz not null default now()
);

create or replace function public.reserve_single_room()
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  updated_count integer;
begin
  update public.room_inventory
  set reserved_count = reserved_count + 1
  where room_type = 'single'
    and (booked_count + reserved_count) < total_capacity;

  get diagnostics updated_count = row_count;
  return updated_count = 1;
end;
$$;

-- === 3. RLS ===
alter table public.profiles enable row level security;
alter table public.registrations enable row level security;
alter table public.room_inventory enable row level security;
alter table public.room_matches enable row level security;

-- Profile: Nutzer:in sieht und editiert nur das eigene Profil
drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own on public.profiles
  for select using (auth.uid() = id);

drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- Registrations: Jede:r darf per Formular anlegen (auch ohne Login).
-- Abrufen darf nur der/die eigene Registrierung (per user_id oder per E-Mail-Match).
drop policy if exists registrations_insert_public on public.registrations;
create policy registrations_insert_public on public.registrations
  for insert with check (true);

drop policy if exists registrations_select_own on public.registrations;
create policy registrations_select_own on public.registrations
  for select using (
    auth.uid() = user_id
    or auth.uid() is not null and email = (select email from auth.users where id = auth.uid())
  );

-- === 4. updated_at Trigger ===
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_touch on public.profiles;
create trigger profiles_touch
  before update on public.profiles
  for each row execute procedure public.touch_updated_at();

drop trigger if exists registrations_touch on public.registrations;
create trigger registrations_touch
  before update on public.registrations
  for each row execute procedure public.touch_updated_at();
