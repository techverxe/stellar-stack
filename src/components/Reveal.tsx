"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Scroll-reveal wrapper.
 *
 * The element starts visible in the markup and is only hidden once JavaScript
 * confirms it can animate. That ordering matters: if CSS hid it up front, a
 * visitor with JavaScript disabled, or one hitting a hydration error, would
 * get a blank page instead of a static site. A marketing page that disappears
 * without JS is worse than one that does not animate.
 *
 * `prefers-reduced-motion` is honoured by skipping the observer entirely.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  /** Stagger in milliseconds, for lists. */
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "header";
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    setArmed(true);

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const state = !armed ? "is-static" : shown ? "is-in" : "is-out";

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${state} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
