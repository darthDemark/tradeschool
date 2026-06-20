-- ============================================================
-- TRADE SCHOOL — Supabase Database Schema
-- Run this in your Supabase SQL editor to initialize the database
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── Profiles ────────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid references auth.users(id) on delete cascade,
  name          text not null default 'Trader',
  goal          text,
  rank          text not null default 'Freshman Trader',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ── Lesson Progress ──────────────────────────────────────────────────────────
create table if not exists public.lessons_progress (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid references auth.users(id) on delete cascade,
  lesson_id     text not null,
  completed     boolean not null default false,
  completed_at  timestamptz,
  created_at    timestamptz not null default now(),
  unique(user_id, lesson_id)
);

-- ── Quiz Attempts ────────────────────────────────────────────────────────────
create table if not exists public.quiz_attempts (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid references auth.users(id) on delete cascade,
  lesson_id     text not null,
  score         integer not null,
  passed        boolean not null default false,
  answers       jsonb not null default '{}',
  attempted_at  timestamptz not null default now()
);

-- ── Scenario Attempts ────────────────────────────────────────────────────────
create table if not exists public.scenario_attempts (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid references auth.users(id) on delete cascade,
  scenario_id   text not null,
  choice_id     text not null,
  was_correct   boolean not null,
  attempted_at  timestamptz not null default now(),
  unique(user_id, scenario_id)
);

-- ── Paper Trades ─────────────────────────────────────────────────────────────
create table if not exists public.paper_trades (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid references auth.users(id) on delete cascade,
  symbol          text not null,
  strategy        text not null,
  direction       text not null check (direction in ('Bullish', 'Bearish', 'Neutral')),
  contract_type   text check (contract_type in ('Call', 'Put')),
  strike          numeric,
  expiration      text,
  quantity        integer not null,
  entry_price     numeric not null,
  exit_price      numeric,
  max_risk        numeric not null,
  thesis          text,
  stop_rule       text,
  exit_rule       text,
  status          text not null default 'Open' check (status in ('Open', 'Closed')),
  opened_at       timestamptz not null default now(),
  closed_at       timestamptz,
  pnl             numeric,
  pnl_percent     numeric,
  grade           text check (grade in ('A', 'B', 'C', 'D', 'F')),
  notes           text,
  rule_violation  boolean default false
);

-- ── Journal Entries ───────────────────────────────────────────────────────────
create table if not exists public.journal_entries (
  id                uuid primary key default uuid_generate_v4(),
  user_id           uuid references auth.users(id) on delete cascade,
  date              date not null default current_date,
  type              text not null check (type in ('trade', 'daily', 'lesson')),
  trade_id          uuid references public.paper_trades(id),
  symbol            text,
  strategy          text,
  pnl               numeric,
  grade             text,
  emotional_state   text not null,
  rule_followed     boolean not null default true,
  rule_violation    text,
  mistake_made      text,
  lesson_learned    text,
  notes             text not null,
  setup             text,
  created_at        timestamptz not null default now()
);

-- ── Trading Plans ─────────────────────────────────────────────────────────────
create table if not exists public.trading_plans (
  id                  uuid primary key default uuid_generate_v4(),
  user_id             uuid references auth.users(id) on delete cascade unique,
  markets_traded      text,
  time_of_day         text,
  setups_traded       text,
  max_risk_per_trade  text,
  daily_loss_limit    text,
  weekly_loss_limit   text,
  entry_rules         text,
  exit_rules          text,
  no_trade_conditions text,
  updated_at          timestamptz not null default now()
);

-- ── Professor Messages ────────────────────────────────────────────────────────
create table if not exists public.professor_messages (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid references auth.users(id) on delete cascade,
  role        text not null check (role in ('professor', 'user')),
  content     text not null,
  timestamp   timestamptz not null default now()
);

-- ── Row Level Security ────────────────────────────────────────────────────────
alter table public.profiles enable row level security;
alter table public.lessons_progress enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.scenario_attempts enable row level security;
alter table public.paper_trades enable row level security;
alter table public.journal_entries enable row level security;
alter table public.trading_plans enable row level security;
alter table public.professor_messages enable row level security;

-- Each user can only see their own data
create policy "Users see own profile" on public.profiles for all using (auth.uid() = user_id);
create policy "Users see own lessons" on public.lessons_progress for all using (auth.uid() = user_id);
create policy "Users see own quizzes" on public.quiz_attempts for all using (auth.uid() = user_id);
create policy "Users see own scenarios" on public.scenario_attempts for all using (auth.uid() = user_id);
create policy "Users see own trades" on public.paper_trades for all using (auth.uid() = user_id);
create policy "Users see own journal" on public.journal_entries for all using (auth.uid() = user_id);
create policy "Users see own plan" on public.trading_plans for all using (auth.uid() = user_id);
create policy "Users see own messages" on public.professor_messages for all using (auth.uid() = user_id);
