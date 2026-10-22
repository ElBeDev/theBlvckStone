import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function GraciasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, tCta] = await Promise.all([getTranslations("pages.gracias"), getTranslations("cta")]);

  return (
    <section className="mx-auto max-w-7xl px-5 py-32 md:px-8 md:py-44">
      <h1 data-depth={0} className="v-display max-w-[14ch] text-[2.5rem] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
        {t("title")}
      </h1>
      <p className="v-body mt-8 max-w-[46ch] text-xl leading-snug text-ink-1 md:text-2xl">{t("description")}</p>
      <Link href="/" className="mt-12 inline-block text-lg font-bold text-signal">
        {tCta("backHome")}
      </Link>
    </section>
  );
}
