import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

// No hay posts todavía — se listarán desde Sanity una vez configurado el CMS.
export function generateStaticParams() {
  return [];
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  notFound();
}
