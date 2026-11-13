"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Every page change lands at the very top. Instant (the site has smooth scrolling on
 * <html>), and skipped for URLs with a #hash so in-page anchors still work.
 * Runs after Next's own scroll handling (and after the URL has updated), so it has the last word.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    const top = () => {
      if (window.location.hash) return;
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    };
    top();
    const raf = requestAnimationFrame(top);
    const t = window.setTimeout(top, 60);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
    };
  }, [pathname]);

  // Clicking a link to the page you're already on doesn't change the path, so handle it here.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.origin !== window.location.origin || a.hash) return;
      if (a.pathname === window.location.pathname) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
