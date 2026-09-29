import type { Metadata } from "next";
import { Nunito, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";
import { getLatestRelease } from "@/lib/github";
import { FAQS } from "@/lib/faqs";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-nunito",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
});

const title = "Peekie: A translucent scratchpad for your Mac";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s · Peekie",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Max Benschop", url: "https://github.com/maxbenschop" }],
  creator: "Max Benschop",
  publisher: "Max Benschop",
  keywords: [
    "Peekie",
    "macOS scratchpad",
    "menu bar notes app",
    "quick notes macOS",
    "translucent note app",
    "AppKit note app",
    "SwiftUI notes",
    "open source Mac app",
    "productivity app for Mac",
  ],
  category: "productivity",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport = {
  themeColor: "#0d0f14",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer,
    },
  })),
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const release = await getLatestRelease();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Peekie",
    operatingSystem: "macOS 14+",
    applicationCategory: "UtilitiesApplication",
    softwareVersion: release.version,
    image: `${SITE_URL}/icon.svg`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    downloadUrl: "https://github.com/maxbenschop/peekie/releases/latest",
    sameAs: ["https://github.com/maxbenschop/peekie"],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      name: "Max Benschop",
    },
    license: "https://github.com/maxbenschop/peekie/blob/main/LICENSE",
  };

  return (
    <html lang="en" className={`${nunito.variable} ${jetbrainsMono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        {children}
      </body>
    </html>
  );
}
