"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Every page change lands at the very top. Instant (the site has smooth scrolling on
 * <html>), and skipped for URLs with a #hash so in-page anchors still work.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
