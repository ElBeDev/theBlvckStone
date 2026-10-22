import { ArrowRight } from "@phosphor-icons/react/ssr";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";

export type PostItem = {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  publishedAt: Date;
};

export function BlogTeaser({
  title,
  intro,
  items,
  locale,
  viewAllLabel,
}: {
  title: string;
  intro: string;
  items: PostItem[];
  locale: string;
  viewAllLabel: string;
}) {
  if (items.length === 0) return null;

  return (
    <section className="bg-black-base text-ivory">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 lg:py-28">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-black leading-tight tracking-tight md:text-4xl">
              {title}
            </h2>
            <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-mist/70">
              {intro}
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex w-fit items-center gap-1.5 text-sm font-bold text-turquoise transition-colors hover:text-mint"
          >
            {viewAllLabel}
            <ArrowRight size={16} weight="bold" />
          </Link>
        </Reveal>

        <div className="mt-10 divide-y divide-white/10 border-t border-white/10">
          {items.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.06}>
              <Link
                href={`/blog/${post.slug}`}
                className="group grid gap-3 py-7 md:grid-cols-12 md:items-center md:gap-8"
              >
                <p className="text-xs font-bold uppercase tracking-wide text-mist/60 md:col-span-2">
                  {new Date(post.publishedAt).toLocaleDateString(locale, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <div className="md:col-span-9">
                  <h3 className="text-xl font-bold leading-snug transition-colors group-hover:text-turquoise md:text-2xl">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="mt-2 max-w-[70ch] text-sm leading-relaxed text-mist/65">
                      {post.excerpt}
                    </p>
                  )}
                </div>
                <ArrowRight
                  size={22}
                  weight="bold"
                  className="hidden justify-self-end text-turquoise transition-transform group-hover:translate-x-1 md:col-span-1 md:block"
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
