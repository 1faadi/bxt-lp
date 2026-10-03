import { ArrowUpRightIcon } from "./icons";
import { Reveal } from "./Reveal";

export function ClosingCta() {
  return (
    <section
      id="contact"
      className="bg-[#111111] py-[88px] text-[#f5f1e9] lg:py-[152px]"
    >
      <div className="shell">
        <Reveal>
          <p className="mb-6 text-[11px] font-medium tracking-[0.22em] text-white/55">
            START A PROJECT
          </p>
          <h2 className="max-w-5xl text-[46px] leading-[0.98] font-medium tracking-[-0.05em] sm:text-6xl lg:text-[72px]">
            Have something ambitious in mind?
          </h2>
        </Reveal>

        <Reveal className="mt-12 flex flex-col items-start gap-10 sm:mt-16 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-xl text-lg leading-8 text-white/60">
            Tell us what you’re building and we’ll help turn it into a product
            people actually want to use.
          </p>
          <a
            href="mailto:info@bxtrack.com"
            className="group inline-flex min-h-14 items-center gap-8 bg-[#f47820] px-6 py-4 text-sm font-semibold text-[#111111] transition-colors hover:bg-[#ff964c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f47820]"
          >
            Start a Conversation
            <ArrowUpRightIcon className="size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
