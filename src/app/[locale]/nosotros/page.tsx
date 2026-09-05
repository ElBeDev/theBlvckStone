import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeading } from "@/components/PageHeading";

type StatItem = { value: string; label: string };

export default async function NosotrosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tPage = await getTranslations("pages.nosotros");
  const tStats = await getTranslations("stats");
  const tCommon = await getTranslations("common");
  const stats = tStats.raw("items") as StatItem[];

  return (
    <>
      <PageHeading
        eyebrow={tPage("eyebrow")}
        title={tPage("title")}
        description={tPage("description")}
      />
      <div className="mx-auto max-w-3xl px-6 py-12 text-stone">
        <p>{tCommon("pendingContent")}</p>
      </div>
      <div className="bg-petrol px-6 py-16 text-ivory">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold">{tStats("title")}</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-black text-turquoise">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-mist">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
