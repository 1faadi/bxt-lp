import Image from "next/image";

import { Reveal } from "./Reveal";

const partners = [
  { name: "Permit Pal", src: "/images/clients/permitpal.png" },
  { name: "Auto Bunny", src: "/images/clients/autobunny.png" },
  { name: "Callvo", src: "/images/clients/calvo.png" },
  { name: "Aneyro", src: "/images/clients/aneyro.png" },
  { name: "Sonik", src: "/images/clients/sonik.png" },
  { name: "Mackenzie", src: "/images/clients/mackenzie.png" },
  { name: "Union", src: "/images/clients/union.png" },
] as const;

function PartnerSet({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12" aria-hidden={hidden}>
      {partners.map((partner) => (
        <div key={partner.name} className="flex h-[52px] w-[112px] shrink-0 items-center justify-center px-1 sm:h-[60px] sm:w-[128px]">
          <Image src={partner.src} alt={hidden ? "" : `${partner.name} logo`} width={150} height={56} className="max-h-9 w-auto max-w-full object-contain opacity-80 transition-all duration-300 hover:scale-105 hover:opacity-100" />
        </div>
      ))}
    </div>
  );
}

export function ClientsPartners() {
  return (
    <section className="overflow-hidden bg-background py-14 sm:py-16 md:py-20" aria-labelledby="clients-partners-title">
      <div className="shell">
        <Reveal>
          <p className="eyebrow text-muted-foreground">Who we work with</p>
          <h2 id="clients-partners-title" className="section-title mt-5 max-w-[620px]">
            Clients &amp; Partners
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-[1.55] text-muted-foreground sm:text-lg">
            We&apos;re honored to partner with innovative brands and creatives that trust in our design expertise.
          </p>
        </Reveal>

        <Reveal className="mt-12 sm:mt-14" delay={160}>
          <div className="client-marquee group relative overflow-hidden" aria-label="Client and partner logos">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-background to-transparent sm:w-14" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-background to-transparent sm:w-14" />
            <div className="client-marquee-track flex w-max">
              <PartnerSet />
              <PartnerSet hidden />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
