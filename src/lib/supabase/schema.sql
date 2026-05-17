-- Baseera Supabase Schema
-- Run this in Supabase SQL Editor to create all tables

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table
create table if not exists public.users (
  id uuid default uuid_generate_v4() primary key,
  email text unique not null,
  name text,
  language text default 'ar',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Prompts table
create table if not exists public.prompts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade,
  service text not null check (service in ('text', 'cv', 'image', 'video', 'code')),
  input text not null,
  output text,
  model text,
  level text,
  category text,
  tokens_used integer default 0,
  created_at timestamptz default now()
);

-- Prompt versions table
create table if not exists public.prompt_versions (
  id uuid default uuid_generate_v4() primary key,
  prompt_id uuid references public.prompts(id) on delete cascade,
  version_number integer not null,
  content text not null,
  model text,
  created_at timestamptz default now()
);

-- CVs table
create table if not exists public.cvs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade,
  template_id text not null,
  personal_info jsonb,
  summary text,
  experience jsonb default '[]',
  education jsonb default '[]',
  skills jsonb default '[]',
  certifications jsonb default '[]',
  languages jsonb default '[]',
  projects jsonb default '[]',
  ats_score integer,
  gcc_fields jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- CV versions table
create table if not exists public.cv_versions (
  id uuid default uuid_generate_v4() primary key,
  cv_id uuid references public.cvs(id) on delete cascade,
  version_number integer not null,
  data jsonb not null,
  template_id text,
  ats_score integer,
  created_at timestamptz default now()
);

-- Analytics table
create table if not exists public.analytics (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade,
  event_type text not null,
  service text,
  model text,
  metadata jsonb,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.users enable row level security;
alter table public.prompts enable row level security;
alter table public.prompt_versions enable row level security;
alter table public.cvs enable row level security;
alter table public.cv_versions enable row level security;
alter table public.analytics enable row level security;

-- RLS Policies
create policy "Users can view own data" on public.users
  for select using (auth.uid() = id);

create policy "Users can insert own data" on public.users
  for insert with check (auth.uid() = id);

create policy "Users can view own prompts" on public.prompts
  for select using (auth.uid() = user_id);

create policy "Users can insert own prompts" on public.prompts
  for insert with check (auth.uid() = user_id);

create policy "Users can update own prompts" on public.prompts
  for update using (auth.uid() = user_id);

create policy "Users can delete own prompts" on public.prompts
  for delete using (auth.uid() = user_id);

create policy "Users can view own prompt versions" on public.prompt_versions
  for select using (
    exists (select 1 from public.prompts where prompts.id = prompt_versions.prompt_id and prompts.user_id = auth.uid())
  );

create policy "Users can insert own prompt versions" on public.prompt_versions
  for insert with check (
    exists (select 1 from public.prompts where prompts.id = prompt_versions.prompt_id and prompts.user_id = auth.uid())
  );

create policy "Users can view own CVs" on public.cvs
  for select using (auth.uid() = user_id);

create policy "Users can insert own CVs" on public.cvs
  for insert with check (auth.uid() = user_id);

create policy "Users can update own CVs" on public.cvs
  for update using (auth.uid() = user_id);

create policy "Users can delete own CVs" on public.cvs
  for delete using (auth.uid() = user_id);

create policy "Users can view own CV versions" on public.cv_versions
  for select using (
    exists (select 1 from public.cvs where cvs.id = cv_versions.cv_id and cvs.user_id = auth.uid())
  );

create policy "Users can insert own CV versions" on public.cv_versions
  for insert with check (
    exists (select 1 from public.cvs where cvs.id = cv_versions.cv_id and cvs.user_id = auth.uid())
  );

create policy "Users can view own analytics" on public.analytics
  for select using (auth.uid() = user_id);

create policy "Users can insert own analytics" on public.analytics
  for insert with check (auth.uid() = user_id);

-- Indexes for performance
create index if not exists idx_prompts_user_id on public.prompts(user_id);
create index if not exists idx_prompts_service on public.prompts(service);
create index if not exists idx_prompts_created_at on public.prompts(created_at desc);
create index if not exists idx_cvs_user_id on public.cvs(user_id);
create index if not exists idx_cvs_created_at on public.cvs(created_at desc);
create index if not exists idx_analytics_user_id on public.analytics(user_id);
create index if not exists idx_analytics_created_at on public.analytics(created_at desc);

-- Updated_at trigger
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger handle_users_updated_at
  before update on public.users
  for each row
  execute function public.handle_updated_at();

create trigger handle_cvs_updated_at
  before update on public.cvs
  for each row
  execute function public.handle_updated_at();

-- ==========================================
-- Phase 10: Dashboard & Monetization
-- ==========================================

-- Subscription Tiers Table
create table if not exists public.subscription_tiers (
  id uuid default uuid_generate_v4() primary key,
  name text unique not null check (name in ('free', 'pro', 'enterprise')),
  display_name_ar text not null,
  display_name_en text not null,
  price_monthly_usd numeric(10, 2) default 0,
  price_yearly_usd numeric(10, 2) default 0,
  stripe_price_id_monthly text,
  stripe_price_id_yearly text,
  features jsonb not null default '[]',
  limits jsonb not null default '{}',
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- User Subscriptions Table
create table if not exists public.user_subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  tier_id uuid references public.subscription_tiers(id) on delete restrict not null,
  status text not null check (status in ('trialing', 'active', 'past_due', 'canceled', 'incomplete', 'incomplete_expired', 'paused', 'unpaid')),
  stripe_customer_id text,
  stripe_subscription_id text unique,
  stripe_price_id text,
  billing_interval text check (billing_interval in ('month', 'year')),
  trial_start timestamptz,
  trial_end timestamptz,
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean default false,
  canceled_at timestamptz,
  metadata jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Usage Logs Table
create table if not exists public.usage_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  service text not null check (service in ('text-generate', 'text-optimize', 'humanize', 'cv-analyze', 'cv-enhance', 'image-generate', 'video-generate', 'code-generate')),
  model text,
  tokens_used integer default 0,
  request_id text,
  status text check (status in ('success', 'error', 'rate_limited')),
  error_message text,
  ip_address text,
  metadata jsonb default '{}',
  created_at timestamptz default now()
);

-- User Roles Table
create table if not exists public.user_roles (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null unique,
  role text not null check (role in ('admin', 'user', 'moderator')),
  granted_by uuid references public.users(id),
  granted_at timestamptz default now(),
  expires_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS on new tables
alter table public.subscription_tiers enable row level security;
alter table public.user_subscriptions enable row level security;
alter table public.usage_logs enable row level security;
alter table public.user_roles enable row level security;

-- RLS Policies for subscription_tiers
create policy "Anyone can view active tiers" on public.subscription_tiers
  for select using (is_active = true);

create policy "Admins can manage tiers" on public.subscription_tiers
  for all using (
    exists (select 1 from public.user_roles where user_roles.user_id = auth.uid() and user_roles.role = 'admin')
  );

-- RLS Policies for user_subscriptions
create policy "Users can view own subscriptions" on public.user_subscriptions
  for select using (auth.uid() = user_id);

create policy "Users can insert own subscriptions" on public.user_subscriptions
  for insert with check (auth.uid() = user_id);

create policy "Users can update own subscriptions" on public.user_subscriptions
  for update using (auth.uid() = user_id);

create policy "Admins can view all subscriptions" on public.user_subscriptions
  for select using (
    exists (select 1 from public.user_roles where user_roles.user_id = auth.uid() and user_roles.role = 'admin')
  );

-- RLS Policies for usage_logs
create policy "Users can view own usage logs" on public.usage_logs
  for select using (auth.uid() = user_id);

create policy "Users can insert own usage logs" on public.usage_logs
  for insert with check (auth.uid() = user_id);

create policy "System can insert usage logs" on public.usage_logs
  for insert with check (true);

create policy "Admins can view all usage logs" on public.usage_logs
  for select using (
    exists (select 1 from public.user_roles where user_roles.user_id = auth.uid() and user_roles.role = 'admin')
  );

-- RLS Policies for user_roles
create policy "Users can view own role" on public.user_roles
  for select using (auth.uid() = user_id);

create policy "Admins can manage roles" on public.user_roles
  for all using (
    exists (select 1 from public.user_roles where user_roles.user_id = auth.uid() and user_roles.role = 'admin')
  );

-- Indexes for Phase 10 tables
create index if not exists idx_user_subscriptions_user_id on public.user_subscriptions(user_id);
create index if not exists idx_user_subscriptions_status on public.user_subscriptions(status);
create index if not exists idx_user_subscriptions_stripe_customer on public.user_subscriptions(stripe_customer_id);
create index if not exists idx_user_subscriptions_stripe_subscription on public.user_subscriptions(stripe_subscription_id);
create index if not exists idx_user_subscriptions_period_end on public.user_subscriptions(current_period_end);

create index if not exists idx_usage_logs_user_id on public.usage_logs(user_id);
create index if not exists idx_usage_logs_service on public.usage_logs(service);
create index if not exists idx_usage_logs_created_at on public.usage_logs(created_at desc);
create index if not exists idx_usage_logs_user_service_date on public.usage_logs(user_id, service, created_at desc);

create index if not exists idx_user_roles_user_id on public.user_roles(user_id);
create index if not exists idx_user_roles_role on public.user_roles(role);

-- Updated_at triggers for Phase 10 tables
create trigger handle_subscription_tiers_updated_at
  before update on public.subscription_tiers
  for each row
  execute function public.handle_updated_at();

create trigger handle_user_subscriptions_updated_at
  before update on public.user_subscriptions
  for each row
  execute function public.handle_updated_at();

create trigger handle_user_roles_updated_at
  before update on public.user_roles
  for each row
  execute function public.handle_updated_at();

-- Seed default subscription tiers
insert into public.subscription_tiers (name, display_name_ar, display_name_en, price_monthly_usd, price_yearly_usd, features, limits) values
(
  'free',
  'مجاني',
  'Free',
  0,
  0,
  '["Basic AI models", "5 prompts per day", "1 CV analysis per month", "Standard support"]'::jsonb,
  '{"daily_prompts": 5, "monthly_cv_analyses": 1, "max_tokens_per_request": 2000, "image_generations": 0, "video_generations": 0}'::jsonb
),
(
  'pro',
  'احترافي',
  'Pro',
  19.99,
  199.99,
  '["Advanced AI models", "Unlimited prompts", "10 CV analyses per month", "Priority support", "Export to PDF/DOCX", "Custom templates"]'::jsonb,
  '{"daily_prompts": -1, "monthly_cv_analyses": 10, "max_tokens_per_request": 8000, "image_generations": 50, "video_generations": 10}'::jsonb
),
(
  'enterprise',
  'مؤسسات',
  'Enterprise',
  99.99,
  999.99,
  '["All AI models", "Unlimited everything", "Unlimited CV analyses", "Dedicated support", "API access", "Team collaboration", "Custom integrations", "SLA guarantee"]'::jsonb,
  '{"daily_prompts": -1, "monthly_cv_analyses": -1, "max_tokens_per_request": -1, "image_generations": -1, "video_generations": -1}'::jsonb
)
on conflict (name) do nothing;

-- Helper functions
create or replace function public.get_user_subscription(user_uuid uuid)
returns table (
  tier_name text,
  status text,
  current_period_start timestamptz,
  current_period_end timestamptz,
  limits jsonb
) as $$
begin
  return query
  select
    st.name as tier_name,
    us.status,
    us.current_period_start,
    us.current_period_end,
    st.limits
  from public.user_subscriptions us
  join public.subscription_tiers st on us.tier_id = st.id
  where us.user_id = user_uuid
    and us.status in ('active', 'trialing')
  order by us.created_at desc
  limit 1;
end;
$$ language plpgsql security definer;

create or replace function public.is_admin(user_uuid uuid)
returns boolean as $$
begin
  return exists (
    select 1 from public.user_roles
    where user_id = user_uuid and role = 'admin'
  );
end;
$$ language plpgsql security definer;

create or replace function public.get_usage_count(
  user_uuid uuid,
  service_name text,
  period_start timestamptz,
  period_end timestamptz
)
returns integer as $$
begin
  return (
    select count(*)
    from public.usage_logs
    where user_id = user_uuid
      and service = service_name
      and created_at >= period_start
      and created_at < period_end
      and status = 'success'
  );
end;
$$ language plpgsql security definer;
