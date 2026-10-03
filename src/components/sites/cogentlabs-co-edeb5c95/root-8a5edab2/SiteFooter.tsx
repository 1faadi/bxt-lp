import Image from "next/image";
import Link from "next/link";

const footerGroups = [
  {
    label: "SERVICES",
    links: [
      { label: "AI & Automation", href: "/services" },
      { label: "SaaS Development", href: "/services" },
      { label: "Web Development", href: "/services" },
      { label: "Mobile Development", href: "/services" },
      { label: "Product Design", href: "/services" },
    ],
  },
  {
    label: "WORK",
    links: [{ label: "Case Studies", href: "/case-studies" }],
  },
  {
    label: "INSIGHTS",
    links: [{ label: "Blogs", href: "/blogs" }],
  },
  {
    label: "COMPANY",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Careers", href: "mailto:info@bxtrack.com?subject=Careers at BXTrack" },
      { label: "Contact", href: "#contact" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#111111] pt-[88px] pb-8 text-[#f5f1e9]">
      <div className="shell">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f47820]"
            >
              <Image
                src="/sites/cogentlabs-co-edeb5c95/shared/bxtrack-white-logo.png"
                alt="BXTrack"
                width={181}
                height={43}
                className="h-auto w-[170px]"
              />
            </Link>
            <p className="mt-8 max-w-sm text-base leading-7 text-white/55">
              AI products and digital systems built with clear thinking, strong
              engineering, and measurable outcomes.
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-4 lg:col-span-8"
          >
            {footerGroups.map((group) => (
              <div key={group.label}>
                <p className="text-[11px] font-medium tracking-[0.2em] text-white/40">
                  {group.label}
                </p>
                <ul className="mt-6 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-white/70 transition-colors hover:text-[#f47820] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f47820]"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-20 flex flex-col gap-5 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between lg:mt-28">
          <p>© 2026 BXTrack Solution Pvt Ltd.</p>
          <div className="flex gap-6">
            <a className="transition-colors hover:text-white" href="/privacy">
              Privacy
            </a>
            <a className="transition-colors hover:text-white" href="/terms">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
