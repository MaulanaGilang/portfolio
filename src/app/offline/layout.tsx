import type { Metadata, Viewport } from "next";
import { Michroma } from "next/font/google";
import { ViewTransition } from "react";
import { Scenes } from "@/components/offline/Scenes";
import "./offline.css";

// Michroma (SIL Open Font License): wide, geometric capitals in the spirit of the films'
// interfaces, without using their typeface. next/font serves it from this site.
const michroma = Michroma({ weight: "400", subsets: ["latin"], variable: "--font-michroma", display: "swap" });

export const metadata: Metadata = {
  title: "After Hours",
  description: "The other side of Gilang Maulana: games, music, films and anime.",
  openGraph: {
    title: "House Maulana | After Hours",
    description: "The other side of Gilang Maulana: games, music, films and anime.",
    images: [{ url: "/offline/banner.webp", width: 1536, height: 1024, alt: "The House Maulana banner" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#120E0E",
};

/** After Hours has its own chrome, colours and display face. Nothing from the portfolio loads here. */
export default function OfflineLayout({ children }: { children: React.ReactNode }) {
  return (
    // Crossing from or to the portfolio: this world sinks or rises (see globals.css).
    <ViewTransition enter={{ "world-in": "world-enter", default: "none" }} exit={{ "world-out": "world-exit", default: "none" }} default="none">
      <div data-world="offline" className={michroma.variable}>
        <Scenes />
        {children}
      </div>
    </ViewTransition>
  );
}
