"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import { SETTINGS_KEYS } from "./keys";

export async function saveSettings(formData: FormData) {
  if (!db) throw new Error("Base de datos no configurada");

  for (const { key } of SETTINGS_KEYS) {
    const value = String(formData.get(key) ?? "");
    await db
      .insert(siteSettings)
      .values({ key, value })
      .onConflictDoUpdate({ target: siteSettings.key, set: { value } });
  }

  revalidatePath("/admin/configuracion");
}
