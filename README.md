# Signalix — Website + Admin Panel (Merged)

এখন এক project-ই দুইটা কাজ করে:

- **`/`** — তোমার main website (Pages Router, আগের মতোই)
- **`/admin`** — Admin panel (App Router, login-protected) — Leads, Portfolio, Services, Testimonials manage করার জন্য

দুইটা একসাথে থাকলেও একে অপরকে প্রভাবিত করে না — main site-এর design/CSS অপরিবর্তিত।

---

## Setup (একবারের কাজ)

### ১. Supabase বানাও
1. [supabase.com](https://supabase.com) এ ফ্রি account + নতুন project বানাও
2. **SQL Editor** এ গিয়ে `supabase-schema.sql` এর পুরো content paste করে **Run** করো (৪টা table বানাবে + তোমার ৮টা service auto-fill করবে)
3. **Authentication → Users → Add user** থেকে নিজের admin login (email/password) বানাও, **Auto Confirm User** টিক দিয়ো

### ২. Environment variables বসাও
Supabase **Settings → API** থেকে Project URL আর anon public key কপি করো।

`.env.example` কে `.env.local` নাম দিয়ে ভ্যালু বসাও:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyxxxxxxxxxxx
```

### ৩. চালিয়ে দেখো
```bash
npm install
npm run dev
```
- Main site: `http://localhost:3000`
- Admin panel: `http://localhost:3000/admin`

### ৪. Vercel-এ deploy করো
তোমার existing Vercel project-এই এই updated code push করলে হবে — নতুন project লাগবে না।

1. এই code তোমার GitHub repo-তে push করো
2. Vercel Dashboard → তোমার project → **Settings → Environment Variables** এ ঐ ২টা variable বসাও
3. Deploy/redeploy করো

এখন `signalix.agency/admin` এ গিয়ে login করলেই admin panel পাবে।

---

## কী কী যোগ হয়েছে (আগের repo থেকে)

| ফাইল/ফোল্ডার | কাজ |
|---|---|
| `app/admin/*` | Admin panel-এর সব page (dashboard, leads, portfolio, services, testimonials, login) |
| `app/layout.tsx`, `app/globals.css` | App Router-এর জন্য দরকারি root layout (শুধু `/admin`-এ effect করে) |
| `middleware.ts` | `/admin` route protect করে — login ছাড়া ঢোকা যাবে না |
| `lib/supabase/client.ts`, `lib/supabase/server.ts` | Admin panel-এর auth + data access |
| `lib/supabaseClient.js` | Main website-এর জন্য (Quote form save, portfolio fetch) |
| `components/Sidebar.tsx` | Admin panel-এর sidebar navigation |
| `tailwind.config.js`, `postcss.config.js`, `tsconfig.json` | শুধু admin panel styling/TypeScript-এর জন্য, main site-এর CSS-কে প্রভাবিত করে না |
| `components/QuoteForm/QuoteForm.jsx` | Submit করলে এখন lead Supabase-এ save হয় |
| `components/SelectedWork/SelectedWork.jsx`, `pages/index.jsx` | Portfolio section এখন admin panel থেকে dynamic data দেখায় (ISR, ৬০ সেকেন্ডে auto-update) |

## Security
- Row Level Security (RLS) অন — visitor শুধু lead submit করতে ও published content দেখতে পারবে, edit/delete শুধু login করা admin করতে পারবে
- `.env.local` কখনো GitHub-এ push কোরো না (আগে থেকেই `.gitignore`-এ বাদ দেওয়া আছে)
