import { ArrowRight } from "@phosphor-icons/react/ssr";
import { desc, eq } from "drizzle-orm";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { DuotoneImage, placeholderUrl } from "@/components/DuotoneImage";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("pages.blog");
  return pageMetadata({
    locale,
    path: "/blog",
    title: t("title"),
    description: t("description"),
  });
}

function formatDate(date: Date, locale: string) {
  return new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, tCta] = await Promise.all([
    getTranslations("pages.blog"),
    getTranslations("cta"),
  ]);

  const items = db
    ? await db
        .select()
        .from(posts)
        .where(eq(posts.locale, locale))
        .orderBy(desc(posts.publishedAt))
    : [];
  const [featured, ...rest] = items;

  return (
    <>
      <PageHero title={t("title")} description={t("description")} />

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
          {!featured ? (
            <p className="text-lg text-carbon/75">{t("empty")}</p>
          ) : (
            <>
              <Reveal>
                <Link
                  href={`/blog/${featured.slug}`}
                  className="group grid gap-8 overflow-hidden rounded-2xl bg-mist md:grid-cols-12"
                >
                  <DuotoneImage
                    src={placeholderUrl(`post-${featured.slug}`, 1200, 800)}
                    alt={featured.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="relative aspect-[16/10] md:col-span-6 md:aspect-auto md:min-h-[380px]"
                  />
                  <div className="flex flex-col justify-center p-8 md:col-span-6 md:py-12">
                    <p className="text-xs font-bold uppercase tracking-wide text-teal">
                      {formatDate(featured.publishedAt, locale)}
                    </p>
                    <h2 className="mt-4 text-2xl font-black leading-tight tracking-tight text-petrol transition-colors group-hover:text-teal md:text-3xl">
                      {featured.title}
                    </h2>
                    {featured.excerpt && (
                      <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-carbon/75">
                        {featured.excerpt}
                      </p>
                    )}
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-teal">
                      {tCta("readMore")}
                      <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>

              {rest.length > 0 && (
                <div className="mt-16">
                  <Reveal>
                    <h2 className="text-xl font-black tracking-tight text-petrol">
                      {t("latest")}
                    </h2>
                  </Reveal>
                  <div className="mt-4 divide-y divide-petrol/10 border-t border-petrol/10">
                    {rest.map((post, i) => (
                      <Reveal key={post.id} delay={i * 0.05}>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="group grid gap-3 py-7 md:grid-cols-12 md:items-center md:gap-8"
                        >
                          <p className="text-xs font-bold uppercase tracking-wide text-carbon/75 md:col-span-3">
                            {formatDate(post.publishedAt, locale)}
                          </p>
                          <div className="md:col-span-8">
                            <h3 className="text-xl font-bold leading-snug text-petrol transition-colors group-hover:text-teal">
                              {post.title}
                            </h3>
                            {post.excerpt && (
                              <p className="mt-2 max-w-[70ch] text-sm leading-relaxed text-carbon/75">
                                {post.excerpt}
                              </p>
                            )}
                          </div>
                          <ArrowRight
                            size={22}
                            weight="bold"
                            className="hidden justify-self-end text-teal transition-transform group-hover:translate-x-1 md:col-span-1 md:block"
                          />
                        </Link>
                      </Reveal>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
