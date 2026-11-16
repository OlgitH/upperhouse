/**
 * The Upper House Cottages logo, from public/brand/logo.svg, inlined so its lettering can use the
 * site's loaded fonts (an <img> can't see them). Fills use currentColor: it is white by default.
 * Size it with a height class, e.g. className="h-16". The width follows the artwork's proportions.
 */
const name = { fontFamily: "var(--font-logo), 'Bebas Neue', Impact, sans-serif", fontSize: "101.11px" };
const sub = { fontFamily: "var(--font-montserrat), 'Helvetica Neue', Arial, sans-serif", fontSize: "26.54px", fontWeight: 300 };

export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      role="img"
      aria-label="Upper House Cottages"
      viewBox="0 0 376.13 121.72"
      fill="currentColor"
      className={`w-auto text-white ${className}`}
    >
      <text style={name} transform="translate(0 85.94)">
        <tspan x="0" y="0" letterSpacing="-.04em">UPPER</tspan>
        <tspan x="174.92" y="0" letterSpacing=".04em"> </tspan>
        <tspan x="195.24" y="0" letterSpacing="-.04em">HOUSE</tspan>
      </text>
      <text style={sub} transform="translate(105.09 116.06)">
        <tspan x="0" y="0" letterSpacing=".03em">C</tspan>
        <tspan x="22.69" y="0" letterSpacing="-.02em">O</tspan>
        <tspan x="46.29" y="0" letterSpacing=".03em">T</tspan>
        <tspan x="65.48" y="0" letterSpacing="-.07em">T</tspan>
        <tspan x="82.13" y="0" letterSpacing=".03em">AGES</tspan>
      </text>
    </svg>
  );
}
