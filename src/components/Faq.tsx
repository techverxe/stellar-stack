"use client";

import { useState } from "react";
import type { FaqItem } from "@/content/copy/types";

/**
 * Built on <details>/<summary> rather than a div-and-onClick accordion, so it
 * opens with the keyboard, is announced correctly, and still works before
 * hydration. React only tracks open state here to drive the chevron rotation.
 */
export function Faq({ items, title }: { items: FaqItem[]; title?: string }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="faq">
      {title && <h2 className="faq-title">{title}</h2>}
      <div className="faq-list">
        {items.map((item, i) => (
          <details
            key={i}
            className="faq-item"
            open={open === i}
            onToggle={(e) => {
              const isOpen = (e.currentTarget as HTMLDetailsElement).open;
              setOpen(isOpen ? i : (prev) => (prev === i ? null : prev));
            }}
          >
            <summary>
              <span>{item.q}</span>
              <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                <path
                  d="M4 6.5L8 10.5L12 6.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </summary>
            <div className="faq-body">
              <p>{item.a}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
