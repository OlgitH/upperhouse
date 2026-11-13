# Upper House & Spa

Next.js (App Router, Tailwind v4) site for upperhouseandspa.co.uk. Static first, structured to move to Payload CMS later.

```bash
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Structure

| Path | Purpose |
| --- | --- |
| `src/content/` | **All site content + async getters.** Pages only read via `src/content/index.ts`. |
| `src/content/availability.ts` | Booked date ranges (currently DEMO data). |
| `src/components/BookingPanel.tsx` | Availability calendar + enquiry form (client). |
| `src/components/RatesTable.tsx` | Pricing, deliberately separate from availability. |
| `src/app/api/enquiry/route.ts` | Receives enquiries. Currently logs only — wire up email. |
| `next.config.ts` | Redirects from the old `.html` URLs. |
| `public/images/` | Photography; referenced from `src/content/photos.ts`. |

## Moving to Payload later

1. Add Payload collections mirroring `src/content/types.ts`: `cottages`, `reviews`, `experiences`, `enquiries`, `bookings` (or an iCal source).
2. Re-implement the getters in `src/content/index.ts` / `availability.ts` with `payload.find()`. Signatures stay the same, so no page or component changes.
3. Add the media host to `images.remotePatterns` in `next.config.ts`.

## TODO before launch

- Replace demo availability in `src/content/availability.ts` (or connect an iCal feed).
- Wire `/api/enquiry` to email (Resend/Postmark/SMTP) and set `NEXT_PUBLIC_SITE_URL`.
- Add season date ranges to the rates table once confirmed.
- Replace/add photography (hero images are in `src/content/photos.ts`).
- Legacy pages not yet migrated/redirected: history, packing tips, terms & conditions.
# upperhouse
