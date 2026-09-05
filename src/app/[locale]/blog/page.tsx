import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeading } from "@/components/PageHeading";
import { PendingSection } from "@/components/PendingSection";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pages.blog");

  return (
    <>
      <PageHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />
      {/* Se conectará a Sanity (colección "post") una vez configurado el CMS. */}
      <PendingSection text={t("empty")} />
    </>
  );
}
