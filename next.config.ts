import type { NextConfig } from "next";

/**
 * Redirects from the legacy upperhouseandspa.co.uk .html URLs so existing
 * links and search rankings carry over to the new structure.
 */
const legacyRedirects = [
  ["/index.html", "/"],
  ["/stay.html", "/cottages"],
  ["/stay/starlight-cottage.html", "/cottages/starlight-cottage"],
  ["/stay/black-hill-barn.html", "/cottages/black-hill-barn"],
  ["/reservations.html", "/cottages"],
  ["/experience.html", "/experience"],
  ["/experience/star-gazing.html", "/experience#star-gazing"],
  ["/experience/craswall.html", "/experience#craswall"],
  ["/experience/walking-holidays.html", "/experience#walking"],
  ["/experience/cycling.html", "/experience#cycling"],
  ["/revive/sauna.html", "/spa"],
  ["/stories.html", "/reviews"],
  ["/stories/what-our-guests-say.html", "/reviews"],
  ["/directions.html", "/location"],
  ["/contact.html", "/contact"],
  // Short-lived names used by older versions of the site
  ["/stay/hayloft.html", "/cottages/starlight-cottage"],
  ["/stay/long-barn.html", "/cottages/black-hill-barn"],
] as const;

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    // Add remote hosts here (e.g. Payload media / CDN) when you move to a CMS.
    remotePatterns: [],
  },
  async redirects() {
    return legacyRedirects.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
