import { NextResponse } from "next/server";
import { db } from "@/db";
import { leads } from "@/db/schema";

type LeadPayload = {
  name?: string;
  email?: string;
  phone?: string;
  industry?: string;
  message?: string;
  consent?: string;
};

export async function POST(request: Request) {
  const data = (await request.json()) as LeadPayload;

  if (!data.name || !data.email || !data.consent) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  if (db) {
    await db.insert(leads).values({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      industry: data.industry || null,
      message: data.message || null,
    });
  } else {
    // TODO: quitar este fallback una vez que DATABASE_URL esté configurado.
    console.log("New lead (DB no configurada, no se persistió):", data);
  }

  // TODO: notificar por email vía Resend una vez provisionado.

  return NextResponse.json({ ok: true });
}
