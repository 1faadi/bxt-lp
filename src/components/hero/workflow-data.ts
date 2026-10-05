/**
 * Single source of truth for the hero agent-workflow animation:
 * copy, tools, agent states, palette and the frame-by-frame timeline.
 *
 * The scene is a pure function of the current frame, so every layout
 * (desktop, tablet, mobile) renders the same story from the same data.
 */

export type ToolId = "web" | "database" | "crm" | "email" | "calendar" | "api";

/** Lifecycle of one connection/tool call. */
export type CallPhase = "idle" | "outbound" | "active" | "inbound" | "done";

export type AgentStateId =
  | "idle"
  | "understanding"
  | "planning"
  | "researching"
  | "analyzing"
  | "outreach"
  | "syncing"
  | "complete";

export type RequestPhase = "empty" | "typing" | "sent" | "clearing";

export interface ToolState {
  phase: CallPhase;
  /** Operation label of the latest call, e.g. `CRM.WRITE`. */
  op: string;
  /** Payload returned by the latest call, e.g. `42 updated`. */
  result: string;
}

export type ToolStates = Readonly<Record<ToolId, ToolState>>;

export interface WorkflowFrame {
  id: string;
  /** How long this frame is held, in ms. */
  duration: number;
  request: RequestPhase;
  /** Request → agent link. */
  input: CallPhase;
  agent: AgentStateId;
  tools: ToolStates;
  /** Agent → result link. */
  output: CallPhase;
  revealed: boolean;
}

export interface ToolDefinition {
  id: ToolId;
  label: string;
  /** Quiet descriptor shown while the tool is idle. */
  meta: string;
  /** Hover tooltip copy. */
  description: string;
}

/* -------------------------------------------------------------------------- */
/* Palette — mirrors the tokens in src/app/globals.css                        */
/* -------------------------------------------------------------------------- */

export const palette = {
  canvas: "#f4f2ec", // --background
  card: "#f8f7f3", // --card
  raised: "#fbfaf7",
  ink: "#111111", // --foreground
  muted: "#686660", // --muted-foreground
  border: "#d7d3cb", // --border
  borderStrong: "#a9a398",
  line: "#c6c0b5", // inactive connectors
  lineHover: "#7d786f",
  accent: "#f47820", // --accent (BXTrack orange)
} as const;

/* -------------------------------------------------------------------------- */
/* Copy                                                                       */
/* -------------------------------------------------------------------------- */

export const REQUEST_TEXT = "Find qualified leads and prepare personalized outreach.";
export const REQUEST_PLACEHOLDER = "Describe a task for the agent…";

export const RESULT_COPY = {
  headline: "Task completed",
  leads: 42,
  leadsLabel: "qualified leads",
  items: ["Personalized outreach generated", "CRM records updated"],
  meta: "8.4s · 6 tool calls",
} as const;

export const TOOLS: Readonly<Record<ToolId, ToolDefinition>> = {
  web: {
    id: "web",
    label: "Web",
    meta: "search",
    description: "Search and read the public web",
  },
  database: {
    id: "database",
    label: "Database",
    meta: "sql",
    description: "Retrieve application data",
  },
  crm: {
    id: "crm",
    label: "CRM",
    meta: "contacts",
    description: "Read and update customer data",
  },
  email: {
    id: "email",
    label: "Email",
    meta: "outbound",
    description: "Generate and send personalized outreach",
  },
  calendar: {
    id: "calendar",
    label: "Calendar",
    meta: "scheduling",
    description: "Book meetings and follow-ups",
  },
  api: {
    id: "api",
    label: "API",
    meta: "rest",
    description: "Call internal and third-party services",
  },
};

export const TOTAL_STEPS = 6;

export const AGENT_STATES: Readonly<
  Record<AgentStateId, { label: string; detail: string; step: number }>
> = {
  idle: { label: "Waiting for task", detail: "IDLE", step: 0 },
  understanding: { label: "Understanding request", detail: "PARSE.INTENT", step: 1 },
  planning: { label: "Planning", detail: "PLAN · 4 STEPS · 5 TOOLS", step: 2 },
  researching: { label: "Researching leads", detail: "WEB.SEARCH", step: 3 },
  analyzing: { label: "Analyzing records", detail: "DB.QUERY · CRM.READ", step: 4 },
  outreach: { label: "Preparing outreach", detail: "API.ENRICH · EMAIL.GENERATE", step: 5 },
  syncing: { label: "Updating CRM", detail: "CRM.WRITE", step: 6 },
  complete: { label: "Complete", detail: "6 TOOL CALLS · 8.4S", step: 6 },
};

/* -------------------------------------------------------------------------- */
/* Timeline                                                                   */
/* -------------------------------------------------------------------------- */

interface StageCall {
  tool: ToolId;
  op: string;
  result: string;
}

interface Stage {
  id: string;
  agent: AgentStateId;
  calls: readonly StageCall[];
}

const STAGES: readonly Stage[] = [
  {
    id: "research",
    agent: "researching",
    calls: [{ tool: "web", op: "WEB.SEARCH", result: "128 companies" }],
  },
  {
    id: "analyze",
    agent: "analyzing",
    calls: [
      { tool: "database", op: "DB.QUERY", result: "1,204 rows" },
      { tool: "crm", op: "CRM.READ", result: "16 duplicates" },
    ],
  },
  {
    id: "outreach",
    agent: "outreach",
    calls: [
      { tool: "api", op: "API.ENRICH", result: "42 contacts" },
      { tool: "email", op: "EMAIL.GENERATE", result: "42 drafts" },
    ],
  },
  {
    id: "sync",
    agent: "syncing",
    calls: [{ tool: "crm", op: "CRM.WRITE", result: "42 updated" }],
  },
];

const TOOL_IDS: readonly ToolId[] = ["web", "database", "crm", "email", "calendar", "api"];

const IDLE_TOOLS: ToolStates = {
  web: { phase: "idle", op: "", result: "" },
  database: { phase: "idle", op: "", result: "" },
  crm: { phase: "idle", op: "", result: "" },
  email: { phase: "idle", op: "", result: "" },
  calendar: { phase: "idle", op: "", result: "" },
  api: { phase: "idle", op: "", result: "" },
};

function mapTools(tools: ToolStates, update: (id: ToolId, state: ToolState) => ToolState): ToolStates {
  const next = { ...tools };
  for (const id of TOOL_IDS) next[id] = update(id, tools[id]);
  return next;
}

/** Any call still in flight is marked as finished. */
function settle(tools: ToolStates): ToolStates {
  return mapTools(tools, (_, state) =>
    state.phase === "outbound" || state.phase === "active" || state.phase === "inbound"
      ? { ...state, phase: "done" }
      : state,
  );
}

function withCalls(tools: ToolStates, calls: readonly StageCall[], phase: CallPhase): ToolStates {
  return mapTools(tools, (id, state) => {
    const call = calls.find((item) => item.tool === id);
    return call ? { phase, op: call.op, result: call.result } : state;
  });
}

type FrameState = Omit<WorkflowFrame, "id" | "duration">;

const INITIAL_STATE: FrameState = {
  request: "empty",
  input: "idle",
  agent: "idle",
  tools: IDLE_TOOLS,
  output: "idle",
  revealed: false,
};

function buildFrames(): WorkflowFrame[] {
  const frames: WorkflowFrame[] = [];
  let state = INITIAL_STATE;

  const add = (id: string, duration: number, patch: Partial<FrameState>) => {
    state = { ...state, ...patch };
    frames.push({ id, duration, ...state });
  };

  add("idle", 400, {});
  add("typing", 1650, { request: "typing" });
  add("send", 300, { request: "sent" });
  add("dispatch", 550, { input: "outbound" });
  add("understand", 800, { input: "done", agent: "understanding" });
  add("plan", 750, { agent: "planning" });

  for (const stage of STAGES) {
    add(`${stage.id}:call`, 450, {
      agent: stage.agent,
      tools: withCalls(settle(state.tools), stage.calls, "outbound"),
    });
    add(`${stage.id}:run`, 350, { tools: withCalls(state.tools, stage.calls, "active") });
    add(`${stage.id}:return`, 450, { tools: withCalls(state.tools, stage.calls, "inbound") });
  }

  add("complete", 550, { agent: "complete", tools: settle(state.tools), output: "outbound" });
  add("reveal", 1100, { output: "done", revealed: true });
  add("hold", 2350, {});
  add("reset", 650, {
    request: "clearing",
    input: "idle",
    agent: "idle",
    tools: IDLE_TOOLS,
    output: "idle",
    revealed: false,
  });

  return frames;
}

export const FRAMES: readonly WorkflowFrame[] = buildFrames();

/** Frame shown when motion is reduced: the finished task, fully legible. */
export const FINAL_FRAME_INDEX = FRAMES.findIndex((frame) => frame.id === "hold");

/** The very first run waits for the hero's reveal transition to settle. */
export const FIRST_RUN_IDLE_MS = 800;

export const LOOP_DURATION_MS = FRAMES.reduce((total, frame) => total + frame.duration, 0);

/** Packet travel time — matches the call/return frame durations. */
export const PACKET_DURATION_S = 0.44;

/* -------------------------------------------------------------------------- */
/* Micro-details                                                              */
/* -------------------------------------------------------------------------- */

const BASE_SECONDS = 9 * 3600 + 41 * 60 + 2; // 09:41:02

export function formatTaskId(run: number) {
  return `TASK_${String(231 + run).padStart(4, "0")}`;
}

/** Deterministic, hydration-safe clock that advances by one loop per run. */
export function formatClock(run: number, offsetSeconds = 0) {
  const total = BASE_SECONDS + Math.round((run * LOOP_DURATION_MS) / 1000) + offsetSeconds;
  const hours = Math.floor(total / 3600) % 24;
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return [hours, minutes, seconds].map((value) => String(value).padStart(2, "0")).join(":");
}

export function isLive(phase: CallPhase) {
  return phase === "outbound" || phase === "active" || phase === "inbound";
}
