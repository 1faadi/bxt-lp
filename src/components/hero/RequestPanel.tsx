"use client";

import { animate, useMotionValue, useTransform } from "framer-motion";
import * as m from "framer-motion/m";
import { memo, useEffect } from "react";

import { cn } from "@/lib/utils";

import { HtmlPort } from "./WorkflowConnector";
import { CheckIcon } from "./WorkflowIcons";
import { WorkflowNode } from "./WorkflowNode";
import {
  REQUEST_PLACEHOLDER,
  REQUEST_TEXT,
  formatClock,
  formatTaskId,
  palette,
  type CallPhase,
  type RequestPhase,
} from "./workflow-data";

/* -------------------------------------------------------------------------- */
/* Typing rhythm — deterministic jitter so it reads as a person, not a ticker */
/* -------------------------------------------------------------------------- */

const TYPING_DURATION_S = 1.45;

function jitter(index: number) {
  const value = Math.sin((index + 7) * 78.233) * 12345.6789;
  return value - Math.floor(value);
}

const CHAR_WEIGHTS = Array.from(REQUEST_TEXT, (char, index) => 1 + jitter(index) * 0.9 + (char === " " ? 0.8 : 0));
const TOTAL_WEIGHT = CHAR_WEIGHTS.reduce((sum, weight) => sum + weight, 0);
const TYPING_KEYFRAMES = Array.from({ length: REQUEST_TEXT.length + 1 }, (_, count) => count);
const TYPING_TIMES = TYPING_KEYFRAMES.map(
  (count) => CHAR_WEIGHTS.slice(0, count).reduce((sum, weight) => sum + weight, 0) / TOTAL_WEIGHT,
);

function TypedRequest({ phase, live }: { phase: RequestPhase; live: boolean }) {
  const typed = useMotionValue(phase === "sent" || phase === "clearing" ? REQUEST_TEXT.length : 0);
  const visibleText = useTransform(typed, (count) => REQUEST_TEXT.slice(0, Math.round(count)));

  useEffect(() => {
    if (phase === "empty") {
      typed.set(0);
      return;
    }
    if (phase === "sent" || phase === "clearing") {
      typed.set(REQUEST_TEXT.length);
      return;
    }
    if (!live) return;

    const from = typed.get();
    const controls =
      from <= 0
        ? animate(typed, TYPING_KEYFRAMES, { duration: TYPING_DURATION_S, times: TYPING_TIMES, ease: "linear" })
        : animate(typed, REQUEST_TEXT.length, {
            duration: TYPING_DURATION_S * (1 - from / REQUEST_TEXT.length),
            ease: "linear",
          });

    return () => controls.stop();
  }, [phase, live, typed]);

  const showCaret = phase === "empty" || phase === "typing";
  const blink = live && phase === "empty";

  return (
    <p className="relative text-[15px] leading-[22px] tracking-[-0.01em] text-[#111111]">
      {/* Invisible full sentence reserves the final wrap, so typing never shifts layout. */}
      <span aria-hidden="true" className="invisible">
        {REQUEST_TEXT}
      </span>
      <m.span
        className="absolute inset-0"
        initial={false}
        animate={{ opacity: phase === "clearing" ? 0 : 1 }}
        transition={{ duration: phase === "clearing" ? 0.4 : 0 }}
      >
        <m.span>{visibleText}</m.span>
        {showCaret && (
          <m.span
            aria-hidden="true"
            className="ml-px inline-block h-[17px] w-[1.5px] translate-y-[3px] bg-[#111111]"
            initial={false}
            animate={blink ? { opacity: [1, 1, 0, 0] } : { opacity: 1 }}
            transition={
              blink
                ? { duration: 1.05, times: [0, 0.5, 0.5, 1], repeat: Infinity, ease: "linear" }
                : { duration: 0 }
            }
          />
        )}
      </m.span>
      {phase === "empty" && (
        <span aria-hidden="true" className="absolute left-[5px] top-0 text-[#aaa498]">
          {REQUEST_PLACEHOLDER}
        </span>
      )}
    </p>
  );
}

function SendKey({ phase }: { phase: RequestPhase }) {
  const sent = phase === "sent" || phase === "clearing";

  return (
    <m.span
      className="flex h-[22px] items-center gap-1 rounded-[4px] border px-1.5 font-mono text-[10px] uppercase leading-none tracking-[0.08em]"
      initial={false}
      animate={
        phase === "sent"
          ? {
              backgroundColor: [palette.ink, palette.card],
              color: [palette.canvas, palette.ink],
              borderColor: palette.ink,
              scale: [0.95, 1],
            }
          : sent
            ? { backgroundColor: palette.card, color: palette.ink, borderColor: palette.ink, scale: 1 }
            : { backgroundColor: palette.card, color: palette.muted, borderColor: palette.border, scale: 1 }
      }
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {sent ? <CheckIcon className="size-[11px]" /> : <span className="text-[11px] leading-none">↵</span>}
      {sent ? "Sent" : "Send"}
    </m.span>
  );
}

type PanelSize = "desktop" | "tablet" | "mobile";

const BOX_CLASSES: Readonly<Record<PanelSize, string>> = {
  desktop: "h-[184px]",
  tablet: "h-[116px]",
  mobile: "",
};

const PORT_CLASSES: Readonly<Record<PanelSize, string | null>> = {
  desktop: "-right-[3px] top-1/2 -translate-y-1/2",
  tablet: "-bottom-[3px] left-1/2 -translate-x-1/2",
  mobile: null,
};

interface RequestPanelProps {
  phase: RequestPhase;
  /** Request → agent link, mirrored on the port. */
  link: CallPhase;
  run: number;
  live: boolean;
  size: PanelSize;
  className?: string;
}

/** Left of the flow: the human request, typed and sent like a real input. */
export const RequestPanel = memo(function RequestPanel({ phase, link, run, live, size, className }: RequestPanelProps) {
  const portClass = PORT_CLASSES[size];

  return (
    <div className={className}>
      <div className="mb-2.5 flex items-center justify-between gap-3">
        <span className="text-[12px] font-medium leading-none text-[#111111]">User Request</span>
        <span className="font-mono text-[10px] leading-none tracking-[0.06em] text-[#9a958c]">{formatTaskId(run)}</span>
      </div>
      <div className="relative">
        <WorkflowNode
          tone={phase === "typing" ? "active" : "idle"}
          className={cn("flex flex-col justify-between gap-4 rounded-[6px] p-4", BOX_CLASSES[size])}
        >
          <TypedRequest phase={phase} live={live} />
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] leading-none tracking-[0.06em] text-[#9a958c]">{formatClock(run)}</span>
            <SendKey phase={phase} />
          </div>
        </WorkflowNode>
        {portClass && <HtmlPort phase={link} className={portClass} />}
      </div>
    </div>
  );
});
