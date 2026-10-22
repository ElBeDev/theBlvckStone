import { getTranslations, setRequestLocale } from "next-intl/server";
import { siteImage } from "@/lib/images";
import { Line } from "@/components/void/Line";
import { PageTitle } from "@/components/void/PageTitle";
import { Process, type Step } from "@/components/void/Process";
import { Signal } from "@/components/void/Signal";
import { pageMetadata } from "@/lib/metadata";

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

  const [t, tVoid, tCta] = await Promise.all([
    getTranslations("pages.nosotros"),
    getTranslations("void"),
    getTranslations("cta"),
  ]);
  const story = t.raw("story") as string[];
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

      {/* The same four steps the home page promises */}
      <Process title={tVoid("processLead")} steps={tVoid.raw("process") as Step[]} />

      {/* Certifications as one line of marks, each kept whole */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <Line depth={1} size="md" as="h2">
          {t("certificationsTitle")}
        </Line>
        <ul className="v-display mt-10 flex flex-wrap gap-x-[0.5em] gap-y-1 text-[2rem] sm:text-5xl md:text-6xl lg:text-[4.5rem]">
          {certifications.map((mark) => (
            <li key={mark} data-depth={0} className="whitespace-nowrap">
              {mark}
            </li>
          ))}
        </ul>
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
