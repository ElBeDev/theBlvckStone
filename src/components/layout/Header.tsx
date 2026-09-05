import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function Header() {
  const t = useTranslations("nav");

  const links = [
    { href: "/", label: t("home") },
    { href: "/productos", label: t("productos") },
    { href: "/soluciones", label: t("soluciones") },
    { href: "/nosotros", label: t("nosotros") },
    { href: "/casos-de-exito", label: t("casosDeExito") },
    { href: "/blog", label: t("blog") },
  ];

  return (
    <header className="sticky top-0 z-50 bg-petrol/95 backdrop-blur text-ivory">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-black tracking-tight">
          THE BLVCK STONE
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-bold md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-turquoise transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <LocaleSwitcher />
          <Link
            href="/contacto"
            className="rounded-full bg-amber px-4 py-2 text-sm font-bold text-petrol hover:opacity-90 transition-opacity"
          >
            {t("contacto")}
          </Link>
        </div>
      </div>
    </header>
  );
}
