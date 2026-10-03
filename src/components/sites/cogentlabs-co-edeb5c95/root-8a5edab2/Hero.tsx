import Link from "next/link";

import { ArrowUpRightIcon } from "./icons";
import { Reveal } from "./Reveal";

function OperationsMap() {
  return (
    <div className="relative overflow-hidden rounded-[10px] border border-[#2b2b2b] bg-[#111111] text-[#f4f2ec]">
      <div className="flex h-11 items-center justify-between border-b border-white/15 px-4 sm:px-5">
        <div className="flex items-center gap-2.5">
          <span className="size-1.5 rounded-full bg-[#f47820]" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75">
            Operations system / Live
          </span>
        </div>
        <span className="font-mono text-[10px] text-white/35">DL—0426</span>
      </div>

      <div className="grid min-h-[300px] grid-cols-[48px_1fr] sm:min-h-[350px] sm:grid-cols-[64px_1fr_220px]">
        <div className="flex flex-col items-center gap-5 border-r border-white/10 py-5">
          {[true, false, false, false].map((active, index) => (
            <span
              key={index}
              className={`grid size-6 place-items-center border text-[9px] ${
                active
                  ? "border-[#f47820] bg-[#f47820] text-[#111111]"
                  : "border-white/15 text-white/35"
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          ))}
        </div>

        <div className="relative overflow-hidden p-5 sm:p-7">
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:42px_42px]" />
          <div className="relative flex h-full min-h-[258px] flex-col justify-between">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">Active workflow</p>
                <p className="mt-1.5 text-base font-medium tracking-[-0.02em] sm:text-lg">Order intelligence</p>
              </div>
              <div className="border border-white/15 bg-[#111111] px-2.5 py-1 font-mono text-[9px] text-white/45">
                08:42:19 UTC
              </div>
            </div>

            <div className="relative mx-auto my-8 flex w-full max-w-[580px] items-center justify-between">
              <span className="absolute left-[10%] right-[10%] top-1/2 h-px bg-white/20" />
              <span className="absolute left-[10%] top-1/2 h-px w-[53%] bg-[#f47820]" />
              <div className="relative z-10 flex flex-col items-center gap-2 motion-safe:animate-bounce [animation-duration:9s]">
                <span className="grid size-10 place-items-center border border-white/25 bg-[#111111] font-mono text-[9px]">API</span>
                <span className="text-[9px] text-white/40">INGEST</span>
              </div>
              <div className="relative z-10 flex flex-col items-center gap-2 motion-safe:animate-bounce [animation-duration:11s]">
                <span className="grid size-12 rotate-45 place-items-center bg-[#f47820] text-[#111111] shadow-[0_0_0_6px_rgba(244,120,32,0.14)]">
                  <span className="-rotate-45 font-mono text-[9px] font-bold">AI</span>
                </span>
                <span className="mt-1 text-[9px] text-white/60">DECIDE</span>
              </div>
              <div className="relative z-10 flex flex-col items-center gap-2 motion-safe:animate-bounce [animation-duration:13s]">
                <span className="grid size-10 place-items-center border border-white/25 bg-[#111111] font-mono text-[9px]">ERP</span>
                <span className="text-[9px] text-white/40">ACT</span>
              </div>
            </div>

            <div className="grid grid-cols-3 border-y border-white/10 bg-[#111111]/80">
              {[
                ["1,482", "Events"],
                ["96.4%", "Automated"],
                ["1.8s", "Latency"],
              ].map(([value, label], index) => (
                <div
                  key={label}
                  className={`py-3 text-center ${index === 0 ? "" : "border-l border-white/10"}`}
                >
                  <p className="font-mono text-sm text-white/85 sm:text-base">{value}</p>
                  <p className="mt-1 text-[8px] uppercase tracking-[0.14em] text-white/35">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="hidden border-l border-white/10 p-5 sm:block">
          <p className="text-[9px] uppercase tracking-[0.16em] text-white/35">Decision log</p>
          <div className="mt-6 space-y-5">
            {[
              ["08:42", "Stock verified", "Passed"],
              ["08:41", "Route optimized", "Updated"],
              ["08:39", "Risk evaluated", "0.04"],
              ["08:38", "Order classified", "Priority"],
            ].map(([time, event, state], index) => (
              <div key={event} className="relative border-l border-white/15 pl-4">
                <span
                  className={`absolute -left-1 top-0.5 size-2 rounded-full ${
                    index === 0 ? "bg-[#f47820]" : "bg-[#545454]"
                  }`}
                />
                <p className="font-mono text-[9px] text-white/30">{time}</p>
                <p className="mt-1 text-xs text-white/75">{event}</p>
                <p className="mt-0.5 text-[9px] uppercase tracking-wider text-white/35">{state}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="min-h-[820px] overflow-hidden pb-[72px] pt-44 sm:pt-44">
      <div className="shell">
        <div className="grid grid-cols-1 gap-x-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-12">
            <p className="eyebrow text-[#686660]">AI &amp; SOFTWARE DEVELOPMENT</p>
          </Reveal>

          <Reveal className="mt-7 lg:col-span-11" delay={80}>
            <h1 className="max-w-[1080px] text-[46px] font-[650] leading-[0.96] tracking-[-0.04em] sm:text-[64px] lg:text-[88px]">
              We build digital products that move businesses forward.
            </h1>
          </Reveal>

          <Reveal className="mt-8 lg:col-span-7 lg:col-start-6 lg:mt-10" delay={160}>
            <p className="max-w-[620px] text-[17px] leading-[1.55] text-[#686660] sm:text-[19px]">
              We design and build AI-powered products, SaaS platforms, mobile apps, and complex digital systems for ambitious businesses.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link
                href="#contact"
                className="group flex h-12 items-center gap-3 bg-[#111111] px-5 text-sm font-semibold text-[#f4f2ec] transition-colors hover:bg-[#f47820] hover:text-[#111111]"
              >
                Start a Project
                <ArrowUpRightIcon className="arrow-shift size-4" />
              </Link>
              <Link
                href="/case-studies"
                className="link-line group flex items-center gap-2 text-sm font-semibold"
              >
                View Our Work
                <ArrowUpRightIcon className="arrow-shift size-4" />
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-16 sm:mt-20" delay={240}>
          <OperationsMap />
        </Reveal>
      </div>
    </section>
  );
}
