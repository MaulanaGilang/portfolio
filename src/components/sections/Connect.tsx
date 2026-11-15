import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { profile } from "@/data/content";
import { COORDS, LocalTime } from "../ui/Readouts";
import { Reveal } from "../ui/Reveal";

const links = [
  { label: "Email", hint: profile.email, href: `mailto:${profile.email}`, external: false },
  { label: "LinkedIn", hint: "gilang-maulanatbn", href: profile.linkedin, external: true },
  { label: "GitHub", hint: "MaulanaGilang", href: profile.github, external: true },
  { label: "Résumé", hint: "PDF on Google Drive", href: profile.resume, external: true },
];

/** Night after the dusk band: the closing words in Dune Rise, then the ways to reach me as large rows. */
export function Connect() {
  return (
    <footer id="connect" data-tone="ink" aria-labelledby="connect-title" className="relative -mt-px pt-[clamp(40px,6vw,96px)] pb-6">
      <div className="container-site">
        <h2 id="connect-title" className="display text-[clamp(2.6rem,10vw,12rem)] whitespace-nowrap text-signal">
          Let&apos;s talk
        </h2>
        <p className="mt-6 max-w-[46ch] text-[17px] leading-relaxed text-fg-2">
          Hiring for a data role, or want to talk pipelines? My inbox is open. Based in {profile.location}, open to remote
          work and relocation.
        </p>

        <ul className="mt-12 border-t border-rule-strong md:mt-16">
          {links.map(({ label, hint, href, external }, i) => (
            <Reveal as="li" key={label} delay={i * 0.04}>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                data-sound="click"
                className="group/link flex items-center justify-between gap-6 border-b border-line py-5 md:py-7"
              >
                <span className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-8">
                  <span className="text-[clamp(1.6rem,3.4vw,3.2rem)] leading-none font-medium tracking-[-0.035em] transition-colors duration-500 group-hover/link:text-accent">
                    {label}
                  </span>
                  <span className="label text-fg-3">{hint}</span>
                </span>
                <span
                  aria-hidden
                  className="grid size-11 shrink-0 place-items-center rounded-full border border-rule-strong transition-[background-color,border-color,color,rotate] duration-500 group-hover/link:rotate-45 group-hover/link:border-accent group-hover/link:bg-accent group-hover/link:text-on-accent"
                >
                  <ArrowUpRight size={18} weight="bold" />
                </span>
              </a>
            </Reveal>
          ))}
        </ul>

        <div className="mt-16 flex flex-col gap-3 label text-fg-3 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Gilang Maulana</p>
          <p className="flex flex-wrap gap-x-5">
            <span>{COORDS}</span>
            <LocalTime />
          </p>
          <div className="flex items-center gap-6">
            <Link href="/offline" transitionTypes={["world-in"]} className="hover:text-fg">
              After Hours?
            </Link>
            <a href="#top" className="hover:text-fg">
              Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
