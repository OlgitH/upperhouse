"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { navLinkBase } from "./ui";

/**
 * The panel's bottom edge follows the skyline of Black Hill in the hero photo: high on the left,
 * a long gentle slope, then dropping away to the right. Offsets are measured up from the panel's bottom.
 */
const RIDGE =
  "polygon(0 0, 100% 0, 100% 100%, 85% calc(100% - 9px), 79% calc(100% - 24px), 73% calc(100% - 44px), 67% calc(100% - 59px), 61% calc(100% - 64px), 42% calc(100% - 70px), 20% calc(100% - 77px), 0 calc(100% - 90px))";

type Child = {
  label: string;
  href: string;
  note: string;
  photo: { src: string; alt: string; focus?: string };
};

/**
 * Nav item with a feature panel. The whole item is a button that toggles the
 * panel on click / Enter / Space (not on hover).
 * Closes on outside click, Escape, or choosing a tile.
 */
export function NavDropdown({ label, items }: { label: string; items: readonly Child[] }) {
  const [open, setOpen] = useState(false);
  // The page hero the panel and white-out are drawn into (found when the menu is opened).
  const [heroEl, setHeroEl] = useState<HTMLElement | null>(null);
  const pathname = usePathname();
  const ref = useRef<HTMLLIElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  // Find the hero up front (and again after every page change), so the panel is already in place, closed, before the first click and fades in like every later one.
  useEffect(() => {
    const id = requestAnimationFrame(() =>
      setHeroEl([...document.querySelectorAll<HTMLElement>("[data-hero]")].find((h) => h.offsetHeight > 0) ?? null),
    );
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (ref.current && !ref.current.contains(t) && !panel.current?.contains(t)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    // Scrolling away closes it
    const startY = window.scrollY;
    const onScroll = () => {
      if (Math.abs(window.scrollY - startY) > 40) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, [open]);

  const active = open ? "!decoration-accent" : "";
  const panelId = `nav-panel-${label.toLowerCase()}`;

  // Click / tap / Enter / Space toggles the panel; hovering does nothing.
  const onTrigger = () => {
    // The panel and the white-out are drawn inside the page hero, under the hero's blue fade.
    setHeroEl([...document.querySelectorAll<HTMLElement>("[data-hero]")].find((h) => h.offsetHeight > 0) ?? null);
    setOpen((o) => !o);
  };

  return (
    <li ref={ref} className="group flex">
      {/* White-out over just the hero while the panel is open (drawn inside the hero, so the header and panel stay on top) */}
      {heroEl &&
        createPortal(
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-x-0 bottom-0 top-20 z-10 bg-white/90 lg:top-24 transition-opacity duration-700 ease-in-out motion-reduce:transition-none ${
              open ? "opacity-100" : "opacity-0"
            }`}
          />,
          heroEl,
        )}

      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onTrigger}
        className={`${navLinkBase} cursor-pointer px-5 ${active}`}
      >
        {label}
        <svg
          aria-hidden
          width="12"
          height="8"
          viewBox="0 0 12 8"
          className={`ml-3 text-accent transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
        >
          <path d="M1 1.5 6 6.5 11 1.5" fill="none" stroke="currentColor" strokeWidth="2.5" />
        </svg>
      </button>

      {heroEl && createPortal(
      <div
        id={panelId}
        ref={panel}
        style={{ clipPath: RIDGE }}
        className={`absolute inset-0 z-[15] pt-20 lg:pt-24 transition-[opacity,visibility] duration-700 ease-in-out motion-reduce:transition-none ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <ul className="grid h-full grid-cols-2 gap-px bg-brand-700">
          {items.map((c, i) => {
            // The outer edge of the first/last photo dissolves into the panel colour; text stays fully opaque.
            const mask = `linear-gradient(to ${i === 0 ? "right" : "left"}, rgba(0,0,0,0.3) 0%, black 34%)`;
            const edge = i === 0 || i === items.length - 1;
            return (
            <li key={c.href} className="bg-brand-700">
              <Link
                href={c.href}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className="group/tile relative flex h-full min-h-[18rem] items-center justify-start overflow-hidden text-left text-white"
              >
                <span
                  aria-hidden
                  className="absolute inset-0"
                  style={edge ? { maskImage: mask, WebkitMaskImage: mask } : undefined}
                >
                  <Image src={c.photo.src} alt="" fill sizes="50vw" className="object-cover" style={{ objectPosition: c.photo.focus }} />
                  <span className="absolute inset-0 bg-black/35 transition-colors group-hover/tile:bg-black/20" />
                </span>
                <span className="relative px-8">
                  <span className="block text-2xl font-bold uppercase tracking-[0.18em]">{c.label}</span>
                  <span className="mt-2 block text-xs font-semibold uppercase tracking-[0.22em]">{c.note}</span>
                </span>
              </Link>
            </li>
            );
          })}
        </ul>
      </div>,
        heroEl,
      )}
    </li>
  );
}
