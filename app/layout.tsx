import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
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

export const metadata: Metadata = {
  title: { default: `${site.name} — ${site.role}`, template: `%s — ${site.name}` },
  // Under ~160 characters so Google shows it whole.
  description:
    "Michael Eng is an MBA candidate at Chicago Booth. At Accenture, he helped software & platform leaders shape go-to-market strategy and expand internationally.",
  metadataBase: new URL(site.url),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description:
      "MBA candidate at Chicago Booth, previously in strategy at Accenture. Recruiting for Summer 2027 strategy consulting internships.",
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
      className={`${cormorant.variable} ${inter.variable}`}
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
