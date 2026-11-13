import type { BookedRange, Cottage } from "./types";

/**
 * !! DEMO DATA !!  Replace with the real calendar.
 *
 * Ranges are [from, to): `from` is the first occupied night, `to` is the
 * check-out day (so it can be someone else's check-in day).
 *
 * Later this can come from an iCal feed (Airbnb/Booking.com/Google Calendar)
 * or a Payload `bookings` collection — only the body of this function changes.
 */
const booked: Record<Cottage["slug"], BookedRange[]> = {
  "starlight-cottage": [
    { from: "2026-11-13", to: "2026-11-16" },
    { from: "2026-12-23", to: "2027-01-02" },
    { from: "2027-02-12", to: "2027-02-15" },
  ],
  "black-hill-barn": [
    { from: "2026-11-20", to: "2026-11-23" },
    { from: "2026-12-18", to: "2026-12-27" },
    { from: "2027-01-08", to: "2027-01-11" },
  ],
};

export async function getBookedRanges(slug: Cottage["slug"]): Promise<BookedRange[]> {
  return booked[slug] ?? [];
}
