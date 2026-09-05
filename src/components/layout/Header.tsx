"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { LogoMark } from "./LogoMark";

const DARK_ROUTES = ["/", "/contacto"];

export function Header() {
  const t = useTranslations("nav");
  const tCta = useTranslations("cta");
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);

  const dark = DARK_ROUTES.includes(pathname);

  const links = [
    { href: "/", label: t("home") },
    { href: "/productos", label: t("productos") },
    { href: "/soluciones", label: t("soluciones") },
    { href: "/nosotros", label: t("nosotros") },
    { href: "/casos-de-exito", label: t("casosDeExito") },
    { href: "/blog", label: t("blog") },
  ] as const;

  const shell = dark
    ? "bg-petrol/85 text-ivory border-white/5"
    : "bg-ivory/85 text-petrol border-petrol/5";
  const linkIdle = dark
    ? "text-mist/80 hover:text-ivory"
    : "text-carbon/80 hover:text-petrol";
  const linkActive = dark ? "text-turquoise" : "text-teal";

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${shell}`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 md:px-8">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <LogoMark className="h-8 w-8" />
          <span className="text-[15px] font-black tracking-tight">
            THE BLVCK STONE
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-bold lg:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${active ? linkActive : linkIdle}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <LocaleSwitcher tone={dark ? "dark" : "light"} />
          <Link
            href="/contacto"
            className="rounded-full bg-amber px-5 py-2.5 text-sm font-bold text-petrol transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
          >
            {tCta("demo")}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? t("close") : t("menu")}
          className="flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
        >
          {open ? <X size={26} weight="bold" /> : <List size={26} weight="bold" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-nav"
            initial={reduce ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`border-t lg:hidden ${
              dark ? "border-white/5 bg-petrol" : "border-petrol/5 bg-ivory"
            }`}
          >
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-3 text-lg font-bold ${linkIdle}`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 flex items-center justify-between px-3">
                <LocaleSwitcher tone={dark ? "dark" : "light"} />
                <Link
                  href="/contacto"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-amber px-5 py-2.5 text-sm font-bold text-petrol"
                >
                  {tCta("demo")}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
