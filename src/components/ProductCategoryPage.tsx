import { and, eq } from "drizzle-orm";
import { getTranslations } from "next-intl/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { Link } from "@/i18n/navigation";
import type { ProductCategory } from "@/lib/product-categories";
import { PageHero } from "@/components/PageHero";
import { ProductGrid } from "@/components/ProductGrid";
import { CtaBand } from "@/components/CtaBand";

const IMAGE_POOLS: Record<ProductCategory, number[]> = {
  "energia-limpia": [54, 28, 66],
  electromovilidad: [155, 197, 133],
  financiamiento: [180, 60, 20],
};

export async function ProductCategoryPage({
  locale,
  category,
}: {
  locale: string;
  category: ProductCategory;
}) {
  const [t, tCta, tCtaFinal] = await Promise.all([
    getTranslations("pages.productos"),
    getTranslations("cta"),
    getTranslations("ctaFinal"),
  ]);

  const items = db
    ? await db
        .select()
        .from(products)
        .where(and(eq(products.category, category), eq(products.locale, locale)))
    : [];

  return (
    <>
      <PageHero
        title={t(`categories.${category}.title`)}
        description={t(`categories.${category}.description`)}
        imageSeed={t(`categories.${category}.seed`)}
      />

      {items.length === 0 ? (
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
            <p className="max-w-[60ch] text-lg leading-relaxed text-carbon/75">
              {t("emptyCategory")}
            </p>
            <Link
              href="/contacto"
              className="mt-6 inline-flex rounded-full bg-amber px-6 py-3 text-sm font-bold text-petrol transition-transform hover:-translate-y-0.5"
            >
              {tCta("demo")}
            </Link>
          </div>
        </section>
      ) : (
        <ProductGrid
          items={items}
          specsLabel={t("specsLabel")}
          imagePool={IMAGE_POOLS[category]}
        />
      )}

      {category === "financiamiento" && (
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
            <p className="max-w-[70ch] rounded-2xl border border-amber/40 bg-amber/10 px-6 py-5 text-sm leading-relaxed text-petrol">
              {t("financingNote")}
            </p>
          </div>
        </section>
      )}

      <CtaBand
        tone="light"
        title={tCtaFinal("title")}
        text={tCtaFinal("text")}
        ctaLabel={tCta("demo")}
      />
    </>
  );
}
