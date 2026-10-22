import type { ZoneCode } from "@/lib/catalog";

export type PlanEntry = { code: string; zone: ZoneCode; n: number; title: string };

type ZoneGeom = {
  code: ZoneCode;
  box: [number, number, number, number];
  label: [number, number];
  slots: [number, number][];
};

// A plant lot seen from above: the main building (roof A, structure D), the
// substation (B), the yard with charging bays and a rail spur (C) and the
// office block (E). Each zone carries fixed slots where its entries sit.
const ZONE_GEOM: ZoneGeom[] = [
  {
    code: "A",
    box: [40, 40, 400, 230],
    label: [52, 52],
    slots: [
      [120, 120],
      [200, 120],
      [280, 120],
      [360, 120],
    ],
  },
  {
    code: "D",
    box: [470, 40, 130, 150],
    label: [482, 52],
    slots: [
      [505, 110],
      [565, 110],
      [505, 150],
      [565, 150],
      [535, 130],
    ],
  },
  {
    code: "B",
    box: [470, 210, 130, 60],
    label: [482, 222],
    slots: [
      [505, 250],
      [535, 250],
      [565, 250],
    ],
  },
  {
    code: "C",
    box: [40, 300, 400, 140],
    label: [52, 312],
    slots: [
      [90, 370],
      [140, 370],
      [190, 370],
      [240, 370],
      [290, 370],
      [340, 370],
      [390, 370],
    ],
  },
  {
    code: "E",
    box: [470, 300, 130, 140],
    label: [482, 312],
    slots: [
      [500, 360],
      [535, 360],
      [570, 360],
      [500, 390],
      [535, 390],
      [570, 390],
      [500, 420],
      [535, 420],
      [570, 420],
      [535, 335],
    ],
  },
];

export function slotFor(entry: PlanEntry) {
  const geom = ZONE_GEOM.find((z) => z.code === entry.zone);
  return geom?.slots[(entry.n - 1) % geom.slots.length] ?? [0, 0];
}

export function PlanSvg({
  entries,
  zoneNames,
  selected,
  hoveredZone,
  onToggle,
  onHoverZone,
  title,
  className = "",
}: {
  entries: PlanEntry[];
  zoneNames: Record<ZoneCode, string>;
  selected: string[];
  hoveredZone?: ZoneCode | null;
  onToggle?: (code: string) => void;
  onHoverZone?: (zone: ZoneCode | null) => void;
  title: string;
  className?: string;
}) {
  const byCode = new Map(entries.map((e) => [e.code, e]));
  const routePoints = selected
    .map((code) => byCode.get(code))
    .filter((e): e is PlanEntry => Boolean(e))
    .map((e) => slotFor(e));
  // Each leg bows slightly off the straight line, like a line drawn by hand.
  const routeD = routePoints.length > 1
    ? routePoints
        .map(([x, y], i) => {
          if (i === 0) return `M ${x} ${y}`;
          const [px, py] = routePoints[i - 1];
          const dx = x - px;
          const dy = y - py;
          const len = Math.hypot(dx, dy) || 1;
          const bow = Math.min(14, len * 0.08) * (i % 2 === 0 ? 1 : -1);
          const cx = (px + x) / 2 - (dy / len) * bow;
          const cy = (py + y) / 2 + (dx / len) * bow;
          return `Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${x} ${y}`;
        })
        .join(" ")
    : "";
  const routeLength = routePoints.reduce((acc, p, i) => {
    if (i === 0) return 0;
    const [px, py] = routePoints[i - 1];
    return acc + Math.hypot(p[0] - px, p[1] - py);
  }, 0);

  return (
    <svg
      viewBox="0 0 640 480"
      role="img"
      aria-label={title}
      className={`block h-auto w-full select-none ${className}`}
      style={{ fontFamily: "inherit" }}
    >
      <defs>
        <pattern id="hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="10" stroke="var(--rule)" strokeWidth="1" />
        </pattern>
      </defs>

      {/* lot boundary */}
      <rect x="12" y="12" width="616" height="456" fill="none" stroke="var(--rule)" strokeDasharray="4 6" />

      {ZONE_GEOM.map((zone) => {
        const [x, y, w, h] = zone.box;
        const hot = hoveredZone === zone.code;
        return (
          <g
            key={zone.code}
            onMouseEnter={onHoverZone ? () => onHoverZone(zone.code) : undefined}
            onMouseLeave={onHoverZone ? () => onHoverZone(null) : undefined}
          >
            <rect
              x={x}
              y={y}
              width={w}
              height={h}
              className={zone.code === "A" ? "hatch" : ""}
              fill={zone.code === "A" ? undefined : hot ? "rgb(27 188 180 / 0.08)" : "transparent"}
              stroke={hot ? "var(--spot)" : "var(--rule-strong)"}
              strokeWidth={zone.code === "A" || zone.code === "D" ? 2 : 1.2}
              style={{ transition: "stroke 200ms, fill 200ms" }}
            />
            {zone.code === "A" && (
              <rect x={x} y={y} width={w} height={h} fill={hot ? "rgb(27 188 180 / 0.08)" : "transparent"} style={{ transition: "fill 200ms" }} />
            )}
            {/* zone code box + name */}
            <rect x={zone.label[0]} y={zone.label[1]} width="18" height="18" fill="var(--spot)" />
            <text
              x={zone.label[0] + 9}
              y={zone.label[1] + 13}
              textAnchor="middle"
              fontSize="12"
              fontWeight="800"
              fill="var(--color-petrol)"
            >
              {zone.code}
            </text>
            <text
              className="max-sm:hidden"
              x={zone.label[0] + 24}
              y={zone.label[1] + 13}
              fontSize="10.5"
              fontWeight="700"
              letterSpacing="0.08em"
              fill={hot ? "var(--spot)" : "var(--ink-2)"}
              style={{ fontVariationSettings: '"wdth" 78', textTransform: "uppercase" }}
            >
              {zoneNames[zone.code].toUpperCase()}
            </text>
          </g>
        );
      })}

      {/* substation symbol */}
      <g stroke="var(--rule-strong)" fill="none" strokeWidth="1.2">
        <circle cx="486" cy="232" r="4" />
        <circle cx="492" cy="232" r="4" />
      </g>
      {/* charging bays and rail spur in the yard */}
      <g stroke="var(--rule)" strokeWidth="1">
        {[70, 120, 170, 220, 270, 320, 370, 420].map((x) => (
          <line key={x} x1={x} y1="340" x2={x} y2="400" />
        ))}
        <line x1="40" y1="424" x2="440" y2="424" />
        <line x1="40" y1="430" x2="440" y2="430" />
        {Array.from({ length: 20 }, (_, i) => 52 + i * 20).map((x) => (
          <line key={x} x1={x} y1="421" x2={x} y2="433" />
        ))}
      </g>
      {/* office windows */}
      <g stroke="var(--rule)" strokeWidth="1">
        <line x1="470" y1="340" x2="600" y2="340" />
        <line x1="470" y1="405" x2="600" y2="405" />
      </g>

      {/* the route, drawn in pen */}
      {routeD && (
        <path
          d={routeD}
          className="pen-route"
          strokeDasharray={routeLength}
          strokeDashoffset={0}
        />
      )}

      {/* entries as table dots */}
      {entries.map((entry) => {
        const [cx, cy] = slotFor(entry);
        const on = selected.includes(entry.code);
        const order = selected.indexOf(entry.code);
        return (
          <g
            key={entry.code}
            onClick={onToggle ? () => onToggle(entry.code) : undefined}
            style={{ cursor: onToggle ? "pointer" : "default" }}
            aria-hidden="true"
          >
            <title>{`${entry.code} ${entry.title}`}</title>
            <circle cx={cx} cy={cy} r="11" fill="transparent" />
            <circle
              cx={cx}
              cy={cy}
              r={on ? 6 : 4.5}
              fill={on ? "var(--pen)" : "var(--color-petrol)"}
              stroke={on ? "var(--pen)" : "var(--ink-2)"}
              strokeWidth="1.4"
              style={{ transition: "r 160ms, fill 160ms" }}
            />
            {on && (
              <text x={cx} y={cy - 10} textAnchor="middle" fontSize="9" fontWeight="800" fill="var(--pen)">
                {order + 1}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
