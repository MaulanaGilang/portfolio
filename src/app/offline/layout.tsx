import type { Metadata, Viewport } from "next";
import Image from "next/image";
import { Michroma } from "next/font/google";
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
    <div data-world="offline" className={michroma.variable}>
      {/* One fixed scene behind every panel: a desert at dusk. */}
      <div className="ah-scene" aria-hidden>
        <Image src="/offline/scene.webp" alt="" fill priority sizes="100vw" />
      </div>
      {children}
    </div>
  );
}
