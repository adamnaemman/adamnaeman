# Adam Naeman — Portfolio & Project Showcase

A modern, high-performance developer portfolio and project showcase web application built with **Next.js**, **Supabase (PostgreSQL & Realtime)**, and deployed on **Vercel**.

---

## 🌟 Features

- 💎 **Modern Aesthetics**: Sleek dark obsidian theme, ambient aurora lighting, glassmorphic cards, and smooth micro-interactions.
- ⚡ **Interactive Supabase Guestbook**: Live signature board where visitors can leave notes with randomized avatar generation and confetti celebrations.
- 🚀 **Dynamic Projects Showcase**: Filterable portfolio projects loaded from Supabase or default showcase data.
- 📬 **Direct Contact Transmission**: Secure message inbox writing directly to your Supabase `contacts` table.
- 📊 **Architecture Bento Grid**: Showcases tech stack proficiency, career timeline, and cloud integration metrics.
- 🔒 **Row Level Security (RLS)**: Built-in Supabase security policies for public reads and safe inserts.
- ▲ **Vercel Optimized**: Zero-config edge deployment with Next.js App Router.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14+ (App Router), React 18, TypeScript
- **Styling**: Vanilla CSS Design Tokens, Glassmorphism, Google Fonts (`Plus Jakarta Sans`, `JetBrains Mono`)
- **Backend / Database**: Supabase (PostgreSQL, Realtime, RLS)
- **Icons & Effects**: Lucide Icons, Canvas Confetti
- **Deployment**: Vercel Global Edge Network

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Supabase Environment Variables
Update `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://fzdjodhnhnycpuariegq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

> **Where to find your Anon Key:**
> 1. Open your Supabase project: [https://supabase.com/dashboard/project/fzdjodhnhnycpuariegq](https://supabase.com/dashboard/project/fzdjodhnhnycpuariegq)
> 2. Go to **Project Settings** (gear icon) $\rightarrow$ **API**.
> 3. Copy the **`anon` `public`** API key into `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

### 3. Run Supabase Database Migration
1. Go to your **Supabase Dashboard** $\rightarrow$ **SQL Editor** $\rightarrow$ **New query**.
2. Open [`supabase/schema.sql`](file:///d:/adamnaeman/supabase/schema.sql), copy all lines, paste them into the SQL Editor, and click **Run**.
3. This creates the `guestbook`, `projects`, and `contacts` tables with Row Level Security (RLS) policies and seed data.

### 4. Start Local Dev Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ▲ Deploying to Vercel

### Option 1: Import via Vercel Web Dashboard (Recommended)
1. Push this project to your GitHub repository (e.g. `github.com/adamnaeman/portfolio`).
2. Log into [Vercel Dashboard](https://vercel.com/dashboard).
3. Click **Add New...** $\rightarrow$ **Project** $\rightarrow$ **Import** your GitHub repository.
4. In the **Environment Variables** section, add:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://fzdjodhnhnycpuariegq.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `<your-supabase-anon-key>`
5. Click **Deploy**! Your website will be live globally in seconds.

### Option 2: Deploy with Vercel CLI
```bash
npx vercel
```

---

## 📂 Project Structure

```
d:/adamnaeman/
├── app/
│   ├── layout.tsx              # Root HTML & Metadata
│   ├── page.tsx                # Main Portfolio Page
│   ├── globals.css             # Obsidian Glass Design System
│   └── api/
│       ├── guestbook/route.ts  # Guestbook API endpoint
│       └── contact/route.ts    # Contact API endpoint
├── components/
│   ├── Navbar.tsx              # Floating glass navigation & status
│   ├── Hero.tsx                # Hero banner, action CTAs, and metrics
│   ├── BentoAbout.tsx          # Tech stack & career bento grid
│   ├── ProjectsSection.tsx     # Dynamic project cards & category filter
│   ├── GuestbookSection.tsx    # Live guestbook signature board
│   ├── ContactSection.tsx      # Contact form with Supabase sync
│   └── Footer.tsx              # Footer & status badges
├── lib/
│   ├── supabaseClient.ts       # Supabase client initializer
│   ├── types.ts                # TypeScript interfaces
│   └── data.ts                 # Initial showcase data & skills
├── supabase/
│   └── schema.sql              # Supabase SQL setup script
└── README.md                   # Documentation
```
