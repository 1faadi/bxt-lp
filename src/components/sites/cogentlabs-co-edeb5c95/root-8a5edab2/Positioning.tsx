import { Reveal } from "./Reveal";
import type { MetricItem } from "./types";

const metrics: MetricItem[] = [
  { value: "50+", label: "Products shipped" },
  { value: "20+", label: "Global clients" },
  { value: "8+", label: "Industries" },
  { value: "95%", label: "Projects delivered on time" },
];

export function Positioning() {
  return (
    <section className="section-pad bg-background" aria-labelledby="positioning-title">
      <div className="shell">
        <Reveal>
          <p className="eyebrow text-muted-foreground">Why BXTrack</p>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-7" delay={80}>
            <h2
              id="positioning-title"
              className="max-w-[780px] text-[42px] font-semibold leading-[1] tracking-[-0.04em] sm:text-[52px] lg:text-[60px]"
            >
              We don’t just build software. We solve business problems.
            </h2>
          </Reveal>

          <Reveal className="lg:col-span-5 lg:pt-2" delay={160}>
            <p className="max-w-[510px] text-[17px] leading-[1.65] text-muted-foreground sm:text-[19px]">
              We pair sharp product judgment with deep engineering expertise to
              find the real constraint, shape the right solution, and build
              technology that creates measurable progress for your business.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid grid-cols-2 border-y border-border lg:mt-28 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <Reveal
              key={metric.label}
              className={`min-h-[184px] py-9 ${
                index % 2 === 1 ? "border-l border-border pl-6" : "pr-6"
              } ${index > 1 ? "border-t border-border lg:border-t-0" : ""} ${
                index > 0 ? "lg:border-l lg:border-border lg:pl-8" : "lg:pr-8"
              }`}
              delay={index === 0 ? 0 : index === 1 ? 80 : index === 2 ? 160 : 240}
            >
              <p className="text-[44px] font-semibold leading-none tracking-[-0.045em] sm:text-[54px] lg:text-[64px]">
                {metric.value}
              </p>
              <p className="mt-5 max-w-[180px] text-[13px] font-medium leading-[1.4] text-muted-foreground sm:text-[14px]">
                {metric.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
