import { getTranslations, setRequestLocale } from "next-intl/server";
import { ZONES, type ZoneCode } from "@/lib/catalog";
import { getEntries } from "@/lib/entries";
import { ZoneSheet } from "@/components/catalog/ZoneSheet";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("pages.soluciones");
  return pageMetadata({ locale, path: "/soluciones", title: t("title"), description: t("description") });
}

// The plan by zone: where in a plant each entry goes, zone by zone.
export default async function SolucionesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, tc, tz, tEntries] = await Promise.all([
    getTranslations("pages.soluciones"),
    getTranslations("catalog"),
    getTranslations("zones"),
    getTranslations("entries"),
  ]);
  const entries = await getEntries(locale);
  const zoneNames = Object.fromEntries(ZONES.map((z) => [z.code, tz(`${z.key}.name`)])) as Record<ZoneCode, string>;
  const zoneTexts = Object.fromEntries(ZONES.map((z) => [z.code, tz(`${z.key}.text`)])) as Record<ZoneCode, string>;

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6">
      <section className="pt-10 md:pt-14">
        <h1 className="t-display max-w-[16ch] text-4xl font-black text-ink md:text-6xl">{t("title")}</h1>
        <p className="t-body mt-5 max-w-[56ch] text-base leading-relaxed text-ink-2 md:text-lg">{t("description")}</p>
        <p className="t-cond mt-4 text-[11px] text-ink-3">{tc("zonesCount", { count: ZONES.length })} · {tc("entries", { count: entries.length })}</p>
      </section>
      <div className="mt-10 mb-16">
        <ZoneSheet
          entries={entries.map((e) => ({ code: e.code, zone: e.zone, n: e.n, slug: e.slug, title: e.title, short: tEntries.has(e.slug) ? tEntries(e.slug) : e.title, imageUrl: e.imageUrl, href: e.href }))}
          zoneNames={zoneNames}
          zoneTexts={zoneTexts}
          labels={{ planTitle: tc("planTitle"), mark: tc("mark"), unmark: tc("unmark"), open: tc("open") }}
        />
      </div>
    </div>
  );
}
