import { ArrowLeft } from "@phosphor-icons/react/ssr";
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { Link } from "@/i18n/navigation";
import { siteImage } from "@/lib/images";
import { PhotoPlane } from "@/components/void/PhotoPlane";
import { Signal } from "@/components/void/Signal";
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

  const [tNav, tBlog, tCta] = await Promise.all([
    getTranslations("nav"),
    getTranslations("pages.blog"),
    getTranslations("cta"),
  ]);
  const html = await marked.parse(post.body);
  const dateFormat = new Intl.DateTimeFormat(locale === "es" ? "es-MX" : "en-US", { day: "numeric", month: "long", year: "numeric" });

  return (
    <article>
      <header className="relative isolate">
        <PhotoPlane src={siteImage(`post-${post.slug}`)} depth={3} priority />
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-10 md:px-8 md:pb-24">
          <Link href="/blog" className="inline-flex items-center gap-2 text-base font-bold text-ink-1 hover:text-ink-0">
            <ArrowLeft size={18} weight="bold" />
            {tNav("blog")}
          </Link>
          <p className="mt-16 text-base text-ink-2 md:mt-24">
            {dateFormat.format(post.publishedAt)} · {tBlog("demoTag")}
          </p>
          <h1 data-depth={0} className="v-title mt-4 max-w-[22ch] text-[2.25rem] md:text-5xl">
            {post.title}
          </h1>
          {post.excerpt && <p className="v-body mt-8 max-w-[46ch] text-xl leading-snug text-ink-1 md:text-2xl">{post.excerpt}</p>}
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-5 pb-24 md:px-8 md:pb-32">
        <div className="prose-void" dangerouslySetInnerHTML={{ __html: html }} />
        <div className="mt-16">
          <Signal label={tCta("demo")} />
        </div>
      </div>
    </article>
  );
}
