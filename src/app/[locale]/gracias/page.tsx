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
    <div className="mx-auto max-w-7xl px-4 md:px-6">
      <section className="max-w-3xl py-20 md:py-28">
        <h1 className="t-display text-4xl font-black text-ink md:text-6xl">{t("title")}</h1>
        <p className="t-cond mt-5 text-[11px] text-ink-3">{t("stamp")}</p>
        <p className="t-body mt-6 max-w-[52ch] text-lg leading-relaxed text-ink-2">{t("description")}</p>
        <Link href="/" className="t-cond mt-10 inline-flex border border-rule-strong px-5 py-3 text-[11px] font-bold text-ink transition-colors hover:border-pen hover:text-pen">
          {tCta("backHome")}
        </Link>
      </section>
    </div>
  );
}
