import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function GraciasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pages.gracias");

  return (
    <div className="mx-auto max-w-2xl px-6 py-28 text-center">
      <h1 className="text-3xl font-black text-petrol md:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-4 text-lg text-stone">{t("description")}</p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-amber px-6 py-3 font-bold text-petrol hover:opacity-90 transition-opacity"
      >
        {t("backHome")}
      </Link>
    </div>
  );
}
