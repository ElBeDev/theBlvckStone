import { getTranslations, setRequestLocale } from "next-intl/server";
import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import { ContactForm } from "@/components/ContactForm";

export const dynamic = "force-dynamic";

const DEFAULTS = {
  contact_phone_karla: "+52 442 790 8598",
  contact_phone_juan_carlos: "+52 442 809 9488",
  contact_email: "contacto@the-blvckstone.com",
};

export default async function ContactoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("contact");

  const rows = db ? await db.select().from(siteSettings) : [];
  const values = { ...DEFAULTS, ...Object.fromEntries(
    rows.map((row) => [row.key, row.value]),
  ) };

  return (
    <section className="bg-linear-to-b from-petrol to-black-base px-6 py-20 text-ivory">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
        <div>
          <h1 className="text-3xl font-black md:text-4xl">{t("title")}</h1>
          <div className="mt-8 space-y-4 text-mist">
            <p>
              <span className="block text-sm font-bold text-turquoise">
                Karla Arizmendi
              </span>
              {values.contact_phone_karla}
            </p>
            <p>
              <span className="block text-sm font-bold text-turquoise">
                Juan Carlos Meza
              </span>
              {values.contact_phone_juan_carlos}
            </p>
            <p>
              <span className="block text-sm font-bold text-turquoise">
                Email
              </span>
              {values.contact_email}
            </p>
            <p>
              <span className="block text-sm font-bold text-turquoise">
                Oficinas
              </span>
              Polanco, CDMX · Centro logístico: Guadalajara, Jalisco
            </p>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
