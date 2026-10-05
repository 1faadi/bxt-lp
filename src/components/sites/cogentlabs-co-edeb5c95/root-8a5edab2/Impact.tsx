import { Reveal } from "./Reveal";

interface ImpactMetric {
  value: string;
  suffix?: string;
  detail: string;
  description: string;
  source: string;
}

const metrics: ImpactMetric[] = [
  {
    value: "150+",
    detail: "Completed projects",
    description: "From first brief to launch, we make the work feel clear, coordinated, and built to last.",
    source: "Across BXTrack engagements",
  },
  {
    value: "10K",
    suffix: " hrs",
    detail: "Focused build time",
    description: "A depth of hands-on delivery across the strategy, design, engineering, and refinement that matter.",
    source: "Delivery experience to date",
  },
  {
    value: "50+",
    detail: "Teams supported",
    description: "Flexible collaboration that meets teams where they are and helps them make meaningful progress.",
    source: "Clients we have worked with",
  },
  {
    value: "3",
    detail: "Connected capabilities",
    description: "Web, AI, and app development working together so your technology feels joined up from day one.",
    source: "One integrated partner",
  },
];

function TopographicLines() {
  const paths = [
    "M-90 75 C105 15 230 145 372 72 S621 18 772 86 S1030 146 1176 71 S1412 9 1538 62",
    "M-90 104 C105 44 230 174 372 101 S621 47 772 115 S1030 175 1176 100 S1412 38 1538 91",
    "M-90 133 C105 73 230 203 372 130 S621 76 772 144 S1030 204 1176 129 S1412 67 1538 120",
    "M-90 162 C105 102 230 232 372 159 S621 105 772 173 S1030 233 1176 158 S1412 96 1538 149",
    "M-90 191 C105 131 230 261 372 188 S621 134 772 202 S1030 262 1176 187 S1412 125 1538 178",
    "M-90 475 C102 410 232 552 376 471 S611 408 773 490 S1027 550 1181 467 S1402 404 1538 473",
    "M-90 505 C102 440 232 582 376 501 S611 438 773 520 S1027 580 1181 497 S1402 434 1538 503",
    "M-90 535 C102 470 232 612 376 531 S611 468 773 550 S1027 610 1181 527 S1402 464 1538 533",
    "M-90 565 C102 500 232 642 376 561 S611 498 773 580 S1027 640 1181 557 S1402 494 1538 563",
    "M-90 595 C102 530 232 672 376 591 S611 528 773 610 S1027 670 1181 587 S1402 524 1538 593",
  ];

  return (
    <svg className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-40" viewBox="0 0 1440 700" preserveAspectRatio="none" aria-hidden="true">
      {paths.map((path) => <path key={path} d={path} fill="none" stroke="#8e8e8e" strokeWidth="2" />)}
    </svg>
  );
}

export function Impact() {
  return (
    <section className="relative isolate overflow-hidden bg-[#050505] py-24 text-[#f8f7f3] lg:py-32" aria-labelledby="impact-title">
      <TopographicLines />
      <div className="shell relative z-10">
        <Reveal>
          <p className="eyebrow text-white/50">What our clients gain</p>
          <h2 id="impact-title" className="mt-5 max-w-3xl text-[42px] font-medium leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-[60px]">
            Progress you can point to.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-[1.55] text-white/55 sm:text-lg">
            The numbers tell part of the story. The real value is technology that gives your team more momentum and less friction.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <Reveal key={metric.detail} delay={index === 0 ? 0 : index === 1 ? 80 : index === 2 ? 160 : 240}>
              <article className="flex min-h-[292px] flex-col rounded-[14px] border border-white/10 bg-[#262626] p-7 sm:p-8">
                <div className="flex items-end gap-1">
                  <p className="text-[56px] font-medium leading-[0.82] tracking-[-0.07em] text-[#f47820]">{metric.value}</p>
                  {metric.suffix && <p className="mb-1.5 text-sm text-white/40">{metric.suffix}</p>}
                </div>
                <p className="mt-5 text-sm font-semibold text-white/90">{metric.detail}</p>
                <p className="mt-3 text-sm leading-[1.55] text-white/55">{metric.description}</p>
                <p className="mt-auto pt-7 font-mono text-[10px] uppercase tracking-[0.14em] text-white/35">{metric.source}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
