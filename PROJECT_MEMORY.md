# Project Memory — checklist-peserta-kemenkeu-dan-klpd

## Latest Update

**2026-06-28 — Penambahan Buku Panduan lengkap dengan screenshot tahap demi tahap, file PDF, dan tombol unduhan di halaman awal.**

- **Halaman Buku Panduan:**
  - URL: `/buku-panduan`.
  - Konten mencakup pengenalan website, pemilihan klaster & sub-klaster, pengisian Data Awal, Checklist Dokumen, Checklist Non-Dokumen, Link Penting, progress panel, Export/Import JSON, Reset, Feedback Anonim, Klik Iklan Promosi, dan catatan keamanan data.
  - Menggunakan kata sapaan "Kamu" dengan nuansa formal-profesional dan tidak kaku.
  - Setiap bagian penting disertai screenshot langkah penggunaan.
  - Font heading menggunakan Playfair Display (serif) dan body menggunakan DM Sans sebagai alternatif dari Shree Devanagari 714 yang tidak tersedia di sistem.
  - File: `app/buku-panduan/page.tsx`.

- **File PDF:**
  - Output PDF `public/buku-panduan.pdf` dihasilkan dari halaman `/buku-panduan` menggunakan Playwright dengan Chrome headless.
  - PDF berukuran A4, 11 halaman, dengan print background enabled.
  - Script generate: `scripts/generate-guide.mjs`.

- **Screenshot panduan:**
  - Disimpan di `public/screenshots/` dengan nama `01-landing.png`, `02-pilih-subklaster.png`, `03-checklist-data-awal.png`, `04-checklist-dokumen.png`, `05-checklist-non-dokumen.png`, `06-progress-panel.png`, `07-link-penting.png`, `08-feedback.png`, `09-promo.png`.

- **Tombol Buku Panduan di landing page:**
  - Hanya muncul di halaman awal (`app/page.tsx`) dan mengarah ke `/buku-panduan.pdf`.
  - Desain mempertimbangkan hierarki visual: tombol berada di bawah judul "Pilih Klaster" dengan gaya outlined brand agar tidak bersaing dengan kartu klaster utama.

- **Verifikasi & deploy:**
  - `npm run typecheck` dan `npm run build` lolos tanpa error.
  - Commit: `feat(guide): add Buku Panduan page, screenshots, PDF, and landing button`.
  - Push ke `main` dan deploy Vercel production: https://ceklis-tubel.vercel.app.

---

## Latest Update

**2026-06-28 — Promo banner Persiapantubel di sticky header, redesign transparan dengan Playfair Display, dan deploy production.**

Perubahan dikerjakan di branch `feat/promo-header`, di-merge ke `main`, dan di-deploy ke Vercel production.

- **Promo banner di tengah header:**
  - Menambahkan kalimat promosi ajakan daftar kelas gelombang terakhir Persiapantubel di area tengah sticky header, sesuai referensi kotak merah pada `update/5-header.png`.
  - Teks promo:
    - "Daftar Kelas Gelombang Terakhir Sekarang!"
    - "Kuota Tersisa: 11!"
    - "Klik s.id/tubelstan"
  - Banner transparan tanpa background/kolom; hanya bermain warna font dengan highlight merah pada kuota dan link brand yang klikabel.
  - Menggunakan CSS Grid `1fr auto 1fr` agar promo selalu terpusat secara horizontal, sementara judul/subtitle panjang di kiri tetap bisa wrap ke bawah tanpa mendorong promo.
  - Font promo menggunakan `Playfair Display` (serif) untuk kesan mewah; teks judul & link tetap DM Sans.
  - File: `components/sticky-page-header.tsx`, `app/layout.tsx`, `tailwind.config.ts`.

- **Verifikasi & deploy:**
  - `npm run typecheck`, `npm run lint`, dan `npm run build` lolos tanpa error.
  - Branch `feat/promo-header` → conventional commit (`feat(ui): add Playfair Display promo banner in sticky header`) → push → merge → push `main`.
  - Deploy Vercel production: https://checklist-peserta-kemenkeu-dan-klpd.vercel.app

---

## Latest Update

**2026-06-28 — Update label section dengan referensi resmi, hyperlink aktif, dan reorder Checklist Dokumen ke atas.**

Perubahan dikerjakan di branch `update-label-checklist`, di-merge ke `main`, dan di-deploy ke Vercel production.

- **Data Awal (semua klaster & sub-klaster):**
  - Subtitle diubah dari "Informasi dasar Calon Peserta" menjadi "Sesuai dengan Kertas Kerja yang Dibagikan oleh PKN STAN di https://taplink.cc/formulirspmbpt2026" dengan link klikable.
  - File: `components/data-awal-section.tsx`, `components/checklist-page-client.tsx`.

- **Checklist Non-Dokumen:**
  - Kemenkeu & sub-klaster: subtitle diubah menjadi "Sesuai dengan Pasal 6 PMK 34 Tahun 2024 tentang Pengelolaan Tugas Belajar bagi PNS di Lingkungan Kemenkeu yang bisa Diunduh di s.id/PMK-Tubel-Kemenkeu" dengan link klikable.
  - KLPD: subtitle diubah menjadi "Sesuai dengan Ketentuan Kepegawaian/Tugas Belajar yang Berlaku di KLPD Masing-Masing".
  - File: `components/checklist-section.tsx`, `components/checklist-page-client.tsx`.

- **Checklist Dokumen:**
  - DJBC: "Sesuai dengan PENG-31/BC.01/2026 yang dapat Diunduh di s.id/Tubel-DJBC-2026" dengan link klikable.
  - DJPb: "Sesuai dengan ND-2360/PB.1/2026 yang dapat Diunduh di s.id/Tubel-DJPb-2026" dengan link klikable.
  - DJP: "Sesuai dengan PENG-380/PJ/PJ.01/2026 yang dapat Diunduh di s.id/Tubel-DJP-2026" dengan link klikable.
  - UE-1 (Kemenkeu) & KLPD: "Sesuai dengan PENG-19/PKN/2026 yang dapat Diunduh di s.id/PENG-Tubel-2026" dengan link klikable.
  - File: `components/checklist-dokumen-section.tsx`, `components/checklist-page-client.tsx`.

- **Reorder section:**
  - Urutan di semua klaster & sub-klaster diubah menjadi: Data Awal → Checklist Dokumen → Checklist Non-Dokumen.
  - File: `components/checklist-page-client.tsx`.

- **Komponen reusable untuk inline external link:**
  - `InlineExternalLink` ditambahkan di `components/checklist-page-client.tsx` untuk menyediakan style konsisten pada link eksternal (underline, brand color, icon external-link).

- **Verifikasi & deploy:**
  - `npm run build` lolos tanpa error.
  - Branch `update-label-checklist` → conventional commit → push → merge → push `main`.
  - Deploy Vercel production: https://checklist-peserta-kemenkeu-dan-klpd.vercel.app

---

## Latest Update

**2026-06-28 — Sticky header dengan logo di kanan blok judul, penambahan 2 dokumen Subjek: Unit Kerja untuk KLPD, dan deploy production.**

Perubahan dikerjakan di branch `feat/klpd-unit-kerja-dokumen`, di-merge ke `main`, dan di-deploy ke Vercel production.

- **Sticky header dengan logo di kanan judul:**
  - Header tipis sebelumnya diganti dengan `components/sticky-page-header.tsx` yang memuat tombol kembali, breadcrumb, judul, subtitle di kiri, dan logo Persiapantubel di kanan.
  - Header sticky di semua halaman: home, pemilih sub-klaster, checklist Kemenkeu, dan checklist KLPD.
  - Tinggi header responsif: `h-24` mobile / `h-28` tablet / `h-32` desktop.
  - Offset sticky internal disesuaikan: mobile progress panel (`top-24`), section header (`top-24`), desktop sidebar (`top-32`).
  - File: `components/sticky-page-header.tsx`, `app/layout.tsx`, `app/page.tsx`, `app/checklist/kemenkeu/page.tsx`, `components/checklist-page-client.tsx`, `components/checklist-section.tsx`.

- **Asset logo:**
  - `update/3-logo.png` disalin ke `public/logo.png` agar bisa dioptimasi Next.js Image.

- **Penambahan 2 dokumen Subjek: Unit Kerja untuk KLPD:**
  - "Surat Rekomendasi Kepala Unit Kerja (TTE atau Tanda Tangan Basah dan Stemple) Berformat PDF (Subjek: Unit Kerja)"
  - "Nota Dinas Usulan Pendaftar SPMB TB (TTE atau Tanda Tangan Basah dan Stempel) Berformat PDF (Subjek: Unit Kerja)"
  - Kedua item ditambahkan melalui konstanta `KLPD_EXTRA_DOKUMEN_ITEMS` di `scripts/extract-checklist-data.py` dan diinject sebelum kolom Link saat regenerasi data, sehingga tersisten meskipun Excel diregenerate.
  - File: `scripts/extract-checklist-data.py`, `lib/data/checklist-data.ts`.

- **Verifikasi & deploy:**
  - `npm run typecheck` dan `npm run build` lolos tanpa error.
  - Branch `feat/klpd-unit-kerja-dokumen` → conventional commit → push → merge → push `main`.
  - Deploy Vercel production: https://checklist-peserta-kemenkeu-dan-klpd.vercel.app

---

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

- **Prop subtitle/category sebaiknya diteruskan sebagai `React.ReactNode`, bukan `string`.** Karena label section sekarang berisi hyperlink eksternal, tipe string tidak cukup. Mengubah tipe menjadi `React.ReactNode` membuat komponen lebih fleksibel tanpa merusak existing behavior.
- **`git add -A` berisiko mengcommit file untracked yang tidak terkait.** Dua asset gambar (`update/3-logo.png` dan `update/4-footer.png`) ikut tercommit bersama perubahan kode. Untuk sesi berikutnya, gunakan `git add <file>` secara selektif atau review `git status` sebelum commit.
- **External link harus memiliki indikator visual dan atribut keamanan.** Kombinasi `target="_blank"`, `rel="noopener noreferrer"`, underline, dan icon external-link memenuhi ekspektasi accessibility dan keamanan.
- **Urutan section sebaiknya dikontrol di satu tempat (page client).** Dengan menyusun urutan di `ChecklistPageClient`, perubahan layout berlaku konsisten untuk semua klaster/sub-klaster.
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
- **CSS Grid `1fr auto 1fr` sangat efektif untuk membuat elemen center tetap terpusat di antara dua blok fleksibel.** Lebih dapat diprediksi daripada flexbox dengan auto-margin saat salah satu sisi punya teks panjang yang harus wrap.
- **Spotlight UI tidak selalu membutuhkan background/card.** Dengan hierarki tipografi yang kuat (font serif mewah + warna highlight + underline), promosi transparan tetap menarik perhatian tanpa mengganggu kebersihan header.
- **Menambahkan font display melalui `next/font/google` murah dan aman.** Cukup tambahkan variabel CSS dan daftarkan di `tailwind.config.ts`; tidak perlu manual preload atau FOIC handling.
- **Pastikan elemen spotlight memiliki lebar tetap (fixed/min-width) agar tidak "terdorong" oleh konten sekitarnya.** Elemen penting harus menjadi anchor; elemen pendukunglah yang menyesuaikan.
- **Playwright sangat efektif untuk generate screenshot dan PDF dari halaman Next.js secara lokal.** Dengan `executablePath` menunjuk ke Chrome yang sudah terinstall, tidak perlu download browser tambahan.
- **Generate screenshot sebelum generate PDF agar gambar sudah tersedia saat halaman panduan dirender.** Urutan ini menghindari broken image di PDF akhir.
- **Menyertakan PDF dan screenshot di `public/` memudahkan deployment static file.** Vercel secara otomatis melayani file-file tersebut di root domain.
- **Tombol sekunder di landing page sebaiknya tidak bersaing dengan CTA utama.** Menggunakan outlined button dengan icon membedakan Buku Panduan dari kartu klaster utama.

## Next Action Recommended

1. **Verifikasi tampilan promo header di production pada berbagai ukuran layar**
   Target: https://checklist-peserta-kemenkeu-dan-klpd.vercel.app
   Mengapa: Font Playfair Display di ukuran kecil butuh dicek agar tetap readable; pastikan tidak overlap dengan judul/logo di mobile.

2. **Isi container Link Penting dengan URL format dokumen**
   File: `scripts/extract-checklist-data.py` (sumber link dari Excel) atau konfigurasi terpisah, lalu regenerate `lib/data/checklist-data.ts`.
   Mengapa: Placeholder sudah diupdate; container UI sudah siap. Mengisi link akan menyelesaikan fitur ini sepenuhnya.

3. **Verifikasi URL link eksternal secara berkala**
   Link: `s.id/PMK-Tubel-Kemenkeu`, `s.id/Tubel-DJBC-2026`, `s.id/Tubel-DJPb-2026`, `s.id/Tubel-DJP-2026`, `s.id/PENG-Tubel-2026`, `https://taplink.cc/formulirspmbpt2026`.
   Mengapa: Shortlink atau halaman eksternal bisa berubah; verifikasi memastikan pengguna tidak mengalami broken link.

4. **Tambahkan badge/tanda visual untuk item yang memerlukan perhatian khusus**
   File: `components/checklist-row.tsx`.
   Mengapa: Beberapa item punya `rawFlag` seperti "Wajib untuk DJBC" yang belum ditampilkan di UI; menampilkannya membantu pengguna memahami konteks khusus.

5. **Pindahkan repo keluar dari Desktop (opsional tapi direkomendasikan)**
   Target: `~/codex/checklist-peserta-kemenkeu-dan-klpd` atau lokasi non-Desktop lain.
   Mengapa: Menghindari masalah permission macOS (`EPERM`) saat development lokal.

6. **Update README fitur**
   File: `README.md`.
   Mengapa: Dokumentasi perlu mencerminkan label section terbaru, hyperlink referensi, dan urutan section yang diubah.

7. **Upgrade Next.js ke versi patched**
   File: `package.json`.
   Mengapa: Next.js 14.2.21 memiliki vulnerability yang diumumkan; upgrade ke 14.2.28+ atau 15.x.

8. **Tambahkan analytics/error tracking (opsional)**
   Mengapa: Untuk memantau penggunaan aplikasi setelah go-live.

9. **Custom domain (opsional)**
   Mengapa: URL Vercel bawaan panjang; custom domain meningkatkan trust dan kemudahan akses.

10. **Perbarui screenshot dan PDF jika UI berubah signifikan**
    File: `scripts/generate-guide.mjs`, `public/screenshots/`, `public/buku-panduan.pdf`.
    Mengapa: Panduan harus selalu mencerminkan tampilan terbaru agar pengguna tidak bingung.

11. **Pertimbangkan fallback font Shree Devanagari 714 jika file font tersedia di masa depan**
    File: `app/buku-panduan/page.tsx`, `app/layout.tsx`, `tailwind.config.ts`.
    Mengapa: User awalnya meminta font Shree Devanagari 714; jika file font disediakan nanti, PDF bisa di-render dengan font yang tepat.

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
| Sticky header with logo (title left, logo right) | ✅ Done |
| KLPD Unit Kerja dokumen items added | ✅ Done |
| Section labels with official references & links | ✅ Done |
| Reorder: Data Awal → Dokumen → Non-Dokumen | ✅ Done |
| Promo banner sticky header (Playfair Display, transparan) | ✅ Done |
| Buku Panduan page with screenshots | ✅ Done |
| Buku Panduan PDF export | ✅ Done |
| Buku Panduan button on landing page | ✅ Done |
| Quality gate | ✅ Passed |
| GitHub repo | ✅ Done |
| Vercel deploy | ✅ Live |
| Link dokumen aktual | ✅ Done (subtitle links) |
| Container Link Penting filled | ⏳ Pending |
| Display rawFlag context in UI | ⏳ Pending |
| Font Shree Devanagari 714 | ⏳ Pending (file font not provided) |
