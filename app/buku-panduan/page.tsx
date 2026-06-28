import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Buku Panduan — Checklist Peserta SPMB PT PKN STAN 2026",
  description:
    "Panduan lengkap penggunaan aplikasi Checklist Peserta Kemenkeu & KLPD.",
};

function GuideImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-sm print:break-inside-avoid">
      <div className="relative aspect-[16/10] w-full bg-ink-100">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </div>
      <figcaption className="border-t border-ink-100 bg-ink-50 px-5 py-3 text-sm text-ink-700">
        {caption}
      </figcaption>
    </figure>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-serif text-2xl font-bold tracking-tight text-ink-950 sm:text-3xl">
      {children}
    </h2>
  );
}

function SectionSubtitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-2 text-lg font-medium text-brand-700">{children}</p>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose prose-ink max-w-none prose-headings:font-serif prose-headings:font-semibold prose-p:text-ink-700 prose-li:text-ink-700">
      {children}
    </div>
  );
}

export default function BukuPanduanPage() {
  return (
    <main className="min-h-dvh bg-ink-50">
      {/* Header navigasi */}
      <header className="sticky top-0 z-50 border-b border-ink-200 bg-white/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-600 transition-colors hover:text-brand-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Beranda
          </Link>
          <span className="flex items-center gap-2 text-sm font-semibold text-ink-900">
            <BookOpen className="h-4 w-4 text-brand-700" />
            Buku Panduan
          </span>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-6 py-12 sm:py-20">
        {/* Sampul */}
        <section className="mb-16 text-center print:mb-12">
          <span className="mb-4 inline-block rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-800">
            SPMB PT PKN STAN 2026
          </span>
          <h1 className="font-serif text-4xl font-bold tracking-tight text-ink-950 sm:text-5xl">
            Buku Panduan
          </h1>
          <p className="mt-4 text-xl text-ink-700">
            Checklist Peserta Kemenkeu &amp; KLPD
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-ink-600">
            Panduan ini disusun untuk membantumu memahami setiap fitur, tombol,
            dan langkah penggunaan website secara menyeluruh. Kamu bisa membaca
            panduan ini dari awal hingga akhir, atau langsung melompat ke bagian
            yang ingin dipelajari.
          </p>
        </section>

        {/* Daftar Isi */}
        <section className="mb-16 rounded-2xl border border-ink-200 bg-white p-6 shadow-sm sm:p-8 print:mb-12">
          <h2 className="font-serif text-xl font-bold text-ink-950">
            Daftar Isi
          </h2>
          <ol className="mt-4 grid list-decimal gap-2 pl-5 text-ink-700 sm:grid-cols-2">
            <li>Pengenalan Website</li>
            <li>Halaman Awal dan Pemilihan Klaster</li>
            <li>Memilih Sub-Klaster Kemenkeu</li>
            <li>Mengisi Data Awal</li>
            <li>Menyelesaikan Checklist Dokumen</li>
            <li>Menyelesaikan Checklist Non-Dokumen</li>
            <li>Mengelola Link Penting</li>
            <li>Memantau Progress</li>
            <li>Export dan Import JSON</li>
            <li>Menghapus Progress dengan Reset</li>
            <li>Mengirim Feedback Anonim</li>
            <li>Klik Iklan Promosi</li>
            <li>Catatan Keamanan Data</li>
          </ol>
        </section>

        {/* 1. Pengenalan */}
        <section className="mb-16 print:mb-12">
          <SectionTitle>1. Pengenalan Website</SectionTitle>
          <SectionSubtitle>Apa yang bisa Kamu lakukan di sini?</SectionSubtitle>
          <Prose>
            <p>
              Website ini adalah aplikasi checklist interaktif yang dirancang
              khusus untuk Calon Peserta SPMB PT PKN STAN 2026 dari Kementerian
              Keuangan (Kemenkeu) dan Kementerian/Lembaga/Pemerintah Daerah
              (KLPD). Fungsi utamanya adalah membantumu memastikan seluruh
              persyaratan dokumen dan non-dokumen telah lengkap sebelum
              mendaftar.
            </p>
            <p>
              Semua data yang Kamu isi hanya tersimpan di perangkat yang sedang
              digunakan. Tidak ada data pribadi yang dikirim ke server. Oleh
              karena itu, website ini juga menyediakan fitur Export dan Import
              JSON agar Kamu bisa memindahkan progress antar perangkat dengan
              aman.
            </p>
          </Prose>
        </section>

        {/* 2. Halaman Awal */}
        <section className="mb-16 print:mb-12">
          <SectionTitle>2. Halaman Awal dan Pemilihan Klaster</SectionTitle>
          <SectionSubtitle>Langkah pertama memulai</SectionSubtitle>
          <Prose>
            <p>
              Saat pertama kali membuka website, Kamu akan melihat halaman awal
              dengan dua pilihan utama: <strong>Kemenkeu</strong> dan{" "}
              <strong>KLPD</strong>. Pilihlah sesuai dengan asal instansi Kamu.
            </p>
            <ul>
              <li>
                <strong>Kemenkeu</strong> — Dipilih jika Kamu berasal dari
                lingkungan Kementerian Keuangan.
              </li>
              <li>
                <strong>KLPD</strong> — Dipilih jika Kamu berasal dari
                Kementerian/Lembaga/Pemerintah Daerah di luar Kemenkeu.
              </li>
            </ul>
            <p>
              Di bagian atas halaman awal juga terdapat tombol{" "}
              <strong>Buku Panduan</strong>. Tombol ini akan membawa Kamu ke
              dokumen panduan ini kapan saja.
            </p>
          </Prose>
          <GuideImage
            src="/screenshots/01-landing.png"
            alt="Halaman awal website Checklist Peserta"
            caption="Gambar 1: Halaman awal menampilkan pilihan klaster Kemenkeu dan KLPD."
          />
        </section>

        {/* 3. Sub-Klaster */}
        <section className="mb-16 print:mb-12">
          <SectionTitle>3. Memilih Sub-Klaster Kemenkeu</SectionTitle>
          <SectionSubtitle>Temukan unit kerja yang sesuai</SectionSubtitle>
          <Prose>
            <p>
              Jika Kamu memilih klaster Kemenkeu, langkah berikutnya adalah
              memilih sub-klaster. Setiap sub-klaster memiliki daftar dokumen
              yang sedikit berbeda, jadi pastikan Kamu memilih dengan tepat.
            </p>
            <ul>
              <li>
                <strong>DJBC</strong> — Direktorat Jenderal Bea dan Cukai.
              </li>
              <li>
                <strong>DJP</strong> — Direktorat Jenderal Pajak.
              </li>
              <li>
                <strong>DJPb</strong> — Direktorat Jenderal Perbendaharaan.
              </li>
              <li>
                <strong>UE-1 Selain DJBC/DJP/DJPb</strong> — Unit Eselon I
                lainnya di lingkungan Kemenkeu.
              </li>
            </ul>
            <p>
              Setelah memilih sub-klaster, Kamu akan langsung diarahkan ke
              halaman checklist.
            </p>
          </Prose>
          <GuideImage
            src="/screenshots/02-pilih-subklaster.png"
            alt="Halaman pemilihan sub-klaster Kemenkeu"
            caption="Gambar 2: Pilih sub-klaster sesuai dengan unit kerja Kamu."
          />
        </section>

        {/* 4. Data Awal */}
        <section className="mb-16 print:mb-12">
          <SectionTitle>4. Mengisi Data Awal</SectionTitle>
          <SectionSubtitle>Lengkapi informasi dasar terlebih dahulu</SectionSubtitle>
          <Prose>
            <p>
              Halaman checklist dibagi menjadi beberapa bagian. Bagian pertama
              adalah <strong>Data Awal</strong>. Di sini Kamu perlu mengisi
              informasi dasar mengenai diri dan pilihan program studi.
            </p>
            <ul>
              <li>
                <strong>Unit Kerja</strong> — Tuliskan unit atau satuan kerja
                tempat Kamu bertugas.
              </li>
              <li>
                <strong>Jalur</strong> — Pilih jalur masuk yang sesuai.
              </li>
              <li>
                <strong>PRODI ASAL</strong> — Pilih program studi asal sesuai
                ijazah terakhir.
              </li>
              <li>
                <strong>Prioritas Pilihan Prodi 1–5</strong> — Pilih lima
                program studi tujuan sesuai prioritas. Pilihan akan terbuka
                setelah Kamu memilih PRODI ASAL.
              </li>
              <li>
                <strong>Status Pilihan Prodi</strong> — Bagian ini akan terisi
                otomatis setelah prioritas prodi dilengkapi.
              </li>
            </ul>
            <p>
              Setiap perubahan akan disimpan secara otomatis di perangkat Kamu,
              sehingga tidak perlu menekan tombol simpan.
            </p>
          </Prose>
          <GuideImage
            src="/screenshots/03-checklist-data-awal.png"
            alt="Bagian Data Awal pada halaman checklist"
            caption="Gambar 3: Isi Data Awal sebelum melanjutkan ke checklist dokumen dan non-dokumen."
          />
        </section>

        {/* 5. Checklist Dokumen */}
        <section className="mb-16 print:mb-12">
          <SectionTitle>5. Menyelesaikan Checklist Dokumen</SectionTitle>
          <SectionSubtitle>Centang setiap dokumen yang sudah lengkap</SectionSubtitle>
          <Prose>
            <p>
              Bagian <strong>Checklist Dokumen</strong> berisi daftar dokumen
              yang wajib dipersiapkan. Setiap butir mencantumkan subjek dokumen,
              yaitu apakah dokumen tersebut dipersiapkan oleh peserta, unit
              kerja, atau keduanya.
            </p>
            <ul>
              <li>
                Baca setiap butir dengan cermat. Beberapa dokumen hanya wajib
                untuk sub-klaster tertentu.
              </li>
              <li>
                Centang kotak di sebelah kanan jika dokumen sudah dipersiapkan.
              </li>
              <li>
                Jika ada dokumen yang belum lengkap, Kamu bisa kembali lagi
                kapan saja karena progress tersimpan otomatis.
              </li>
            </ul>
            <p>
              Referensi dokumen mengacu pada surat edaran resmi masing-masing
              sub-klaster, seperti PENG-31/BC.01/2026 untuk DJBC,
              ND-2360/PB.1/2026 untuk DJPb, PENG-380/PJ/PJ.01/2026 untuk DJP,
              dan PENG-19/PKN/2026 untuk UE-1 serta KLPD.
            </p>
          </Prose>
          <GuideImage
            src="/screenshots/04-checklist-dokumen.png"
            alt="Bagian Checklist Dokumen"
            caption="Gambar 4: Centang dokumen yang sudah lengkap sesuai subjeknya."
          />
        </section>

        {/* 6. Checklist Non-Dokumen */}
        <section className="mb-16 print:mb-12">
          <SectionTitle>6. Menyelesaikan Checklist Non-Dokumen</SectionTitle>
          <SectionSubtitle>Pastikan persyaratan administrasi terpenuhi</SectionSubtitle>
          <Prose>
            <p>
              Bagian <strong>Checklist Non-Dokumen</strong> berisi persyaratan
              yang berkaitan dengan status kepegawaian dan kesesuaian regulasi.
              Untuk peserta Kemenkeu, bagian ini mengacu pada Pasal 6 PMK 34
              Tahun 2024 tentang Pengelolaan Tugas Belajar bagi PNS di Lingkungan
              Kemenkeu.
            </p>
            <ul>
              <li>
                Baca setiap pernyataan dengan teliti.
              </li>
              <li>
                Centang jika kondisi tersebut sudah sesuai dengan keadaan Kamu.
              </li>
              <li>
                Jika ada yang belum dipenuhi, diskusikan dengan petugas kepegawaian di unit kerja.
              </li>
            </ul>
          </Prose>
          <GuideImage
            src="/screenshots/05-checklist-non-dokumen.png"
            alt="Bagian Checklist Non-Dokumen"
            caption="Gambar 5: Centang setiap persyaratan non-dokumen yang sudah terpenuhi."
          />
        </section>

        {/* 7. Link Penting */}
        <section className="mb-16 print:mb-12">
          <SectionTitle>7. Mengelola Link Penting</SectionTitle>
          <SectionSubtitle>Simpan tautan yang sering Kamu buka</SectionSubtitle>
          <Prose>
            <p>
              Di bagian bawah halaman checklist terdapat wadah bernama{" "}
              <strong>Link Penting</strong>. Fasilitas ini bisa Kamu gunakan
              untuk menyimpan tautan-tautan dokumen atau referensi yang sering
              dibuka.
            </p>
            <ul>
              <li>
                Link dapat ditambahkan atau diubah sesuai kebutuhan Kamu.
              </li>
              <li>
                Link yang tersimpan akan ikut tersimpan dalam Export JSON.
              </li>
            </ul>
          </Prose>
          <GuideImage
            src="/screenshots/07-link-penting.png"
            alt="Wadah Link Penting"
            caption="Gambar 6: Gunakan Link Penting untuk menyimpan tautan referensi."
          />
        </section>

        {/* 8. Progress */}
        <section className="mb-16 print:mb-12">
          <SectionTitle>8. Memantau Progress</SectionTitle>
          <SectionSubtitle>Lihat seberapa jauh persiapan Kamu</SectionSubtitle>
          <Prose>
            <p>
              Progress Kamu bisa dipantau melalui panel yang tersedia. Di
              perangkat desktop, panel ini berada di sisi kiri. Di perangkat
              mobile, panel ini muncul di bagian atas halaman dan bisa dilipat
              atau dikembangkan.
            </p>
            <ul>
              <li>
                <strong>Progress Keseluruhan</strong> — Menampilkan persentase
                total persyaratan yang sudah selesai.
              </li>
              <li>
                <strong>Progress Dokumen</strong> — Menampilkan jumlah dokumen
                yang sudah lengkap.
              </li>
              <li>
                <strong>Progress Non-Dokumen</strong> — Menampilkan jumlah
                persyaratan non-dokumen yang sudah terpenuhi.
              </li>
            </ul>
          </Prose>
          <GuideImage
            src="/screenshots/06-progress-panel.png"
            alt="Panel progress dan aksi Export/Import/Reset"
            caption="Gambar 7: Panel progress sekaligus tempat mengelola data melalui Export, Import, dan Reset."
          />
        </section>

        {/* 9. Export Import */}
        <section className="mb-16 print:mb-12">
          <SectionTitle>9. Export dan Import JSON</SectionTitle>
          <SectionSubtitle>Pindahkan progress antar perangkat dengan aman</SectionSubtitle>
          <Prose>
            <p>
              Karena data hanya tersimpan di perangkat yang sedang digunakan,
              website menyediakan fitur <strong>Export JSON</strong> dan{" "}
              <strong>Import JSON</strong>.
            </p>
            <h3>Cara Export</h3>
            <ol>
              <li>
                Klik tombol <strong>Export JSON</strong> pada panel progress.
              </li>
              <li>
                File JSON akan otomatis diunduh ke perangkat Kamu.
              </li>
              <li>
                Simpan file tersebut di tempat yang aman, seperti penyimpanan
                cloud atau perangkat lain.
              </li>
            </ol>
            <h3>Cara Import</h3>
            <ol>
              <li>
                Klik tombol <strong>Import JSON</strong> pada panel progress.
              </li>
              <li>
                Pilih file JSON yang pernah Kamu ekspor sebelumnya.
              </li>
              <li>
                Progress akan langsung dimuat kembali.
              </li>
            </ol>
            <p>
              Pastikan file yang diimpor berasal dari hasil export website ini
              agar formatnya cocok.
            </p>
          </Prose>
        </section>

        {/* 10. Reset */}
        <section className="mb-16 print:mb-12">
          <SectionTitle>10. Menghapus Progress dengan Reset</SectionTitle>
          <SectionSubtitle>Mulai dari awal jika diperlukan</SectionSubtitle>
          <Prose>
            <p>
              Tombol <strong>Reset</strong> berguna jika Kamu ingin mengosongkan
              seluruh progress dan memulai dari awal. Sebelum menggunakan fitur
              ini, pastikan Kamu sudah mengekspor data jika masih membutuhkannya.
            </p>
            <ol>
              <li>
                Klik tombol <strong>Reset</strong> pada panel progress.
              </li>
              <li>
                Akan muncul konfirmasi untuk memastikan bahwa Kamu benar-benar
                ingin menghapus data.
              </li>
              <li>
                Jika sudah yakin, klik <strong>Ya, Reset</strong>.
              </li>
            </ol>
            <p>
              Setelah reset, seluruh centangan dan data yang diisi akan
              dikosongkan dan tidak bisa dikembalikan kecuali Kamu sudah
              mengekspornya terlebih dahulu.
            </p>
          </Prose>
        </section>

        {/* 11. Feedback */}
        <section className="mb-16 print:mb-12">
          <SectionTitle>11. Mengirim Feedback Anonim</SectionTitle>
          <SectionSubtitle>Sampaikan kendala atau saran tanpa identitas</SectionSubtitle>
          <Prose>
            <p>
              Di bagian bawah setiap halaman terdapat formulir{" "}
              <strong>Feedback Anonim</strong>. Kamu bisa menggunakannya untuk
              menyampaikan kendala, saran tampilan, atau hal lain yang perlu
              diperbaiki.
            </p>
            <ul>
              <li>
                Identitas Kamu tidak disimpan bersama feedback.
              </li>
              <li>
                Tulis feedback minimal 10 karakter agar bisa ditindaklanjuti.
              </li>
              <li>
                Klik tombol <strong>Kirim Feedback</strong> untuk mengirimkan.
              </li>
            </ul>
            <p>
              Feedback yang masuk akan ditinjau oleh tim pengembang untuk
              meningkatkan kualitas website.
            </p>
          </Prose>
          <GuideImage
            src="/screenshots/08-feedback.png"
            alt="Formulir Feedback Anonim"
            caption="Gambar 8: Sampaikan saran atau kendala melalui Feedback Anonim."
          />
        </section>

        {/* 12. Promo */}
        <section className="mb-16 print:mb-12">
          <SectionTitle>12. Klik Iklan Promosi</SectionTitle>
          <SectionSubtitle>Dukung pengembangan website</SectionSubtitle>
          <Prose>
            <p>
              Di bagian tengah header setiap halaman terdapat informasi promosi
              dari Persiapantubel. Jika Kamu tertarik untuk mengikuti kelas
              persiapan, Kamu bisa mengklik tautan tersebut.
            </p>
            <ul>
              <li>
                Tautan promo akan membuka halaman pendaftaran di tab baru.
              </li>
              <li>
                Mengklik promo tidak mempengaruhi data checklist Kamu.
              </li>
            </ul>
          </Prose>
          <GuideImage
            src="/screenshots/09-promo.png"
            alt="Promo banner di header"
            caption="Gambar 9: Klik promo di header jika Kamu tertarik dengan kelas Persiapantubel."
          />
        </section>

        {/* 13. Keamanan Data */}
        <section className="mb-16 print:mb-12">
          <SectionTitle>13. Catatan Keamanan Data</SectionTitle>
          <SectionSubtitle>Data Kamu tetap aman di perangkat sendiri</SectionSubtitle>
          <Prose>
            <p>
              Website ini dirancang dengan prinsip privasi pertama. Seluruh data
              yang Kamu isi hanya disimpan secara lokal di browser perangkat
              yang sedang digunakan, bukan di server.
            </p>
            <ul>
              <li>
                Jika Kamu membersihkan data browser, progress akan ikut terhapus.
              </li>
              <li>
                Gunakan fitur Export JSON secara rutin sebagai cadangan.
              </li>
              <li>
                Jangan membagikan file JSON hasil export kepada pihak yang tidak
                berkepentingan.
              </li>
            </ul>
          </Prose>
        </section>

        {/* Penutup */}
        <section className="rounded-2xl border border-ink-200 bg-white p-6 text-center shadow-sm sm:p-8">
          <h2 className="font-serif text-2xl font-bold text-ink-950">
            Selamat Menggunakan
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-700">
            Semoga panduan ini membantu Kamu menyelesaikan seluruh persyaratan
            dengan lebih terstruktur. Jika ada hal yang masih belum jelas, jangan
            ragu untuk mengirimkan feedback anonim. Doa baik untuk persiapan
            SPMB PT PKN STAN 2026-mu!
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-800"
          >
            Kembali ke Halaman Awal
          </Link>
        </section>
      </article>
    </main>
  );
}
