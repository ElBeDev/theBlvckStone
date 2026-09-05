import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";

export default async function ContactoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("contact");

  return (
    <section className="bg-gradient-to-b from-petrol to-black-base px-6 py-20 text-ivory">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
        <div>
          <h1 className="text-3xl font-black md:text-4xl">{t("title")}</h1>
          <div className="mt-8 space-y-4 text-mist">
            <p>
              <span className="block text-sm font-bold text-turquoise">
                Karla Arizmendi
              </span>
              +52 442 790 8598
            </p>
            <p>
              <span className="block text-sm font-bold text-turquoise">
                Juan Carlos Meza
              </span>
              +52 442 809 9488
            </p>
            <p>
              <span className="block text-sm font-bold text-turquoise">
                Email
              </span>
              contacto@the-blvckstone.com
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
