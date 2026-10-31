import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, Mrs_Saint_Delafield } from "next/font/google";
import { ClientProviders } from "@/components/providers/ClientProviders";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { site } from "@/content/site";
import "./globals.css";

// Self-hosted at build time by next/font — no runtime third-party requests.
// Display + name: a refined Garamond with a true italic.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
// Stand-in for the hero sign-off until a real signature SVG replaces it.
const signature = Mrs_Saint_Delafield({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-signature-face",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: `${site.name} — Strategy & Operations · Chicago Booth MBA`, template: `%s — ${site.name}` },
  description:
    "Michael Eng is a joint MBA and MS in Computer Science candidate at Chicago Booth. Previously a Strategy Consultant at Accenture, where he helped scale Waymo's autonomous fleet from 20 to 500 vehicles.",
  metadataBase: new URL(site.url),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Strategy & Operations · Chicago Booth MBA`,
    description: "MBA candidate at Chicago Booth. Strategy and operations, previously at Accenture.",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#0A0A0B", colorScheme: "dark" };

// Runs before paint: hides content (no flash) only when the preloader will run
// this session and motion is allowed. The Preloader component owns clearing it.
const preloadScript = `(function(){try{var pl=${site.flags.preloader};var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;if(pl&&!rm&&!sessionStorage.getItem('v3-preloaded')){document.documentElement.classList.add('is-preloading');}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorant.variable} ${inter.variable} ${signature.variable}`}
    >
      <body suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: preloadScript }} />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ClientProviders />
        <SiteHeader />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
