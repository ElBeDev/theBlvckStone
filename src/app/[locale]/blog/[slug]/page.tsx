import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { setRequestLocale } from "next-intl/server";
import { db } from "@/db";
import { posts } from "@/db/schema";

export const dynamic = "force-dynamic";

// No se precomputan slugs en build — el contenido vive en Postgres y se
// sirve on-demand para que un post publicado en /admin aparezca sin redeploy.
export function generateStaticParams() {
  return [];
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  if (!db) notFound();

  const [post] = await db
    .select()
    .from(posts)
    .where(and(eq(posts.slug, slug), eq(posts.locale, locale)));

  if (!post) notFound();

  const html = await marked.parse(post.body);

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm font-bold text-turquoise">
        {new Date(post.publishedAt).toLocaleDateString(locale)}
      </p>
      <h1 className="mt-2 text-3xl font-black text-petrol md:text-4xl">
        {post.title}
      </h1>
      <div
        className="mt-8 space-y-4 leading-relaxed text-carbon [&_a]:text-turquoise [&_a]:underline [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-petrol [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-petrol [&_li]:ml-5 [&_ul]:list-disc"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}
