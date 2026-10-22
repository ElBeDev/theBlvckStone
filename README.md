# The Blvck Stone, sitio web

Sitio bilingüe (ES/EN) de The Blvck Stone con mini-CMS propio en `/admin`. Next.js + Tailwind + Postgres (Neon) + Vercel Blob.

La documentación del proyecto está en [docs/BRIEF_DESARROLLO_WEB.md](docs/BRIEF_DESARROLLO_WEB.md): brief, sistema de diseño, avance y pendientes. Los reportes de proveedores (`docs/empresas/`, `docs/interno/`, `docs/README.md`) son solo locales y no se versionan, porque el repo es público.

## Desarrollo

```bash
npm install
npm run dev
```

Variables de entorno: ver `.env.example`.

## Contenido

```bash
# Catálogo real de servicios (5 líneas de negocio)
node --env-file=.env.local scripts/seed-services.mjs

# Blog y testimonios de demostración (inventados, reemplazar antes del lanzamiento)
node --env-file=.env.local scripts/seed-demo.mjs
```
