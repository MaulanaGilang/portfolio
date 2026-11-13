import type { Metadata, Viewport } from "next";
import { Cinzel, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { ViewTransition } from "react";
import { Lamp } from "@/components/offline/Lamp";
import "./offline.css";

// Moonwake type, the saga system (docs/offline/moonwake.md, section 2):
// Arcane Nine by Chequered Ink, supplied by Gilang, for the wordmark and titles;
// Geist Mono (SIL OFL) for all other text, quotes and numbers;
// Cinzel (SIL OFL) only as the fallback while Arcane Nine loads.
const arcane = localFont({ src: "../../fonts/ArcaneNine.otf", variable: "--font-arcane", display: "swap" });
const mono = Geist_Mono({ weight: ["300", "400", "500"], subsets: ["latin"], variable: "--font-hx", display: "swap" });
const cinzel = Cinzel({ weight: ["400"], subsets: ["latin"], variable: "--font-cinzel", display: "swap" });

export const metadata: Metadata = {
  title: "After Hours",
  description: "The other side of Gilang Maulana: games, music, films and anime.",
  openGraph: {
    title: "House Maulana | After Hours",
    description: "The other side of Gilang Maulana: games, music, films and anime.",
    images: [{ url: "/offline/og.png", width: 1200, height: 630, alt: "The House Maulana crest: a silver crescent on a wine-red circle" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0809",
};

/** After Hours has its own chrome, colours and type. Nothing from the portfolio loads here. */
export default function OfflineLayout({ children }: { children: React.ReactNode }) {
  return (
    // Crossing from or to the portfolio: this world sinks or rises (see globals.css).
    <ViewTransition enter={{ "world-in": "world-enter", default: "none" }} exit={{ "world-out": "world-exit", default: "none" }} default="none">
      <div data-world="offline" className={`${arcane.variable} ${mono.variable} ${cinzel.variable}`}>
        <Lamp />
        {children}
      </div>
    </ViewTransition>
  );
}
