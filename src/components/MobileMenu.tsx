"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

type Item = { label: string; href: string; children?: readonly { label: string; href: string }[] };

/** Burger toggle + overlay for small screens. Closes on outside tap, Escape or choosing a link. */
export function MobileMenu({ items, phone, phoneHref }: { items: readonly Item[]; phone: string; phoneHref: string }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const close = () => ref.current?.removeAttribute("open");

  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      const d = ref.current;
      if (d?.open && !d.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <details ref={ref} className="group lg:hidden">
      <summary
        aria-label="Menu"
        className="flex h-12 w-12 cursor-pointer list-none items-center justify-center [&::-webkit-details-marker]:hidden"
      >
        {/* Two square-ended bars, the top one shorter; they grow to equal length and cross into an X */}
        <span aria-hidden className="relative block h-6 w-6">
          <span className="absolute right-0 top-[8px] h-[2px] w-[14px] bg-current transition-all duration-300 ease-out group-open:right-[1px] group-open:top-[11px] group-open:w-[22px] group-open:rotate-45 motion-reduce:transition-none" />
          <span className="absolute right-0 top-[14px] h-[2px] w-6 bg-current transition-all duration-300 ease-out group-open:right-[1px] group-open:top-[11px] group-open:w-[22px] group-open:-rotate-45 motion-reduce:transition-none" />
        </span>
      </summary>
      <nav aria-label="Mobile" className="absolute inset-x-0 top-full bg-brand-950">
        <ul className="mx-auto max-w-7xl px-5 py-4 text-center sm:px-8">
          {items.map((item) => (
            <li key={item.href}>
              <Link href={item.href} onClick={close} className="block py-3 text-lg font-medium uppercase tracking-[0.16em]">
                {item.label}
              </Link>
              {item.children && (
                <ul className="mb-2">
                  {item.children.map((c) => (
                    <li key={c.href}>
                      <Link
                        href={c.href}
                        onClick={close}
                        className="inline-block py-2 text-sm uppercase tracking-[0.14em] underline decoration-accent decoration-1 underline-offset-[6px]"
                      >
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li className="pt-3">
            <a href={phoneHref} className="inline-block rounded-full bg-sand px-8 py-4 text-center font-bold text-ink">
              Call {phone}
            </a>
          </li>
        </ul>
      </nav>
    </details>
  );
}
