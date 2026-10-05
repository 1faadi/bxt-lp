import Link from "next/link";

import { AgentWorkflowAnimation } from "@/components/hero/AgentWorkflowAnimation";

import { CalBookingButton } from "./CalBookingButton";
import { ArrowUpRightIcon } from "./icons";
import { Reveal } from "./Reveal";

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
              We build AI agents, automations and AI-powered products that do real work.
            </h1>
          </Reveal>

          <Reveal className="mt-8 lg:col-span-5 lg:mt-10" delay={160}>
            <p className="max-w-[1080px] text-[17px] leading-[1.55] text-[#686660] sm:text-[19px]">
              From AI agents and workflow automation to AI-first SaaS, we design, build and run AI systems that cut manual work and plug into your existing tools.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <CalBookingButton className="group flex h-12 items-center gap-3 bg-[#111111] px-5 text-sm font-semibold text-[#f4f2ec] transition-colors hover:bg-[#f47820] hover:text-[#111111]">
                Book an AI Audit
                <ArrowUpRightIcon className="arrow-shift size-4" />
              </CalBookingButton>
              <Link
                href="/case-studies"
                className="link-line group flex items-center gap-2 text-sm font-semibold"
              >
                See AI Case Studies
                <ArrowUpRightIcon className="arrow-shift size-4" />
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-16 sm:mt-20" delay={240}>
          <AgentWorkflowAnimation />
        </Reveal>
      </div>
    </section>
  );
}
