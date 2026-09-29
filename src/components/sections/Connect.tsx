import { EnvelopeSimple, FileText, GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { profile } from "@/data/content";
import { Magnetic } from "../ui/Magnetic";
import { SplitReveal } from "../ui/SplitReveal";

const links = [
  { label: "Email", hint: profile.email, href: `mailto:${profile.email}`, Icon: EnvelopeSimple, external: false },
  { label: "LinkedIn", hint: "gilang-maulanatbn", href: profile.linkedin, Icon: LinkedinLogo, external: true },
  { label: "GitHub", hint: "MaulanaGilang", href: profile.github, Icon: GithubLogo, external: true },
  { label: "Résumé", hint: "PDF on Google Drive", href: profile.resume, Icon: FileText, external: true },
];

export function Connect() {
  return (
    <footer id="connect" data-tone="ink" className="relative flex min-h-[100dvh] flex-col justify-between pt-[clamp(96px,12vw,180px)] pb-8">
      <div className="container-site">
        <SplitReveal
          as="h2"
          text="Let's build something with *your data.*"
          className="max-w-[12ch] display text-[clamp(3.25rem,10vw,10rem)]"
        />
        <p className="mt-8 max-w-[44ch] text-lg text-fg-2">
          Hiring for a data role, or want to talk pipelines? My inbox is open. Based in {profile.location}, open
          to remote work and relocation.
        </p>

        <ul className="mt-14 flex flex-wrap gap-4 md:mt-20 md:gap-6">
          {links.map(({ label, hint, href, Icon, external }) => (
            <li key={label}>
              <Magnetic strength={0.4}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-label={`${label}: ${hint}`}
                  data-sound="click"
                  className="group/icon relative grid size-[clamp(72px,11vw,120px)] place-items-center rounded-full border border-line transition-[background-color,border-color,color] duration-300 hover:border-accent-solid hover:bg-accent-solid hover:text-on-accent"
                >
                  <Icon size={36} weight="regular" className="size-[38%] transition-transform duration-500 group-hover/icon:scale-110" />
                  <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs whitespace-nowrap text-fg-3 opacity-0 transition-opacity duration-300 group-hover/icon:opacity-100 group-focus-visible/icon:opacity-100 max-md:opacity-100">
                    {label}
                  </span>
                </a>
              </Magnetic>
            </li>
          ))}
        </ul>
      </div>

      <div className="container-site mt-24 flex flex-col gap-3 border-t border-line pt-6 font-mono text-xs text-fg-3 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Gilang Maulana</p>
        <p>Designed and built with Next.js and WebGL</p>
        <a href="#top" className="hover:text-fg">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
