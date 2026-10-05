import type { Metadata } from "next";
import Image from "next/image";
import { ClosingCta } from "@/components/sites/cogentlabs-co-edeb5c95/root-8a5edab2/ClosingCta";
import { InteriorHero } from "@/components/sites/cogentlabs-co-edeb5c95/root-8a5edab2/Interior";
import { Reveal } from "@/components/sites/cogentlabs-co-edeb5c95/root-8a5edab2/Reveal";
import { SiteFooter } from "@/components/sites/cogentlabs-co-edeb5c95/root-8a5edab2/SiteFooter";
import { SiteHeader } from "@/components/sites/cogentlabs-co-edeb5c95/root-8a5edab2/SiteHeader";

export const metadata: Metadata = { title: "Services" };

const services = [
  ["01", "AI & Automation", "AI agents, RAG systems, workflow automation, LLM integrations, and custom AI applications that reduce operational drag.", "AI Agents · RAG Systems · Workflow Automation · LLM Integrations"],
  ["02", "SaaS Development", "Scalable platforms designed from product architecture through deployment, with the technical foundations to keep evolving.", "Product Architecture · Multi-tenant Systems · Billing · Analytics"],
  ["03", "Web Applications", "High-performance web platforms built for operational complexity, clear workflows, and lasting maintainability.", "Web Platforms · Internal Tools · Portals · Integrations"],
  ["04", "Mobile Applications", "Native-quality mobile experiences for iOS and Android, shaped around real context and everyday use.", "iOS · Android · React Native · Offline-first"],
  ["05", "Product Design", "UX strategy, interface systems, and prototypes that make complex products feel obvious.", "Research · UX Strategy · UI Systems · Prototyping"],
] as const;

export default function ServicesPage() {
  return (
    <main>
      <SiteHeader />
      <InteriorHero eyebrow="SERVICES" title="AI agents and automation, built for real business work." intro="From an early product decision to a production system, we bring strategy, design, and engineering into one senior team." />
      <section className="section-pad">
        <div className="shell">
          {services.map(([number, title, description, capabilities], index) => (
            <Reveal key={title} delay={(index % 4) * 80 as 0 | 80 | 160 | 240} className="grid gap-8 border-t border-border py-16 lg:grid-cols-12">
              <p className="eyebrow text-muted-foreground lg:col-span-1">{number}</p>
              <div className="lg:col-span-5">
                <h2 className="text-4xl font-semibold tracking-[-0.035em] md:text-5xl">{title}</h2>
              </div>
              <div className="lg:col-span-5 lg:col-start-8">
                <p className="mb-8 text-lg leading-relaxed text-muted-foreground">{description}</p>
                <p className="text-sm font-medium leading-7">{capabilities}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="section-pad bg-secondary">
        <div className="shell grid items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <Image
              src="/images/services/dashboard-progress.png"
              alt="Project dashboard showing progress from discovery through launch, active tasks, and a milestone timeline"
              width={1536}
              height={1024}
              className="h-auto w-full"
            />
          </Reveal>
          <Reveal delay={80}>
            <p className="eyebrow mb-7 text-muted-foreground">HOW WE WORK</p>
            <h2 className="section-title mb-10">Small senior teams. Clear milestones. No hidden handoffs.</h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-border pt-8 text-sm font-semibold">
              <span>01 / Discovery</span><span>02 / Design</span><span>03 / Development</span><span>04 / Launch</span><span>05 / Optimization</span>
            </div>
          </Reveal>
        </div>
      </section>
      <ClosingCta />
      <SiteFooter />
    </main>
  );
}
