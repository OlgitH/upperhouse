import type { Cottage } from "@/content";
import { Container, Eyebrow } from "./ui";

const gbp = (n: number) => `£${n.toLocaleString("en-GB")}`;

/** Rates are deliberately separate from availability: see it in its own block. */
export function RatesTable({ cottage }: { cottage: Cottage }) {
  return (
    <section id="rates" className="bg-brand-900 py-20 text-white">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Eyebrow className="text-sand">Rates</Eyebrow>
            <h2 className="font-display text-2xl font-semibold sm:text-4xl">
              {cottage.name} prices
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-brand-100">
              Prices are per stay for up to {cottage.sleeps} guests ({cottage.sleepsExtra} more by
              arrangement). Peak-season rates apply across all dates shown; ask us about special offers
              on short stays when dates are free.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[460px] border-separate border-spacing-y-1 text-left">
              <thead>
                <tr className="text-xs font-bold uppercase tracking-[0.2em] text-brand-200">
                  <th className="px-5 py-3">Nights</th>
                  <th className="px-5 py-3">Low season</th>
                  <th className="px-5 py-3">Mid season</th>
                  <th className="px-5 py-3">High season</th>
                </tr>
              </thead>
              <tbody>
                {cottage.rates.map((r) => (
                  <tr key={r.nights} className="bg-brand-800 text-lg">
                    <th className="px-5 py-5 font-display text-lg font-semibold">{r.nights}</th>
                    <td className="px-5 py-5">{gbp(r.low)}</td>
                    <td className="px-5 py-5">{gbp(r.mid)}</td>
                    <td className="bg-sand px-5 py-5 font-bold text-ink">{gbp(r.high)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* TODO: add season date ranges once confirmed with the owners. */}
            <p className="mt-4 text-sm text-brand-200">
              Season dates available on request. Sauna and spa sessions are charged separately.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
