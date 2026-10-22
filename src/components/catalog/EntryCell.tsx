"use client";

import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react";
import { Link } from "@/i18n/navigation";
import type { ZoneCode } from "@/lib/catalog";

export type CellEntry = {
  code: string;
  zone: ZoneCode;
  n: number;
  slug: string;
  title: string;
  short?: string;
  imageUrl: string;
  href: string;
};

// A slightly wobbly ellipse, the way a biro circles a catalog cell.
// Goes round once and a bit, the way a biro overlaps its own start.
const PEN_PATH =
  "M 56 6 C 83 4 97 25 94 53 C 91 82 68 97 42 94 C 15 91 3 68 7 42 C 11 15 35 6 61 9 C 85 12 95 32 91 56 C 87 78 68 92 47 90";

export function EntryCell({
  entry,
  marked,
  visited,
  labels,
  onToggle,
  onOpen,
  onHover,
  size = "stamp",
}: {
  entry: CellEntry;
  marked: boolean;
  visited: boolean;
  labels: { mark: string; unmark: string; open: string };
  onToggle: (code: string) => void;
  onOpen?: (code: string) => void;
  onHover?: (zone: ZoneCode | null) => void;
  size?: "stamp" | "wide";
}) {
  return (
    <div
      data-marked={marked ? "true" : "false"}
      className={`group relative flex flex-col ${size === "wide" ? "p-3" : "p-1"}`}
      onMouseEnter={onHover ? () => onHover(entry.zone) : undefined}
      onMouseLeave={onHover ? () => onHover(null) : undefined}
    >
      <button
        type="button"
        onClick={() => onToggle(entry.code)}
        aria-pressed={marked}
        aria-label={`${marked ? labels.unmark : labels.mark}: ${entry.code} ${entry.title}`}
        className="relative block w-full text-left"
      >
        <span className="duotone relative block aspect-square w-full border border-rule-strong">
          <Image
            src={entry.imageUrl}
            alt=""
            fill
            sizes={size === "wide" ? "160px" : "120px"}
            className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
        </span>
        <svg viewBox="0 0 100 100" aria-hidden="true" className="pointer-events-none absolute -inset-1 h-[calc(100%+8px)] w-[calc(100%+8px)]" preserveAspectRatio="none">
          <path d={PEN_PATH} pathLength={1} className="pen-circle" />
        </svg>
      </button>
      <Link
        href={entry.href}
        onClick={onOpen ? () => onOpen(entry.code) : undefined}
        aria-label={`${labels.open}: ${entry.code} ${entry.title}`}
        className="absolute top-1.5 right-1.5 flex h-5 w-5 items-center justify-center bg-petrol/85 text-ink-2 transition-colors hover:text-pen"
      >
        <ArrowUpRight size={12} weight="bold" />
      </Link>
      <div className="mt-1.5 min-w-0">
        <p className="t-cond text-[11px] font-bold leading-none text-ink-2">{entry.code}</p>
        <p className={`${visited ? "pen-strike inline-block" : ""} t-narrow mt-1 line-clamp-2 text-[11px] font-semibold leading-[1.25] text-ink`}>
          {entry.short ?? entry.title}
        </p>
      </div>
    </div>
  );
}
