"use client";

import { useState } from "react";
import { ZONES, type ZoneCode } from "@/lib/catalog";
import { EntryCell, type CellEntry } from "./EntryCell";
import { PlanSvg } from "./PlanSvg";
import { useRoute } from "./useRoute";

// The plan with its entries grouped by zone, one zone after another.
export function ZoneSheet({
  entries,
  zoneNames,
  zoneTexts,
  labels,
}: {
  entries: CellEntry[];
  zoneNames: Record<ZoneCode, string>;
  zoneTexts: Record<ZoneCode, string>;
  labels: { planTitle: string; mark: string; unmark: string; open: string };
}) {
  const { route, visited, toggle, markVisited } = useRoute();
  const [hoveredZone, setHoveredZone] = useState<ZoneCode | null>(null);

  return (
    <div className="cell-grid lg:grid-cols-[2fr_3fr]">
      <div className="p-3 md:p-6 lg:sticky lg:top-[5.75rem] lg:self-start">
        <PlanSvg
          entries={entries}
          zoneNames={zoneNames}
          selected={route}
          hoveredZone={hoveredZone}
          onToggle={toggle}
          onHoverZone={setHoveredZone}
          title={labels.planTitle}
        />
      </div>
      <div>
        {ZONES.map((zone) => {
          const own = entries.filter((e) => e.zone === zone.code);
          return (
            <section
              key={zone.code}
              className="rule-b last:border-0"
              onMouseEnter={() => setHoveredZone(zone.code)}
              onMouseLeave={() => setHoveredZone(null)}
            >
              <header className="flex gap-4 px-4 pt-5 pb-4 md:px-6">
                <span className="t-cond flex h-6 w-6 shrink-0 items-center justify-center border border-rule-strong text-xs font-extrabold text-ink">{zone.code}</span>
                <div>
                  <h2 className="t-wide text-xl font-black leading-none text-ink">{zoneNames[zone.code]}</h2>
                  <p className="t-body mt-2 max-w-[52ch] text-sm leading-relaxed text-ink-2">{zoneTexts[zone.code]}</p>
                </div>
              </header>
              <div className="cell-grid grid-cols-[repeat(auto-fill,minmax(6rem,1fr))] border-l-0">
                {own.map((entry) => (
                  <EntryCell
                    key={entry.code}
                    entry={entry}
                    marked={route.includes(entry.code)}
                    visited={visited.includes(entry.code)}
                    labels={labels}
                    onToggle={toggle}
                    onOpen={markVisited}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
