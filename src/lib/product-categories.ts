export const PRODUCT_CATEGORIES = [
  { value: "energia-limpia", label: "Energía Limpia" },
  { value: "electromovilidad", label: "Electromovilidad" },
  { value: "financiamiento", label: "Financiamiento" },
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]["value"];
