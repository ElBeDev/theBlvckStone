import { getTranslations, setRequestLocale } from "next-intl/server";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { PageHeading } from "@/components/PageHeading";
import { PendingSection } from "@/components/PendingSection";

export const dynamic = "force-dynamic";

export default async function CasosDeExitoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pages.casosDeExito");

  const items = db ? await db.select().from(testimonials) : [];

  return (
    <>
      <PageHeading eyebrow={t("eyebrow")} title={t("title")} />
      {items.length === 0 ? (
        <PendingSection text={t("empty")} />
      ) : (
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-16 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-2xl bg-ivory p-6 shadow-sm"
            >
              {testimonial.photoUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={testimonial.photoUrl}
                  alt={testimonial.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
              )}
              <p className="mt-4 font-bold text-carbon">
                “{testimonial.quote}”
              </p>
              <p className="mt-4 text-sm font-bold text-turquoise">
                {testimonial.name}
              </p>
              <p className="text-xs text-stone">
                {[testimonial.role, testimonial.company]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
