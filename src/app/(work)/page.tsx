import { ViewTransition } from "react";
import { Curtain } from "@/components/Curtain";
import { About } from "@/components/sections/About";
import { Connect } from "@/components/sections/Connect";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";

// One lavender canvas (Lusion-style). The page ends with the only card
// transition: Skills pins and recedes while the dark Connect card slides over.
export default function Home() {
  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      default="none"
    >
      <main id="main" className="relative">
        <Hero />
        <About />
        <Experience />
        <Education />
        <Projects />
        <Curtain index={0}>
          <Skills />
        </Curtain>
        <Curtain index={1} tone="ink" last>
          <Connect />
        </Curtain>
      </main>
    </ViewTransition>
  );
}
