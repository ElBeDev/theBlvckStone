import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeading } from "@/components/PageHeading";
import { PendingSection } from "@/components/PendingSection";

export default async function ElectromovilidadPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tServices = await getTranslations("services");
  const tCommon = await getTranslations("common");
  const service = tServices.raw("items")[1] as {
    title: string;
    description: string;
  };

  return (
    <>
      <PageHeading
        eyebrow={tServices("eyebrow")}
        title={service.title}
        description={service.description}
      />
      <PendingSection text={tCommon("pendingContent")} />
    </>
  );
}
