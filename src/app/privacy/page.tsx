import type { Metadata } from "next";
import { SiteFooter } from "@/components/sites/cogentlabs-co-edeb5c95/root-8a5edab2/SiteFooter";
import { SiteHeader } from "@/components/sites/cogentlabs-co-edeb5c95/root-8a5edab2/SiteHeader";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <main>
      <SiteHeader />
      <article className="shell min-h-[70vh] max-w-3xl pt-44 pb-28">
        <p className="eyebrow mb-8 text-muted-foreground">LEGAL</p>
        <h1 className="section-title mb-10">Privacy</h1>
        <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>BXTrack only collects information you choose to share when you contact us. We use it to respond to your inquiry and manage a potential or active engagement.</p>
          <p>We do not sell personal information. For access, correction, or deletion requests, email info@bxtrack.com.</p>
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
