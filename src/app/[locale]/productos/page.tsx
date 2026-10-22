import { getTranslations, setRequestLocale } from "next-intl/server";
import { siteImage } from "@/lib/images";
import { PRODUCT_CATEGORIES } from "@/lib/product-categories";
import { DepthQueue, type QueueItem } from "@/components/void/DepthQueue";
import { PageTitle } from "@/components/void/PageTitle";
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

// The five lines again, as the index.
export default async function ProductosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, tVoid] = await Promise.all([getTranslations("pages.productos"), getTranslations("void")]);
  const words = tVoid.raw("lines") as Omit<QueueItem, "image">[];
  const items: QueueItem[] = PRODUCT_CATEGORIES.map((cat, i) => ({
    word: words[i]?.word ?? t(`categories.${cat.value}.title`),
    title: t(`categories.${cat.value}.title`),
    text: t(`categories.${cat.value}.description`),
    href: `/productos/${cat.value}`,
    image: siteImage(`blvckstone-${cat.value}`),
  }));

  return (
    <>
      <PageTitle title={t("title")} text={t("description")} />
      <DepthQueue items={items} cta={tVoid("linesCta")} />
    </>
  );
}
