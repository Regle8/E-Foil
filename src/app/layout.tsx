import type { Metadata, Viewport } from "next";
import { Archivo, Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { DemoBadge } from "@/components/layout/DemoBadge";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { isDemo } from "@/lib/base-path";
import { site } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument",
  display: "swap",
});
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
// Mono is only used for small labels, so keep it off the critical path.
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.claim}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "efoil London",
    "e-foil lessons London",
    "efoil lessons",
    "LIFT efoil",
    "LIFT5",
    "LIFTX",
    "Queen Mother Reservoir",
    "Datchet",
    "Hayling Island efoil",
    "electric hydrofoil",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: site.name,
    title: `${site.name} | ${site.claim}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  // The GitHub Pages demo must not compete with the real site in search results.
  robots: isDemo ? { index: false, follow: false } : undefined,
};

export const viewport: Viewport = {
  themeColor: "#05080a",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: "+442080874016",
  email: site.email,
  image: `${site.url}/opengraph-image.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.hq.line1,
    addressLocality: site.hq.town,
    postalCode: site.hq.postcode,
    addressCountry: "GB",
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "13:00" },
  ],
  sameAs: [site.socials.instagram, site.socials.facebook],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${archivo.variable} ${instrument.variable} ${geist.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-ink text-bone antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a
          href="#main"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-teal px-5 py-3 text-sm font-semibold text-ink transition focus:translate-y-0"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
        </SmoothScroll>
        <DemoBadge />
      </body>
    </html>
  );
}
