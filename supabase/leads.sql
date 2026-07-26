create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  business_type text not null check (business_type in ('supermercado', 'especializada', 'obrador', 'distribuidor')),
  store_count text not null check (store_count in ('1', '2-3', '4-10', '10+')),
  created_at timestamptz not null default now()
);

-- Migrates a leads table created by an earlier version of this script
-- (which had a stock_method column instead of business_type/store_count).
alter table leads drop column if exists stock_method;
alter table leads add column if not exists business_type text;
alter table leads add column if not exists store_count text;
alter table leads drop constraint if exists leads_business_type_check;
alter table leads add constraint leads_business_type_check
  check (business_type in ('supermercado', 'especializada', 'obrador', 'distribuidor'));
alter table leads drop constraint if exists leads_store_count_check;
alter table leads add constraint leads_store_count_check
  check (store_count in ('1', '2-3', '4-10', '10+'));

alter table leads enable row level security;
