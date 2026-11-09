# stages.md — Portfolio (D:\adamnaeman) — v2

**Projek:** Portfolio peribadi Adam Naeman (Next.js 14, static + Vercel)
**Live:** https://adamnaeman.vercel.app/ (deploy commit `64a39f4`, sebelum kerja responsive)
**Status:** ongoing — projek berasingan dari Adam OS (D:\ADAM OS\HQ)
**v1 disimpan sebagai `stages-v1.md`.** v2 (9 Nov 2026) disemak ikut jawapan Adam: belum ada projek
siap, tiada CV, GitHub `adamnaemman`, Supabase mati, guestbook dibuang. **Update:** email diberi
(`0damkim254@gmail.com`) → CTA email jadi sah, buang `dev.io`.

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

## Stage 2 — CTA jujur, sisa identiti ✅ (commit `e600d9d`)

Butang LinkedIn + GitHub dah masuk dalam Stage 1. Yang tinggal dalam contact section:

- Fail: `components/ContactSection.tsx` — kotak email `adamnaeman@dev.io` → **`0damkim254@gmail.com`**
  (mailto, teks, butang COPY)
- Fail: pil "GITHUB" `github.com/adamnaeman` → `github.com/adamnaemman`
- Fail: pil "SUPABASE" (dah tak digunakan) → dibuang, diganti pil LINKEDIN
- Fail: teks kiri "synchronize with Supabase PostgreSQL" → ditulis semula
- Fail: tajuk "DIRECT CHANNELS" berulang → kad kanan jadi "START A CONVERSATION"
- `tools/check-links.sh` ditambah (curl setiap URL dalam sumber)

**Bukti:**
- `tsc --noEmit` → exit 0; `npm run build` → Compiled successfully, `/` 43.5 kB, First Load 131 kB
- `bash tools/check-links.sh` → 6 FAIL, semuanya link projek palsu Stage 3
  (`github.com/adamnaeman/{aura-ui-studio,cloudscale-analytics,nexus-hub,pulse-collab}` 404).
  Link identiti 200: `github.com/adamnaemman`, `adamnaeman.vercel.app`; LinkedIn 999 (bot-block, bukan rosak)
- Screenshot 1440: header kiri "CONTACT DETAILS", kanan "START A CONVERSATION", email baru, pil
  GITHUB/LINKEDIN/VERCEL, butang CTA styled
- DOM: `#contact a[href^=mailto]` = `0damkim254@gmail.com`; pil = `GITHUB, LINKEDIN, ▲ VERCEL`
- `grep -rn "dev.io"` → 0

**Nota:** `components/Footer.tsx` berubah di luar stage ini (badge GitHub/LinkedIn) dan terbawa dalam
commit yang sama. `tsconfig.json` dalam commit itu tercemar oleh `next dev` (reformat + include
`.next/s2/types` yang tak wujud) — dipulihkan dalam `fe87d22`; `tsc --noEmit` exit 0 dan
`npm run build` lulus (43.5 kB / 131 kB) selepas pulih.

---

## Stage 3 — Kandungan projek sebenar ✅ (commit `6e8f46f`)

Belum ada projek siap → guna kerja sebenar yang ada, label jujur. **Enam projek**, semua ada sumber:

1. This Portfolio — Next.js 14 static, 129 kB first load
2. BagSense — FYP, model parametrik Blender + konsep ESP32/e-paper
3. DGCA Meme Sentiment — PyTorch, BERT + ResNet50, Memotion 2020
4. Paddy Disease App — classifier + React 19 + Vite + Firebase + Gemini
5. Cozy Garden Town — Godot 4.6.2, town mesh 1,142 objek
6. TimeRush — ESP32 line follower, PID, 5 sensor IR

- Fail: `lib/data.ts` — `PROJECTS` jadi satu-satunya sumber; `ProjectsSection.tsx` import, array
  hardcoded kedua dibuang
- Fail: `components/ProjectsSection.tsx` — badge status ikut `project.status` (dulu semua tulis "LIVE"
  walaupun projek belum siap); URL bar `adamnaeman.dev` → `adamnaeman.vercel.app`
- Fail: `components/BackgroundSection.tsx` — timeline palsu (CloudScale Technologies, Digital Innovation
  Studios, High Growth Labs) → BagSense / self-directed / coursework / hardware; "FIRST CLASS HONORS //
  DEAN'S LIST" + "Graduated top-tier" → "FINAL YEAR // IN PROGRESS"; "Industry Certifications" →
  "Coursework & Training"; chip kursus rekaan → kursus sebenar
- Fail: `components/KeyboardExperienceProjects.tsx` — 22 key (Docker, Rust, GraphQL, GCP, Supabase…)
  → 14 key yang betul-betul dipakai; pengalaman rekaan per key dibuang
- Fail: `lib/data.ts` — `STATS` "4+ years / 30+ deploys / 99.98% SLA / 100% satisfaction"
  → 6 projek / 0 placeholder / static deploy / 2 disiplin
- Fail: `components/AboutMeSection.tsx` — bio "cloud developer, PostgreSQL, GCP" → student tahun akhir,
  apa yang betul-betul dibina
- Fail: `components/Footer.tsx` — "Full Stack Craftsman & Cloud Solutions Architect" → "Full stack
  developer · software, ML and 3D"
- Fail: `components/ContactSection.tsx` — "Kuala Lumpur // Remote Worldwide" → "Malaysia // Remote
  friendly"; "Under 24 Hours Guaranteed" → "Usually within 24 hours"
- Fail: `app/layout.tsx` — title/description/keywords tak lagi dakwa cloud engineering
- Fail baru: `public/projects/*.webp` — render BagSense sebenar, screenshot portfolio, poster TimeRush,
  kad tipografi untuk projek tanpa screenshot (tiada gambar stok)

**Bukti:**
- `tsc --noEmit` → exit 0; `npm run build` → Compiled successfully, `/` 41.9 kB, First Load 129 kB
- `bash tools/check-links.sh` → **all links ok** (sebelum ini 6 FAIL)
- DOM overlay: badge = `LIVE, IN PROGRESS, COURSEWORK, COURSEWORK, PROTOTYPE, HARDWARE BUILD`
- `grep` nama palsu (`CloudScale|Nexus|Aura|Pulse|Digital Innovation|High Growth|99.98|45k evt|dev.io`)
  → 0 padanan dalam `app/ components/ lib/`
- Screenshot: overlay 6 workstation dengan imej sebenar; timeline + coursework render betul
- Macropad: 14 key, label `ADAM.MK // 14-KEY MECHANICAL ORTHO`

---

## Stage 4 — SEO & shareability ✅ (commit `2e18648`)

Live site sebelum ini **tiada satu pun tag OG** → share WhatsApp/Telegram keluar kosong.

- Fail: `app/layout.tsx` — `themeColor`/`viewport` pindah ke `export const viewport` (`import type { Viewport }`
  dari `next`); tambah `metadataBase`, `alternates.canonical`, `openGraph` (type `website`, url, siteName,
  title, description, locale `en_MY`, `images` 1200×630 + alt) dan `twitter` (`summary_large_image` + image)
- Fail baru: `app/robots.ts`, `app/sitemap.ts` (`MetadataRoute`; sitemap senaraikan `/` sahaja)
- Fail: `app/page.tsx` — JSON-LD `Person` (name, url, jobTitle, knowsAbout, sameAs GitHub + LinkedIn, address MY)
- Fail baru: `public/og.png` — 1200×630, 33,160 bait, aksen `#aef324` + hitam, nama + baris positioning +
  domain. Bukan imej stok.

**Lencongan dari pelan:** `app/opengraph-image.tsx` (`next/og` `ImageResponse`) dibuang. Pada mesin ini ia
gagal semasa prerender: `TypeError: Invalid URL` di `fileURLToPath` dalam
`node_modules/next/dist/compiled/@vercel/og/index.node.js` (isu Windows + Next 14, bukan kod projek).
Dengan `export const runtime = 'edge'` build lulus tetapi route jadi dynamic (`ƒ /opengraph-image`) — imej
dirender setiap request dan tiada fail output untuk disahkan masa build. PNG statik dipilih: deterministik,
boleh disahkan, tiada runtime.

**Bukti (dijalankan pada working tree = `2e18648`):**
- `npx tsc --noEmit` → exit 0, **0 baris output**
- `npm run build` → Compiled successfully; `grep -ciE "unsupported metadata|themeColor|viewport"` pada log build
  → **0** (warning `Unsupported metadata themeColor/viewport` tiada lagi). Route table: `/` (41.9 kB / First Load 129 kB), `/_not-found`,
  `/robots.txt`, `/sitemap.xml`
- Header PNG (IHDR) `public/og.png` → **1200 × 630**, bitDepth 8, colorType 2, 33,160 bait
- `.next/server/app/index.html` (107,617 bait) mengandungi: `og:title`, `og:description`, `og:url`,
  `og:site_name=Adam Naeman`, `og:locale=en_MY`, `og:type=website`,
  `og:image=https://adamnaeman.vercel.app/og.png`, `og:image:width=1200`, `og:image:height=630`, `og:image:alt`,
  `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`,
  `<link rel="canonical" href="https://adamnaeman.vercel.app">`
- JSON-LD: 1 blok, `JSON.parse` lulus → `@type=Person`, `name=Adam Naeman`, `sameAs` =
  `github.com/adamnaemman` + `linkedin.com/in/adam-naeman/`
- `.next/server/app/robots.txt.body` (111 bait):
  `User-Agent: *` / `Allow: /` / `Host: https://adamnaeman.vercel.app` /
  `Sitemap: https://adamnaeman.vercel.app/sitemap.xml`
- `.next/server/app/sitemap.xml.body` (264 bait): `<loc>https://adamnaeman.vercel.app</loc>`, `changefreq monthly`,
  `priority 1`
- Imej OG dibuka dan dilihat: teks tidak terpotong (salinan preview dalam
  `…/profiles/developer/cache/scratch/og-preview.png`, bukan dalam repo)
- Runtime `npx next start -p 3111` + curl: `/` **200** (107,690 bait HTML), `/robots.txt` **200**,
  `/sitemap.xml` **200**, `/og.png` **200** `image/png` `Content-Length: 33160` (bait sama dengan
  `public/og.png`); tag `og:*`, `twitter:*`, `rel="canonical"` keluar dari server sebenar

**Live (disahkan dari mesin ini, `curl https://adamnaeman.vercel.app`):**
- `/og.png` → **200** `image/png`, IHDR **1200 × 630**, 33,160 bait (bait sama dengan `public/og.png` dalam repo)
- `/robots.txt` → **200**, kandungan sama seperti build; `/sitemap.xml` → **200**, 1 URL
- HTML live 107,690 bait dengan `og:title`, `og:description`, `og:image` (+width/height/alt), `og:type`,
  `og:url`, `og:site_name`, `og:locale`, `twitter:card` dan `<link rel="canonical">`

**Tinggal (dah selesai):** `public/og.png` kini ada penjana — `tools/make-og.py` (commit `fcb6089`).
Skrip Pillow itu menghasilkan semula card **byte-identik** dengan asal (sha256 `6c60829e…`, 33,160 bait,
756,000/756,000 piksel sama), guna font sistem (Arial Bold/Regular, Consolas), tiada rangkaian.

---

## Stage 5 — Berat halaman ✅ (commit `3799ff3`; asas `4c7c940`)

Baseline: 11 Google Font family dalam satu `@import` (**53 kB CSS, 129 `@font-face`**, semua dari
`fonts.googleapis.com`), 890 kB gambar dalam `public/` yang **tidak dirujuk di mana-mana**.

**Peranan font yang betul-betul dipakai** (dikira dengan `grep -- "--font-"` pada `app/ components/ lib/`,
bukan diandaikan) — 8 peranan, bukan 6:

| var | family | dipakai oleh |
|---|---|---|
| `--font-body` | Plus Jakarta Sans 400/600/700/800 | `body{}` → **337/756 elemen** mewarisinya |
| `--font-poppins` | Poppins 400/500/600/700/800/900 | 95 rujukan (hero, about, background…) |
| `--font-display` | Space Grotesk (variable) | 36 rujukan |
| `--font-pixel` | Silkscreen 400/700 | 19 rujukan |
| `--font-mono` | JetBrains Mono (variable) | 15 rujukan |
| `--font-bubble` | Titan One 400 | 10 rujukan (`.section-title`) |
| `--font-serif` | Playfair Display **italic 600** | overlay "portfolio" dalam `Hero.tsx` |
| `--font-graffiti` | Permanent Marker 400 | label "Pop!" dalam `RetroStudioDiorama.tsx` |

Dibuang kerana tiada peranan: **Syne**, **Cormorant Garamond**, **Bungee** (ketiga-tiganya hanya muncul
sebagai nilai dalam `:root` yang tidak digunakan), dan var mati `--font-script` / `--font-calligraphy`
(Alex Brush / Great Vibes — tidak pernah dimuatkan, jatuh ke `cursive`).

- Fail: `app/globals.css` — `@import` Google Fonts dibuang; `--font-*` kini `var(--ff-*)` dari `next/font`
  dengan fallback sistem (`system-ui`, `Georgia`, `ui-monospace`, `cursive`)
- Fail: `app/layout.tsx` — 8 `next/font/google`, setiap satu `variable: '--ff-*'` pada `<html>`;
  `display: 'swap'`
- Fail: `public/about-tray-diorama.png` (557,686 B) + `.jpg` (352,307 B) — **dipadam, bukan ditukar ke
  WebP**: `grep` seluruh repo tunjuk 0 rujukan (section About ialah CSS; `RetroStudioDiorama` tidak
  pernah di-mount). Salinan asal di luar repo:
  `…/developer/cache/scratch/diorama-originals/` (sha256 `6de5a1df…` / `322d1a10…`)
- Fail baru: `app/icon.png`, `tools/make-icon.py`, `tools/make-og.py` (aset dijana semula dengan PIL)

**Bukti (dijalankan pada working tree = `3799ff3`, prod build lokal):**
- `npx tsc --noEmit` → **exit 0, 0 baris output**
- `npm run build` → **Compiled successfully**, 0 warning; `/` **42.2 kB / First Load 130 kB**
- Kawalan bahawa font tidak menambah JS: build `bd604e1` (kerja hero/nav) **tanpa** perubahan font ini
  juga **42.2 kB / 130 kB** → delta font = **0 kB**. Kenaikan dari baseline 41.9/129 datang dari Stage 6
- CSS build: **29,478 bait**, 62 `@font-face`, **0** `@import`, **0** `fonts.googleapis|gstatic`
  (`grep -c` pada `.next/static/css/*.css`)
- Font: **42 fail woff2 / 619,564 bait** dalam `.next/static/media`, 14 daripadanya preload
  (`.p.woff2`, **206,960 bait**); Chromium runtime ambil **10 woff2 same-origin**, **0 request** ke
  `fonts.googleapis|gstatic`; `@font-face` declared **129 → 62**
- `public/` penuh: **1,119,123 B → 209,130 B** (−81%); tinggal `og.png` 33,160 B + `projects/` 175,970 B
- Screenshot 1440 & 390 (hero / about / projects): Poppins kekal untuk headline+badan, Playfair italic
  untuk "portfolio", tiada teks terpotong; `document.body.scrollHeight` **6,907px** (1440) dan
  **10,726px** (390), `scrollWidth` ≤ viewport (0 overflow mendatar)
- `bash tools/check-links.sh` → all links ok

**Nota:**
- `4c7c940` (draf pertama stage ini) tinggalkan 6 family sahaja dengan `--font-body` dipetakan ke Poppins —
  seluruh badan halaman bertukar rupa secara senyap. `3799ff3` pulihkan `--font-body` (Plus Jakarta Sans),
  `--font-graffiti` (Permanent Marker) dan pemberat Poppins 500.
- Permanent Marker kekal walaupun `RetroStudioDiorama` tidak di-mount (28.6 kB, bukan preload). Boleh
  dibuang bila komponen itu dipadam — masa itu `--font-graffiti` jadi peranan mati.
- Preload memang dihasilkan `next/font` (fail `.p.woff2`); nota draf sebelum ini yang kata sebaliknya salah.

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
- **Projek baru** → tambah entri dalam `lib/data.ts` sahaja (selepas Stage 3, satu tempat)

Email sebenar dah ada (`0damkim254@gmail.com`) — tak lagi tertunggak, masuk Stage 2.

## Tidak dilakukan (keputusan Adam)

- Guestbook + Supabase: dibuang, bukan dibaiki
- Supabase `fzdjodhnhnycpuariegq`: host NXDOMAIN — nak DB semula bermakna cipta project baru
