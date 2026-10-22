"use client";

import { ArrowRight, X } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useRoute } from "./useRoute";

// The catalog's margin note, pinned to the bottom of every page: which entries
// the visitor has circled, and the one action, always visible.
export function RouteStrip() {
  const t = useTranslations("route");
  const { route, ready, clear } = useRoute();
  const count = route.length;
  const href = count > 0 ? `/contacto?ruta=${route.join(",")}` : "/contacto";

  return (
    <>
      <div aria-hidden="true" className="h-16" />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-rule-strong bg-petrol/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 md:gap-5 md:px-6">
          <p className="t-cond hidden text-[11px] font-bold text-ink-2 sm:block">{t("title")}</p>
          <ul className="hidden min-w-0 flex-1 items-center gap-1.5 overflow-hidden md:flex" aria-label={t("title")}>
            {route.slice(0, 8).map((code, i) => (
              <li key={code} className="t-cond shrink-0 border border-pen px-1.5 py-0.5 text-[11px] font-bold text-pen">
                {i + 1} · {code}
              </li>
            ))}
            {count > 8 && <li className="t-cond text-[11px] text-ink-3">+{count - 8}</li>}
          </ul>
          <p className="min-w-0 flex-1 truncate text-sm text-ink-2 md:flex-none" aria-live="polite">
            {!ready ? "" : count === 0 ? t("empty") : t("count", { count })}
          </p>
          {count > 0 && (
            <button
              type="button"
              onClick={clear}
              className="t-cond hidden items-center gap-1 text-[11px] font-bold text-ink-3 transition-colors hover:text-ink sm:inline-flex"
            >
              <X size={12} weight="bold" />
              {t("clear")}
            </button>
          )}
          <Link
            href={href}
            className="inline-flex shrink-0 items-center gap-2 rounded-xs bg-pen px-4 py-2.5 text-sm font-bold text-petrol transition-transform hover:-translate-y-px active:translate-y-0"
          >
            <span className="hidden sm:inline">{t("cta")}</span>
            <span className="sm:hidden">{t("ctaShort")}</span>
            <ArrowRight size={16} weight="bold" />
          </Link>
        </div>
      </div>
    </>
  );
}
