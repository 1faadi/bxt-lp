import Link from "next/link";
import { ArrowUpRightIcon } from "../root-8a5edab2/icons";
import { Reveal } from "../root-8a5edab2/Reveal";
import { SiteHeader } from "../root-8a5edab2/SiteHeader";
import { ProjectVisual } from "../pet-care-petsfirst-25d102cd/BxTrackCaseStudy";

const studies = [
  {
    category: "SAAS / EVENTS",
    title: "Sonik",
    client: "Sonik.fm",
    result: "EN / ES",
    outcome: "BOOKING, DASHBOARDS & PAYOUTS",
    slug: "sonik",
    visual: "sonik" as const,
  },
  {
    category: "MOBILE / QR",
    title: "Qubio",
    client: "Qubio",
    result: "2 stores",
    outcome: "DYNAMIC QR CODES ON IOS & ANDROID",
    slug: "qubio",
    visual: "qubio" as const,
  },
  {
    category: "ENERGY / CORPORATE",
    title: "Attock Petroleum",
    client: "Attock Petroleum Limited",
    result: "1 site",
    outcome: "PRODUCTS, STATIONS & INVESTORS",
    slug: "attock-petroleum",
    visual: "attock-petroleum" as const,
  },
  {
    category: "SAAS / BUG TRACKING",
    title: "Lucidmark",
    client: "Lucidmark",
    result: "50%",
    outcome: "FASTER BUG REPORTING",
    slug: "lucidmark",
    visual: "lucidmark" as const,
  },
  {
    category: "AI RESEARCH",
    title: "PayMAS",
    client: "BXTrack Research",
    result: "10 flows",
    outcome: "ADVERSARIAL PAYMENT-AGENT EVALS",
    slug: "paymas",
    visual: "paymas" as const,
  },
  {
    category: "MULTI-AGENT PLATFORM",
    title: "Relay HQ",
    client: "BXTrack",
    result: "7 agents",
    outcome: "ONE LEAD, ONE WORKSPACE, REAL RUNS",
    slug: "relay-hq",
    visual: "relay-hq" as const,
  },
  {
    category: "AI OPERATIONS",
    title: "Growth Office",
    client: "Traceo",
    result: "AI team",
    outcome: "STANDUPS, SEO AUDITS & DRAFTS",
    slug: "growth-office",
    visual: "growth-office" as const,
  },
  {
    category: "OPTIMISATION + LLM",
    title: "AI Route Planner",
    client: "Field-service CRM",
    result: "1 plan",
    outcome: "SOLVED, EXPLAINED & APPROVED",
    slug: "ai-route-planner",
    visual: "route-planner" as const,
  },
] as const;

export function CaseStudiesCatalog() {
  return (
    <>
      <SiteHeader tone="dark" />
      <section className="bg-[#1a1a1a] pt-36 pb-20 text-white sm:pt-40 sm:pb-24">
        <div className="shell">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[.24em] text-[#f47820]">CASE STUDIES</p>
            <h1 className="mt-5 text-[44px] font-semibold leading-none tracking-[-.045em] sm:text-[58px] lg:text-[64px]">
              Results That Speak
            </h1>
          </Reveal>
        </div>
      </section>
      <section className="bg-white py-14 text-[#1a1a1a] sm:py-16 lg:py-20">
        <div className="shell">
          <Reveal>
            <div className="flex items-center justify-between border-b border-[#e5e5e5] pb-6">
              <p className="font-mono text-[10px] tracking-[.16em] text-[#62626a]">SELECTED BXTRACK BUILDS</p>
              <p className="font-mono text-[10px] tracking-[.16em] text-[#62626a]">0{studies.length} CASE STUDIES</p>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {studies.map((study, index) => (
              <Reveal key={study.slug} delay={index ? 80 : 0}>
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-none border border-[#ececee] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_28px_rgba(26,26,26,.09)]"
                >
                  <div className="relative aspect-[1.6/1] overflow-hidden bg-[#1a1a1a]">
                    <ProjectVisual name={study.visual} />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="font-mono text-[10px] leading-[1.45] tracking-[.14em] text-[#f47820]">
                      {study.category}
                    </p>
                    <h2 className="mt-3 text-[22px] font-semibold leading-[1.25] tracking-[-.025em]">
                      {study.title}
                    </h2>
                    <p className="mt-1.5 text-sm text-[#7a7a82]">{study.client}</p>
                    <div className="mt-auto flex items-end justify-between gap-4 border-t border-[#ececee] pt-6">
                      <p className="max-w-[220px] font-mono text-[10px] leading-[1.45] tracking-[.1em] text-[#62626a]">
                        <span className="mr-1 text-base font-medium tracking-[-.04em] text-[#1a1a1a]">
                          {study.result}
                        </span>
                        {study.outcome}
                      </p>
                      <span className="shrink-0 text-sm font-semibold">
                        Read <ArrowUpRightIcon className="inline size-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
