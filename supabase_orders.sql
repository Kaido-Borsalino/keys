-- Supabase table for orders
create table if not exists public.orders (
  id text primary key,
  email text,
  amount_total bigint,
  items jsonb,
  created timestamptz default now()
);
