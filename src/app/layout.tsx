import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Nav } from "@/components/Nav";
import { Preloader, preloaderScript } from "@/components/Preloader";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { SoundBridge } from "@/components/providers/SoundBridge";
import { profile } from "@/data/content";
import "./globals.css";

// General Sans (Indian Type Foundry, ITF Free Font License), self-hosted. The closest
// free match to Aeonik; like Lusion, only weights 400 and 500 are used.
const general = localFont({
  variable: "--font-general",
  display: "swap",
  src: [
    { path: "./fonts/GeneralSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/GeneralSans-Medium.woff2", weight: "500", style: "normal" },
  ],
});

const title = `${profile.name} | Data Analyst → Data Engineer`;
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
  openGraph: { title, description, type: "profile", siteName: profile.name },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#f0f1fa",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Tuban", addressRegion: "East Java", addressCountry: "ID" },
  sameAs: [profile.github, profile.linkedin],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-tone="paper"
      className={`${general.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: preloaderScript }} />
        <noscript>
          <style>{`[data-preloader]{display:none}`}</style>
        </noscript>
      </head>
      <body className="min-h-dvh overflow-x-clip">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <Preloader />
          <Nav />
          {children}
        </SmoothScroll>
        <SoundBridge />
      </body>
    </html>
  );
}
