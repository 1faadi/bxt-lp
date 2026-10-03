"use client";

import { useEffect, useRef, useState } from "react";

import { Reveal } from "./Reveal";

const results = [
  { value: 150, suffix: "+", label: "Completed Projects" },
  { value: 10, suffix: "K", label: "Working hours were spent" },
  { value: 50, suffix: "+", label: "Clients we worked with" },
] as const;

function CountUp({ end, suffix, active, delay }: { end: number; suffix: string; active: boolean; delay: number }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setValue(end);
      return;
    }

    let frame = 0;
    let startTime: number | null = null;
    const duration = 1300;
    const timeout = window.setTimeout(() => {
      const tick = (timestamp: number) => {
        startTime ??= timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased = 1 - (1 - progress) ** 3;
        setValue(Math.round(end * eased));

        if (progress < 1) frame = window.requestAnimationFrame(tick);
      };

      frame = window.requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
      window.cancelAnimationFrame(frame);
    };
  }, [active, delay, end]);

  return <>{value}{suffix}</>;
}

export function ClientStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section-pad bg-background" aria-labelledby="results-title">
      <div className="shell">
        <Reveal>
          <h2
            id="results-title"
            className="max-w-[1120px] text-[37px] font-medium leading-[0.98] tracking-[-0.035em] sm:text-[50px] lg:text-[58px]"
          >
            BUILDING SOLUTIONS THAT NOT ONLY LOOK GREAT BUT ALSO DELIVER MEASURABLE RESULTS.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-y-11 sm:grid-cols-3 sm:gap-x-8 lg:mt-16 lg:gap-x-14">
          {results.map((result, index) => (
            <Reveal
              key={result.label}
              delay={index === 0 ? 0 : index === 1 ? 80 : 160}
            >
              <p
                className="text-[72px] font-normal leading-[0.82] tracking-[-0.07em] sm:text-[86px] lg:text-[136px]"
                aria-label={`${result.value}${result.suffix} ${result.label}`}
              >
                <CountUp end={result.value} suffix={result.suffix} active={hasEntered} delay={index * 140} />
              </p>
              <p className="mt-4 text-sm leading-tight text-muted-foreground lg:mt-5 lg:text-base">
                {result.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
