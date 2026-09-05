import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type ServiceItem = {
  title: string;
  description: string;
  cta: string;
  href: string;
};

type StatItem = { value: string; label: string };

const accentByIndex = ["text-turquoise", "text-mint", "text-amber"];
const borderByIndex = ["border-turquoise", "border-mint", "border-amber"];

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tHome = await getTranslations("home");
  const tServices = await getTranslations("services");
  const tDiff = await getTranslations("differentiators");
  const tStats = await getTranslations("stats");
  const tCtaFinal = await getTranslations("ctaFinal");

  const services = tServices.raw("items") as ServiceItem[];
  const differentiators = tDiff.raw("items") as string[];
  const stats = tStats.raw("items") as StatItem[];

  return (
    <>
      {/* Hero */}
      <section className="bg-petrol px-6 py-28 text-ivory">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-black md:text-6xl">
            {tHome("heroHeadline")}
          </h1>
          <p className="mt-6 text-lg font-normal text-mist md:text-xl">
            {tHome("heroSubheadline")}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/productos"
              className="rounded-full bg-amber px-6 py-3 font-bold text-petrol hover:opacity-90 transition-opacity"
            >
              {tHome("ctaPrimary")}
            </Link>
            <Link
              href="/contacto"
              className="rounded-full border border-turquoise px-6 py-3 font-bold text-turquoise hover:bg-turquoise hover:text-petrol transition-colors"
            >
              {tHome("ctaSecondary")}
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-ivory px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="mb-10 text-center text-sm font-bold uppercase tracking-wide text-teal">
            {tServices("eyebrow")}
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service, i) => (
              <div
                key={service.title}
                className={`rounded-2xl border-t-4 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1 ${borderByIndex[i % 3]}`}
              >
                <h3 className="text-xl font-bold text-carbon">
                  {service.title}
                </h3>
                <p className="mt-3 text-base text-stone">
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className={`mt-4 inline-block text-sm font-bold ${accentByIndex[i % 3]}`}
                >
                  {service.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="bg-mist px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-petrol md:text-4xl">
            {tDiff("title")}
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((item) => (
              <div
                key={item}
                className="rounded-xl bg-white p-4 text-sm font-normal text-petrol shadow-sm"
              >
                <span className="mr-2 font-bold text-turquoise">✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-petrol px-6 py-20 text-ivory">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            {tStats("title")}
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-black text-turquoise">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-mist">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-black-base px-6 py-24 text-center text-ivory">
        <h2 className="text-3xl font-bold md:text-4xl">
          {tCtaFinal("title")}
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contacto"
            className="rounded-full bg-amber px-6 py-3 font-bold text-petrol hover:opacity-90 transition-opacity"
          >
            {tCtaFinal("primary")}
          </Link>
          <Link
            href="/contacto"
            className="rounded-full border border-turquoise px-6 py-3 font-bold text-turquoise hover:bg-turquoise hover:text-petrol transition-colors"
          >
            {tCtaFinal("secondary")}
          </Link>
        </div>
      </section>
    </>
  );
}
