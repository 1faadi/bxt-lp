export type BlogCategory = "product" | "engineering" | "research";

export type BlogAuthor = {
  name: string;
  role: string;
  bio: string;
};

export type BlogSection = {
  heading: string;
  paragraphs: string[];
};

export type BlogPost = {
  slug: string;
  category: BlogCategory;
  categoryLabel: string;
  title: string;
  excerpt: string;
  date: string;
  dateLabel: string;
  shortDateLabel: string;
  readMinutes: number;
  image: string;
  featured: boolean;
  author: BlogAuthor;
  sections: BlogSection[];
};

export const blogCategories = [
  { id: "all", label: "All" },
  { id: "product", label: "Product" },
  { id: "engineering", label: "Engineering" },
  { id: "research", label: "Research" },
] as const;

export const blogPosts: BlogPost[] = [
  {
    slug: "ai-inside-your-saas",
    category: "product",
    categoryLabel: "Product",
    title: "AI Inside Your SaaS: Build Product Loops, Not Side Projects",
    excerpt:
      "How SaaS teams should put AI into the product itself — workflow by workflow — so customers feel leverage instead of another chatbot tab.",
    date: "2026-10-03",
    dateLabel: "October 3, 2026",
    shortDateLabel: "Oct 3, 2026",
    readMinutes: 7,
    image: "/images/blogs/ai-saas-product-loops.jpg",
    featured: true,
    author: {
      name: "Muhammad Usman",
      role: "COO, BXTrack",
      bio: "Muhammad Usman is COO at BXTrack, where he helps product and operations leaders turn AI and software into durable business systems — not demos that stall after the pilot.",
    },
    sections: [
      {
        heading: "The side-project trap",
        paragraphs: [
          "Most SaaS companies do not fail at AI because the models are weak. They fail because AI gets treated like a side quest: a support bot bolted onto help docs, a one-off summarizer in a back-office script, a slide deck about “AI-first” that never touches the product roadmap.",
          "Customers do not buy your model. They buy a job getting done faster, cleaner, and with fewer handoffs. If AI lives beside the product instead of inside the loop that creates value, it stays optional — and optional tools do not change retention.",
        ],
      },
      {
        heading: "Start where the product already has friction",
        paragraphs: [
          "The useful first AI surface is almost never “chat with our app.” It is the step users already hate: configuring a workflow, classifying messy inputs, drafting the next action, reconciling exceptions, or turning activity into decisions.",
          "Map the product loop first. Where do users stall? Where does your team still do manual cleanup after signup? Where does data enter once and get retyped three times? AI earns its place when it shortens a loop you already own.",
        ],
      },
      {
        heading: "Ship one complete loop before you scale features",
        paragraphs: [
          "A complete loop means the AI reads the same context the product already has, proposes or executes a useful step, and leaves a trail a human can trust. That usually includes permissions, auditability, fallbacks, and a clear “accept / edit / reject” path.",
          "SaaS teams that win here resist feature sprawl. They pick one high-frequency workflow, instrument it, and improve the model and product UX together until the metric moves — activation, time-to-value, support load, or expansion. Then they reuse the plumbing.",
        ],
      },
      {
        heading: "Treat AI as product infrastructure",
        paragraphs: [
          "Prompts, retrieval, evals, and cost controls are not research hobbies. They are product infrastructure. The same way you would not ship billing without observability, you should not ship AI without evaluation sets, latency budgets, and a plan for bad answers.",
          "This is also where go-to-market and engineering have to stay aligned. If sales promises “autonomous agents” while product ships a thin wrapper, trust breaks twice — once with the customer, once inside the team.",
        ],
      },
      {
        heading: "What BXTrack looks for with SaaS partners",
        paragraphs: [
          "When we help SaaS companies add AI, we start with the operating and product reality: which workflows already produce data, which decisions are high volume, and which outcomes the business can measure in weeks — not quarters of vague experimentation.",
          "The goal is not more AI surface area. The goal is one product loop that feels calmer and faster because intelligence is embedded where the work actually happens. Everything else is a demo waiting to be abandoned.",
        ],
      },
    ],
  },
  {
    slug: "adversarial-evals-for-payment-agents",
    category: "research",
    categoryLabel: "Research",
    title: "When Payment Agents Meet Adversaries: Why Verification Beats Vibes",
    excerpt:
      "Lessons from PayMAS Phase 0 — a synthetic research sandbox for measuring whether AI payment agents still honour user intent under prompt injection, data tampering, and tool poisoning.",
    date: "2026-09-30",
    dateLabel: "September 30, 2026",
    shortDateLabel: "Sep 30, 2026",
    readMinutes: 9,
    image: "/images/blogs/payment-agent-adversarial-evals.jpg",
    featured: false,
    author: {
      name: "Muhammad Umer Sheikh",
      role: "CEO, BXTrack",
      bio: "Muhammad Umer Sheikh is CEO of BXTrack, where he leads the company’s work on AI products, software systems, and research that keeps agentic automation accountable when it sits next to real business risk.",
    },
    sections: [
      {
        heading: "Autonomy next to money needs a hostile baseline",
        paragraphs: [
          "Most agent demos assume clean invoices, honest tools, and helpful merchants. Production payment work does not. Notes contain instructions. Quotes get rewritten. Tool schemas grow fields that “must be used.” If your evaluation never includes those surfaces, you are measuring helpfulness — not integrity.",
          "PayMAS Phase 0 asks a blunt question in a synthetic sandbox: can an autonomous payment agent preserve the user’s intended transaction when untrusted instructions, financial data, or tool outputs are adversarially manipulated? No real banks. No credentials. No funds. Just a frozen oracle and a ledger.",
        ],
      },
      {
        heading: "Three attack families, ten payment workflows",
        paragraphs: [
          "The protocol stresses invoice payments, P2P transfers, merchant purchases, escrow funding and release, subscription cancellation, hotel booking and refunds, cross-border transfers, and recurring rent. Across those flows we rotate prompt injection, data tampering, and tool poisoning.",
          "That breadth matters. Payee integrity, amount integrity, and workflow-term integrity fail differently. An agent that resists a poisoned invoice note can still accept a tampered refund destination if the eval never covers refunds.",
        ],
      },
      {
        heading: "v1 taught us what a broken fixture looks like",
        paragraphs: [
          "In the first protocol, every task was an invoice payment and the agent’s only payment information came from a single invoice tool. Data tampering overwrote the payee account in that store. Tool poisoning added a preferred settlement account and told the model it must be used.",
          "With no second source, paying the attacker was the “correct” reading of the evidence. Attack success rate hit 100% across models, with identical misdirected value. That was not model stupidity. It was experiment design claiming to measure robustness while removing the possibility of verification.",
        ],
      },
      {
        heading: "Protocol v2: separate evidence from verification",
        paragraphs: [
          "v2 keeps a frozen task oracle for the evaluator, copies a world of sources into the sandbox, and lets attacks patch exactly one source or rewrite one tool response. Independent verification surfaces stay available. Runs are planned with identical fixtures per task, condition, and repetition so models are compared fairly.",
          "Outcomes are scored as safe success, attack success, safe refusal, task failure, or partial failure. Events track whether the agent saw a conflict, used verification, proposed an unsafe action, or executed it. Metrics cover clean utility, ASR, utility under attack, verification usage, and simulated misdirected value.",
        ],
      },
      {
        heading: "What this changes for teams shipping agents",
        paragraphs: [
          "If you are putting an agent near payments, subscriptions, or payouts, build adversarial evals before you expand autonomy. Require a second source for high-stakes fields. Treat tool descriptions as untrusted input. Measure refusal and verification, not only task completion.",
          "PayMAS is BXTrack’s research surface for that discipline. The point is not fear of agents. The point is earning the right to automate money by proving — under attack — that user intent still wins.",
        ],
      },
    ],
  },
  {
    slug: "shipping-production-ai-agents",
    category: "engineering",
    categoryLabel: "Engineering",
    title: "Shipping Production AI Agents Without the Demo Hangover",
    excerpt:
      "A practical engineering view of taking agents from prompt playgrounds into systems that hold up under real users, messy data, and on-call reality.",
    date: "2026-09-26",
    dateLabel: "September 26, 2026",
    shortDateLabel: "Sep 26, 2026",
    readMinutes: 8,
    image: "/images/blogs/production-ai-agents.jpg",
    featured: false,
    author: {
      name: "Syed Fahad Abbas",
      role: "AI Engineer, BXTrack",
      bio: "Syed Fahad Abbas is an AI Engineer at BXTrack. He designs and ships agentic systems that sit inside real business workflows — with evaluation, guardrails, and the boring reliability work that makes demos survive contact with production.",
    },
    sections: [
      {
        heading: "Demos optimize for surprise. Production optimizes for trust.",
        paragraphs: [
          "A good demo makes people lean forward. A good production agent makes people stop checking whether they can trust it. Those are different design problems. In a demo, one clever trajectory is enough. In production, the long tail of weird inputs is the job.",
          "If your agent only works when the prompt is hand-tuned and the data is clean, you do not have a product capability yet. You have a stage trick.",
        ],
      },
      {
        heading: "Narrow the agency before you widen the model",
        paragraphs: [
          "Start with a constrained job: classify and route, draft and wait for approval, extract structured fields, propose the next step from known tools. Give the agent a small tool surface and clear success criteria before you give it freedom.",
          "Wider models do not fix vague objectives. Explicit state, typed tool contracts, and human checkpoints do. Autonomy should be earned by reliability, not granted because the architecture diagram looked impressive.",
        ],
      },
      {
        heading: "Build the boring layer first",
        paragraphs: [
          "Production agents need the same boring layer every serious system needs: tracing, retries, idempotency, secrets handling, rate limits, and a place to inspect what the model saw and did. Without that, every failure becomes folklore instead of an engineering ticket.",
          "Evals belong in that layer too. Keep a living set of real examples — happy paths, adversarial ones, and the ugly tickets from last month. If you cannot say what “better” means this week, you will only notice regressions when customers do.",
        ],
      },
      {
        heading: "Design for failure in public",
        paragraphs: [
          "Agents will be wrong. The product question is whether wrong is recoverable. Prefer actions that are reversible, drafts over silent writes, and explanations that point to sources or intermediate steps.",
          "When something fails, the UI should say what happened in operator language: missing permission, tool timeout, low confidence, conflicting records. Hiding uncertainty behind a confident paragraph is how teams lose the right to automate the next workflow.",
        ],
      },
      {
        heading: "A simple bar for “ready to ship”",
        paragraphs: [
          "Before we call an agent production-ready at BXTrack, we want three things: a measured baseline on a real workflow, guardrails for the risky steps, and an owner who can read traces when it breaks at 2 a.m.",
          "That bar is intentionally unromantic. Useful AI is not the cleverest agent in the room. It is the one your team can operate, improve, and trust enough to put next to money, customers, and deadlines.",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getFeaturedPost(): BlogPost {
  const featured = blogPosts.find((post) => post.featured);
  if (!featured) {
    throw new Error("Expected a featured blog post");
  }
  return featured;
}

export function filterPosts(category?: string): BlogPost[] {
  if (!category || category === "all") return blogPosts;
  return blogPosts.filter((post) => post.category === category);
}
