import Image from "next/image";
import Link from "next/link";
import { CalBookingButton } from "../root-8a5edab2/CalBookingButton";
import { ArrowUpRightIcon } from "../root-8a5edab2/icons";
import { SiteHeader } from "../root-8a5edab2/SiteHeader";

type StudySlug = "paymas" | "relay-hq" | "growth-office" | "ai-route-planner" | "lucidmark" | "attock-petroleum" | "qubio" | "sonik";
export type VisualName = "paymas" | "relay-hq" | "growth-office" | "route-planner" | "lucidmark" | "attock-petroleum" | "qubio" | "sonik";

type StudyAgent = {
  name: string;
  role: string;
  avatar: string;
};

type Study = {
  slug: StudySlug;
  name: string;
  category: string;
  client: string;
  line: string;
  type: string;
  year: string;
  role: string;
  stack: string[];
  visual: VisualName;
  metrics: { value: string; label: string }[];
  challenge: string;
  solution: string;
  difference: string;
  steps: { title: string; body: string }[];
  result: string;
  agents?: StudyAgent[];
  features?: { title: string; body: string }[];
  figure?: { src: string; alt: string; width: number; height: number };
  gallery?: { src: string; alt: string; width: number; height: number }[];
  titles?: Partial<Record<"challenge" | "solution" | "features" | "difference" | "steps" | "result", string>>;
};

const studies: Record<StudySlug, Study> = {
  paymas: {
    slug: "paymas",
    name: "PayMAS",
    category: "AI RESEARCH",
    client: "BXTrack Research",
    line: "A synthetic sandbox that asks whether payment agents still honour user intent when prompts, data, and tools are adversarially manipulated.",
    type: "Phase 0 research protocol",
    year: "2026",
    role: "Experiment design, agent evaluation, security research",
    stack: ["Python", "OpenRouter", "LLM agents", "Adversarial eval harness", "Experiment GUI"],
    visual: "paymas",
    metrics: [
      { value: "10", label: "payment workflows under adversarial stress" },
      { value: "3", label: "attack families: injection, tampering, tool poisoning" },
      { value: "v2", label: "protocol with independent verification sources" },
    ],
    challenge:
      "Autonomous payment agents look useful until an attacker can rewrite the invoice, poison a tool response, or bury instructions in a merchant description. Without a rigorous eval, teams only discover those failure modes after money has already moved.",
    solution:
      "PayMAS is a synthetic Phase 0 sandbox — no real banks, credentials, or funds. A frozen task oracle defines the intended transaction. The agent sees a copied world of sources and tools. Attacks patch one source, rewrite one tool response, or inject instructions. An evaluator scores the ledger against the oracle and records security events.",
    difference:
      "v1 proved a design trap: when the only payment source was overwritten, every model paid the attacker. Protocol v2 separates stored evidence from verification sources, rotates attack variants, and measures clean utility, attack success rate, verification usage, and misdirected value — so results describe integrity, not a broken fixture.",
    steps: [
      { title: "Define the oracle", body: "Each task freezes the intended payee, amount, and workflow terms before any attack is applied." },
      { title: "Inject the attack", body: "Prompt injection, data tampering, or tool poisoning mutates exactly one surface in the sandbox." },
      { title: "Run the agent", body: "A neutral baseline agent acts through tools; unsafe actions land on a ledger, not a bank." },
      { title: "Score the outcome", body: "The evaluator labels safe success, attack success, refusal, or failure and aggregates ASR, utility, and integrity metrics." },
    ],
    result:
      "PayMAS gives BXTrack a repeatable research surface for payment-agent integrity: ten workflows spanning invoices, P2P, escrow, bookings, refunds, and recurring payments. The v1 baseline exposed 100% ASR when verification was impossible; v2 redesigns the experiment so robustness claims are actually measurable.",
  },
  "relay-hq": {
    slug: "relay-hq",
    name: "Relay HQ",
    category: "MULTI-AGENT PLATFORM",
    client: "BXTrack",
    line: "A platform for AI agent teams, with a growth product as the first team running on it.",
    type: "Internal product",
    year: "2026",
    role: "Product, architecture, full-stack engineering",
    stack: ["Next.js 16", "Claude Agent SDK", "Inngest", "PostgreSQL", "Prisma", "Clerk", "Railway"],
    visual: "relay-hq",
    metrics: [
      { value: "7", label: "agents coordinated through one lead" },
      { value: "1", label: "workspace context chokepoint — no cross-tenant leaks" },
      { value: "Live", label: "background runs that survive a closed browser" },
    ],
    challenge:
      "Growth work for a mobile app is spread across analytics dashboards, store listings, competitor research, content calendars, ad budgets, and support inboxes. Most of it is repeatable, but none of it talks to the rest — and the team did not want an AI with free rein over live accounts.",
    solution:
      "Relay HQ is the platform layer: auth and roles, isolated workspaces, a product registry, and an agent-run executor wrapped around the Claude Agent SDK. Growth Agent is the first product on top. Users only talk to Morgan, the Growth Lead. Morgan plans the work, delegates to specialists in parallel where it can, waits on dependencies where it must, and merges findings into one recommendation.",
    difference:
      "Every workspace resolves through a single context chokepoint, so one company's data never leaks into another's. Runs queue through Inngest with retries and token accounting. The Knowledge Hub holds brand, competitors, and research — agents can only propose changes; a human approves them.",
    steps: [
      { title: "Ask Morgan", body: "A team member asks a question or sets a goal in the chat." },
      { title: "Plan and delegate", body: "Morgan builds a dependency graph and hands work to the specialists that fit." },
      { title: "Run in the background", body: "Inngest executes each run with retries; progress streams back as a replayable event log." },
      { title: "Merge and recommend", body: "Morgan reconciles conflicting findings and returns one recommendation with follow-up tasks." },
    ],
    result:
      "Phases 0–5 are built: platform shell, office, agent runtime, Knowledge Hub, the specialist team, and Drafts. Automated tests, typecheck, and lint stay green. Integrations and instruction authoring are next — the operating surface is already real.",
    agents: [
      { name: "Morgan", role: "Growth Lead", avatar: "/images/case-studies/relay-hq/agents/lead.webp" },
      { name: "Market Research", role: "Competitors, ASO, audience", avatar: "/images/case-studies/relay-hq/agents/market-research.webp" },
      { name: "Analytics", role: "Funnels, retention, anomalies", avatar: "/images/case-studies/relay-hq/agents/analytics.webp" },
      { name: "Content Growth", role: "Ideas, hooks, post drafts", avatar: "/images/case-studies/relay-hq/agents/content-growth.webp" },
      { name: "Paid Ads", role: "Budgets and forecasts", avatar: "/images/case-studies/relay-hq/agents/paid-ads.webp" },
      { name: "Customer Ops", role: "Reviews and support themes", avatar: "/images/case-studies/relay-hq/agents/customer-ops.webp" },
      { name: "Partnerships", role: "Distribution opportunities", avatar: "/images/case-studies/relay-hq/agents/partnerships.webp" },
    ],
  },
  "growth-office": {
    slug: "growth-office", name: "Growth Office", category: "AI OPERATIONS", client: "Traceo", line: "A multi-agent growth floor that runs standups, SEO audits and drafts for a SaaS product.", type: "Product build for Traceo", year: "2026", role: "Full-stack engineering, agent design", stack: ["Claude Agent SDK", "Next.js", "PixiJS", "Google Analytics 4", "Scrapling", "Oracle Cloud"], visual: "growth-office",
    metrics: [{ value: "4", label: "specialist agents in one operating rhythm" }, { value: "GA4", label: "numbers turned into a daily standup" }, { value: "Draft", label: "only — human approval remains in control" }],
    challenge: "A small SaaS team had analytics, a blog, and a brand voice, but no time to turn them into a regular rhythm of reviews, fixes, and content. They needed leverage without giving an AI the authority to publish on its own.",
    solution: "Growth Office gives Traceo a visible team of AI agents on a tiled office floor. Quinn reads Google Analytics for the morning standup, Riley crawls the site for SEO issues, Casey creates drafts, and Morgan turns the signals into a prioritised plan.",
    difference: "This is not a black-box automation. The product makes each agent's work, status, and output legible. Drafts stay drafts, the brand kit is versioned, and the team sees exactly what the agents recommend before any decision is made.",
    steps: [{ title: "Standup", body: "Quinn pulls GA4 numbers and Morgan writes the daily digest." }, { title: "Crawl", body: "Riley audits the site and files the issues it finds." }, { title: "Draft", body: "Casey drafts content from the brand kit. Nothing goes live without a person." }, { title: "Plan", body: "Morgan turns the week's signals into a prioritised growth plan." }],
    result: "Deployed on Oracle Cloud, the team has one clear operating surface for repeatable growth work. When no model credentials are available, standups still run from real GA4 numbers with a template narrative — the information never disappears.",
  },
  "ai-route-planner": {
    slug: "ai-route-planner", name: "AI Route Planner", category: "OPTIMISATION + LLM", client: "Field-service CRM", line: "A solver plans field-service visits; an LLM explains the plan so a dispatcher can approve it.", type: "Client proof of concept", year: "2026", role: "Architecture, optimisation service, AI integration", stack: ["NestJS", "PostgreSQL", "OR-Tools", "Google Maps", "Claude API", "React"], visual: "route-planner",
    metrics: [{ value: "A/B/C", label: "customer-priority constraints preserved" }, { value: "Live", label: "calendar updates after dispatcher approval" }, { value: "1", label: "plain-language explanation for every plan" }],
    challenge: "Dispatchers juggle priorities, technician skills, time windows, sick days, and locked appointments by hand. An optimiser can make the maths faster, but a plan nobody understands is a plan nobody trusts.",
    solution: "For a field-service CRM, BXTrack paired a vehicle-routing solver with an LLM. The solver does the maths, the model explains the proposed changes in plain language, and the dispatcher can approve or dismiss every suggestion.",
    difference: "The planner is designed around human control. Locked visits remain fixed, business rules are explicit, and the AI never silently rewrites a schedule. It earns trust by showing what changed and why.",
    steps: [{ title: "Classify", body: "Visits and staff are filtered by status, priority, skills, and availability." }, { title: "Optimise", body: "OR-Tools solves the multi-depot routing problem within those constraints." }, { title: "Explain", body: "Claude writes why each suggested change improves the plan." }, { title: "Approve", body: "The dispatcher approves or dismisses the proposal; the calendar updates live." }],
    result: "The proof of concept runs against the client's production schema to test the approach with real operating constraints. Dispatchers receive a plan that is both mathematically sound and explainable enough to act on.",
  },
  lucidmark: {
    slug: "lucidmark",
    name: "Lucidmark",
    category: "SAAS / BUG TRACKING",
    client: "Lucidmark",
    line: "An AI-powered, multi-tenant bug tracker. One script embeds reporting, and every capture lands on a board the team can run.",
    type: "End-to-end SaaS product",
    year: "2026",
    role: "Full-stack product engineering",
    stack: ["Next.js", "React", "ShadCN", "Tailwind", "Node.js", "PostgreSQL", "AWS", "Stripe"],
    visual: "lucidmark",
    metrics: [
      { value: "50%", label: "faster reporting once the manual handoff is gone" },
      { value: "20+", label: "hours saved each week for growing product teams" },
      { value: "1", label: "script to embed reporting on the product site" },
    ],
    challenge:
      "Software teams lose hours to a single bug report: a screenshot in one tool, a spreadsheet row in another, and a chat thread that never quite captures the steps. QA switches context constantly. Developers wait on incomplete reports and unclear reproduction. Enterprise trackers are built for process-heavy organizations, and startups running agile cycles feel that weight immediately. Without a lightweight system, tracking turns chaotic, handoffs break down, and release quality slips.",
    solution:
      "Lucidmark is a multi-tenant bug tracking SaaS built for startups and QA teams that need speed without giving up structure. One line of script embeds a reporting widget on the product site. Anyone can capture a bug with screenshots, video, notes, console logs, and browser metadata in a single click — no extra tools and no back-and-forth. Every report lands on a visual Kanban board, where issues are prioritized, assigned, and tracked in real time. Stripe handles subscription billing across tiers, and role-based dashboards keep team members, admins, and clients in the right view.",
    difference:
      "A super admin panel runs the platform: roles, permissions, and billing across tenants. Integrations with Jira, Trello, Slack, and ClickUp let Lucidmark sit inside the workflow a team already has. Access stays explicit, and analytics show where QA time goes so release cycles tighten instead of filling up with missed issues.",
    steps: [
      { title: "Embed the script", body: "One script tag drops the widget onto the site. Visitors and teammates report bugs without leaving the product." },
      { title: "Capture in one click", body: "The widget records screenshots, video, notes, console logs, and browser metadata with the report." },
      { title: "Triage on the board", body: "Reports open on a Kanban board, ready to prioritize, assign, and move in real time." },
      { title: "Track through release", body: "Dashboards, permissions, and notes keep full bug detail visible so nothing slips through." },
    ],
    features: [
      { title: "Instant reporting widget", body: "Capture issues directly from the website with images, videos, and notes." },
      { title: "Visual Kanban boards", body: "Track, prioritize, and resolve bugs in real time from one board." },
      { title: "Multi-role team management", body: "Assign roles, delegate tasks, and run workflows for members, admins, and clients." },
      { title: "Workflow integrations", body: "Connect Jira, Trello, Slack, and ClickUp so reporting fits the tools already in use." },
      { title: "Access control", body: "Role-based permissions keep each tenant’s bugs, notes, and billing in the right hands." },
      { title: "Analytics and reports", body: "See QA efficiency clearly and tighten release cycles around what the data shows." },
    ],
    figure: {
      src: "/images/case-studies/lucidmark/how-it-works.png",
      alt: "Lucidmark how it works: embed a reporting script, capture a bug from the widget, and track it on the dashboard",
      width: 2800,
      height: 1858,
    },
    result:
      "Reporting got 50% faster once the manual steps were gone. Growing product teams saved more than 20 hours a week. Clearer visibility meant fewer missed issues, more reliable releases, and shorter go-to-market cycles for teams that needed to ship without adopting enterprise process.",
  },
  "attock-petroleum": {
    slug: "attock-petroleum",
    name: "Attock Petroleum",
    category: "ENERGY / CORPORATE",
    client: "Attock Petroleum Limited",
    line: "A responsive corporate site for Pakistan’s oil marketer: products, a station finder, news, and investor reports in one place.",
    type: "Corporate website",
    year: "2026",
    role: "Web design and development",
    stack: ["Responsive web", "Interactive map", "Inquiry forms", "SEO"],
    visual: "attock-petroleum",
    metrics: [
      { value: "1", label: "site for products, partners, and investors" },
      { value: "Map", label: "locator for authorized stations and dealers" },
      { value: "SEO", label: "mobile pages built to rank and load quickly" },
    ],
    challenge:
      "Attock Petroleum Limited is a major Pakistani oil marketer, headquartered in Rawalpindi and part of the UK-based Attock Oil Company. Customers, dealers, and investors all needed a clear way in: fuels and lubricants, authorized stations, corporate history, news, and financial reports. Without that, a national brand is harder to find, partners lose time, and shareholders are left looking for information that should be public.",
    solution:
      "The site gives APL one place to present petrol, diesel, lubricants, and related services. An interactive map finds authorized distributors and fuel stations. Corporate profile, mission, and history sit beside a newsroom for events and press, and an investor section holds financial and annual reports. Inquiry forms and direct contact options handle support, and the layout is responsive so the same pages work on a phone.",
    difference:
      "Each audience has a direct path. Drivers and fleet managers can see the product range, the fuel-card offer, and a station on the map. Partners can read how the company works. Investors can reach reports without digging through a marketing page. Search and performance work keep those pages findable and quick to load.",
    steps: [
      { title: "Show the range", body: "Fuels, lubricants, and services are listed so a customer can see what APL supplies." },
      { title: "Find a station", body: "The dealer locator maps authorized distributors and fuel stations across the network." },
      { title: "Publish the company", body: "Profile, history, news, and press releases stay current next to the products." },
      { title: "Open the books", body: "Investor reports and inquiry forms give shareholders and customers a direct line in." },
    ],
    features: [
      { title: "Product catalog", body: "Detailed listings for fuels, lubricants, and the rest of the service range." },
      { title: "Dealer locator", body: "An interactive map for authorized APL distributors and fuel stations." },
      { title: "Corporate profile", body: "Company background, mission, and values in one readable place." },
      { title: "News and updates", body: "Corporate news, events, and press releases kept current." },
      { title: "Investor relations", body: "Financial reports, annual reports, and the information investors ask for." },
      { title: "Inquiry system", body: "Contact forms and direct options for customer and partner questions." },
      { title: "Mobile layout", body: "The same site stays usable on a phone, without a separate experience." },
      { title: "SEO and performance", body: "Pages structured to rank and built to load quickly." },
    ],
    titles: {
      challenge: "A national fuel brand still had to be easy to find.",
      solution: "One site for customers, partners, and investors.",
      features: "What the website delivers.",
      difference: "Each audience gets a direct path.",
      steps: "From the product range to a station on the map.",
      result: "A clearer digital presence for the business.",
    },
    result:
      "APL now has a streamlined site that makes products, stations, news, and investor information easy to reach. Customers and partners can move through it without a guide, corporate updates stay current, and investors get a clearer view of the business.",
  },
  qubio: {
    slug: "qubio",
    name: "Qubio",
    category: "MOBILE / QR",
    client: "Qubio",
    line: "A dynamic QR app for Android and iOS. The printed code can stay put while the page behind it changes.",
    type: "Cross-platform mobile app",
    year: "2026",
    role: "React Native product engineering",
    stack: ["React Native", "Android", "iOS", "Shopify"],
    visual: "qubio",
    metrics: [
      { value: "2", label: "stores: Google Play and the App Store" },
      { value: "Live", label: "destinations that update after the code is printed" },
      { value: "SVG", label: "PNG and JPEG export, with a contrast check" },
    ],
    challenge:
      "A printed QR code goes stale the moment the menu, the song, or the product page changes. The poster still points at the old place. Styled codes have a second problem: they can look finished and still fail to scan. People needed one app that creates the code, keeps the destination editable, and exports a file a printer can use.",
    solution:
      "Qubio is a React Native app for Android and iOS. It generates dynamic QR codes, so the printed mark stays put while the content behind it changes. People style the body, eyes, frame, and colors, drop in an image, and see a warning when contrast is too low to scan. Export is SVG, PNG, or JPEG. A code can open a page built in the app — a link, a bio, social icons, video, a carousel, images, audio, or a Shopify product — and analytics record the scans. The same product shipped on Google Play and the App Store.",
    difference:
      "The code is not a dead end. Dynamic links let a campaign change without a reprint. The contrast check sits in the editor, so a styled code is still a code that scans. One React Native codebase keeps Android and iOS on the same product, from the style tools through to scan analytics.",
    steps: [
      { title: "Design the code", body: "Choose a pattern, frame, colors, and image. A low-contrast warning appears before the code is exported." },
      { title: "Point it somewhere", body: "Connect an existing page, a new page, or a URL. Pages can hold links, a bio, media, and Shopify products." },
      { title: "Export and print", body: "Download SVG, PNG, or JPEG and put the code on the thing people will scan." },
      { title: "Update and measure", body: "Change the destination later and read scan analytics without touching the printed code." },
    ],
    features: [
      { title: "Dynamic codes", body: "Update what a code opens after it has already been printed or shared." },
      { title: "Custom styles", body: "Body, eyes, frame, colors, and an image, with patterns from classic squares to dots and bubbles." },
      { title: "Contrast check", body: "A warning when the design is too light or too close in color to scan reliably." },
      { title: "Print-ready export", body: "SVG, PNG, and JPEG downloads from the same code." },
      { title: "Pages behind the code", body: "Link, bio, social icons, video, carousel, image, and audio blocks on a page the code opens." },
      { title: "Shopify products", body: "A product card so a code can point at something for sale." },
      { title: "Scan analytics", body: "A record of scans over time, tied back to the code." },
      { title: "Both app stores", body: "One React Native app, shipped on Google Play and the App Store." },
    ],
    gallery: [
      {
        src: "/images/case-studies/qubio/editor.png",
        alt: "Qubio editor on three phones, showing QR styles, a low-contrast warning, and SVG, PNG, and JPEG export",
        width: 1920,
        height: 1440,
      },
      {
        src: "/images/case-studies/qubio/pages.png",
        alt: "Qubio page builder on three phones, with page selection and blocks for links, bio, video, carousel, and Shopify products",
        width: 1920,
        height: 1440,
      },
    ],
    titles: {
      challenge: "A printed code should not be stuck.",
      solution: "One app for both stores, and a code that can change.",
      features: "What people do in the app.",
      difference: "Style, a reliable scan, and a destination that stays editable.",
      steps: "From a blank code to a scan you can measure.",
      result: "On both stores, between a print and a live link.",
    },
    result:
      "Qubio launched on Google Play and the App Store from a single React Native codebase. People generate and manage codes, restyle them, export print-ready files, and change what a code opens after it is already in the world. Analytics close the loop with a record of scans.",
  },
  sonik: {
    slug: "sonik",
    name: "Sonik",
    category: "SAAS / EVENTS",
    client: "Sonik.fm",
    line: "An event booking platform where attendees find a show and organizers see sales, inventory, and payouts in one place.",
    type: "Event booking SaaS",
    year: "2026",
    role: "Full-stack product engineering with the CTO",
    stack: ["Next.js", "React", "Tailwind", "ShadCN", "Framer Motion", "Node.js", "Express", "PostgreSQL", "AWS", "Stripe"],
    visual: "sonik",
    metrics: [
      { value: "EN/ES", label: "English and Spanish across the product" },
      { value: "Live", label: "ticket sales and booking confirmation" },
      { value: "Stripe", label: "checkout and automated Connect payouts" },
    ],
    challenge:
      "Organizers were stuck with slow ticketing tools, no live view of sales or payments, and separate systems for creating an event and getting paid. Attendees had a hard time finding shows, a clumsy checkout, and a site that fell apart on a phone. The result was dropped bookings and revenue the organizer never saw.",
    solution:
      "Sonik.fm puts attendees, organizers, and admins on one platform. Attendees discover events by city, category, or date, book with real-time confirmation, and get a digital pass. Organizers create the event, manage ticket inventory, and watch sales as they happen. Stripe Payments and Stripe Connect handle checkout and automated payouts. The product is in English and Spanish, built mobile-first, and runs on AWS.",
    difference:
      "The booking flow, the organizer dashboard, and payouts were built as one system rather than three tools taped together. Work happened directly with the CTO: standups, a shared feature pipeline, and delivery alongside Sonik’s in-house team. The stack is Next.js and ShadCN on the front, Express REST APIs and PostgreSQL behind them, and EC2 plus S3 on AWS.",
    steps: [
      { title: "Find the event", body: "Search by city, category, or date, in English or Spanish, on a phone or a desktop." },
      { title: "Book the ticket", body: "Checkout confirms in real time and issues a digital pass." },
      { title: "Run the show", body: "The organizer dashboard covers the event, ticket inventory, and live sales." },
      { title: "Get paid", body: "Stripe Connect sends organizer payouts without a separate finance tool." },
    ],
    features: [
      { title: "Event discovery", body: "Search events by city, category, or date." },
      { title: "Instant booking", body: "Reserve tickets with real-time confirmation and a digital pass." },
      { title: "Organizer dashboard", body: "Create events, manage ticket inventory, and track sales as they come in." },
      { title: "Automated payouts", body: "Stripe Payments for checkout and Stripe Connect for organizer payouts." },
      { title: "English and Spanish", body: "The product is available in both languages for a wider audience." },
      { title: "Mobile-first", body: "Booking and management stay usable on phones and tablets." },
    ],
    figure: {
      src: "/images/case-studies/sonik/dashboard.png",
      alt: "Sonik organizer dashboard for a live concert, with tickets sold, revenue, and audience analytics",
      width: 1546,
      height: 745,
    },
    titles: {
      challenge: "Ticketing was split across tools that could not see each other.",
      solution: "One platform for the attendee, the organizer, and the payout.",
      features: "What the product actually does.",
      difference: "Built with the CTO, shipped as one system.",
      steps: "From a listing to a paid ticket.",
      result: "Discovery, booking, and payouts on the same platform.",
    },
    result:
      "Attendees can find an event, book it, and leave with a digital pass. Organizers can create the show, watch sales live, and receive payouts through Stripe Connect. English and Spanish, plus a mobile layout, keep that path open for small shows and larger festivals.",
  },
};

export function ProjectVisual({ name }: { name: VisualName }) {
  if (name === "paymas") {
    return (
      <Image
        src="/images/case-studies/paymas/cover.jpg"
        alt="PayMAS research illustration showing a payment agent verifying an invoice against a shielded source while a tampered path is blocked"
        width={1536}
        height={864}
        className="size-full object-cover"
        sizes="(max-width: 1024px) 100vw, 640px"
        priority
      />
    );
  }
  if (name === "relay-hq") {
    return (
      <Image
        src="/images/case-studies/relay-hq/hq.webp"
        alt="Pixel-art headquarters where Relay HQ agents work, with desks, a conference room, and a research lab"
        width={1536}
        height={1024}
        className="size-full object-cover"
        sizes="(max-width: 1024px) 100vw, 640px"
        priority
      />
    );
  }
  if (name === "lucidmark") {
    return (
      <Image
        src="/images/case-studies/lucidmark/hero.png"
        alt="Laptop on an orange chair showing the Lucidmark site, with the bug board and live report counts floating over the screen"
        width={1000}
        height={750}
        className="size-full object-cover object-[center_35%]"
        sizes="(max-width: 1024px) 100vw, 640px"
        priority
      />
    );
  }
  if (name === "attock-petroleum") {
    return (
      <Image
        src="/images/case-studies/attock-petroleum/hero.png"
        alt="Attock Petroleum website collage showing the lubricant range, fleet fuel cards, station map, and fleet portal"
        width={1839}
        height={1164}
        className="size-full object-cover"
        sizes="(max-width: 1024px) 100vw, 640px"
        priority
      />
    );
  }
  if (name === "qubio") {
    return (
      <Image
        src="/images/case-studies/qubio/hero.png"
        alt="Three phones showing the Qubio QR creator, code styles, and scan analytics"
        width={1920}
        height={1440}
        className="size-full object-cover"
        sizes="(max-width: 1024px) 100vw, 640px"
        priority
      />
    );
  }
  if (name === "sonik") {
    return (
      <Image
        src="/images/case-studies/sonik/hero.png"
        alt="Sonik event booking site on a laptop, with the mobile app listing concerts beside the homepage"
        width={1000}
        height={750}
        className="size-full object-cover"
        sizes="(max-width: 1024px) 100vw, 640px"
        priority
      />
    );
  }
  if (name === "growth-office") return <svg viewBox="0 0 960 600" role="img" aria-label="Growth Office command center" className="size-full" preserveAspectRatio="xMidYMid slice"><rect width="960" height="600" fill="#121a14" /><rect x="36" y="36" width="510" height="395" rx="14" fill="#1d2d20" />{Array.from({ length: 40 }).map((_, i) => <rect key={i} x={50 + (i % 8) * 59} y={52 + Math.floor(i / 8) * 68} width="54" height="62" rx="6" fill={i % 2 ? "#213a26" : "#1f3423"} />)}{[[120,124,"Morgan","#f47820"],[330,142,"Quinn","#80cef8"],[168,292,"Riley","#ffd263"],[400,302,"Casey","#caa7ff"]].map(([x,y,label,color]) => <g key={label as string}><rect x={(x as number)-50} y={(y as number)-25} width="100" height="48" rx="8" fill="#3a5740"/><circle cx={x as number} cy={(y as number)+48} r="18" fill={color as string}/><text x={x as number} y={(y as number)+81} textAnchor="middle" fill="#e9f0e6" fontSize="14">{label as string}</text></g>)}<rect x="574" y="36" width="350" height="395" rx="14" fill="#0b120d" stroke="#34513a"/><text x="602" y="78" fill="white" fontSize="22" fontWeight="600">Command center</text>{["09:00  standup  GA4 pulled", "09:01  digest   morning summary", "09:04  crawl    SEO audit queued", "09:12  draft    saved as draft", "09:13  plan     3 tasks proposed"].map((text, i) => <text key={text} x="602" y={142 + i * 48} fill={i % 2 ? "#d4e1d1" : "#f47820"} fontSize="15" fontFamily="monospace">{text}</text>)}{["Morgan", "Quinn", "Riley", "Casey"].map((agent, i) => <g key={agent}><rect x={36 + i * 224} y="454" width="212" height="112" rx="14" fill="#1d2d20"/><circle cx={70 + i * 224} cy="490" r="15" fill={["#f47820", "#80cef8", "#ffd263", "#caa7ff"][i]}/><text x={98 + i * 224} y="494" fill="white" fontSize="17" fontWeight="600">{agent}</text><rect x={56 + i * 224} y="530" width="160" height="8" rx="4" fill="#36503a"/><rect x={56 + i * 224} y="530" width={[144,160,95,120][i]} height="8" rx="4" fill="#f47820"/></g>)}</svg>;
  return <svg viewBox="0 0 960 600" role="img" aria-label="AI Route Planner interface" className="size-full" preserveAspectRatio="xMidYMid slice"><rect width="960" height="600" fill="#edf0e8" />{Array.from({ length: 9 }).map((_, i) => <path key={`h${i}`} d={`M0 ${45+i*65} L660 ${20+i*68}`} stroke="#d9e0d2" strokeWidth={i%3===0?9:4}/>)}{Array.from({ length: 9 }).map((_, i) => <path key={`v${i}`} d={`M${30+i*72} 0 L${55+i*65} 600`} stroke="#d9e0d2" strokeWidth={i%4===0?9:4}/>)}<path d="M100 465 L205 372 L180 258 L298 198 L422 226" stroke="#f47820" strokeWidth="7" fill="none"/><path d="M105 465 L288 465 L380 388 L470 417 L560 326" stroke="#77c9f1" strokeWidth="7" fill="none"/><path d="M520 122 L430 160 L470 258 L578 238 L602 140" stroke="#f3bf4e" strokeWidth="7" fill="none"/>{[[205,372],[180,258],[298,198],[422,226],[288,465],[380,388],[470,417],[560,326],[430,160],[470,258],[578,238],[602,140]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="9" fill="white" stroke="#223624" strokeWidth="3"/>)}<rect x="680" y="34" width="246" height="532" rx="18" fill="white" stroke="#d9e0d2"/><text x="704" y="76" fill="#1e2d20" fontSize="19" fontWeight="700">AI assistant</text><text x="704" y="100" fill="#647364" fontSize="13">3 suggestions for Tuesday</text>{["Move 2 flexible visits", "Swap two technicians"].map((t,i)=><g key={t}><rect x="700" y={124+i*210} width="205" height="186" rx="14" fill="#f3f5ef"/><text x="720" y={162+i*210} fill="#1e2d20" fontSize="16" fontWeight="600">{t}</text><text x="720" y={188+i*210} fill="#536352" fontSize="14">to protect time windows.</text><rect x="720" y={246+i*210} width="82" height="36" rx="18" fill="#263e2b"/><text x="761" y={269+i*210} textAnchor="middle" fill="white" fontSize="13">Approve</text><rect x="810" y={246+i*210} width="76" height="36" rx="18" fill="white" stroke="#cbd5c6"/><text x="848" y={269+i*210} textAnchor="middle" fill="#263e2b" fontSize="13">Dismiss</text></g>)}</svg>;
}

export function getBxTrackStudy(slug: string) { return studies[slug as StudySlug]; }

export function BxTrackCaseStudy({ study }: { study: Study }) {
  const titles = {
    challenge: study.titles?.challenge ?? "A real operational problem, not a demo.",
    solution: study.titles?.solution ?? "A system built around the work.",
    features: study.titles?.features ?? "What the team actually uses.",
    difference: study.titles?.difference ?? "The automation stays accountable.",
    steps: study.titles?.steps ?? "A clear path from signal to action.",
    result: study.titles?.result ?? "From fragmented work to a plan people can use.",
  };
  return <>
    <SiteHeader tone="dark" />
    <section className="overflow-hidden bg-[#1a1a1a] bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:40px_40px] pt-36 text-white sm:pt-40"><div className="mx-auto w-[min(100%-40px,1216px)]"><Link href="/case-studies" className="font-mono text-[10px] tracking-[.16em] text-white/55 transition hover:text-[#f47820]">← ALL CASE STUDIES</Link><div className="mt-12 grid items-center gap-10 pb-16 lg:grid-cols-2 lg:gap-16 lg:pb-20"><div><p className="font-mono text-[10px] tracking-[.2em] text-[#f47820]">{study.category}</p><h1 className="mt-5 max-w-[600px] text-[46px] font-semibold leading-[1.1] tracking-[-.045em] sm:text-[58px] lg:text-[64px]">{study.name}</h1><p className="mt-6 max-w-xl text-lg leading-7 text-white/55">{study.line}</p><div className="mt-10 grid grid-cols-3 gap-3">{study.metrics.map((metric, index) => <div key={metric.label} className={`rounded-xl border p-4 ${index === 0 ? "border-[#f47820]/60 bg-[#f47820]/10" : "border-white/15 bg-white/[.06]"}`}><p className="text-2xl font-semibold tracking-[-.04em] text-[#f47820] sm:text-3xl">{metric.value}</p><p className="mt-2 text-[10px] leading-4 text-white/50">{metric.label}</p></div>)}</div></div><div className="overflow-hidden rounded-[18px] border border-white/15 shadow-2xl"><ProjectVisual name={study.visual}/></div></div></div></section>
    <section className="bg-[#f4f2ec] py-20 text-[#1a1a1a] lg:py-28"><div className="mx-auto grid w-[min(100%-40px,1216px)] gap-16 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-24"><aside className="grid h-fit grid-cols-2 gap-x-6 gap-y-8 border-t border-[#d6d1c8] pt-6 text-sm lg:sticky lg:top-28 lg:block lg:space-y-8"><div><p className="font-mono text-[10px] tracking-[.14em] text-[#77736c]">CLIENT</p><p className="mt-2">{study.client}</p></div><div><p className="font-mono text-[10px] tracking-[.14em] text-[#77736c]">ENGAGEMENT</p><p className="mt-2">{study.type}</p></div><div><p className="font-mono text-[10px] tracking-[.14em] text-[#77736c]">YEAR</p><p className="mt-2">{study.year}</p></div><div><p className="font-mono text-[10px] tracking-[.14em] text-[#77736c]">BUILT BY</p><p className="mt-2">BXTrack</p></div>{study.stack.length ? <div className="col-span-2"><p className="font-mono text-[10px] tracking-[.14em] text-[#77736c]">STACK</p><p className="mt-2 leading-6 text-[#5f5b55]">{study.stack.join(" · ")}</p></div> : null}</aside><article className="max-w-[832px] space-y-20"><CaseSection label="CHALLENGE" title={titles.challenge} copy={study.challenge}/><CaseSection label="SOLUTION" title={titles.solution} copy={study.solution}/>{study.features?.length ? <section className="border-t border-[#d6d1c8] pt-8"><p className="font-mono text-[10px] tracking-[.16em] text-[#f47820]">FEATURES</p><h2 className="mt-3 text-[32px] font-semibold leading-[1.2] tracking-[-.02em]">{titles.features}</h2><div className="mt-9 grid gap-4 sm:grid-cols-2">{study.features.map((feature) => <div key={feature.title} className="border border-[#d6d1c8] bg-white/55 p-5"><h3 className="text-xl font-semibold tracking-[-.02em]">{feature.title}</h3><p className="mt-3 text-sm leading-6 text-[#68645e]">{feature.body}</p></div>)}</div></section> : null}{study.agents?.length ? <section className="border-t border-[#d6d1c8] pt-8"><p className="font-mono text-[10px] tracking-[.16em] text-[#f47820]">THE TEAM</p><h2 className="mt-3 text-[32px] font-semibold leading-[1.2] tracking-[-.02em]">One lead. Six specialists.</h2><ul className="mt-9 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">{study.agents.map((agent) => <li key={agent.name} className="flex flex-col gap-3"><div className="relative aspect-square overflow-hidden rounded-2xl border border-[#d6d1c8] bg-white"><Image src={agent.avatar} alt={agent.name} width={160} height={160} className="size-full object-cover" /></div><div><p className="text-base font-semibold tracking-[-.02em]">{agent.name}</p><p className="mt-1 text-sm leading-snug text-[#68645e]">{agent.role}</p></div></li>)}</ul></section> : null}<CaseSection label="WHAT MAKES THIS DIFFERENT" title={titles.difference} copy={study.difference}/><section className="border-t border-[#d6d1c8] pt-8"><p className="font-mono text-[10px] tracking-[.16em] text-[#f47820]">HOW IT WORKS</p><h2 className="mt-3 text-[32px] font-semibold leading-[1.2] tracking-[-.02em]">{titles.steps}</h2>{[...(study.figure ? [study.figure] : []), ...(study.gallery ?? [])].map((image, index) => <div key={image.src} className={`${index === 0 ? "mt-9" : "mt-6"} overflow-hidden rounded-2xl border border-[#d6d1c8] bg-white`}><Image src={image.src} alt={image.alt} width={image.width} height={image.height} className="h-auto w-full" sizes="(max-width: 1024px) 100vw, 832px" /></div>)}<div className={`${study.figure || study.gallery?.length ? "mt-6" : "mt-9"} grid gap-4 sm:grid-cols-2`}>{study.steps.map((step, index) => <div key={step.title} className="border border-[#d6d1c8] bg-white/55 p-5"><p className="font-mono text-[10px] tracking-[.14em] text-[#f47820]">0{index + 1}</p><h3 className="mt-4 text-xl font-semibold tracking-[-.02em]">{step.title}</h3><p className="mt-3 text-sm leading-6 text-[#68645e]">{step.body}</p></div>)}</div></section><CaseSection label="RESULTS" title={titles.result} copy={study.result}/></article></div></section>
    <section className="bg-[#111111] py-20 text-white lg:py-24"><div className="mx-auto w-[min(100%-40px,1216px)]"><p className="font-mono text-[10px] tracking-[.16em] text-white/45">THE OUTCOME</p><div className="mt-8 grid border-y border-white/15 sm:grid-cols-3">{study.metrics.map((metric, index) => <div key={metric.label} className={`py-8 ${index ? "border-t border-white/15 sm:border-t-0 sm:border-l sm:pl-8" : "sm:pr-8"}`}><p className="text-4xl font-semibold tracking-[-.045em] text-[#f47820] sm:text-6xl">{metric.value}</p><p className="mt-4 max-w-[190px] text-sm leading-6 text-white/55">{metric.label}</p></div>)}</div><div id="contact" className="mt-16 flex flex-col justify-between gap-8 border border-white/15 bg-white/[.04] p-8 sm:p-10 lg:flex-row lg:items-end"><div><p className="font-mono text-[10px] tracking-[.16em] text-[#f47820]">BUILD WITH BXTRACK</p><h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-.04em] sm:text-5xl">Have an idea worth building with AI?</h2><p className="mt-4 max-w-lg text-white/55">Tell us about the workflow. We will show you what a focused digital system can do.</p></div><CalBookingButton className="shrink-0 bg-[#f47820] px-5 py-3 text-sm font-semibold text-[#1a1a1a]">Start a conversation <ArrowUpRightIcon className="ml-2 inline size-4" /></CalBookingButton></div></div></section>
  </>;
}

function CaseSection({ label, title, copy }: { label: string; title: string; copy: string }) { return <section className="border-t border-[#d6d1c8] pt-8"><p className="font-mono text-[10px] tracking-[.16em] text-[#f47820]">{label}</p><h2 className="mt-3 text-[32px] font-semibold leading-[1.2] tracking-[-.02em]">{title}</h2><p className="mt-6 max-w-[760px] text-[17px] leading-8 text-[#5f5b55]">{copy}</p></section>; }
