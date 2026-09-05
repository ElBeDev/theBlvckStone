import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeading } from "@/components/PageHeading";
import { PendingSection } from "@/components/PendingSection";

export default async function FinanciamientoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tServices = await getTranslations("services");
  const service = tServices.raw("items")[2] as {
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
      {/* El simulador interactivo de financiamiento requiere reglas de
          negocio (tasas, plazos, requisitos) del área financiera antes
          de poder implementarse — ver "Riesgos y dependencias" en el brief. */}
      <PendingSection text="Simulador de financiamiento: pendiente de reglas de negocio (tasas, plazos, requisitos)." />
    </>
  );
}
