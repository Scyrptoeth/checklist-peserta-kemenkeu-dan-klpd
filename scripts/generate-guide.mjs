import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const screenshotsDir = path.join(rootDir, "public", "guide-screenshots");
const pdfPath = path.join(rootDir, "public", "buku-panduan.pdf");
const baseUrl = process.env.GUIDE_BASE_URL ?? "http://localhost:3000";
const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const samplePriorities = [
  "Sarjana Terapan Akuntansi Sektor Publik",
  "Sarjana Terapan Manajemen Keuangan Negara",
  "Sarjana Terapan Manajemen Aset Publik",
  "Diploma III Akuntansi",
  "Diploma III Pajak",
];

async function launchBrowser() {
  try {
    return await chromium.launch({
      headless: true,
      executablePath: chromePath,
    });
  } catch {
    return chromium.launch({ headless: true });
  }
}

async function prepareScreenshotsDir() {
  await fs.rm(screenshotsDir, { recursive: true, force: true });
  await fs.mkdir(screenshotsDir, { recursive: true });
}

async function waitForReady(page) {
  await page.waitForFunction(() => document.readyState === "complete");
  await page.waitForTimeout(450);
}

async function waitForImages(page) {
  await page.waitForFunction(() =>
    Array.from(document.images).every((img) => img.complete && img.naturalWidth > 0)
  );
}

async function disableStickyForComponentShots(page) {
  await page.addStyleTag({
    content: `
      .sticky {
        position: static !important;
      }
    `,
  });
  await page.waitForTimeout(300);
}

async function savePageScreenshot(page, filename, options = {}) {
  const filePath = path.join(screenshotsDir, filename);
  await page.screenshot({ path: filePath, ...options });
  console.log(`Screenshot saved: ${filename}`);
}

async function saveLocatorScreenshot(locator, filename) {
  const filePath = path.join(screenshotsDir, filename);
  await locator.scrollIntoViewIfNeeded();
  await locator.screenshot({ path: filePath });
  console.log(`Screenshot saved: ${filename}`);
}

function sectionByHeading(page, heading) {
  return page
    .locator("section", {
      has: page.getByRole("heading", { name: heading, exact: true }),
    })
    .first();
}

async function fillChecklistSample(page) {
  await page.locator("#unit-kerja").selectOption({ label: "Kementerian Keuangan" });
  await page.locator("#jalur").selectOption({ label: "Reguler" });
  await page.locator("#prodi-asal").selectOption({ label: "Diploma I Pajak" });

  for (const [index, label] of samplePriorities.entries()) {
    await page
      .locator(`#prioritas-pilihan-prodi-${index + 1}`)
      .selectOption({ label });
  }

  const checkboxes = page.locator('input[type="checkbox"]');
  const count = await checkboxes.count();
  for (let i = 0; i < Math.min(count, 5); i += 1) {
    await checkboxes.nth(i).check({ force: true });
  }
}

async function gotoChecklistWithSample(page, pathName = "/checklist/klpd") {
  await page.goto(`${baseUrl}${pathName}`, { waitUntil: "networkidle" });
  await waitForReady(page);
  await fillChecklistSample(page);
  await waitForReady(page);
}

async function captureDesktopScreenshots(browser) {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    locale: "id-ID",
    deviceScaleFactor: 2,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();

  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await waitForReady(page);
  await savePageScreenshot(page, "01-landing-full.png", { fullPage: true });

  await page.goto(`${baseUrl}/checklist/kemenkeu`, { waitUntil: "networkidle" });
  await waitForReady(page);
  await savePageScreenshot(page, "02-kemenkeu-subcluster-full.png", {
    fullPage: true,
  });

  await gotoChecklistWithSample(page);
  await disableStickyForComponentShots(page);
  await saveLocatorScreenshot(
    sectionByHeading(page, "Data Awal"),
    "03-data-awal-section.png"
  );
  await saveLocatorScreenshot(
    sectionByHeading(page, "Checklist Dokumen"),
    "04-dokumen-section.png"
  );
  await saveLocatorScreenshot(
    sectionByHeading(page, "Checklist Non-Dokumen"),
    "05-non-dokumen-section.png"
  );
  await saveLocatorScreenshot(page.locator("aside").first(), "06-progress-panel.png");

  await page.getByRole("button", { name: "Reset" }).click();
  await saveLocatorScreenshot(
    page.locator('[role="alertdialog"]').first(),
    "08-reset-dialog.png"
  );
  await page.keyboard.press("Escape");

  await saveLocatorScreenshot(
    sectionByHeading(page, "Link Penting"),
    "09-link-penting.png"
  );
  await saveLocatorScreenshot(
    page.locator('section[aria-labelledby="anonymous-feedback-title"]').first(),
    "10-feedback.png"
  );
  await saveLocatorScreenshot(page.locator("header").first(), "11-header.png");
  await saveLocatorScreenshot(page.locator("footer").first(), "12-footer.png");

  await context.close();
}

async function captureMobileScreenshots(browser) {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    locale: "id-ID",
    deviceScaleFactor: 3,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();

  await gotoChecklistWithSample(page);
  const expandButton = page.getByRole("button", {
    name: /Kembangkan detail progress/i,
  });
  if ((await expandButton.count()) > 0) {
    await expandButton.first().click();
  }
  await page.getByRole("button", { name: "Export JSON" }).first().waitFor();
  await page.addStyleTag({
    content: `
      header {
        display: none !important;
      }
      .sticky {
        position: static !important;
      }
      .rounded-b-2xl {
        border-radius: 1rem !important;
        border: 1px solid #e9ecef !important;
        background: #ffffff !important;
      }
    `,
  });
  await saveLocatorScreenshot(
    page.locator("div.rounded-b-2xl").first(),
    "07-mobile-progress.png"
  );

  await context.close();
}

async function generatePdf(browser) {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    locale: "id-ID",
    deviceScaleFactor: 2,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();

  await page.goto(`${baseUrl}/buku-panduan`, { waitUntil: "networkidle" });
  await waitForReady(page);
  await page.evaluate(async () => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    window.scrollTo({ top: 0 });
    for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight) {
      window.scrollTo({ top: y });
      await delay(120);
    }
    window.scrollTo({ top: 0 });
  });
  await waitForImages(page);
  await waitForReady(page);

  await page.pdf({
    path: pdfPath,
    format: "A4",
    printBackground: true,
    margin: { top: "1.4cm", right: "1.4cm", bottom: "1.4cm", left: "1.4cm" },
  });
  console.log(`PDF generated: ${pdfPath}`);

  await context.close();
}

async function main() {
  await prepareScreenshotsDir();
  const browser = await launchBrowser();
  try {
    await captureDesktopScreenshots(browser);
    await captureMobileScreenshots(browser);
    await generatePdf(browser);
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
