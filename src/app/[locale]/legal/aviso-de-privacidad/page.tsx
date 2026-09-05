import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeading } from "@/components/PageHeading";
import { PendingSection } from "@/components/PendingSection";

export default async function AvisoDePrivacidadPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pages.legal");

  return (
    <>
      <PageHeading title={t("privacidad.title")} />
      {/* Debe cumplir con la LFPDPPP (Ley Federal de Protección de Datos
          Personales en Posesión de los Particulares) — texto pendiente
          de revisión legal. */}
      <PendingSection text={t("pending")} />
    </>
  );
}
