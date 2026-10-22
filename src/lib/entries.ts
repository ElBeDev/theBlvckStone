import { eq } from "drizzle-orm";
import { db } from "@/db";
import { products } from "@/db/schema";
import { baseSlug, ENTRY_INDEX, type EntryRef } from "@/lib/catalog";
import { siteImage } from "@/components/DuotoneImage";

export type Entry = EntryRef & {
  category: string;
  title: string;
  description: string;
  specs: { label: string; value: string }[];
  imageUrl: string;
  href: string;
};

export function parseSpecs(specs: string | null) {
  if (!specs) return [];
  return specs
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const idx = line.indexOf(":");
      if (idx === -1) return { label: "", value: line };
      return { label: line.slice(0, idx).trim(), value: line.slice(idx + 1).trim() };
    });
}

// Every catalog entry for a locale, in code order. Products without a code
// (created from /admin outside the catalog) are left out of the sheet but
// still listed on their line page.
export async function getEntries(locale: string): Promise<Entry[]> {
  if (!db) return [];
  const rows = await db.select().from(products).where(eq(products.locale, locale));
  const entries = rows.flatMap((row) => {
    const ref = ENTRY_INDEX[baseSlug(row.slug)];
    if (!ref) return [];
    return [
      {
        ...ref,
        category: row.category,
        title: row.title,
        description: row.description,
        specs: parseSpecs(row.specs),
        imageUrl: row.imageUrl ?? siteImage(`blvckstone-${row.category}`),
        href: `/productos/${row.category}#${ref.slug}`,
      },
    ];
  });
  return entries.sort((a, b) => a.code.localeCompare(b.code));
}
