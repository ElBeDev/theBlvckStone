import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LogoMark } from "./LogoMark";

export function Footer() {
  const tNav = useTranslations("nav");
  const tFooter = useTranslations("footer");
  const year = new Date().getFullYear();

  const columns = [
    {
      title: tFooter("servicios"),
      links: [
        { href: "/productos/energia-limpia", label: tNav("energiaLimpia") },
        { href: "/productos/electromovilidad", label: tNav("electromovilidad") },
        { href: "/productos/financiamiento", label: tNav("financiamiento") },
      ],
    },
    {
      title: tFooter("productos"),
      links: [
        { href: "/productos/energia-limpia", label: "AUXSOL" },
        { href: "/productos/electromovilidad", label: "Camionetas" },
        { href: "/productos/financiamiento", label: "Financiamiento" },
      ],
    },
    {
      title: tFooter("empresa"),
      links: [
        { href: "/nosotros", label: tNav("nosotros") },
        { href: "/casos-de-exito", label: tNav("casosDeExito") },
        { href: "/blog", label: tNav("blog") },
        { href: "/contacto", label: tNav("contacto") },
      ],
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
    <footer className="bg-black-base text-ivory">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark className="h-9 w-9" />
              <span className="text-base font-black tracking-tight">
                THE BLVCK STONE
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-mist/70">
              {tFooter("tagline")}
            </p>
            <p className="mt-4 text-sm text-mist/70">{tFooter("offices")}</p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-turquoise">
                {col.title}
              </h3>
              <ul className="space-y-2.5 text-sm text-mist/70">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-ivory"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-mist/70 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} The Blvck Stone. {tFooter("rights")}
          </span>
          <a
            href="mailto:contacto@the-blvckstone.com"
            className="transition-colors hover:text-ivory"
          >
            contacto@the-blvckstone.com
          </a>
        </div>
      </div>
    </footer>
  );
}
