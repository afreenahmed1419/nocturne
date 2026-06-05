import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NoiseOverlay from "@/components/NoiseOverlay";
import PageTransition from "@/components/PageTransition";
import SmoothScroll from "@/components/SmoothScroll";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NOCTURNE — Scents for the Unafraid",
  description:
    "Luxury fragrance for those who explore the dark. Three obsessions, bottled. Discover Velvet Hour, Phantom Garden, and Burnt Manuscript.",
  keywords: ["perfume", "fragrance", "luxury", "nocturne", "scent"],
  openGraph: {
    title: "NOCTURNE — Scents for the Unafraid",
    description: "We bottle the stories that keep others awake at night.",
    type: "website",
    siteName: "NOCTURNE",
  },
  twitter: {
    card: "summary_large_image",
    title: "NOCTURNE — Scents for the Unafraid",
    description: "We bottle the stories that keep others awake at night.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <body className="bg-charcoal text-parchment font-sans antialiased overflow-x-hidden">
        <SmoothScroll>
          <NoiseOverlay />
          <Navbar />
          <PageTransition>
            <main>{children}</main>
          </PageTransition>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
