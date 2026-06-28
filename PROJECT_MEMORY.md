# Project Memory — checklist-peserta-kemenkeu-dan-klpd

## Latest Update

**2026-06-28 — Standarisasi label PIC→Subjek, pengelompokan Checklist Dokumen berdasarkan subjek, update placeholder Link Penting, dan deploy production.**

Perubahan dikerjakan di branch `feat/dokumen-subjek-grouping`, di-merge ke `main`, dan di-deploy ke Vercel production.

- **Standarisasi label dokumen:**
  - Semua label `(PIC: Peserta)` dan `(PIC: Unit Kerja)` dalam kategori *Checklist Dokumen* distandarisasi menjadi `(Subjek: Peserta)` dan `(Subjek: Unit Kerja)`.
  - Normalisasi dilakukan di generator script agar tersisten saat data diregenerate dari Excel.
  - File: `scripts/extract-checklist-data.py`, `lib/data/checklist-data.ts`.

- **Pengelompokan Checklist Dokumen berdasarkan subjek:**
  - Komponen baru `ChecklistDokumenSection` menampilkan 3 sub-bagian jelas:
    1. **Subjek: Peserta** — aksen biru (`brand-500`).
    2. **Subjek: Peserta dan Unit Kerja** — aksen oranye/amber (`amber-500`).
    3. **Subjek: Unit Kerja** — aksen hijau (`emerald-600`).
  - Setiap sub-bagian punya header berwarna, progress mini, dan pembatas visual (border-top tebal) sehingga pengguna bisa membedakan dengan cepat.
  - Sub-bagian bisa diciutkan/dikembangkan secara independen.
  - File: `components/checklist-dokumen-section.tsx`, `components/checklist-page-client.tsx`.

- **Field `subject` pada data model:**
  - `ChecklistItem` ditambahkan field opsional `subject` yang diekstrak otomatis dari suffix label saat generate data.
  - `ChecklistRow` memakai `item.subject` jika tersedia, dengan fallback parse label.
  - File: `scripts/extract-checklist-data.py`, `lib/data/checklist-data.ts`, `components/checklist-row.tsx`.

- **Update placeholder Link Penting:**
  - Teks placeholder diubah dari "Container link dokumen telah disiapkan..." menjadi "Akan segera diperbarui."
  - File: `components/link-container.tsx`.

- **Verifikasi & deploy:**
  - `npm run typecheck` dan `npm run build` lolos tanpa error.
  - Branch `feat/dokumen-subjek-grouping` → conventional commit → push → merge → push `main`.
  - Deploy Vercel production: https://checklist-peserta-kemenkeu-dan-klpd.vercel.app

---

## Lesson Learned

- **Data auto-generated harus diupdate lewat generator script, bukan edit manual.** Field Data Awal yang disembunyikan ditandai di `scripts/extract-checklist-data.py` sebagai `HIDDEN_DATA_AWAL_LABELS`, lalu `lib/data/checklist-data.ts` diregenerasi. Ini menjaga konsistensi jika Excel berubah di masa depan.
- **`applies: false` adalah cara paling bersih untuk menyembunyikan item dari UI dan progress.** Karena hook dan komponen sudah filter berdasarkan `applies`, satu perubahan di data file menyelesaikan dua masalah sekaligus (tidak ditampilkan + tidak masuk progress).
- **Sticky sidebar membutuhkan parent flex dengan `align-items: stretch`.** Jika parent menggunakan `items-start`, kolom kiri hanya setinggi kontennya sendiri sehingga sticky tidak bisa mengikuti scroll.
- **Menghindari angka persentase pada Data Awal mengurangi beban psikologis pengguna.** Karena jumlah prioritas prodi tujuan bervariasi antar PRODI ASAL, persentase membuat perasaan "kurang" yang tidak adil. Count selesai/total atau bar visual tanpa angka lebih netral.
- **Mutual exclusivity di dropdown lebih baik daripada validasi error pasca-pilih.** Mencegah duplikat sejak awal lebih ramah pengguna daripada menampilkan status merah setelah terjadi kesalahan.
- **Build Next.js di Vercel kadang menghasilkan lambda functions, bukan static pages.** Hal ini normal untuk App Router tanpa `output: 'export'`; yang penting deployment status Ready dan konten bisa diakses melalui canonical domain.
- **Clean rebuild (hapus `.next`) sering diperlukan setelah perubahan besar.** Dev server yang berjalan di background dapat menyebabkan cache build korup dan error `PageNotFoundError`.
- **Saat menormalisasi label, pertahankan ID lama untuk kompatibilitas localStorage.** Mengubah label menjadi slug untuk ID akan mereset progress pengguna yang tersimpan di browser. Dengan memisahkan `id` (dari header asli) dan `label` (ternormalisasi), data progres tetap valid.
- **Menambahkan field `subject` lebih bersih daripada parse label di render time.** Grouping di komponen menjadi lebih sederhana dan type-safe; parsing regex hanya sebagai fallback.
- **Pewarnaan sub-bagian memerlukan kontras yang cukup dan ikon yang jelas.** Kombinasi border-top tebal + header background tinted + ikon kecil membuat perbedaan subjek terlihat bahkan saat di-scroll cepat.

## Next Action Recommended

1. **Isi container Link Penting dengan URL format dokumen**
   File: `scripts/extract-checklist-data.py` (sumber link dari Excel) atau konfigurasi terpisah, lalu regenerate `lib/data/checklist-data.ts`.
   Mengapa: Placeholder sudah diupdate; container UI sudah siap. Mengisi link akan menyelesaikan fitur ini sepenuhnya.

2. **Tambahkan badge/tanda visual untuk item yang memerlukan perhatian khusus**
   File: `components/checklist-row.tsx`.
   Mengapa: Beberapa item punya `rawFlag` seperti "Wajib untuk DJBC" yang belum ditampilkan di UI; menampilkannya membantu pengguna memahami konteks khusus.

3. **Pindahkan repo keluar dari Desktop (opsional tapi direkomendasikan)**
   Target: `~/codex/checklist-peserta-kemenkeu-dan-klpd` atau lokasi non-Desktop lain.
   Mengapa: Menghindari masalah permission macOS (`EPERM`) saat development lokal.

4. **Update README fitur**
   File: `README.md`.
   Mengapa: Dokumentasi perlu mencerminkan pengelompokan Checklist Dokumen berdasarkan subjek dan standarisasi label terbaru.

5. **Upgrade Next.js ke versi patched**
   File: `package.json`.
   Mengapa: Next.js 14.2.21 memiliki vulnerability yang diumumkan; upgrade ke 14.2.28+ atau 15.x.

6. **Tambahkan analytics/error tracking (opsional)**
   Mengapa: Untuk memantau penggunaan aplikasi setelah go-live.

7. **Custom domain (opsional)**
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
| Label PIC→Subjek standardization | ✅ Done |
| Checklist Dokumen grouped by subject | ✅ Done |
| Link Penting placeholder updated | ✅ Done |
| Quality gate | ✅ Passed |
| GitHub repo | ✅ Done |
| Vercel deploy | ✅ Live |
| Link dokumen aktual | ⏳ Pending |
| Display rawFlag context in UI | ⏳ Pending |
