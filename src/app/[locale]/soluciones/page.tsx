import { ArrowRight } from "@phosphor-icons/react/ssr";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/motion/Reveal";
import { DuotoneImage, placeholderUrl } from "@/components/DuotoneImage";
import { pageMetadata } from "@/lib/metadata";

type Vertical = { title: string; description: string; seed: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("pages.soluciones");
  return pageMetadata({
    locale,
    path: "/soluciones",
    title: t("title"),
    description: t("description"),
  });
}

export default async function SolucionesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [tPage, tSolutions, tCta, tCtaFinal] = await Promise.all([
    getTranslations("pages.soluciones"),
    getTranslations("solutions"),
    getTranslations("cta"),
    getTranslations("ctaFinal"),
  ]);
  const items = tSolutions.raw("items") as Vertical[];

  return (
    <>
      <PageHero title={tPage("title")} description={tPage("description")} />

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 pb-20 md:grid-cols-2 md:px-8">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 2) * 0.07}>
              <div
                className={`group relative flex flex-col overflow-hidden rounded-2xl text-ivory ${
                  i === 0 || i === 3 ? "min-h-[420px]" : "min-h-[340px]"
                }`}
              >
                <DuotoneImage
                  src={placeholderUrl(item.seed, 1000, 900)}
                  alt={item.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                />
                <div className="relative z-10 flex flex-1 flex-col justify-end p-7">
                  <h2 className="text-2xl font-black leading-tight tracking-tight md:text-3xl">
                    {item.title}
                  </h2>
                  <p className="mt-3 max-w-[40ch] text-sm leading-relaxed text-mist/85">
                    {item.description}
                  </p>
                  <Link
                    href="/contacto"
                    className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-amber px-5 py-2.5 text-sm font-bold text-petrol transition-transform hover:-translate-y-0.5"
                  >
                    {tCta("designSolution")}
                    <ArrowRight size={16} weight="bold" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
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
