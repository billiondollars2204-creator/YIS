import type { Metadata, Viewport } from "next";
import { Caveat, Fraunces, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { RevealController } from "@/components/RevealController";
import { Analytics } from "@/components/Analytics";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});
const instrument = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument", display: "swap" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat", display: "swap", weight: ["500", "700"] });

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
    images: [{ url: "/og-placeholder.svg", width: 1200, height: 630, alt: "Immunitywize" }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#f8f1e4",
  width: "device-width",
  initialScale: 1,
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/favicon.svg`,
  // PLACEHOLDER: add sameAs social profiles and contact point once confirmed.
  sameAs: [],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${fraunces.variable} ${instrument.variable} ${caveat.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks JS as available before paint so reveal/scroll animations never hide content without JS. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <RevealController />
        <Analytics />
        <JsonLd data={organizationLd} />
      </body>
    </html>
  );
}
