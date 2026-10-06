create table public.site_settings (
  id smallint primary key default 1,
  company_name text not null,
  domain text not null,
  email text not null,
  legal_line text not null,
  meta_title text not null,
  meta_description text not null,
  constraint site_settings_singleton check (id = 1)
);

create table public.hero (
  id smallint primary key default 1,
  eyebrow text not null,
  headline text not null,
  subhead text not null,
  primary_cta_label text not null,
  primary_cta_href text not null,
  secondary_cta_label text not null,
  secondary_cta_href text not null,
  audio_url text not null,
  narration text not null,
  beats jsonb not null,
  constraint hero_singleton check (id = 1)
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  sort integer not null,
  name text not null,
  summary text not null,
  outcome text not null,
  stack text not null,
  status text not null,
  theme text not null default 'light' check (theme in ('light', 'dark')),
  image_url text,
  image_alt text not null default '',
  metric_label text not null default '',
  metric_value text not null default '',
  published boolean not null default true
);

create table public.services (
  id uuid primary key default gen_random_uuid(),
  sort integer not null,
  title text not null,
  outcome text not null,
  details text[] not null default '{}',
  published boolean not null default true
);

create table public.steps (
  id uuid primary key default gen_random_uuid(),
  sort integer not null,
  title text not null,
  body text not null,
  published boolean not null default true
);

create table public.proof_items (
  id uuid primary key default gen_random_uuid(),
  sort integer not null,
  kind text not null check (kind in ('logo', 'metric', 'quote')),
  label text not null default '',
  value text not null default '',
  quote text not null default '',
  person text not null default '',
  role text not null default '',
  is_placeholder boolean not null default true,
  published boolean not null default true
);

create table public.faqs (
  id uuid primary key default gen_random_uuid(),
  sort integer not null,
  question text not null,
  answer text not null,
  published boolean not null default true
);

create table public.engagements (
  id uuid primary key default gen_random_uuid(),
  sort integer not null,
  title text not null,
  body text not null,
  published boolean not null default true
);

create table public.section_copy (
  key text primary key,
  heading text not null,
  body text not null default ''
);

alter table public.site_settings enable row level security;
alter table public.hero enable row level security;
alter table public.products enable row level security;
alter table public.services enable row level security;
alter table public.steps enable row level security;
alter table public.proof_items enable row level security;
alter table public.faqs enable row level security;
alter table public.engagements enable row level security;
alter table public.section_copy enable row level security;

create policy site_settings_public_read on public.site_settings for select to anon, authenticated using (true);
create policy hero_public_read on public.hero for select to anon, authenticated using (true);
create policy products_public_read on public.products for select to anon, authenticated using (published = true);
create policy services_public_read on public.services for select to anon, authenticated using (published = true);
create policy steps_public_read on public.steps for select to anon, authenticated using (published = true);
create policy proof_items_public_read on public.proof_items for select to anon, authenticated using (published = true);
create policy faqs_public_read on public.faqs for select to anon, authenticated using (published = true);
create policy engagements_public_read on public.engagements for select to anon, authenticated using (published = true);
create policy section_copy_public_read on public.section_copy for select to anon, authenticated using (true);

revoke insert, update, delete, truncate on public.site_settings from anon, authenticated;
revoke insert, update, delete, truncate on public.hero from anon, authenticated;
revoke insert, update, delete, truncate on public.products from anon, authenticated;
revoke insert, update, delete, truncate on public.services from anon, authenticated;
revoke insert, update, delete, truncate on public.steps from anon, authenticated;
revoke insert, update, delete, truncate on public.proof_items from anon, authenticated;
revoke insert, update, delete, truncate on public.faqs from anon, authenticated;
revoke insert, update, delete, truncate on public.engagements from anon, authenticated;
revoke insert, update, delete, truncate on public.section_copy from anon, authenticated;

grant select on public.site_settings to anon, authenticated;
grant select on public.hero to anon, authenticated;
grant select on public.products to anon, authenticated;
grant select on public.services to anon, authenticated;
grant select on public.steps to anon, authenticated;
grant select on public.proof_items to anon, authenticated;
grant select on public.faqs to anon, authenticated;
grant select on public.engagements to anon, authenticated;
grant select on public.section_copy to anon, authenticated;

comment on table public.site_settings is 'Singleton brand and SEO fields. Public read. Writes via the dashboard SQL editor or service role.';
comment on table public.products is 'Own-product tiles. Public read only when published.';
