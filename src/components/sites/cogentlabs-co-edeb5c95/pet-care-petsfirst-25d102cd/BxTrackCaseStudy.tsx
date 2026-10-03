import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "../root-8a5edab2/icons";

type StudySlug = "paymas" | "relay-hq" | "growth-office" | "ai-route-planner";
export type VisualName = "paymas" | "relay-hq" | "growth-office" | "route-planner";

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
  if (name === "growth-office") return <svg viewBox="0 0 960 600" role="img" aria-label="Growth Office command center" className="size-full" preserveAspectRatio="xMidYMid slice"><rect width="960" height="600" fill="#121a14" /><rect x="36" y="36" width="510" height="395" rx="14" fill="#1d2d20" />{Array.from({ length: 40 }).map((_, i) => <rect key={i} x={50 + (i % 8) * 59} y={52 + Math.floor(i / 8) * 68} width="54" height="62" rx="6" fill={i % 2 ? "#213a26" : "#1f3423"} />)}{[[120,124,"Morgan","#f47820"],[330,142,"Quinn","#80cef8"],[168,292,"Riley","#ffd263"],[400,302,"Casey","#caa7ff"]].map(([x,y,label,color]) => <g key={label as string}><rect x={(x as number)-50} y={(y as number)-25} width="100" height="48" rx="8" fill="#3a5740"/><circle cx={x as number} cy={(y as number)+48} r="18" fill={color as string}/><text x={x as number} y={(y as number)+81} textAnchor="middle" fill="#e9f0e6" fontSize="14">{label as string}</text></g>)}<rect x="574" y="36" width="350" height="395" rx="14" fill="#0b120d" stroke="#34513a"/><text x="602" y="78" fill="white" fontSize="22" fontWeight="600">Command center</text>{["09:00  standup  GA4 pulled", "09:01  digest   morning summary", "09:04  crawl    SEO audit queued", "09:12  draft    saved as draft", "09:13  plan     3 tasks proposed"].map((text, i) => <text key={text} x="602" y={142 + i * 48} fill={i % 2 ? "#d4e1d1" : "#f47820"} fontSize="15" fontFamily="monospace">{text}</text>)}{["Morgan", "Quinn", "Riley", "Casey"].map((agent, i) => <g key={agent}><rect x={36 + i * 224} y="454" width="212" height="112" rx="14" fill="#1d2d20"/><circle cx={70 + i * 224} cy="490" r="15" fill={["#f47820", "#80cef8", "#ffd263", "#caa7ff"][i]}/><text x={98 + i * 224} y="494" fill="white" fontSize="17" fontWeight="600">{agent}</text><rect x={56 + i * 224} y="530" width="160" height="8" rx="4" fill="#36503a"/><rect x={56 + i * 224} y="530" width={[144,160,95,120][i]} height="8" rx="4" fill="#f47820"/></g>)}</svg>;
  return <svg viewBox="0 0 960 600" role="img" aria-label="AI Route Planner interface" className="size-full" preserveAspectRatio="xMidYMid slice"><rect width="960" height="600" fill="#edf0e8" />{Array.from({ length: 9 }).map((_, i) => <path key={`h${i}`} d={`M0 ${45+i*65} L660 ${20+i*68}`} stroke="#d9e0d2" strokeWidth={i%3===0?9:4}/>)}{Array.from({ length: 9 }).map((_, i) => <path key={`v${i}`} d={`M${30+i*72} 0 L${55+i*65} 600`} stroke="#d9e0d2" strokeWidth={i%4===0?9:4}/>)}<path d="M100 465 L205 372 L180 258 L298 198 L422 226" stroke="#f47820" strokeWidth="7" fill="none"/><path d="M105 465 L288 465 L380 388 L470 417 L560 326" stroke="#77c9f1" strokeWidth="7" fill="none"/><path d="M520 122 L430 160 L470 258 L578 238 L602 140" stroke="#f3bf4e" strokeWidth="7" fill="none"/>{[[205,372],[180,258],[298,198],[422,226],[288,465],[380,388],[470,417],[560,326],[430,160],[470,258],[578,238],[602,140]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="9" fill="white" stroke="#223624" strokeWidth="3"/>)}<rect x="680" y="34" width="246" height="532" rx="18" fill="white" stroke="#d9e0d2"/><text x="704" y="76" fill="#1e2d20" fontSize="19" fontWeight="700">AI assistant</text><text x="704" y="100" fill="#647364" fontSize="13">3 suggestions for Tuesday</text>{["Move 2 flexible visits", "Swap two technicians"].map((t,i)=><g key={t}><rect x="700" y={124+i*210} width="205" height="186" rx="14" fill="#f3f5ef"/><text x="720" y={162+i*210} fill="#1e2d20" fontSize="16" fontWeight="600">{t}</text><text x="720" y={188+i*210} fill="#536352" fontSize="14">to protect time windows.</text><rect x="720" y={246+i*210} width="82" height="36" rx="18" fill="#263e2b"/><text x="761" y={269+i*210} textAnchor="middle" fill="white" fontSize="13">Approve</text><rect x="810" y={246+i*210} width="76" height="36" rx="18" fill="white" stroke="#cbd5c6"/><text x="848" y={269+i*210} textAnchor="middle" fill="#263e2b" fontSize="13">Dismiss</text></g>)}</svg>;
}

export function getBxTrackStudy(slug: string) { return studies[slug as StudySlug]; }

export function BxTrackCaseStudy({ study }: { study: Study }) {
  return <>
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#1a1a1a] text-white"><div className="mx-auto flex h-[72px] w-[min(100%-40px,1216px)] items-center justify-between gap-8"><Link href="/" aria-label="BXTrack home"><Image src="/sites/cogentlabs-co-edeb5c95/shared/bxtrack-white-logo.png" alt="BXTrack" width={181} height={43} className="h-auto w-[122px]" /></Link><nav className="hidden items-center gap-7 text-sm text-white/65 lg:flex"><Link href="/">Home</Link><Link href="/services">Services</Link><Link href="/case-studies" className="text-white">Case Studies</Link><Link href="/blogs">Blogs</Link><Link href="/about-us">About Us</Link></nav><Link href="#contact" className="bg-[#f47820] px-4 py-2.5 text-sm font-semibold text-[#1a1a1a]">Start a Project <ArrowUpRightIcon className="ml-2 inline size-4" /></Link></div></header>
    <section className="overflow-hidden bg-[#1a1a1a] bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:40px_40px] pt-32 text-white sm:pt-40"><div className="mx-auto w-[min(100%-40px,1216px)]"><Link href="/case-studies" className="font-mono text-[10px] tracking-[.16em] text-white/55 transition hover:text-[#f47820]">← ALL CASE STUDIES</Link><div className="mt-12 grid items-center gap-10 pb-16 lg:grid-cols-2 lg:gap-16 lg:pb-20"><div><p className="font-mono text-[10px] tracking-[.2em] text-[#f47820]">{study.category}</p><h1 className="mt-5 max-w-[600px] text-[46px] font-semibold leading-[1.1] tracking-[-.045em] sm:text-[58px] lg:text-[64px]">{study.name}</h1><p className="mt-6 max-w-xl text-lg leading-7 text-white/55">{study.line}</p><div className="mt-10 grid grid-cols-3 gap-3">{study.metrics.map((metric, index) => <div key={metric.label} className={`rounded-xl border p-4 ${index === 0 ? "border-[#f47820]/60 bg-[#f47820]/10" : "border-white/15 bg-white/[.06]"}`}><p className="text-2xl font-semibold tracking-[-.04em] text-[#f47820] sm:text-3xl">{metric.value}</p><p className="mt-2 text-[10px] leading-4 text-white/50">{metric.label}</p></div>)}</div></div><div className="overflow-hidden rounded-[18px] border border-white/15 shadow-2xl"><ProjectVisual name={study.visual}/></div></div></div></section>
    <section className="bg-[#f4f2ec] py-20 text-[#1a1a1a] lg:py-28"><div className="mx-auto grid w-[min(100%-40px,1216px)] gap-16 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-24"><aside className="grid h-fit grid-cols-2 gap-x-6 gap-y-8 border-t border-[#d6d1c8] pt-6 text-sm lg:sticky lg:top-28 lg:block lg:space-y-8"><div><p className="font-mono text-[10px] tracking-[.14em] text-[#77736c]">CLIENT</p><p className="mt-2">{study.client}</p></div><div><p className="font-mono text-[10px] tracking-[.14em] text-[#77736c]">ENGAGEMENT</p><p className="mt-2">{study.type}</p></div><div><p className="font-mono text-[10px] tracking-[.14em] text-[#77736c]">YEAR</p><p className="mt-2">{study.year}</p></div><div><p className="font-mono text-[10px] tracking-[.14em] text-[#77736c]">BUILT BY</p><p className="mt-2">BXTrack</p></div>{study.stack.length ? <div className="col-span-2"><p className="font-mono text-[10px] tracking-[.14em] text-[#77736c]">STACK</p><p className="mt-2 leading-6 text-[#5f5b55]">{study.stack.join(" · ")}</p></div> : null}</aside><article className="max-w-[832px] space-y-20"><CaseSection label="CHALLENGE" title="A real operational problem, not a demo." copy={study.challenge}/><CaseSection label="SOLUTION" title="A system built around the work." copy={study.solution}/>{study.agents?.length ? <section className="border-t border-[#d6d1c8] pt-8"><p className="font-mono text-[10px] tracking-[.16em] text-[#f47820]">THE TEAM</p><h2 className="mt-3 text-[32px] font-semibold leading-[1.2] tracking-[-.02em]">One lead. Six specialists.</h2><ul className="mt-9 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">{study.agents.map((agent) => <li key={agent.name} className="flex flex-col gap-3"><div className="relative aspect-square overflow-hidden rounded-2xl border border-[#d6d1c8] bg-white"><Image src={agent.avatar} alt={agent.name} width={160} height={160} className="size-full object-cover" /></div><div><p className="text-base font-semibold tracking-[-.02em]">{agent.name}</p><p className="mt-1 text-sm leading-snug text-[#68645e]">{agent.role}</p></div></li>)}</ul></section> : null}<CaseSection label="WHAT MAKES THIS DIFFERENT" title="The automation stays accountable." copy={study.difference}/><section className="border-t border-[#d6d1c8] pt-8"><p className="font-mono text-[10px] tracking-[.16em] text-[#f47820]">HOW IT WORKS</p><h2 className="mt-3 text-[32px] font-semibold leading-[1.2] tracking-[-.02em]">A clear path from signal to action.</h2><div className="mt-9 grid gap-4 sm:grid-cols-2">{study.steps.map((step, index) => <div key={step.title} className="border border-[#d6d1c8] bg-white/55 p-5"><p className="font-mono text-[10px] tracking-[.14em] text-[#f47820]">0{index + 1}</p><h3 className="mt-4 text-xl font-semibold tracking-[-.02em]">{step.title}</h3><p className="mt-3 text-sm leading-6 text-[#68645e]">{step.body}</p></div>)}</div></section><CaseSection label="RESULTS" title="From fragmented work to a plan people can use." copy={study.result}/></article></div></section>
    <section className="bg-[#111111] py-20 text-white lg:py-24"><div className="mx-auto w-[min(100%-40px,1216px)]"><p className="font-mono text-[10px] tracking-[.16em] text-white/45">THE OUTCOME</p><div className="mt-8 grid border-y border-white/15 sm:grid-cols-3">{study.metrics.map((metric, index) => <div key={metric.label} className={`py-8 ${index ? "border-t border-white/15 sm:border-t-0 sm:border-l sm:pl-8" : "sm:pr-8"}`}><p className="text-4xl font-semibold tracking-[-.045em] text-[#f47820] sm:text-6xl">{metric.value}</p><p className="mt-4 max-w-[190px] text-sm leading-6 text-white/55">{metric.label}</p></div>)}</div><div id="contact" className="mt-16 flex flex-col justify-between gap-8 border border-white/15 bg-white/[.04] p-8 sm:p-10 lg:flex-row lg:items-end"><div><p className="font-mono text-[10px] tracking-[.16em] text-[#f47820]">BUILD WITH BXTRACK</p><h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-.04em] sm:text-5xl">Have an idea worth building with AI?</h2><p className="mt-4 max-w-lg text-white/55">Tell us about the workflow. We will show you what a focused digital system can do.</p></div><Link href="mailto:info@bxtrack.com?subject=Project enquiry" className="shrink-0 bg-[#f47820] px-5 py-3 text-sm font-semibold text-[#1a1a1a]">Start a conversation <ArrowUpRightIcon className="ml-2 inline size-4" /></Link></div></div></section>
  </>;
}

function CaseSection({ label, title, copy }: { label: string; title: string; copy: string }) { return <section className="border-t border-[#d6d1c8] pt-8"><p className="font-mono text-[10px] tracking-[.16em] text-[#f47820]">{label}</p><h2 className="mt-3 text-[32px] font-semibold leading-[1.2] tracking-[-.02em]">{title}</h2><p className="mt-6 max-w-[760px] text-[17px] leading-8 text-[#5f5b55]">{copy}</p></section>; }
