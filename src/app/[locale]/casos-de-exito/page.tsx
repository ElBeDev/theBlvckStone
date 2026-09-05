import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeading } from "@/components/PageHeading";
import { PendingSection } from "@/components/PendingSection";

export default async function CasosDeExitoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pages.casosDeExito");

  return (
    <>
      <PageHeading eyebrow={t("eyebrow")} title={t("title")} />
      <PendingSection text={t("empty")} />
    </>
  );
}
