import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("pages.legal");
  return pageMetadata({
    locale,
    path: "/legal/aviso-de-privacidad",
    title: t("privacidad.title"),
    description: t("privacidad.sections.0.body"),
  });
}

export default async function AvisoDePrivacidadPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalPage doc="privacidad" />;
}
