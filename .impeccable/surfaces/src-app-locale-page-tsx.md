---
version: 1
slug: "src-app-locale-page-tsx"
primary_target: "src/app/[locale]/page.tsx"
related_targets: ["src/components/home","messages/es.json","messages/en.json"]
---

# Surface brief: sitio público (home como catálogo)

Scope: home `/` y, por herencia, categorías de `/productos/*`, `/soluciones`, `/nosotros`, `/contacto`, `/blog`, legales. Modo: Persuade.
Audiencia: director de planta o energía del Bajío, llega referido, quiere seriedad técnica y números. Acción: solicitar evaluación sin costo (formulario / WhatsApp). Prueba: 29 fichas con specs reales, corridas de ejemplo reales (electrolinera 480 kW, van vs gasolina), compromisos operativos. Restricciones: paleta de 11 colores intocable, sin marcas de proveedores, sin em-dashes, ES/EN, tema oscuro.
Momento memorable: marcar con "pluma" las entradas que aplican a tu planta y verlas saltar a su lugar en el plano.
Sin resolver: cifras de proyectos instalados (el cliente dice que existen; no fabricar), fotos propias del equipo.

## Direction contract

THESIS: Toda la oferta en una sola hoja: los 29 servicios como celdas numeradas empacadas borde con borde, con el mismo código marcado en un plano de nave industrial; el visitante traza su ruta por su propia planta. Se niega al hero con foto, tres tarjetas iguales y franja de cifras.

OWN-WORLD: tinta única marfil sobre petróleo profundo que "engrisa" con el grano; retícula de filos finos marfil/15; códigos y pies en Archivo condensada (wdth 75) en versalitas diminutas con dígitos tabulares; cabeceras de sección en Archivo ancha (wdth 115+) negra; turquesa solo en los divisores del plano; ámbar es la pluma: círculos trazados a mano (SVG de un solo trazo), tachaduras en lo visitado, y la acción principal.

STORY: ve su planta entera y la oferta entera a la vez; entiende "un solo responsable para cada zona de mi planta"; marca lo que aplica; pide la evaluación con su ruta ya trazada.

FIRST VIEWPORT (1440): línea de edición arriba en condensada ("CATÁLOGO DE SERVICIOS INDUSTRIALES · EDICIÓN 2026 · 29 ENTRADAS"); gancho de una línea en ancha negra: "Toda tu planta, un solo responsable."; izquierda 55%: plano de nave en planta (zonas TECHO, SUBESTACIÓN, PATIO Y FLOTA, ESTRUCTURA, OFICINA) con códigos; derecha 45%: las 29 celdas con miniatura, código y nombre; franja fija inferior "Tu ruta" con la acción principal "Solicitar evaluación sin costo" siempre visible. Hover en celda ilumina su zona; clic la circula en ámbar y la suma a la ruta.

FORM: Catálogo de nave, fusión del retador "doujin event catalog" (ganó sobre la asignada por claridad de producto; posición: retador, fuera de mi lista de 7). seed:f62a8646a5835227

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
