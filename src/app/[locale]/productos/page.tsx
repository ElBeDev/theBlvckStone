import { ArrowRight } from "@phosphor-icons/react/ssr";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PRODUCT_CATEGORIES } from "@/lib/product-categories";
import { getEntries } from "@/lib/entries";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("pages.productos");
  return pageMetadata({ locale, path: "/productos", title: t("title"), description: t("description") });
}

// The index of lines: five business lines, each with the codes it covers.
export default async function ProductosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, tc] = await Promise.all([getTranslations("pages.productos"), getTranslations("catalog")]);
  const entries = await getEntries(locale);

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6">
      <section className="pt-10 md:pt-14">
        <h1 className="t-display max-w-[16ch] text-4xl font-black text-ink md:text-6xl">{t("title")}</h1>
        <p className="t-body mt-5 max-w-[56ch] text-base leading-relaxed text-ink-2 md:text-lg">{t("description")}</p>
        <p className="t-cond mt-4 text-[11px] text-ink-3">{tc("entries", { count: entries.length })}</p>
      </section>

      <ol className="mt-10 mb-16 border-t border-rule">
        {PRODUCT_CATEGORIES.map((cat, i) => {
          const own = entries.filter((e) => e.category === cat.value);
          return (
            <li key={cat.value} className="rule-b">
              <Link href={`/productos/${cat.value}`} className="group grid gap-4 py-7 md:grid-cols-12 md:gap-8">
                <span className="t-cond text-xs font-bold text-ink-2 md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <div className="md:col-span-6">
                  <h2 className="t-wide text-2xl font-black leading-tight text-ink transition-colors group-hover:text-pen md:text-3xl">
                    {t(`categories.${cat.value}.title`)}
                  </h2>
                  <p className="t-body mt-3 max-w-[56ch] text-base leading-relaxed text-ink-2">{t(`categories.${cat.value}.description`)}</p>
                </div>
                <div className="md:col-span-5">
                  <ul className="flex flex-wrap gap-x-3 gap-y-1">
                    {own.map((e) => (
                      <li key={e.code} className="t-cond text-[11px] text-ink-3">
                        <span className="text-ink-2">{e.code}</span> {e.title}
                      </li>
                    ))}
                  </ul>
                  <span className="t-cond mt-4 inline-flex items-center gap-1 text-[11px] font-bold text-ink-2 transition-colors group-hover:text-pen">
                    {tc("entries", { count: own.length })}
                    <ArrowRight size={12} weight="bold" />
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
