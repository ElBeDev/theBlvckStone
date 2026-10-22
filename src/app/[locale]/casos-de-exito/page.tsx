import { getTranslations, setRequestLocale } from "next-intl/server";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { PageTitle } from "@/components/void/PageTitle";
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

// Off the index until real, authorized cases replace the demo rows.
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
    <>
      <PageTitle title={t("title")} text={t("description")} />
      <section className="mx-auto max-w-7xl space-y-20 px-5 pb-24 md:px-8">
        {items.length === 0 ? (
          <p className="text-xl text-ink-1">{t("empty")}</p>
        ) : (
          items.map((item) => (
            <blockquote key={item.id} className="max-w-4xl">
              <p data-depth={0} className="v-title text-2xl md:text-4xl">
                {item.quote}
              </p>
              <footer className="mt-6 text-lg text-ink-1">
                {item.name} · {attribution(item)}
              </footer>
            </blockquote>
          ))
        )}
      </section>
    </>
  );
}
