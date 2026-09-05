import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHeading } from "@/components/PageHeading";

type ServiceItem = {
  title: string;
  description: string;
  cta: string;
  href: string;
};

export default async function ProductosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tPage = await getTranslations("pages.productos");
  const tServices = await getTranslations("services");
  const services = tServices.raw("items") as ServiceItem[];

  return (
    <>
      <PageHeading
        eyebrow={tPage("eyebrow")}
        title={tPage("title")}
        description={tPage("description")}
      />
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-16 md:grid-cols-3">
        {services.map((service) => (
          <Link
            key={service.href}
            href={service.href}
            className="rounded-2xl border border-mist bg-white p-6 shadow-sm transition-transform hover:-translate-y-1"
          >
            <h2 className="text-xl font-bold text-carbon">{service.title}</h2>
            <p className="mt-3 text-base text-stone">{service.description}</p>
            <span className="mt-4 inline-block text-sm font-bold text-turquoise">
              {service.cta} →
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
