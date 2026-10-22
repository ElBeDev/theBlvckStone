import { getTranslations } from "next-intl/server";
import { PageTitle } from "@/components/void/PageTitle";

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
      <PageTitle title={t(`${doc}.title`)}>
        <p className="mt-6 text-base text-ink-2">
          {t("updated")} · {t("draftNotice")}
        </p>
      </PageTitle>
      <ol className="mx-auto max-w-7xl space-y-14 px-5 pb-24 md:px-8">
        {sections.map((section, i) => (
          <li key={section.heading} className="grid gap-4 md:grid-cols-12">
            <span data-depth={2} className="v-num text-2xl md:col-span-1">
              {i + 1}
            </span>
            <h2 data-depth={0} className="v-title text-2xl md:col-span-4 md:text-3xl">
              {section.heading}
            </h2>
            <p className="v-body max-w-[60ch] text-lg text-ink-1 md:col-span-7">{section.body}</p>
          </li>
        ))}
      </ol>
    </>
  );
}
