"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { resolveUploadedImage } from "@/lib/upload";

function readTestimonialForm(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    company: String(formData.get("company") ?? "") || null,
    role: String(formData.get("role") ?? "") || null,
    quote: String(formData.get("quote") ?? "").trim(),
  };
}

export async function createTestimonial(formData: FormData) {
  if (!db) throw new Error("Base de datos no configurada");

  const photoUrl = await resolveUploadedImage({
    formData,
    fileField: "photoFile",
    urlField: "photoUrl",
    existingUrl: null,
    folder: "testimonials",
  });

  await db
    .insert(testimonials)
    .values({ ...readTestimonialForm(formData), photoUrl });

  revalidatePath("/admin/testimonios");
  redirect("/admin/testimonios");
}

export async function updateTestimonial(id: number, formData: FormData) {
  if (!db) throw new Error("Base de datos no configurada");

  const [existing] = await db
    .select()
    .from(testimonials)
    .where(eq(testimonials.id, id));

  const photoUrl = await resolveUploadedImage({
    formData,
    fileField: "photoFile",
    urlField: "photoUrl",
    existingUrl: existing?.photoUrl ?? null,
    folder: "testimonials",
  });

  await db
    .update(testimonials)
    .set({ ...readTestimonialForm(formData), photoUrl })
    .where(eq(testimonials.id, id));

  revalidatePath("/admin/testimonios");
  redirect("/admin/testimonios");
}

export async function deleteTestimonial(id: number) {
  if (!db) throw new Error("Base de datos no configurada");

  await db.delete(testimonials).where(eq(testimonials.id, id));

  revalidatePath("/admin/testimonios");
}
