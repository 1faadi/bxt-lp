"use client";

import type { TargetAndTransition, Transition } from "framer-motion";
import * as m from "framer-motion/m";
import { memo } from "react";

import { cn } from "@/lib/utils";

import { CheckIcon } from "./WorkflowIcons";
import { StatusDot, TickerText, WorkflowNode } from "./WorkflowNode";
import { AGENT_STATES, TOTAL_STEPS, palette, type AgentStateId } from "./workflow-data";

/* -------------------------------------------------------------------------- */
/* Dot matrix — the agent's abstract "thinking" symbol                        */
/* -------------------------------------------------------------------------- */

const COLS = 8;
const ROWS = 5;
const BASE_OPACITY = 0.16;

/** Dots that draw a check mark when the task completes, in stroke order. */
const CHECK_PATH: ReadonlyArray<readonly [number, number]> = [
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 3],
  [5, 2],
  [6, 1],
  [7, 0],
];

function seeded(index: number) {
  const value = Math.sin((index + 1) * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

const DOTS = Array.from({ length: COLS * ROWS }, (_, index) => {
  const col = index % COLS;
  const row = Math.floor(index / COLS);
  return {
    index,
    col,
    row,
    seed: seeded(index),
    checkOrder: CHECK_PATH.findIndex(([c, r]) => c === col && r === row),
  };
});

type Dot = (typeof DOTS)[number];
type MatrixPattern = "idle" | "scan" | "wave" | "work" | "check";

function patternFor(state: AgentStateId): MatrixPattern {
  switch (state) {
    case "idle":
      return "idle";
    case "understanding":
      return "scan";
    case "planning":
      return "wave";
    case "complete":
      return "check";
    default:
      return "work";
  }
}

function dotMotion(
  dot: Dot,
  pattern: MatrixPattern,
  live: boolean,
): { animate: TargetAndTransition; transition: Transition } {
  const ink = { backgroundColor: palette.ink };

  if (pattern === "check") {
    const onCheck = dot.checkOrder >= 0;
    return {
      animate: onCheck
        ? { opacity: 1, backgroundColor: palette.accent }
        : { opacity: 0.06, backgroundColor: palette.ink },
      transition: { duration: 0.28, delay: onCheck ? 0.05 + dot.checkOrder * 0.045 : 0 },
    };
  }

  if (pattern === "idle" || !live) {
    const frozen = pattern === "idle" ? BASE_OPACITY : BASE_OPACITY + dot.seed * 0.45;
    return { animate: { ...ink, opacity: frozen }, transition: { duration: 0.35 } };
  }

  if (pattern === "work") {
    return {
      animate: { ...ink, opacity: [BASE_OPACITY, 0.85, BASE_OPACITY] },
      transition: {
        opacity: {
          duration: 0.9 + dot.seed * 0.7,
          delay: dot.seed * 0.9,
          times: [0, 0.35, 1],
          repeat: Infinity,
          ease: "easeInOut",
        },
        backgroundColor: { duration: 0.2 },
      },
    };
  }

  // scan: a column sweep while reading; wave: a diagonal sweep while planning
  const delay = pattern === "scan" ? dot.col * 0.065 : (dot.col + dot.row) * 0.055;
  return {
    animate: { ...ink, opacity: [BASE_OPACITY, 1, BASE_OPACITY, BASE_OPACITY] },
    transition: {
      opacity: { duration: 1.15, delay, times: [0, 0.16, 0.44, 1], repeat: Infinity, ease: "easeInOut" },
      backgroundColor: { duration: 0.2 },
    },
  };
}

interface AgentMatrixProps {
  state: AgentStateId;
  live: boolean;
  className?: string;
}

function AgentMatrix({ state, live, className }: AgentMatrixProps) {
  const pattern = patternFor(state);

  return (
    <div aria-hidden="true" className={cn("grid w-max grid-cols-8 gap-[7px]", className)}>
      {DOTS.map((dot) => {
        const { animate, transition } = dotMotion(dot, pattern, live);
        return (
          <m.span
            key={dot.index}
            className="block size-[3px] rounded-full"
            initial={false}
            animate={animate}
            transition={transition}
          />
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Pieces                                                                     */
/* -------------------------------------------------------------------------- */

function AgentBadge({ state, live }: { state: AgentStateId; live: boolean }) {
  const working = state !== "idle" && state !== "complete";
  const label = state === "idle" ? "Idle" : state === "complete" ? "Done" : "Running";

  return (
    <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase leading-none tracking-[0.12em] text-[#686660]">
      <StatusDot state={working ? "active" : state === "complete" ? "complete" : "idle"} live={live} />
      {label}
    </span>
  );
}

function StatusLine({ state }: { state: AgentStateId }) {
  const { label } = AGENT_STATES[state];

  return (
    <TickerText
      textKey={state}
      distance={22}
      className="h-[22px]"
      itemClassName="flex items-center gap-1.5 truncate text-[15px] font-medium leading-[22px] tracking-[-0.015em] text-[#111111]"
    >
      {state === "complete" && (
        <span className="grid size-4 shrink-0 place-items-center rounded-full bg-[#f47820] text-[#111111]">
          <CheckIcon className="size-3" />
        </span>
      )}
      {label}
    </TickerText>
  );
}

function DetailLine({ state }: { state: AgentStateId }) {
  const { detail } = AGENT_STATES[state];

  return (
    <TickerText
      textKey={state}
      distance={14}
      className="h-[14px]"
      itemClassName="truncate font-mono text-[10px] uppercase leading-[14px] tracking-[0.08em] text-[#686660]"
    >
      {detail}
    </TickerText>
  );
}

function StepCounter({ state }: { state: AgentStateId }) {
  const { step } = AGENT_STATES[state];

  return (
    <p className="font-mono text-[12px] leading-none tabular-nums text-[#111111]">
      {String(step).padStart(2, "0")}
      <span className="text-[#9a958c]">/{String(TOTAL_STEPS).padStart(2, "0")}</span>
    </p>
  );
}

function ProgressSegments({ state, className }: { state: AgentStateId; className?: string }) {
  const { step } = AGENT_STATES[state];
  const complete = state === "complete";

  return (
    <div aria-hidden="true" className={cn("flex gap-[3px]", className)}>
      {Array.from({ length: TOTAL_STEPS }, (_, index) => {
        const segment = index + 1;
        const color =
          complete || segment < step ? palette.ink : segment === step ? palette.accent : "#dcd8d0";
        return (
          <m.span
            key={segment}
            className="block h-[2px] flex-1"
            initial={false}
            animate={{ backgroundColor: color }}
            transition={{ duration: 0.3 }}
          />
        );
      })}
    </div>
  );
}

function CropMarks() {
  const mark = "pointer-events-none absolute size-[9px] border-[#111111]/35";
  return (
    <>
      <span aria-hidden="true" className={cn(mark, "-left-[7px] -top-[7px] border-l border-t")} />
      <span aria-hidden="true" className={cn(mark, "-right-[7px] -top-[7px] border-r border-t")} />
      <span aria-hidden="true" className={cn(mark, "-bottom-[7px] -left-[7px] border-b border-l")} />
      <span aria-hidden="true" className={cn(mark, "-bottom-[7px] -right-[7px] border-b border-r")} />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Agent node                                                                 */
/* -------------------------------------------------------------------------- */

interface AgentNodeProps {
  state: AgentStateId;
  live: boolean;
  /** Mobile treatment: full width, horizontal body. */
  compact?: boolean;
  className?: string;
}

/**
 * The central system node. Deliberately not an avatar: a precise instrument
 * panel with a dot-matrix activity symbol, live status, step counter and a
 * segmented progress rail.
 */
export const AgentNode = memo(function AgentNode({ state, live, compact = false, className }: AgentNodeProps) {
  if (compact) {
    return (
      <WorkflowNode tone="active" className={cn("w-full", className)}>
        <div className="flex h-10 items-center justify-between border-b border-[#e2ded6] px-3.5">
          <span className="text-[14px] font-medium tracking-[-0.01em] text-[#111111]">AI Agent</span>
          <AgentBadge state={state} live={live} />
        </div>
        <div className="flex items-center gap-4 px-3.5 py-3.5">
          <AgentMatrix state={state} live={live} />
          <div className="min-w-0 flex-1">
            <StatusLine state={state} />
            <div className="mt-1">
              <DetailLine state={state} />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 px-3.5 pb-3">
          <ProgressSegments state={state} className="flex-1" />
          <StepCounter state={state} />
        </div>
      </WorkflowNode>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <CropMarks />
      <WorkflowNode tone="active" className="flex h-full w-full flex-col">
        <div className="flex h-11 shrink-0 items-center justify-between border-b border-[#e2ded6] px-4">
          <span className="text-[14px] font-medium tracking-[-0.01em] text-[#111111]">AI Agent</span>
          <AgentBadge state={state} live={live} />
        </div>
        <div className="flex items-start justify-between px-4 pt-4">
          <AgentMatrix state={state} live={live} />
          <div className="text-right">
            <p className="mb-1.5 font-mono text-[9px] uppercase leading-none tracking-[0.14em] text-[#9a958c]">Step</p>
            <StepCounter state={state} />
          </div>
        </div>
        <div className="mt-auto px-4 pb-4">
          <StatusLine state={state} />
          <div className="mt-1">
            <DetailLine state={state} />
          </div>
          <ProgressSegments state={state} className="mt-3.5" />
        </div>
      </WorkflowNode>
    </div>
  );
});
