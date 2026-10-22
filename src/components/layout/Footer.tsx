import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PRODUCT_CATEGORIES } from "@/lib/product-categories";
import { LogoMark } from "./LogoMark";

// Colophon: the catalog's closing page. Index, lines, company, legal, and
// the edition line with the offices.
export function Footer() {
  const tNav = useTranslations("nav");
  const tFooter = useTranslations("footer");
  const tc = useTranslations("catalog");
  const tLines = useTranslations("pages.productos.categories");
  const year = new Date().getFullYear();

  const columns = [
    {
      title: tFooter("indice"),
      links: [
        { href: "/", label: tNav("catalogo") },
        { href: "/soluciones", label: tNav("zonas") },
        { href: "/productos", label: tNav("lineas") },
        { href: "/nosotros", label: tNav("nosotros") },
        { href: "/blog", label: tNav("boletin") },
        { href: "/contacto", label: tNav("contacto") },
      ],
    },
    {
      title: tFooter("lineas"),
      links: PRODUCT_CATEGORIES.map((c) => ({
        href: `/productos/${c.value}`,
        label: tLines(`${c.value}.title`),
      })),
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
    <footer className="border-t border-rule-strong text-ink">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="cell-grid border-t-0 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="py-10 pr-6">
            <div className="flex items-center gap-3">
              <LogoMark className="h-7 w-7" />
              <span className="t-wide text-[17px] font-black">THE BLVCK STONE</span>
            </div>
            <p className="t-body mt-5 max-w-[34ch] text-sm leading-relaxed text-ink-2">{tFooter("tagline")}</p>
            <dl className="mt-6 space-y-1.5 text-sm">
              <div className="flex gap-3">
                <dt className="t-cond w-20 shrink-0 text-[11px] font-bold text-ink-3 pt-0.5">{tFooter("officesLabel")}</dt>
                <dd className="text-ink-2">{tFooter("offices")}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="t-cond w-20 shrink-0 text-[11px] font-bold text-ink-3 pt-0.5">{tFooter("logisticsLabel")}</dt>
                <dd className="text-ink-2">{tFooter("logistics")}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="t-cond w-20 shrink-0 text-[11px] font-bold text-ink-3 pt-0.5">Email</dt>
                <dd>
                  <a href="mailto:contacto@the-blvckstone.com" className="text-ink-2 underline decoration-rule-strong hover:text-ink">
                    contacto@the-blvckstone.com
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="py-10 md:px-6">
              <h3 className="t-cond mb-4 text-[11px] font-bold text-ink-3">{col.title}</h3>
              <ul className="space-y-2 text-sm">
                {col.links.map((link, i) => (
                  <li key={link.href + link.label} className="flex gap-3">
                    <span className="t-cond w-5 shrink-0 pt-0.5 text-[11px] text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                    <Link href={link.href} className="text-ink-2 transition-colors hover:text-ink">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="rule-t t-cond flex flex-col gap-2 py-5 text-[11px] text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <span>
            {tc("edition")} · {tc("editionYear")} · {tc("entries", { count: 29 })}
          </span>
          <span>
            © {year} The Blvck Stone · {tFooter("rights")}
          </span>
        </div>
      </div>
    </footer>
  );
}
