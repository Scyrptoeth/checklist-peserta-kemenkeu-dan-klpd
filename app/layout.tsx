import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Checklist Peserta SPMB PT PKN STAN 2026 — Kemenkeu & KLPD",
  description:
    "Aplikasi checklist interaktif untuk memastikan seluruh persyaratan dokumen dan non-dokumen SPMB PT PKN STAN 2026 telah terpenuhi.",
  openGraph: {
    title: "Checklist Peserta SPMB PT PKN STAN 2026",
    description: "Kemenkeu & KLPD — Dokumen & Non-Dokumen",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
