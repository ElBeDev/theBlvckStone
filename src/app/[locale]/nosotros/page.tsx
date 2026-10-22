import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { siteImage } from "@/components/DuotoneImage";
import { SectionHead } from "@/components/catalog/SectionHead";
import { pageMetadata } from "@/lib/metadata";

type Step = { title: string; description: string };
type Member = { name: string; role: string; initials: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("pages.nosotros");
  return pageMetadata({ locale, path: "/nosotros", title: t("title"), description: t("description") });
}

// The catalog's staff page: who signs the proposal, how the work runs, and
// what is certified. Commitments repeat from the home as the same table.
export default async function NosotrosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, tHome] = await Promise.all([getTranslations("pages.nosotros"), getTranslations("home")]);
  const story = t.raw("story") as string[];
  const how = t.raw("how") as Step[];
  const team = t.raw("team") as Member[];
  const certifications = t.raw("certifications") as string[];
  const commitments = tHome.raw("commitments") as { label: string; value: string }[];

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6">
      <section className="grid gap-8 pt-10 md:pt-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <h1 className="t-display max-w-[16ch] text-4xl font-black text-ink md:text-6xl">{t("title")}</h1>
          <p className="t-body mt-5 max-w-[56ch] text-base leading-relaxed text-ink-2 md:text-lg">{t("description")}</p>
          <div className="t-body mt-10 max-w-[62ch] space-y-5 text-base leading-relaxed text-ink">
            {story.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="duotone relative aspect-[4/3] border border-rule-strong">
            <Image src={siteImage("blvckstone-team-industrial")} alt="" fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
          <ul className="cell-grid border-t-0 sm:grid-cols-2">
            {team.map((member) => (
              <li key={member.name} className="flex items-center gap-4 p-4">
                <span className="t-cond flex h-11 w-11 shrink-0 items-center justify-center border border-rule-strong text-sm font-black text-ink">{member.initials}</span>
                <div>
                  <p className="font-bold text-ink">{member.name}</p>
                  <p className="t-cond mt-0.5 text-[11px] text-ink-3">{member.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-20">
        <SectionHead title={t("howTitle")} />
        <ol className="cell-grid md:grid-cols-3">
          {how.map((step, i) => (
            <li key={step.title} className="p-5 md:p-6">
              <p className="t-cond text-xs font-bold text-ink-2">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 text-lg font-bold leading-tight text-ink">{step.title}</h3>
              <p className="t-body mt-3 text-sm leading-relaxed text-ink-2">{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20">
        <SectionHead title={tHome("commitmentsTitle")} note={tHome("commitmentsNote")} />
        <dl className="cell-grid md:grid-cols-2">
          {commitments.map((row) => (
            <div key={row.label} className="flex items-baseline justify-between gap-6 px-5 py-4">
              <dt className="t-cond text-[11px] text-ink-2">{row.label}</dt>
              <dd className="text-right text-base font-bold text-ink">{row.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-20 mb-16">
        <SectionHead title={t("certificationsTitle")} />
        <ul className="flex flex-wrap border-t border-l border-rule">
          {certifications.map((cert) => (
            <li key={cert} className="t-wide border-r border-b border-rule px-6 py-4 text-xl font-black text-ink">
              {cert}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
