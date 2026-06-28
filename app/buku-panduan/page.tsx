/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "Buku Panduan - Checklist Peserta SPMB PT PKN STAN 2026",
  description:
    "Buku Panduan lengkap penggunaan website Checklist Peserta Kemenkeu dan KLPD.",
};

const shreeGuide = localFont({
  src: "../../update/6-shree-devanagari-714.ttf",
  display: "swap",
});

type GuideShotProps = {
  src: string;
  alt: string;
  caption: string;
  portrait?: boolean;
};

type Step = {
  title: string;
  body: string;
};

function SectionTitle({
  number,
  title,
  lead,
}: {
  number: string;
  title: string;
  lead: string;
}) {
  return (
    <div className="mb-5 border-b border-ink-200 pb-4">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
        Bagian {number}
      </p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink-950">
        {title}
      </h2>
      <p className="mt-2 text-base leading-relaxed text-ink-700">{lead}</p>
    </div>
  );
}

function GuideShot({ src, alt, caption, portrait = false }: GuideShotProps) {
  return (
    <figure className="my-7 rounded-2xl border border-ink-200 bg-white p-3 shadow-sm print:break-inside-avoid">
      <img
        src={src}
        alt={alt}
        className={`mx-auto block h-auto w-auto max-w-full rounded-xl border border-ink-100 ${
          portrait ? "max-h-[560px]" : "max-h-[520px]"
        }`}
      />
      <figcaption className="px-2 pt-3 text-sm leading-relaxed text-ink-600">
        {caption}
      </figcaption>
    </figure>
  );
}

function StepList({ steps }: { steps: Step[] }) {
  return (
    <ol className="grid gap-3">
      {steps.map((step, index) => (
        <li
          key={step.title}
          className="rounded-2xl border border-ink-200 bg-white p-4 shadow-sm print:break-inside-avoid"
        >
          <div className="flex gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-700 text-sm font-bold text-white">
              {index + 1}
            </span>
            <div>
              <h3 className="text-base font-bold text-ink-950">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-700">
                {step.body}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

function Callout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="my-6 rounded-2xl border border-brand-200 bg-brand-50 p-5 text-sm leading-relaxed text-ink-700 print:break-inside-avoid">
      <p className="mb-2 font-bold text-brand-900">{title}</p>
      {children}
    </div>
  );
}

function GuideSection({
  number,
  title,
  lead,
  children,
}: {
  number: string;
  title: string;
  lead: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12 print:mb-10">
      <SectionTitle number={number} title={title} lead={lead} />
      <div className="space-y-4 text-base leading-relaxed text-ink-700">
        {children}
      </div>
    </section>
  );
}

export default function BukuPanduanPage() {
  return (
    <main className={`${shreeGuide.className} min-h-dvh bg-ink-50 text-ink-950`}>
      <article className="mx-auto max-w-4xl px-6 py-10 sm:px-10 sm:py-14">
        <section className="mb-12 rounded-[2rem] border border-ink-200 bg-white p-8 shadow-sm sm:p-10 print:break-after-page">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">
            Buku Panduan Penggunaan
          </p>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-ink-950 sm:text-5xl">
            Website Ceklis Tubel
          </h1>
          <p className="mt-4 max-w-2xl text-xl leading-relaxed text-ink-700">
            Checklist Peserta SPMB PT PKN STAN 2026 untuk Kemenkeu dan KLPD.
          </p>
          <Callout title="Tujuan panduan">
            <p>
              Panduan ini membantu Kamu memahami seluruh tombol, area, dan alur
              penggunaan website dari halaman awal sampai pengelolaan progress.
              Ikuti bagian secara berurutan jika Kamu baru pertama kali
              menggunakan website.
            </p>
          </Callout>
        </section>

        <section className="mb-12 rounded-2xl border border-ink-200 bg-white p-6 shadow-sm print:break-after-page">
          <h2 className="text-xl font-bold text-ink-950">Daftar Isi</h2>
          <ol className="mt-5 grid list-decimal gap-2 pl-5 text-sm leading-relaxed text-ink-700 sm:grid-cols-2">
            <li>Gambaran umum website</li>
            <li>Halaman awal dan tombol Buku Panduan</li>
            <li>Memilih klaster Kemenkeu atau KLPD</li>
            <li>Memilih sub-klaster Kemenkeu</li>
            <li>Mengisi Data Awal</li>
            <li>Menggunakan Checklist Dokumen</li>
            <li>Menggunakan Checklist Non-Dokumen</li>
            <li>Memantau progress</li>
            <li>Export JSON dan Import JSON</li>
            <li>Reset progress</li>
            <li>Link Penting</li>
            <li>Feedback Anonim</li>
            <li>Iklan promosi, tombol kembali, dan logo</li>
            <li>Footer, kontak, dan catatan Developer</li>
            <li>Keamanan data dan kebiasaan penggunaan</li>
          </ol>
        </section>

        <GuideSection
          number="1"
          title="Gambaran Umum Website"
          lead="Website ini menjadi alat bantu pribadi untuk mengecek kesiapan dokumen dan persyaratan non-dokumen."
        >
          <p>
            Website Ceklis Tubel membantu Kamu menandai persyaratan yang sudah
            dipenuhi sebelum proses pendaftaran SPMB PT PKN STAN 2026. Website
            membagi kebutuhan pengguna menjadi dua kelompok besar, yaitu peserta
            dari Kemenkeu dan peserta dari KLPD.
          </p>
          <p>
            Setiap perubahan yang Kamu lakukan akan tersimpan otomatis di
            perangkat yang sedang digunakan. Kamu tidak perlu mencari tombol
            simpan. Jika ingin membuat cadangan atau pindah perangkat, gunakan
            Export JSON dan Import JSON.
          </p>
        </GuideSection>

        <GuideSection
          number="2"
          title="Halaman Awal dan Tombol Buku Panduan"
          lead="Halaman awal adalah titik masuk utama untuk membaca panduan atau memulai checklist."
        >
          <StepList
            steps={[
              {
                title: "Buka website",
                body: "Masuk ke https://ceklis-tubel.vercel.app/ melalui browser yang Kamu gunakan.",
              },
              {
                title: "Baca arahan singkat",
                body: "Perhatikan judul halaman dan keterangan bahwa website dipakai untuk memeriksa persyaratan dokumen dan non-dokumen.",
              },
              {
                title: "Gunakan tombol Buku Panduan",
                body: "Klik tombol Buku Panduan jika Kamu ingin membuka file PDF panduan. Tombol ini hanya tersedia di halaman awal agar halaman checklist tetap bersih.",
              },
            ]}
          />
          <GuideShot
            src="/guide-screenshots/01-landing-full.png"
            alt="Halaman awal website Ceklis Tubel"
            caption="Gambar 1. Halaman awal berisi tombol Buku Panduan, pilihan klaster Kemenkeu, dan pilihan klaster KLPD. Screenshot ditampilkan utuh tanpa pemotongan."
          />
        </GuideSection>

        <GuideSection
          number="3"
          title="Memilih Klaster Kemenkeu atau KLPD"
          lead="Pilih klaster berdasarkan asal instansi Kamu."
        >
          <p>
            Pada halaman awal terdapat dua kartu utama. Pilihan ini menentukan
            daftar persyaratan yang akan tampil di halaman checklist.
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Kemenkeu</strong> dipilih jika Kamu berasal dari
              Kementerian Keuangan. Setelah memilih Kemenkeu, Kamu perlu memilih
              sub-klaster.
            </li>
            <li>
              <strong>KLPD</strong> dipilih jika Kamu berasal dari
              Kementerian/Lembaga/Pemerintah Daerah. Setelah memilih KLPD, Kamu
              langsung masuk ke halaman checklist KLPD.
            </li>
          </ul>
          <Callout title="Jika salah memilih">
            <p>
              Gunakan tombol Kembali atau klik logo Persiapantubel di kanan atas
              untuk kembali ke halaman awal, lalu pilih klaster yang benar.
            </p>
          </Callout>
        </GuideSection>

        <GuideSection
          number="4"
          title="Memilih Sub-Klaster Kemenkeu"
          lead="Bagian ini hanya muncul jika Kamu memilih klaster Kemenkeu."
        >
          <p>
            Kemenkeu memiliki empat sub-klaster: DJBC, DJP, DJPb, dan UE-1
            Selain DJBC/DJP/DJPb. Pilih satu sub-klaster sesuai unit kerja Kamu.
            Setiap sub-klaster dapat memiliki variasi daftar dokumen.
          </p>
          <StepList
            steps={[
              {
                title: "Klik kartu Kemenkeu",
                body: "Kamu akan diarahkan ke halaman Pilih Sub-Klaster Kemenkeu.",
              },
              {
                title: "Pilih sub-klaster",
                body: "Klik DJBC, DJP, DJPb, atau UE-1 sesuai asal unit kerja Kamu.",
              },
              {
                title: "Masuk ke checklist",
                body: "Setelah sub-klaster dipilih, halaman checklist akan terbuka dengan daftar persyaratan yang sesuai.",
              },
            ]}
          />
          <GuideShot
            src="/guide-screenshots/02-kemenkeu-subcluster-full.png"
            alt="Halaman pilih sub-klaster Kemenkeu"
            caption="Gambar 2. Halaman pemilihan sub-klaster Kemenkeu menampilkan semua opsi utama secara utuh."
          />
        </GuideSection>

        <GuideSection
          number="5"
          title="Mengisi Data Awal"
          lead="Data Awal berisi informasi dasar yang membantu Kamu memeriksa pilihan program studi."
        >
          <p>
            Data Awal berada di bagian atas halaman checklist. Isi bagian ini
            lebih dahulu agar status pilihan program studi dapat terbaca dengan
            benar.
          </p>
          <StepList
            steps={[
              {
                title: "Isi Unit Kerja",
                body: "Untuk Kemenkeu, tulis unit kerja Kamu. Untuk KLPD, pilih instansi dari daftar yang tersedia.",
              },
              {
                title: "Pilih Jalur",
                body: "Pilih Reguler atau Afirmasi sesuai kondisi Kamu.",
              },
              {
                title: "Pilih PRODI ASAL",
                body: "Pilih program studi asal sesuai ijazah terakhir. Setelah itu, pilihan prodi tujuan akan tersedia.",
              },
              {
                title: "Pilih Prioritas Prodi 1 sampai 5",
                body: "Pilih prodi tujuan sesuai urutan prioritas. Website akan mencegah pilihan yang sama dipakai berulang.",
              },
              {
                title: "Periksa Status Pilihan Prodi",
                body: "Status akan terisi otomatis. Jika belum sesuai, periksa kembali PRODI ASAL dan prioritas yang Kamu pilih.",
              },
            ]}
          />
          <GuideShot
            src="/guide-screenshots/03-data-awal-section.png"
            alt="Bagian Data Awal pada halaman checklist"
            caption="Gambar 3. Bagian Data Awal ditampilkan penuh sebagai satu komponen, termasuk tombol lipat dan seluruh field utama."
          />
        </GuideSection>

        <GuideSection
          number="6"
          title="Menggunakan Checklist Dokumen"
          lead="Checklist Dokumen dipakai untuk menandai dokumen yang sudah siap."
        >
          <p>
            Bagian Checklist Dokumen dikelompokkan berdasarkan pihak yang
            menyiapkan dokumen, misalnya Peserta, Peserta dan Unit Kerja, atau
            Unit Kerja. Klik kotak centang ketika dokumen sudah tersedia dan
            sesuai.
          </p>
          <StepList
            steps={[
              {
                title: "Baca nama dokumen",
                body: "Perhatikan nama dokumen dan keterangan subjeknya sebelum memberi centang.",
              },
              {
                title: "Centang jika sudah siap",
                body: "Klik baris dokumen atau kotak centang di kiri baris. Baris yang sudah dicentang akan berubah tampilan.",
              },
              {
                title: "Gunakan tombol lipat",
                body: "Pada kelompok dokumen, tombol panah dapat dipakai untuk melipat atau membuka kembali daftar dokumen.",
              },
            ]}
          />
          <GuideShot
            src="/guide-screenshots/04-dokumen-section.png"
            alt="Bagian Checklist Dokumen"
            caption="Gambar 4. Contoh tampilan Checklist Dokumen ditampilkan penuh untuk bagian yang sedang dibahas, tanpa pemotongan area gambar."
          />
        </GuideSection>

        <GuideSection
          number="7"
          title="Menggunakan Checklist Non-Dokumen"
          lead="Checklist Non-Dokumen dipakai untuk memeriksa kesesuaian persyaratan yang bukan berupa file dokumen."
        >
          <p>
            Pada Kemenkeu, bagian ini mengacu pada persyaratan tugas belajar
            yang berlaku. Pada KLPD, bagian ini mengikuti ketentuan kepegawaian
            atau tugas belajar di instansi masing-masing.
          </p>
          <StepList
            steps={[
              {
                title: "Baca setiap pernyataan",
                body: "Pastikan Kamu memahami isi pernyataan sebelum memberi centang.",
              },
              {
                title: "Centang jika sudah sesuai",
                body: "Centang hanya jika kondisi tersebut sudah terpenuhi.",
              },
              {
                title: "Koordinasikan jika ragu",
                body: "Jika ada pernyataan yang belum jelas, konfirmasi kepada pengelola kepegawaian atau pihak yang berwenang di unit kerja Kamu.",
              },
            ]}
          />
          <GuideShot
            src="/guide-screenshots/05-non-dokumen-section.png"
            alt="Bagian Checklist Non-Dokumen"
            caption="Gambar 5. Bagian Checklist Non-Dokumen menampilkan progress kategori, daftar pernyataan, dan tombol lipat."
          />
        </GuideSection>

        <GuideSection
          number="8"
          title="Memantau Progress"
          lead="Panel progress menunjukkan perkembangan checklist Kamu."
        >
          <p>
            Di layar desktop, panel progress berada di sisi kiri halaman. Panel
            ini menampilkan progress keseluruhan, progress dokumen, dan progress
            non-dokumen. Tombol Export JSON, Import JSON, dan Reset juga berada
            di panel ini.
          </p>
          <GuideShot
            src="/guide-screenshots/06-progress-panel.png"
            alt="Panel progress desktop"
            caption="Gambar 6. Panel progress desktop ditampilkan utuh, termasuk tombol Export JSON, Import JSON, dan Reset."
          />
          <p>
            Di ponsel, panel progress tampil di bagian atas halaman. Klik tombol
            panah untuk membuka detail progress dan tombol pengelolaan data.
          </p>
          <GuideShot
            src="/guide-screenshots/07-mobile-progress.png"
            alt="Panel progress mobile"
            caption="Gambar 7. Tampilan mobile menunjukkan panel progress yang sudah dibuka. Seluruh area yang dipakai dalam panduan ditampilkan tanpa pemotongan."
            portrait
          />
        </GuideSection>

        <GuideSection
          number="9"
          title="Export JSON dan Import JSON"
          lead="Gunakan fitur ini untuk mencadangkan progress atau memindahkan progress antar perangkat."
        >
          <StepList
            steps={[
              {
                title: "Export JSON",
                body: "Klik Export JSON pada panel progress. File cadangan akan terunduh ke perangkat Kamu.",
              },
              {
                title: "Simpan file cadangan",
                body: "Simpan file tersebut di tempat aman. File ini dapat berisi data yang Kamu masukkan dan status checklist.",
              },
              {
                title: "Import JSON",
                body: "Klik Import JSON, lalu pilih file cadangan yang sebelumnya Kamu unduh dari website ini.",
              },
              {
                title: "Pastikan klaster sama",
                body: "File DJP hanya bisa dipakai di checklist DJP, file KLPD hanya bisa dipakai di checklist KLPD, dan begitu seterusnya.",
              },
            ]}
          />
          <Callout title="Penting">
            <p>
              Jangan membagikan file JSON kepada pihak yang tidak
              berkepentingan karena file tersebut dapat memuat informasi yang
              Kamu isi di Data Awal.
            </p>
          </Callout>
        </GuideSection>

        <GuideSection
          number="10"
          title="Reset Progress"
          lead="Reset digunakan jika Kamu ingin menghapus progress dan mulai dari awal."
        >
          <StepList
            steps={[
              {
                title: "Klik Reset",
                body: "Tombol Reset berada di panel progress.",
              },
              {
                title: "Baca konfirmasi",
                body: "Website akan menampilkan konfirmasi agar progress tidak terhapus tanpa sengaja.",
              },
              {
                title: "Pilih Ya, Reset",
                body: "Klik Ya, Reset hanya jika Kamu yakin ingin mengosongkan semua centangan dan data yang sudah diisi.",
              },
              {
                title: "Gunakan Batal jika ragu",
                body: "Klik Batal untuk menutup konfirmasi tanpa menghapus progress.",
              },
            ]}
          />
          <GuideShot
            src="/guide-screenshots/08-reset-dialog.png"
            alt="Dialog konfirmasi Reset"
            caption="Gambar 8. Reset selalu menampilkan kotak konfirmasi sebelum data dikosongkan."
          />
        </GuideSection>

        <GuideSection
          number="11"
          title="Link Penting"
          lead="Area Link Penting disediakan untuk tautan pendukung yang relevan dengan checklist."
        >
          <p>
            Jika tautan pendukung belum tersedia, Kamu akan melihat keterangan
            &quot;Akan segera diperbarui.&quot; Jika tautan sudah tersedia, klik
            tautan tersebut untuk membukanya di tab baru.
          </p>
          <GuideShot
            src="/guide-screenshots/09-link-penting.png"
            alt="Area Link Penting"
            caption="Gambar 9. Area Link Penting ditampilkan utuh, termasuk kondisi saat tautan belum tersedia."
          />
        </GuideSection>

        <GuideSection
          number="12"
          title="Feedback Anonim"
          lead="Gunakan formulir ini untuk menyampaikan kendala atau saran tanpa mencantumkan identitas."
        >
          <StepList
            steps={[
              {
                title: "Buka bagian Feedback Anonim",
                body: "Formulir ini tersedia di bagian bawah halaman awal, halaman pilih sub-klaster, dan halaman checklist.",
              },
              {
                title: "Tulis feedback",
                body: "Sampaikan kendala, saran tampilan, atau bagian checklist yang menurut Kamu perlu dibuat lebih jelas.",
              },
              {
                title: "Klik Kirim Feedback",
                body: "Feedback akan masuk ke dashboard Developer tanpa menyimpan identitas pengguna bersama isi feedback.",
              },
            ]}
          />
          <GuideShot
            src="/guide-screenshots/10-feedback.png"
            alt="Formulir Feedback Anonim"
            caption="Gambar 10. Formulir Feedback Anonim ditampilkan penuh, termasuk kolom feedback dan tombol Kirim Feedback."
          />
        </GuideSection>

        <GuideSection
          number="13"
          title="Iklan Promosi, Tombol Kembali, dan Logo"
          lead="Header membantu Kamu berpindah halaman dan membuka tautan promosi."
        >
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Iklan promosi</strong> berada di tengah header. Jika Kamu
              tertarik, klik area tersebut untuk membuka tautan promosi di tab
              baru. Klik ini tidak mengubah progress checklist.
            </li>
            <li>
              <strong>Tombol Kembali</strong> berada di sisi kiri pada halaman
              selain halaman awal. Gunakan tombol ini untuk kembali ke halaman
              sebelumnya.
            </li>
            <li>
              <strong>Logo Persiapantubel</strong> berada di sisi kanan header.
              Klik logo untuk kembali ke halaman awal.
            </li>
          </ul>
          <GuideShot
            src="/guide-screenshots/11-header.png"
            alt="Header berisi tombol kembali, promosi, dan logo"
            caption="Gambar 11. Header ditampilkan utuh: tombol kembali di kiri, promosi di tengah, dan logo di kanan."
          />
        </GuideSection>

        <GuideSection
          number="14"
          title="Footer, Kontak, dan Catatan Developer"
          lead="Bagian bawah website berisi informasi bantuan dan tautan pendukung."
        >
          <p>
            Footer menampilkan ringkasan keamanan data, tautan informasi
            Persiapantubel, nomor WhatsApp untuk saran atau kendala, dan alamat
            email. Gunakan tautan kontak jika Kamu membutuhkan bantuan di luar
            formulir Feedback Anonim.
          </p>
          <p>
            Website juga memiliki halaman Developer untuk pengelola. Halaman ini
            tidak diperlukan oleh peserta untuk menyelesaikan checklist.
          </p>
          <GuideShot
            src="/guide-screenshots/12-footer.png"
            alt="Footer website"
            caption="Gambar 12. Footer ditampilkan utuh, termasuk tautan pendukung dan kontak."
          />
        </GuideSection>

        <GuideSection
          number="15"
          title="Keamanan Data dan Kebiasaan Penggunaan"
          lead="Gunakan website dengan kebiasaan yang menjaga progress tetap aman."
        >
          <ul className="list-disc space-y-2 pl-6">
            <li>
              Progress tersimpan otomatis di perangkat dan browser yang Kamu
              gunakan.
            </li>
            <li>
              Jika Kamu membersihkan data browser, progress bisa ikut terhapus.
            </li>
            <li>
              Lakukan Export JSON secara berkala sebagai cadangan.
            </li>
            <li>
              Simpan file JSON di lokasi yang aman dan jangan membagikannya
              kepada pihak yang tidak berkepentingan.
            </li>
            <li>
              Setelah semua dokumen dan non-dokumen selesai, periksa kembali
              Data Awal dan progress sebelum melanjutkan proses pendaftaran.
            </li>
          </ul>
          <Callout title="Ringkasan alur terbaik">
            <p>
              Pilih klaster, pilih sub-klaster jika Kamu berasal dari Kemenkeu,
              isi Data Awal, centang Dokumen, centang Non-Dokumen, cek progress,
              Export JSON sebagai cadangan, lalu gunakan Feedback Anonim jika
              ada hal yang perlu diperbaiki.
            </p>
          </Callout>
        </GuideSection>

        <section className="rounded-2xl border border-ink-200 bg-white p-6 text-center shadow-sm">
          <p className="text-xl font-bold text-ink-950">Penutup</p>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-ink-700">
            Semoga Buku Panduan ini membantu Kamu menggunakan website Ceklis
            Tubel dengan lebih terarah, rapi, dan percaya diri.
          </p>
        </section>
      </article>
    </main>
  );
}
