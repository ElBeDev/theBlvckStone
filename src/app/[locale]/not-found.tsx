import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function LocaleNotFound() {
  const t = useTranslations("pages.notFound");
  const tCta = useTranslations("cta");

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6">
      <section className="max-w-3xl py-20 md:py-28">
        <h1 className="t-display text-4xl font-black text-ink md:text-6xl">{t("title")}</h1>
        <p className="t-cond mt-5 text-[11px] text-ink-3">404</p>
        <p className="t-body mt-6 max-w-[52ch] text-lg leading-relaxed text-ink-2">{t("description")}</p>
        <Link href="/" className="t-cond mt-10 inline-flex border border-rule-strong px-5 py-3 text-[11px] font-bold text-ink transition-colors hover:border-pen hover:text-pen">
          {tCta("backHome")}
        </Link>
      </section>
    </div>
  );
}
