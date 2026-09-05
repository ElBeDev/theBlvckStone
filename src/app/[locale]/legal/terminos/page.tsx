import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeading } from "@/components/PageHeading";
import { PendingSection } from "@/components/PendingSection";

export default async function TerminosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pages.legal");

  return (
    <>
      <PageHeading title={t("terminos.title")} />
      <PendingSection text={t("pending")} />
    </>
  );
}
