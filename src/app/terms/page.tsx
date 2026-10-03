import type { Metadata } from "next";
import { SiteFooter } from "@/components/sites/cogentlabs-co-edeb5c95/root-8a5edab2/SiteFooter";
import { SiteHeader } from "@/components/sites/cogentlabs-co-edeb5c95/root-8a5edab2/SiteHeader";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <main>
      <SiteHeader />
      <article className="shell min-h-[70vh] max-w-3xl pt-44 pb-28">
        <p className="eyebrow mb-8 text-muted-foreground">LEGAL</p>
        <h1 className="section-title mb-10">Terms</h1>
        <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>This website presents general information about BXTrack and our services. Specific project terms, deliverables, ownership, and warranties are defined in each signed engagement agreement.</p>
          <p>Questions about these terms can be sent to info@bxtrack.com.</p>
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
