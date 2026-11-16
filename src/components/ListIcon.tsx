/**
 * Small inline line icons for the cottage facilities lists. No icon library: each is a 24x24 stroke path.
 * `ListIcon` picks the icon from keywords in the item's text (first match wins).
 */

const paths = {
  ban: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M5.6 5.6l12.8 12.8",
  bowl: "M3 11h18a9 8 0 0 1-18 0z M9 21h6",
  paw: "M8 17c0-2.5 2-4 4-4s4 1.5 4 4c0 1.5-1 2-2 2-1 0-1.5-.5-2-.5s-1 .5-2 .5c-1 0-2-.5-2-2z M5.5 11h.01 M9 7h.01 M15 7h.01 M18.5 11h.01",
  pot: "M4 11h16v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z M2 11h20 M9 7c0-1 1-1.5 1-3 M14 7c0-1 1-1.5 1-3",
  stairs: "M4 20h4v-4h4v-4h4V8h4",
  frame: "M4 4h16v16H4z M8 8h8v8H8z",
  bath: "M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z M6 12V6a2 2 0 0 1 4 0 M7 19l-1 2 M17 19l1 2",
  bed: "M3 19V7 M3 15h18 M21 19v-6a3 3 0 0 0-3-3h-8v5",
  sofa: "M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3 M3 13a2 2 0 0 1 4 0v2h10v-2a2 2 0 0 1 4 0v4H3z M6 17v2 M18 17v2",
  thermometer: "M10 14V5a2 2 0 0 1 4 0v9a4 4 0 1 1-4 0z",
  waves: "M2 8c2.5-2 4.5-2 7 0s4.5 2 7 0 4.5-2 6 0 M2 14c2.5-2 4.5-2 7 0s4.5 2 7 0 4.5-2 6 0 M2 20c2.5-2 4.5-2 7 0s4.5 2 7 0 4.5-2 6 0",
  towel: "M5 4h14v16H5z M5 9h14 M5 15h14",
  wifi: "M2 9a15 15 0 0 1 20 0 M5.5 12.5a10 10 0 0 1 13 0 M9 16a5 5 0 0 1 6 0 M12 20h.01",
  flame: "M12 3c1 3 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z",
  droplet: "M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z",
  book: "M12 6v14 M3 5h6a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H3z M21 5h-6a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h7z",
  crib: "M3 8h18v10H3z M7 8v10 M12 8v10 M17 8v10 M5 18v2 M19 18v2",
  bolt: "M13 2 4 14h7l-1 8 9-12h-7z",
  sun: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M12 2v2 M12 20v2 M2 12h2 M20 12h2 M5 5l1.5 1.5 M17.5 17.5 19 19 M5 19l1.5-1.5 M17.5 6.5 19 5",
  tree: "M12 3 6 12h3l-3 5h12l-3-5h3z M12 17v4",
  mountain: "M3 20 9 8l4 7 3-5 5 10z",
  star: "M12 3l2.7 5.8 6.3.8-4.6 4.4 1.2 6.3L12 17.3 6.4 20.3l1.2-6.3L3 9.6l6.3-.8z",
  pin: "M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z M12 7.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z",
  car: "M3 17v-5l2.5-5h13L21 12v5z M3 12h18 M7 17v2 M17 17v2",
  train: "M7 3h10a2 2 0 0 1 2 2v10a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V5a2 2 0 0 1 2-2z M5 11h14 M9 15h.01 M15 15h.01 M8 18l-2 3 M16 18l2 3",
  check: "M5 12.5l4.5 4.5L19 7.5",
} as const;

type IconName = keyof typeof paths;

const rules: [RegExp, IconName][] = [
  [/not allowed/i, "ban"],
  [/bowls/i, "bowl"],
  [/\bdogs?\b/i, "paw"],
  [/kitchen/i, "pot"],
  [/stair|mezzanine|split levels/i, "stairs"],
  [/artwork/i, "frame"],
  [/bathroom|\bbath\b/i, "bath"],
  [/\bbeds?\b|bedroom|linen|duvet/i, "bed"],
  [/sofa|living/i, "sofa"],
  [/heating/i, "thermometer"],
  [/\bsauna\b|\bspa\b/i, "waves"],
  [/towel/i, "towel"],
  [/wi-?fi/i, "wifi"],
  [/firewood/i, "flame"],
  [/water/i, "droplet"],
  [/maps|books/i, "book"],
  [/\bcot\b|high chair/i, "crib"],
  [/\bEV\b|charging/i, "bolt"],
  [/terrace|patio|barbecue/i, "sun"],
  [/garden|acres|grounds/i, "tree"],
  [/walking/i, "mountain"],
  [/stargaz|dark sky/i, "star"],
];

export function ListIcon({ text, className = "" }: { text: string; className?: string }) {
  return <NamedIcon name={rules.find(([re]) => re.test(text))?.[1] ?? "check"} className={className} />;
}

export function NamedIcon({ name, className = "" }: { name: IconName; className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d={paths[name]} />
    </svg>
  );
}
