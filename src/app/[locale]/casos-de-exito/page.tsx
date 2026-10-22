import { getTranslations, setRequestLocale } from "next-intl/server";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("pages.casosDeExito");
  return pageMetadata({ locale, path: "/casos-de-exito", title: t("title"), description: t("description") });
}

function attribution(t: { role: string | null; company: string | null }) {
  return [t.role, t.company].filter(Boolean).join(", ");
}

// Kept off the index until real, authorized cases replace the demo rows.
export default async function CasosDeExitoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pages.casosDeExito");
  const items = db ? await db.select().from(testimonials).orderBy(desc(testimonials.createdAt)) : [];

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6">
      <section className="pt-10 md:pt-14">
        <h1 className="t-display max-w-[16ch] text-4xl font-black text-ink md:text-6xl">{t("title")}</h1>
        <p className="t-body mt-5 max-w-[56ch] text-base leading-relaxed text-ink-2 md:text-lg">{t("description")}</p>
      </section>
      <section className="mt-10 mb-16">
        {items.length === 0 ? (
          <p className="rule-t py-10 text-lg text-ink-2">{t("empty")}</p>
        ) : (
          <ul className="cell-grid md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <li key={item.id} className="p-6">
                <blockquote>
                  <p className="t-body text-lg leading-relaxed text-ink">{item.quote}</p>
                  <footer className="mt-5">
                    <p className="font-bold text-ink">{item.name}</p>
                    <p className="t-cond mt-1 text-[11px] text-ink-3">{attribution(item)}</p>
                  </footer>
                </blockquote>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
