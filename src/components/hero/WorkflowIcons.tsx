import type { ReactNode, SVGProps } from "react";

import type { ToolId } from "./workflow-data";

type IconProps = SVGProps<SVGSVGElement>;

function IconFrame({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

function WebIcon(props: IconProps) {
  return (
    <IconFrame {...props}>
      <circle cx="8" cy="8" r="6" />
      <path d="M2 8h12M8 2c1.7 1.7 2.6 3.7 2.6 6S9.7 12.3 8 14M8 2C6.3 3.7 5.4 5.7 5.4 8s.9 4.3 2.6 6" />
    </IconFrame>
  );
}

function DatabaseIcon(props: IconProps) {
  return (
    <IconFrame {...props}>
      <ellipse cx="8" cy="3.9" rx="5" ry="1.9" />
      <path d="M3 3.9v8.2c0 1.05 2.24 1.9 5 1.9s5-.85 5-1.9V3.9M3 8c0 1.05 2.24 1.9 5 1.9S13 9.05 13 8" />
    </IconFrame>
  );
}

function CrmIcon(props: IconProps) {
  return (
    <IconFrame {...props}>
      <rect x="2" y="3" width="12" height="10" rx="1.5" />
      <circle cx="6" cy="6.9" r="1.4" />
      <path d="M3.9 11c.35-1.1 1.1-1.7 2.1-1.7s1.75.6 2.1 1.7M10 6.6h2.2M10 9.2h2.2" />
    </IconFrame>
  );
}

function EmailIcon(props: IconProps) {
  return (
    <IconFrame {...props}>
      <rect x="2" y="3.5" width="12" height="9" rx="1.5" />
      <path d="m2.6 4.6 5.4 4.1 5.4-4.1" />
    </IconFrame>
  );
}

function CalendarIcon(props: IconProps) {
  return (
    <IconFrame {...props}>
      <rect x="2" y="3" width="12" height="11" rx="1.5" />
      <path d="M2 6.6h12M5.4 1.8v2.4M10.6 1.8v2.4M5.2 9.6h.01M8 9.6h.01M10.8 9.6h.01" />
    </IconFrame>
  );
}

function ApiIcon(props: IconProps) {
  return (
    <IconFrame {...props}>
      <path d="M5.6 2.6c-1.3 0-1.9.6-1.9 1.9v1.4c0 .9-.5 1.5-1.5 2.1 1 .6 1.5 1.2 1.5 2.1v1.4c0 1.3.6 1.9 1.9 1.9M10.4 2.6c1.3 0 1.9.6 1.9 1.9v1.4c0 .9.5 1.5 1.5 2.1-1 .6-1.5 1.2-1.5 2.1v1.4c0 1.3-.6 1.9-1.9 1.9" />
    </IconFrame>
  );
}

export const TOOL_ICONS: Readonly<Record<ToolId, (props: IconProps) => ReactNode>> = {
  web: WebIcon,
  database: DatabaseIcon,
  crm: CrmIcon,
  email: EmailIcon,
  calendar: CalendarIcon,
  api: ApiIcon,
};

export function CheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true" {...props}>
      <path
        d="m2.6 6.2 2.2 2.2 4.6-4.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
