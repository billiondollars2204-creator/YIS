import type { Metadata, Viewport } from "next";
import { Mukta, Tiro_Devanagari_Hindi } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CartDrawer } from "@/components/CartDrawer";
import { Analytics } from "@/components/Analytics";
import { JsonLd } from "@/components/JsonLd";
import { resolveImage } from "@/data/images";
import { site } from "@/lib/site";

// Both families are by Indian type foundries and cover Latin + Devanagari,
// so English and Hindi product names share one typographic voice.
const tiro = Tiro_Devanagari_Hindi({ subsets: ["latin", "devanagari"], weight: "400", variable: "--font-tiro", display: "swap" });
const mukta = Mukta({ subsets: ["latin", "devanagari"], weight: ["400", "500", "600", "700"], variable: "--font-mukta", display: "swap" });

const ogImage = resolveImage("/images/og") ?? "/og-placeholder.svg";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Homemade panjiri, pinni & laddus`, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    title: `${site.name} — Homemade panjiri, pinni & laddus`,
    description: site.description,
    images: [{ url: ogImage, width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#8a1c2b",
  width: "device-width",
  initialScale: 1,
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/favicon.svg`,
  // PLACEHOLDER: add sameAs social profiles and contactPoint once confirmed.
  sameAs: [],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${tiro.variable} ${mukta.variable}`} suppressHydrationWarning>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <CartDrawer />
        <Analytics />
        <JsonLd data={organizationLd} />
      </body>
    </html>
  );
}
