import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/motion/Reveal";
import { DuotoneImage, placeholderUrl } from "@/components/DuotoneImage";
import { pageMetadata } from "@/lib/metadata";

type ServiceItem = {
  title: string;
  description: string;
  cta: string;
  href: string;
};

const seeds = ["blvckstone-solar", "blvckstone-ev", "blvckstone-finance"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("pages.productos");
  return pageMetadata({
    locale,
    path: "/productos",
    title: t("title"),
    description: t("description"),
  });
}

export default async function ProductosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [tPage, tServices, tCta, tCtaFinal] = await Promise.all([
    getTranslations("pages.productos"),
    getTranslations("services"),
    getTranslations("cta"),
    getTranslations("ctaFinal"),
  ]);
  const services = tServices.raw("items") as ServiceItem[];

  return (
    <>
      <PageHero title={tPage("title")} description={tPage("description")} />

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-4 pb-20 md:px-8">
          <div className="divide-y divide-petrol/10">
            {services.map((service, i) => (
              <Reveal key={service.href} delay={i * 0.05}>
                <Link
                  href={service.href}
                  className="group grid gap-6 py-10 md:grid-cols-12 md:items-center md:gap-10"
                >
                  <DuotoneImage
                    src={placeholderUrl(seeds[i], 900, 600)}
                    alt={service.title}
                    width={900}
                    height={600}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className={`aspect-[3/2] rounded-2xl md:col-span-4 ${
                      i % 2 === 1 ? "md:order-last" : ""
                    }`}
                  />
                  <div className="md:col-span-8">
                    <h2 className="text-2xl font-black leading-tight tracking-tight text-petrol transition-colors group-hover:text-teal md:text-3xl">
                      {service.title}
                    </h2>
                    <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-carbon/75">
                      {service.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-teal">
                      {service.cta}
                      <ArrowUpRight
                        size={16}
                        weight="bold"
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        tone="light"
        title={tCtaFinal("title")}
        text={tCtaFinal("text")}
        ctaLabel={tCta("demo")}
      />
    </>
  );
}
