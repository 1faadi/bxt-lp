"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: 0 | 80 | 160 | 240;
  variant?: "rise" | "scale";
}

export function Reveal({ children, className = "", delay = 0, variant = "rise" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6%" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${variant === "scale" ? "reveal-scale" : ""} ${visible ? "is-visible" : ""} ${delay === 80 ? "delay-80" : delay === 160 ? "delay-160" : delay === 240 ? "delay-240" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
