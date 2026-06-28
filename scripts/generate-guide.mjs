import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const screenshotsDir = path.join(rootDir, "public", "screenshots");
const pdfPath = path.join(rootDir, "public", "buku-panduan.pdf");
const baseUrl = "http://localhost:3000";

const sampleDataAwal = {
  "unit-kerja": "Kantor Pelayanan Pajak Pratama",
  "jalur": "Reguler",
  "prodi-asal": "Diploma III Pajak",
  "prioritas-pilihan-prodi-1": "Sarjana Terapan Akuntansi Sektor Publik",
  "prioritas-pilihan-prodi-2": "Sarjana Terapan Manajemen Keuangan Negara",
  "prioritas-pilihan-prodi-3": "",
  "prioritas-pilihan-prodi-4": "",
  "prioritas-pilihan-prodi-5": "",
  "status-pilihan-prodi": "",
};

const sampleChecked = {
  "pasfoto-berwarna-berformat-jpg-3-bulan-terakhir-pic-peserta": true,
  "scan-surat-keterangan-sehat-dari-rumah-sakit-pemerintah-berformat-pdf-pic-peserta": true,
  "scan-ijazah-dan-transkrip-terakhir-aslidilegalisasi-berformat-pdf-subjek-peserta": true,
  "memenuhi-masa-kerja-minimal-pns": true,
  "memenuhi-ketentuan-sisa-masa-kerja": true,
  "sehat-jasmani-dan-rohani": true,
};

async function waitForHydration(page) {
  await page.waitForFunction(() => document.readyState === "complete");
  await page.waitForTimeout(500);
}

async function screenshot(page, name, options = {}) {
  const filePath = path.join(screenshotsDir, name);
  await page.screenshot({ path: filePath, fullPage: false, ...options });
  console.log(`✓ Screenshot: ${name}`);
}

async function main() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    locale: "id-ID",
    deviceScaleFactor: 2,
  });

  const page = await context.newPage();

  // 1. Landing page
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await waitForHydration(page);
  await screenshot(page, "01-landing.png");

  // 2. Pilih sub-klaster Kemenkeu
  await page.goto(`${baseUrl}/checklist/kemenkeu`, { waitUntil: "networkidle" });
  await waitForHydration(page);
  await screenshot(page, "02-pilih-subklaster.png");

  // 3. Halaman checklist DJP dengan sample data
  const storageKey = "checklist-progress:kemenkeu:djp";
  const storedProgress = {
    version: 2,
    clusterId: "kemenkeu",
    subclusterId: "djp",
    checked: sampleChecked,
    dataAwal: sampleDataAwal,
    updatedAt: new Date().toISOString(),
  };

  await page.goto(`${baseUrl}/checklist/kemenkeu/djp`, { waitUntil: "networkidle" });
  await page.evaluate(
    ({ key, value }) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    { key: storageKey, value: storedProgress }
  );
  await page.reload({ waitUntil: "networkidle" });
  await waitForHydration(page);

  // Screenshot Data Awal
  await page.evaluate(() => {
    const section = document.querySelector("section");
    if (section) section.scrollIntoView({ block: "start" });
  });
  await page.waitForTimeout(300);
  await screenshot(page, "03-checklist-data-awal.png", { clip: { x: 0, y: 128, width: 1280, height: 720 } });

  // Screenshot Checklist Dokumen
  await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll("h2"));
    const target = headings.find((h) => h.textContent?.includes("Checklist Dokumen"));
    if (target) target.scrollIntoView({ block: "start" });
  });
  await page.waitForTimeout(300);
  await screenshot(page, "04-checklist-dokumen.png", { clip: { x: 0, y: 128, width: 1280, height: 720 } });

  // Screenshot Checklist Non-Dokumen
  await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll("h2"));
    const target = headings.find((h) => h.textContent?.includes("Checklist Non-Dokumen"));
    if (target) target.scrollIntoView({ block: "start" });
  });
  await page.waitForTimeout(300);
  await screenshot(page, "05-checklist-non-dokumen.png", { clip: { x: 0, y: 128, width: 1280, height: 720 } });

  // Screenshot Link Penting
  await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll("h2"));
    const target = headings.find((h) => h.textContent?.includes("Link Penting"));
    if (target) target.scrollIntoView({ block: "start" });
  });
  await page.waitForTimeout(300);
  await screenshot(page, "07-link-penting.png", { clip: { x: 0, y: 128, width: 1280, height: 720 } });

  // Screenshot Progress Panel + actions (desktop sidebar)
  await page.evaluate(() => window.scrollTo({ top: 0 }));
  await page.waitForTimeout(300);
  await screenshot(page, "06-progress-panel.png", { clip: { x: 0, y: 128, width: 1280, height: 720 } });

  // Screenshot Feedback Anonim
  await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll("h2"));
    const target = headings.find((h) => h.textContent?.includes("Feedback anonim"));
    if (target) target.scrollIntoView({ block: "start" });
  });
  await page.waitForTimeout(300);
  await screenshot(page, "08-feedback.png", { clip: { x: 0, y: 0, width: 1280, height: 520 } });

  // Screenshot Promo header
  await page.goto(`${baseUrl}/checklist/kemenkeu/djp`, { waitUntil: "networkidle" });
  await waitForHydration(page);
  await screenshot(page, "09-promo.png", { clip: { x: 320, y: 0, width: 640, height: 128 } });

  // 4. Generate PDF dari halaman /buku-panduan
  await page.goto(`${baseUrl}/buku-panduan`, { waitUntil: "networkidle" });
  await waitForHydration(page);
  // Scroll ke bawah agar gambar lazy-load terpicu
  await page.evaluate(async () => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    for (let i = 0; i < 10; i++) {
      window.scrollBy(0, window.innerHeight);
      await delay(200);
    }
    window.scrollTo({ top: 0 });
  });
  await page.waitForTimeout(1000);

  await page.pdf({
    path: pdfPath,
    format: "A4",
    printBackground: true,
    margin: { top: "1.5cm", right: "1.5cm", bottom: "1.5cm", left: "1.5cm" },
    preferCSSPageSize: false,
  });
  console.log(`✓ PDF generated: ${pdfPath}`);

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
