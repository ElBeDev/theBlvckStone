import { and, eq } from "drizzle-orm";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { PageHeading } from "@/components/PageHeading";
import { PendingSection } from "@/components/PendingSection";
import { ProductGrid } from "@/components/ProductGrid";

export const dynamic = "force-dynamic";

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

  const items = db
    ? await db
        .select()
        .from(products)
        .where(
          and(
            eq(products.category, "financiamiento"),
            eq(products.locale, locale),
          ),
        )
    : [];

  return (
    <>
      <PageHeading
        eyebrow={tServices("eyebrow")}
        title={service.title}
        description={service.description}
      />
      {items.length === 0 ? (
        // El simulador interactivo de financiamiento requiere reglas de
        // negocio (tasas, plazos, requisitos) del área financiera antes
        // de poder implementarse — ver "Riesgos y dependencias" en el brief.
        <PendingSection text="Simulador de financiamiento: pendiente de reglas de negocio (tasas, plazos, requisitos)." />
      ) : (
        <ProductGrid items={items} />
      )}
    </>
  );
}
