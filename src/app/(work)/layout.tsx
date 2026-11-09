import type { Viewport } from "next";
import { FluidCursor } from "@/components/FluidCursor";
import { Nav } from "@/components/Nav";
import { Preloader } from "@/components/Preloader";
import { SoundBridge } from "@/components/providers/SoundBridge";
import { profile } from "@/data/content";

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

/** The portfolio's chrome: intro, nav, cursor and sound. None of it reaches /offline. */
export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <noscript>
        <style>{`[data-preloader]{display:none}`}</style>
      </noscript>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <FluidCursor />
      <Preloader />
      <Nav />
      {children}
      <SoundBridge />
    </>
  );
}
