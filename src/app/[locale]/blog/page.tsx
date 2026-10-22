import { desc, eq } from "drizzle-orm";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { Link } from "@/i18n/navigation";
import { PageTitle } from "@/components/void/PageTitle";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("pages.blog");
  return pageMetadata({ locale, path: "/blog", title: t("title"), description: t("description") });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pages.blog");
  const items = db
    ? await db.select().from(posts).where(eq(posts.locale, locale)).orderBy(desc(posts.publishedAt))
    : [];
  const dateFormat = new Intl.DateTimeFormat(locale === "es" ? "es-MX" : "en-US", { day: "numeric", month: "long", year: "numeric" });

  return (
    <>
      <PageTitle title={t("title")} text={t("description")}>
        <p className="mt-6 text-base text-ink-2">{t("demoNotice")}</p>
      </PageTitle>
      <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
        {items.length === 0 ? (
          <p className="text-xl text-ink-1">{t("empty")}</p>
        ) : (
          <ul className="space-y-16">
            {items.map((post) => (
              <li key={post.id}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <p className="text-base text-ink-2">
                    {dateFormat.format(post.publishedAt)} · {t("demoTag")}
                  </p>
                  <h2 data-depth={0} className="v-title mt-3 max-w-[22ch] text-3xl group-hover:text-signal md:text-5xl">
                    {post.title}
                  </h2>
                  {post.excerpt && <p className="v-body mt-5 max-w-[56ch] text-lg text-ink-1 md:text-xl">{post.excerpt}</p>}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
