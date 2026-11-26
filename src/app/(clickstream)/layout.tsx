import type { Viewport } from "next";
import localFont from "next/font/local";
import { ViewTransition } from "react";
import "@/clickstream/clickstream.css";

// The dashboard's own type, self-hosted (SIL OFL): Geist for text, Space Grotesk for
// headings. Geist Mono comes from the root layout.
const geistSans = localFont({ src: "../../fonts/Geist-Variable.woff2", variable: "--font-geist-sans", display: "swap", weight: "100 900" });
const spaceGrotesk = localFont({
  src: "../../fonts/SpaceGrotesk-Variable.woff2",
  variable: "--font-space-grotesk",
  display: "swap",
  weight: "300 700",
});

export const viewport: Viewport = {
  themeColor: "#090c11",
  colorScheme: "dark",
};

/**
 * The clickstream dashboard has its own night theme; none of the portfolio's chrome loads here.
 * Arriving from the case study it fades up out of the dark; leaving, it fades out (see globals.css).
 */
export default function ClickstreamLayout({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter={{ "dash-in": "dash-enter", default: "none" }} exit={{ "dash-out": "dash-exit", default: "none" }} default="none">
      <div data-world="clickstream" className={`${geistSans.variable} ${spaceGrotesk.variable}`}>
        {children}
      </div>
    </ViewTransition>
  );
}
