"use client";

import { useState } from "react";
import type { ZoneCode } from "@/lib/catalog";
import { EntryCell, type CellEntry } from "./EntryCell";
import { PlanSvg } from "./PlanSvg";
import { useRoute } from "./useRoute";

export function CatalogSheet({
  entries,
  zoneNames,
  labels,
}: {
  entries: CellEntry[];
  zoneNames: Record<ZoneCode, string>;
  labels: {
    planTitle: string;
    planHint: string;
    gridTitle: string;
    gridHint: string;
    mark: string;
    unmark: string;
    open: string;
  };
}) {
  const { route, visited, toggle, markVisited } = useRoute();
  const [hoveredZone, setHoveredZone] = useState<ZoneCode | null>(null);

  return (
    <div className="cell-grid lg:grid-cols-[2fr_3fr]">
      <section>
        <div className="lg:sticky lg:top-[5.75rem]">
          <header className="rule-b flex items-baseline justify-between px-4 py-3 md:px-6">
            <h2 className="t-cond text-xs font-bold text-ink">{labels.planTitle}</h2>
            <p className="t-cond text-[11px] text-ink-3">{labels.planHint}</p>
          </header>
          <div className="px-3 py-3 md:px-5 md:py-4">
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
        </div>
      </section>

      <section>
        <header className="rule-b flex items-baseline justify-between px-4 py-3 md:px-6">
          <h2 className="t-cond text-xs font-bold text-ink">{labels.gridTitle}</h2>
          <p className="t-cond text-[11px] text-ink-3">{labels.gridHint}</p>
        </header>
        <div className="cell-grid grid-cols-[repeat(auto-fill,minmax(4.5rem,1fr))] border-0 lg:grid-cols-9 xl:grid-cols-10">
          {entries.map((entry) => (
            <EntryCell
              key={entry.code}
              entry={entry}
              marked={route.includes(entry.code)}
              visited={visited.includes(entry.code)}
              labels={labels}
              onToggle={toggle}
              onOpen={markVisited}
              onHover={setHoveredZone}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
