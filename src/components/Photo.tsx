import Image from "next/image";
import type { CSSProperties } from "react";
import type { Photo as PhotoT } from "@/content";

type Props = {
  photo: PhotoT;
  /** Tailwind classes for the wrapper; must give it a height/aspect. */
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** CSS object-position from the md breakpoint up, e.g. "50% 30%". Defaults to photo.focus. */
  position?: string;
  /** CSS object-position below md. Defaults to `position`. */
  mobilePosition?: string;
};

export function Photo({ photo, className = "", sizes = "100vw", priority, position, mobilePosition }: Props) {
  const desktop = position ?? photo.focus ?? "50% 50%";
  const mobile = mobilePosition ?? position ?? photo.focus ?? "50% 50%";
  return (
    <div className={`relative overflow-hidden bg-brand-900 ${className}`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="[object-position:var(--pos-m)] object-cover md:[object-position:var(--pos)]"
        style={{ "--pos": desktop, "--pos-m": mobile } as CSSProperties}
      />
    </div>
  );
}
