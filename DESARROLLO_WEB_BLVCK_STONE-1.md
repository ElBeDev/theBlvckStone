# BRIEF DE DESARROLLO WEB | THE BLVCK STONE

## 📋 INFORMACIÓN GENERAL DEL PROYECTO

**Cliente:** The Blvck Stone
**Empresa:** Integración Estratégica de Proyectos Industriales
**Sitio Web:** the-blvckstone.com
**Objetivo:** Crear un sitio web moderno, tecnológico, fresco e innovador que posicione a The Blvck Stone como líder en soluciones de energía limpia, electromovilidad y financiamiento empresarial.

**Tono & Percepción:** Tecnológico, juvenil, innovador, confiable, con énfasis en IA y automatización.

**Idiomas:** Español (principal) + Inglés (secundario, para proyectos utility-scale internacionales y visibilidad de la relación con AUX Group).

---

## 🏗️ ARQUITECTURA & STACK (decisiones tomadas)

> Estas decisiones cierran las opciones abiertas de la v1 del brief para poder empezar a construir sin ambigüedad.

| Decisión | Elegido | Por qué |
|----------|---------|---------|
| **Estructura del sitio** | Multi-página (no one-page) | Coincide con las 4 columnas del footer (Servicios/Productos/Empresa/Legal), permite SEO por tema y deja espacio para blog y páginas de producto individuales |
| **Framework** | Next.js 14+ (App Router) + TypeScript + Tailwind CSS | SSR/SSG para SEO, rutas de archivo natural para multi-página, i18n routing nativo |
| **CMS** | Panel de administración propio (Next.js + Postgres) | Sin CMS externo, ni SaaS (Sanity) ni servicio aparte que mantener (Strapi/Payload). Tablas propias (`products`, `posts`, `testimonials`, `site_settings`) + panel `/admin` con login para Karla/Juan Carlos. Vive en el mismo repo y el mismo deploy — al migrar al VPS es la misma pieza, no hay nada aparte que mover |
| **Internacionalización** | Rutas `/es/...` y `/en/...` (next-intl) | Cada fila de contenido tiene campos localizados; fallback a español si falta traducción |
| **Backend / Leads** | Next.js Route Handlers, sin servidor aparte | El formulario de contacto guarda el lead en Postgres (Neon) — falta el email de notificación (Resend) — sin CRM todavía |
| **CRM** | Ninguno en v1 | El payload del lead se diseña genérico (`leads` con nombre/email/teléfono/mensaje/industria/utm) para poder conectar HubSpot/Zoho/Salesforce después sin rehacer el formulario |
| **Hosting** | Vercel ahora → VPS propio más adelante | Vercel para lanzar rápido y validar con el cliente sin infraestructura que mantener. Cuando el proyecto madure, se migra a un VPS propio (Docker) para tener todo autoalojado: Next.js, Postgres y almacenamiento de imágenes |
| **Base de datos** | Postgres — Neon, instalado como integración nativa de Vercel (no una cuenta aparte) | Guarda leads y todo el contenido del mini-CMS (productos, blog, testimonios, configuración). Es Postgres estándar: migrar a un Postgres autoalojado en el VPS más adelante no cambia código, solo mueve los datos |
| **Storage de imágenes** | Vercel Blob (store `blvckstone-media`, plan gratuito) | Nativo de Vercel, sin cuenta aparte que administrar. El panel `/admin` sube el archivo directo a Blob y guarda la URL pública resultante |
| **Animación** | Motion (`motion/react`) | Scroll-reveal, count-up y entrada del hero en componentes cliente aislados; todo respeta `prefers-reduced-motion`. Sin listeners de scroll manuales |
| **Iconografía** | Phosphor Icons (`@phosphor-icons/react`, entrada `/ssr` para Server Components) | Una sola familia, peso `duotone`/`bold` consistente. Sustituye al set custom de 20 a 30 iconos del brief mientras no exista |
| **Tipografía en producción** | Archivo vía `next/font/google` (300/400/700/900) | Stand-in fiel a Helvetica Now Display (licenciada, archivos pendientes). Cambio de una línea cuando lleguen |
| **Verificación visual** | Playwright (devDependency) + Chromium headless | Screenshots desktop/móvil y mediciones mecánicas del pre-flight (nav, CTAs, H1, overflow, consola). Ver "Entornos & flujo de trabajo" |

---

## 🎨 IDENTIDAD VISUAL

### Paleta de Colores (HEX)
- **Teal Blvck (Primario):** #10767C
- **Turquesa Vivo (Secundario):** #1BBCB4
- **Petróleo Profundo (Oscuro):** #0E2E30
- **Menta Eléctrica (Acento):** #37E6C4
- **Ámbar Solar (Llamadas a acción):** #FFB43D
- **Coral Señal (Alertas/Destacados):** #FF6A4B
- **Carbón:** #1F2A2A
- **Gris Piedra:** #6B7A80
- **Niebla (Fondo):** #E7F2F1
- **Marfil:** #F5F8F7
- **Negro Base:** #0B0F10

### Tipografía
**Fuente base:** Helvetica Now Display (no mezclar familias tipográficas)

> **Estado (2026-09-05):** los archivos licenciados de Helvetica Now Display no se han entregado. El sitio carga **Archivo** (Google Fonts, vía `next/font`, autoalojada en build) con los mismos cuatro pesos como stand-in; antes caía en silencio a Arial del sistema. La jerarquía de abajo se aplica igual con Archivo.

**Jerarquía tipográfica por uso:**

| Elemento | Peso | Tamaño | Ejemplo |
|----------|------|--------|---------|
| **H1 - Headlines principales** | Ultragruesa (900) | 48-72px | "Soluciones inteligentes para tu transición energética" |
| **H2 - Títulos de secciones** | Negrita (700) | 32-40px | "¿Por qué elegir The Blvck Stone?" |
| **H3 - Subtítulos** | Negrita (700) | 24-28px | "Energía Limpia & Almacenamiento" |
| **Body text - Párrafos largos** | Normal (400) | 16-18px | Descripciones, contenido principal |
| **Small text - Labels, captions** | Delgada (300) | 12-14px | Subtextos, anotaciones, metadata |
| **CTAs - Botones** | Negrita (700) | 14-16px | "Descubre nuestras soluciones", "Contacta" |
| **Subheadline - Subtítulos H1** | Normal (400) | 18-22px | "Energía limpia • Electromovilidad • Financiamiento" |

**Variaciones según contexto:**
- **Heros & Destacados:** Ultragruesa (900) para máximo impacto visual
- **Títulos de cards/servicios:** Negrita (700) para jerarquía clara
- **Descripciones:** Normal (400) para legibilidad óptima
- **Microcopies & ayudas:** Delgada (300) para diferenciación visual
- **Números/Estadísticas:** Ultragruesa (900) para énfasis
- **Links & CTAs:** Negrita (700) con hover effects

### Logo
- Triángulo ascendente (outline) en Turquesa Vivo (#1BBCB4)
- Triángulo invertido (relleno) en Gris Piedra (#6B7A80)
- Interlocados, esquinas redondeadas
- Símbolo ®
- Uso: Header, favicon, elementos decorativos

> **Estado (2026-09-05):** no existe archivo oficial del logo todavía. El mark de dos triángulos se construyó como SVG a partir de esta descripción (`src/components/layout/LogoMark.tsx`) y se usa en header, footer y la imagen Open Graph, junto al wordmark "THE BLVCK STONE". Se reemplaza por el archivo oficial cuando el cliente lo entregue; el favicon sigue siendo el default y también está pendiente.

### Guía Tipográfica Detallada (Helvetica Now Display)

#### Pesos disponibles a utilizar:
1. **Delgada (Thin/Light - 300)**
   - Línea height: 1.3
   - Uso: Subtextos, labels, información secundaria
   - Ejemplo: "Subtítulo pequeño", "Leyendas"

2. **Normal (Regular - 400)**
   - Línea height: 1.5-1.6
   - Uso: Body text, párrafos, descripciones
   - Ejemplo: "Soluciones integrales de generación, almacenamiento..."
   - Mejor legibilidad en párrafos largos

3. **Negrita (Bold - 700)**
   - Línea height: 1.3-1.4
   - Uso: Títulos H2/H3, labels de cards, CTAs, énfasis
   - Ejemplo: "Energía Limpia & Almacenamiento"
   - Crear jerarquía visual clara

4. **Ultragruesa (Black/ExtraBold - 900)**
   - Línea height: 1.2
   - Uso: H1 principales, headlines de hero, números grandes
   - Ejemplo: "Soluciones inteligentes para tu transición energética"
   - Máximo impacto visual, usar con moderación

#### Recomendaciones de espaciado:
- **Párrafos:** Margin bottom 24-32px
- **Títulos + Párrafo:** 16-20px gap
- **Entre líneas (line-height):** Aumentar 0.1-0.2 en textos pequeños
- **Letter spacing:** Minimal, solo en headlines ultragruesas (+0.5px)

---

## 🧭 SISTEMA DE DISEÑO VIGENTE *(nueva, v2.7)*

Desde el rediseño v2.6 el sitio público se rige por el skill **`design-taste-frontend`** (repo `Leonxlnx/taste-skill`, instalado con el CLI `skills` de Vercel Labs; vive en `.agents/skills/design-taste-frontend/SKILL.md`). Cualquier cambio visual futuro debe respetar estas reglas para no regresar al look genérico. `/admin` queda fuera: el propio skill excluye dashboards y UI de producto.

**Modo y diales:** Redesign *Preserve* (marca, IA, contenido y slugs intactos) con ejecución tipo overhaul. Diales: `DESIGN_VARIANCE 7`, `MOTION_INTENSITY 6`, `VISUAL_DENSITY 4`.

**Reglas duras que ya se aplican (y que hay que mantener):**
- **Cero em-dashes (`—`) ni en-dashes (`–`)** en ningún texto visible: copy, CTAs, alt text, contenido cargado desde `/admin`. Usar coma, punto, dos puntos o guion normal.
- **Un solo label por intención de CTA.** El intent "contacto" es siempre **"Solicitar demostración"** (nav, hero, banda final, formulario). El intent "explorar" es "Descubre nuestras soluciones".
- **Tema por página:** home y `/contacto` oscuros (petróleo / petróleo profundo / negro base); interiores claros (marfil / blanco / niebla). Dentro de una página no se alternan temas; el footer oscuro es el único bloque de contraste, una vez.
- **Sistema de formas:** interactivos = píldora (`rounded-full`), superficies = `rounded-2xl` (16px), inputs = `rounded-lg` (8px). Documentado en `globals.css`.
- **Color:** ámbar solo para CTA primario; turquesa/teal para secundarios y acentos; nada de colores nuevos ni gradientes de texto. Texto secundario usa `carbon/75` (fondos claros) y `mist/70` (fondos oscuros): Gris Piedra `#6B7A80` se conserva como token pero **no** para texto corrido porque da 4.45:1 sobre blanco (falla AA por centésimas).
- **Presupuesto de eyebrows:** máximo 1 cada 3 secciones. En el home son 3 para 8 secciones (hero, servicios, testimonios). Las páginas interiores no llevan.
- **Hero:** H1 en máximo 2 líneas en desktop, subtítulo de 20 palabras o menos, máximo 4 elementos de texto, `pt` máximo 24.
- **Sin repetir familias de layout** en una misma página. El home usa 8 distintas: split hero, franja numérica, bento asimétrico, lista sticky, galería acordeón, cita destacada, filas editoriales, banda CTA. Nada de "3 cards iguales en fila".
- **Imágenes:** siempre foto real (o placeholder etiquetado), nunca SVG decorativo hecho a mano ni "fake screenshots" de divs. Tratamiento duotono petróleo (`.duotone` en `globals.css`) para unificar cualquier foto como textura de marca. Los placeholders se curan por ID en `src/components/DuotoneImage.tsx`.
- **Animación con motivo:** cada movimiento comunica jerarquía, narrativa o feedback. `whileInView` con `once: true`, count-up en cifras de credibilidad, entrada escalonada del hero. Prohibido `window.addEventListener('scroll')`. Todo colapsa a estático con `prefers-reduced-motion`.
- **Nav:** una sola línea en desktop, altura 73px (tope 80). Menú móvil con `AnimatePresence`.

**Excepciones declaradas en el pre-flight:**
- No hay modo oscuro/claro por preferencia del sistema: el tema está bloqueado por marca y por página (permitido por el skill cuando la marca lo exige).
- Los títulos de artículo de blog se limitan a 2 líneas a 35px; son titulares editoriales, no heros de landing.

**Resultado de las auditorías del Paso 4 (2026-09-05):** em-dash audit en cero (código, mensajes, base de datos y HTML servido); pre-flight sin ningún ítem en Fail; preservación con 4 cambios anunciados y aprobados (label del CTA del header "Contacto" → "Solicitar demostración", CTA secundario del hero unificado al mismo label, eliminación del botón "Descargar catálogo" que no tenía catálogo, y borradores legales en lugar del placeholder); fidelidad de marca con los 11 hex intactos, wordmark intacto y logo mark construido según el brief.

**Cómo repetir la verificación visual:** con el dev server corriendo, un script de Playwright (desktop 1440×900 y móvil 390×844) debe hacer scroll por toda la página antes de capturar, porque las secciones con scroll-reveal quedan en opacidad 0 en una captura sin scroll. Medir: filas del nav, altura del header, líneas del H1, CTAs con alto mayor a 64px (wrap), `scrollWidth > innerWidth` (overflow), errores de consola, y contar `tracking-[0.18em]` (eyebrows) en `main`.

---

## ✅ AVANCE DEL PROYECTO *(nueva, se actualiza según avanza el desarrollo)*

**Al 2026-09-05:**
- Repo creado y pusheado: [github.com/ElBeDev/theBlvckStone](https://github.com/ElBeDev/theBlvckStone), listo para importar en Vercel
- Scaffold Next.js (TS + Tailwind) con la paleta de marca como tokens, ruteo bilingüe ES/EN (`next-intl`)
- Las 15 rutas del mapa del sitio existen y renderizan (home completa; el resto con estructura lista y placeholders donde falta copy/imágenes del cliente)
- Formulario de contacto funcional, con validación y consentimiento de privacidad
- Esquema de base de datos (Drizzle + Postgres) para `leads`, `products`, `posts`, `testimonials` y `site_settings`
- Panel `/admin` con login (usuario/contraseña) y CRUD completo (crear/editar/borrar) para productos, blog y testimonios, más un formulario de configuración para datos de contacto — probado de punta a punta en navegador
- `/api/leads` ya inserta en la tabla `leads` en Postgres
- **Neon (Postgres) y Vercel Blob ya están provisionados** como integraciones nativas del proyecto en Vercel (plan gratuito de cada uno), conectados a `the-blvck-stone` en producción/preview/desarrollo — `DATABASE_URL`, `BLOB_READ_WRITE_TOKEN`, `ADMIN_USERNAME`, `ADMIN_PASSWORD` y `SESSION_SECRET` ya están seteados ahí
- El schema de Drizzle ya está aplicado en la base de Neon real (5 tablas creadas)
- Subida de imágenes desde `/admin` (productos y testimonios) ya sube el archivo a Vercel Blob y guarda la URL pública — probado con un archivo real de punta a punta

- **Rediseño visual completo (v2.6)** aplicando el skill `design-taste-frontend` (Vercel Labs `skills` CLI) en modo *Preserve* con ejecución tipo overhaul: diales objetivo `VARIANCE 7 / MOTION 6 / DENSITY 4`. Home con 8 secciones de familias de layout distintas (split hero, franja numérica con count-up, bento asimétrico, lista sticky, galería acordeón, cita destacada, filas editoriales, banda CTA); tema oscuro en home y contacto, claro en interiores; menú móvil real; logo mark construido según la descripción del brief; fuente **Archivo** vía `next/font` como stand-in de Helvetica Now Display; animaciones con Motion (scroll-reveal, count-up, entrada del hero) respetando `prefers-reduced-motion`; iconos Phosphor. Copy completo ES/EN sin placeholders (incluye borradores legales marcados como pendientes de revisión legal). Metadata SEO por página (canonical, `hreflang`, Open Graph, imagen OG generada), `sitemap.xml` y `robots.txt`. Verificado con Playwright en desktop y móvil: nav en una línea (73px), cero CTAs con wrap, cero overflow horizontal, cero errores de consola, H1 en máximo 2 líneas, contraste AA en texto secundario.
- **Imágenes: placeholders curados**, no fotografía de marca. Se usan fotos de Picsum por ID fijo con tratamiento duotono petróleo para que lean como textura de marca. Hay que reemplazarlas por fotografía real antes del lanzamiento; la lista de slots está en "Pendientes".
- **Contenido de demo cargado** vía `scripts/seed-demo.mjs`: 9 productos (ES+EN, 3 por pilar), 3 posts de blog (ES+EN, con Markdown) y 4 testimonios. **Es contenido inventado para poder mostrar el sitio poblado** — nombres de empresas y personas en los testimonios son ficticios y deben reemplazarse por casos reales autorizados antes de cualquier lanzamiento público. El script queda en el repo para volver a poblar el ambiente si se resetea la base de datos.
- **Las páginas públicas ya leen del mini-CMS:** `/productos/energia-limpia|electromovilidad|financiamiento` muestran los productos reales de esa categoría e idioma (o el estado "pendiente" si no hay ninguno todavía); `/blog` y `/blog/[slug]` renderizan los posts reales (con Markdown); `/casos-de-exito` muestra los testimonios reales; `/contacto` toma los teléfonos y el email de `site_settings` en vez de tenerlos escritos en el código. Probado de punta a punta: contenido cargado desde `/admin` aparece de inmediato en el sitio público, en el idioma correcto, sin filtrarse al otro idioma.
- Se agregó una columna `category` a `products` (energia-limpia / electromovilidad / financiamiento) para poder listar cada producto bajo su pilar correspondiente

**Todavía no está conectado (siguiente tramo):**
- El home (hero, diferenciadores, estadísticas) y el índice `/productos` siguen usando el copy estático de `messages/es.json` / `en.json` — es contenido de marca fijo, no se planea moverlo al mini-CMS por ahora
- Notificación por email de leads nuevos (Resend) — todavía no está conectada
- Blog (`posts`) no tiene campo de imagen de portada todavía; solo productos y testimonios suben imagen

---

## 🗺️ MAPA DEL SITIO (Sitemap)

Cada ruta existe en `/es/...` (default) y `/en/...`.

- `/` — Home (Hero, Servicios, Diferenciadores, Verticales, Productos destacados, Estadísticas, CTA final)
- `/productos` — índice de las 3 líneas de negocio
  - `/productos/energia-limpia` (AUXSOL)
  - `/productos/electromovilidad` (camionetas + carga)
  - `/productos/financiamiento`
- `/soluciones` — verticales: Residencial, Comercial (C&I), Industrial/Utility, Flotas
- `/nosotros` — Acerca de The Blvck Stone + respaldo de AUX Group
- `/casos-de-exito` — testimonios y casos de uso reales
- `/blog` + `/blog/[slug]` — contenido SEO
- `/contacto`
- `/gracias` — thank-you page post-envío de formulario (para conversion tracking en GA4)
- `/legal/aviso-de-privacidad`, `/legal/terminos`, `/legal/cookies`
- `404` personalizada

El footer de 4 columnas del brief original (Servicios / Productos / Empresa / Legal) apunta directo a estas rutas.

---

## 🎯 ESTRATEGIA DE CONTENIDO & SECCIONES

> **Mapa brief → implementación (v2.6).** Las secciones de abajo son la intención original del brief; esta tabla dice cómo quedó cada una en el sitio. Donde el skill de diseño obligó a cambiar el patrón (por ejemplo, "3 cards" se convirtió en bento) se anota el motivo.

| Sección del brief | Dónde vive | Cómo se implementó |
|---|---|---|
| 1. Hero | Home | Split asimétrico 7/5: eyebrow, H1 (2 líneas), subtítulo de 16 palabras, 2 CTAs; foto duotono 4:5 con marco turquesa desfasado; entrada escalonada con Motion. El video hero del brief queda pendiente de material |
| 2. Servicios (3 cards) | Home | **Bento asimétrico** (1 celda grande con foto + 1 con foto + 1 tintada con icono) en vez de 3 cards iguales, que el skill prohíbe por genérico. Colores de acento por pilar como pedía el brief |
| 3. Diferenciadores (grid de 8) | Home | Título sticky a la izquierda, 8 ítems con icono Phosphor + título + una línea a la derecha, sin cards ni bordes |
| 4. Casos de uso / verticales (4 fichas) | Home + `/soluciones` | Home: galería acordeón (las tiras crecen al hover, solo CSS). `/soluciones`: 4 tiles fotográficos con CTA "Diseñar mi solución" → `/contacto` (el modal del brief se sustituyó por la página de contacto) |
| 5. Productos destacados (showcase) | `/productos/*` | Cards horizontales foto + texto + chips de especificaciones (sin tabla de filas con líneas). Contenido real desde `/admin`. El carrusel y el simulador de financiamiento quedan pendientes (video YouTube y reglas de negocio) |
| 6. Nosotros | `/nosotros` | Historia en 3 párrafos + 3 cifras con count-up, "Cómo trabajamos" en 3 pasos sin numerar, certificaciones como badges de texto, equipo con monograma de iniciales |
| 7. Testimonios | Home + `/casos-de-exito` | Home: cita destacada grande + 2 secundarias. `/casos-de-exito`: cita hero en petróleo + grid de citas con borde turquesa. Datos reales desde `/admin` |
| 8. Estadísticas AUX Group | Home + `/nosotros` | Franja numérica con count-up sobre petróleo profundo, sin cards |
| 9. Blog | Home + `/blog` + `/blog/[slug]` | Home: 3 filas editoriales. Índice: post destacado con foto + filas. Artículo: portada, ancho de lectura 65ch, Markdown renderizado |
| 10. Contacto & CTA final | `/contacto` + banda CTA | Formulario a la derecha en tarjeta petróleo suave, datos de contacto a la izquierda con iconos; teléfonos y email vienen de `site_settings`. "Descargar catálogo" se eliminó hasta que exista un catálogo |
| 11. Footer | Global | 5 columnas (marca + 4), tagline, oficinas, email. Etiquetas idénticas al brief |

### 1. HERO SECTION (Principal)
**Objetivo:** Captar atención inmediata con visual impactante

**Elementos:**
- **Video/Imagen Hero:** Camionetas eléctricas en infraestructura moderna + paneles solares + estaciones de carga
- **Headline Principal:** "Soluciones inteligentes para tu transición energética"
- **Subheadline:** "Energía limpia • Electromovilidad • Financiamiento Estratégico"
- **CTA Primaria:** "Descubre nuestras soluciones" (Ámbar Solar #FFB43D)
- **CTA Secundaria:** "Contacta con nosotros" (outline Turquesa #1BBCB4)
- **Animación:** Ligera, sutil, no invasiva. Scroll reveal effects.

**Diseño:**
- Full-width, fondo Petróleo Profundo (#0E2E30)
- Texto blanco/Marfil
- Logo integrado discretamente en esquina superior
- Efecto parallax opcional en elementos secundarios

---

### 2. SECCIONES DE SERVICIOS/LÍNEAS DE NEGOCIO
**3 Pilares principales en cards interactivos:**

#### Card 1: ENERGÍA LIMPIA (AUXSOL)
- **Icono:** Panel solar + batería
- **Título:** "Energía Limpia & Almacenamiento"
- **Descripción:** "Soluciones integrales de generación, almacenamiento y distribución de energía renovable. BESS, inversores utility-scale, infraestructura residencial y comercial."
- **Enlace:** "Explorar soluciones energéticas" → `/productos/energia-limpia`
- **Color:** Turquesa Vivo (#1BBCB4)

#### Card 2: ELECTROMOVILIDAD
- **Icono:** Camioneta eléctrica + estación de carga
- **Título:** "Vehículos Eléctricos & Infraestructura de Carga"
- **Descripción:** "Distribución de camionetas eléctricas de última generación + infraestructura de carga AC/DC. Soluciones completas para flotas."
- **Enlace:** "Ver catálogo de vehículos" → `/productos/electromovilidad`
- **Color:** Menta Eléctrica (#37E6C4)

#### Card 3: SOLUCIONES FINANCIERAS
- **Icono:** Gráfico ascendente + moneda
- **Título:** "Financiamiento Empresarial Inteligente"
- **Descripción:** "Préstamos y productos financieros diseñados para proyectos de energía y transformación industrial. Opciones flexibles con soporte especializado."
- **Enlace:** "Consultar opciones de financiamiento" → `/productos/financiamiento`
- **Color:** Ámbar Solar (#FFB43D)

**Diseño:**
- Grid responsive (3 columnas desktop, 1 mobile)
- Hover effects: Elevación, cambio de color de acento
- Animaciones suaves al scroll

---

### 3. SECCIÓN: DIFERENCIADORES & VENTAJAS
**Título:** "¿Por qué elegir The Blvck Stone?"

**6-8 Puntos destacados en grid:**
- ✓ Tecnología certificada internacionalmente (UL, KEMA, ANSI, IEC)
- ✓ Soporte técnico local en México (CDMX + centros logísticos)
- ✓ Comisionamiento remoto incluido
- ✓ Resolución de incidencias < 48 horas
- ✓ Garantías extendidas (10-10-2/3 años)
- ✓ Acompañamiento preventa y postventa
- ✓ Ingeniería especializada a medida
- ✓ Propuestas técnico-económicas personalizadas

**Diseño:**
- Iconografía clara y consistente
- Fondo Niebla (#E7F2F1)
- Texto Petróleo Profundo (#0E2E30)

---

### 4. SECCIÓN: CASOS DE USO / VERTICALES
**Título:** "Soluciones para cada industria"

**4 Fichas interactivas:**
1. **Residencial** → Inversores, BESS, AC Chargers
2. **Comercial (C&I)** → Soluciones medianas, DC Multicharger
3. **Industrial/Utility** → Inversores +350kW, BESS 261-418 kWh
4. **Flotas Empresariales** → Camionetas EV + estaciones de carga

**Diseño:**
- Cada ficha con imagen ilustrativa
- Descripción breve + características principales
- CTA: "Diseñar solución" con modal de contacto

---

### 5. SECCIÓN: PRODUCTOS DESTACADOS (SHOWCASE)
**Visuals + specs de productos estrella:**

#### AUXSOL
- Imagen: Estaciones de carga, baterías, paneles
- Especificaciones: Potencia, capacidad, compatibilidad
- Diferenciadores: "Soporte técnico local", "Garantía 10 años"

#### Camionetas Eléctricas
- Galería de modelos disponibles
- Especificaciones técnicas: Autonomía, capacidad de carga
- Video YouTube integrado (link que proporcionas)
- CTA: "Solicitar información de disponibilidad"

#### Productos Financieros
- Tabla comparativa de opciones
- Simulador interactivo de financiamiento — **marcado como opcional; ver "Riesgos y dependencias" antes de comprometer fecha, requiere reglas de negocio (tasas/plazos/requisitos) del área financiera**
- Términos claros: Tasas, plazos, requisitos

**Diseño:**
- Carrusel/slider responsive
- High-resolution product images
- Especificaciones en tabs o acordeones
- CTA destacada: Ámbar Solar (#FFB43D)

---

### 6. SECCIÓN / PÁGINA: NOSOTROS *(nueva)*
**Título:** "Más que un proveedor, tu socio en innovación"

**Elementos:**
- Historia de The Blvck Stone como integrador estratégico de proyectos industriales
- Respaldo de **AUX Group** (ver cifras en sección de Estadísticas) — explicar qué es AUX Group y por qué su respaldo importa para el cliente (solidez financiera, capacidad de manufactura, garantía de suministro)
- Certificaciones internacionales (UL, KEMA, ANSI, IEC) con logos
- Equipo de contacto: Karla Arizmendi y Juan Carlos Meza, con foto y rol
- CTA: "Habla con nuestro equipo" → `/contacto`

**Diseño:**
- Layout editorial (texto + imagen alternados)
- Reutiliza el bloque de Estadísticas de la Home

---

### 7. SECCIÓN / PÁGINA: TESTIMONIOS / CASOS DE ÉXITO *(nueva)*
**Título:** "Empresas que ya transformaron su energía"

**Elementos:**
- Grid o carrusel de 3-6 testimonios (foto/avatar 200x200, nombre, empresa, cargo, cita)
- Casos de éxito extendidos (opcional v2): antes/después, kWh instalados, ROI, tiempo de implementación
- **Pendiente del cliente:** autorización de logo/nombre de cliente para mostrarlo públicamente

**Diseño:**
- Fondo Marfil (#F5F8F7)
- Cards con cita destacada en Negrita (700)

---

### 8. SECCIÓN: ESTADÍSTICAS & CREDIBILIDAD
**Elementos de AUX Group (que respalda a The Blvck Stone):**
- 39 años de historia en el mercado
- $9.6 millones en activos
- $300 millones en ingresos (MXN 2025)
- 6+ fábricas operativas
- 40,000+ empleados globalmente
- #500 ITop en China
- Certificaciones internacionales

**Diseño:**
- Infografía moderna con números grandes
- Fondo oscuro (Petróleo #0E2E30) con acentos en Turquesa

---

### 9. BLOG / RECURSOS *(nueva)*
**Objetivo:** Contenido SEO de largo plazo (mencionado como "SEO ongoing" en notas del brief original, ahora con página propia)

**Elementos:**
- Listado paginado de artículos (`/blog`), detalle (`/blog/[slug]`)
- Categorías sugeridas: Energía & Sustentabilidad, Electromovilidad, Financiamiento, Casos de éxito, Noticias AUX Group
- Autor, fecha, tiempo de lectura, artículos relacionados
- Gestionado 100% desde el panel `/admin` propio para que el equipo publique sin dev

**Diseño:**
- Cards con imagen destacada, título, extracto
- Reutiliza tipografía y paleta de la Home

---

### 10. SECCIÓN: CONTACTO & CTA FINAL
**Título:** "Transforma tu negocio hoy"

**Elementos:**
- Formulario de contacto simple (Nombre, Email, Teléfono, Mensaje, Industria) + checkbox de consentimiento con link al Aviso de Privacidad (obligatorio, ver sección Legal)
- 2 CTAs lado a lado:
  - "Solicitar demostración" (principal, Ámbar Solar)
  - "Descargar catálogo" (secundaria, outline Turquesa)
- Información de contacto:
  - Teléfono: +52 442 790 8598 (Karla) | +52 442 809 9488 (Juan Carlos)
  - Email: contacto@the-blvckstone.com
  - Oficina: Polanco, CDMX | Centro logístico: Guadalajara, Jalisco

**Diseño:**
- Fondo degradado Petróleo → Negro Base
- Formulario con campos claros
- Validación en tiempo real
- Redirección a `/gracias` tras envío exitoso (permite medir conversión en GA4 como pageview de destino)

---

### 11. FOOTER
- Logo The Blvck Stone
- 4 columnas de enlaces rápidos:
  - Servicios (Energía, Electromovilidad, Financiero) → `/productos/*`
  - Productos (AUXSOL, Camionetas, Financiamiento) → `/productos/*`
  - Empresa (Nosotros, Casos de éxito, Blog, Contacto) → `/nosotros`, `/casos-de-exito`, `/blog`, `/contacto`
  - Legal (Aviso de Privacidad, Cookies, Términos de servicio) → `/legal/*`
- Selector de idioma ES/EN
- Redes sociales: LinkedIn, Instagram (si aplica)
- Copyright + Año
- "Powered by The Blvck Stone" con logo

---

## 🔒 PRIVACIDAD, LEGAL & CUMPLIMIENTO *(nueva)*

- **Aviso de Privacidad** conforme a la **LFPDPPP** (Ley Federal de Protección de Datos Personales en Posesión de los Particulares) — obligatorio al recolectar Nombre/Email/Teléfono en el formulario de contacto. No basta con una "Privacy Policy" genérica.
- **Banner de consentimiento de cookies**, ya que el sitio usa GA4, GTM y un heatmap (Hotjar/Clarity) — necesario tanto para tráfico mexicano como si se recibe tráfico internacional vía la versión en inglés.
- **SSL/TLS forzado (HTTPS)** en todo el sitio — formalizado aquí como requisito técnico, no solo nota de lanzamiento.
- **Retención y uso de leads:** definir con el cliente cuánto tiempo se guardan los datos del formulario y quién tiene acceso al dashboard de Neon.

---

## 🗄️ PANEL DE ADMINISTRACIÓN PROPIO (mini-CMS) *(nueva)*

En vez de un CMS externo (Sanity/Strapi/Payload), Karla y Juan Carlos editan contenido desde un panel propio, construido dentro del mismo proyecto Next.js.

### Modelo de contenido (tablas en Postgres)
- `products` — productos/servicios (título, descripción, specs, imágenes, slug, idioma)
- `posts` — artículos de blog (título, cuerpo, autor, fecha, categoría, slug, idioma)
- `testimonials` — testimonios/casos de éxito (nombre, empresa, cargo, cita, foto)
- `site_settings` — textos configurables de home (headline, subheadline, estadísticas, datos de contacto)

### Panel `/admin` — ✅ implementado (2026-09-05)
- Rutas protegidas bajo `/admin`, login con usuario/contraseña vía variables de entorno (`ADMIN_USERNAME`/`ADMIN_PASSWORD`) — por ahora una sola cuenta compartida, no 2 cuentas separadas; pasar a multiusuario es un fast-follow, no bloquea el lanzamiento
- CRUD completo (crear/editar/borrar) para productos, posts de blog y testimonios, más un formulario de configuración para datos de contacto
- Editor de texto simple (textarea en Markdown, renderizado en el sitio público) para el cuerpo del blog
- Las páginas públicas ya leen de estas tablas — lo que se carga en `/admin` aparece de inmediato en el sitio (ver "Avance del proyecto")

### Almacenamiento de imágenes (dos fases) — ✅ fase 1 implementada
- **Mientras el sitio esté en Vercel:** el disco es efímero, no sirve para guardar uploads del panel — se usa **Vercel Blob** (store `blvckstone-media`, integración nativa, sin cuenta aparte) para las imágenes subidas desde `/admin`. Ya está provisionado y probado con productos y testimonios.
- **Al migrar al VPS:** las imágenes se guardan directo en disco local (o un volumen Docker); en ese momento se retira la dependencia de Blob

### Por qué esta ruta y no Strapi/Payload
Menos piezas que mantener: un solo repo, un solo deploy, una sola base de datos. El costo es construir el panel a mano (formularios CRUD no vienen gratis de fábrica), pero se gana control total del dato y una migración al VPS sin piezas sueltas que mover.

---

## 🔧 ESPECIFICACIONES TÉCNICAS

### Stack Definido
Ver tabla de decisiones en "🏗️ Arquitectura & Stack". Resumen: **Next.js (TS) + Tailwind + panel `/admin` propio + Postgres (Neon) + Vercel Blob + Vercel → VPS**.

### Requisitos Funcionales

#### Performance
- Optimización de imágenes (WebP/AVIF vía `next/image`, lazy loading)
- Lighthouse score mín. 85+ (Mobile & Desktop)
- Time to First Byte (TTFB) < 600ms
- Compresión Gzip/Brotli activada (por defecto en Vercel)

#### Responsive Design
- Mobile first approach
- Breakpoints: 320px, 768px, 1024px, 1440px+
- Touch-friendly buttons (mín. 48x48px)

#### Animaciones & Interactividad
- ✅ Scroll reveal, count-up y entrada del hero con **Motion** (`motion/react`), con `prefers-reduced-motion` respetado
- Hover states en elementos interactivos
- Transiciones suaves (300-400ms)
- NO sobrecargar con animaciones (máx 2-3 por sección)

#### SEO
- ✅ Meta tags dinámicos (title, description) por página e idioma (`generateMetadata` + `src/lib/metadata.ts`)
- ✅ `hreflang` ES/EN y canonical entre versiones equivalentes
- ✅ Open Graph / Twitter Card con imagen OG generada (`opengraph-image.tsx`)
- ✅ `sitemap.xml` y `robots.txt` (`/admin` y `/api` excluidos)
- Open Graph / Twitter Card
- Sitemap.xml + robots.txt (generados automáticamente por Next.js a partir del sitemap definido arriba)
- Structured data (Schema.org: Organization, Product, BreadcrumbList, Article para blog)
- Canonical URLs
- Heading hierarchy (H1, H2, H3)

#### Accesibilidad
- WCAG 2.1 Level AA compliance
- Keyboard navigation funcional
- Alt text en todas las imágenes (en ambos idiomas)
- ✅ Contraste de colores verificado: CTAs 8.2:1, acentos 6.1:1, texto secundario ajustado a `carbon/75` y `mist/70` para pasar AA (ver "Sistema de diseño vigente")

#### Formularios & Leads
- Validación client-side (Zod/react-hook-form) y server-side (Route Handler)
- CAPTCHA (hCaptcha o similar)
- Al enviarse: guarda en Postgres (Neon), redirige a `/gracias` — falta agregar el email de notificación (Resend) a contacto@the-blvckstone.com
- Payload genérico y versionado para poder conectar HubSpot/Zoho/Salesforce más adelante sin cambiar el formulario

#### Analytics & Tracking
- Google Analytics 4 integrado
- Google Tag Manager
- Conversión tracking (formularios, CTAs, pageview de `/gracias`)
- Heatmap (Hotjar o Clarity)

---

## 🌐 SOPORTE DE NAVEGADORES *(nueva)*
- Chrome, Edge, Firefox, Safari — últimas 2 versiones
- iOS Safari y Chrome Android — últimas 2 versiones
- No se garantiza soporte a Internet Explorer

---

## 📱 SECCIONES POR DISPOSITIVO

### Desktop (1440px+)
- Navegación horizontal completa
- Layout de 3 columnas en tarjetas
- Carruseles de productos
- Formularios side-by-side

### Tablet (768px-1024px)
- Navegación compacta / Hamburger menu
- Layout de 2 columnas
- Carruseles adaptados
- Textos legibles

### Mobile (< 768px)
- Hamburger menu "sticky" top
- Stack vertical 1 columna
- Carruseles full-width
- CTAs ampliadas para touch
- Formularios con una columna

---

## 🎬 CONTENIDO MULTIMEDIA

### Videos
- **Video Hero:** Camionetas eléctricas + infraestructura (15-20s, autoplay muted)
- **Video YouTube:** [Link que proporcionas] → Integrado en sección de camionetas
- **Formato:** MP4 + WebM, comprimidos

### Imágenes
- **Resoluciones:** 1x, 2x (retina)
- **Formatos:** JPEG (fotos), PNG/WebP (gráficos)
- **Dimensiones recomendadas:**
  - Hero: 1920x1080 min
  - Cards: 600x400
  - Product showcase: 800x600
  - Testimonials: 200x200 (avatares)

### Iconografía
- Set de 20-30 iconos custom (diseño minimalista, geométrico) — **mientras no exista, el sitio usa Phosphor Icons** (una sola familia, sin SVG hechos a mano)
- Colores: Turquesa (#1BBCB4), Menta (#37E6C4), Ámbar (#FFB43D), Gris (#6B7A80)
- Estilos: Outline o filled (consistente, sin mezclar)
- Stroke width: 2px (para coherencia con Helvetica Now Display)

---

## 💡 RECOMENDACIONES ESTRATÉGICAS

### Homepage Hero
**Gancho visual más efectivo:** Camionetas eléctricas en movimiento + estación de carga + paneles solares. Es lo más tangible y atractivo visualmente.

### Llamadas a acción
- **Primaria:** "Descubre nuestras soluciones" / "Solicitar demostración"
- **Secundaria:** "Descargar catálogo" / "Contacta con nosotros"
- **Terciaria:** "Explorar productos"
- **Color primario CTA:** Ámbar Solar (#FFB43D)

### Diferenciadores a enfatizar
1. Soporte técnico LOCAL en México (no es estándar en el mercado)
2. Resolución rápida de incidencias (< 48h)
3. Garantías extendidas (10-10 años)
4. Ingeniería a medida (no one-size-fits-all)
5. Financiamiento integrado

### Personas objetivo
1. **CTO/Directores de IT/Energía** → Énfasis técnico, certificaciones, escalabilidad
2. **Dueños de empresas (PYMES)** → Soluciones financieras, ROI, casos de éxito
3. **Flotas empresariales** → Electromovilidad, ahorros operacionales
4. **Proyectos utility-scale** → Inversores grandes, BESS, rendimiento

### Mensajería clave
- "Transforma tu negocio con energía limpia"
- "Soluciones inteligentes, financiamiento flexible"
- "Estrategia energética + tecnología = crecimiento"
- "Más que un proveedor, tu socio en innovación"

---

## 📊 MÉTRICAS DE ÉXITO

- Tasa de conversión formulario: > 3%
- Tiempo promedio en sitio: > 2:30 min
- Bounce rate: < 45%
- Mobile traffic: Esperado 60%+
- Velocidad de carga (PageSpeed): 85+
- Leads generados mensualmente: Target mín. 50
- Split de tráfico ES vs EN (para decidir cuánto invertir en contenido de cada idioma a futuro)

---

## ⚙️ ENTORNOS & FLUJO DE TRABAJO *(nueva)*

- **Repositorio:** [github.com/ElBeDev/theBlvckStone](https://github.com/ElBeDev/theBlvckStone) — `main` = producción, ramas de feature + Pull Request para cada cambio
- **Entornos:** Local → Preview (deploy automático por PR en Vercel) → Producción (`the-blvckstone.com` en Vercel, luego VPS propio)
- **CI en cada PR:** lint, type-check, build
- **Panel de administración:** `/admin` dentro del propio proyecto Next.js, acceso solo para Karla/Juan Carlos (ver "Panel de administración propio")
- **Verificación visual:** Playwright está instalado como devDependency (`npx playwright install chromium` la primera vez). Cualquier cambio de diseño se valida con screenshots en 1440×900 y 390×844 haciendo scroll completo antes de capturar, más las mediciones descritas en "Sistema de diseño vigente". `npm run build` y `npm run lint` deben quedar en cero antes de hacer push
- **Contenido de demo:** `node scripts/seed-demo.mjs` con `DATABASE_URL` cargada repuebla productos, posts y testimonios sin duplicar

---

## ⚠️ RIESGOS Y DEPENDENCIAS *(nueva)*

1. **Contenido bilingüe es el cuello de botella más probable.** Copy, imágenes y video deben entregarse en ES (y EN si aplica antes del lanzamiento) — si no llegan a tiempo, el timeline de Fase 3 se corre.
2. **Video Hero:** si el material propio no está listo, definir banco de imágenes/video temporal para no bloquear Fase 2.
3. **Simulador de financiamiento:** requiere reglas de negocio (tasas, plazos, requisitos de elegibilidad) del área financiera antes de poder programarse — confirmar si entra en v1 o se mueve a v2.
4. **Autorización de testimonios/logos de clientes** para la sección de Casos de Éxito — hoy tiene testimonios **de demo, inventados** (ver "Avance del proyecto"), cargados solo para mostrar el sitio poblado en reuniones internas. Deben reemplazarse por casos reales autorizados antes de compartir el link fuera del equipo o de conectar el dominio real.
5. ~~Las páginas públicas todavía no leen del mini-CMS~~ — **resuelto:** productos, blog, casos de éxito y contacto ya leen de Postgres en vivo.
6. ~~Mientras el sitio esté en Vercel, las imágenes subidas desde `/admin` necesitan un storage externo temporal~~ — **resuelto:** Vercel Blob ya está provisionado y el upload de archivo funciona en productos y testimonios.

---

## 🚀 TIMELINE RECOMENDADO

> Ajustado desde la v1 para reflejar multi-página + CMS + bilingüe. Asume que el cliente entrega contenido (textos, imágenes, video) a tiempo — ver "Riesgos y dependencias".

1. **Fase 0 (Semana 1):** Kickoff, wireframes de páginas clave, setup de repo/proyecto (Next.js + Vercel), modelado de datos del mini-CMS en Postgres
2. **Fase 1 (Semana 2-3):** Diseño UI (mockups) de Home + páginas de producto + Nosotros, aprobación de cliente
3. **Fase 2 (Semana 4-7):** Desarrollo frontend, panel `/admin` (CRUD + login), i18n ES/EN, formulario de leads + Neon + email
4. **Fase 3 (Semana 8-9):** Carga de contenido real (ambos idiomas), testing cross-browser/responsive/accesibilidad, QA
5. **Fase 4 (Semana 10):** UAT con cliente, correcciones finales, deploy a producción, configuración DNS/SSL/GA4/GTM
6. **Post-launch:** Manual de uso del CMS para Karla/Juan Carlos, monitoreo, ajustes SEO continuos

---

## 📌 PENDIENTES / DECISIONES ABIERTAS

- [ ] Textos finales en español (y su traducción al inglés)
- [ ] Autorización de logos/testimonios de clientes reales
- [ ] Confirmar si el simulador de financiamiento entra en v1 o v2
- [ ] Redes sociales activas a enlazar (LinkedIn confirmado, ¿Instagram?)
- [ ] Proveedor de DNS/dominio y correo corporativo
- [x] ~~Provisionar Postgres y storage de imágenes, setear `DATABASE_URL`/`ADMIN_USERNAME`/`ADMIN_PASSWORD`/`SESSION_SECRET`/`BLOB_READ_WRITE_TOKEN` en Vercel~~ — resuelto con Neon + Vercel Blob, ambos nativos de Vercel
- [x] ~~Conectar las páginas públicas a las tablas del mini-CMS~~ — resuelto: productos, blog, casos de éxito y contacto ya leen contenido real
- [ ] **Reemplazar el contenido de demo (inventado) por contenido real** antes de compartir el link fuera del equipo — especialmente los 4 testimonios, que hoy son ficticios
- [ ] **Fotografía real para reemplazar los placeholders** (todos en `src/components/DuotoneImage.tsx`, tabla `CURATED`): hero del home (vertical 4:5, infraestructura energética), bento de servicios (2 fotos: energía/BESS y camioneta eléctrica), 4 verticales (residencial, comercial, industrial, flotas), 3 headers de categoría de producto, foto de equipo para Nosotros, portadas de blog, y fotos de producto reales cargadas desde `/admin` (hoy usan una reserva por categoría)
- [ ] **Archivos de la fuente Helvetica Now Display** (licenciada). Hoy se usa Archivo como stand-in; el cambio es una sola línea en `src/app/[locale]/layout.tsx` y `globals.css`
- [ ] **Revisión legal** de los borradores de Aviso de Privacidad, Términos y Cookies (visibles con etiqueta "Borrador sujeto a revisión legal")
- [ ] Alta de cuentas de servicio restantes: Resend, GA4/GTM, Hotjar/Clarity (mayoría con tier gratuito para arrancar)
- [ ] Proveedor de VPS y fecha estimada de migración fuera de Vercel

---

## 📚 REFERENCIAS Y MATERIALES DE ANÁLISIS

**Para el desarrollador: Recursos complementarios para análisis de productos y referencias visuales**

### Catálogo de Productos & Drive de Referencia
**Google Drive Folder:** https://drive.google.com/drive/folders/1S0slmqzxykstYjF3WmAUuzMBf3Wn_zBy
- Contiene: Especificaciones técnicas, fichas de productos AUXSOL, modelos de camionetas, documentación financiera
- Revisar antes de implementar secciones de productos para asegurar especificaciones correctas

### Video de Producto (Electromovilidad)
**YouTube Link:** https://youtu.be/8DgFBo8g5Nc?si=Fk_CUi9QxBdKuYF5
- Referencia visual de camionetas eléctricas y estaciones de carga
- A integrar en sección "Productos Destacados" (Camionetas Eléctricas)
- Reproducción automática sin sonido (muted autoplay)

---

## 📝 NOTAS ADICIONALES

- **Marca visual:** Consultar proyecto "THE BLVCK STONE" en carpeta CRM (paleta aprobada, logo, hoja membretada)
- **Contenido:** Proporcionar textos finales (ES y EN), imágenes de productos, videos
- **Dominio & Hosting:** Verificar configuración DNS, SSL, email corporativo
- **Post-launch:** Mantenimiento, actualizaciones de contenido, SEO ongoing

---

## 👥 CONTACTOS PRINCIPALES

- **Karla Arizmendi** (Strategy & Growth Director)
  +52 442 790 8598 | karla@the-blvckstone.com

- **Juan Carlos Meza** (Business Development Director)
  +52 442 809 9488 | juancarlos@the-blvckstone.com

- **Contacto General:** contacto@the-blvckstone.com
- **Sitio:** the-blvckstone.com

---

## 🗓️ HISTORIAL DE VERSIONES

- **v1.0 (2026-09-03):** Documento inicial — identidad visual, secciones de contenido, specs técnicas generales, timeline.
- **v2.0 (2026-09-05):** Se cierran las decisiones de arquitectura abiertas en v1 (multi-página, Next.js + Sanity + Supabase + Vercel, bilingüe ES/EN, sin CRM en v1). Se agregan: mapa del sitio, secciones de Nosotros/Testimonios/Blog, sección de privacidad y cumplimiento (LFPDPPP, cookies), soporte de navegadores, entornos y flujo de trabajo, riesgos/dependencias, y lista de pendientes abiertos. Timeline ajustado de 9 a 10 semanas para reflejar el alcance real.
- **v2.1 (2026-09-05):** Se reemplaza Sanity por un panel de administración propio (Next.js + Postgres) para minimizar dependencias de terceros y facilitar la futura migración a un VPS propio. Se agrega la sección "Panel de administración propio (mini-CMS)" con el modelo de contenido, el enfoque de `/admin` y la estrategia de almacenamiento de imágenes en dos fases (Vercel → VPS). Hosting definido como plan en dos fases: Vercel ahora, VPS propio más adelante. Se registra el repositorio en GitHub ([ElBeDev/theBlvckStone](https://github.com/ElBeDev/theBlvckStone)) con el scaffold inicial ya pusheado.
- **v2.2 (2026-09-05):** Se agrega la sección "Avance del proyecto" para llevar el estado real del desarrollo. Se implementa y prueba de punta a punta el esquema de base de datos (Drizzle) y el panel `/admin` completo: login, y CRUD de productos/blog/testimonios + configuración de contacto. Se deja explícito que las páginas públicas todavía no leen de estas tablas (siguen usando contenido estático) — se agrega como pendiente prioritario junto con la conexión real a la base de datos y el upload de imágenes.
- **v2.3 (2026-09-05):** Se reemplaza Supabase por **Neon**, instalado como integración nativa dentro del mismo proyecto de Vercel (un tercero menos que administrar por separado). Se provisiona **Vercel Blob** para el almacenamiento de imágenes y se conecta el upload de archivo real en los formularios de productos y testimonios (antes solo aceptaban una URL). Todo probado de punta a punta contra la base de datos y el storage reales: login, CRUD completo, subida de imagen, y dashboard con conteos en vivo. `DATABASE_URL`, `BLOB_READ_WRITE_TOKEN`, `ADMIN_USERNAME`, `ADMIN_PASSWORD` y `SESSION_SECRET` ya están seteados en Vercel (production/preview/development).
- **v2.4 (2026-09-05):** Se conectan las páginas públicas al mini-CMS: productos (por categoría e idioma), blog (índice + detalle con Markdown), casos de éxito y los datos de contacto ahora se leen de Postgres en vivo en vez del copy estático. Se agrega la columna `category` a `products` para asociar cada producto a uno de los 3 pilares. El home y el índice `/productos` se mantienen con el copy de marca fijo a propósito. Probado de punta a punta: contenido cargado desde `/admin` aparece de inmediato en el sitio, respetando el idioma.

- **v2.5 (2026-09-05):** Se carga contenido de demostración vía `scripts/seed-demo.mjs`: 9 productos (ES+EN), 3 posts de blog (ES+EN) y 4 testimonios, para poder mostrar el sitio poblado en una demo. **Es contenido inventado, no clientes reales** — queda marcado como pendiente prioritario reemplazarlo antes de compartir el link fuera del equipo.

- **v2.7 (2026-09-05):** Se documenta el sistema de diseño vigente (reglas del skill que ahora gobiernan el sitio, excepciones declaradas, resultado de las auditorías del Paso 4 y cómo repetir la verificación visual), el mapa brief → implementación por sección, y se actualizan stack, tipografía, iconografía y especificaciones técnicas con lo que ya está implementado.
- **v2.6 (2026-09-05):** Rediseño visual completo del sitio público con el skill `design-taste-frontend` (auditoría, modo Preserve con ejecución overhaul, levers 1 a 5 de la Sección 11.D). Home de 8 secciones con familias de layout distintas, tema por página, menú móvil, logo mark, fuente Archivo vía `next/font`, animaciones con Motion, iconos Phosphor, copy completo ES/EN sin placeholders, borradores legales, metadata SEO por página, sitemap, robots y OG image. Verificación con Playwright (desktop y móvil) y correcciones de contraste AA. `/admin` queda fuera del alcance del skill por decisión explícita (dashboards están fuera de su scope).

**Documento generado:** 2026-09-03
**Última actualización:** 2026-09-05
**Versión:** 2.7
