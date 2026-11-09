# Laporan Akhir — Portfolio (D:\adamnaeman)

**Projek:** Portfolio peribadi Adam Naeman
**Live:** https://adamnaeman.vercel.app/
**Repo:** github.com/adamnaemman/adamnaeman (`main`)
**Tempoh:** 9 Nov 2026
**Pelan asal:** `docs/stages.md` (v2, 9 stage — Stage 0–6 siap penuh, Stage 7 sebahagian)

---

## Ringkasan

Projek ni pada mulanya lulus `tsc` dan `npm run build`, tapi isi dan backend-nya rosak: semua projek
dalam portfolio adalah rekaan dengan link GitHub 404, ada tiga "testimoni" palsu, tiga syarikat yang
tak wujud, kelulusan "FIRST CLASS HONORS" yang belum berlaku, dan borang contact yang membalas
`{"success":true}` sambil membuang mesej orang. Backend Supabase memang tak wujud — host-nya NXDOMAIN.

Selepas kerja: 6 projek sebenar yang boleh dibuka dalam mesin, tiada satu pun link mati, tiada env var
diperlukan, halaman turun dari **195 kB → 125 kB** First Load, dan setiap dakwaan dalam site boleh
dipertahankan dalam temuduga.

---

## Fail utama yang berubah

| Fail | Apa |
|---|---|
| `lib/data.ts` | 6 projek sebenar + timeline + coursework + stats yang boleh dipertahankan (satu-satunya sumber data) |
| `lib/types.ts` | `Project` dapat `tagline/architecture/metrics/status`; `GuestbookEntry` dibuang |
| `components/ProjectsSection.tsx` | 1,866 → 546 baris; array projek hardcoded dibuang (import dari `lib/data.ts`); badge status ikut data |
| `components/projects/ComputerMockup.tsx` | baru — mockup laptop dikeluarkan dari ProjectsSection |
| `components/KeyboardExperienceProjects.tsx` | 22 key (Docker, Rust, GraphQL, GCP, Supabase…) → 14 key yang benar-benar dipakai |
| `components/BackgroundSection.tsx` | timeline/credential palsu → FYP, self-directed, coursework, hardware |
| `components/AboutMeSection.tsx` | bio "cloud developer, PostgreSQL, GCP" → student tahun akhir, apa yang dibina |
| `components/ContactSection.tsx` | borang (yang menelan mesej) → panel LinkedIn + GitHub + email sebenar |
| `components/Hero.tsx` | italic "portfolio" tak lagi menimpa wordmark; positioning line; label mobile tak terpotong |
| `components/Navbar.tsx` | nav desktop ≥1024px (ABOUT / BACKGROUND / PROJECTS / LET'S CONNECT) + hamburger untuk mobile |
| `components/Footer.tsx` | "Full Stack Craftsman & Cloud Solutions Architect" → keterangan jujur + badge GitHub/LinkedIn |
| `app/layout.tsx` | `next/font` 6 family, `viewport` export, `metadataBase`, openGraph + twitter |
| `app/page.tsx` | JSON-LD `Person` |
| `app/robots.ts`, `app/sitemap.ts` | baru |
| `app/globals.css` | `@import` Google Fonts dibuang; token font ikut `--ff-*`; CSS workstation dipindah masuk |
| `app/icon.png` | baru — favicon (sebelum ini `/favicon.ico` 404) |
| `public/og.png` | baru — kad OG 1200×630 |
| `public/projects/*.webp` | 6 kad projek daripada render/screenshot sebenar (tiada gambar stok) |
| `tools/check-links.sh` | baru — curl setiap URL dalam sumber, exit 1 kalau ada yang mati |
| `tools/make-og.py`, `tools/make-icon.py` | baru — aset dijana semula bila-bila masa |
| `README.md` | ditulis semula ikut projek sebenar |

**Dibuang:** `app/api/contact`, `app/api/guestbook`, `lib/supabaseClient.ts`, `supabase/schema.sql`,
`components/GuestbookSection.tsx`, `.env.local`, `.env.example`, `@supabase/supabase-js`,
`public/about-tray-diorama.png` (545 kB) + `.jpg` (345 kB) — dua-dua tak pernah dirujuk.

---

## Angka sebelum / selepas

| Ukuran | Sebelum | Selepas |
|---|---|---|
| First Load JS | 195 kB | **125 kB** |
| Page JS | 108 kB | **37.4 kB** |
| Route | `/` + 2 API | `/`, `/_not-found`, `/robots.txt`, `/sitemap.xml`, `/icon.png` (statik) |
| Font | 11 family, 53 kB CSS @import, 129 `@font-face` | 6 family, 7 woff2 / 116 kB, 40 `@font-face`, 0 request ke Google |
| `public/` | ≈1.07 MB (2 fail tak digunakan) | **208 KB** (7 fail, semua dirujuk) |
| `ProjectsSection.tsx` | 1,866 baris | **546** |
| Jumlah LOC (app+components+lib) | 8,387 | 6,721 |
| Link mati (`check-links.sh`) | 6 | **0** |
| Env var diperlukan | 2 | **0** |

---

## Masalah yang dijumpai semasa kerja (bukan dalam audit awal)

1. **Borang contact menipu.** `POST /api/contact` balas `{"success":true,"message":"...Demo mode..."}` dan
   mesej hilang. Bukan "Supabase tak configure" — route tu memang tiada sink.
2. **Supabase host NXDOMAIN.** `nslookup fzdjodhnhnycpuariegq.supabase.co` → *Non-existent domain*. Bukan
   paused; project tu tiada. Sebab itu keputusan: buang DB layer, bukan baiki key.
3. **Username GitHub salah.** Remote `adamnaemman` (repo privat, `git ls-remote` lulus), tapi semua link
   dalam kod `github.com/adamnaeman` — akaun lain (balas 200). Setiap link portfolio menghala ke akaun orang.
4. **`GuestbookSection` tak pernah dirender.** Tiada komponen import dia — jadi testimoni palsu tak pernah
   dilihat visitor, tapi API-nya tetap menyajikan data palsu. Dibuang terus.
5. **Badge status hardcoded "LIVE".** Projek FYP yang belum siap dipaparkan sebagai "LIVE". Sekarang ikut
   `project.status`.
6. **URL bar palsu.** Mockup laptop tunjuk `adamnaeman.dev/...` — domain tak wujud.
7. **`/favicon.ico` 404** dan 890 kB gambar mati dalam `public/`.
8. **`next/og` gagal prerender** pada Windows + Next 14 (`TypeError: Invalid URL` dalam `fileURLToPath`).
   Diganti dengan PNG statik; tag OG sama.
9. **styled-jsx hanya di-inject selepas hydration**, jadi SSR HTML keluar tanpa CSS komponen (nampak
   sebagai flash unstyled + "segelintir" cuplikan yang tangkap sebelum hydration). Navbar kini guna
   `<style>` biasa supaya CSS masuk SSR.

---

## Bukti (dijalankan, bukan andaian)

1. `npx tsc --noEmit` → exit 0, 0 baris output.
2. `npm run build` → Compiled successfully; route table di atas; 0 warning "Unsupported metadata".
3. `bash tools/check-links.sh` → `all links ok` (sebelum ini 6 FAIL: 4 × GitHub 404, 2 × deployment mati).
4. Live HTTP: `/` 200, `/og.png` 200, `/robots.txt` 200, `/sitemap.xml` 200, `/icon.png` 200,
   `/api/contact` **404**, `/api/guestbook` **404**.
5. HTML live mengandungi `og:title`, `og:description`, `og:image` (1200×630 + alt), `og:type`, `og:url`,
   `og:site_name`, `og:locale`, `twitter:card=summary_large_image`, `<link rel=canonical>`,
   `"@context":"https://schema.org"`, `"@type":"Person"`.
6. `grep` nama palsu (`CloudScale|Nexus|Aura|Pulse|Digital Innovation|High Growth|99.98|45k evt|dev.io`)
   dalam `app/ components/ lib/` → **0 padanan**.
7. Chromium headless (CDP) pada produksi build: desktop 1440 → `navbar-desktop-nav: flex`,
   `navbar-hamburger: none`, `overflowX: 0`; mobile 390 → nav none / hamburger block / `overflowX: 0`,
   label "let's connect" hujung 368px dalam viewport 390px.
8. Font runtime: 7 woff2 / 116 kB, `fonts.googleapis|gstatic` = 0, `document.fonts` 40 deklarasi.
9. Overlay workstation: 6 komputer, `laptop-lid` radius 14px + shadow `6px 6px #000`, imej `naturalWidth=450`.

---

## Yang tinggal

1. **CV PDF** — belum wujud; belum ada butang "Download CV". Bila ada, letak `public/cv.pdf` dan tambah
   satu butang di Hero + Contact.
2. **`BackgroundSection.tsx` (994 baris) dan `ContactSection.tsx` (749)** — belum dipecah ikut section.
   Corak sama seperti Stage 7 boleh dipakai.
3. **Guestbook** — user pilih buang; kalau nak hidupkan semula, kena cipta Supabase project baru dan
   jalankan schema baru (RLS + had panjang mesej).
4. **Preload font** — next/font tak keluarkan `<link rel=preload as=font>` kerana font didaftar sebagai
   CSS variable pada `<html>`. Bukan blocker (same-origin + `display:swap`).
5. **`docs/stages-v1.md`** masih dalam repo sebagai rujukan sejarah; boleh dipadam bila tak perlu.

---

## Cara verify sendiri

```bash
cd /d/adamnaeman
npx tsc --noEmit            # 0 output
npm run build               # Compiled successfully
bash tools/check-links.sh   # all links ok
npm run start               # http://localhost:3000
```

```bash
git log --oneline 64a39f4..HEAD   # 26 commit kerja
git revert <sha>                  # undur satu stage tanpa sentuh yang lain
```
