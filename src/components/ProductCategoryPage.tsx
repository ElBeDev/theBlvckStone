import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PRODUCT_CATEGORIES, type ProductCategory } from "@/lib/product-categories";
import { getEntries } from "@/lib/entries";
import { siteImage } from "@/lib/images";
import { PageTitle } from "@/components/void/PageTitle";
import { Signal } from "@/components/void/Signal";

// One business line: its services as a column of big titles, each with its
// photo washed in petrol beside it and its specs as a running list.
export async function ProductCategoryPage({
  locale,
  category,
}: {
  locale: string;
  category: ProductCategory;
}) {
  const [t, tCta] = await Promise.all([getTranslations("pages.productos"), getTranslations("cta")]);
  const entries = (await getEntries(locale)).filter((e) => e.category === category);
  const index = PRODUCT_CATEGORIES.findIndex((c) => c.value === category);
  const next = PRODUCT_CATEGORIES[(index + 1) % PRODUCT_CATEGORIES.length];

  return (
    <>
      <PageTitle title={t(`categories.${category}.title`)} text={t(`categories.${category}.description`)} image={siteImage(`blvckstone-${category}`)} />

      <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
        {entries.length === 0 ? (
          <div>
            <p className="v-body max-w-[48ch] text-xl text-ink-1">{t("emptyCategory")}</p>
            <div className="mt-8">
              <Signal label={tCta("demo")} size="md" />
            </div>
          </div>
        ) : (
          <ol className="space-y-24 md:space-y-32">
            {entries.map((entry, i) => (
              <li key={entry.code} id={entry.slug} className="grid scroll-mt-28 gap-8 md:grid-cols-12 md:gap-12">
                <div className={`photo-wash aspect-[4/3] md:col-span-5 ${i % 2 === 1 ? "md:order-last" : ""}`}>
                  <Image src={entry.imageUrl} alt="" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover opacity-90" />
                </div>
                <div className="md:col-span-7">
                  <h2 data-depth={0} className="v-title text-3xl md:text-4xl lg:text-5xl">
                    {entry.title}
                  </h2>
                  <p className="v-body mt-6 max-w-[52ch] text-lg text-ink-1 md:text-xl">{entry.description}</p>
                  <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-base">
                    {entry.specs.map((spec) => (
                      <div key={spec.label + spec.value} className="flex flex-wrap gap-x-2">
                        <dt className="text-ink-2">{spec.label}</dt>
                        <dd className="font-bold text-ink-0">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </li>
            ))}
          </ol>
        )}

        {category === "financiamiento" && (
          <p className="v-body mt-16 max-w-[60ch] text-base text-ink-2">{t("financingNote")}</p>
        )}

        <div className="mt-24 flex flex-col items-start gap-8 md:mt-32 lg:flex-row lg:items-end lg:justify-between">
          <Link href={`/productos/${next.value}`} className="group">
            <span className="block text-base text-ink-2">{t("nextLine")}</span>
            <span data-depth={0} className="v-title mt-2 block max-w-[18ch] text-3xl group-hover:text-signal md:text-4xl lg:text-5xl">
              {t(`categories.${next.value}.title`)}
            </span>
          </Link>
          <Signal label={tCta("demo")} size="md" />
        </div>
      </section>
    </>
  );
}
