import { ArrowRight } from "@phosphor-icons/react/ssr";
import { desc, eq } from "drizzle-orm";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { Link } from "@/i18n/navigation";
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

// The bulletin: dated rows on the rule grid, newest first.
export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, tCta] = await Promise.all([getTranslations("pages.blog"), getTranslations("cta")]);
  const items = db
    ? await db.select().from(posts).where(eq(posts.locale, locale)).orderBy(desc(posts.publishedAt))
    : [];
  const dateFormat = new Intl.DateTimeFormat(locale === "es" ? "es-MX" : "en-US", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6">
      <section className="pt-10 md:pt-14">
        <h1 className="t-display max-w-[16ch] text-4xl font-black text-ink md:text-6xl">{t("title")}</h1>
        <p className="t-body mt-5 max-w-[56ch] text-base leading-relaxed text-ink-2 md:text-lg">{t("description")}</p>
        <p className="t-cond mt-4 text-[11px] text-ink-3">{t("count", { count: items.length })}</p>
        <p className="t-cond mt-4 inline-block border border-rule-strong px-2.5 py-1 text-[11px] font-bold text-ink-2">{t("demoNotice")}</p>
      </section>

      <section className="mt-10 mb-16">
        {items.length === 0 ? (
          <p className="rule-t py-10 text-lg text-ink-2">{t("empty")}</p>
        ) : (
          <ul className="border-t border-rule">
            {items.map((post, i) => (
              <li key={post.id} className="rule-b">
                <Link href={`/blog/${post.slug}`} className="group grid gap-3 py-7 md:grid-cols-12 md:items-baseline md:gap-8">
                  <div className="t-cond flex gap-3 text-[11px] text-ink-3 md:col-span-2 md:flex-col md:gap-1">
                    <span className="text-ink-2">{String(i + 1).padStart(2, "0")}</span>
                    <span>{dateFormat.format(post.publishedAt)}</span>
                    <span>{t("demoTag")}</span>
                  </div>
                  <div className="md:col-span-8">
                    <h2 className="t-wide text-xl font-black leading-tight text-ink transition-colors group-hover:text-pen md:text-2xl">{post.title}</h2>
                    {post.excerpt && <p className="t-body mt-3 max-w-[64ch] text-base leading-relaxed text-ink-2">{post.excerpt}</p>}
                  </div>
                  <span className="t-cond inline-flex items-center gap-1 text-[11px] font-bold text-ink-2 md:col-span-2 md:justify-self-end">
                    {tCta("readMore")}
                    <ArrowRight size={12} weight="bold" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
