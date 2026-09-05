"use server";

import { redirect } from "next/navigation";
import { checkCredentials, createSession } from "@/lib/auth";

export async function login(formData: FormData) {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!checkCredentials(username, password)) {
    redirect("/admin/login?error=1");
  }

  await createSession();
  redirect("/admin");
}
