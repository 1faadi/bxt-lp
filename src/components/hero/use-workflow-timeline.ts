"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

import { FIRST_RUN_IDLE_MS, FRAMES } from "./workflow-data";

export type SceneLayout = "mobile" | "tablet" | "desktop";

/* -------------------------------------------------------------------------- */
/* Media / visibility stores — server snapshots keep hydration deterministic  */
/* -------------------------------------------------------------------------- */

const DESKTOP_QUERY = "(min-width: 1024px)"; // Tailwind `lg`
const TABLET_QUERY = "(min-width: 768px)"; // Tailwind `md`
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToQueries(queries: string[], onChange: () => void) {
  const lists = queries.map((query) => window.matchMedia(query));
  lists.forEach((list) => list.addEventListener("change", onChange));
  return () => lists.forEach((list) => list.removeEventListener("change", onChange));
}

const subscribeLayout = (onChange: () => void) => subscribeToQueries([DESKTOP_QUERY, TABLET_QUERY], onChange);

function getLayout(): SceneLayout {
  if (window.matchMedia(DESKTOP_QUERY).matches) return "desktop";
  if (window.matchMedia(TABLET_QUERY).matches) return "tablet";
  return "mobile";
}

/** The layout that should animate. `null` during SSR and hydration. */
export function useActiveLayout(): SceneLayout | null {
  return useSyncExternalStore(subscribeLayout, getLayout, () => null);
}

const subscribeReducedMotion = (onChange: () => void) => subscribeToQueries([REDUCED_MOTION_QUERY], onChange);

export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}

function subscribeVisibility(onChange: () => void) {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}

export function usePageVisible() {
  return useSyncExternalStore(
    subscribeVisibility,
    () => document.visibilityState === "visible",
    () => true,
  );
}

/* -------------------------------------------------------------------------- */
/* Timeline                                                                   */
/* -------------------------------------------------------------------------- */

interface TimelineState {
  index: number;
  /** Completed loops — drives the task id and clock micro-details. */
  run: number;
}

/**
 * Steps through FRAMES with one timer per frame. React only re-renders at
 * frame boundaries; everything in between is handled by Motion.
 * Pausing simply stops scheduling — the scene holds its current frame.
 */
export function useWorkflowTimeline(playing: boolean): TimelineState {
  const [state, setState] = useState<TimelineState>({ index: 0, run: 0 });

  useEffect(() => {
    if (!playing) return;

    const isFirstFrameEver = state.run === 0 && state.index === 0;
    const delay = isFirstFrameEver ? FIRST_RUN_IDLE_MS : FRAMES[state.index].duration;

    const timer = window.setTimeout(() => {
      setState((current) =>
        current.index + 1 >= FRAMES.length
          ? { index: 0, run: current.run + 1 }
          : { index: current.index + 1, run: current.run },
      );
    }, delay);

    return () => window.clearTimeout(timer);
  }, [playing, state.index, state.run]);

  return state;
}
