import { Curtain } from "@/components/Curtain";
import { About } from "@/components/sections/About";
import { Connect } from "@/components/sections/Connect";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";

// Each Curtain is one card in the stack; consecutive sections of the same tone share a card.
export default function Home() {
  return (
    <>
      <main id="main">
        <Curtain index={0} tone="paper">
          <Hero />
        </Curtain>
        <Curtain index={1} tone="paper">
          <About />
        </Curtain>
        <Curtain index={2} tone="paper">
          <Experience />
          <Education />
        </Curtain>
        <Curtain index={3} tone="paper">
          <Projects />
        </Curtain>
        <Curtain index={4} tone="paper">
          <Skills />
        </Curtain>
        {/* Inside <main> so every panel shares one sticky container and Connect can slide over Skills. */}
        <Curtain index={5} tone="ink" last>
          <Connect />
        </Curtain>
      </main>
    </>
  );
}
