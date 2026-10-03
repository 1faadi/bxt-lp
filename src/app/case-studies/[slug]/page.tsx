import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClosingCta } from "@/components/sites/cogentlabs-co-edeb5c95/root-8a5edab2/ClosingCta";
import { ProductCanvas } from "@/components/sites/cogentlabs-co-edeb5c95/root-8a5edab2/Interior";
import { SiteFooter } from "@/components/sites/cogentlabs-co-edeb5c95/root-8a5edab2/SiteFooter";
import { SiteHeader } from "@/components/sites/cogentlabs-co-edeb5c95/root-8a5edab2/SiteHeader";
import { BxTrackCaseStudy, getBxTrackStudy } from "@/components/sites/cogentlabs-co-edeb5c95/pet-care-petsfirst-25d102cd/BxTrackCaseStudy";

const studies = {
  "atlas-ops": { name: "Atlas Ops", category: "AI / LOGISTICS", headline: "One operational view for a network that never stops moving.", variant: "route" as const, challenge: "Dispatch decisions were spread across calls, spreadsheets, and aging systems. Teams could see pieces of the network, but not the whole operation.", built: "We designed a real-time command center that brings orders, fleet capacity, exceptions, and AI-assisted routing into one calm workflow.", implementation: "A modular event-driven platform joins existing transport systems without forcing a disruptive replacement program.", metrics: [["42%", "Faster dispatch"], ["31%", "Fewer routing exceptions"], ["4.8×", "Faster incident response"]] },
  "meridian-health": { name: "Meridian Health", category: "PRODUCT / HEALTHCARE", headline: "A calmer intake experience for patients and care teams.", variant: "health" as const, challenge: "Patients repeated the same information across channels while clinical teams manually reconciled incomplete records before each visit.", built: "We created a guided intake experience and practitioner workspace that collects the right context once and keeps progress visible.", implementation: "Consent, validation, and clinical integrations were designed into the flow from the first prototype through production.", metrics: [["3×", "Faster clinical intake"], ["46%", "Fewer incomplete forms"], ["92%", "Patient completion rate"]] },
  ledgerly: { name: "Ledgerly", category: "SAAS / FINTECH", headline: "Reconciliation redesigned around the exceptions that matter.", variant: "finance" as const, challenge: "Finance teams were spending each close matching predictable transactions instead of investigating the small set that needed judgment.", built: "We built an exception-first workspace with explainable matching, clear ownership, and an audit trail that makes every decision legible.", implementation: "Rules and machine-assisted matching work together, with human review kept explicit wherever confidence is low.", metrics: [["60%", "Less manual work"], ["2.4×", "Faster month-end close"], ["99.7%", "Matching accuracy"]] },
} as const;

export const dynamicParams = false;
export function generateStaticParams() {
  return [...Object.keys(studies), "paymas", "relay-hq", "growth-office", "ai-route-planner"].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const bxTrackStudy = getBxTrackStudy(slug);
  const study = studies[slug as keyof typeof studies];
  return { title: bxTrackStudy?.name ?? study?.name ?? "Case Study" };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const bxTrackStudy = getBxTrackStudy(slug);
  if (bxTrackStudy) return <main><BxTrackCaseStudy study={bxTrackStudy} /><SiteFooter /></main>;
  const study = studies[slug as keyof typeof studies];
  if (!study) notFound();
  return (
    <main>
      <SiteHeader />
      <section className="pt-44 pb-20 md:pt-52"><div className="shell"><p className="eyebrow mb-8 text-muted-foreground">{study.category}</p><h1 className="display-title max-w-5xl">{study.headline}</h1><p className="mt-10 text-xl text-muted-foreground">{study.name}</p></div></section>
      <div className="shell"><ProductCanvas variant={study.variant} /></div>
      <section className="section-pad"><div className="shell grid gap-16 lg:grid-cols-12"><p className="eyebrow text-muted-foreground lg:col-span-3">THE PROJECT</p><div className="space-y-16 lg:col-span-8 lg:col-start-5">{[["Challenge", study.challenge], ["What we built", study.built], ["Technical implementation", study.implementation]].map(([title, copy]) => <div key={title} className="border-t border-border pt-8"><h2 className="mb-5 text-3xl font-semibold tracking-[-0.03em]">{title}</h2><p className="text-lg leading-relaxed text-muted-foreground">{copy}</p></div>)}</div></div></section>
      <section className="section-pad bg-[#111111] text-[#f4f2ec]"><div className="shell"><p className="eyebrow mb-14 text-white/50">RESULTS</p><div className="grid grid-cols-3 border-y border-white/15">{study.metrics.map(([value, label], index) => <div key={label} className={`py-10 ${index ? "border-l border-white/15 pl-5 md:pl-10" : "pr-5"}`}><p className="text-4xl font-semibold tracking-[-0.04em] md:text-7xl">{value}</p><p className="mt-4 text-xs text-white/55 md:text-sm">{label}</p></div>)}</div></div></section>
      <ClosingCta /><SiteFooter />
    </main>
  );
}
