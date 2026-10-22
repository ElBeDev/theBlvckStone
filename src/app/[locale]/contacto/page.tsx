import { Envelope, MapPin, Phone } from "@phosphor-icons/react/ssr";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
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
  return pageMetadata({
    locale,
    path: "/contacto",
    title: t("title"),
    description: t("description"),
  });
}

export default async function ContactoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pages.contacto");

  const rows = db ? await db.select().from(siteSettings) : [];
  const values = {
    ...DEFAULTS,
    ...Object.fromEntries(rows.map((row) => [row.key, row.value])),
  };

  const contacts = [
    { Icon: Phone, label: "Karla Arizmendi", value: values.contact_phone_karla, href: `tel:${values.contact_phone_karla.replace(/\s/g, "")}` },
    { Icon: Phone, label: "Juan Carlos Meza", value: values.contact_phone_juan_carlos, href: `tel:${values.contact_phone_juan_carlos.replace(/\s/g, "")}` },
    { Icon: Envelope, label: t("emailLabel"), value: values.contact_email, href: `mailto:${values.contact_email}` },
  ];

  return (
    <section className="bg-petrol text-ivory">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 pt-14 pb-20 md:px-8 lg:grid-cols-12 lg:gap-10 lg:pt-20 lg:pb-28">
        <Reveal className="lg:col-span-5">
          <h1 className="max-w-[16ch] text-4xl font-black leading-[1.05] tracking-tighter md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-mist/80">
            {t("description")}
          </p>

          <ul className="mt-10 space-y-6">
            {contacts.map((item) => (
              <li key={item.label} className="flex items-start gap-4">
                <item.Icon size={22} weight="duotone" className="mt-1 shrink-0 text-turquoise" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-mist/60">
                    {item.label}
                  </p>
                  <a href={item.href} className="text-lg font-bold text-ivory transition-colors hover:text-turquoise">
                    {item.value}
                  </a>
                </div>
              </li>
            ))}
            <li className="flex items-start gap-4">
              <MapPin size={22} weight="duotone" className="mt-1 shrink-0 text-turquoise" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-mist/60">
                  {t("officesLabel")}
                </p>
                <p className="text-lg font-bold">{t("offices")}</p>
                <p className="text-sm text-mist/70">{t("logistics")}</p>
              </div>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
