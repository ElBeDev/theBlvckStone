import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PRODUCT_CATEGORIES, type ProductCategory } from "@/lib/product-categories";
import { getEntries } from "@/lib/entries";
import { EntryList } from "@/components/catalog/EntryList";

// One business line of the catalog: its entries in full, with the line's
// position in the index and a jump list of codes.
export async function ProductCategoryPage({
  locale,
  category,
}: {
  locale: string;
  category: ProductCategory;
}) {
  const [t, tc, tRoute] = await Promise.all([
    getTranslations("pages.productos"),
    getTranslations("catalog"),
    getTranslations("route"),
  ]);

  const entries = (await getEntries(locale)).filter((e) => e.category === category);
  const index = PRODUCT_CATEGORIES.findIndex((c) => c.value === category);
  const prev = PRODUCT_CATEGORIES[index - 1];
  const next = PRODUCT_CATEGORIES[index + 1];

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6">
      <section className="pt-10 md:pt-14">
        <h1 className="t-display max-w-[16ch] text-4xl font-black text-ink md:text-6xl">{t(`categories.${category}.title`)}</h1>
        <p className="t-body mt-5 max-w-[56ch] text-base leading-relaxed text-ink-2 md:text-lg">{t(`categories.${category}.description`)}</p>
        {entries.length > 0 && (
          <ul className="mt-8 flex flex-wrap border-t border-l border-rule">
            {entries.map((e) => (
              <li key={e.code} className="border-r border-b border-rule">
                <a href={`#${e.slug}`} className="t-cond block px-3 py-2 text-[11px] font-bold text-ink-2 transition-colors hover:text-pen">
                  {e.code}
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-10">
        {entries.length === 0 ? (
          <div className="rule-t py-10">
            <p className="t-body max-w-[60ch] text-lg text-ink-2">{t("emptyCategory")}</p>
            <Link href="/contacto" className="mt-6 inline-flex rounded-xs bg-pen px-5 py-3 text-sm font-bold text-petrol">
              {tRoute("cta")}
            </Link>
          </div>
        ) : (
          <EntryList entries={entries} />
        )}
      </section>

      {category === "financiamiento" && (
        <p className="t-body mt-8 max-w-[70ch] border border-rule px-5 py-4 text-sm leading-relaxed text-ink-2">
          {t("financingNote")}
        </p>
      )}

      <p className="t-cond mt-10 text-[11px] text-ink-3">
        {t("lineOf", { n: index + 1, total: PRODUCT_CATEGORIES.length })} · {tc("entries", { count: entries.length })}
      </p>
      <nav className="mt-2 mb-10 cell-grid sm:grid-cols-2" aria-label={t("title")}>
        <div className="p-5">
          {prev ? (
            <Link href={`/productos/${prev.value}`} className="group block">
              <span className="t-cond text-[11px] text-ink-3">{t("prevLine")}</span>
              <span className="mt-1 block text-base font-bold text-ink transition-colors group-hover:text-pen">{t(`categories.${prev.value}.title`)}</span>
            </Link>
          ) : (
            <Link href="/" className="group block">
              <span className="t-cond text-[11px] text-ink-3">{t("backToCatalog")}</span>
              <span className="mt-1 block text-base font-bold text-ink transition-colors group-hover:text-pen">{tc("edition")}</span>
            </Link>
          )}
        </div>
        <div className="p-5 sm:text-right">
          {next ? (
            <Link href={`/productos/${next.value}`} className="group block">
              <span className="t-cond text-[11px] text-ink-3">{t("nextLine")}</span>
              <span className="mt-1 block text-base font-bold text-ink transition-colors group-hover:text-pen">{t(`categories.${next.value}.title`)}</span>
            </Link>
          ) : (
            <Link href="/contacto" className="group block">
              <span className="t-cond text-[11px] text-ink-3">{t("endOfCatalog")}</span>
              <span className="mt-1 block text-base font-bold text-pen">{tRoute("cta")}</span>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
