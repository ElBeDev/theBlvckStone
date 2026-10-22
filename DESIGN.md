---
name: The Blvck Stone
description: Catálogo de servicios industriales impreso sobre petróleo, marcado a pluma en ámbar.
colors:
  petrol: "#0e2e30"
  ivory: "#f5f8f7"
  black-base: "#0b0f10"
  amber: "#ffb43d"
  turquoise: "#1bbcb4"
  coral: "#ff6a4b"
  stone: "#6b7a80"
  teal: "#10767c"
  mint: "#37e6c4"
  carbon: "#1f2a2a"
  mist: "#e7f2f1"
  ink: "#f5f8f7"
  ink-2: "rgb(245 248 247 / 0.72)"
  ink-3: "rgb(245 248 247 / 0.58)"
  rule: "rgb(245 248 247 / 0.16)"
  rule-strong: "rgb(245 248 247 / 0.38)"
  pen: "#ffb43d"
  spot: "#1bbcb4"
typography:
  display:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 112"
  headline:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 900
    lineHeight: 1.25
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 118"
  title:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 900
    lineHeight: 1.25
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 118"
  body:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
    fontVariation: "'wdth' 100"
  label:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "11px"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "0.06em"
    fontVariation: "'wdth' 75"
  narrow:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 76"
rounded:
  none: "0"
  xs: "2px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "5": "20px"
  "6": "24px"
  "8": "32px"
  "10": "40px"
  "14": "56px"
  "16": "64px"
  "20": "80px"
components:
  button-primary:
    backgroundColor: "{colors.pen}"
    textColor: "{colors.petrol}"
    typography: "{typography.body}"
    rounded: "{rounded.xs}"
    padding: "12px 20px"
  button-primary-hover:
    backgroundColor: "{colors.pen}"
    textColor: "{colors.petrol}"
  button-mark:
    backgroundColor: "transparent"
    textColor: "{colors.ink-2}"
    typography: "{typography.label}"
    rounded: "{rounded.xs}"
    padding: "4px 10px"
  button-mark-marked:
    backgroundColor: "{colors.pen}"
    textColor: "{colors.petrol}"
  chip-route:
    backgroundColor: "transparent"
    textColor: "{colors.pen}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "2px 6px"
  input:
    backgroundColor: "rgb(11 15 16 / 0.3)"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.xs}"
    padding: "12px 14px"
  nav-index:
    backgroundColor: "transparent"
    textColor: "{colors.ink-2}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "36px"
  nav-index-active:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
  notice:
    backgroundColor: "transparent"
    textColor: "{colors.ink-2}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "4px 10px"
  zone-code:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    size: "20px"
  route-strip:
    backgroundColor: "rgb(14 46 48 / 0.95)"
    textColor: "{colors.ink-2}"
    height: "64px"
---

# Design System: The Blvck Stone

## Overview

**Creative North Star: "El catálogo de nave"**

El sitio es un catálogo impreso de servicios industriales, no un sitio de marketing. Una sola hoja de papel petróleo con grano visible, una sola tinta marfil, y una retícula de filos finos que empaca las 29 entradas borde con borde. Lo que ordena la página es el plano de una nave industrial: cada servicio es una celda con código de zona (A-01, C-05, E-10) y ese mismo código lo sitúa en el plano. El visitante no lee un hero; recorre su planta y marca lo que aplica.

La única intervención de color es la pluma. Un bolígrafo ámbar circula las celdas marcadas, tacha las ya abiertas, traza la ruta entre puntos del plano y firma la acción principal. Todo lo demás es tinta marfil a tres densidades sobre petróleo. El turquesa vive solo dentro del plano, como el color de los divisores y cajas de zona de un plano técnico. La densidad es alta a propósito: pies de 11 píxeles en condensada, dígitos tabulares, tablas de especificaciones con filas de filo fino. Se lee como lo que un ingeniero deja sobre la mesa antes de la visita.

Rechazos confirmados en la construcción: no hay hero fotográfico, no hay tres tarjetas iguales, no hay franja de cifras, no hay kickers ni eyebrows sobre los títulos, no hay sombras, no hay tema claro.

**Key Characteristics:**
- Una hoja: fondo petróleo fijo con grano de fibra y desgaste de tinta hacia los bordes.
- Una tinta: marfil al 100%, 72% y 58%; el gris nunca es un color propio.
- Retícula de filos finos (`.cell-grid`) como único contenedor; las celdas no tienen fondo ni sombra.
- Una familia, cuatro voces: Archivo variable sobre el eje `wdth` (75, 76, 112, 118).
- La pluma ámbar como único acento de acción y como única animación autoral.
- Plano de planta SVG con el turquesa reservado para sus zonas.
- Franja fija "Tu ruta" al pie de todas las páginas con la acción principal siempre visible.
- Esquinas cuadradas; 2px solo en lo interactivo.

## Colors

Paleta de marca de 11 colores, cerrada; el catálogo usa cuatro de ellos como sistema y deja el resto como reserva de marca.

### Primary
- **Ámbar pluma** (`pen`, alias de `amber`): el bolígrafo. Círculos y tachaduras sobre celdas, línea de ruta en el plano, fichas de ruta, el botón de acción principal, el cursor de texto (`caret-color`), la selección de texto, el anillo de foco y el color al que pasan los vínculos al hover. Nunca como fondo de superficie ni como color de texto corrido.

### Secondary
- **Turquesa plano** (`spot`, alias de `turquoise`): cajas de letra de zona y trazo de zona en hover dentro de `PlanSvg`, con un relleno de zona en hover a `rgb(27 188 180 / 0.08)`. No sale del SVG del plano, salvo el triángulo de contorno del `LogoMark`, que es un activo de marca anterior al catálogo.

### Tertiary
- **Coral** (`coral`): único color de estado. Aparece una vez, como texto del error de envío del formulario de contacto.

### Neutral
- **Petróleo** (`petrol`): la hoja. Fondo de `body`, del masthead (`bg-petrol/95`) y de la franja de ruta (`bg-petrol/95`); tinta de los botones ámbar; relleno de los puntos no marcados del plano; velo de las fotos (`rgb(14 46 48 / 0.28)` en `multiply`).
- **Negro base** (`black-base`): desgaste de la hoja. Viñeta radial hacia los bordes (`rgb(11 15 16 / 0.55)`), speckle oscuro del grano y fondo de los campos de formulario (`bg-black-base/30`).
- **Marfil tinta** (`ink`): el único color de texto. Títulos, nombres, valores de tablas y vínculos activos.
- **Tinta al 72%** (`ink-2`): texto corrido, códigos de celda, etiquetas secundarias, vínculos en reposo.
- **Tinta al 58%** (`ink-3`): notas de margen, pies, numerales de índice, placeholders.
- **Filo** (`rule`): hairline de la retícula, de las filas de especificación y del límite del lote en el plano.
- **Filo fuerte** (`rule-strong`): hairline con más tinta para los bordes del masthead y la franja fija, el marco de las fotos, las cajas de letra de zona, los campos de formulario y los muros del plano.
- **Piedra** (`stone`): solo el triángulo relleno del `LogoMark`.
- **Teal, menta, carbón, niebla** (`teal`, `mint`, `carbon`, `mist`): definidos en `globals.css` como parte de la paleta cerrada, sin uso en la interfaz pública.

### Named Rules
**La regla de una tinta.** Todo texto es marfil a una de tres densidades (`ink`, `ink-2`, `ink-3`). No existe un gris propio; el texto secundario es la misma tinta adelgazada con alfa.

**La regla de la pluma.** El ámbar aparece solo donde una pluma lo dejaría: la marca sobre una celda, la ruta en el plano, la ficha de ruta, el botón de acción, el foco y el hover de un vínculo. Nunca como relleno de sección, borde decorativo o título.

**La regla del plano.** El turquesa se queda dentro de `PlanSvg`. Fuera del plano, la zona se identifica con su letra en una caja de filo fuerte, en tinta marfil.

## Typography

**Display Font:** Archivo (variable, eje `wdth` 62 a 125, cargada con `next/font/google` como `--font-archivo`), con Helvetica Neue, Helvetica y Arial de respaldo.
**Body Font:** la misma Archivo a anchura 100.
**Label Font:** la misma Archivo condensada (`wdth` 75).

**Character:** una sola familia que cambia de voz por anchura, no por fuente. Ancha y negra para títulos; condensada, en versalitas y con dígitos tabulares para códigos, pies y etiquetas. La brief de marca pide Helvetica Now Display; Archivo es el sustituto vigente y su eje de anchura es lo que da al catálogo sus voces.

### Hierarchy
- **Display** (`.t-display`, 900, 2.5rem a 3.25rem en el home y 2.25rem a 3.75rem en páginas interiores, line-height 0.95, tracking -0.035em, `wdth` 112): el gancho del home y el H1 de cada página. Ancho máximo 14ch a 20ch; `text-wrap: balance`.
- **Headline** (`.t-wide`, 900, 1.5rem a 1.875rem, tracking -0.02em, `wdth` 118): cabeceras de sección en `SectionHead`, con una nota condensada en el margen derecho y sin kicker.
- **Title** (`.t-wide`, 900, 1.125rem a 1.5rem, line-height 1.25, `wdth` 118): nombres de entrada en `EntryList`, títulos de corrida, nombres de zona en `ZoneSheet`, títulos de boletín, certificaciones y el wordmark (17px). Los títulos de paso y de cláusula van en 700 sin voz ancha (1.125rem).
- **Body** (`.t-body`, 400, 1rem, line-height 1.625 en texto corrido y 1.375 en pies de celda, `text-wrap: pretty`): descripciones y párrafos en `ink-2`, ancho máximo entre 44ch y 70ch (52ch, 56ch, 60ch y 62ch son los más usados). Valores de tabla en 700 y `ink`.
- **Label** (`.t-cond`, 700, 11px y 12px, tracking 0.06em, mayúsculas, `wdth` 75): códigos de celda, línea de edición, índice de navegación, etiquetas de tabla y formulario, notas de margen, fichas de ruta y avisos. Los dígitos son tabulares en todo el sitio (`font-variant-numeric: tabular-nums` en `body`).
- **Narrow** (`.t-narrow`, 600, 11px, line-height 1.25, tracking -0.015em, `wdth` 76): el nombre corto bajo cada celda de entrada, recortado a dos líneas.

### Named Rules
**La regla de las cuatro voces.** Una familia, cuatro anchuras: 75 condensada para etiquetas, 76 estrecha para nombres de celda, 112 para display y 118 para cabeceras. Ninguna otra fuente, ninguna otra anchura.

**La regla del piso de 11.** El texto más pequeño de la hoja es 11px y siempre va en condensada, en 700 cuando es etiqueta y en 400 cuando es nota. Nada baja de ahí en HTML.

**La regla del numeral.** Un número delante de un texto solo cuando el orden informa: el índice del masthead (01 a 05) es el orden de las páginas, los pasos de la ruta de trabajo son secuencia, las cláusulas legales son cláusulas, y el numeral sobre un punto del plano es la posición en la ruta. No hay numerales de sección decorativos.

## Layout

Un contenedor de 80rem (`max-w-7xl`) con margen lateral de 16px y 24px desde 768px. El masthead ocupa dos filas: 56px con wordmark, línea de edición y cambio de idioma, y 36px con el índice de páginas separado por filos; es pegajoso (`sticky top-0`, `z-40`) con `bg-petrol/95` y `backdrop-blur-sm`. La franja de ruta mide 64px, es fija al pie (`fixed bottom-0`, `z-40`) y deja un espaciador de 64px al final de cada página.

La hoja del catálogo es una `.cell-grid` de dos columnas `2fr 3fr` desde 1024px: plano a la izquierda, pegajoso a 5.75rem (la altura del masthead), celdas a la derecha en una retícula `auto-fill` de mínimo 4.5rem que se fija en 9 columnas a 1024px y 10 a 1280px. Debajo, la clave de zonas en 2 columnas y 5 desde 768px. Las secciones siguientes van en celdas de 3, 2 y 4 columnas desde 768px y se separan 80px (`mt-20`).

Ritmo interior: cabeceras de panel `px-4 py-3` y `px-6` desde 768px; celdas de contenido `p-5` y `p-6` desde 768px; filas de tabla `py-2` (especificaciones) y `py-4` (compromisos, contactos); apertura de página `pt-10` y `pt-14` desde 768px; párrafos a `mt-5`. Breakpoints de Tailwind sin cambios: 640, 768, 1024 y 1280px.

Responsive: en móvil las columnas colapsan a una, el plano va antes que las celdas, los nombres de zona del plano se ocultan por debajo de 640px (quedan las letras), el índice del masthead pasa a una lista desplegable bajo el botón de menú, y la franja de ruta esconde el título y las fichas, dejando el conteo y el botón con texto corto.

## Elevation & Depth

No hay sombras. La profundidad viene de la hoja: un `body::before` fijo con viñeta radial de negro base hacia los bordes (`rgb(11 15 16 / 0.55)` al 100%) y dos capas de ruido SVG (speckle marfil y speckle negro base) que dan grano de fibra. Las fotos se integran a la hoja con `.duotone`: `saturate(0.85) contrast(1.04)` y un velo petróleo `rgb(14 46 48 / 0.28)` en `mix-blend-mode: multiply`, dentro de un marco de filo fuerte de 1px.

Las dos superficies que flotan sobre la hoja (masthead y franja de ruta) no se elevan con sombra sino con `bg-petrol/95` más `backdrop-blur-sm` y un filo fuerte en su borde interior. El vínculo de "abrir ficha" sobre cada foto va sobre `bg-petrol/85`.

### Named Rules
**La regla de la hoja plana.** Nada proyecta sombra. Lo que se superpone se separa con un filo y con un petróleo casi opaco; lo que se acerca al cursor se desplaza 1px hacia arriba, no se ilumina.

## Shapes

Catálogo impreso: esquinas cuadradas. Superficies, celdas, marcos de foto, fichas de ruta, avisos y cajas de letra de zona a radio 0. Lo interactivo que se presiona (botón principal, botón de marcar, campos de formulario) lleva 2px (`rounded-xs`), un canto troquelado, no una pastilla. No hay otro radio en el sitio.

Bordes de 1px en todo el sistema, en `rule` para la retícula y en `rule-strong` para marcos y límites. Las fotos de celda son cuadradas (`aspect-square`) y las de ficha 4:3. La geometría orgánica existe en un solo sitio: el círculo de pluma, una elipse ligeramente irregular dibujada con un solo trazo que se solapa a sí mismo (`PEN_PATH`), y las curvas cuadráticas de la ruta en el plano, que se arquean hasta 14 unidades fuera de la recta.

## Components

### Buttons
- **Shape:** canto troquelado (2px, `rounded-xs`).
- **Primary:** ámbar pluma sobre tinta petróleo, 700, 0.875rem, `px-5 py-3` (en la franja `px-4 py-2.5`, en el formulario `px-6 py-3.5` a 1rem), flecha Phosphor `ArrowRight` de 16px en 700 a la derecha con `gap-2`. Es el único botón relleno y siempre dice "Solicitar evaluación sin costo" o su versión corta.
- **Hover / Focus:** sube 1px (`hover:-translate-y-px`), vuelve a 0 en `active`; foco con contorno ámbar de 2px a 3px de separación (global). Deshabilitado a opacidad 0.6.
- **Mark (secundario):** etiqueta condensada 11px con borde de filo fuerte y tinta al 72%; al hover borde y texto ámbar; marcado, relleno ámbar con tinta petróleo. Alterna `aria-pressed`.
- **Ghost:** texto condensado 11px en `ink-3` que pasa a `ink` (limpiar ruta, abrir ficha), sin borde.

### Chips
- **Ficha de ruta:** borde ámbar de 1px, texto ámbar condensado 11px en 700, `px-1.5 py-0.5` en la franja y `px-2 py-1` en el formulario, formato "1 · A-01". Esquinas cuadradas.
- **Aviso:** borde de filo fuerte, texto condensado 11px en 700 a `ink-2`, `px-2.5 py-1`. Marca contenido pendiente (borrador legal, demo del boletín).
- **Código de zona:** caja cuadrada de 20px (24px en `ZoneSheet`, 44px para iniciales de equipo) con borde de filo fuerte y letra condensada en 800.

### Cards / Containers
- **Corner Style:** 0.
- **Background:** ninguno; la celda es transparente sobre la hoja.
- **Shadow Strategy:** ninguna (ver Elevation & Depth).
- **Border:** la retícula `.cell-grid` dibuja arriba e izquierda y cada hijo dibuja derecha y abajo en `rule`, así una pista vacía no deja filos sueltos. Contenedores sueltos (formulario, nota de financiamiento) usan `border border-rule`.
- **Internal Padding:** `p-5` y `p-6` desde 768px; `p-4` en la clave de zonas; `p-1` en celdas de entrada.

### Inputs / Fields
- **Style:** borde de filo fuerte, fondo negro base al 30%, 2px de radio, `px-3.5 py-3`, texto `ink`, placeholder `ink-3`. Etiqueta encima en condensada 11px a `ink-2`, con `mt-2` hasta el campo.
- **Focus:** el borde pasa a ámbar y el contorno global se apaga (`focus:outline-none`). El cursor de texto es ámbar en toda la página.
- **Error / Disabled:** el error del envío va en coral a 0.875rem junto al botón; la casilla de consentimiento usa `accent-amber`.

### Navigation
- **Masthead:** wordmark "THE BLVCK STONE" en `.t-wide` 17px 900 junto al `LogoMark` de 28px; línea de edición condensada en `ink-2` al centro desde 1024px; cambio de idioma "ES / EN" en 0.75rem 700 con el activo subrayado.
- **Índice:** vínculos condensados 11px en 700 separados por filos verticales (`border-r border-rule`, `pr-5` y `pl-5`), cada uno con su numeral en `ink-3`. Reposo `ink-2`, hover `ink`, activo `ink` con subrayado en `ink-2` a 6px de separación y `aria-current="page"`.
- **Móvil:** lista desplegable bajo el masthead, filas de `py-3.5` separadas por filos, 0.875rem condensada, idioma y año de edición en la última fila.
- **Pie de página (colofón):** retícula de 4 columnas `1.4fr 1fr 1fr 1fr` con wordmark, oficinas, índice numerado, líneas y legales; línea de edición condensada al cierre.

### Celda de entrada (signature)
`EntryCell`: una celda de la retícula con foto cuadrada en `.duotone` y marco de filo fuerte, código en condensada 11px a `ink-2` y nombre corto en `.t-narrow` 11px 600 a `ink`, recortado a dos líneas. Toda la celda es un botón `aria-pressed` que marca o desmarca; un vínculo de 20px sobre `bg-petrol/85` en la esquina superior derecha abre la ficha (`ArrowUpRight` 12px). Al hover la foto escala 1.04 en 500ms con `--ease-out-expo` y la zona correspondiente del plano se enciende. Marcada (`data-marked="true"`), un SVG que sobresale 4px dibuja el círculo de pluma; abierta, el nombre lleva una tachadura ámbar de 2px girada -3 grados (`.pen-strike`).

### Plano de planta (signature)
`PlanSvg`: viewBox 640 por 480 con el lote en línea discontinua `rule`, cinco zonas (A techo con tramado a 45 grados, B subestación, C patio con bahías y espuela, D estructura, E oficina) en trazo `rule-strong` de 1.2 a 2, letra de zona en caja turquesa de 18 con texto petróleo 800, y nombre de zona en condensada 10.5 con `wdth` 78. Cada entrada es un punto de radio 4.5 relleno petróleo con contorno `ink-2`; marcada, radio 6 relleno ámbar con su posición en la ruta encima. Las entradas marcadas se unen con `.pen-route`, una polilínea de curvas cuadráticas en ámbar 2.4 cuyo `stroke-dashoffset` transiciona en 700ms. La zona bajo el cursor pasa a trazo turquesa y relleno turquesa al 8% en 200ms.

### Franja de ruta (signature)
`RouteStrip`: fija al pie de todas las páginas, 64px, `bg-petrol/95` con `backdrop-blur-sm` y filo fuerte arriba. De izquierda a derecha: "TU RUTA" en condensada, hasta ocho fichas de ruta más un "+n", el conteo en 0.875rem `ink-2` (`aria-live="polite"`), "Limpiar" en ghost con `X` 12px, y el botón principal, que lleva los códigos marcados a `/contacto?ruta=`.

### Cabecera de sección
`SectionHead`: filo superior, título en `.t-wide` 1.5rem a 1.875rem 900 a la izquierda, nota opcional en condensada 11px `ink-3` a la derecha en la misma línea base, `pt-4 pb-6`. Sin kicker, sin numeral.

### Motion
Una sola animación autoral: el trazo de pluma. `.pen-circle` dibuja con `pathLength=1`, `stroke-dasharray: 1` y `stroke-dashoffset` de 1 a 0 en 520ms con `--ease-out-expo` (`cubic-bezier(0.16, 1, 0.3, 1)`); `.pen-route` transiciona su `dashoffset` en 700ms con la misma curva. Todo lo demás son transiciones de estado: color en los vínculos, 1px de elevación en los botones, 200ms en el trazo del plano, 160ms en el radio de los puntos, 500ms en la escala de la foto. Con `prefers-reduced-motion`, la pluma aparece ya trazada y las transiciones caen a 0.01ms.

### Superficies del navegador
Selección de texto ámbar con texto petróleo, cursor de texto ámbar, `:focus-visible` con contorno ámbar de 2px a 3px, scrollbar `rule-strong` sobre petróleo (`scrollbar-color`), `color-scheme: dark`. Los subrayados de vínculo van a 0.18em de separación con 1px de grosor.

## Do's and Don'ts

### Do:
- **Do** poner todo contenido en la retícula `.cell-grid` o entre filos `rule-t` / `rule-b`; es el único contenedor del catálogo.
- **Do** escribir códigos, etiquetas, pies y notas en `.t-cond` a 11px en 700 (etiqueta) o 400 (nota), siempre en mayúsculas y con dígitos tabulares.
- **Do** usar `.t-wide` 900 para cualquier título de sección o entrada y `.t-display` 900 para el H1 de página, con `max-w` en `ch`.
- **Do** reservar `bg-pen` para el único botón de acción, que siempre pide la evaluación sin costo y lleva `ArrowRight` 16px en 700.
- **Do** enmarcar toda foto con `border border-rule-strong` dentro de `.duotone`.
- **Do** separar secciones de página con `mt-20` y abrir cada página con `pt-10` (`pt-14` desde 768px).
- **Do** mantener la franja `RouteStrip` y el masthead en todas las páginas públicas, con sus 64px de espaciador al pie.
- **Do** usar `rounded-xs` (2px) solo en botones y campos; todo lo demás a radio 0.
- **Do** marcar contenido pendiente o de demo con el chip de aviso en lugar de inventar cifras.

### Don't:
- **Don't** introducir un gris: el texto secundario es `ink-2` o `ink-3`, nunca `stone`, `carbon` o un gris de utilidad.
- **Don't** usar turquesa fuera de `PlanSvg` ni ámbar como relleno de sección, borde decorativo o color de título.
- **Don't** añadir kickers, eyebrows o numerales decorativos sobre los títulos; `SectionHead` solo admite título y nota de margen.
- **Don't** aplicar sombras, degradados de superficie ni bordes de más de 1px; la profundidad es el grano de la hoja y el filo.
- **Don't** usar otra fuente ni otra anchura que las cuatro voces de Archivo (75, 76, 112, 118).
- **Don't** usar texto HTML por debajo de 11px.
- **Don't** nombrar proveedores, marcas ni clientes de proveedores en ningún texto visible.
- **Don't** escribir guiones largos ni medios en texto visible; separar con "·" o con punto.
- **Don't** añadir un tema claro ni variar el fondo entre páginas: un solo petróleo en todo el sitio.
- **Don't** colocar un hero fotográfico, una franja de cifras ni tarjetas con fondo propio; la oferta se presenta como celdas de catálogo.
