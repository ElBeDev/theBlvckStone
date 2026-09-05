import { ImageResponse } from "next/og";

export const alt = "The Blvck Stone";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const headline =
    locale === "en"
      ? "Smart solutions for your energy transition"
      : "Soluciones inteligentes para tu transición energética";
  const sub =
    locale === "en"
      ? "Clean energy. Electromobility. Strategic financing."
      : "Energía limpia. Electromovilidad. Financiamiento estratégico.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #0e2e30 0%, #0b0f10 100%)",
          color: "#f5f8f7",
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="44" height="44" viewBox="0 0 40 40" fill="none">
            <path d="M14 34 L26 12 L38 34 Z" fill="#6b7a80" />
            <path d="M2 30 L14 8 L26 30 Z" stroke="#1bbcb4" strokeWidth="3" strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: 26, fontWeight: 900, letterSpacing: -0.5 }}>
            THE BLVCK STONE
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 66, fontWeight: 900, lineHeight: 1.04, letterSpacing: -2, maxWidth: 980 }}>
            {headline}
          </div>
          <div style={{ fontSize: 28, color: "#1bbcb4", fontWeight: 700 }}>{sub}</div>
        </div>
      </div>
    ),
    size,
  );
}
