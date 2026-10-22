import { getTranslations, setRequestLocale } from "next-intl/server";
import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import { parseRouteParam } from "@/lib/catalog";
import { getEntries } from "@/lib/entries";
import { ContactForm } from "@/components/ContactForm";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

const DEFAULTS = {
  contact_phone_karla: "+52 442 790 8598",
  contact_phone_juan_carlos: "+52 442 809 9488",
  contact_email: "contacto@the-blvckstone.com",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("pages.contacto");
  return pageMetadata({ locale, path: "/contacto", title: t("title"), description: t("description") });
}

// The request form. When the visitor arrives with a marked route, the entries
// are listed and written into the message so the lead carries them.
export default async function ContactoPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ ruta?: string }>;
}) {
  const { locale } = await params;
  const { ruta } = await searchParams;
  setRequestLocale(locale);

  const [t, tContact, rows, entries] = await Promise.all([
    getTranslations("pages.contacto"),
    getTranslations("contact"),
    db ? db.select().from(siteSettings) : Promise.resolve([]),
    getEntries(locale),
  ]);
  const values = { ...DEFAULTS, ...Object.fromEntries(rows.map((row) => [row.key, row.value])) };

  const codes = parseRouteParam(ruta);
  const byCode = new Map(entries.map((e) => [e.code, e]));
  const route = codes.flatMap((code) => {
    const entry = byCode.get(code);
    return entry ? [{ code, title: entry.title }] : [];
  });
  const defaultMessage = route.length
    ? `${tContact("messagePrefix")}\n${route.map((r) => `${r.code} ${r.title}`).join("\n")}\n\n`
    : "";

  const contacts = [
    { label: "Karla Arizmendi", value: values.contact_phone_karla, href: `tel:${values.contact_phone_karla.replace(/\s/g, "")}` },
    { label: "Juan Carlos Meza", value: values.contact_phone_juan_carlos, href: `tel:${values.contact_phone_juan_carlos.replace(/\s/g, "")}` },
    { label: t("emailLabel"), value: values.contact_email, href: `mailto:${values.contact_email}` },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6">
      <div className="grid gap-10 pt-10 pb-16 md:pt-14 lg:grid-cols-12 lg:gap-12">
        <section className="lg:col-span-5">
          <h1 className="t-display max-w-[14ch] text-4xl font-black text-ink md:text-6xl">{t("title")}</h1>
          <p className="t-body mt-5 max-w-[44ch] text-base leading-relaxed text-ink-2 md:text-lg">{t("description")}</p>
          <dl className="mt-10 border-t border-rule">
            {contacts.map((item) => (
              <div key={item.label} className="rule-b grid gap-1 py-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
                <dt className="t-cond text-[11px] text-ink-3 pt-1">{item.label}</dt>
                <dd>
                  <a href={item.href} className="text-lg font-bold text-ink transition-colors hover:text-pen">{item.value}</a>
                </dd>
              </div>
            ))}
            <div className="rule-b grid gap-1 py-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
              <dt className="t-cond text-[11px] text-ink-3 pt-1">{t("officesLabel")}</dt>
              <dd>
                <p className="text-lg font-bold text-ink">{t("offices")}</p>
                <p className="text-sm text-ink-2">{t("logistics")}</p>
              </dd>
            </div>
          </dl>
        </section>
        <section className="lg:col-span-7">
          <ContactForm route={route} defaultMessage={defaultMessage} />
        </section>
      </div>
    </div>
  );
}
