import type { Metadata } from "next";
import { Barlow_Condensed, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cybersecurity Sales Academy | India's #1 Cyber Sales Program — CCSM™",
  description:
    "India's first 14-week Cybersecurity Sales Leadership Program. Earn CCSM™ certification, master enterprise cyber sales, and get placement support at top firms. Enroll now.",
  keywords:
    "cybersecurity sales training India, CCSM certification, cyber sales academy, B2B sales training cybersecurity, IT sales career India, cybersecurity job placement",
  authors: [{ name: "CyberSales Academy" }],
  robots: "index, follow",
  openGraph: {
    title: "Cybersecurity Sales Academy — CCSM™ Certified | India",
    description:
      "14-week intensive program to become a certified cybersecurity sales professional. Placement support, CCSM™ certification, live CISO pitch.",
    type: "website",
    locale: "en_IN",
    siteName: "CyberSales Academy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cybersecurity Sales Academy India — CCSM™",
    description:
      "14-week accelerator for cybersecurity sales professionals. CCSM™ certified. Placement focused.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body>{children}</body>
    </html>
  );
}