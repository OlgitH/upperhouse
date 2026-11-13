import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/content";
import { HeaderShell } from "./HeaderShell";
import { NavDropdown } from "./NavDropdown";
import { Container, navLinkCls } from "./ui";

type Item = (typeof nav)[number];

/** Links either side of the centred logo. */
const left = nav.slice(0, 3);
const right = nav.slice(3);

function DesktopLinks({ items, align }: { items: readonly Item[]; align: "end" | "start" }) {
  return (
    <nav aria-label={align === "end" ? "Main" : "More"} className="hidden lg:block lg:h-14">
      <ul className={`flex h-full items-stretch ${align === "end" ? "justify-end" : "justify-start"}`}>
        {items.map((item) =>
          "children" in item ? (
            <NavDropdown key={item.href} label={item.label} items={item.children} />
          ) : (
            <li key={item.href} className="group flex">
              <Link href={item.href} className={navLinkCls}>
                {item.label}
              </Link>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}

export function Header() {
  return (
    <HeaderShell>
      <Container className="grid h-20 grid-cols-[1fr_auto_1fr] items-center lg:h-24">
        <div className="flex h-full items-center justify-end">
          <DesktopLinks items={left} align="end" />
        </div>

        <Link href="/" aria-label={`${site.name} home`} className="flex px-6 lg:px-10">
          <Image src="/brand/logo.png" alt={site.name} width={600} height={137} priority className="h-11 w-auto lg:h-14" />
        </Link>

        <div className="flex h-full items-center justify-end lg:justify-start">
          <DesktopLinks items={right} align="start" />

          {/* Mobile menu (no JS needed) */}
          <details className="group lg:hidden">
            <summary className="cursor-pointer list-none bg-sand px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-ink">
              <span className="group-open:hidden">Menu</span>
              <span className="hidden group-open:inline">Close</span>
            </summary>
            <nav aria-label="Mobile" className="absolute inset-x-0 top-full bg-brand-950">
              <ul className="mx-auto max-w-7xl px-5 py-4 text-center sm:px-8">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="block py-3 text-lg font-medium uppercase tracking-[0.16em]">
                      {item.label}
                    </Link>
                    {"children" in item && (
                      <ul className="mb-2 bg-brand-800">
                        {item.children.map((c) => (
                          <li key={c.href}>
                            <Link href={c.href} className="block px-4 py-3 text-sm uppercase tracking-[0.14em]">
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
                <li className="pt-3">
                  <a href={site.phoneHref} className="block bg-sand px-5 py-4 text-center font-bold text-ink">
                    Call {site.phone}
                  </a>
                </li>
              </ul>
            </nav>
          </details>
        </div>
      </Container>
    </HeaderShell>
  );
}
