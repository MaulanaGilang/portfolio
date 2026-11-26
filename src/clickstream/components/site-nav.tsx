import Link from "next/link";
import { ArrowLeft, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/clickstream/lib/site";

export function SiteNav({ preview }: { preview: boolean }) {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 px-4 sm:px-8"
      >
        <a href="#top" className="font-cs-mono text-sm text-cs-ink">
          clickstream<span className="text-cs-accent">/</span>funnel
        </a>
        <div className="flex items-center gap-3 sm:gap-5">
          {preview ? (
            <a
              href="#about-data"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-cs-rule-2 px-3 py-1 font-cs-mono text-xs text-cs-ink-2 transition-colors hover:border-cs-ink-3 hover:text-cs-ink"
            >
              <span aria-hidden className="size-1.5 rounded-full bg-cs-data-dup" />
              Preview<span className="hidden sm:inline"> data</span>
            </a>
          ) : null}
          <Link
            href={site.caseStudyUrl}
            className="inline-flex items-center gap-2 whitespace-nowrap text-sm text-cs-ink-2 transition-colors hover:text-cs-ink"
          >
            <ArrowLeft size={16} weight="regular" aria-hidden />
            Case study
          </Link>
          <a
            href={site.repoUrl}
            className="inline-flex items-center gap-2 whitespace-nowrap text-sm text-cs-ink-2 transition-colors hover:text-cs-ink"
          >
            <GithubLogo size={18} weight="regular" aria-hidden />
            <span className="sr-only sm:not-sr-only">Read the code</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
