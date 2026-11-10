import type { Metadata, Viewport } from "next";
import { Cinzel, Cinzel_Decorative, Cormorant_Garamond, Cormorant_SC } from "next/font/google";
import { ViewTransition } from "react";
import { Scenes } from "@/components/offline/Scenes";
import "./offline.css";

// Moonwake type (all SIL Open Font License, served from this site by next/font):
// Cinzel Decorative for the house name only, Cinzel for titles, Cormorant SC for labels,
// Cormorant Garamond italic for the motto. Body text inherits Satoshi from the root layout.
const cinzel = Cinzel({ weight: ["400", "500"], subsets: ["latin"], variable: "--font-cinzel", display: "swap" });
const cinzelDecorative = Cinzel_Decorative({ weight: "400", subsets: ["latin"], variable: "--font-cinzel-deco", display: "swap" });
const cormorantSC = Cormorant_SC({ weight: ["500", "600"], subsets: ["latin"], variable: "--font-cormorant-sc", display: "swap" });
const cormorant = Cormorant_Garamond({ weight: "400", style: "italic", subsets: ["latin"], variable: "--font-cormorant", display: "swap" });

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
      <div
        data-world="offline"
        className={`${cinzel.variable} ${cinzelDecorative.variable} ${cormorantSC.variable} ${cormorant.variable}`}
      >
        <Scenes />
        {children}
      </div>
    </ViewTransition>
  );
}
