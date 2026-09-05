"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { products } from "@/db/schema";

function readProductForm(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    locale: String(formData.get("locale") ?? "es"),
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    specs: String(formData.get("specs") ?? "") || null,
    imageUrl: String(formData.get("imageUrl") ?? "") || null,
  };
}

export async function createProduct(formData: FormData) {
  if (!db) throw new Error("Base de datos no configurada");

  await db.insert(products).values(readProductForm(formData));

  revalidatePath("/admin/productos");
  redirect("/admin/productos");
}

export async function updateProduct(id: number, formData: FormData) {
  if (!db) throw new Error("Base de datos no configurada");

  await db
    .update(products)
    .set({ ...readProductForm(formData), updatedAt: new Date() })
    .where(eq(products.id, id));

  revalidatePath("/admin/productos");
  redirect("/admin/productos");
}

export async function deleteProduct(id: number) {
  if (!db) throw new Error("Base de datos no configurada");

  await db.delete(products).where(eq(products.id, id));

  revalidatePath("/admin/productos");
}
