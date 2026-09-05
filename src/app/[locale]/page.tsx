import { desc, eq } from "drizzle-orm";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { db } from "@/db";
import { posts, testimonials } from "@/db/schema";
import { routing } from "@/i18n/routing";
import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { ServicesBento } from "@/components/home/ServicesBento";
import { Differentiators } from "@/components/home/Differentiators";
import { VerticalsGallery } from "@/components/home/VerticalsGallery";
import { TestimonialsFeature } from "@/components/home/TestimonialsFeature";
import { BlogTeaser } from "@/components/home/BlogTeaser";
import { CtaBand } from "@/components/CtaBand";
import { pageMetadata } from "@/lib/metadata";

export const revalidate = 60;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("home");
  return pageMetadata({
    locale,
    path: "",
    title: t("heroHeadline"),
    description: t("heroSubheadline"),
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [tHome, tStats, tServices, tDiff, tSolutions, tTesti, tBlog, tCtaFinal, tCta] =
    await Promise.all([
      getTranslations("home"),
      getTranslations("stats"),
      getTranslations("services"),
      getTranslations("differentiators"),
      getTranslations("solutions"),
      getTranslations("testimonials"),
      getTranslations("blogTeaser"),
      getTranslations("ctaFinal"),
      getTranslations("cta"),
    ]);

  const [testimonialRows, postRows] = db
    ? await Promise.all([
        db.select().from(testimonials).orderBy(desc(testimonials.createdAt)).limit(3),
        db
          .select()
          .from(posts)
          .where(eq(posts.locale, locale))
          .orderBy(desc(posts.publishedAt))
          .limit(3),
      ])
    : [[], []];

  return (
    <>
      <Hero
        eyebrow={tHome("heroEyebrow")}
        headline={tHome("heroHeadline")}
        subheadline={tHome("heroSubheadline")}
        primaryCta={tCta("explore")}
        secondaryCta={tCta("demo")}
        imageAlt={tHome("heroImageAlt")}
      />
      <Stats
        title={tStats("title")}
        intro={tStats("intro")}
        items={tStats.raw("items")}
      />
      <ServicesBento
        eyebrow={tServices("eyebrow")}
        title={tServices("title")}
        items={tServices.raw("items")}
      />
      <Differentiators
        title={tDiff("title")}
        intro={tDiff("intro")}
        items={tDiff.raw("items")}
      />
      <VerticalsGallery
        title={tSolutions("title")}
        intro={tSolutions("intro")}
        items={tSolutions.raw("items")}
        ctaLabel={tCta("viewAll")}
      />
      <TestimonialsFeature
        eyebrow={tTesti("eyebrow")}
        title={tTesti("title")}
        items={testimonialRows}
      />
      <BlogTeaser
        title={tBlog("title")}
        intro={tBlog("intro")}
        items={postRows}
        locale={locale}
        viewAllLabel={tCta("viewAll")}
      />
      <CtaBand
        title={tCtaFinal("title")}
        text={tCtaFinal("text")}
        ctaLabel={tCta("demo")}
      />
    </>
  );
}
