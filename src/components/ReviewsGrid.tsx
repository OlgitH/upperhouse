"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { Review } from "@/content";
import { Container } from "@/components/ui";

const FILTERS = ["All reviews", "Starlight Cottage", "Black Hill Barn"] as const;

export function ReviewsGrid({ reviews }: { reviews: Review[] }) {
  type Filter = (typeof FILTERS)[number];
  const [filter, setFilter] = useState<Filter>("All reviews");
  const [pending, setPending] = useState<Filter | null>(null);
  const cards = useRef(new Map<number, HTMLElement>());
  const before = useRef<Map<number, DOMRect> | null>(null);
  const matches = (r: Review, f: Filter) => f === "All reviews" || r.property === f;
  const shown = reviews.map((r, i) => ({ r, i })).filter(({ r }) => matches(r, filter));

  const choose = (f: Filter) => {
    if (f === filter || pending) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setFilter(f);
    setPending(f); // cards that won't survive fade out first
    window.setTimeout(() => {
      before.current = new Map([...cards.current].map(([k, el]) => [k, el.getBoundingClientRect()]));
      setFilter(f);
      setPending(null);
    }, 220);
  };

  // FLIP: slide surviving cards from their old spot to the new masonry spot; new cards rise in.
  useLayoutEffect(() => {
    const prev = before.current;
    before.current = null;
    if (!prev) return;
    let n = 0;
    cards.current.forEach((el, k) => {
      const old = prev.get(k);
      const now = el.getBoundingClientRect();
      if (old) {
        const dx = old.left - now.left, dy = old.top - now.top;
        if (dx || dy) el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "none" }], { duration: 500, easing: "cubic-bezier(.2,.8,.2,1)" });
      } else {
        el.animate([{ opacity: 0, transform: "translateY(24px) scale(.96)" }, { opacity: 1, transform: "none" }], { duration: 450, delay: 80 + 50 * n++, easing: "cubic-bezier(.2,.8,.2,1)", fill: "backwards" });
      }
    });
  }, [filter]);

  return (
    <>
      <Container>
        <div role="group" aria-label="Filter reviews" className="mb-10 flex flex-wrap gap-x-8 gap-y-3">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => choose(f)}
              className={`font-display text-xl font-bold text-ink underline-offset-8 transition-colors hover:text-accent ${filter === f ? "underline decoration-2" : "no-underline"}`}>
              {f}
            </button>
          ))}
        </div>
      </Container>
      <Container className="columns-1 gap-4 md:columns-2 lg:columns-3 [&>*]:mb-4">
        {shown.map(({ r, i }) => (
          <figure
            key={i}
            ref={(el) => { if (el) cards.current.set(i, el); else cards.current.delete(i); }}
            className={`break-inside-avoid rounded-3xl p-8 transition-[opacity,transform] duration-200 ${pending && !matches(r, pending) ? "scale-95 opacity-0" : ""} ${r.property === "Starlight Cottage" ? "bg-brand-700 text-white" : "bg-sand"}`}>
            <figcaption className={`mb-4 text-xs font-bold uppercase tracking-[0.2em] ${r.property === "Starlight Cottage" ? "text-sand" : "text-brand-700"}`}>
              {r.property} · {r.date}
            </figcaption>
            <blockquote className="font-display text-xl font-normal leading-[1.55]">“{r.quote}”</blockquote>
            {r.ratings && (
              <p className="mt-4 text-xs font-bold uppercase tracking-wider opacity-70">
                Comfort {r.ratings.comfort} · Cleanliness {r.ratings.cleanliness} · Equipment {r.ratings.equipment} · Location {r.ratings.location}
              </p>
            )}
          </figure>
        ))}
      </Container>
    </>
  );
}
