import { NextResponse } from "next/server";

const COTTAGES = ["starlight-cottage", "black-hill-barn"];
const ISO = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Receives reservation requests from the booking form.
 *
 * TODO: deliver the enquiry. Options: Resend / Postmark / SMTP to
 * reservations@upperhouseandspa.co.uk, and/or store it in a Payload
 * `enquiries` collection once the CMS is in. For now it only logs.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: pretend success so bots don't retry.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const str = (k: string) => (typeof body[k] === "string" ? (body[k] as string).trim() : "");
  const email = str("email");
  const name = str("name");
  const arrival = str("arrival");
  const departure = str("departure");

  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Please provide your name and a valid email." }, { status: 400 });
  }
  if (!COTTAGES.includes(str("cottage"))) {
    return NextResponse.json({ error: "Unknown cottage." }, { status: 400 });
  }
  if (!ISO.test(arrival) || !ISO.test(departure) || departure <= arrival) {
    return NextResponse.json({ error: "Please choose valid dates." }, { status: 400 });
  }

  console.log("[enquiry]", JSON.stringify({ ...body, receivedAt: new Date().toISOString() }));

  return NextResponse.json({ ok: true });
}
