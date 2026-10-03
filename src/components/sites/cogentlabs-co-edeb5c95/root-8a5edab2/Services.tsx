import Link from "next/link";
import type { ReactNode, SVGProps } from "react";

import { ArrowUpRightIcon } from "./icons";
import { Reveal } from "./Reveal";

interface ServiceCard {
  number: string;
  title: string;
  description: string;
  includes: string;
  for: string;
  action: string;
  Icon: (props: SVGProps<SVGSVGElement>) => ReactNode;
}

function WebIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="3" y="4" width="18" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 8h18M8 12l-2 2 2 2M16 12l2 2-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AiIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="6" y="6" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 12h.01M15 12h.01M12 9v.01M12 15v.01M12 3v3M12 18v3M3 12h3M18 12h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function AppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 5h4M11.5 18.5h1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const services: ServiceCard[] = [
  {
    number: "01",
    title: "Web Development",
    description: "Fast, high-converting websites and web platforms built to give your business a sharper digital edge.",
    includes: "Strategy · UX/UI · Development",
    for: "Teams ready to turn their website into a serious growth channel.",
    action: "Explore web development",
    Icon: WebIcon,
  },
  {
    number: "02",
    title: "AI Solutions",
    description: "Useful AI systems that reduce repetitive work, surface better insights, and fit the way your team already operates.",
    includes: "AI agents · Automation · Integrations",
    for: "Businesses that want practical AI with a measurable business case.",
    action: "Explore AI solutions",
    Icon: AiIcon,
  },
  {
    number: "03",
    title: "App Development",
    description: "Purpose-built mobile and product experiences that make complex workflows feel simple for every user.",
    includes: "Product design · iOS · Android",
    for: "Founders and teams building a product people will return to.",
    action: "Explore app development",
    Icon: AppIcon,
  },
];

export function Services() {
  return (
    <section id="services" className="section-pad bg-background" aria-labelledby="services-title">
      <div className="shell">
        <Reveal>
          <p className="eyebrow text-muted-foreground">What we do</p>
          <h2 id="services-title" className="section-title mt-5 max-w-[740px]">
            Digital products that move your business forward.
          </h2>
          <p className="mt-5 max-w-[580px] text-base leading-[1.55] text-muted-foreground sm:text-lg">
            From a stronger web presence to intelligent systems and mobile products, we build the tools your next stage needs.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:mt-16 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.Icon;

            return (
              <Reveal key={service.number} delay={index === 0 ? 0 : index === 1 ? 80 : 160}>
                <article className="group flex min-h-[492px] flex-col rounded-[18px] border border-border bg-card p-8 transition-all duration-[250ms] hover:-translate-y-1 hover:border-foreground/30 hover:shadow-[0_16px_32px_rgba(17,17,17,0.06)] sm:p-9">
                  <div className="flex items-start justify-between gap-6">
                    <span className="grid size-12 place-items-center rounded-xl bg-secondary text-foreground">
                      <Icon className="size-6" />
                    </span>
                    <span className="font-mono text-xs tracking-[0.1em] text-muted-foreground">{service.number}</span>
                  </div>

                  <h3 className="mt-12 text-[31px] font-semibold leading-[1.02] tracking-[-0.045em]">
                    {service.title}
                  </h3>
                  <p className="mt-5 text-[15px] leading-[1.55] text-muted-foreground">{service.description}</p>
                  <p className="mt-6 text-sm font-medium leading-[1.45]">{service.includes}</p>

                  <div className="mt-auto rounded-xl bg-secondary px-4 py-3.5">
                    <p className="eyebrow text-[10px] text-muted-foreground">Built for</p>
                    <p className="mt-2 text-sm leading-[1.45] text-muted-foreground">{service.for}</p>
                  </div>

                  <Link href="/services" className="mt-4 flex h-12 items-center justify-center gap-2 rounded-lg border border-border text-sm font-semibold transition-colors duration-[200ms] group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
                    {service.action}
                    <ArrowUpRightIcon className="size-4" />
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
