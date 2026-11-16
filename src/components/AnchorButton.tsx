"use client";

import type { ComponentProps } from "react";
import { buttonClass } from "./ui";

/** In-page anchor button that smoothly scrolls to its target (done here rather than left to the router). */
export function AnchorButton({
  variant = "light",
  className = "",
  href,
  children,
  ...props
}: Omit<ComponentProps<"a">, "href"> & { href: `#${string}`; variant?: Parameters<typeof buttonClass>[0] }) {
  return (
    <a
      href={href}
      className={`${buttonClass(variant)} ${className}`}
      onClick={(e) => {
        const target = document.getElementById(href.slice(1));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
      {...props}
    >
      {children}
    </a>
  );
}
