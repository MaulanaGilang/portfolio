-- The Long Table (guestbook) for /offline, in the Supabase project "portfolio-guestbook".
-- Applied as the migration "create_guestbook". Kept here as the record of the rules.
--
-- The public (anon / publishable key) may only add notes, which always start
-- unapproved, and may only read approved notes. Approving, editing and deleting
-- happen in the Supabase dashboard: Table Editor > guestbook > tick "approved".

create table public.guestbook (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null check (char_length(btrim(name)) between 1 and 40),
  message text not null check (char_length(btrim(message)) between 1 and 280),
  recommendation text check (recommendation is null or char_length(recommendation) <= 80),
  approved boolean not null default false,
  -- salted hash of the sender's IP, only used to slow down repeat posting; never shown
  ip_hash text check (ip_hash is null or char_length(ip_hash) <= 128)
);

create index guestbook_approved_created on public.guestbook (approved, created_at desc);
create index guestbook_ip_recent on public.guestbook (ip_hash, created_at desc);

alter table public.guestbook enable row level security;

-- Column-level: the public may only supply these four fields; id, created_at and approved come from defaults.
revoke all on public.guestbook from anon, authenticated;
grant select (id, created_at, name, message, recommendation, approved) on public.guestbook to anon, authenticated;
grant insert (name, message, recommendation, ip_hash) on public.guestbook to anon, authenticated;

-- One note per sender every 2 minutes, and at most 20 notes site-wide per hour.
create or replace function public.guestbook_can_post(p_ip_hash text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select
    (p_ip_hash is null or not exists (
      select 1 from public.guestbook g
      where g.ip_hash = p_ip_hash and g.created_at > now() - interval '2 minutes'
    ))
    and (select count(*) from public.guestbook g where g.created_at > now() - interval '1 hour') < 20;
$$;
revoke all on function public.guestbook_can_post(text) from public;
grant execute on function public.guestbook_can_post(text) to anon, authenticated;

create policy "read approved notes" on public.guestbook
  for select to anon, authenticated
  using (approved);

create policy "add an unapproved note" on public.guestbook
  for insert to anon, authenticated
  with check (approved = false and public.guestbook_can_post(ip_hash));
