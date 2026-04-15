create table if not exists public.customer_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  email text not null default '',
  phone text not null default '',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create unique index if not exists customer_profiles_email_idx
  on public.customer_profiles (email);

create table if not exists public.customer_addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  label text not null default 'Address',
  recipient_name text not null default '',
  phone text not null default '',
  line_1 text not null default '',
  line_2 text,
  city text not null default '',
  state text not null default '',
  pincode text not null default '',
  country text not null default 'India',
  is_default boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists customer_addresses_user_idx
  on public.customer_addresses (user_id, created_at desc);

create index if not exists customer_addresses_default_idx
  on public.customer_addresses (user_id, is_default desc, created_at desc);

create table if not exists public.wishlist_items (
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id text not null references public.products(id) on delete cascade,
  created_at timestamptz not null default timezone('utc', now()),
  primary key (user_id, product_id)
);

create index if not exists wishlist_items_created_at_idx
  on public.wishlist_items (user_id, created_at desc);

alter table public.orders
  add column if not exists user_id uuid references auth.users(id) on delete set null;

alter table public.orders
  add column if not exists email text;

create index if not exists orders_user_created_at_idx
  on public.orders (user_id, created_at desc);

create index if not exists orders_email_created_at_idx
  on public.orders (email, created_at desc);

drop trigger if exists set_customer_profiles_updated_at on public.customer_profiles;
create trigger set_customer_profiles_updated_at
before update on public.customer_profiles
for each row
execute function public.set_updated_at();

drop trigger if exists set_customer_addresses_updated_at on public.customer_addresses;
create trigger set_customer_addresses_updated_at
before update on public.customer_addresses
for each row
execute function public.set_updated_at();

create or replace function public.handle_new_customer_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.customer_profiles (id, full_name, email, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'phone', '')
  )
  on conflict (id) do update
  set
    full_name = excluded.full_name,
    email = excluded.email,
    phone = case
      when excluded.phone <> '' then excluded.phone
      else public.customer_profiles.phone
    end,
    updated_at = timezone('utc', now());

  return new;
end;
$$;

drop trigger if exists on_auth_user_created_customer_profile on auth.users;
create trigger on_auth_user_created_customer_profile
after insert on auth.users
for each row
execute function public.handle_new_customer_profile();

alter table public.customer_profiles enable row level security;
alter table public.customer_addresses enable row level security;
alter table public.wishlist_items enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'customer_profiles'
      and policyname = 'customer_profiles_self_select'
  ) then
    create policy customer_profiles_self_select
      on public.customer_profiles
      for select
      using (auth.uid() = id);
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'customer_profiles'
      and policyname = 'customer_profiles_self_insert'
  ) then
    create policy customer_profiles_self_insert
      on public.customer_profiles
      for insert
      with check (auth.uid() = id);
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'customer_profiles'
      and policyname = 'customer_profiles_self_update'
  ) then
    create policy customer_profiles_self_update
      on public.customer_profiles
      for update
      using (auth.uid() = id)
      with check (auth.uid() = id);
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'customer_addresses'
      and policyname = 'customer_addresses_self_select'
  ) then
    create policy customer_addresses_self_select
      on public.customer_addresses
      for select
      using (auth.uid() = user_id);
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'customer_addresses'
      and policyname = 'customer_addresses_self_insert'
  ) then
    create policy customer_addresses_self_insert
      on public.customer_addresses
      for insert
      with check (auth.uid() = user_id);
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'customer_addresses'
      and policyname = 'customer_addresses_self_update'
  ) then
    create policy customer_addresses_self_update
      on public.customer_addresses
      for update
      using (auth.uid() = user_id)
      with check (auth.uid() = user_id);
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'customer_addresses'
      and policyname = 'customer_addresses_self_delete'
  ) then
    create policy customer_addresses_self_delete
      on public.customer_addresses
      for delete
      using (auth.uid() = user_id);
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'wishlist_items'
      and policyname = 'wishlist_items_self_select'
  ) then
    create policy wishlist_items_self_select
      on public.wishlist_items
      for select
      using (auth.uid() = user_id);
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'wishlist_items'
      and policyname = 'wishlist_items_self_insert'
  ) then
    create policy wishlist_items_self_insert
      on public.wishlist_items
      for insert
      with check (auth.uid() = user_id);
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'wishlist_items'
      and policyname = 'wishlist_items_self_delete'
  ) then
    create policy wishlist_items_self_delete
      on public.wishlist_items
      for delete
      using (auth.uid() = user_id);
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'orders'
      and policyname = 'orders_self_select'
  ) then
    create policy orders_self_select
      on public.orders
      for select
      using (auth.uid() = user_id);
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'order_items'
      and policyname = 'order_items_owner_select'
  ) then
    create policy order_items_owner_select
      on public.order_items
      for select
      using (
        exists (
          select 1
          from public.orders
          where public.orders.id = order_items.order_id
            and public.orders.user_id = auth.uid()
        )
      );
  end if;
end
$$;
