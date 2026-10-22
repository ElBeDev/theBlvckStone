import { getTranslations, setRequestLocale } from "next-intl/server";
import { Line } from "@/components/void/Line";
import { PageTitle } from "@/components/void/PageTitle";
import { Signal } from "@/components/void/Signal";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("pages.casosDeExito");
  return {
    ...pageMetadata({ locale, path: "/casos-de-exito", title: t("title"), description: t("description") }),
    robots: { index: false, follow: true },
  };
}

// The place for installed projects, held open until the client delivers real,
// authorized cases with their numbers. The testimonials table holds demo rows
// only, so nothing from it is rendered; this page says what each case will
// carry instead of inventing one.
export default async function CasosDeExitoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, tCta] = await Promise.all([getTranslations("pages.casosDeExito"), getTranslations("cta")]);
  const fields = t.raw("fields") as string[];

  return (
    <>
      <PageTitle title={t("title")} text={t("description")} />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Line depth={1} size="md" as="h2">
            {t("fieldsLead")}
          </Line>
        </div>
        <ul className="mx-auto mt-12 max-w-7xl space-y-5 px-5 md:space-y-6 md:px-8">
          {fields.map((line, i) => (
            <Line key={line} as="li" size="lg" depth={Math.min(3, i) as 0 | 1 | 2 | 3} className="max-w-[18ch]">
              {line}
            </Line>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 pt-8 md:px-8 md:pb-32">
        <p className="v-body max-w-[44ch] text-xl leading-snug text-ink-1 md:text-2xl">{t("closeText")}</p>
        <div className="mt-10">
          <Signal label={tCta("demo")} />
        </div>
      </section>
    </>
  );
}
