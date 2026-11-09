# stages.md — Portfolio (D:\adamnaeman) — v2

**Projek:** Portfolio peribadi Adam Naeman (Next.js 14, static + Vercel)
**Live:** https://adamnaeman.vercel.app/ (deploy commit `64a39f4`, sebelum kerja responsive)
**Status:** ongoing — projek berasingan dari Adam OS (D:\ADAM OS\HQ)
**v1 disimpan sebagai `stages-v1.md`.** v2 (9 Nov 2026) disemak ikut jawapan Adam: belum ada projek
siap, tiada CV, GitHub `adamnaemman`, Supabase mati, guestbook dibuang.

---

## Matlamat

Portfolio yang boleh dihantar ke recruiter / panel FYP tanpa pautan mati, tanpa dakwaan yang tak boleh
dipertahankan, dan tanpa borang yang menelan mesej orang secara senyap.

## Perubahan besar dari v1

- **Belum ada projek siap** → Projects section isi dengan kerja sebenar yang ada (FYP, TimeRush, ML/NLP,
  game) berlabel jujur, bukan projek rekaan.
- **Belum ada CV** → tiada butang "Download CV" sampai PDF wujud; CTA guna LinkedIn.
- **GitHub = `adamnaemman`** → semua link tukar; `adamnaeman` dalam kod ialah akaun orang lain.
- **Guestbook dibuang** → `GuestbookSection.tsx`, table `guestbook`, `INITIAL_GUESTBOOK` dipadam.
- **Supabase mati** → `fzdjodhnhnycpuariegq.supabase.co` balas **NXDOMAIN**, bukan sekadar paused.
  DB dibuang terus, site jadi static.

---

## Definisi siap

1. `tsc --noEmit` → 0 baris output
2. `npm run build` → Compiled successfully, 0 deprecation warning
3. Setiap URL dalam komponen balas 200/301 (`tools/check-links.sh`)
4. 0 nama placeholder (`CloudScale`, `Nexus`, `Aura`, `Sarah Chen`, `Marcus Thorne`,
   `Digital Innovation Studios`, `High Growth Labs`, `25+`, `100%`)
5. Tiada `dev.io`, tiada `NEXT_PUBLIC_SUPABASE_*` dirujuk, `.env` tak diperlukan untuk build
6. Share di WhatsApp/Telegram keluar kad OG (imej + tajuk + deskripsi)
7. Mobile 390px: 0 horizontal overflow, hero boleh dibaca, page < 8,000px tinggi
8. Live Vercel sama dengan `main` selepas push

## Rollback

Satu stage = satu commit → `git revert <sha>`. Backup fail besar sebelum refactor: `*.bak1`.

---

## Stage 0 — Bersihkan repo ✅ (commit `b52f987`)

Kerja responsive 7 fail (+322/−49) masih uncommitted.

- Fail: `components/{Hero,Footer,ContactSection,AboutMeSection,BackgroundSection,ProjectsSection,KeyboardExperienceProjects}.tsx`
- Buang: `3a99bcbf-fb67debe.txt`
- Bukti: commit `b52f987` "style: mobile responsive pass across hero, footer and sections"; `3a99bcbf-fb67debe.txt` dipadam; `git status --short` tinggal `docs/` sahaja (dokumen pelan, belum commit)

---

## Stage 1 — Buang backend mati ✅ (commit `c667cb1`)

Supabase host tak wujud, jadi tiada apa nak dibaiki — dibuang terus.

**Lencongan dari pelan:** borang contact juga dibuang dalam stage ini (bukan Stage 2), sebab padam
`lib/supabaseClient.ts` akan rosakkan kompilasi — borang tu tulis terus ke Supabase. Satu commit, site
kekal hijau.

- Padam: `app/api/contact/route.ts`, `app/api/guestbook/route.ts`, `lib/supabaseClient.ts`,
  `supabase/schema.sql`, `.env.example`, `components/GuestbookSection.tsx`
- `.env.local` dipadam (backup di luar repo: `…/cache/scratch/adamnaeman-env-backup.txt`) — isinya key
  publishable untuk project yang dah tak wujud
- Buang dependency `@supabase/supabase-js`
- `lib/data.ts`: `INITIAL_GUESTBOOK` dibuang; `lib/types.ts`: `GuestbookEntry` dibuang
- `components/ContactSection.tsx`: borang + state + handler Supabase dibuang, diganti panel
  "Direct Channels" dengan butang LinkedIn dan GitHub
- `README.md`: ditulis semula ikut projek sebenar (bukan lagi Supabase/glassmorphism template)

**Bukti (dijalankan, bukan andaian):**
- `tsc --noEmit` → exit 0, 0 baris output
- `npm run build` → Compiled successfully, route table tinggal `/` dan `/_not-found`
- Page JS **108 kB → 43.5 kB**, First Load **195 kB → 131 kB**
- `curl /` → **200**; `curl /api/contact` → **404**; `curl /api/guestbook` → **404**
- HTML lokal: `Sarah Chen` 0, `CONNECT ON LINKEDIN` 1, `adamnaemman` 1
- `grep supabase` tinggal 2 rujukan kandungan: pil `supabase.com` dalam `ContactSection.tsx:476` dan
  id badge `'supabase'` dalam `KeyboardExperienceProjects.tsx:95` → Stage 2/3
- Screenshot panel baru: render betul, tiada teks terpotong

---

## Stage 2 — CTA jujur, sisa identiti (P0)

Butang LinkedIn + GitHub dah masuk dalam Stage 1. Yang tinggal dalam contact section:

- Fail: `components/ContactSection.tsx:314,327,476` — kotak email `adamnaeman@dev.io` + butang COPY
  (domain palsu, tak wujud) → buang, atau tukar bila Adam bagi email sebenar
- Fail: `components/ContactSection.tsx:489` — pil "GITHUB" masih `github.com/adamnaeman` → `adamnaemman`
- Fail: `components/ContactSection.tsx:508` — pil "SUPABASE" (dah tak digunakan) → buang
- Fail: `components/ContactSection.tsx` — teks kiri masih "synchronize with Supabase PostgreSQL" → tulis
  semula ikut saluran sebenar
- Fail: `components/ContactSection.tsx` — tajuk "DIRECT CHANNELS" berulang pada dua kad → kiri tukar
- Fail: `components/Footer.tsx` — GitHub/LinkedIn ikut betul

**Bukti:** `tools/check-links.sh` semua 200; screenshot contact desktop + mobile; `grep -rn "dev.io"`
kosong; `grep -c "adamnaeman\b"` (bukan `adamnaemman`) = 0.

---

## Stage 3 — Kandungan projek sebenar (P0, kerja besar)

Belum ada projek siap → guna kerja sebenar yang ada, label jujur (`FYP — in progress`, `Coursework`,
`Prototype`). Calon dalam mesin:

- `D:\RESEARCH\bagsense-model` — FYP, computer vision / bag detection
- `D:\PROJECTS\TimeRush-coding` + `TimeRush-design` — design + app
- `D:\ML\paddy-disease-classification` + `paddy-webapp` — ML classification + web demo
- `D:\NLP\dgca_meme_sentiment` — NLP sentiment
- `D:\GAME\jrpg-starter-town` — Godot 4.6 cozy garden (town.glb 1,142 mesh)
- `D:\ADAM OS\HQ`, `D:\hermes` — internal tooling

- Fail: `lib/data.ts` — `INITIAL_PROJECTS` jadi kerja sebenar; buang `EXPERIENCES` rekaan dan `STATS`
  yang tak boleh dipertahankan (`3+ years`, `25+ projects`, `10+ databases`, `100% satisfaction`)
- Fail: `components/ProjectsSection.tsx` — buang array projek hardcoded (data diduplikasi), import dari
  `lib/data.ts`
- Fail: `components/BentoAbout.tsx`, `components/AboutMeSection.tsx` — buang dakwaan yang sama

**Input diperlukan:** pilih 3–4 kerja di atas + satu baris apa yang dibuat, stack, status.
**Bukti:** grep 0 placeholder; screenshot section; `check-links.sh` semua 200.

---

## Stage 4 — SEO & shareability (P1)

Live site sekarang **tiada satu pun tag OG** → share WhatsApp/Telegram keluar kosong.

- Fail: `app/layout.tsx` — pindah `themeColor`/`viewport` ke `export const viewport`; tambah
  `metadataBase`, `openGraph`, `twitter`, `alternates`
- Fail baru: `app/opengraph-image.tsx` (1200×630)
- Fail baru: `app/robots.ts`, `app/sitemap.ts`
- Fail: `app/page.tsx` — JSON-LD `Person` (nama, github, linkedin)

**Bukti:** `curl -s https://adamnaeman.vercel.app | grep -o 'og:[a-z]*' | sort -u` → ada; build 0 warning.

---

## Stage 5 — Berat halaman (P1)

11 Google Font family dalam satu `@import`; 545K PNG + 345K JPG dalam `public/`.

- Fail: `app/globals.css` — buang `@import` Google Fonts
- Fail: `app/layout.tsx` — `next/font` untuk 2–3 family sahaja
- Fail: `components/AboutMeSection.tsx` — `next/image` untuk diorama, compress ke webp
- Bukti: bilangan request font, saiz `public/`, nombor build sebelum/selepas

---

## Stage 6 — UX desktop & mobile (P2)

- Fail: `components/Navbar.tsx` — nav nampak pada ≥1024px (sekarang hamburger walaupun 1440px)
- Fail: `components/Hero.tsx` — satu baris positioning: siapa / buat apa / status
- Fail: `components/Hero.tsx` — label "let's connect" jangan rapat tepi pada 390px
- Fail: casing label seragam (`About Me`, `Background`, `Experience`, `Contact`)
- Bukti: screenshot 1440 + 390; `document.body.scrollHeight` (sekarang 11,309px)

---

## Stage 7 — Hutang kod (P2, paling akhir)

- `ProjectsSection.tsx` 1,866 baris, `BackgroundSection.tsx` 1,113, `ContactSection.tsx` 896 → pecah
- Inline style berulang → token yang dah ada dalam `globals.css`
- Buang `use client` pada komponen statik
- Bukti: LOC sebelum/selepas, build lulus, screenshot sama

---

## Tertunggak (bila bahan wujud)

- **CV PDF** → `public/cv.pdf` + butang di Hero dan Contact
- **Email sebenar** → `mailto:` pada kad contact (tanpa backend)
- **Projek baru** → tambah entri dalam `lib/data.ts` sahaja (selepas Stage 3, satu tempat)

## Tidak dilakukan (keputusan Adam)

- Guestbook + Supabase: dibuang, bukan dibaiki
- Supabase `fzdjodhnhnycpuariegq`: host NXDOMAIN — nak DB semula bermakna cipta project baru
