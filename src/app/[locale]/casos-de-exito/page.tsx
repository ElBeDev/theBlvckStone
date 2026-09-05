import { getTranslations, setRequestLocale } from "next-intl/server";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/motion/Reveal";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("pages.casosDeExito");
  return pageMetadata({
    locale,
    path: "/casos-de-exito",
    title: t("title"),
    description: t("description"),
  });
}

function attribution(t: { role: string | null; company: string | null }) {
  return [t.role, t.company].filter(Boolean).join(", ");
}

export default async function CasosDeExitoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, tCta, tCtaFinal] = await Promise.all([
    getTranslations("pages.casosDeExito"),
    getTranslations("cta"),
    getTranslations("ctaFinal"),
  ]);

  const items = db
    ? await db.select().from(testimonials).orderBy(desc(testimonials.createdAt))
    : [];
  const [featured, ...rest] = items;

  return (
    <>
      <PageHero title={t("title")} description={t("description")} />

      {items.length === 0 ? (
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
            <p className="text-lg text-carbon/75">{t("empty")}</p>
          </div>
        </section>
      ) : (
        <>
          <section className="bg-petrol text-ivory">
            <Reveal className="mx-auto max-w-7xl px-5 py-20 md:px-8 lg:py-24">
              <blockquote className="max-w-4xl">
                <p className="text-2xl font-bold leading-snug tracking-tight md:text-4xl">
                  “{featured.quote}”
                </p>
                <footer className="mt-8">
                  <p className="font-bold text-turquoise">{featured.name}</p>
                  <p className="text-sm text-mist/70">{attribution(featured)}</p>
                </footer>
              </blockquote>
            </Reveal>
          </section>

          {rest.length > 0 && (
            <section className="bg-white">
              <div className="mx-auto grid max-w-7xl gap-x-12 gap-y-12 px-5 py-20 md:grid-cols-2 md:px-8 lg:grid-cols-3">
                {rest.map((item, i) => (
                  <Reveal key={item.id} delay={(i % 3) * 0.07}>
                    <blockquote className="border-l-2 border-turquoise pl-6">
                      <p className="text-lg leading-relaxed text-carbon">
                        “{item.quote}”
                      </p>
                      <footer className="mt-5">
                        <p className="font-bold text-petrol">{item.name}</p>
                        <p className="text-sm text-carbon/75">{attribution(item)}</p>
                      </footer>
                    </blockquote>
                  </Reveal>
                ))}
              </div>
            </section>
          )}
        </>
      )}

      <CtaBand
        tone="light"
        title={tCtaFinal("title")}
        text={tCtaFinal("text")}
        ctaLabel={tCta("demo")}
      />
    </>
  );
}
