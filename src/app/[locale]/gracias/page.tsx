import { CheckCircle } from "@phosphor-icons/react/ssr";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";

export default async function GraciasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, tCta] = await Promise.all([
    getTranslations("pages.gracias"),
    getTranslations("cta"),
  ]);

  return (
    <section className="bg-ivory">
      <Reveal className="mx-auto max-w-2xl px-5 py-28 text-center md:px-8">
        <CheckCircle size={56} weight="duotone" className="mx-auto text-turquoise" />
        <h1 className="mt-6 text-3xl font-black tracking-tighter text-petrol md:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-carbon/75">{t("description")}</p>
        <Link
          href="/"
          className="mt-9 inline-flex rounded-full bg-amber px-6 py-3.5 text-sm font-bold text-petrol transition-transform hover:-translate-y-0.5"
        >
          {tCta("backHome")}
        </Link>
      </Reveal>
    </section>
  );
}
