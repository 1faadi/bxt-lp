"use client";

import { AnimatePresence } from "framer-motion";
import * as m from "framer-motion/m";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { palette, type CallPhase } from "./workflow-data";

/** Same curve as the site's `.reveal` transition. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export type NodeTone = "ghost" | "idle" | "pending" | "active" | "done" | "emphasis";

const TONE_STYLES: Readonly<Record<NodeTone, { borderColor: string; backgroundColor: string }>> = {
  ghost: { borderColor: "#cbc5ba", backgroundColor: "rgba(248, 247, 243, 0)" },
  idle: { borderColor: palette.border, backgroundColor: palette.card },
  pending: { borderColor: palette.borderStrong, backgroundColor: palette.card },
  active: { borderColor: palette.ink, backgroundColor: palette.raised },
  done: { borderColor: palette.border, backgroundColor: palette.card },
  emphasis: { borderColor: palette.lineHover, backgroundColor: palette.raised },
};

export function toneForPhase(phase: CallPhase): NodeTone {
  switch (phase) {
    case "outbound":
      return "pending";
    case "active":
    case "inbound":
      return "active";
    case "done":
      return "done";
    default:
      return "idle";
  }
}

interface WorkflowNodeProps {
  tone?: NodeTone;
  dashed?: boolean;
  className?: string;
  children?: ReactNode;
}

/** Base surface shared by every node: thin border, warm card, animated state. */
export function WorkflowNode({ tone = "idle", dashed = false, className, children }: WorkflowNodeProps) {
  return (
    <m.div
      className={cn("relative border", dashed ? "border-dashed" : "border-solid", className)}
      initial={false}
      animate={TONE_STYLES[tone]}
      transition={{ duration: 0.32, ease: EASE_OUT }}
    >
      {children}
    </m.div>
  );
}

interface TickerTextProps {
  /** Changing the key rolls the old line up and out, and the new line in. */
  textKey: string;
  /** Line height in px — the roll distance, so lines stay stacked, never overlapping. */
  distance: number;
  /** Container classes; must set the same height as `distance`. */
  className?: string;
  itemClassName?: string;
  dim?: boolean;
  children: ReactNode;
}

/** Status text that changes like a split-flap ticker inside a clipped line. */
export function TickerText({ textKey, distance, className, itemClassName, dim = false, children }: TickerTextProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <AnimatePresence initial={false}>
        <m.div
          key={textKey}
          className={cn("absolute inset-x-0 top-0", itemClassName)}
          initial={{ y: distance, opacity: 0 }}
          animate={{ y: 0, opacity: dim ? 0.6 : 1 }}
          exit={{ y: -distance, opacity: 0 }}
          transition={{ duration: 0.36, ease: EASE_OUT }}
        >
          {children}
        </m.div>
      </AnimatePresence>
    </div>
  );
}

type DotState = CallPhase | "complete";

const DOT_STYLES: Readonly<Record<DotState, { backgroundColor: string; borderColor: string; opacity: number }>> = {
  idle: { backgroundColor: "rgba(17, 17, 17, 0)", borderColor: "#b4aea3", opacity: 1 },
  outbound: { backgroundColor: palette.accent, borderColor: palette.accent, opacity: 0.45 },
  active: { backgroundColor: palette.accent, borderColor: palette.accent, opacity: 1 },
  inbound: { backgroundColor: palette.accent, borderColor: palette.accent, opacity: 1 },
  done: { backgroundColor: palette.ink, borderColor: palette.ink, opacity: 1 },
  complete: { backgroundColor: palette.ink, borderColor: palette.ink, opacity: 1 },
};

interface StatusDotProps {
  state: DotState;
  /** Allows the looping pulse; false renders a static dot. */
  live: boolean;
  className?: string;
}

/** Tiny activity indicator: hollow when idle, orange while working, ink when done. */
export function StatusDot({ state, live, className }: StatusDotProps) {
  const pulsing = live && state === "active";

  return (
    <m.span
      aria-hidden="true"
      className={cn("block size-[6px] shrink-0 rounded-full border", className)}
      initial={false}
      animate={pulsing ? { ...DOT_STYLES.active, opacity: [1, 0.3, 1] } : DOT_STYLES[state]}
      transition={
        pulsing
          ? { opacity: { duration: 0.9, repeat: Infinity, ease: "easeInOut" }, default: { duration: 0.2 } }
          : { duration: 0.25 }
      }
    />
  );
}
