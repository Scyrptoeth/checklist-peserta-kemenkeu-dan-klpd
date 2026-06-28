# Project Memory — checklist-peserta-kemenkeu-dan-klpd

## Latest Update

**2026-06-28 — Transformasi Data Awal menjadi form input, layout progress sticky, dan deploy production.**

Perubahan dikerjakan di branch `feat/data-awal-form-and-progress`, di-merge ke `main`, dan di-deploy ke Vercel production.

- **Layout progress sticky:**
  - Panel *Progress Keseluruhan* pindah ke **kiri** sebagai sidebar sticky di desktop (`lg`).
  - Versi mobile menggunakan **sticky top summary** yang bisa expand/collapse.
  - Berlaku untuk semua klaster dan sub-klaster.
  - File: `components/checklist-page-client.tsx`, `components/progress-panel.tsx`.

- **Data Awal menjadi kolom isian (bukan checkbox):**
  - `Unit Kerja`, `JALUR`, `PRODI ASAL`, `PRIORITAS PILIHAN PRODI 1–5`, dan `STATUS PILIHAN PRODI`.
  - Dropdown bertingkat: Prioritas Prodi 1–5 bergantung pada `PRODI ASAL` sesuai mapping `K_*` di Excel.
  - `STATUS PILIHAN PRODI` **terkomputasi** sesuai rumus Excel dengan indikator warna merah/hijau/oranye.
  - File: `components/data-awal-section.tsx`, `lib/data/status-utils.ts`, `lib/data/reference-data.ts`.

- **Mutual exclusivity antar Prioritas Prodi:**
  - Prodi yang sudah dipilih di satu prioritas tidak muncul lagi di dropdown prioritas lain.
  - Prioritas yang tersisa otomatis **disabled** ketika semua pilihan prodi tujuan (`_avail`) sudah dipilih.

- **Progress Data Awal disembunyikan sepenuhnya:**
  - Tidak ada badge `X/Y terisi`, progress bar, atau persentase di section Data Awal.
  - *Progress Keseluruhan* hanya mencakup **Non-Dokumen + Dokumen**.
  - Angka persentase dihilangkan dari seluruh progress bar; yang tersisa hanya bar visual dan count selesai/total.
  - File: `components/data-awal-section.tsx`, `components/progress-bar.tsx`, `components/progress-panel.tsx`, `hooks/use-checklist-progress.ts`.

- **Tombol Reset diperkecil:** style diubah menjadi tombol teks ringan dengan ikon, tidak lagi memakan ruang besar.

- **Generator script diperbarui:**
  - `scripts/extract-checklist-data.py` mengekstrak `BidangList`, mapping prodi tujuan, dan daftar instansi KLPD dari Excel.
  - Menghasilkan `lib/data/reference-data.ts` dan meregenerasi `lib/data/checklist-data.ts` dengan metadata field Data Awal.

- **State & storage:**
  - `useChecklistProgress` menyimpan state `dataAwal` terpisah dari checkbox.
  - Storage version naik ke **v2** — data lama v1 di-reset otomatis.
  - Export/Import JSON mencakup Data Awal.

- **Git workflow:** branch `feat/data-awal-form-and-progress` → conventional commit → push → merge → push `main`.
- **Deploy Vercel production:** https://checklist-peserta-kemenkeu-dan-klpd.vercel.app

---

## Lesson Learned

- **Data auto-generated harus diupdate lewat generator script, bukan edit manual.** Field Data Awal yang disembunyikan ditandai di `scripts/extract-checklist-data.py` sebagai `HIDDEN_DATA_AWAL_LABELS`, lalu `lib/data/checklist-data.ts` diregenerasi. Ini menjaga konsistensi jika Excel berubah di masa depan.
- **`applies: false` adalah cara paling bersih untuk menyembunyikan item dari UI dan progress.** Karena hook dan komponen sudah filter berdasarkan `applies`, satu perubahan di data file menyelesaikan dua masalah sekaligus (tidak ditampilkan + tidak masuk progress).
- **Sticky sidebar membutuhkan parent flex dengan `align-items: stretch`.** Jika parent menggunakan `items-start`, kolom kiri hanya setinggi kontennya sendiri sehingga sticky tidak bisa mengikuti scroll.
- **Menghindari angka persentase pada Data Awal mengurangi beban psikologis pengguna.** Karena jumlah prioritas prodi tujuan bervariasi antar PRODI ASAL, persentase membuat perasaan "kurang" yang tidak adil. Count selesai/total atau bar visual tanpa angka lebih netral.
- **Mutual exclusivity di dropdown lebih baik daripada validasi error pasca-pilih.** Mencegah duplikat sejak awal lebih ramah pengguna daripada menampilkan status merah setelah terjadi kesalahan.
- **Build Next.js di Vercel kadang menghasilkan lambda functions, bukan static pages.** Hal ini normal untuk App Router tanpa `output: 'export'`; yang penting deployment status Ready dan konten bisa diakses melalui canonical domain.
- **Clean rebuild (hapus `.next`) sering diperlukan setelah perubahan besar.** Dev server yang berjalan di background dapat menyebabkan cache build korup dan error `PageNotFoundError`.

## Next Action Recommended

1. **Isi container Link Penting**
   File: `lib/data/checklist-data.ts` (field `link`) atau file konfigurasi terpisah.
   Mengapa: User sedang mengumpulkan link format dokumen; container sudah siap di UI.

2. **Pindahkan repo keluar dari Desktop (opsional tapi direkomendasikan)**
   Target: `~/codex/checklist-peserta-kemenkeu-dan-klpd` atau lokasi non-Desktop lain.
   Mengapa: Menghindari masalah permission macOS (`EPERM`) saat development lokal.

3. **Update README fitur**
   File: `README.md`.
   Mengapa: Dokumentasi perlu mencerminkan Data Awal sebagai form input, progress sticky, mutual exclusivity, dan hilangnya persentase.

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
| Sticky progress panel (kiri + mobile top) | ✅ Done |
| Data Awal as form inputs | ✅ Done |
| Mutual-exclusion Prioritas Prodi | ✅ Done |
| STATUS PILIHAN PRODI terkomputasi | ✅ Done |
| Hidden Data Awal fields | ✅ Done |
| State management | ✅ Done |
| Quality gate | ✅ Passed |
| GitHub repo | ✅ Done |
| Vercel deploy | ✅ Live |
| Link dokumen | ⏳ Pending (container ready) |
