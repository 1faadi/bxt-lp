import { Reveal } from "./Reveal";

const steps = [
  {
    number: "01",
    title: "Discover",
    body: "We align on the business problem, users, constraints, and the outcome worth measuring.",
  },
  {
    number: "02",
    title: "Design",
    body: "We turn the strategy into flows, prototypes, and a system your team can see and test.",
  },
  {
    number: "03",
    title: "Build",
    body: "Senior product engineers ship in focused increments with quality visible throughout.",
  },
  {
    number: "04",
    title: "Scale",
    body: "We launch, learn from real usage, and strengthen the product as demand grows.",
  },
] as const;

const delays = [0, 80, 160, 240] as const;

export function Process() {
  return (
    <section className="bg-[#f8f5ef] px-5 py-24 text-[#171715] sm:px-8 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <p className="mb-6 text-[11px] font-medium tracking-[0.22em] text-[#716e68]">
            HOW WE WORK
          </p>
          <h2 className="text-[42px] leading-none font-medium tracking-[-0.045em] sm:text-5xl lg:text-[60px]">
            From idea to production.
          </h2>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Reveal key={step.number} delay={delays[index]}>
              <article className="relative border-t border-black/20 py-8 md:min-h-80 md:pr-8 lg:min-h-96 lg:pr-10">
                <span className="absolute -top-1.5 left-0 size-3 rounded-full border border-black/30 bg-[#f8f5ef]" />
                <p className="text-xs tracking-[0.16em] text-[#8a867e]">
                  {step.number}
                </p>
                <h3 className="mt-12 text-2xl leading-tight font-medium tracking-[-0.025em]">
                  {step.title}
                </h3>
                <p className="mt-5 max-w-[19rem] text-base leading-7 text-[#68655f]">
                  {step.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
