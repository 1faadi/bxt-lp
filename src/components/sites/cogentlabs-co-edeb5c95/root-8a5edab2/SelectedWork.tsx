import Link from "next/link";

import { ArrowUpRightIcon } from "./icons";
import { Reveal } from "./Reveal";
import type { ProjectItem } from "./types";

const projects: ProjectItem[] = [
  {
    slug: "atlas-ops",
    name: "Atlas Ops",
    industry: "Logistics",
    description:
      "A dispatch command center that turns a fragmented network into one clear operational view.",
    services: "Product strategy, AI automation, platform engineering",
    outcome: "42% faster dispatch",
    visual: "atlas",
  },
  {
    slug: "meridian-health",
    name: "Meridian Health",
    industry: "Healthcare",
    description:
      "A calmer clinical intake system built around patients and practitioners.",
    services: "Product design, web application",
    outcome: "3× faster clinical intake",
    visual: "meridian",
  },
  {
    slug: "ledgerly",
    name: "Ledgerly",
    industry: "Fintech",
    description:
      "An exception-first reconciliation workspace for modern finance teams.",
    services: "SaaS development, data systems",
    outcome: "60% less reconciliation work",
    visual: "ledgerly",
  },
];

const dispatchBars = [
  "h-[38%]",
  "h-[58%]",
  "h-[45%]",
  "h-[76%]",
  "h-[61%]",
  "h-[87%]",
  "h-[72%]",
  "h-[96%]",
  "h-[82%]",
];

function AtlasVisual() {
  return (
    <div className="flex h-full min-h-[280px] bg-[#18211e] p-5 text-[#eff4eb] sm:p-8 lg:min-h-[430px] lg:p-11">
      <div className="flex w-[18%] flex-col justify-between border-r border-white/15 pr-4">
        <div className="size-7 rounded-full border-[7px] border-[#87e64b]" />
        <div className="space-y-3 text-[9px] uppercase tracking-[0.14em] text-white/45">
          <p className="text-white">Overview</p><p>Routes</p><p>Fleet</p><p>Alerts</p>
        </div>
        <p className="text-[9px] text-white/35">Atlas / 04</p>
      </div>
      <div className="flex flex-1 flex-col pl-5 sm:pl-8">
        <div className="flex items-start justify-between border-b border-white/15 pb-5">
          <div><p className="text-[9px] uppercase tracking-[0.16em] text-white/40">Live network</p><p className="mt-2 text-xl font-medium sm:text-3xl">Good morning, Alex.</p></div>
          <div className="rounded-full border border-white/20 px-3 py-1 text-[9px] text-white/60">14:32 UTC</div>
        </div>
        <div className="grid flex-1 grid-cols-3 gap-3 py-5">
          <div className="col-span-2 flex flex-col justify-between rounded-md bg-[#27332e] p-4 sm:p-6">
            <p className="text-[10px] text-white/45">Active dispatches</p>
            <div className="flex items-end justify-between"><p className="text-4xl font-medium sm:text-6xl">184</p><p className="text-[10px] text-[#87e64b]">+12.4%</p></div>
            <div className="flex h-20 items-end gap-1.5 border-b border-white/10">
              {dispatchBars.map((heightClass) => (
                <span key={heightClass} className={`flex-1 bg-[#87e64b] ${heightClass}`} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex-1 rounded-md bg-[#eef2e9] p-3 text-[#18211e] sm:p-5"><p className="text-[9px] uppercase tracking-wider text-black/45">On time</p><p className="mt-4 text-2xl font-semibold sm:text-4xl">94%</p></div>
            <div className="flex-1 rounded-md border border-white/15 p-3 sm:p-5"><p className="text-[9px] text-white/45">Critical alerts</p><p className="mt-4 text-2xl font-semibold text-[#87e64b] sm:text-4xl">03</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MeridianVisual() {
  return (
    <div className="flex h-full min-h-[330px] bg-[#c9d9d0] p-5 text-[#20342e] sm:p-8 lg:min-h-[420px]">
      <div className="mx-auto flex w-full max-w-[560px] flex-col rounded-[8px] bg-[#f6f4ee] p-5 sm:p-7">
        <div className="flex items-center justify-between border-b border-[#cdd4cf] pb-4">
          <p className="text-[11px] font-semibold tracking-[-0.02em]">MERIDIAN</p><div className="size-7 rounded-full bg-[#557b6e]" />
        </div>
        <div className="grid flex-1 gap-6 pt-7 sm:grid-cols-[1fr_0.85fr]">
          <div><p className="text-[10px] uppercase tracking-[0.15em] text-[#70817a]">Patient intake</p><p className="mt-3 text-2xl font-medium leading-tight sm:text-3xl">Let’s get you ready for your visit.</p><div className="mt-8 space-y-4"><div className="h-2 w-full rounded-full bg-[#dbe2dd]"><div className="h-2 w-3/5 rounded-full bg-[#557b6e]" /></div><p className="text-[10px] text-[#70817a]">Step 3 of 5 · Medical history</p></div></div>
          <div className="space-y-3 rounded-md border border-[#d7ddd8] p-4"><p className="text-[10px] text-[#70817a]">Today’s appointment</p><p className="text-lg font-medium">Dr. Maya Chen</p><p className="text-[11px] leading-relaxed text-[#70817a]">Thursday, 10:30 AM<br />General consultation</p><div className="mt-5 rounded-full bg-[#dfe9e3] px-3 py-2 text-center text-[10px] font-medium">Details confirmed</div></div>
        </div>
      </div>
    </div>
  );
}

function LedgerlyVisual() {
  return (
    <div className="flex h-full min-h-[330px] flex-col bg-[#d9d6c9] p-5 text-[#27261f] sm:p-8 lg:min-h-[420px]">
      <div className="flex items-center justify-between border-b border-black/15 pb-4"><p className="text-[11px] font-semibold">LEDGERLY</p><p className="text-[9px] uppercase tracking-[0.13em] text-black/45">Reconciliation / October</p></div>
      <div className="grid flex-1 grid-cols-[0.7fr_1.3fr] gap-4 pt-5">
        <div className="flex flex-col justify-between rounded-md bg-[#262720] p-4 text-[#f2f0e8] sm:p-5"><div><p className="text-[9px] uppercase tracking-wider text-white/45">Needs review</p><p className="mt-3 text-4xl font-medium sm:text-5xl">27</p></div><div><p className="text-[10px] text-white/45">Total exposure</p><p className="mt-1 text-lg">$84,210</p></div></div>
        <div className="rounded-md bg-[#f1efe7] p-4 sm:p-5"><div className="flex justify-between text-[9px] uppercase tracking-wider text-black/40"><p>Exceptions</p><p>Amount</p></div><div className="mt-4 space-y-3">{[["Stripe settlement", "$12,840"], ["Vendor invoice #394", "$8,120"], ["Bank fee variance", "$2,460"], ["FX adjustment", "$1,905"]].map(([name, amount], index) => <div key={name} className="flex items-center justify-between border-t border-black/10 pt-3 text-[10px] sm:text-xs"><div className="flex items-center gap-2"><span className={`size-2 rounded-full ${index < 2 ? "bg-[#87e64b]" : "bg-[#111111]/25"}`} />{name}</div><p className="font-medium">{amount}</p></div>)}</div></div>
      </div>
    </div>
  );
}

function ProjectVisual({ visual }: Pick<ProjectItem, "visual">) {
  if (visual === "atlas") return <AtlasVisual />;
  if (visual === "meridian") return <MeridianVisual />;
  return <LedgerlyVisual />;
}

function ProjectCard({ project, featured = false }: { project: ProjectItem; featured?: boolean }) {
  return (
    <article className="group">
      <div className={`overflow-hidden rounded-[10px] ${featured ? "aspect-[16/8]" : "aspect-[4/3]"}`}>
        <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.02]">
          <ProjectVisual visual={project.visual} />
        </div>
      </div>
      <div className={`grid gap-5 pt-7 ${featured ? "md:grid-cols-12" : ""}`}>
        <div className={featured ? "md:col-span-5" : ""}>
          <p className="eyebrow text-muted-foreground">{project.industry}</p>
          <h3 className="mt-3 text-[28px] font-semibold tracking-[-0.035em] sm:text-[34px]">{project.name}</h3>
        </div>
        <div className={featured ? "md:col-span-5" : ""}>
          <p className="max-w-[580px] text-[16px] leading-[1.55] text-muted-foreground sm:text-[17px]">{project.description}</p>
          <p className="mt-4 text-[12px] leading-relaxed text-muted-foreground">{project.services}</p>
        </div>
        <div className={`flex flex-col gap-4 ${featured ? "md:col-span-2 md:items-end" : "mt-1 sm:flex-row sm:items-end sm:justify-between"}`}>
          <p className="text-[13px] font-semibold">{project.outcome}</p>
          <Link href={`/case-studies/${project.slug}`} className="flex w-fit items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em]">
            View Case Study <ArrowUpRightIcon className="arrow-shift size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function SelectedWork() {
  return (
    <section id="work" className="section-pad bg-[#eceae4]" aria-labelledby="selected-work-title">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-4"><p className="eyebrow text-muted-foreground">Selected work</p></Reveal>
          <Reveal className="lg:col-span-8" delay={80}><h2 id="selected-work-title" className="section-title max-w-[720px]">Products we’ve helped bring to life.</h2></Reveal>
        </div>
        <div className="mt-20 lg:mt-24">
          <Reveal><ProjectCard project={projects[0]} featured /></Reveal>
          <div className="mt-20 grid gap-x-8 gap-y-20 min-[760px]:grid-cols-2 lg:mt-28">
            <Reveal><ProjectCard project={projects[1]} /></Reveal>
            <Reveal delay={80}><ProjectCard project={projects[2]} /></Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
