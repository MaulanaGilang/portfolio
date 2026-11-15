import { Database } from "@phosphor-icons/react/dist/ssr";
import { skills } from "@/data/content";
import { Reveal } from "../ui/Reveal";

/**
 * The stack on a sand field: one row per group, the group named on the left
 * and its tools set as logo + name on the right. No chips, no cards.
 */
export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative bg-sand py-[clamp(72px,8vw,128px)]">
      <div className="container-site">
        <h2 id="skills-title" className="heading">
          Skills
        </h2>
        <p className="mt-5 max-w-[48ch] text-[17px] leading-relaxed text-fg-2">
          The stack I use to move data from source to warehouse to dashboard.
        </p>

        <div className="mt-10 border-t border-rule-strong md:mt-14">
          {skills.map((g, gi) => (
            <Reveal key={g.group} delay={gi * 0.04} className="grid gap-4 border-b border-line py-6 md:grid-cols-12 md:gap-8 md:py-8">
              <h3 className="text-[19px] font-medium tracking-[-0.01em] md:col-span-3">{g.group}</h3>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 md:col-span-9 lg:grid-cols-4">
                {g.items.map((s) => (
                  <li key={s.name} className="flex items-center gap-3">
                    {s.level ? (
                      <>
                        <span className="text-[16px]">{s.name}</span>
                        <span className="label text-fg-2">{s.level}</span>
                      </>
                    ) : (
                      <>
                        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface text-fg">
                          {s.icon ? (
                            <span
                              aria-hidden
                              className="logo-mask size-4"
                              style={{ maskImage: `url(/skills/${s.icon}.svg)`, WebkitMaskImage: `url(/skills/${s.icon}.svg)` }}
                            />
                          ) : (
                            <Database aria-hidden size={16} weight="bold" />
                          )}
                        </span>
                        <span className="text-[16px]">{s.name}</span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
