"use client";

import { useSyncExternalStore, type ReactNode } from "react";

function subscribe(cb: () => void) {
  window.addEventListener("scroll", cb, { passive: true });
  window.addEventListener("resize", cb);
  return () => {
    window.removeEventListener("scroll", cb);
    window.removeEventListener("resize", cb);
  };
}

/** True once the visible page hero has scrolled out of view (or the page has no hero). */
function pastHero() {
  const hero = [...document.querySelectorAll<HTMLElement>("[data-hero]")].find((h) => h.offsetHeight > 0);
  if (!hero) return true;
  return window.scrollY > hero.offsetTop + hero.offsetHeight;
}

/**
 * Over the hero: an absolutely positioned, transparent header that scrolls away with the page
 * (the hero draws the blue fade or solid bar behind it, depending on its photo).
 * Past the hero: solid blue, fixed to the top, sliding in.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const past = useSyncExternalStore(subscribe, pastHero, () => false);

  return (
    <header
      className={`inset-x-0 top-0 z-50 text-white ${past ? "header-in fixed bg-sky/90 backdrop-blur-md" : "absolute"}`}
    >
      {children}
    </header>
  );
}
