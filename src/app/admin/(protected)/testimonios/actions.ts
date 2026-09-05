"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { testimonials } from "@/db/schema";

function readTestimonialForm(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    company: String(formData.get("company") ?? "") || null,
    role: String(formData.get("role") ?? "") || null,
    quote: String(formData.get("quote") ?? "").trim(),
    photoUrl: String(formData.get("photoUrl") ?? "") || null,
  };
}

export async function createTestimonial(formData: FormData) {
  if (!db) throw new Error("Base de datos no configurada");

  await db.insert(testimonials).values(readTestimonialForm(formData));

  revalidatePath("/admin/testimonios");
  redirect("/admin/testimonios");
}

export async function updateTestimonial(id: number, formData: FormData) {
  if (!db) throw new Error("Base de datos no configurada");

  await db
    .update(testimonials)
    .set(readTestimonialForm(formData))
    .where(eq(testimonials.id, id));

  revalidatePath("/admin/testimonios");
  redirect("/admin/testimonios");
}

export async function deleteTestimonial(id: number) {
  if (!db) throw new Error("Base de datos no configurada");

  await db.delete(testimonials).where(eq(testimonials.id, id));

  revalidatePath("/admin/testimonios");
}
