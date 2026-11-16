"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Slides up and fades in each time it scrolls into view, and resets when it leaves (or only the first time, with `once`).
 * `delay` (ms) staggers siblings. Honours prefers-reduced-motion (shown immediately, no movement).
 */
export function Reveal({
  children,
  delay = 0,
  once = false,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  /** Only animate the first time it scrolls into view (default: repeats each time it re-enters). */
  once?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setShown(entry.isIntersecting);
        if (once && entry.isIntersecting) io.disconnect();
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
      className={`transition-[opacity,transform] duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        shown ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
