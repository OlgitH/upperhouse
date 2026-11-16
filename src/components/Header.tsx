import { Logo } from "./Logo";
import Link from "next/link";
import { nav, site } from "@/content";
import { HeaderShell } from "./HeaderShell";
import { MobileMenu } from "./MobileMenu";
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
          <Logo className="h-11 lg:h-14" />
        </Link>

        <div className="flex h-full items-center justify-end lg:justify-start">
          <DesktopLinks items={right} align="start" />

          <MobileMenu items={nav} phone={site.phone} phoneHref={site.phoneHref} />
        </div>
      </Container>
    </HeaderShell>
  );
}
