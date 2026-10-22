import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CAPS, fit } from "@/components/void/fit";

export default function LocaleNotFound() {
  const t = useTranslations("pages.notFound");
  const tCta = useTranslations("cta");

  return (
    <section className="mx-auto max-w-7xl px-5 py-32 md:px-8 md:py-44">
      <h1 data-depth={0} style={fit(t("title"))} className={`v-display fit max-w-[14ch] ${CAPS.page}`}>
        {t("title")}
      </h1>
      <p className="v-body mt-8 max-w-[46ch] text-xl leading-snug text-ink-1 md:text-2xl">{t("description")}</p>
      <Link href="/" className="mt-12 inline-block text-lg font-bold text-signal">
        {tCta("backHome")}
      </Link>
    </section>
  );
}
