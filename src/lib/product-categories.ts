export const PRODUCT_CATEGORIES = [
  { value: "energia-limpia", label: "Energía Limpia" },
  { value: "electromovilidad", label: "Electromovilidad" },
  { value: "financiamiento", label: "Financiamiento" },
  { value: "construccion", label: "Construcción e Infraestructura" },
  { value: "estrategia-fiscal", label: "Estrategia Fiscal y Laboral" },
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]["value"];
