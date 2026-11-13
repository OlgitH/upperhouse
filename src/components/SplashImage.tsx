import type { Photo as PhotoT } from "@/content";
import { Photo } from "./Photo";

/**
 * Full-bleed, full-width feature photograph. Image only, no text over it.
 * Adjust the crop per use with `position` / `mobilePosition` (CSS object-position, e.g. "50% 40%").
 */
export function SplashImage({
  photo, position, mobilePosition, className = "",
}: { photo: PhotoT; position?: string; mobilePosition?: string; className?: string }) {
  return (
    <Photo
      photo={photo}
      sizes="100vw"
      position={position}
      mobilePosition={mobilePosition}
      className={`h-[80vh] min-h-[420px] max-h-[1000px] w-full ${className}`}
    />
  );
}
