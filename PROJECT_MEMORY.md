# Project Memory — checklist-peserta-kemenkeu-dan-klpd

## Latest Update

**2026-06-28 — Iterasi UI checklist berdasarkan gambar `1-data-awal.png`.**

Perubahan dikerjakan di branch `feat/sticky-expand-hidden-fields`, di-merge ke `main`, dan di-deploy ke Vercel production.

- **Sembunyikan 6 field Data Awal (kotak merah)** dari tampilan dan perhitungan progress untuk Kemenkeu dan KLPD:
  - `Unit/Satuan Kerja`
  - `Nama PIC Unit/Satuan Kerja`
  - `NIP`
  - `NAMA`
  - `EMAIL`
  - `ID INSTANSI`
  - File: `scripts/extract-checklist-data.py` + regenerasi `lib/data/checklist-data.ts`.
- **Sticky header** untuk `Data Awal`, `Checklist Non-Dokumen`, dan `Checklist Dokumen` agar pengguna tetap tahu posisi dan progress saat scroll.
- **Tombol icon expand/collapse** (chevron up/down) di setiap section header agar pengguna bisa merapikan tampilan setelah menyelesaikan suatu bagian.
- **Git workflow:** branch → conventional commit → push → merge → push `main`.
- **Deploy Vercel production:** https://checklist-peserta-kemenkeu-dan-klpd-dazqn67fn.vercel.app

## Lesson Learned

- **Data auto-generated harus diupdate lewat generator script, bukan edit manual.** Field Data Awal yang disembunyikan ditandai di `scripts/extract-checklist-data.py` sebagai `HIDDEN_DATA_AWAL_LABELS`, lalu `lib/data/checklist-data.ts` diregenerasi. Ini menjaga konsistensi jika Excel berubah di masa depan.
- **`applies: false` adalah cara paling bersih untuk menyembunyikan item dari UI dan progress.** Karena hook dan komponen sudah filter berdasarkan `applies`, satu perubahan di data file menyelesaikan dua masalah sekaligus (tidak ditampilkan + tidak masuk progress).
- **Sticky header dengan `grid-template-rows` animation untuk expand/collapse** memberikan UX yang halus tanpa JS rumit. Perlu memastikan header punya `z-index` tinggi dan background solid/backup-blur agar konten di belakangnya tidak bocor.
- **Desktop folder di macOS bisa memiliki atribut keamanan** (`com.apple.quarantine`, `com.apple.macl`, `com.apple.provenance`) yang memblokir proses server lokal/Node.js secara sporadis. Jika `next dev` mengalami `EPERM: operation not permitted`, solusinya adalah memindahkan project keluar dari Desktop atau memberi Full Disk Access ke aplikasi terminal/Kimi Code.
- **Git workflow feature-branch tetap perlu dijaga meskipun user minta deploy cepat.** Commit langsung ke `main` dihindari; perubahan dikerjakan di branch, lalu di-merge dan push ke `main` untuk production deploy.

## Next Action Recommended

1. **Isi container Link Penting**
   File: `lib/data/checklist-data.ts` (field `link`) atau file konfigurasi terpisah.
   Mengapa: User sedang mengumpulkan link format dokumen; container sudah siap di UI.

2. **Pindahkan repo keluar dari Desktop (opsional tapi direkomendasikan)**
   Target: `~/codex/checklist-peserta-kemenkeu-dan-klpd` atau lokasi non-Desktop lain.
   Mengapa: Menghindari masalah permission macOS (`EPERM`) saat development lokal.

3. **Update README fitur**
   File: `README.md`.
   Mengapa: Tambahkan sticky header, expand/collapse, dan field tersembunyi ke daftar fitur agar dokumentasi tetap akurat.

4. **Upgrade Next.js ke versi patched**
   File: `package.json`.
   Mengapa: Next.js 14.2.21 memiliki vulnerability yang diumumkan; upgrade ke 14.2.28+ atau 15.x.

5. **Tambahkan analytics/error tracking (opsional)**
   Mengapa: Untuk memantau penggunaan aplikasi setelah go-live.

6. **Custom domain (opsional)**
   Mengapa: URL Vercel bawaan panjang; custom domain meningkatkan trust dan kemudahan akses.

## Status Proyek

| Area | Status |
|------|--------|
| Skill start/update | ✅ Done |
| Scaffolding | ✅ Done |
| Data extraction | ✅ Done |
| Routing & UI | ✅ Done |
| Sticky header + expand/collapse | ✅ Done |
| Hidden Data Awal fields | ✅ Done |
| State management | ✅ Done |
| Quality gate | ✅ Passed |
| GitHub repo | ✅ Done |
| Vercel deploy | ✅ Live |
| Link dokumen | ⏳ Pending (container ready) |
