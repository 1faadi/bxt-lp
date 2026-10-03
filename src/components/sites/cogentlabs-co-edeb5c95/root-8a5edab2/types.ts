export interface ServiceItem {
  number: string;
  title: string;
  description: string;
}

export interface ProjectItem {
  slug: string;
  name: string;
  industry: string;
  description: string;
  services: string;
  outcome: string;
  visual: "atlas" | "meridian" | "ledgerly";
}

export interface MetricItem {
  value: string;
  label: string;
}
