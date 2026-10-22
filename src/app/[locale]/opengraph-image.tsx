import { ImageResponse } from "next/og";

export const alt = "The Blvck Stone";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The site's two voices: Unbounded Black for the hook, Archivo for the line
// under it. Satori needs a TTF, which the Google Fonts CSS API serves to
// clients that do not ask for woff2. If a fetch fails the card still renders
// in the fallback face.
async function loadFont(family: string, weight: number, text: string) {
  try {
    const query = `family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(`https://fonts.googleapis.com/css2?${query}`)).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
    if (!url) return null;
    return await (await fetch(url)).arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const hook = locale === "en" ? "Your whole plant, one point of accountability." : "Toda tu planta, un solo responsable.";
  const sub =
    locale === "en"
      ? "Energy, fleets, financing, construction and tax strategy in one proposal."
      : "Energía, flotas, financiamiento, construcción y estrategia fiscal en una sola propuesta.";
  const wordmark = "THE BLVCK STONE";
  const [display, body] = await Promise.all([loadFont("Unbounded", 900, hook + wordmark), loadFont("Archivo", 400, sub)]);
  const fonts = [
    ...(display ? [{ name: "Unbounded", data: display, weight: 900 as const, style: "normal" as const }] : []),
    ...(body ? [{ name: "Archivo", data: body, weight: 400 as const, style: "normal" as const }] : []),
  ];

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
          background: "radial-gradient(120% 90% at 50% 30%, #0e2e30 45%, #0b0f10 100%)",
          color: "#f5f8f7",
          fontFamily: "Archivo",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="48" height="48" viewBox="0 0 100 100" fill="none" strokeLinejoin="round" strokeLinecap="round">
            <path d="M 42 10 L 68 50 L 54 50 Q 50 50 50 54 L 50 58 L 12 58 Z" stroke="#1bbcb4" strokeWidth="6" />
            <path d="M 50 50 L 92 50 L 71 88 Z" stroke="#6b7a80" strokeWidth="6" />
          </svg>
          <span style={{ fontSize: 24, fontWeight: 900, fontFamily: "Unbounded" }}>{wordmark}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              maxWidth: 1000,
              fontFamily: "Unbounded",
            }}
          >
            {hook}
          </div>
          <div style={{ fontSize: 28, fontFamily: "Archivo", color: "rgba(245, 248, 247, 0.74)", maxWidth: 900, lineHeight: 1.35 }}>{sub}</div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
