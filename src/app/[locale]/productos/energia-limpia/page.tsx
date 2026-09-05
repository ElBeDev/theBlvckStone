import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductCategoryPage } from "@/components/ProductCategoryPage";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("pages.productos.categories.energia-limpia");
  return pageMetadata({
    locale,
    path: "/productos/energia-limpia",
    title: t("title"),
    description: t("description"),
  });
}

export default async function EnergiaLimpiaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ProductCategoryPage locale={locale} category="energia-limpia" />;
}
