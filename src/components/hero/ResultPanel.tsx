"use client";

import { animate, useMotionValue, useTransform } from "framer-motion";
import * as m from "framer-motion/m";
import { memo, useEffect } from "react";

import { cn } from "@/lib/utils";

import { HtmlPort } from "./WorkflowConnector";
import { CheckIcon } from "./WorkflowIcons";
import { EASE_OUT, WorkflowNode } from "./WorkflowNode";
import { RESULT_COPY, formatClock, type CallPhase } from "./workflow-data";

const REVEAL_STAGGER_S = 0.11;

function revealMotion(revealed: boolean, order: number) {
  return {
    initial: false as const,
    animate: revealed ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 6, scale: 0.98 },
    transition: revealed
      ? { duration: 0.45, delay: 0.08 + order * REVEAL_STAGGER_S, ease: EASE_OUT }
      : { duration: 0.3, ease: "easeOut" as const },
  };
}

/** "42" counts up as the result lands; static when motion is reduced. */
function LeadCount({ revealed, animated }: { revealed: boolean; animated: boolean }) {
  const count = useMotionValue(revealed ? RESULT_COPY.leads : 0);
  const display = useTransform(count, (value) => String(Math.round(value)));

  useEffect(() => {
    // Hidden: keep the final figure while the panel fades out — no "0" flash.
    if (!revealed) return;
    if (!animated) {
      count.set(RESULT_COPY.leads);
      return;
    }
    const controls = animate(count, [0, RESULT_COPY.leads], { duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [revealed, animated, count]);

  return <m.span className="tabular-nums">{display}</m.span>;
}

function ResultRow({ children, revealed, order }: { children: string; revealed: boolean; order: number }) {
  return (
    <m.li className="flex items-center gap-2 text-[13px] leading-[18px] text-[#111111]" {...revealMotion(revealed, order)}>
      <span className="grid size-[15px] shrink-0 place-items-center rounded-full border border-[#111111]">
        <CheckIcon className="size-[10px]" />
      </span>
      {children}
    </m.li>
  );
}

type PanelSize = "desktop" | "tablet" | "mobile";

const BOX_CLASSES: Readonly<Record<PanelSize, string>> = {
  desktop: "h-[184px]",
  tablet: "h-[184px]",
  mobile: "h-[178px]",
};

const PORT_CLASSES: Readonly<Record<PanelSize, string | null>> = {
  desktop: "-left-[3px] top-1/2 -translate-y-1/2",
  tablet: "-top-[3px] left-1/2 -translate-x-1/2",
  mobile: null,
};

interface ResultPanelProps {
  revealed: boolean;
  /** Agent → result link, mirrored on the port. */
  link: CallPhase;
  run: number;
  /** False when motion is reduced or the scene is paused: no count-up. */
  animated: boolean;
  size: PanelSize;
  className?: string;
}

/** Right of the flow: quiet until the run completes, then the business outcome. */
export const ResultPanel = memo(function ResultPanel({ revealed, link, run, animated, size, className }: ResultPanelProps) {
  const portClass = PORT_CLASSES[size];

  return (
    <div className={className}>
      <div className="mb-2.5 flex items-center justify-between gap-3">
        <span className="text-[12px] font-medium leading-none text-[#111111]">Output</span>
        <m.span
          className="font-mono text-[10px] leading-none tracking-[0.06em] text-[#9a958c]"
          initial={false}
          animate={{ opacity: revealed ? 1 : 0.6 }}
        >
          {revealed ? RESULT_COPY.meta.toUpperCase() : "—"}
        </m.span>
      </div>

      <div className="relative">
        <WorkflowNode
          tone={revealed ? "idle" : "ghost"}
          dashed={!revealed}
          className={cn("overflow-hidden rounded-[6px] p-4", BOX_CLASSES[size])}
        >
          {/* Awaiting state */}
          <m.div
            aria-hidden="true"
            className="absolute inset-0 flex flex-col justify-center gap-2.5 p-4"
            initial={false}
            animate={{ opacity: revealed ? 0 : 1 }}
            transition={{ duration: revealed ? 0.2 : 0.4, delay: revealed ? 0 : 0.3 }}
          >
            <p className="mb-1 flex items-center gap-2 font-mono text-[10px] uppercase leading-none tracking-[0.12em] text-[#9a958c]">
              <span className="block size-[5px] rounded-full border border-[#b4aea3]" />
              Awaiting result
            </p>
            <span className="block h-[6px] w-[72%] rounded-full bg-[#e7e3db]" />
            <span className="block h-[6px] w-[54%] rounded-full bg-[#e7e3db]" />
            <span className="block h-[6px] w-[63%] rounded-full bg-[#e7e3db]" />
          </m.div>

          {/* Completed state */}
          <div className="relative">
            <m.div className="flex items-center justify-between gap-3" {...revealMotion(revealed, 0)}>
              <span className="flex items-center gap-2 text-[13px] font-medium leading-none text-[#111111]">
                <span className="grid size-[17px] place-items-center rounded-full bg-[#f47820] text-[#111111]">
                  <CheckIcon className="size-[11px]" />
                </span>
                {RESULT_COPY.headline}
              </span>
              <span className="font-mono text-[10px] leading-none tracking-[0.06em] text-[#9a958c]">
                {formatClock(run, 9)}
              </span>
            </m.div>

            <m.p className="mt-4 flex items-baseline gap-2" {...revealMotion(revealed, 1)}>
              <span className="text-[36px] font-medium leading-none tracking-[-0.05em] text-[#111111]">
                <LeadCount revealed={revealed} animated={animated} />
              </span>
              <span className="text-[13px] leading-none text-[#686660]">{RESULT_COPY.leadsLabel}</span>
            </m.p>

            <m.span
              aria-hidden="true"
              className="mt-4 block h-px origin-left bg-[#d7d3cb]"
              initial={false}
              animate={{ scaleX: revealed ? 1 : 0 }}
              transition={revealed ? { duration: 0.5, delay: 0.3, ease: EASE_OUT } : { duration: 0.25 }}
            />

            <ul className="mt-3 space-y-2">
              {RESULT_COPY.items.map((item, index) => (
                <ResultRow key={item} revealed={revealed} order={index + 2}>
                  {item}
                </ResultRow>
              ))}
            </ul>
          </div>
        </WorkflowNode>
        {portClass && <HtmlPort phase={link} className={portClass} />}
      </div>
    </div>
  );
});
