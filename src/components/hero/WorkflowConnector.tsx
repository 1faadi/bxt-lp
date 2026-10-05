"use client";

import type { TargetAndTransition, Transition } from "framer-motion";
import * as m from "framer-motion/m";
import { memo } from "react";

import { cn } from "@/lib/utils";

import { EASE_IN_OUT } from "./WorkflowNode";
import { PACKET_DURATION_S, palette, type CallPhase } from "./workflow-data";

/* -------------------------------------------------------------------------- */
/* Shared motion targets                                                      */
/* -------------------------------------------------------------------------- */

const TRACE_TRANSITIONS: Readonly<Record<CallPhase, Transition>> = {
  idle: { opacity: { duration: 0.45 }, pathLength: { delay: 0.5, duration: 0 }, scaleX: { delay: 0.5, duration: 0 } },
  outbound: {
    pathLength: { duration: PACKET_DURATION_S, ease: EASE_IN_OUT },
    scaleX: { duration: PACKET_DURATION_S, ease: EASE_IN_OUT },
    opacity: { duration: 0.12 },
  },
  active: { duration: 0.2 },
  inbound: { duration: 0.2 },
  done: { opacity: { duration: 0.5 } },
};

const PACKET_OPACITY: TargetAndTransition = {
  opacity: [0, 1, 1, 0],
};

const PACKET_OPACITY_TRANSITION: Transition = {
  duration: PACKET_DURATION_S,
  times: [0, 0.12, 0.86, 1],
  ease: "linear",
};

/* -------------------------------------------------------------------------- */
/* SVG path connector (agent ↔ tools, tablet + mobile links)                  */
/* -------------------------------------------------------------------------- */

const PATH_TRACE: Readonly<Record<CallPhase, TargetAndTransition>> = {
  idle: { pathLength: 0, opacity: 0 },
  outbound: { pathLength: [0, 1], opacity: 1 },
  active: { pathLength: 1, opacity: 1 },
  inbound: { pathLength: 1, opacity: 1 },
  done: { pathLength: 1, opacity: 0.3 },
};

interface PacketProps {
  d: string;
  from: 0 | 1;
  to: 0 | 1;
}

/**
 * A data packet: a single round dash riding the path (Motion's normalised
 * `pathOffset`), with a canvas-coloured halo so it reads cleanly on top of
 * the active trace.
 */
function Packet({ d, from, to }: PacketProps) {
  const initial: TargetAndTransition = { pathLength: 0.001, pathSpacing: 2, pathOffset: from, opacity: 0 };
  const animate: TargetAndTransition = { pathOffset: to, ...PACKET_OPACITY };
  const transition: Transition = {
    pathOffset: { duration: PACKET_DURATION_S, ease: EASE_IN_OUT },
    opacity: PACKET_OPACITY_TRANSITION,
  };

  return (
    <g>
      <m.path
        d={d}
        fill="none"
        stroke={palette.canvas}
        strokeWidth={11}
        strokeLinecap="round"
        initial={initial}
        animate={animate}
        transition={transition}
      />
      <m.path
        d={d}
        fill="none"
        stroke={palette.accent}
        strokeWidth={6}
        strokeLinecap="round"
        initial={initial}
        animate={animate}
        transition={transition}
      />
    </g>
  );
}

interface WorkflowConnectorProps {
  d: string;
  phase: CallPhase;
  /** Hover emphasis from the related tool node. */
  emphasized?: boolean;
}

/**
 * Thin SVG connector. Idle: dashed and quiet. A call draws a solid ink trace
 * behind an outbound packet, the reply packet travels back, and the trace
 * settles to a faint "used" line.
 */
export const WorkflowConnector = memo(function WorkflowConnector({
  d,
  phase,
  emphasized = false,
}: WorkflowConnectorProps) {
  return (
    <g>
      <path
        d={d}
        fill="none"
        strokeWidth={1}
        strokeDasharray="2 4"
        className={cn(
          "transition-[stroke] duration-200",
          emphasized ? "stroke-[#7d786f]" : "stroke-[#c6c0b5]",
        )}
      />
      <m.path
        d={d}
        fill="none"
        stroke={palette.ink}
        strokeWidth={1.25}
        initial={false}
        animate={PATH_TRACE[phase]}
        transition={TRACE_TRANSITIONS[phase]}
      />
      {phase === "outbound" && <Packet key="outbound" d={d} from={0} to={1} />}
      {phase === "inbound" && <Packet key="inbound" d={d} from={1} to={0} />}
    </g>
  );
});

/* -------------------------------------------------------------------------- */
/* Fluid horizontal connector (desktop request → agent → result)              */
/* -------------------------------------------------------------------------- */

const FLUID_TRACE: Readonly<Record<CallPhase, TargetAndTransition>> = {
  idle: { scaleX: 0, opacity: 0 },
  outbound: { scaleX: [0, 1], opacity: 1 },
  active: { scaleX: 1, opacity: 1 },
  inbound: { scaleX: 1, opacity: 1 },
  done: { scaleX: 1, opacity: 0.3 },
};

interface FluidConnectorProps {
  phase: CallPhase;
  /** Positioning classes; the connector stretches between `left` and `right`. */
  className?: string;
}

/**
 * Same visual language as `WorkflowConnector`, for a straight link whose
 * length follows the container width. The trace scales on X and the packet
 * rides a full-width track translated from -100% to 0% — compositor-only
 * transforms, no measurement.
 */
export const FluidConnector = memo(function FluidConnector({ phase, className }: FluidConnectorProps) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute h-0", className)}>
      <svg className="absolute left-0 top-[-1px] h-[2px] w-full overflow-visible">
        <line x1="0" x2="100%" y1="1" y2="1" strokeWidth={1} strokeDasharray="2 4" className="stroke-[#c6c0b5]" />
      </svg>
      <m.span
        className="absolute inset-x-0 top-[-0.625px] block h-[1.25px] origin-left bg-[#111111]"
        initial={false}
        animate={FLUID_TRACE[phase]}
        transition={TRACE_TRANSITIONS[phase]}
      />
      {phase === "outbound" && (
        <m.span
          key="packet"
          className="absolute inset-x-0 top-0 block h-0"
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: PACKET_DURATION_S, ease: EASE_IN_OUT }}
        >
          <m.span
            className="absolute right-[-3px] top-[-3px] block size-[6px] rounded-full bg-[#f47820] shadow-[0_0_0_2.5px_#f4f2ec]"
            initial={{ opacity: 0 }}
            animate={PACKET_OPACITY}
            transition={PACKET_OPACITY_TRANSITION}
          />
        </m.span>
      )}
    </div>
  );
});

/* -------------------------------------------------------------------------- */
/* Ports — the small square pins where a connector meets a node               */
/* -------------------------------------------------------------------------- */

const PORT_STYLES: Readonly<Record<CallPhase, { fill: string; stroke: string }>> = {
  idle: { fill: palette.canvas, stroke: "#b4aea3" },
  outbound: { fill: palette.ink, stroke: palette.ink },
  active: { fill: palette.ink, stroke: palette.ink },
  inbound: { fill: palette.ink, stroke: palette.ink },
  done: { fill: palette.canvas, stroke: "#8a857b" },
};

interface SvgPortProps {
  x: number;
  y: number;
  phase: CallPhase;
}

export const SvgPort = memo(function SvgPort({ x, y, phase }: SvgPortProps) {
  return (
    <m.rect
      x={x - 2.5}
      y={y - 2.5}
      width={5}
      height={5}
      strokeWidth={1}
      initial={false}
      animate={PORT_STYLES[phase]}
      transition={{ duration: 0.25 }}
    />
  );
});

interface HtmlPortProps {
  phase: CallPhase;
  className?: string;
}

export const HtmlPort = memo(function HtmlPort({ phase, className }: HtmlPortProps) {
  const { fill, stroke } = PORT_STYLES[phase];

  return (
    <m.span
      aria-hidden="true"
      className={cn("absolute z-10 block size-[5px] border", className)}
      initial={false}
      animate={{ backgroundColor: fill, borderColor: stroke }}
      transition={{ duration: 0.25 }}
    />
  );
});
