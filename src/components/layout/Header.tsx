"use client";

import { useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { LogoMark } from "./LogoMark";

// The catalog's masthead: wordmark and edition line on the first rule, the
// index entries on the second. The index numbers are the page order.
export function Header() {
  const t = useTranslations("nav");
  const tc = useTranslations("catalog");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: t("catalogo") },
    { href: "/soluciones", label: t("zonas") },
    { href: "/productos", label: t("lineas") },
    { href: "/nosotros", label: t("nosotros") },
    { href: "/contacto", label: t("contacto") },
  ] as const;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-rule-strong bg-petrol/95 text-ink backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="rule-b flex h-14 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <LogoMark className="h-7 w-7" />
            <span className="t-wide text-[17px] font-black">THE BLVCK STONE</span>
          </Link>
          <p className="t-cond hidden text-[11px] text-ink-2 lg:block">
            {tc("edition")} · {tc("editionYear")}
          </p>
          <div className="hidden items-center gap-5 lg:flex">
            <LocaleSwitcher />
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? t("close") : t("menu")}
            className="flex h-10 w-10 items-center justify-center lg:hidden"
          >
            {open ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
          </button>
        </div>

        <nav className="hidden h-9 items-stretch lg:flex" aria-label={t("menu")}>
          {links.map((link, i) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`t-cond flex items-center gap-2 border-r border-rule pr-5 text-[11px] font-bold transition-colors ${
                  i > 0 ? "pl-5" : ""
                } ${active ? "text-ink underline decoration-ink-2 underline-offset-[6px]" : "text-ink-2 hover:text-ink"}`}
              >
                <span className="text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {open && (
        <nav className="rule-t bg-petrol lg:hidden" aria-label={t("menu")}>
          <ul className="mx-auto max-w-7xl px-4 py-2">
            {links.map((link, i) => (
              <li key={link.href} className="rule-b last:border-0">
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`t-cond flex items-center gap-3 py-3.5 text-sm font-bold ${
                    isActive(link.href) ? "text-ink underline underline-offset-4" : "text-ink-2"
                  }`}
                >
                  <span className="text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="flex items-center justify-between py-3">
              <LocaleSwitcher />
              <span className="t-cond text-[11px] text-ink-3">{tc("editionYear")}</span>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
