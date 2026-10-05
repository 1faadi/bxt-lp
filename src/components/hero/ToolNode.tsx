"use client";

import { AnimatePresence } from "framer-motion";
import * as m from "framer-motion/m";
import { memo, type PointerEvent } from "react";

import { cn } from "@/lib/utils";

import { CheckIcon, TOOL_ICONS } from "./WorkflowIcons";
import { EASE_OUT, StatusDot, TickerText, WorkflowNode, toneForPhase } from "./WorkflowNode";
import { TOOLS, isLive, type ToolId, type ToolState } from "./workflow-data";

type HoverHandler = (id: ToolId | null) => void;

/** Hover is a pointer-only enhancement: touch taps never leave a sticky tooltip. */
function hoverHandlers(id: ToolId, onHoverChange?: HoverHandler) {
  if (!onHoverChange) return {};
  return {
    onPointerEnter: (event: PointerEvent) => {
      if (event.pointerType === "mouse") onHoverChange(id);
    },
    onPointerLeave: () => onHoverChange(null),
  };
}

function statusLine(state: ToolState, fallback: string) {
  switch (state.phase) {
    case "outbound":
    case "active":
      return { key: `op:${state.op}`, text: state.op, kind: "op" as const };
    case "inbound":
    case "done":
      return { key: `result:${state.result}`, text: state.result, kind: "result" as const };
    default:
      return { key: "meta", text: fallback, kind: "meta" as const };
  }
}

interface ToolTooltipProps {
  id: ToolId;
  visible: boolean;
  side: "top" | "bottom";
}

function ToolTooltip({ id, visible, side }: ToolTooltipProps) {
  const tool = TOOLS[id];

  return (
    <div
      className={cn(
        "pointer-events-none absolute left-1/2 z-30 -translate-x-1/2",
        side === "top" ? "bottom-full mb-2.5" : "top-full mt-2.5",
      )}
    >
      <AnimatePresence>
        {visible && (
          <m.div
            className="w-max max-w-[220px] rounded-[4px] bg-[#111111] px-2.5 py-2 text-left"
            initial={{ opacity: 0, y: side === "top" ? 4 : -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: side === "top" ? 4 : -4 }}
            transition={{ duration: 0.18, ease: EASE_OUT }}
          >
            <p className="text-[12px] font-medium leading-none text-[#f4f2ec]">{tool.label}</p>
            <p className="mt-1.5 text-[11px] leading-[1.35] text-[#f4f2ec]/65">{tool.description}</p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface ToolNodeProps {
  id: ToolId;
  state: ToolState;
  live: boolean;
  hovered?: boolean;
  tooltipSide?: "top" | "bottom";
  onHoverChange?: HoverHandler;
  className?: string;
}

/** Desktop / tablet tool node: icon, label, status dot and an execution line. */
export const ToolNode = memo(function ToolNode({
  id,
  state,
  live,
  hovered = false,
  tooltipSide = "bottom",
  onHoverChange,
  className,
}: ToolNodeProps) {
  const tool = TOOLS[id];
  const Icon = TOOL_ICONS[id];
  const engaged = isLive(state.phase);
  const tone = hovered && !engaged ? "emphasis" : toneForPhase(state.phase);
  const line = statusLine(state, tool.meta);

  return (
    <div className={cn("absolute", className)} {...hoverHandlers(id, onHoverChange)}>
      <WorkflowNode tone={tone} className="h-full w-full rounded-[5px] px-3 py-2.5">
        <div className="flex items-center gap-2">
          <Icon
            className={cn(
              "size-[14px] shrink-0 transition-colors duration-300",
              engaged || hovered ? "text-[#111111]" : "text-[#7d786f]",
            )}
          />
          <span className="text-[13px] font-medium leading-none tracking-[-0.01em] text-[#111111]">{tool.label}</span>
          <StatusDot state={state.phase} live={live} className="ml-auto" />
        </div>
        <TickerText
          textKey={line.key}
          distance={13}
          dim={line.kind === "op" && state.phase === "outbound"}
          className="mt-2 h-[13px]"
          itemClassName={cn(
            "flex items-center gap-1 truncate font-mono text-[10px] leading-[13px] tracking-[0.04em]",
            line.kind === "meta" ? "text-[#9a958c]" : "text-[#111111]",
          )}
        >
          {state.phase === "done" && <CheckIcon className="size-[11px] shrink-0 text-[#111111]" />}
          {line.text}
        </TickerText>
      </WorkflowNode>
      <ToolTooltip id={id} visible={hovered} side={tooltipSide} />
    </div>
  );
});

interface ToolTileProps {
  id: ToolId;
  state: ToolState;
  live: boolean;
}

/** Mobile tile: stacked icon and label, same states as the desktop node. */
export const ToolTile = memo(function ToolTile({ id, state, live }: ToolTileProps) {
  const tool = TOOLS[id];
  const Icon = TOOL_ICONS[id];
  const engaged = isLive(state.phase);

  return (
    <WorkflowNode
      tone={toneForPhase(state.phase)}
      className="flex h-16 flex-col items-center justify-center gap-2 rounded-[5px]"
    >
      <StatusDot state={state.phase} live={live} className="absolute right-2 top-2" />
      <Icon
        className={cn(
          "size-4 transition-colors duration-300",
          engaged ? "text-[#111111]" : "text-[#7d786f]",
        )}
      />
      <span className="text-[12px] font-medium leading-none text-[#111111]">{tool.label}</span>
    </WorkflowNode>
  );
});
