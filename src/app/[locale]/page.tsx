import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { siteImage } from "@/lib/images";
import { DepthQueue, type QueueItem } from "@/components/void/DepthQueue";
import { Line } from "@/components/void/Line";
import { PhotoPlane } from "@/components/void/PhotoPlane";
import { Signal } from "@/components/void/Signal";
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
  const t = await getTranslations("void");
  return pageMetadata({ locale, path: "", title: t("hook"), description: t("sub") });
}

type NumberItem = { value: string; text: string; basis: string };
type Step = { title: string; text: string };

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, tCta] = await Promise.all([getTranslations("void"), getTranslations("cta")]);
  const lines = (t.raw("lines") as Omit<QueueItem, "image">[]).map((l, i) => ({
    ...l,
    image: siteImage(["blvckstone-solar-field", "blvckstone-electric-truck", "blvckstone-finance", "blvckstone-industrial-building", "blvckstone-fiscal"][i]),
  }));
  const numbers = t.raw("numbers") as NumberItem[];
  const commitments = t.raw("commitments") as string[];
  const steps = t.raw("process") as Step[];

  return (
    <>
      {/* Title screen */}
      <section className="relative isolate">
        <PhotoPlane src={siteImage("blvckstone-hero-energy")} alt="" depth={2} priority className="plane-1" />
        <div className="mx-auto flex min-h-[calc(100svh-5rem)] max-w-7xl flex-col justify-end px-5 pb-16 pt-20 md:px-8 md:pb-24">
          <h1 data-depth={0} className="v-display max-w-[13ch] text-[2.5rem] sm:text-6xl md:text-7xl lg:text-[6rem]">
            {t("hook")}
          </h1>
          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="v-body max-w-[42ch] text-xl leading-snug text-ink-1 md:text-2xl">{t("sub")}</p>
            <Signal label={tCta("demo")} />
          </div>
        </div>
      </section>

      {/* The five lines, in depth */}
      <DepthQueue items={lines} cta={t("linesCta")} />

      {/* Numbers from our models, at poster size */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <Line depth={1} size="md" as="h2">
          {t("numbersLead")}
        </Line>
        <ol className="mt-16 space-y-20 md:space-y-28">
          {numbers.map((n) => (
            <li key={n.value} className="grid gap-6 md:grid-cols-12 md:items-end">
              <p data-depth={0} className="v-num text-[4rem] sm:text-7xl md:col-span-7 md:text-8xl lg:text-[7.5rem]">
                {n.value}
              </p>
              <div className="md:col-span-5 md:pb-3">
                <p className="v-body max-w-[36ch] text-2xl leading-snug text-ink-0 md:text-3xl">{n.text}</p>
                <p className="v-body mt-4 max-w-[48ch] text-base text-ink-2">{n.basis}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* What we sign, each line further back */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Line depth={1} size="md" as="h2">
            {t("commitLead")}
          </Line>
        </div>
        <ul className="mt-12 space-y-3 md:space-y-4">
          {commitments.map((line, i) => (
            <Line key={line} as="li" size="lg" bleed depth={Math.min(3, i) as 0 | 1 | 2 | 3} className={i > 0 ? `plane-${Math.min(3, i)}` : ""}>
              {line}
            </Line>
          ))}
        </ul>
      </section>

      {/* How the work runs */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <Line depth={1} size="md" as="h2">
          {t("processLead")}
        </Line>
        <ol className="mt-16 space-y-14">
          {steps.map((step, i) => (
            <li key={step.title} className="grid gap-4 md:grid-cols-12 md:items-baseline">
              <span data-depth={2} className="v-num text-3xl md:col-span-1">
                {i + 1}
              </span>
              <h3 data-depth={0} className="v-title text-3xl md:col-span-5 md:text-4xl">
                {step.title}
              </h3>
              <p className="v-body max-w-[44ch] text-lg text-ink-1 md:col-span-6 md:text-xl">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Close */}
      <section className="relative isolate">
        <PhotoPlane src={siteImage("blvckstone-industrial")} depth={3} className="plane-2" />
        <div className="mx-auto max-w-7xl px-5 py-32 md:px-8 md:py-44">
          <Line depth={0} size="xl" as="h2">
            {t("finalTitle")}
          </Line>
          <p className="v-body mt-8 max-w-[44ch] text-xl leading-snug text-ink-1 md:text-2xl">{t("finalText")}</p>
          <div className="mt-10">
            <Signal label={tCta("demo")} />
          </div>
        </div>
      </section>
    </>
  );
}
