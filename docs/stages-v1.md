# stages.md — Portfolio (D:\adamnaeman)

**Projek:** Portfolio peribadi Adam Naeman (Next.js 14 + Supabase + Vercel)
**Status:** ongoing — projek berasingan dari Adam OS (D:\ADAM OS\HQ). Jangan campur dokumen.
**Tarikh audit:** 9 Nov 2026

---

## Matlamat

Portfolio yang boleh dihantar ke recruiter / panel FYP tanpa satu pun pautan mati, tanpa satu pun
dakwaan yang tak boleh dipertahankan, dan borang contact yang betul-betul menyimpan mesej.

## Definisi siap (semua mesti betul serentak)

1. `tsc --noEmit` → 0 baris output
2. `npm run build` → Compiled successfully, 0 deprecation warning
3. Setiap URL dalam komponen balas **200** (skrip `tools/check-links.sh`)
4. `POST /api/contact` → row baru dalam `contacts`; `GET /api/guestbook` → `source: supabase`
5. 0 nama placeholder (`CloudScale`, `Nexus`, `Aura`, `Sarah Chen`, `Marcus Thorne`, `Elena Rostova`,
   `Digital Innovation Studios`, `High Growth Labs`)
6. Email CTA guna alamat sebenar Adam, ada LinkedIn + CV PDF yang boleh dimuat turun
7. Share link di WhatsApp/Telegram keluar kad OG (imej + tajuk)
8. Mobile 390px: tiada horizontal overflow, hero boleh dibaca, page < 8,000px tinggi
9. Semua stage di bawah bertick dengan bukti ditampal

## Rollback

Setiap stage = satu commit. `git revert <sha>` untuk undur.
Backup fail besar sebelum refactor stage 7: `*.bak1`.

---

## Stage 0 — Bersihkan repo, simpan kerja responsive

Kerja mobile responsive (7 fail, +322/−49) masih uncommitted sejak audit.

- Fail: `components/{Hero,Footer,ContactSection,AboutMeSection,BackgroundSection,ProjectsSection,KeyboardExperienceProjects}.tsx`
- Buang: `3a99bcbf-fb67debe.txt` (6 baris UUID, sampah tools)
- Tambah `.gitignore`: entri untuk fail UUID root (`[0-9a-f]*-[0-9a-f]*.txt`)

**Bukti:** `git log --oneline -1`, `git status --short` kosong, `npm run build` lulus.

---

## Stage 1 — Hidupkan backend (P0)

Env var mismatch: `.env.local` simpan `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, kod baca
`NEXT_PUBLIC_SUPABASE_ANON_KEY` → `supabase = null` → semua route jatuh ke data seed.

- Fail: `lib/supabaseClient.ts` — baca kedua-dua nama key (chain), jangan sentuh `.env.local`
- Fail: `app/api/contact/route.ts` — buang cabang "demo mode" yang pulang `success: true`; kalau
  Supabase tak dikonfigurasi, pulang **503** dengan mesej jujur
- Fail: `app/api/guestbook/route.ts` — sama; `INITIAL_GUESTBOOK` tak lagi dipulangkan sebagai data palsu
- Fail: `components/ContactSection.tsx` — papar error sebenar pada UI, bukan toast "berjaya"

**Bukti:** `curl /api/guestbook` → `source: supabase`; POST contact → id row; GET semula → bilangan naik.

---

## Stage 2 — Buang kandungan palsu, masuk projek sebenar (P0)

Data projek diduplikasi: `lib/data.ts` **dan** dalam `components/ProjectsSection.tsx`.
Tukar satu tempat sahaja = skrin tak berubah.

- Fail: `lib/data.ts` — projek sebenar (4 entri), experience sebenar, buang `STATS` yang tak boleh dipertahankan
- Fail: `components/ProjectsSection.tsx` — buang array projek hardcoded, import dari `lib/data.ts`
- Fail: `components/GuestbookSection.tsx` — kosongkan seed; tunjuk empty state ("jadi yang pertama")
- Fail: `supabase/schema.sql` — buang `INSERT` seed projek/testimoni palsu

**Input diperlukan dari Adam** (lihat soalan terbuka).
**Bukti:** grep 0 nama placeholder, screenshot section projects + guestbook, `check-links.sh` semua 200.

---

## Stage 3 — CTA yang betul: email, LinkedIn, CV

- Fail: `components/ContactSection.tsx:314` — `mailto:adamnaeman@dev.io` → alamat sebenar
- Fail: `components/ContactSection.tsx` — tambah LinkedIn (sekarang hanya GitHub)
- Fail: `components/Hero.tsx` — butang "Download CV" → `/cv.pdf`
- Fail baru: `public/cv.pdf`

**Bukti:** screenshot hero + contact; `curl -I /cv.pdf` → 200; mailto dibuka dalam browser.

---

## Stage 4 — SEO & shareability (P1)

- Fail: `app/layout.tsx` — pindah `themeColor`/`viewport` ke `export const viewport`; tambah
  `openGraph`, `twitter`, `metadataBase`, `alternates`
- Fail baru: `app/opengraph-image.tsx` (1200×630) atau `public/og.png`
- Fail baru: `app/robots.ts`, `app/sitemap.ts`
- Fail: `app/page.tsx` — JSON-LD `Person`

**Bukti:** `curl -s localhost:3000 | grep -o 'og:[a-z]*' | sort -u`; build tanpa warning; screenshot kad preview.

---

## Stage 5 — Berat halaman (P1)

11 Google Font family dalam satu `@import`; 545K PNG + 345K JPG dalam `public/`.

- Fail: `app/globals.css` — buang `@import` Google Fonts
- Fail: `app/layout.tsx` — `next/font/local|google` untuk 2–3 family sahaja
- Fail: `components/AboutMeSection.tsx` — `next/image` untuk diorama, compress ke webp
- Fail: `components/GuestbookSection.tsx` — avatar guna `next/image`, `alt` deskriptif

**Bukti:** bilangan request font (devtools performance API), saiz `public/` sebelum/selepas, number build.

---

## Stage 6 — Lindung borang dari spam (P1)

Anon key awam + RLS `WITH CHECK (true)` = sesiapa boleh spam terus ke DB.

- Fail: `app/api/guestbook/route.ts`, `app/api/contact/route.ts` — had panjang (name ≤ 60, message ≤ 500),
  strip HTML, rate limit per-IP (in-memory Map cukup untuk traffic portfolio)
- Fail: kedua-dua route — jangan pulangkan `error.message` mentah dari Postgres
- Fail: `supabase/schema.sql` — `CHECK (char_length(message) <= 500)` + policy insert dengan had sama
- Fail: `components/GuestbookSection.tsx` — honeypot field

**Bukti:** 6 POST laju → 429 pada yang ke-6; message 10,000 aksara → 400; insert HTML → tersanitasi.

---

## Stage 7 — UX desktop & mobile (P2)

- Fail: `components/Navbar.tsx` — nav link nampak pada ≥1024px (sekarang hamburger pada 1440px)
- Fail: `components/Hero.tsx` — satu baris positioning: siapa / buat apa / available tak
- Fail: `components/Hero.tsx` — label "let's connect" jangan rapat tepi viewport 390px
- Fail: `components/*` — seragamkan casing label (`About Me`, `Background`)

**Bukti:** screenshot 1440 + 390; ukur `document.body.scrollHeight` (sekarang 11,309px).

---

## Stage 8 — Hutang kod (P2, paling akhir)

- `ProjectsSection.tsx` 1,866 baris, `BackgroundSection.tsx` 1,113 → pecah ikut section
- Inline style berulang → guna token yang dah ada dalam `globals.css`
- Komponen statik (Footer, Hero teks) → buang `use client` di mana tak perlu

**Bukti:** LOC sebelum/selepas, build lulus, screenshot sama.

---

## Soalan terbuka (jawab dulu sebelum Stage 2)

1. **4 projek sebenar** yang nak ditunjuk? Calon yang aku nampak dalam mesin: `D:\RESEARCH\bagsense-model`,
   `D:\PROJECTS\TimeRush`, `D:\ADAM OS\HQ`, `D:\hermes`, `D:\GAME\jrpg-starter-town`. Mana yang nak masuk, dan
   mana link demo/GitHub-nya?
2. **Email sebenar** untuk CTA.
3. **GitHub username betul: `adamnaemman` atau `adamnaeman`?** Remote git guna `adamnaemman` (private repo, push
   jalan), tapi semua link dalam kod `github.com/adamnaeman` — itu akaun lain (balas 200). Kena betulkan sebelum
   link jadi pautan ke akaun orang lain.
4. **LinkedIn URL** ada?
5. **CV PDF** — kau supply, atau aku jana dari data portfolio?
6. **Guestbook** kekal atau buang terus section tu?
7. Portfolio ni dah deploy ke Vercel? URL apa, dan Supabase project `fzdjodhnhnycpuariegq` masih aktif?
