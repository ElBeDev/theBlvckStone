import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/metadata";

const paths = [
  "",
  "/productos",
  "/productos/energia-limpia",
  "/productos/electromovilidad",
  "/productos/financiamiento",
  "/soluciones",
  "/nosotros",
  "/casos-de-exito",
  "/blog",
  "/contacto",
  "/legal/aviso-de-privacidad",
  "/legal/terminos",
  "/legal/cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: now,
      changeFrequency: path === "" || path === "/blog" ? "weekly" : "monthly",
      priority: path === "" ? 1 : path.startsWith("/legal") ? 0.3 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${SITE_URL}/${l}${path}`]),
        ),
      },
    })),
  );
}
