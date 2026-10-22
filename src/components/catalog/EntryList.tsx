"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Entry } from "@/lib/entries";
import { useRoute } from "./useRoute";

// Full catalog entries, one after another on the rule grid: code, photo,
// name, description, and the specs table. The mark button is the same pen.
export function EntryList({ entries }: { entries: Entry[] }) {
  const tc = useTranslations("catalog");
  const { route, toggle, markVisited } = useRoute();

  return (
    <ol className="border-t border-rule">
      {entries.map((entry) => {
        const marked = route.includes(entry.code);
        return (
          <li
            key={entry.code}
            id={entry.slug}
            data-marked={marked ? "true" : "false"}
            className="rule-b grid scroll-mt-28 gap-5 py-8 md:grid-cols-12 md:gap-8"
          >
            <div className="md:col-span-3">
              <div className="relative">
                <div className="duotone relative aspect-[4/3] border border-rule-strong">
                  <Image src={entry.imageUrl} alt="" fill sizes="(min-width: 768px) 25vw, 100vw" className="object-cover" />
                </div>
                <svg viewBox="0 0 100 100" aria-hidden="true" preserveAspectRatio="none" className="pointer-events-none absolute -inset-2 h-[calc(100%+16px)] w-[calc(100%+16px)]">
                  <path d="M 56 6 C 83 4 97 25 94 53 C 91 82 68 97 42 94 C 15 91 3 68 7 42 C 11 15 35 6 61 9 C 85 12 95 32 91 56 C 87 78 68 92 47 90" pathLength={1} className="pen-circle" />
                </svg>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <p className="t-cond text-xs font-bold text-ink-2">{entry.code}</p>
                <button
                  type="button"
                  onClick={() => {
                    toggle(entry.code);
                    markVisited(entry.code);
                  }}
                  aria-pressed={marked}
                  className={`t-cond rounded-xs border px-2.5 py-1 text-[11px] font-bold transition-colors ${
                    marked ? "border-pen bg-pen text-petrol" : "border-rule-strong text-ink-2 hover:border-pen hover:text-pen"
                  }`}
                >
                  {marked ? tc("unmark") : tc("mark")}
                </button>
              </div>
            </div>
            <div className="md:col-span-5">
              <h2 className="t-wide text-xl font-black leading-tight text-ink md:text-2xl">{entry.title}</h2>
              <p className="t-body mt-4 max-w-[60ch] text-base leading-relaxed text-ink-2">{entry.description}</p>
            </div>
            <dl className="md:col-span-4">
              {entry.specs.map((spec) => (
                <div key={spec.label + spec.value} className="rule-b grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-3 py-2 last:border-0">
                  <dt className="t-cond text-[11px] text-ink-3">{spec.label}</dt>
                  <dd className="text-sm font-semibold text-ink">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </li>
        );
      })}
    </ol>
  );
}
