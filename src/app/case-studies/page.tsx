import type { Metadata } from "next";

import { CaseStudiesCatalog } from "@/components/sites/cogentlabs-co-edeb5c95/case-studies-cecbd40a/CaseStudiesCatalog";
import { ClosingCta } from "@/components/sites/cogentlabs-co-edeb5c95/root-8a5edab2/ClosingCta";
import { SiteFooter } from "@/components/sites/cogentlabs-co-edeb5c95/root-8a5edab2/SiteFooter";

export const metadata: Metadata = { title: "Case Studies" };

export default function CaseStudiesPage() {
  return <main><CaseStudiesCatalog /><ClosingCta /><SiteFooter /></main>;
}
