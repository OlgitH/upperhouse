import type { ReactNode } from "react";
import type { Photo as PhotoT } from "@/content";
import { Photo } from "./Photo";
import { Container } from "./ui";

/** Full-bleed photograph with centred text sitting straight on it (flat light wash for legibility, no box). */
export function PageHero({
  photo, title, children, actions, aside, tall = true, lowered = true, heightClass = "min-h-[78vh]", introLeft = false, position, mobilePosition,
}: {
  photo: PhotoT;
  title: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
  /** Optional content to the right of the intro paragraph (the paragraph is then left-aligned). */
  aside?: ReactNode;
  tall?: boolean;
  /** Sits the title and buttons lower in the hero. */
  lowered?: boolean;
  /** Tailwind min-height class for the hero (default 78vh). */
  heightClass?: string;
  /** Left-align the intro text instead of centring it. */
  introLeft?: boolean;
  /** Where the photo sits in the frame from md up, as a CSS object-position, e.g. "50% 30%" (x y; lower y pushes the image down). */
  position?: string;
  /** Same, below md. Defaults to `position`. */
  mobilePosition?: string;
}) {
  return (
    <>
      <section data-hero className={`relative flex items-center justify-center text-center text-white ${heightClass} ${lowered ? "bg-sky" : ""}`}>
      <div className={lowered ? "absolute inset-x-0 bottom-0 top-[80px]" : "absolute inset-0"}>
        <Photo photo={photo} priority sizes="100vw" className="h-full w-full" position={position} mobilePosition={mobilePosition} />
      </div>
      <div aria-hidden className={`absolute inset-0 ${tall ? "bg-brand-950/15" : "bg-brand-950/35"}`} />
      <div aria-hidden className="header-fade pointer-events-none absolute inset-x-0 top-0 z-20 h-20 lg:h-24" />
      <Container className={`relative ${lowered ? "pb-16 pt-60" : "pb-20 pt-36"}`}>
        <h1
          className={`font-display mx-auto max-w-5xl text-balance font-bold uppercase leading-[1.15] tracking-[0em] ${
            tall ? "text-2xl sm:text-4xl lg:text-5xl" : "text-3xl sm:text-4xl lg:text-5xl"
          }`}
        >
          {title}
        </h1>
        <span aria-hidden className="mx-auto mt-6 block h-1 w-14 bg-accent" />
        {actions && <div className="mt-10 flex flex-wrap justify-center gap-3">{actions}</div>}
      </Container>
      </section>

      {/* The hero's sub text lives in its own intro section, below the image */}
      {children && (
        <section className={introLeft ? "pb-8 pt-16 sm:pb-10 sm:pt-24" : "py-16 sm:py-24"}>
          <Container className={aside ? "grid items-start gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20" : introLeft ? "" : "text-center"}>
            <p
              className={`font-display text-balance text-2xl font-bold leading-[1.6] text-brand-900 sm:text-3xl sm:leading-[1.6] ${
                aside ? "" : introLeft ? "max-w-[68rem]" : "mx-auto max-w-5xl"
              }`}
            >
              {children}
            </p>
            {aside}
          </Container>
        </section>
      )}
    </>
  );
}
