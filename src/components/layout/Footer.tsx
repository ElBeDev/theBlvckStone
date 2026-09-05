import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

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
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-3 text-sm font-bold text-turquoise">
                {col.title}
              </h3>
              <ul className="space-y-2 text-sm text-stone">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:text-ivory transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-carbon pt-6 text-xs text-stone">
          © {year} The Blvck Stone. {tFooter("rights")}
        </div>
      </div>
    </footer>
  );
}
