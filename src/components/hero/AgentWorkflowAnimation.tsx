"use client";

import { LazyMotion, MotionConfig, domAnimation, useInView } from "framer-motion";
import { useRef } from "react";

import { cn } from "@/lib/utils";

import {
  useActiveLayout,
  usePageVisible,
  usePrefersReducedMotion,
  useWorkflowTimeline,
  type SceneLayout,
} from "./use-workflow-timeline";
import { DesktopScene, MobileScene, TabletScene, type SceneProps } from "./WorkflowScenes";
import { FINAL_FRAME_INDEX, FRAMES } from "./workflow-data";

const DESCRIPTION =
  "Animated diagram of an AI agent at work. A user asks it to find qualified leads and prepare personalized outreach. " +
  "The agent plans the task, searches the web, queries the database and CRM, enriches contacts through an API, " +
  "drafts personalized emails and writes the results back to the CRM, finishing with 42 qualified leads, " +
  "outreach ready to send and updated CRM records.";

const STATIC_SCENE: Omit<SceneProps, "motionEnabled"> = { frame: FRAMES[0], run: 0, live: false };

interface AgentWorkflowAnimationProps {
  className?: string;
}

/**
 * Hero animation: User request → AI agent → tools → business result.
 *
 * Every layout is server-rendered in its idle state (no layout shift, no
 * pop-in) and switched with CSS breakpoints. After hydration only the visible
 * layout runs the timeline, and only while it is on screen in a visible tab.
 * Reduced motion shows the finished run as a still, fully legible diagram.
 */
export function AgentWorkflowAnimation({ className }: AgentWorkflowAnimationProps) {
  const rootRef = useRef<HTMLElement>(null);
  const layout = useActiveLayout();
  const reducedMotion = usePrefersReducedMotion();
  const pageVisible = usePageVisible();
  // Start once the diagram is properly in view; after that, pause only when it is fully off-screen.
  const hasEnteredView = useInView(rootRef, { amount: 0.45, once: true });
  const onScreen = useInView(rootRef, { amount: "some" });

  const playing = layout !== null && hasEnteredView && onScreen && pageVisible && !reducedMotion;
  const { index, run } = useWorkflowTimeline(playing);
  const frame = reducedMotion ? FRAMES[FINAL_FRAME_INDEX] : FRAMES[index];

  const propsFor = (target: SceneLayout): SceneProps =>
    target === layout
      ? { frame, run, live: playing, motionEnabled: !reducedMotion }
      : { ...STATIC_SCENE, motionEnabled: !reducedMotion };

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <figure ref={rootRef} className={cn("relative m-0", className)}>
          <figcaption className="sr-only">{DESCRIPTION}</figcaption>
          <div aria-hidden="true" className="select-none">
            <div className="md:hidden">
              <MobileScene {...propsFor("mobile")} />
            </div>
            <div className="hidden md:block lg:hidden">
              <TabletScene {...propsFor("tablet")} />
            </div>
            <div className="hidden lg:block">
              <DesktopScene {...propsFor("desktop")} />
            </div>
          </div>
        </figure>
      </MotionConfig>
    </LazyMotion>
  );
}
