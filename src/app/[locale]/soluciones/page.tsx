import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeading } from "@/components/PageHeading";

type SolutionItem = { title: string; description: string };

export default async function SolucionesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("solutions");
  const items = t.raw("items") as SolutionItem[];

  return (
    <>
      <PageHeading title={t("title")} />
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl bg-mist p-6 text-petrol"
          >
            <h2 className="text-lg font-bold">{item.title}</h2>
            <p className="mt-2 text-sm text-stone">{item.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}
