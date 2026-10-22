import { ArrowLeft } from "@phosphor-icons/react/ssr";
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { Link } from "@/i18n/navigation";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

// No se precomputan slugs en build: el contenido vive en Postgres y se
// sirve on-demand para que un post publicado en /admin aparezca sin redeploy.
export function generateStaticParams() {
  return [];
}

async function getPost(slug: string, locale: string) {
  if (!db) return null;
  const [post] = await db.select().from(posts).where(and(eq(posts.slug, slug), eq(posts.locale, locale)));
  return post ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await getPost(slug, locale);
  if (!post) return {};
  return pageMetadata({ locale, path: `/blog/${slug}`, title: post.title, description: post.excerpt ?? post.title });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = await getPost(slug, locale);
  if (!post) notFound();

  const [tNav, tBlog] = await Promise.all([getTranslations("nav"), getTranslations("pages.blog")]);
  const html = await marked.parse(post.body);
  const dateFormat = new Intl.DateTimeFormat(locale === "es" ? "es-MX" : "en-US", { day: "numeric", month: "long", year: "numeric" });

  return (
    <article className="mx-auto max-w-7xl px-5 pb-24 pt-10 md:px-8">
      <Link href="/blog" className="inline-flex items-center gap-2 text-base font-bold text-ink-1 hover:text-ink-0">
        <ArrowLeft size={18} weight="bold" />
        {tNav("blog")}
      </Link>
      <header className="mt-12 max-w-4xl">
        <p className="text-base text-ink-2">
          {dateFormat.format(post.publishedAt)} · {tBlog("demoTag")}
        </p>
        <h1 data-depth={0} className="v-display mt-4 text-4xl sm:text-5xl md:text-6xl">
          {post.title}
        </h1>
        {post.excerpt && <p className="v-body mt-8 max-w-[50ch] text-xl leading-snug text-ink-1 md:text-2xl">{post.excerpt}</p>}
      </header>
      <div
        className="v-body mt-14 max-w-[64ch] space-y-6 text-xl leading-relaxed text-ink-0 [&_a]:font-bold [&_a]:text-signal [&_a]:underline [&_h2]:v-title [&_h2]:mt-12 [&_h2]:text-3xl [&_h3]:mt-8 [&_h3]:text-2xl [&_h3]:font-bold [&_li]:ml-6 [&_ol]:list-decimal [&_strong]:text-ink-0 [&_ul]:list-disc"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}
