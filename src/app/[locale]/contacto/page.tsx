import { getTranslations, setRequestLocale } from "next-intl/server";
import { db } from "@/db";
import { siteSettings } from "@/db/schema";
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

export default async function ContactoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, rows] = await Promise.all([
    getTranslations("pages.contacto"),
    db ? db.select().from(siteSettings) : Promise.resolve([]),
  ]);
  const values = { ...DEFAULTS, ...Object.fromEntries(rows.map((row) => [row.key, row.value])) };

  const contacts = [
    { label: "Karla Arizmendi", value: values.contact_phone_karla, href: `tel:${values.contact_phone_karla.replace(/\s/g, "")}` },
    { label: "Juan Carlos Meza", value: values.contact_phone_juan_carlos, href: `tel:${values.contact_phone_juan_carlos.replace(/\s/g, "")}` },
    { label: t("emailLabel"), value: values.contact_email, href: `mailto:${values.contact_email}` },
  ];

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-16 md:px-8 md:pt-24">
      <h1 data-depth={0} className="v-display max-w-[14ch] text-[2.5rem] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
        {t("title")}
      </h1>
      <p className="v-body mt-8 max-w-[46ch] text-xl leading-snug text-ink-1 md:text-2xl">{t("description")}</p>

      <div className="mt-20 grid gap-16 lg:grid-cols-12 lg:gap-20">
        <section className="lg:col-span-7">
          <ContactForm />
        </section>
        <section className="lg:col-span-5">
          <ul className="space-y-8">
            {contacts.map((item) => (
              <li key={item.label}>
                <p className="text-base text-ink-2">{item.label}</p>
                <a href={item.href} data-depth={0} className="v-title mt-1 block text-2xl hover:text-signal md:text-3xl">
                  {item.value}
                </a>
              </li>
            ))}
            <li>
              <p className="text-base text-ink-2">{t("officesLabel")}</p>
              <p data-depth={0} className="v-title mt-1 text-2xl md:text-3xl">{t("offices")}</p>
              <p className="mt-1 text-lg text-ink-1">{t("logistics")}</p>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
