import { desc, eq } from "drizzle-orm";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { PageHeading } from "@/components/PageHeading";
import { PendingSection } from "@/components/PendingSection";
import { Link } from "@/i18n/navigation";

export const dynamic = "force-dynamic";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pages.blog");

  const items = db
    ? await db
        .select()
        .from(posts)
        .where(eq(posts.locale, locale))
        .orderBy(desc(posts.publishedAt))
    : [];

  return (
    <>
      <PageHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />
      {items.length === 0 ? (
        <PendingSection text={t("empty")} />
      ) : (
        <div className="mx-auto grid max-w-4xl gap-6 px-6 py-16">
          {items.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="rounded-2xl border border-mist bg-white p-6 shadow-sm transition-transform hover:-translate-y-1"
            >
              <h2 className="text-xl font-bold text-carbon">{post.title}</h2>
              {post.excerpt && (
                <p className="mt-2 text-sm text-stone">{post.excerpt}</p>
              )}
              <p className="mt-3 text-xs font-bold text-turquoise">
                {new Date(post.publishedAt).toLocaleDateString(locale)}
              </p>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
