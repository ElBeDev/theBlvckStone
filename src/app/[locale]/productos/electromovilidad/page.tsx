import { and, eq } from "drizzle-orm";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { PageHeading } from "@/components/PageHeading";
import { PendingSection } from "@/components/PendingSection";
import { ProductGrid } from "@/components/ProductGrid";

export const dynamic = "force-dynamic";

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

  const items = db
    ? await db
        .select()
        .from(products)
        .where(
          and(
            eq(products.category, "electromovilidad"),
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
        <PendingSection text={tCommon("pendingContent")} />
      ) : (
        <ProductGrid items={items} />
      )}
    </>
  );
}
