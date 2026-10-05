import type { Metadata } from "next";
import { ClosingCta } from "@/components/sites/cogentlabs-co-edeb5c95/root-8a5edab2/ClosingCta";
import { InteriorHero } from "@/components/sites/cogentlabs-co-edeb5c95/root-8a5edab2/Interior";
import { Reveal } from "@/components/sites/cogentlabs-co-edeb5c95/root-8a5edab2/Reveal";
import { SiteFooter } from "@/components/sites/cogentlabs-co-edeb5c95/root-8a5edab2/SiteFooter";
import { SiteHeader } from "@/components/sites/cogentlabs-co-edeb5c95/root-8a5edab2/SiteHeader";

export const metadata: Metadata = { title: "About Us" };

const values = [
  ["01", "Solve the real problem.", "We keep asking why until the work connects to a meaningful business outcome."],
  ["02", "Keep complexity invisible.", "The system can be sophisticated. The experience should feel clear."],
  ["03", "Ship, learn, improve.", "Momentum creates evidence. Evidence makes the product better."],
  ["04", "Measure outcomes.", "We define success before delivery and keep it visible after launch."],
] as const;

export default function AboutPage() {
  return (
    <main>
      <SiteHeader />
      <InteriorHero eyebrow="ABOUT US" title="We build AI systems that do real work." intro="BXTrack is a senior AI and engineering studio building agents, automation and AI-powered products for growing businesses." />
      <section className="section-pad">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-12"><p className="eyebrow text-muted-foreground">OUR STORY</p></Reveal>
          <Reveal className="lg:col-span-12" delay={80}>
            <h2 className="section-title mb-10">Built for the space between an important idea and a dependable product.</h2>
            <div className="grid gap-7 text-lg leading-relaxed text-muted-foreground md:grid-cols-2">
              <p>We built BXTrack after seeing strong ideas get diluted by fragmented teams and unnecessary process. Strategy lived in one room, design in another, and engineering arrived after the important decisions were already made.</p>
              <p>Our studio keeps those disciplines together. The same people who shape the product stay close through launch, bringing context, care, and technical judgment to every stage.</p>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section-pad bg-secondary">
        <div className="shell">
          <p className="eyebrow mb-14 text-muted-foreground">OUR VALUES</p>
          <div className="grid border-t border-border md:grid-cols-2">
            {values.map(([number, title, copy], index) => (
              <Reveal key={title} delay={(index % 2) * 80 as 0 | 80} className="border-b border-border py-12 md:pr-12 md:odd:border-r md:even:pl-12">
                <p className="eyebrow mb-10 text-muted-foreground">{number}</p>
                <h2 className="mb-4 text-3xl font-semibold tracking-[-0.03em]">{title}</h2>
                <p className="max-w-md leading-relaxed text-muted-foreground">{copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad">
        <div className="shell grid grid-cols-2 gap-y-12 md:grid-cols-4">
          {[["8+", "Years operating"], ["50+", "Products shipped"], ["12", "Countries served"], ["24", "Senior specialists"]].map(([value, label]) => (
            <Reveal key={label} className="border-l border-border pl-6"><p className="mb-3 text-5xl font-semibold tracking-[-0.04em] md:text-6xl">{value}</p><p className="text-sm text-muted-foreground">{label}</p></Reveal>
          ))}
        </div>
      </section>
      <ClosingCta />
      <SiteFooter />
    </main>
  );
}
