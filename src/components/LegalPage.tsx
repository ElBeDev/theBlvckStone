import { getTranslations } from "next-intl/server";

type LegalSection = { heading: string; body: string };

// Legal texts as numbered clauses on the rule grid.
export async function LegalPage({
  doc,
}: {
  doc: "privacidad" | "terminos" | "cookies";
}) {
  const t = await getTranslations("pages.legal");
  const sections = t.raw(`${doc}.sections`) as LegalSection[];

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6">
      <section className="pt-10 md:pt-14">
        <h1 className="t-display max-w-[16ch] text-4xl font-black text-ink md:text-6xl">{t(`${doc}.title`)}</h1>
        <p className="t-cond mt-5 text-[11px] text-ink-3">{t("updated")}</p>
        <p className="t-cond mt-4 inline-block border border-rule-strong px-2.5 py-1 text-[11px] font-bold text-ink-2">{t("draftNotice")}</p>
      </section>
      <ol className="mt-10 mb-20 max-w-4xl border-t border-rule">
        {sections.map((section, i) => (
          <li key={section.heading} className="rule-b grid gap-2 py-6 md:grid-cols-12 md:gap-8">
            <span className="t-cond text-xs font-bold text-ink-2 md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
            <h2 className="text-lg font-bold text-ink md:col-span-3">{section.heading}</h2>
            <p className="t-body max-w-[62ch] leading-relaxed text-ink-2 md:col-span-8">{section.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
