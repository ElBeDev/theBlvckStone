// The catalog is the site's structure: every service is an entry with a code
// (zone letter + number) that also places it on the plant plan. Zones are
// where the work happens in a plant, not business lines; a line can touch
// several zones. Entries are keyed by base slug (products.slug minus locale).

export const ZONES = [
  { code: "A", key: "techo" },
  { code: "B", key: "energia" },
  { code: "C", key: "patio" },
  { code: "D", key: "nave" },
  { code: "E", key: "oficina" },
] as const;

export type ZoneCode = (typeof ZONES)[number]["code"];
export type ZoneKey = (typeof ZONES)[number]["key"];

const ENTRIES_BY_ZONE: Record<ZoneCode, string[]> = {
  A: [
    "sistemas-fotovoltaicos",
    "cubiertas-fachadas-metalicas",
    "impermeabilizacion-mantenimiento-cubiertas",
    "recubrimiento-termico",
  ],
  B: ["diagnostico-energetico", "bess-comercial-industrial", "inversores-bess-utility"],
  C: [
    "van-electrica-carga-grande",
    "van-electrica-compacta",
    "infraestructura-carga",
    "estacion-carga-negocio",
    "mantenimiento-flotas-lubricantes",
    "proteccion-pavimentos",
    "proyectos-ferroviarios",
  ],
  D: [
    "naves-membrana-tensada",
    "recubrimientos-industriales",
    "certificacion-leed-edge",
    "piedra-sinterizada",
    "cocinas-mobiliario",
  ],
  E: [
    "deduccion-inmediata-energia",
    "arrendamiento-credito-ppa",
    "financiamiento-proyectos-productivos",
    "credito-puente-inmobiliario",
    "coberturas-financieras",
    "blindaje-combustible",
    "inversion-tasa-fija",
    "programa-productividad",
    "administracion-nomina",
    "servicios-sindicales",
  ],
};

export type EntryRef = { slug: string; zone: ZoneCode; code: string; n: number };

export const ENTRY_INDEX: Record<string, EntryRef> = Object.fromEntries(
  ZONES.flatMap(({ code }) =>
    ENTRIES_BY_ZONE[code].map((slug, i) => [
      slug,
      { slug, zone: code, code: `${code}-${String(i + 1).padStart(2, "0")}`, n: i + 1 },
    ]),
  ),
);

export const ENTRY_COUNT = Object.keys(ENTRY_INDEX).length;

export function zoneSize(zone: ZoneCode) {
  return ENTRIES_BY_ZONE[zone].length;
}

export function baseSlug(productSlug: string) {
  return productSlug.replace(/-(es|en)$/, "");
}

// Route state (the marked entries) lives in the browser only.
export const ROUTE_STORAGE_KEY = "tbs-ruta";
export const VISITED_STORAGE_KEY = "tbs-visitado";
export const ROUTE_EVENT = "tbs-ruta-change";

export function parseRouteParam(value: string | undefined | null) {
  if (!value) return [] as string[];
  return value
    .split(",")
    .map((c) => c.trim().toUpperCase())
    .filter((c) => /^[A-E]-\d{2}$/.test(c));
}
