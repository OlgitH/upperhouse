"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { navLinkBase } from "./ui";

type Child = {
  label: string;
  href: string;
  note: string;
  photo: { src: string; alt: string; focus?: string };
};

/**
 * Nav item with a feature panel. The label still links to its page; the red
 * chevron is a button that toggles the panel (click / Enter / Space).
 * Closes on outside click, Escape, or choosing a tile.
 */
export function NavDropdown({ label, items }: { label: string; items: readonly Child[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const [reach, setReach] = useState<number>();

  // Stretch the panel down to just above the bottom of the page hero (only while the header sits over the hero).
  useLayoutEffect(() => {
    const measure = () => {
      const hero = [...document.querySelectorAll<HTMLElement>("[data-hero]")].find((h) => h.offsetHeight > 0);
      const p = panel.current;
      if (!hero || !p) return setReach(undefined);
      const h = hero.getBoundingClientRect().bottom - p.getBoundingClientRect().top - 48; // stop just short of the hero's bottom edge
      setReach(h > 288 ? Math.round(h) : undefined);
    };
    if (open) measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const active = open ? "!decoration-accent" : "";
  const panelId = `nav-panel-${label.toLowerCase()}`;

  const canHover = () => window.matchMedia("(hover: hover)").matches;

  // Whole item is the trigger. Mouse: hover opens, click keeps it open. Touch / keyboard: toggle.
  const onTrigger = (e: React.MouseEvent) => {
    if (e.detail === 0 || !canHover()) setOpen((o) => !o);
    else setOpen(true);
  };

  return (
    <li
      ref={ref}
      className="group flex"
      onMouseEnter={() => canHover() && setOpen(true)}
      onMouseLeave={() => canHover() && setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onTrigger}
        className={`${navLinkBase} px-5 ${active}`}
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

      {/* Invisible bridge so the pointer can travel from the link down to the panel without closing it */}
      {open && <span aria-hidden className="absolute inset-x-0 top-full h-10" />}

      <div
        id={panelId}
        ref={panel}
        style={reach ? { height: reach } : undefined}
        className={`absolute inset-x-0 top-full bg-brand-700 transition-[opacity,visibility] duration-300 ease-out motion-reduce:transition-none ${
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
                <span aria-hidden className="absolute inset-x-0 bottom-0 h-1 bg-accent opacity-0 transition-opacity group-hover/tile:opacity-100" />
                <span className="relative px-8">
                  <span className="block text-2xl font-bold uppercase tracking-[0.18em]">{c.label}</span>
                  <span className="mt-2 block text-xs font-semibold uppercase tracking-[0.22em]">{c.note}</span>
                </span>
              </Link>
            </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
}
