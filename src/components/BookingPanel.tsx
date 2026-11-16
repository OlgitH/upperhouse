"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import type { BookedRange, Cottage } from "@/content";
import { Container, Eyebrow } from "./ui";

/* ---------- date helpers (all ISO "YYYY-MM-DD", UTC-safe) ---------- */
const pad = (n: number) => String(n).padStart(2, "0");
const iso = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;
const parse = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
};
const addDays = (s: string, n: number) => {
  const d = parse(s);
  d.setUTCDate(d.getUTCDate() + n);
  return iso(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
};
const nightsBetween = (a: string, b: string) => Math.round((+parse(b) - +parse(a)) / 86_400_000);
const fmt = (s: string) =>
  parse(s).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const monthLabel = (y: number, m: number) =>
  new Date(Date.UTC(y, m, 1)).toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });

const subscribeNever = () => () => {};
function getToday() {
  const n = new Date();
  return iso(n.getFullYear(), n.getMonth(), n.getDate());
}

const DOW = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function expandNights(ranges: BookedRange[]) {
  const set = new Set<string>();
  for (const r of ranges) for (let d = r.from; d < r.to; d = addDays(d, 1)) set.add(d);
  return set;
}

/* ---------- component ---------- */
export function BookingPanel({ cottage, booked }: { cottage: Cottage; booked: BookedRange[] }) {
  const nights = useMemo(() => expandNights(booked), [booked]);

  // "Today" is only known on the client; null on the server so the page prerenders statically.
  const today = useSyncExternalStore(subscribeNever, getToday, () => null);
  const [monthOffset, setMonthOffset] = useState(0);
  const [start, setStart] = useState<string | null>(null);
  const [end, setEnd] = useState<string | null>(null);

  const cursor = useMemo(() => {
    if (!today) return null;
    const d = new Date(Date.UTC(+today.slice(0, 4), +today.slice(5, 7) - 1 + monthOffset, 1));
    return { y: d.getUTCFullYear(), m: d.getUTCMonth() };
  }, [today, monthOffset]);

  const rangeFree = (a: string, b: string) => {
    for (let d = a; d < b; d = addDays(d, 1)) if (nights.has(d)) return false;
    return true;
  };

  function pick(day: string) {
    if (!today || day < today) return;
    if (start && !end && day > start && rangeFree(start, day)) {
      setEnd(day);
      return;
    }
    if (!nights.has(day)) {
      setStart(day);
      setEnd(null);
    }
  }

  const clear = () => {
    setStart(null);
    setEnd(null);
  };

  const shift = (delta: number) => setMonthOffset((o) => Math.max(0, o + delta));

  const canGoBack = monthOffset > 0;
  const stayNights = start && end ? nightsBetween(start, end) : 0;

  return (
    <section id="book" className="bg-brand-100 py-20">
      <Container>
        <Eyebrow className="text-accent">Availability &amp; enquiry</Eyebrow>
        <h2 className="max-w-2xl font-display text-2xl font-semibold text-brand-900 sm:text-4xl">
          Check {cottage.name} and request your dates
        </h2>
        <p className="mt-5 max-w-2xl text-base text-brand-900/80">
          Pick your arrival and departure days to see what’s free. Nothing is charged online — send
          us a request and we’ll confirm availability, price and payment personally.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.25fr_1fr]">
          {/* Calendar */}
          <div className="rounded-3xl bg-white p-5 sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <button
                type="button"
                onClick={() => shift(-1)}
                disabled={!canGoBack}
                aria-label="Previous months"
                className="h-12 w-12 rounded-full bg-brand-700 text-xl font-bold text-white hover:bg-accent hover:text-white disabled:bg-brand-100 disabled:text-brand-200"
              >
                ←
              </button>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-700">
                {cursor ? "Select arrival, then departure" : "Loading calendar"}
              </p>
              <button
                type="button"
                onClick={() => shift(1)}
                aria-label="Next months"
                className="h-12 w-12 rounded-full bg-brand-700 text-xl font-bold text-white hover:bg-accent hover:text-white"
              >
                →
              </button>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {cursor && today
                ? [0, 1].map((offset) => {
                    const d = new Date(Date.UTC(cursor.y, cursor.m + offset, 1));
                    return (
                      <Month
                        key={offset}
                        y={d.getUTCFullYear()}
                        m={d.getUTCMonth()}
                        today={today}
                        nights={nights}
                        start={start}
                        end={end}
                        onPick={pick}
                        canEnd={(day) => !!start && !end && day > start && rangeFree(start, day)}
                      />
                    );
                  })
                : [0, 1].map((i) => <div key={i} className="h-72 animate-pulse bg-brand-100" />)}
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-brand-900">
              <Legend swatch="bg-cream" label="Available" />
              <Legend swatch="bg-brand-200" label="Booked" />
              <Legend swatch="bg-brand-700" label="Your dates" />
            </ul>
          </div>

          {/* Enquiry */}
          <EnquiryForm cottage={cottage} start={start} end={end} nights={stayNights} onClear={clear} />
        </div>
      </Container>
    </section>
  );
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <li className="flex items-center gap-2">
      <span className={`inline-block h-4 w-4 ${swatch}`} /> {label}
    </li>
  );
}

function Month({
  y, m, today, nights, start, end, onPick, canEnd,
}: {
  y: number; m: number; today: string; nights: Set<string>;
  start: string | null; end: string | null;
  onPick: (d: string) => void; canEnd: (d: string) => boolean;
}) {
  const first = new Date(Date.UTC(y, m, 1));
  const lead = (first.getUTCDay() + 6) % 7; // Monday-first
  const count = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  const cells: (string | null)[] = [...Array(lead).fill(null), ...Array.from({ length: count }, (_, i) => iso(y, m, i + 1))];

  return (
    <div>
      <h3 className="mb-4 font-display uppercase tracking-[0.005em] text-lg font-semibold text-brand-900">{monthLabel(y, m)}</h3>
      <div className="grid grid-cols-7 gap-1 text-center">
        {DOW.map((d) => (
          <span key={d} className="pb-2 text-[11px] font-bold uppercase tracking-wider text-brand-700">{d}</span>
        ))}
        {cells.map((day, i) => {
          if (!day) return <span key={`b${i}`} />;
          const past = day < today;
          const booked = nights.has(day);
          const isStart = day === start;
          const isEnd = day === end;
          const inRange = !!start && !!end && day > start && day < end;
          const asCheckout = canEnd(day);
          const disabled = past || (booked && !asCheckout);

          let cls = "bg-cream text-ink hover:bg-brand-700 hover:text-white";
          if (past) cls = "bg-transparent text-brand-900/25";
          else if (booked && asCheckout) cls = "bg-brand-200 text-ink hover:bg-brand-700 hover:text-white"; // departing on a booked day is fine
          else if (booked) cls = "bg-brand-200 text-brand-900/50 line-through";
          if (inRange) cls = "bg-brand-500 text-white";
          if (isStart || isEnd) cls = "bg-brand-700 text-white";

          return (
            <button
              key={day}
              type="button"
              disabled={disabled}
              onClick={() => onPick(day)}
              aria-label={`${fmt(day)}${booked ? ", booked" : past ? "" : ", available"}`}
              aria-pressed={isStart || isEnd}
              className={`aspect-square text-sm font-semibold transition-colors ${cls} ${disabled && !past ? "cursor-not-allowed" : ""}`}
            >
              {Number(day.slice(8))}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- enquiry form ---------- */
function EnquiryForm({
  cottage, start, end, nights, onClear,
}: { cottage: Cottage; start: string | null; end: string | null; nights: number; onClear: () => void }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!start || !end) {
      setError("Please choose your arrival and departure dates on the calendar.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, cottage: cottage.slug, arrival: start, departure: end, nights }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error ?? "Something went wrong");
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col justify-center rounded-3xl bg-brand-700 p-8 text-white sm:p-10">
        <p className="font-display text-2xl font-semibold">Thank you.</p>
        <p className="mt-4 text-base text-brand-100">
          Your request for {cottage.name}, {start && fmt(start)} to {end && fmt(end)}, is with us.
          We’ll be in touch shortly to confirm availability and arrange payment.
        </p>
      </div>
    );
  }

  const field = "w-full bg-cream px-4 py-3 text-base text-ink placeholder:text-ink/40 focus:bg-white";
  const label = "mb-1.5 block text-xs font-bold uppercase tracking-[0.16em] text-brand-100";

  return (
    <form onSubmit={submit} className="relative space-y-5 rounded-3xl bg-brand-700 p-6 text-white sm:p-8">
      <div className="rounded-2xl bg-brand-800 p-5">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-sand">Your stay · {cottage.name}</p>
        {start && end ? (
          <>
            <p className="mt-2 font-display text-lg font-semibold">{fmt(start)} → {fmt(end)}</p>
            <p className="text-brand-200">{nights} night{nights === 1 ? "" : "s"}</p>
            <button type="button" onClick={onClear} className="mt-2 text-sm underline hover:bg-accent hover:text-white">Clear dates</button>
          </>
        ) : (
          <p className="mt-2 text-brand-100">
            {start ? `Arriving ${fmt(start)}. Now pick your departure day.` : "Choose dates on the calendar."}
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div><label className={label} htmlFor="name">Name *</label><input id="name" name="name" required autoComplete="name" className={field} /></div>
        <div><label className={label} htmlFor="phone">Telephone</label><input id="phone" name="phone" type="tel" autoComplete="tel" className={field} /></div>
      </div>
      <div><label className={label} htmlFor="email">Email *</label><input id="email" name="email" type="email" required autoComplete="email" className={field} /></div>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
        <div><label className={label} htmlFor="adults">Adults</label><input id="adults" name="adults" type="number" min={1} max={cottage.sleeps + cottage.sleepsExtra} defaultValue={2} className={field} /></div>
        <div><label className={label} htmlFor="children">Child 5–12</label><input id="children" name="children" type="number" min={0} max={4} defaultValue={0} className={field} /></div>
        <div><label className={label} htmlFor="infants">Infant 0–4</label><input id="infants" name="infants" type="number" min={0} max={2} defaultValue={0} className={field} /></div>
        <div><label className={label} htmlFor="pets">Dogs</label><input id="pets" name="pets" type="number" min={0} max={1} defaultValue={0} className={field} /></div>
      </div>

      <fieldset className="flex flex-wrap gap-x-6 gap-y-2">
        <legend className={label}>Extras</legend>
        {["Cot", "Highchair", "Sauna session"].map((x) => (
          <label key={x} className="flex items-center gap-2"><input type="checkbox" name="extras" value={x} className="h-5 w-5 accent-accent" /> {x}</label>
        ))}
      </fieldset>

      <div><label className={label} htmlFor="message">Message</label><textarea id="message" name="message" rows={3} className={field} placeholder="Occasion, flexible dates, questions…" /></div>

      {/* Honeypot: real people never see or fill this. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px]" />

      <label className="flex items-start gap-3 text-sm text-brand-100">
        <input type="checkbox" name="terms" required className="mt-1 h-5 w-5 shrink-0 accent-accent" />
        I have read and agree to the terms and conditions.
      </label>

      {status === "error" && <p role="alert" className="bg-accent p-3 font-semibold text-white">{error}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-sand px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-ink hover:bg-white disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send reservation request"}
      </button>
      <p className="text-center text-xs text-brand-200">No payment taken online. We reply personally.</p>
    </form>
  );
}
