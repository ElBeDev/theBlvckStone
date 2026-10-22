import { getTranslations, setRequestLocale } from "next-intl/server";
import { siteImage } from "@/lib/images";
import { DepthQueue, type QueueItem } from "@/components/void/DepthQueue";
import { PageTitle } from "@/components/void/PageTitle";
import { pageMetadata } from "@/lib/metadata";

type Vertical = { word: string; title: string; description: string; seed: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("pages.soluciones");
  return pageMetadata({ locale, path: "/soluciones", title: t("title"), description: t("description") });
}

// Four verticals as a queue in depth.
export default async function SolucionesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [tPage, tSolutions, tCta] = await Promise.all([
    getTranslations("pages.soluciones"),
    getTranslations("solutions"),
    getTranslations("cta"),
  ]);
  const items: QueueItem[] = (tSolutions.raw("items") as Vertical[]).map((v) => ({
    word: v.word,
    title: v.title,
    text: v.description,
    href: "/contacto",
    image: siteImage(v.seed),
  }));

  return (
    <>
      <PageTitle title={tPage("title")} text={tPage("description")} />
      <DepthQueue items={items} cta={tCta("designSolution")} />
    </>
  );
}
