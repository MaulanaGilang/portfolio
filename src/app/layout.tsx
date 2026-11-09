import type { Metadata } from "next";
import localFont from "next/font/local";
import { introScript } from "@/components/offline/intro";
import { preloaderScript } from "@/lib/preloader";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { profile } from "@/data/content";
import "./globals.css";

// Satoshi (Fontshare, ITF Free Font License), self-hosted. Stand-in for Lusion's Aeonik.
const satoshi = localFont({
  variable: "--font-satoshi",
  display: "swap",
  src: [
    { path: "../fonts/Satoshi-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Satoshi-500.woff2", weight: "500", style: "normal" },
  ],
});

const title = profile.name;
const description =
  "Data Analyst moving into Data Engineering, based in Tuban, East Java. SQL data warehousing, ETL pipelines, dashboards and cloud. Open to remote work and relocation.";

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s | ${profile.name}` },
  description,
  authors: [{ name: profile.name, url: profile.linkedin }],
  openGraph: {
    title: `${profile.name} | Data Analyst → Data Engineer`,
    description,
    type: "profile",
    siteName: profile.name,
  },
  twitter: { card: "summary_large_image", title: `${profile.name} | Data Analyst → Data Engineer`, description },
};

/**
 * The thin shell both sides of the site share: document, font and smooth
 * scroll. The portfolio's chrome lives in (work)/layout.tsx and the After
 * Hours page has its own in offline/layout.tsx, so neither loads the other's.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-tone="paper" className={`${satoshi.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Before first paint. The root layout never re-renders on navigation, so these run once per load. */}
        <script dangerouslySetInnerHTML={{ __html: preloaderScript + introScript }} />
      </head>
      <body className="min-h-dvh overflow-x-clip">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
