import { NextResponse } from "next/server";

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

  // TODO: persistir en Supabase (tabla `leads`) y notificar por email vía
  // Resend una vez provisionados esos servicios. El payload se mantiene
  // genérico para poder conectar un CRM (HubSpot/Zoho/Salesforce) después
  // sin tener que rehacer el formulario.
  console.log("New lead:", data);

  return NextResponse.json({ ok: true });
}
