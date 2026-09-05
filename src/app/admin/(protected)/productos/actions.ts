"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { products } from "@/db/schema";
import { resolveUploadedImage } from "@/lib/upload";

function readProductForm(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    locale: String(formData.get("locale") ?? "es"),
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    specs: String(formData.get("specs") ?? "") || null,
  };
}

export async function createProduct(formData: FormData) {
  if (!db) throw new Error("Base de datos no configurada");

  const imageUrl = await resolveUploadedImage({
    formData,
    fileField: "imageFile",
    urlField: "imageUrl",
    existingUrl: null,
    folder: "products",
  });

  await db.insert(products).values({ ...readProductForm(formData), imageUrl });

  revalidatePath("/admin/productos");
  redirect("/admin/productos");
}

export async function updateProduct(id: number, formData: FormData) {
  if (!db) throw new Error("Base de datos no configurada");

  const [existing] = await db
    .select()
    .from(products)
    .where(eq(products.id, id));

  const imageUrl = await resolveUploadedImage({
    formData,
    fileField: "imageFile",
    urlField: "imageUrl",
    existingUrl: existing?.imageUrl ?? null,
    folder: "products",
  });

  await db
    .update(products)
    .set({ ...readProductForm(formData), imageUrl, updatedAt: new Date() })
    .where(eq(products.id, id));

  revalidatePath("/admin/productos");
  redirect("/admin/productos");
}

export async function deleteProduct(id: number) {
  if (!db) throw new Error("Base de datos no configurada");

  await db.delete(products).where(eq(products.id, id));

  revalidatePath("/admin/productos");
}
