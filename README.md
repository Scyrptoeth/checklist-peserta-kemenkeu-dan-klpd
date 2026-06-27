# Checklist Peserta SPMB PT PKN STAN 2026

Aplikasi web checklist interaktif untuk Calon Peserta SPMB PT PKN STAN 2026 dari Kementerian Keuangan (Kemenkeu) dan Kementerian/Lembaga/Pemerintah Daerah (KLPD).

## Tujuan

Membantu Calon Peserta memastikan seluruh persyaratan dokumen dan non-dokumen telah terpenuhi sebelum mendaftar.

## Fitur

- Pilihan klaster: **Kemenkeu** atau **KLPD**.
- Sub-klaster Kemenkeu: **DJBC**, **DJP**, **DJPb**, **UE-1**.
- Tampilan checklist vertikal per kategori:
  - Data Awal
  - Checklist Non-Dokumen
  - Checklist Dokumen
- Progress persentase per kategori dan keseluruhan.
- Container **Link Penting** untuk format dokumen.
- Persistensi progress dengan `localStorage` + export/import JSON.

## Teknologi

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- `lucide-react`

## Aset Rujukan

- `seleksiSpmbPt2026.pdf` — pengumuman SPMB PT PKN STAN 2026.
- `checklistPesertaKemenkeu.xlsx` — prototipe checklist Kemenkeu.
- `checklistPesertaKlpd.xlsx` — prototipe checklist KLPD.

## Scripts

```bash
npm run dev      # development server
npm run build    # production build
npm run lint     # ESLint
npm run typecheck # TypeScript check
```

## Regenerasi Data

Jika prototipe Excel berubah:

```bash
python3 scripts/extract-checklist-data.py
```

## Deploy

Project ini di-deploy otomatis ke Vercel dari repository GitHub.
