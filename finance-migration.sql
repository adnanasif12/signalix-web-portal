-- Signalix Finance migration
-- Run this once in Supabase Dashboard -> SQL Editor -> Run.

create table if not exists public.finance_transactions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  transaction_date date not null default current_date,
  type text not null check (type in ('income', 'expense')),
  category text not null,
  amount numeric(12, 2) not null check (amount > 0),
  description text
);

alter table public.finance_transactions enable row level security;

drop policy if exists "Admins full access finance" on public.finance_transactions;
create policy "Admins full access finance"
  on public.finance_transactions
  for all
  to authenticated
  using (true)
  with check (true);

notify pgrst, 'reload schema';
