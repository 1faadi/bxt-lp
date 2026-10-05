"use client";

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

const CAL_NAMESPACE = "website-call";
const CAL_LINK = "imuhammad/website-call";
const CAL_FALLBACK_URL = "https://cal.com/imuhammad/website-call";

const calUiConfig = {
  theme: "light",
  layout: "month_view",
  hideEventTypeDetails: false,
  cssVarsPerTheme: {
    light: {
      "cal-brand": "#f47820",
      "cal-brand-emphasis": "#ff964c",
      "cal-brand-text": "#111111",
      "cal-brand-subtle": "#f8e0cc",
      "cal-brand-accent": "#111111",
      "cal-text": "#686660",
      "cal-text-emphasis": "#111111",
      "cal-text-subtle": "#686660",
      "cal-text-muted": "#a39f97",
      "cal-text-inverted": "#f4f2ec",
      "cal-bg": "#f4f2ec",
      "cal-bg-emphasis": "#eceae4",
      "cal-bg-subtle": "#f8f7f3",
      "cal-bg-muted": "#eceae4",
      "cal-bg-inverted": "#111111",
      "cal-border": "#d7d3cb",
      "cal-border-emphasis": "#111111",
      "cal-border-subtle": "#d7d3cb",
      "cal-border-muted": "#e4e0d8",
      "cal-border-booker": "#d7d3cb",
    },
    dark: {
      "cal-brand": "#f47820",
      "cal-brand-emphasis": "#ff964c",
      "cal-brand-text": "#111111",
      "cal-brand-subtle": "#5c3010",
      "cal-brand-accent": "#111111",
      "cal-text": "#f5f1e9",
      "cal-text-emphasis": "#f5f1e9",
      "cal-text-subtle": "#b7b2a8",
      "cal-text-muted": "#8a8680",
      "cal-text-inverted": "#111111",
      "cal-bg": "#111111",
      "cal-bg-emphasis": "#1a1a1a",
      "cal-bg-subtle": "#1a1a1a",
      "cal-bg-muted": "#161616",
      "cal-bg-inverted": "#f4f2ec",
      "cal-border": "#2e2e2e",
      "cal-border-emphasis": "#f47820",
      "cal-border-subtle": "#2a2a2a",
      "cal-border-muted": "#242424",
      "cal-border-booker": "#2e2e2e",
    },
  },
} as const;

let calUiReady: Promise<void> | null = null;
let backdropCloseAttached = false;

function ensureBackdropClosesModal() {
  if (backdropCloseAttached) return;
  backdropCloseAttached = true;

  document.addEventListener("click", (event) => {
    const path = event.composedPath();
    const hitModal = path.some(
      (node) => node instanceof HTMLElement && node.tagName === "CAL-MODAL-BOX",
    );
    if (!hitModal) return;

    const hitScheduler = path.some((node) => node instanceof HTMLIFrameElement);
    if (hitScheduler) return;

    document.querySelectorAll("cal-modal-box").forEach((modal) => {
      modal.setAttribute("state", "closed");
    });
  });
}

function ensureCalUi() {
  if (!calUiReady) {
    calUiReady = (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal("ui", calUiConfig);
    })();
  }

  return calUiReady;
}

export function useCalBooking() {
  useEffect(() => {
    ensureBackdropClosesModal();
    void ensureCalUi().catch((error: unknown) => {
      calUiReady = null;
      console.error("Failed to initialize Cal.com embed:", error);
    });
  }, []);

  const openBooking = async () => {
    try {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal("modal", {
        calLink: CAL_LINK,
        config: {
          layout: "month_view",
          theme: "light",
        },
      });
    } catch (error) {
      console.error("Failed to open Cal.com modal:", error);
      window.open(CAL_FALLBACK_URL, "_blank");
    }
  };

  return { openBooking };
}
