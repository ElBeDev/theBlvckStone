# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primario (confirmado 2026-10-21):** director de planta, de energía o de mantenimiento en una empresa mediana o grande del Bajío (Querétaro, Guanajuato, San Luis Potosí, CDMX). Paga una factura eléctrica alta en tarifa GDMTH/GDMTO o sufre apagones que paran producción. Llega al sitio **por referencia** (11 de 12 prospectos del tracker interno vinieron referidos), normalmente después de una llamada o un WhatsApp, para comprobar seriedad técnica y ver números antes de aceptar una visita.
- **Secundarios (en el tracker, no confirmados como prioridad web):** dueño o director general de PYME que decide por ahorro y forma de pago; gerente de flotas o logística; inversionista o referidor.
- Idioma: español (principal). Inglés para proyectos utility-scale y contactos internacionales.

## Product Purpose

The Blvck Stone integra proyectos industriales de punta a punta: diagnostica el consumo, dimensiona la solución, la suministra e instala a través de su red de fabricantes, y la financia para que el ahorro pague la inversión. Cinco líneas: energía limpia y almacenamiento, electromovilidad y flotas, financiamiento, construcción e infraestructura industrial, y estrategia fiscal y laboral.

Éxito del sitio: que el director de planta solicite una evaluación o demostración (formulario `/contacto`, lead en Postgres) o escriba por WhatsApp/teléfono a Karla o Juan Carlos. Meta del brief: 50 leads al mes, conversión de formulario mayor a 3%.

## Positioning

Un solo responsable para todo el proyecto. Donde un instalador vende equipo, un banco vende crédito y un despacho vende la deducción, The Blvck Stone entrega los tres en una sola propuesta técnico-económica: inversión, ahorro mensual, retorno, forma de pago y tratamiento fiscal (deducción inmediata del 100% bajo LISR art. 34-XIII). Los proveedores son internos y no se mencionan: el sitio habla en nombre propio.

Compromisos operativos que sí puede afirmar: evaluación sin costo, comisionamiento remoto incluido, incidencias resueltas en menos de 48 horas, garantía de 10 años en inversores y 5 a 10 en BESS, tecnología certificada (UL, KEMA, ANSI, IEC, NOM-001-SEDE).

## Operating Context

- El prospecto compara el recibo de CFE contra la propuesta: cargos por demanda, factor de potencia, periodos punta/intermedia/base. El diagnóstico del recibo es el primer paso real del proceso de venta.
- Proceso de venta: diagnóstico sin costo, propuesta técnico-económica, roadmap de permisos e implementación, comisionamiento y monitoreo con EMS.
- Formas de pago reales: contado, arrendamiento 2 a 6 años, crédito, PPA 10 a 15 años, y "estrategia fiscal" (la forma de pago más usada en el tracker).
- Programa de referidos interno: 3 a 8% de comisión al referidor. No está decidido si se publica en el sitio.
- Oficina en Polanco, CDMX; centro logístico en Guadalajara, Jalisco.

## Capabilities and Constraints

- Next.js (App Router) + Tailwind 4 + Postgres (Neon) + Vercel Blob, hospedado en Vercel. Bilingüe ES/EN con `next-intl` (rutas `/es` y `/en`).
- Mini-CMS propio en `/admin`: productos (29 servicios ES+EN en cinco categorías), blog, testimonios y datos de contacto. El home y el índice de productos usan copy fijo en `messages/*.json`.
- Formulario de contacto guarda leads; sin CRM ni email de notificación todavía. GA4/GTM pendientes.
- Rutas actuales: home, /productos (+5 categorías), /soluciones, /nosotros, /casos-de-exito, /blog, /contacto, /gracias, /legal/*. **El mapa del sitio puede cambiar** (confirmado 2026-10-21).
- Regla de contenido: sin marcas, logos, cifras corporativas ni clientes de proveedores. El repo es público: nada de datos de proveedores ni de clientes en el código.
- Sin em-dashes ni en-dashes en texto visible (regla editorial vigente).
- Terminología: BESS, GDMTH, PPA, EMS, kW/kWh, "evaluación sin costo", "propuesta técnico-económica".
- Contenido sensible publicado por decisión del cliente, pendiente de revisión legal: inversión a tasa fija 5% mensual, programa de productividad y economía social.

## Brand Commitments

- Nombre: **The Blvck Stone** (wordmark "THE BLVCK STONE"). Dominio previsto the-blvckstone.com.
- **Paleta de 11 colores, intocable (confirmado 2026-10-21):** Teal #10767C, Turquesa #1BBCB4, Petróleo #0E2E30, Menta #37E6C4, Ámbar #FFB43D, Coral #FF6A4B, Carbón #1F2A2A, Piedra #6B7A80, Niebla #E7F2F1, Marfil #F5F8F7, Negro base #0B0F10.
- Logo (dos triángulos entrelazados) y tipografía (Helvetica Now Display, hoy Archivo como sustituto): **abiertos a cambio** en el rediseño (confirmado 2026-10-21). No hay archivo oficial del logo.
- Tono del brief original: tecnológico, confiable, con énfasis en ingeniería y números. "Juvenil" aparece en el brief pero el usuario primario es un director de planta; se prioriza seriedad técnica.
- Un solo tema oscuro en todo el sitio (decisión 2026-10-21: el cambio claro/oscuro entre páginas molestaba al cliente).

## Evidence on Hand

- 29 fichas de servicio con especificaciones reales tomadas de la documentación de proveedores (capacidades, garantías, condiciones). En `scripts/seed-services.mjs` y en la base de datos.
- Cifras publicables derivadas de la oferta: 5 líneas, 29 servicios, menos de 48 h en incidencias, 10 años de garantía en inversores, 25 a 40% de ahorro potencial con BESS, ahorro de MXN 75,192 al año por van eléctrica frente a gasolina (cálculo aproximado, precios de mayo 2025).
- 46 fotografías sin marcas en `public/images/` (material de proveedores retocado y bancos libres). No hay fotografía propia del equipo ni de proyectos instalados.
- Equipo: Karla Arizmendi (Strategy & Growth Director) y Juan Carlos Meza (Business Development Director), con teléfonos y correos reales.
- **Proyectos instalados con cifras: el cliente afirma que existen (2026-10-21) pero no se han entregado.** El sitio debe tener el lugar para mostrarlos y no inventarlos; hasta que lleguen, ese espacio se marca como pendiente.
- **Ausencias que no se deben fabricar:** testimonios reales (los 4 actuales son de demo e inventados), logos de clientes autorizados, posts de blog reales (los 3 actuales son de demo), tasas y plazos finales de financiamiento, video propio.

## Product Principles

1. Prueba antes que promesa: cada afirmación del sitio sale de una spec, una garantía o un compromiso operativo real; lo que no existe se deja como espacio pendiente, nunca se inventa.
2. Habla como el ingeniero que va a visitar la planta: números, unidades, tarifas y plazos, sin adjetivos de relleno.
3. Un solo responsable: el sitio ordena las cinco líneas como partes de un mismo proyecto, no como cinco negocios distintos.
4. La acción es la evaluación sin costo: todo camino termina en pedirla, con la menor fricción posible para alguien que ya viene referido.
5. Sin marcas ajenas: la red de proveedores es un activo interno; el sitio nunca la expone.
