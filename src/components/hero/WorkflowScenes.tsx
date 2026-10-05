"use client";

import { useMotionValue, useSpring, type MotionValue } from "framer-motion";
import * as m from "framer-motion/m";
import { memo, useCallback, useState, type PointerEvent } from "react";

import { cn } from "@/lib/utils";

import { AgentNode } from "./AgentNode";
import { RequestPanel } from "./RequestPanel";
import { ResultPanel } from "./ResultPanel";
import { ToolNode, ToolTile } from "./ToolNode";
import { FluidConnector, SvgPort, WorkflowConnector } from "./WorkflowConnector";
import { TickerText } from "./WorkflowNode";
import { isLive, type CallPhase, type ToolId, type WorkflowFrame } from "./workflow-data";

/* -------------------------------------------------------------------------- */
/* Geometry helpers                                                           */
/* -------------------------------------------------------------------------- */

type Point = readonly [number, number];

/** Orthogonal polyline with softened corners, as an SVG path. */
function roundedPath(points: readonly Point[], radius = 8) {
  const [first, ...rest] = points;
  let d = `M ${first[0]} ${first[1]}`;

  for (let index = 0; index < rest.length; index += 1) {
    const corner = rest[index];
    const next = rest[index + 1];
    if (!next) {
      d += ` L ${corner[0]} ${corner[1]}`;
      break;
    }
    const previous = index === 0 ? first : rest[index - 1];
    const inLength = Math.hypot(corner[0] - previous[0], corner[1] - previous[1]);
    const outLength = Math.hypot(next[0] - corner[0], next[1] - corner[1]);
    const r = Math.min(radius, inLength / 2, outLength / 2);
    const inX = corner[0] - ((corner[0] - previous[0]) / inLength) * r;
    const inY = corner[1] - ((corner[1] - previous[1]) / inLength) * r;
    const outX = corner[0] + ((next[0] - corner[0]) / outLength) * r;
    const outY = corner[1] + ((next[1] - corner[1]) / outLength) * r;
    d += ` L ${inX} ${inY} Q ${corner[0]} ${corner[1]} ${outX} ${outY}`;
  }

  return d;
}

interface ToolPlacement {
  id: ToolId;
  /** Static Tailwind position + size classes (kept literal for the compiler). */
  className: string;
  points: readonly Point[];
  tooltipSide: "top" | "bottom";
}

interface PlacedTool extends ToolPlacement {
  d: string;
  start: Point;
  end: Point;
}

function placeTools(placements: readonly ToolPlacement[]): PlacedTool[] {
  return placements.map((placement) => ({
    ...placement,
    d: roundedPath(placement.points),
    start: placement.points[0],
    end: placement.points[placement.points.length - 1],
  }));
}

/* -------------------------------------------------------------------------- */
/* Desktop: request → [agent + tool network] → result                         */
/* The 600×580 core is fixed; the outer links stretch with the container.     */
/* -------------------------------------------------------------------------- */

const DESKTOP_TOOLS = placeTools([
  {
    id: "web",
    className: "left-[35px] top-[28px] h-[56px] w-[150px]",
    tooltipSide: "top",
    points: [[244, 198], [244, 141], [110, 141], [110, 84]],
  },
  {
    id: "database",
    className: "left-[225px] top-[28px] h-[56px] w-[150px]",
    tooltipSide: "top",
    points: [[300, 198], [300, 84]],
  },
  {
    id: "crm",
    className: "left-[415px] top-[28px] h-[56px] w-[150px]",
    tooltipSide: "top",
    points: [[356, 198], [356, 141], [490, 141], [490, 84]],
  },
  {
    id: "email",
    className: "left-[35px] top-[496px] h-[56px] w-[150px]",
    tooltipSide: "bottom",
    points: [[244, 382], [244, 439], [110, 439], [110, 496]],
  },
  {
    id: "calendar",
    className: "left-[225px] top-[496px] h-[56px] w-[150px]",
    tooltipSide: "bottom",
    points: [[300, 382], [300, 496]],
  },
  {
    id: "api",
    className: "left-[415px] top-[496px] h-[56px] w-[150px]",
    tooltipSide: "bottom",
    points: [[356, 382], [356, 439], [490, 439], [490, 496]],
  },
]);

/* -------------------------------------------------------------------------- */
/* Tablet: the same story rotated — request on top, tools flank the agent     */
/* -------------------------------------------------------------------------- */

const TABLET_TOOLS = placeTools([
  {
    id: "web",
    className: "left-0 top-[224px] h-[52px] w-[140px]",
    tooltipSide: "top",
    points: [[210, 276], [175, 276], [175, 250], [140, 250]],
  },
  {
    id: "database",
    className: "left-0 top-[290px] h-[52px] w-[140px]",
    tooltipSide: "bottom",
    points: [[210, 316], [140, 316]],
  },
  {
    id: "crm",
    className: "left-0 top-[356px] h-[52px] w-[140px]",
    tooltipSide: "bottom",
    points: [[210, 356], [175, 356], [175, 382], [140, 382]],
  },
  {
    id: "email",
    className: "left-[540px] top-[224px] h-[52px] w-[140px]",
    tooltipSide: "top",
    points: [[470, 276], [505, 276], [505, 250], [540, 250]],
  },
  {
    id: "calendar",
    className: "left-[540px] top-[290px] h-[52px] w-[140px]",
    tooltipSide: "bottom",
    points: [[470, 316], [540, 316]],
  },
  {
    id: "api",
    className: "left-[540px] top-[356px] h-[52px] w-[140px]",
    tooltipSide: "bottom",
    points: [[470, 356], [505, 356], [505, 382], [540, 382]],
  },
]);

const TABLET_INPUT: readonly Point[] = [[340, 146], [340, 222]];
const TABLET_OUTPUT: readonly Point[] = [[340, 410], [340, 486]];
const TABLET_INPUT_D = roundedPath(TABLET_INPUT);
const TABLET_OUTPUT_D = roundedPath(TABLET_OUTPUT);

/* -------------------------------------------------------------------------- */
/* Shared pieces                                                              */
/* -------------------------------------------------------------------------- */

export interface SceneProps {
  frame: WorkflowFrame;
  run: number;
  /** This layout is the visible one and the timeline is running. */
  live: boolean;
  /** False when the visitor prefers reduced motion. */
  motionEnabled: boolean;
}

interface ToolNetworkProps {
  tools: readonly PlacedTool[];
  frame: WorkflowFrame;
  live: boolean;
  width: number;
  height: number;
  extraPorts: ReadonlyArray<{ key: string; point: Point; phase: CallPhase }>;
  extraLinks?: ReadonlyArray<{ key: string; d: string; phase: CallPhase }>;
}

/** Connectors under the nodes, nodes in the middle, ports pinned on top. */
function ToolNetwork({ tools, frame, live, width, height, extraPorts, extraLinks = [] }: ToolNetworkProps) {
  const [hovered, setHovered] = useState<ToolId | null>(null);
  const viewBox = `0 0 ${width} ${height}`;

  return (
    <>
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-visible" width={width} height={height} viewBox={viewBox}>
        {extraLinks.map((link) => (
          <WorkflowConnector key={link.key} d={link.d} phase={link.phase} />
        ))}
        {tools.map((tool) => (
          <WorkflowConnector key={tool.id} d={tool.d} phase={frame.tools[tool.id].phase} emphasized={hovered === tool.id} />
        ))}
      </svg>

      {tools.map((tool) => (
        <ToolNode
          key={tool.id}
          id={tool.id}
          state={frame.tools[tool.id]}
          live={live}
          hovered={hovered === tool.id}
          tooltipSide={tool.tooltipSide}
          onHoverChange={setHovered}
          className={tool.className}
        />
      ))}

      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 overflow-visible" width={width} height={height} viewBox={viewBox}>
        {tools.map((tool) => {
          const phase = frame.tools[tool.id].phase;
          return (
            <g key={tool.id}>
              <SvgPort x={tool.start[0]} y={tool.start[1]} phase={phase} />
              <SvgPort x={tool.end[0]} y={tool.end[1]} phase={phase} />
            </g>
          );
        })}
        {extraPorts.map((port) => (
          <SvgPort key={port.key} x={port.point[0]} y={port.point[1]} phase={port.phase} />
        ))}
      </svg>
    </>
  );
}

/** Faint engineering grid; drifts a few pixels against the pointer on desktop. */
function SceneGrid({ x, y }: { x?: MotionValue<number>; y?: MotionValue<number> }) {
  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none absolute -inset-8 bg-[radial-gradient(circle,rgba(17,17,17,0.1)_1px,transparent_1.4px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,#000_28%,transparent_70%)]"
      style={x && y ? { x, y } : undefined}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Desktop scene                                                              */
/* -------------------------------------------------------------------------- */

const PARALLAX_PX = 6;

export const DesktopScene = memo(function DesktopScene({ frame, run, live, motionEnabled }: SceneProps) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const gridX = useSpring(pointerX, { stiffness: 60, damping: 18, mass: 0.6 });
  const gridY = useSpring(pointerY, { stiffness: 60, damping: 18, mass: 0.6 });

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== "mouse") return;
      const bounds = event.currentTarget.getBoundingClientRect();
      pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * -2 * PARALLAX_PX);
      pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * -2 * PARALLAX_PX);
    },
    [pointerX, pointerY],
  );

  const handlePointerLeave = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  const parallax = live && motionEnabled;

  return (
    <div
      className="relative h-[580px] w-full"
      onPointerMove={parallax ? handlePointerMove : undefined}
      onPointerLeave={parallax ? handlePointerLeave : undefined}
    >
      <SceneGrid x={gridX} y={gridY} />

      <RequestPanel
        phase={frame.request}
        link={frame.input}
        run={run}
        live={live}
        size="desktop"
        className="absolute left-0 top-[176px] w-[240px] xl:w-[264px]"
      />
      <FluidConnector phase={frame.input} className="left-[240px] right-[calc(50%+138px)] top-[290px] xl:left-[264px]" />

      <div className="absolute inset-y-0 left-1/2 w-[600px] -translate-x-1/2">
        <AgentNode state={frame.agent} live={live} className="absolute left-[162px] top-[198px] h-[184px] w-[276px]" />
        <ToolNetwork
          tools={DESKTOP_TOOLS}
          frame={frame}
          live={live}
          width={600}
          height={580}
          extraPorts={[
            { key: "agent-in", point: [162, 290], phase: frame.input },
            { key: "agent-out", point: [438, 290], phase: frame.output },
          ]}
        />
      </div>

      <FluidConnector phase={frame.output} className="left-[calc(50%+138px)] right-[240px] top-[290px] xl:right-[264px]" />
      <ResultPanel
        revealed={frame.revealed}
        link={frame.output}
        run={run}
        animated={motionEnabled}
        size="desktop"
        className="absolute right-0 top-[176px] w-[240px] xl:w-[264px]"
      />
    </div>
  );
});

/* -------------------------------------------------------------------------- */
/* Tablet scene                                                               */
/* -------------------------------------------------------------------------- */

export const TabletScene = memo(function TabletScene({ frame, run, live, motionEnabled }: SceneProps) {
  return (
    <div className="relative mx-auto h-[672px] w-[680px]">
      <SceneGrid />

      <RequestPanel
        phase={frame.request}
        link={frame.input}
        run={run}
        live={live}
        size="tablet"
        className="absolute left-[140px] top-[8px] w-[400px]"
      />

      <AgentNode state={frame.agent} live={live} className="absolute left-[210px] top-[222px] h-[188px] w-[260px]" />

      <ToolNetwork
        tools={TABLET_TOOLS}
        frame={frame}
        live={live}
        width={680}
        height={672}
        extraLinks={[
          { key: "input", d: TABLET_INPUT_D, phase: frame.input },
          { key: "output", d: TABLET_OUTPUT_D, phase: frame.output },
        ]}
        extraPorts={[
          { key: "agent-in", point: TABLET_INPUT[1], phase: frame.input },
          { key: "agent-out", point: TABLET_OUTPUT[0], phase: frame.output },
        ]}
      />

      <ResultPanel
        revealed={frame.revealed}
        link={frame.output}
        run={run}
        animated={motionEnabled}
        size="tablet"
        className="absolute left-[140px] top-[464px] w-[400px]"
      />
    </div>
  );
});

/* -------------------------------------------------------------------------- */
/* Mobile scene: a simplified vertical narrative with four systems            */
/* -------------------------------------------------------------------------- */

const MOBILE_TOOLS: readonly ToolId[] = ["web", "database", "crm", "email"];

/** One phase for the shared agent ↔ tools link, from the calls in flight. */
function toolsLinkPhase(frame: WorkflowFrame): CallPhase {
  const phases = MOBILE_TOOLS.map((id) => frame.tools[id].phase);
  if (phases.includes("outbound")) return "outbound";
  if (phases.includes("inbound")) return "inbound";
  if (phases.includes("active")) return "active";
  if (phases.includes("done")) return "done";
  return "idle";
}

function operationLine(frame: WorkflowFrame) {
  const calls = MOBILE_TOOLS.map((id) => frame.tools[id]).filter((state) => isLive(state.phase));
  if (calls.length === 0) {
    return frame.agent === "complete"
      ? { key: "done", text: "ALL TOOL CALLS RETURNED", live: false }
      : { key: "idle", text: `${MOBILE_TOOLS.length} TOOLS CONNECTED`, live: false };
  }
  const returning = calls.every((state) => state.phase === "inbound");
  const text = returning
    ? `← ${calls.map((state) => state.result).join(" · ")}`
    : `→ ${calls.map((state) => state.op).join(" · ")}`;
  return { key: text, text, live: true };
}

function VerticalLink({ phase }: { phase: CallPhase }) {
  return (
    <svg aria-hidden="true" className="mx-auto block h-8 w-4 overflow-visible" width={16} height={32} viewBox="0 0 16 32">
      <WorkflowConnector d="M 8 0 L 8 32" phase={phase} />
    </svg>
  );
}

export const MobileScene = memo(function MobileScene({ frame, run, live, motionEnabled }: SceneProps) {
  const operation = operationLine(frame);

  return (
    <div className="mx-auto flex w-full max-w-[480px] flex-col">
      <RequestPanel phase={frame.request} link={frame.input} run={run} live={live} size="mobile" />
      <VerticalLink phase={frame.input} />
      <AgentNode state={frame.agent} live={live} compact />
      <VerticalLink phase={toolsLinkPhase(frame)} />

      <div className="grid grid-cols-4 gap-2">
        {MOBILE_TOOLS.map((id) => (
          <ToolTile key={id} id={id} state={frame.tools[id]} live={live} />
        ))}
      </div>
      <TickerText
        textKey={operation.key}
        distance={14}
        className="mt-2.5 h-[14px]"
        itemClassName={cn(
          "truncate text-center font-mono text-[10px] uppercase leading-[14px] tracking-[0.08em]",
          operation.live ? "text-[#111111]" : "text-[#9a958c]",
        )}
      >
        {operation.text}
      </TickerText>

      <VerticalLink phase={frame.output} />
      <ResultPanel revealed={frame.revealed} link={frame.output} run={run} animated={motionEnabled} size="mobile" />
    </div>
  );
});
