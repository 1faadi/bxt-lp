import { ClientStrip } from "@/components/sites/cogentlabs-co-edeb5c95/root-8a5edab2/ClientStrip";
import { ClientsPartners } from "@/components/sites/cogentlabs-co-edeb5c95/root-8a5edab2/ClientsPartners";
import { ClosingCta } from "@/components/sites/cogentlabs-co-edeb5c95/root-8a5edab2/ClosingCta";
import { Hero } from "@/components/sites/cogentlabs-co-edeb5c95/root-8a5edab2/Hero";
import { Impact } from "@/components/sites/cogentlabs-co-edeb5c95/root-8a5edab2/Impact";
import { Process } from "@/components/sites/cogentlabs-co-edeb5c95/root-8a5edab2/Process";
import { Services } from "@/components/sites/cogentlabs-co-edeb5c95/root-8a5edab2/Services";
import { SiteFooter } from "@/components/sites/cogentlabs-co-edeb5c95/root-8a5edab2/SiteFooter";
import { SiteHeader } from "@/components/sites/cogentlabs-co-edeb5c95/root-8a5edab2/SiteHeader";
import { Testimonials } from "@/components/sites/cogentlabs-co-edeb5c95/root-8a5edab2/Testimonials";

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <ClientStrip />
      <Services />
      <Impact />
      <ClientsPartners />
      <Process />
      <Testimonials />
      <ClosingCta />
      <SiteFooter />
    </main>
  );
}
