"use client";

import type { ReactNode } from "react";

import { useCalBooking } from "@/hooks/useCalBooking";
import { cn } from "@/lib/utils";

type CalBookingButtonProps = {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

export function CalBookingButton({ className, children, onClick }: CalBookingButtonProps) {
  const { openBooking } = useCalBooking();

  return (
    <button
      type="button"
      className={cn("cursor-pointer", className)}
      onClick={() => {
        onClick?.();
        void openBooking();
      }}
    >
      {children}
    </button>
  );
}
