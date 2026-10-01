import { EnvelopeSimple, FileText, GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { profile } from "@/data/content";
import { DitherCanvas } from "../dither/DitherCanvas";
import { Magnetic } from "../ui/Magnetic";
import { SplitReveal } from "../ui/SplitReveal";

const links = [
  { label: "Email", hint: profile.email, href: `mailto:${profile.email}`, Icon: EnvelopeSimple, external: false },
  { label: "LinkedIn", hint: "gilang-maulanatbn", href: profile.linkedin, Icon: LinkedinLogo, external: true },
  { label: "GitHub", hint: "MaulanaGilang", href: profile.github, Icon: GithubLogo, external: true },
  { label: "Résumé", hint: "PDF on Google Drive", href: profile.resume, Icon: FileText, external: true },
];

/**
 * The dark closing card. It slides up over the pinned Skills section
 * (see Curtain in page.tsx) and fits one screen.
 */
export function Connect() {
  return (
    <footer id="connect">
      <section data-tone="ink" className="relative flex min-h-[100dvh] flex-col justify-between pt-[clamp(88px,11vh,128px)] pb-6">
        {/* The dotted paper plane glides through the empty right half, under the headline. */}
        <DitherCanvas
          scene="plane"
          tone="dark"
          offset={["start end", "end end"]}
          className="absolute top-[30%] right-[3%] bottom-[12%] hidden w-[50%] md:block"
        />
        <div className="relative container-site">
          <SplitReveal
            as="h2"
            text="Let's build something with *your data.*"
            className="max-w-[13ch] display text-[clamp(2.8rem,6.6vw,7.75rem)]"
          />
          <p className="mt-6 max-w-[46ch] text-[17px] text-fg-2">
            Hiring for a data role, or want to talk pipelines? My inbox is open. Based in {profile.location}, open
            to remote work and relocation.
          </p>

          <ul className="mt-10 flex flex-wrap gap-4 md:mt-12 md:gap-5">
            {links.map(({ label, hint, href, Icon, external }) => (
              <li key={label}>
                <Magnetic strength={0.4}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    aria-label={`${label}: ${hint}`}
                    data-sound="click"
                    className="group/icon relative grid size-[clamp(64px,8vw,96px)] place-items-center rounded-full border border-line transition-[background-color,border-color,color] duration-300 hover:border-accent-solid hover:bg-accent-solid hover:text-on-accent"
                  >
                    <Icon size={32} weight="regular" className="size-[38%] transition-transform duration-500 group-hover/icon:scale-110" />
                    <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 label whitespace-nowrap text-fg-3 opacity-0 transition-opacity duration-300 group-hover/icon:opacity-100 group-focus-visible/icon:opacity-100 max-md:opacity-100">
                      {label}
                    </span>
                  </a>
                </Magnetic>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative container-site mt-14 flex flex-col gap-3 border-t border-line pt-5 label text-fg-3 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Gilang Maulana</p>
          <p>Designed and built with Next.js and WebGL</p>
          <a href="#top" className="hover:text-fg">
            Back to top ↑
          </a>
        </div>
      </section>
    </footer>
  );
}
