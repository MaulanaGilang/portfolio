import { EnvelopeSimple, FileText, GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { profile } from "@/data/content";
import { Magnetic } from "../ui/Magnetic";
import { SplitReveal } from "../ui/SplitReveal";
import { Tick } from "../ui/primitives";

const links = [
  { label: "Email", hint: profile.email, href: `mailto:${profile.email}`, Icon: EnvelopeSimple, external: false },
  { label: "LinkedIn", hint: "gilang-maulanatbn", href: profile.linkedin, Icon: LinkedinLogo, external: true },
  { label: "GitHub", hint: "MaulanaGilang", href: profile.github, Icon: GithubLogo, external: true },
  { label: "Résumé", hint: "PDF on Google Drive", href: profile.resume, Icon: FileText, external: true },
];

export function Connect() {
  return (
    <footer id="connect" data-tone="ink" className="relative flex min-h-[100dvh] flex-col justify-between pt-[clamp(96px,12vw,168px)] pb-8">
      <div className="container-site flex flex-col items-center text-center">
        <p className="label flex items-center gap-3 text-fg-2">
          <Tick />
          Let’s talk
          <Tick />
        </p>
        <SplitReveal
          as="h2"
          text="Let’s build something with *your data.*"
          accentClassName="text-gold"
          className="display mt-8 max-w-[13ch] text-[clamp(3.25rem,9.6vw,9rem)]"
        />
        <p className="mt-8 max-w-[44ch] text-[18px] leading-relaxed text-fg-2">
          Hiring for a data role, or want to talk pipelines? My inbox is open. Based in {profile.location}, open to
          remote work and relocation.
        </p>

        <a
          href={`mailto:${profile.email}`}
          data-sound="click"
          className="heading mt-10 text-[clamp(1.25rem,2.6vw,2rem)] underline decoration-fg/25 decoration-1 underline-offset-[0.25em] transition-colors hover:decoration-gold"
        >
          {profile.email}
        </a>

        <ul className="mt-14 flex flex-wrap justify-center gap-4 md:mt-16 md:gap-6">
          {links.map(({ label, hint, href, Icon, external }) => (
            <li key={label}>
              <Magnetic strength={0.4}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-label={`${label}: ${hint}`}
                  data-sound="click"
                  className="group/icon relative grid size-[clamp(72px,10vw,112px)] place-items-center rounded-full bg-surface-2 transition-[background-color,color] duration-300 hover:bg-fg hover:text-bg"
                >
                  <Icon size={36} weight="regular" className="size-[36%] transition-transform duration-500 group-hover/icon:scale-110" />
                  <span className="label pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-fg-3 opacity-0 transition-opacity duration-300 group-hover/icon:opacity-100 group-focus-visible/icon:opacity-100 max-md:opacity-100">
                    {label}
                  </span>
                </a>
              </Magnetic>
            </li>
          ))}
        </ul>
      </div>

      <div className="container-site mt-28 grid gap-3 border-t border-line pt-6 text-fg-3 sm:grid-cols-3 sm:items-center">
        <p className="label">© {new Date().getFullYear()} Gilang Maulana</p>
        <p className="label sm:text-center">Built with Next.js &amp; WebGL</p>
        <a href="#top" className="label transition-colors hover:text-fg sm:text-right">
          Back to top +
        </a>
      </div>
    </footer>
  );
}
