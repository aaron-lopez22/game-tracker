-- Hearth Phase 2 migration: Top lists + profile layout.
-- Run this by hand in the Supabase SQL Editor. Safe to run more than once.

-- 1. Top lists: one row per game per list
create table if not exists public.top_entries (
  id          uuid primary key default gen_random_uuid(),
  profile_id  text not null references public.profiles(id) on delete cascade,
  list_type   text not null check (list_type in ('all_time', 'year')),
  year        smallint,
  game_id     bigint not null references public.games(id) on delete cascade,
  position    smallint not null check (position between 1 and 10),
  created_at  timestamptz not null default now(),
  -- all_time lists have no year; year lists must have one
  constraint top_entries_year_matches_type check (
    (list_type = 'all_time' and year is null) or
    (list_type = 'year' and year is not null)
  ),
  -- a game can't appear twice in the same list (but can be in both lists)
  constraint top_entries_one_game_per_list
    unique nulls not distinct (profile_id, list_type, year, game_id)
);

create index if not exists top_entries_list_idx
  on public.top_entries (profile_id, list_type, year, position);

-- 2. Row Level Security: open access for dev mode (no auth yet), same as profiles
alter table public.top_entries enable row level security;

drop policy if exists "top_entries dev open access" on public.top_entries;
create policy "top_entries dev open access" on public.top_entries
  for all to anon, authenticated
  using (true) with check (true);

-- 3. Backfill: copy existing games.rank (1-10) into the All-Time list for 'me'.
-- Only runs if 'me' has no All-Time entries yet, so re-running this file
-- won't undo changes made in the app.
insert into public.top_entries (profile_id, list_type, year, game_id, position)
select 'me', 'all_time', null, g.id, g.rank
from public.games g
where g.rank between 1 and 10
  and exists (select 1 from public.profiles where id = 'me')
  and not exists (
    select 1 from public.top_entries
    where profile_id = 'me' and list_type = 'all_time'
  )
on conflict do nothing;

-- 4. Profile widget layout (used in stage 2; null means "use the default")
alter table public.profiles add column if not exists layout jsonb;
