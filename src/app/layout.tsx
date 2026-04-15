import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { SiteFooter } from "@/components/brand/site-footer";
import { SiteHeader } from "@/components/brand/site-header";
import { StickyWhatsAppButton } from "@/components/brand/sticky-whatsapp-button";
import { BRAND } from "@/lib/brand";
import { getCurrentCustomer } from "@/lib/customer-auth";
import { getSiteUrl } from "@/lib/site";
import { Providers } from "./providers";
import "./globals.css";

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: `${BRAND.name} | ${BRAND.tagline}`,
  description:
    "Premium Ayurvedic wellness platform built around 9-in-1 wellness kits, herbal powders, herbal oils, raw herbs, and bundle-led rituals for everyday balance.",
  keywords: [
    "Ayurvedic wellness kit",
    "herbal therapy",
    "nabhi oil",
    "feet oil",
    "Ayurdhara Divya Shakti",
  ],
  openGraph: {
    title: `${BRAND.name} | ${BRAND.tagline}`,
    description:
      "Complete 9-in-1 Ayurvedic wellness kits with Nabhi + Feet + Herbal Powder therapy for total body balance.",
    type: "website",
    url: "/",
    siteName: BRAND.name,
  },
  alternates: {
    canonical: "/",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const customer = await getCurrentCustomer();

  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="min-h-screen bg-[var(--color-background)] text-[var(--color-ink)]">
        <Providers>
          <div className="relative min-h-screen overflow-x-hidden">
            <SiteHeader customer={customer} />
            <main>{children}</main>
            <SiteFooter />
            <StickyWhatsAppButton />
          </div>
        </Providers>
      </body>
    </html>
  );
}
