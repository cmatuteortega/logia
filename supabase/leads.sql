create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  stock_method text not null check (stock_method in ('software_tpv', 'excel_csv', 'papel')),
  created_at timestamptz not null default now()
);

alter table leads enable row level security;
