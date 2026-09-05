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
| **CMS** | Sanity (headless, hosted) | Karla/Juan Carlos editan textos, productos, blog e imágenes sin depender de un dev. Hosted (sin servidor que mantener), buen soporte de contenido localizado ES/EN, generoso tier gratuito. *(Alternativa: Strapi self-hosted si prefieren control total del dato — cambiar de opinión aquí es barato, avisar antes de iniciar Fase 2)* |
| **Internacionalización** | Rutas `/es/...` y `/en/...` (next-intl) | Cada documento de Sanity tiene campos localizados; fallback a español si falta traducción |
| **Backend / Leads** | Next.js Route Handlers, sin servidor aparte | El formulario de contacto guarda el lead en Postgres (Supabase) y dispara un email (Resend) — sin CRM todavía |
| **CRM** | Ninguno en v1 | El payload del lead se diseña genérico (`leads` con nombre/email/teléfono/mensaje/industria/utm) para poder conectar HubSpot/Zoho/Salesforce después sin rehacer el formulario |
| **Hosting** | Vercel | Integración nativa con Next.js, preview deployments por PR, analytics incluido |
| **Base de datos** | Postgres (Supabase), solo para leads | El contenido de marketing vive en Sanity; no hace falta Mongo aparte |

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
- Gestionado 100% desde Sanity para que el equipo publique sin dev

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
- **Retención y uso de leads:** definir con el cliente cuánto tiempo se guardan los datos del formulario y quién tiene acceso al panel de Supabase.

---

## 🔧 ESPECIFICACIONES TÉCNICAS

### Stack Definido
Ver tabla de decisiones en "🏗️ Arquitectura & Stack". Resumen: **Next.js (TS) + Tailwind + Sanity + Supabase (leads) + Vercel**.

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
- Scroll reveal effects (Framer Motion o AOS)
- Hover states en elementos interactivos
- Transiciones suaves (300-400ms)
- NO sobrecargar con animaciones (máx 2-3 por sección)

#### SEO
- Meta tags dinámicos (title, description) por página e idioma
- `hreflang` ES/EN entre versiones equivalentes
- Open Graph / Twitter Card
- Sitemap.xml + robots.txt (generados automáticamente por Next.js a partir del sitemap definido arriba)
- Structured data (Schema.org: Organization, Product, BreadcrumbList, Article para blog)
- Canonical URLs
- Heading hierarchy (H1, H2, H3)

#### Accesibilidad
- WCAG 2.1 Level AA compliance
- Keyboard navigation funcional
- Alt text en todas las imágenes (en ambos idiomas)
- Contraste de colores adecuado

#### Formularios & Leads
- Validación client-side (Zod/react-hook-form) y server-side (Route Handler)
- CAPTCHA (hCaptcha o similar)
- Al enviarse: guarda en Postgres (Supabase), envía email de notificación (Resend) a contacto@the-blvckstone.com, redirige a `/gracias`
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
- Set de 20-30 iconos custom (diseño minimalista, geométrico)
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

- **Repositorio:** GitHub privado. `main` = producción, ramas de feature + Pull Request para cada cambio
- **Entornos:** Local → Preview (deploy automático por PR en Vercel) → Producción (`the-blvckstone.com` en Vercel)
- **CI en cada PR:** lint, type-check, build
- **CMS:** Sanity Studio embebido en el proyecto (`/studio`), acceso separado para Karla/Juan Carlos con rol editor (sin acceso a código)

---

## ⚠️ RIESGOS Y DEPENDENCIAS *(nueva)*

1. **Contenido bilingüe es el cuello de botella más probable.** Copy, imágenes y video deben entregarse en ES (y EN si aplica antes del lanzamiento) — si no llegan a tiempo, el timeline de Fase 3 se corre.
2. **Video Hero:** si el material propio no está listo, definir banco de imágenes/video temporal para no bloquear Fase 2.
3. **Simulador de financiamiento:** requiere reglas de negocio (tasas, plazos, requisitos de elegibilidad) del área financiera antes de poder programarse — confirmar si entra en v1 o se mueve a v2.
4. **Autorización de testimonios/logos de clientes** para la sección de Casos de Éxito.
5. **Elección final CMS (Sanity vs Strapi):** confirmar antes de iniciar Fase 2, ya que cambia la infraestructura.

---

## 🚀 TIMELINE RECOMENDADO

> Ajustado desde la v1 para reflejar multi-página + CMS + bilingüe. Asume que el cliente entrega contenido (textos, imágenes, video) a tiempo — ver "Riesgos y dependencias".

1. **Fase 0 (Semana 1):** Kickoff, wireframes de páginas clave, setup de repo/proyecto (Next.js + Sanity + Vercel), modelado de contenido en Sanity
2. **Fase 1 (Semana 2-3):** Diseño UI (mockups) de Home + páginas de producto + Nosotros, aprobación de cliente
3. **Fase 2 (Semana 4-7):** Desarrollo frontend, integración Sanity, i18n ES/EN, formulario de leads + Supabase + email
4. **Fase 3 (Semana 8-9):** Carga de contenido real (ambos idiomas), testing cross-browser/responsive/accesibilidad, QA
5. **Fase 4 (Semana 10):** UAT con cliente, correcciones finales, deploy a producción, configuración DNS/SSL/GA4/GTM
6. **Post-launch:** Manual de uso del CMS para Karla/Juan Carlos, monitoreo, ajustes SEO continuos

---

## 📌 PENDIENTES / DECISIONES ABIERTAS

- [ ] Confirmar Sanity vs Strapi de forma definitiva
- [ ] Textos finales en español (y su traducción al inglés)
- [ ] Autorización de logos/testimonios de clientes reales
- [ ] Confirmar si el simulador de financiamiento entra en v1 o v2
- [ ] Redes sociales activas a enlazar (LinkedIn confirmado, ¿Instagram?)
- [ ] Proveedor de DNS/dominio y correo corporativo
- [ ] Alta de cuentas de servicio: Vercel, Sanity, Supabase, Resend, GA4/GTM, Hotjar/Clarity (mayoría con tier gratuito para arrancar)

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

**Documento generado:** 2026-09-03
**Última actualización:** 2026-09-05
**Versión:** 2.0
