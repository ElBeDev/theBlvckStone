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
  const [post] = await db
    .select()
    .from(posts)
    .where(and(eq(posts.slug, slug), eq(posts.locale, locale)));
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

  const tNav = await getTranslations("nav");
  const html = await marked.parse(post.body);
  const dateFormat = new Intl.DateTimeFormat(locale === "es" ? "es-MX" : "en-US", { day: "2-digit", month: "long", year: "numeric" });

  return (
    <article className="mx-auto max-w-7xl px-4 md:px-6">
      <div className="t-cond flex items-center justify-between pt-8 text-[11px]">
        <Link href="/blog" className="inline-flex items-center gap-1.5 font-bold text-ink-2 transition-colors hover:text-pen">
          <ArrowLeft size={12} weight="bold" />
          {tNav("boletin")}
        </Link>
        <span className="text-ink-3">{dateFormat.format(post.publishedAt)}</span>
      </div>

      <header className="rule-t mt-4 max-w-3xl pt-8">
        <h1 className="t-display text-3xl font-black text-ink md:text-5xl">{post.title}</h1>
        {post.excerpt && <p className="t-body mt-6 max-w-[60ch] text-lg leading-relaxed text-ink-2">{post.excerpt}</p>}
      </header>

      <div
        className="t-body mt-10 mb-20 max-w-[68ch] space-y-5 text-lg leading-relaxed text-ink [&_a]:font-bold [&_a]:text-pen [&_a]:underline [&_h2]:t-wide [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-ink [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-ink [&_li]:ml-6 [&_ol]:list-decimal [&_strong]:text-ink [&_ul]:list-disc"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}
