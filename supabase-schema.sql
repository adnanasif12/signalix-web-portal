-- ============================================
-- Signalix Admin Panel — Database Schema
-- Run this in Supabase SQL Editor (one time)
-- ============================================

-- 1. LEADS (Quote/Contact form submissions)
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  company text,
  country text,
  contact text not null,       -- whatsapp or email
  service text not null,
  budget text,
  message text,
  status text not null default 'new'  -- new | contacted | won | lost
);

-- 2. PORTFOLIO (Selected Work section)
create table if not exists portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  industry text not null,
  project_name text not null,
  market text,
  service_provided text,
  result_summary text,
  project_url text,
  image_url text,
  sort_order int default 0,
  is_published boolean default true
);

-- 3. SERVICES (the 8 service cards)
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  step_label text,             -- e.g. "01 / Build"
  title text not null,
  description text,
  bullet_points text[],        -- array of feature bullets
  is_starter_offer boolean default false,
  sort_order int default 0,
  is_published boolean default true
);

-- 4. TESTIMONIALS
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  client_name text not null,
  client_company text,
  client_country text,
  quote text not null,
  rating int default 5,
  avatar_url text,
  sort_order int default 0,
  is_published boolean default true
);

-- ============================================
-- Row Level Security — lock tables down.
-- Public site can INSERT leads (via the quote form)
-- and READ published portfolio/services/testimonials.
-- Only authenticated admins can do everything else.
-- ============================================

alter table leads enable row level security;
alter table portfolio_projects enable row level security;
alter table services enable row level security;
alter table testimonials enable row level security;

-- Public (anon) can submit a lead from the website form
create policy "Public can insert leads"
  on leads for insert
  to anon
  with check (true);

-- Public can read published portfolio/services/testimonials
create policy "Public can read published portfolio"
  on portfolio_projects for select to anon using (is_published = true);
create policy "Public can read published services"
  on services for select to anon using (is_published = true);
create policy "Public can read published testimonials"
  on testimonials for select to anon using (is_published = true);

-- Authenticated admin users can do everything on every table
create policy "Admins full access leads"
  on leads for all to authenticated using (true) with check (true);
create policy "Admins full access portfolio"
  on portfolio_projects for all to authenticated using (true) with check (true);
create policy "Admins full access services"
  on services for all to authenticated using (true) with check (true);
create policy "Admins full access testimonials"
  on testimonials for all to authenticated using (true) with check (true);

-- ============================================
-- Seed the 8 existing services so the panel isn't empty on day 1
-- ============================================
insert into services (step_label, title, description, bullet_points, is_starter_offer, sort_order) values
('01 / Build', 'Business Website Development', 'Professional, mobile-first websites designed around your business goals and built to convert visitors into enquiries.', array['Starting from 5 pages','Mobile-first & responsive design','SEO-ready structure'], true, 1),
('02 / Build', 'Build your Software', 'Custom software solutions built to automate workflows, improve operations, and turn your ideas into reliable digital products.', array['Custom web & mobile apps','Business process automation','Scalable software architecture'], false, 2),
('03 / Secure', 'Cyber Security', 'Protect your digital assets with proactive security reviews, monitoring, and safeguards that reduce exposure and build trust.', array['Threat monitoring','Vulnerability checks','Security hardening & guidance'], false, 3),
('04 / Support', 'Website Maintenance', 'Ongoing care so your site stays fast, secure, and up to date — without you lifting a finger.', array['Security & backup monitoring','Content & plugin updates','Speed & uptime checks'], false, 4),
('05 / Create', 'Video Editing', 'Scroll-stopping edits for reels, ads, and YouTube — cut, color graded, and captioned for every platform.', array['Reels & short-form cuts','Color grading & sound design','Subtitles & motion titles'], false, 5),
('06 / Grow', 'Digital Marketing', 'Search and paid campaigns built around real numbers — so every ad spend is tracked and measured.', array['SEO & Google Ads','Meta & TikTok ad campaigns','Monthly performance reports'], false, 6),
('07 / Engage', 'Social Media Marketing', 'Consistent, on-brand content calendars that build community and keep your audience coming back.', array['Content calendar & posting','Community management','Growth & engagement strategy'], false, 7),
('+ / Bundle', 'Full Growth Package', 'All eight services combined into one monthly plan — built, maintained, and marketed under one roof.', array['Single point of contact','Unified brand strategy','Custom pricing on request'], false, 8)
on conflict do nothing;
