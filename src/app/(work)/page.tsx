import { ViewTransition } from "react";
import { About } from "@/components/sections/About";
import { Connect } from "@/components/sections/Connect";
import { Dusk } from "@/components/sections/Dusk";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";

// One day over a dune field: Part One's misty dawn at the top, Part Two's dusk at the end.
export default function Home() {
  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", "world-out": "world-enter", default: "none" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", "world-in": "world-exit", default: "none" }}
      default="none"
    >
      <main id="main" className="relative">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Education />
        <Skills />
        <Dusk />
        <Connect />
      </main>
    </ViewTransition>
  );
}
