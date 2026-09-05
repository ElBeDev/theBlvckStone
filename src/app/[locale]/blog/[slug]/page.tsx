import { ArrowLeft } from "@phosphor-icons/react/ssr";
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { Link } from "@/i18n/navigation";
import { DuotoneImage, placeholderUrl } from "@/components/DuotoneImage";
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
  return pageMetadata({
    locale,
    path: `/blog/${slug}`,
    title: post.title,
    description: post.excerpt ?? post.title,
  });
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

  return (
    <article className="bg-white">
      <div className="mx-auto max-w-7xl px-5 pt-10 md:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-teal transition-colors hover:text-petrol"
        >
          <ArrowLeft size={16} weight="bold" />
          {tNav("blog")}
        </Link>
      </div>

      <header className="mx-auto max-w-3xl px-5 pt-8 md:px-8">
        <p className="text-xs font-bold uppercase tracking-wide text-teal">
          {new Date(post.publishedAt).toLocaleDateString(locale, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h1 className="mt-4 text-3xl font-black leading-[1.1] tracking-tighter text-petrol lg:text-[2.2rem]">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="mt-6 text-lg leading-relaxed text-carbon/75">{post.excerpt}</p>
        )}
      </header>

      <div className="mx-auto max-w-5xl px-5 pt-10 md:px-8">
        <DuotoneImage
          src={placeholderUrl(`post-${post.slug}`, 1600, 900)}
          alt={post.title}
          width={1600}
          height={900}
          priority
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="aspect-[16/9] w-full rounded-2xl"
        />
      </div>

      <div
        className="prose-blvck mx-auto max-w-3xl space-y-5 px-5 pt-12 pb-24 text-lg leading-relaxed text-carbon md:px-8 [&_a]:font-bold [&_a]:text-teal [&_a]:underline [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-black [&_h2]:tracking-tight [&_h2]:text-petrol [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-petrol [&_li]:ml-6 [&_ol]:list-decimal [&_strong]:text-petrol [&_ul]:list-disc"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}
