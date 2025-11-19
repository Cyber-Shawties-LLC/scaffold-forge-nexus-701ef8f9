-- Create period_tracker table
create table public.period_tracker (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  last_period date not null,
  cycle_length integer not null default 28,
  period_length integer not null default 5,
  next_period date,
  fertile_window_start date,
  fertile_window_end date,
  notifications_enabled boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique (user_id)
);

-- Enable RLS
alter table public.period_tracker enable row level security;

-- Create function to update updated_at timestamp
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Create trigger to automatically update updated_at
create trigger update_period_tracker_updated_at
  before update on public.period_tracker
  for each row
  execute function public.update_updated_at_column();

-- RLS Policies for period_tracker
create policy "Users can view their own period tracker data"
on public.period_tracker
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can insert their own period tracker data"
on public.period_tracker
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can update their own period tracker data"
on public.period_tracker
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete their own period tracker data"
on public.period_tracker
for delete
to authenticated
using (auth.uid() = user_id);

-- Admins can view all period tracker data
create policy "Admins can view all period tracker data"
on public.period_tracker
for select
to authenticated
using (public.has_role(auth.uid(), 'admin'));

