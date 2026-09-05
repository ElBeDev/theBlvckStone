import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { pageMetadata } from "@/lib/metadata";

type Step = { title: string; description: string };
type Member = { name: string; role: string; initials: string };
type StatItem = { value: number; prefix?: string; suffix?: string; label: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("pages.nosotros");
  return pageMetadata({
    locale,
    path: "/nosotros",
    title: t("title"),
    description: t("description"),
  });
}

export default async function NosotrosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, tStats, tCta, tCtaFinal] = await Promise.all([
    getTranslations("pages.nosotros"),
    getTranslations("stats"),
    getTranslations("cta"),
    getTranslations("ctaFinal"),
  ]);

  const story = t.raw("story") as string[];
  const how = t.raw("how") as Step[];
  const team = t.raw("team") as Member[];
  const certifications = t.raw("certifications") as string[];
  const stats = tStats.raw("items") as StatItem[];

  return (
    <>
      <PageHero
        title={t("title")}
        description={t("description")}
        imageSeed="blvckstone-team-industrial"
      />

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-8 lg:grid-cols-12">
          <Reveal className="space-y-6 lg:col-span-7">
            {story.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="max-w-[65ch] text-lg leading-relaxed text-carbon"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
          <div className="grid grid-cols-2 gap-8 lg:col-span-5 lg:grid-cols-1 lg:border-l lg:border-petrol/10 lg:pl-10">
            {stats.slice(0, 3).map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.07}>
                <p className="text-4xl font-black tracking-tighter text-teal md:text-5xl">
                  <CountUp
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={Number.isInteger(stat.value) ? 0 : 1}
                  />
                </p>
                <p className="mt-1 text-sm text-carbon/75">{stat.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <Reveal>
            <h2 className="text-3xl font-black tracking-tight text-petrol md:text-4xl">
              {t("howTitle")}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {how.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08}>
                <div className="h-1 w-12 rounded-full bg-turquoise" />
                <h3 className="mt-5 text-xl font-bold text-petrol">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-carbon/75">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 md:px-8 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-2xl font-black tracking-tight text-petrol md:text-3xl">
              {t("certificationsTitle")}
            </h2>
            <ul className="mt-8 flex flex-wrap gap-3">
              {certifications.map((cert) => (
                <li
                  key={cert}
                  className="rounded-full border border-petrol/15 px-6 py-3 text-lg font-black tracking-tight text-petrol"
                >
                  {cert}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-2xl font-black tracking-tight text-petrol md:text-3xl">
              {t("teamTitle")}
            </h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2">
              {team.map((member) => (
                <li key={member.name} className="flex items-center gap-4">
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-petrol text-lg font-black text-turquoise">
                    {member.initials}
                  </span>
                  <div>
                    <p className="font-bold text-petrol">{member.name}</p>
                    <p className="text-sm text-carbon/75">{member.role}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CtaBand
        tone="light"
        title={tCtaFinal("title")}
        text={tCtaFinal("text")}
        ctaLabel={tCta("demo")}
      />
    </>
  );
}
