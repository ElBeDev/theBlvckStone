import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PRODUCT_CATEGORIES } from "@/lib/product-categories";
import { LogoMark } from "./LogoMark";

// The last plane: index, lines, legal, offices. Still no boxes.
export function Footer() {
  const tNav = useTranslations("nav");
  const tFooter = useTranslations("footer");
  const tLines = useTranslations("pages.productos.categories");
  const year = new Date().getFullYear();

  const columns = [
    {
      title: tFooter("empresa"),
      links: [
        { href: "/productos", label: tNav("productos") },
        { href: "/soluciones", label: tNav("soluciones") },
        { href: "/nosotros", label: tNav("nosotros") },
        { href: "/blog", label: tNav("blog") },
        { href: "/contacto", label: tNav("contacto") },
      ],
    },
    {
      title: tFooter("servicios"),
      links: PRODUCT_CATEGORIES.map((c) => ({ href: `/productos/${c.value}`, label: tLines(`${c.value}.title`) })),
    },
    {
      title: tFooter("legal"),
      links: [
        { href: "/legal/aviso-de-privacidad", label: tFooter("avisoDePrivacidad") },
        { href: "/legal/terminos", label: tFooter("terminos") },
        { href: "/legal/cookies", label: tFooter("cookies") },
      ],
    },
  ];

  return (
    <footer className="mx-auto max-w-7xl px-5 pb-16 pt-24 md:px-8 md:pt-32">
      <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <LogoMark className="h-8 w-8" />
            <span className="v-title text-base">THE BLVCK STONE</span>
          </div>
          <p className="v-body mt-6 max-w-[36ch] text-base text-ink-1">{tFooter("tagline")}</p>
          <p className="mt-6 text-base text-ink-2">{tFooter("offices")}</p>
          <a href="mailto:contacto@the-blvckstone.com" className="mt-2 inline-block text-base text-ink-1 underline hover:text-ink-0">
            contacto@the-blvckstone.com
          </a>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-base font-bold text-ink-0">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href} data-depth={1} className="text-base hover:text-ink-0">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-16 text-sm text-ink-2">
        © {year} The Blvck Stone. {tFooter("rights")}
      </p>
    </footer>
  );
}
