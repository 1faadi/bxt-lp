import Link from "next/link";
import { ArrowUpRightIcon } from "./icons";
import { Reveal } from "./Reveal";

export function InteriorHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return (
    <section className="border-b border-border pt-44 pb-24 md:pt-52 md:pb-32">
      <div className="shell grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-10">
          <p className="eyebrow mb-8 text-muted-foreground">{eyebrow}</p>
          <h1 className="display-title max-w-5xl">{title}</h1>
        </Reveal>
        <Reveal className="lg:col-span-5 lg:col-start-8" delay={80}>
          <p className="text-lg leading-[1.6] text-muted-foreground md:text-xl">{intro}</p>
        </Reveal>
      </div>
    </section>
  );
}

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-3 text-sm font-semibold">
      {children}
      <ArrowUpRightIcon className="arrow-shift size-5" />
    </Link>
  );
}

export function ProductCanvas({ variant }: { variant: "route" | "health" | "finance" | "signal" }) {
  const tone = variant === "health" ? "bg-[#dfe4dc]" : variant === "finance" ? "bg-[#dfd9ce]" : variant === "signal" ? "bg-[#d9dedc]" : "bg-[#e4ded2]";
  return (
    <div className={`relative aspect-[4/3] overflow-hidden rounded-[10px] border border-black/10 ${tone}`}>
      <div className="absolute inset-x-[8%] top-[10%] bottom-0 rounded-t-lg border border-black/15 bg-[#f8f7f3]">
        <div className="flex h-10 items-center gap-2 border-b border-black/10 px-4">
          <span className="size-2 rounded-full bg-[#f47820]" />
          <span className="h-1.5 w-20 bg-black/15" />
        </div>
        <div className="grid h-[calc(100%-2.5rem)] grid-cols-[28%_1fr]">
          <div className="border-r border-black/10 p-4">
            <div className="mb-6 h-2 w-16 bg-black/70" />
            <div className="space-y-3">
              <div className="h-1.5 w-full bg-black/10" />
              <div className="h-1.5 w-4/5 bg-black/10" />
              <div className="h-1.5 w-3/5 bg-black/10" />
            </div>
          </div>
          <div className="p-5">
            <div className="mb-5 grid grid-cols-3 gap-3">
              <div className="h-14 border border-black/10 bg-white" />
              <div className="h-14 border border-black/10 bg-white" />
              <div className="h-14 border border-black/10 bg-white" />
            </div>
            <div className="relative h-28 border border-black/10 bg-white p-4">
              <div className="absolute right-4 bottom-4 left-4 flex items-end gap-2">
                {["h-[42%]", "h-[70%]", "h-1/2", "h-[88%]", "h-[64%]", "h-[94%]", "h-[74%]"].map((heightClass, index) => (
                  <span key={index} className={`flex-1 bg-black/15 ${heightClass}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
