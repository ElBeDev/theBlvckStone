"use client";

import { useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { LogoMark } from "./LogoMark";

// Minimal masthead over the void: wordmark, three entries, language, signal.
export function Header() {
  const t = useTranslations("nav");
  const tCta = useTranslations("cta");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/productos", label: t("productos") },
    { href: "/soluciones", label: t("soluciones") },
    { href: "/nosotros", label: t("nosotros") },
  ] as const;

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 bg-void/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <LogoMark className="h-8 w-8" />
          <span className="v-title text-base">THE BLVCK STONE</span>
        </Link>

        <nav className="hidden items-center gap-10 lg:flex" aria-label={t("menu")}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              data-depth={isActive(link.href) ? 0 : 1}
              className="text-base font-bold hover:text-ink-0"
            >
              {link.label}
            </Link>
          ))}
          <LocaleSwitcher />
          <Link
            href="/contacto"
            className="bg-signal px-5 py-3 text-base font-bold text-void transition-transform hover:-translate-y-0.5"
          >
            {tCta("demo")}
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? t("close") : t("menu")}
          className="flex h-12 w-12 items-center justify-center lg:hidden"
        >
          {open ? <X size={28} weight="bold" /> : <List size={28} weight="bold" />}
        </button>
      </div>

      {open && (
        <nav className="bg-void px-5 pb-8 pt-2 lg:hidden" aria-label={t("menu")}>
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  data-depth={isActive(link.href) ? 0 : 1}
                  className="v-title block py-3 text-3xl"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contacto" onClick={() => setOpen(false)} className="v-title block py-3 text-3xl text-signal">
                {t("contacto")}
              </Link>
            </li>
          </ul>
          <div className="mt-6">
            <LocaleSwitcher />
          </div>
        </nav>
      )}
    </header>
  );
}
