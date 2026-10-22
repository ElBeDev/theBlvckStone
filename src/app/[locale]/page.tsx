import { ArrowRight } from "@phosphor-icons/react/ssr";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { ENTRY_COUNT, ZONES, type ZoneCode } from "@/lib/catalog";
import { getEntries } from "@/lib/entries";
import { CatalogSheet } from "@/components/catalog/CatalogSheet";
import { SectionHead } from "@/components/catalog/SectionHead";
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
  return pageMetadata({ locale, path: "", title: t("hook"), description: t("sub") });
}

type Example = {
  title: string;
  rows: { label: string; value: string }[];
  basis: string;
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, tc, tz, tRoute, tEntries] = await Promise.all([
    getTranslations("home"),
    getTranslations("catalog"),
    getTranslations("zones"),
    getTranslations("route"),
    getTranslations("entries"),
  ]);

  const entries = await getEntries(locale);

  const zoneNames = Object.fromEntries(ZONES.map((z) => [z.code, tz(`${z.key}.name`)])) as Record<ZoneCode, string>;
  const examples = t.raw("examples") as Example[];
  const commitments = t.raw("commitments") as { label: string; value: string }[];
  const steps = t.raw("steps") as { title: string; text: string }[];

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6">
      {/* Cover: one line of title, the offer beside it, then the sheet */}
      <section className="grid gap-4 pt-6 pb-5 md:pt-8 md:pb-6 lg:grid-cols-12 lg:items-end lg:gap-10">
        <h1 className="t-display max-w-[20ch] text-[2.5rem] font-black text-ink sm:text-5xl lg:col-span-7 lg:text-[3.25rem]">
          {t("hook")}
        </h1>
        <div className="lg:col-span-5">
          <p className="t-body max-w-[46ch] text-base leading-snug text-ink-2">{t("sub")}</p>
          <p className="t-cond mt-2 text-[11px] text-ink-3">
            {tc("entries", { count: ENTRY_COUNT })} · {tc("zonesCount", { count: ZONES.length })} · {t("hint")}
          </p>
        </div>
      </section>

      {/* The sheet: plan and cells */}
      <div>
        <CatalogSheet
          entries={entries.map((e) => ({
            code: e.code,
            zone: e.zone,
            n: e.n,
            slug: e.slug,
            title: e.title,
            short: tEntries.has(e.slug) ? tEntries(e.slug) : e.title,
            imageUrl: e.imageUrl,
            href: e.href,
          }))}
          zoneNames={zoneNames}
          labels={{
            planTitle: tc("planTitle"),
            planHint: tc("planHint"),
            gridTitle: tc("gridTitle"),
            gridHint: tc("gridHint"),
            mark: tc("mark"),
            unmark: tc("unmark"),
            open: tc("open"),
          }}
        />
      </div>

      {/* Zone key */}
      <ul className="cell-grid grid-cols-2 border-t-0 md:grid-cols-5">
        {ZONES.map((z) => (
          <li key={z.code} className="flex gap-3 p-4">
            <span className="t-cond flex h-5 w-5 shrink-0 items-center justify-center border border-rule-strong text-[11px] font-extrabold text-ink">{z.code}</span>
            <div>
              <p className="t-cond text-[11px] font-bold text-ink">{tz(`${z.key}.name`)}</p>
              <p className="t-body mt-1 text-xs leading-snug text-ink-2">{tz(`${z.key}.text`)}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Worked examples: real numbers, each with its basis line */}
      <section className="mt-20">
        <SectionHead title={t("examplesTitle")} note={t("examplesNote")} />
        <div className="cell-grid md:grid-cols-3">
          {examples.map((ex) => (
            <article key={ex.title} className="flex flex-col p-5 md:p-6">
              <h3 className="t-wide text-lg font-black leading-tight text-ink">{ex.title}</h3>
              <dl className="mt-5 flex-1">
                {ex.rows.map((row) => (
                  <div key={row.label} className="rule-b flex items-baseline justify-between gap-4 py-2 last:border-0">
                    <dt className="t-cond text-[11px] text-ink-3">{row.label}</dt>
                    <dd className="text-right text-sm font-bold text-ink">{row.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="t-body mt-5 text-xs leading-snug text-ink-3">{ex.basis}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Operating commitments as a specs table */}
      <section className="mt-20">
        <SectionHead title={t("commitmentsTitle")} note={t("commitmentsNote")} />
        <dl className="cell-grid md:grid-cols-2">
          {commitments.map((row) => (
            <div key={row.label} className="flex items-baseline justify-between gap-6 px-5 py-4">
              <dt className="t-cond text-[11px] text-ink-2">{row.label}</dt>
              <dd className="text-right text-base font-bold text-ink">{row.value}</dd>
            </div>
          ))}
        </dl>
        {/* Installed projects: the slot exists, the figures wait for the client's sign-off */}
        <dl className="rule-b flex flex-col gap-2 py-4 md:flex-row md:items-baseline md:justify-between md:gap-6">
          <dt className="t-cond text-[11px] text-ink-2">{t("installedLabel")}</dt>
          <dd className="t-body max-w-[60ch] text-sm text-ink-3">{t("installedPending")}</dd>
        </dl>
      </section>

      {/* Working route: the sequence carries information, so it is numbered */}
      <section className="mt-20">
        <SectionHead title={t("stepsTitle")} />
        <ol className="cell-grid md:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="p-5 md:p-6">
              <p className="t-cond text-xs font-bold text-ink-2">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 text-lg font-bold leading-tight text-ink">{step.title}</h3>
              <p className="t-body mt-3 text-sm leading-relaxed text-ink-2">{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="rule-b flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
          <p className="t-body max-w-[52ch] text-base text-ink-2">{t("stepsClose")}</p>
          <Link
            href="/contacto"
            className="inline-flex w-fit items-center gap-2 rounded-xs bg-pen px-5 py-3 text-sm font-bold text-petrol transition-transform hover:-translate-y-px"
          >
            {tRoute("cta")}
            <ArrowRight size={16} weight="bold" />
          </Link>
        </div>
      </section>

    </div>
  );
}
