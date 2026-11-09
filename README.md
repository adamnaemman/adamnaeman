# Adam Naeman — Portfolio

Personal portfolio, built with **Next.js 14 (App Router)** + **TypeScript** and deployed on **Vercel**.
Fully static — no database, no API routes, no environment variables needed.

Live: https://adamnaeman.vercel.app/

---

## Sections

- **Hero** — folder-style landing, each folder scrolls to a section
- **About Me** — profile, diorama image, bio
- **Background & Journey** — timeline and skills
- **Experience & Projects** — keyboard-driven project selector with filterable cards
- **Contact** — direct links (LinkedIn, GitHub); no form, nothing to lose
- **Footer** — badges and back to top

## Stack

- Next.js 14 (App Router), React 18, TypeScript
- Styling: plain CSS design tokens in `app/globals.css` + inline styles (acid-pop / Y2K street palette)
- Icons: `lucide-react`
- Deployment: Vercel (auto-deploy on push to `main`)

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npx tsc --noEmit     # typecheck
```

No `.env` file required.

## Project structure

```
app/
├── layout.tsx          # Root layout and metadata
├── page.tsx            # Section composition
└── globals.css         # Design tokens and global styles
components/
├── Navbar.tsx                  # Fixed top bar (hamburger nav)
├── Hero.tsx                    # Landing hero and folders
├── AboutMeSection.tsx          # About + diorama
├── BackgroundSection.tsx       # Journey timeline and skills
├── KeyboardExperienceProjects.tsx  # Keyboard interaction shell
├── ProjectsSection.tsx         # Project cards and filter
├── ContactSection.tsx          # Direct contact links
├── Footer.tsx                  # Footer
├── BentoAbout.tsx              # Unused (kept for future use)
├── RetroStudioSection.tsx      # Unused (kept for future use)
└── RetroStudioDiorama.tsx      # Unused (kept for future use)
lib/
├── data.ts             # Projects, skills, experience
└── types.ts            # TypeScript interfaces
```

## Deploy

Push to `main` — Vercel builds and deploys automatically. No environment variables are configured.
For a manual deploy: `npx vercel`.

## History

This project previously used Supabase for a guestbook and contact form. The Supabase project no longer
exists (host does not resolve), so the database layer, API routes and the contact form were removed on
9 Nov 2026. The site is now purely static.
