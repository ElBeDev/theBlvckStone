import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion/Reveal";

type LegalSection = { heading: string; body: string };

export async function LegalPage({
  doc,
}: {
  doc: "privacidad" | "terminos" | "cookies";
}) {
  const t = await getTranslations("pages.legal");
  const sections = t.raw(`${doc}.sections`) as LegalSection[];

  return (
    <>
      <PageHero title={t(`${doc}.title`)}>
        <p className="mt-6 text-sm text-carbon/75">{t("updated")}</p>
        <p className="mt-2 inline-block rounded-full border border-amber/50 bg-amber/10 px-3 py-1 text-xs font-bold text-petrol">
          {t("draftNotice")}
        </p>
      </PageHero>

      <section className="bg-white">
        <div className="mx-auto max-w-3xl space-y-10 px-5 py-16 md:px-8 lg:py-20">
          {sections.map((section, i) => (
            <Reveal key={section.heading} delay={Math.min(i, 3) * 0.04}>
              <h2 className="text-xl font-black tracking-tight text-petrol">
                {section.heading}
              </h2>
              <p className="mt-3 max-w-[65ch] leading-relaxed text-carbon">
                {section.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
