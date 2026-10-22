import { getTranslations, setRequestLocale } from "next-intl/server";
import { siteImage } from "@/lib/images";
import { Line } from "@/components/void/Line";
import { PageTitle } from "@/components/void/PageTitle";
import { Signal } from "@/components/void/Signal";
import { pageMetadata } from "@/lib/metadata";

type Step = { title: string; description: string };
type Member = { name: string; role: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("pages.nosotros");
  return pageMetadata({ locale, path: "/nosotros", title: t("title"), description: t("description") });
}

export default async function NosotrosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, tCta] = await Promise.all([getTranslations("pages.nosotros"), getTranslations("cta")]);
  const story = t.raw("story") as string[];
  const how = t.raw("how") as Step[];
  const team = t.raw("team") as Member[];
  const certifications = t.raw("certifications") as string[];

  return (
    <>
      <PageTitle title={t("title")} text={t("description")} image={siteImage("blvckstone-team-industrial")} />

      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <div className="v-body max-w-[52ch] space-y-8 text-xl leading-snug text-ink-0 md:text-2xl">
          {story.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <Line depth={1} size="md" as="h2">
          {t("howTitle")}
        </Line>
        <ol className="mt-14 space-y-12">
          {how.map((step, i) => (
            <li key={step.title} className="grid gap-4 md:grid-cols-12 md:items-baseline">
              <span data-depth={2} className="v-num text-3xl md:col-span-1">
                {i + 1}
              </span>
              <h3 data-depth={0} className="v-title text-3xl md:col-span-5 md:text-4xl">
                {step.title}
              </h3>
              <p className="v-body max-w-[44ch] text-lg text-ink-1 md:col-span-6 md:text-xl">{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Line depth={1} size="md" as="h2">
            {t("certificationsTitle")}
          </Line>
        </div>
        <Line depth={0} size="xl" bleed className="mt-10">
          {certifications.join("   ·   ")}
        </Line>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <Line depth={1} size="md" as="h2">
          {t("teamTitle")}
        </Line>
        <ul className="mt-14 space-y-10">
          {team.map((m) => (
            <li key={m.name}>
              <p data-depth={0} className="v-title text-4xl md:text-6xl">
                {m.name}
              </p>
              <p className="mt-3 text-lg text-ink-1 md:text-xl">{m.role}</p>
            </li>
          ))}
        </ul>
        <div className="mt-16">
          <Signal label={tCta("demo")} />
        </div>
      </section>
    </>
  );
}
