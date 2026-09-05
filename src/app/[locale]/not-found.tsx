import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function LocaleNotFound() {
  const t = useTranslations("pages.notFound");
  const tCta = useTranslations("cta");

  return (
    <section className="bg-ivory">
      <div className="mx-auto max-w-2xl px-5 py-28 text-center md:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal">404</p>
        <h1 className="mt-4 text-3xl font-black tracking-tighter text-petrol md:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-5 text-lg text-carbon/75">{t("description")}</p>
        <Link
          href="/"
          className="mt-9 inline-flex rounded-full bg-amber px-6 py-3.5 text-sm font-bold text-petrol transition-transform hover:-translate-y-0.5"
        >
          {tCta("backHome")}
        </Link>
      </div>
    </section>
  );
}
