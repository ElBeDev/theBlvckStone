"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { posts } from "@/db/schema";

function readPostForm(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    locale: String(formData.get("locale") ?? "es"),
    title: String(formData.get("title") ?? "").trim(),
    excerpt: String(formData.get("excerpt") ?? "") || null,
    body: String(formData.get("body") ?? "").trim(),
  };
}

export async function createPost(formData: FormData) {
  if (!db) throw new Error("Base de datos no configurada");

  await db.insert(posts).values(readPostForm(formData));

  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function updatePost(id: number, formData: FormData) {
  if (!db) throw new Error("Base de datos no configurada");

  await db.update(posts).set(readPostForm(formData)).where(eq(posts.id, id));

  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function deletePost(id: number) {
  if (!db) throw new Error("Base de datos no configurada");

  await db.delete(posts).where(eq(posts.id, id));

  revalidatePath("/admin/blog");
}
