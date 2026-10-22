# Diseño v3 del sitio público: "Patio de noche"

Documento de trabajo del rediseño aprobado en vista previa el 2026-10-21. Describe el concepto, el sistema visual, las reglas tipográficas y de distribución (lo que evita encimados), el estado por página y lo que falta. Es la referencia para cualquier cambio visual futuro; `DESIGN.md` en la raíz se genera a partir del sitio construido cuando se cierre la revisión de acabado.

Rama: `redesign-v3`. Producción sigue en la versión anterior hasta aprobación final.

---

## 1. Concepto

**Una sola voz tipográfica, enorme, sobre un fondo petróleo.** Lo importante está adelante, grande y brillante; lo secundario retrocede en tamaño y en luz. Nada va encerrado en cajas, tarjetas, filos ni sombras. Las fotos son planos de fondo lavados en petróleo, no recuadros.

Origen: la mano "más atrevida" de la tirada de dirección de Impeccable (pantalla de título de demoscene: una cara tipográfica flotando sobre un vacío, el rango como profundidad). El cliente rechazó la versión anterior ("catálogo de nave": celdas pequeñas, versalitas condensadas de 11 px) por chiquita y apretada, y rechazó el polvo de partículas de la primera versión de esta dirección. Lo que quedó es lo que está aquí.

**Qué se niega a hacer este diseño:** hero con foto al lado del texto, tres tarjetas iguales en fila, franja de estadísticas con tiles, etiquetas diminutas en versalitas, kickers o eyebrows sobre los títulos, degradados de texto, glass, sombras, bordes de color, partículas o texturas de fondo.

---

## 2. Sistema visual

### Color

Paleta de marca intocable (11 colores del brief). En el sitio se usan así:

| Rol | Token | Valor | Uso |
|---|---|---|---|
| Fondo | `--void` | Petróleo #0E2E30 | Toda la página; viñeta radial a Negro base #0B0F10 en los bordes (`body` background-image) |
| Tinta frente | `--ink-0` | Marfil #F5F8F7 | Lo que está adelante: titulares, cifras, botones de texto |
| Tinta paso 1 | `--ink-1` | Marfil al 74% | Párrafos, nav inactiva, pies |
| Tinta paso 2 | `--ink-2` | Marfil al 50% | Metadatos, numerales de proceso, bases de cálculo |
| Tinta paso 3 | `--ink-3` | Marfil al 30% | Líneas que retroceden al fondo (solo texto grande), subrayado de campos |
| Señal | `--signal` | Ámbar #FFB43D | Solo el botón de acción principal y el link "Ver la línea". Nada más es ámbar |
| Marca | Turquesa #1BBCB4, Piedra #6B7A80 | | Solo en el logo (triángulo superior turquesa, inferior piedra) |
| Error | Coral #FF6A4B | | Solo mensajes de error del formulario |

Teal, menta, carbón y niebla están definidos pero no se usan en el sitio público. No se agregan colores.

**Fotos:** siempre a sangre como plano de fondo (`.photo-plane`): saturación al 35%, capa de Petróleo en `mix-blend-mode: color` al 85%, degradado a petróleo hacia abajo, y opacidad según profundidad (70 / 50 / 35%). Las fotos de ficha en páginas de línea llevan `.photo-tint` (misma desaturación) sin marco ni radio.

**Logo:** `LogoMark.tsx`, dos triángulos en contorno con esquinas redondeadas (turquesa arriba, piedra abajo), ® y brillo suave (`.glow`). Se sustituye por el archivo oficial cuando llegue.

### Tipografía

Dos familias, dos trabajos:

| Voz | Familia | Peso | Interlineado | Tracking | Uso |
|---|---|---|---|---|---|
| `.v-display` | Unbounded | 900 | 1.0 | -0.03em | Titulares de portada, ganchos, líneas de compromiso, cierre |
| `.v-title` | Unbounded | 800 | 1.05 | -0.02em | Títulos de ficha, pasos, nombres de equipo, wordmark |
| `.v-num` | Unbounded | 900 | 0.95 | -0.04em, dígitos tabulares | Cifras gigantes (solo números, sin acentos) |
| Cuerpo | Archivo | 400 a 700 | 1.55 | normal | Párrafos, nav, formulario, pies. Base 18 px |

**Escala por ancho de pantalla** (Tailwind, móvil → sm → md → lg/xl):

| Elemento | 390 | 640+ | 768+ | 1024+ | 1280+ |
|---|---|---|---|---|---|
| H1 portada (`page.tsx`) | 2.5rem | 3.75rem | 4.5rem | 6rem | 6rem |
| H1 interiores (`PageTitle`) | 2.5rem | 3.75rem | 4.5rem | 5.5rem | 5.5rem |
| Palabras de la cola (`DepthQueue`) | 1.75rem | 3rem | 3.75rem | 4.5rem | 7.5rem |
| Cifras (`.v-num` en home) | 3.5rem | 4.5rem | 6rem | 7.5rem | 7.5rem |
| Línea `xl` | 2.5rem | 3.75rem | 4.5rem | 6rem | 6rem |
| Línea `lg` (compromisos) | 2.25rem | 3rem | 3.75rem | 4.5rem | 4.5rem |
| Línea `md` (títulos de sección) | 1.875rem | 2.25rem | 3rem | 3rem | 3rem |
| Párrafo líder | 1.25rem | 1.25rem | 1.5rem | 1.5rem | 1.5rem |
| Cuerpo | 1.125rem (18 px) en todo |

Tope de display: 6 rem para titulares con texto; 7.5 rem solo para cifras y para las cinco palabras de la cola, que son palabras sueltas sin acentos que choquen con una línea superior.

### Profundidad (el sistema de jerarquía)

Cada elemento que importa declara `data-depth="0..3"`. Una sola hoja de estilos lo traduce a brillo y espaciado:

- `0`: marfil pleno, tracking normal. Es lo que se lee primero. **Nunca se mueve.**
- `1`: 74%, +0.005em.
- `2`: 50%, +0.015em.
- `3`: 30%, +0.03em. Solo para texto grande (contraste 4.7:1 sobre petróleo).

Transición de 500 ms con `--ease-out-expo` al cambiar de profundidad (la cola de líneas). Los planos traseros pueden llevar parallax de scroll (`.plane-1/2/3`, que leen `--sy` publicado por `ScrollClock`); hoy solo lo usan los planos de foto del hero y del cierre.

### Formas y espacio

- Nada tiene borde, radio ni sombra. El único rectángulo dibujado es el botón ámbar (esquinas cuadradas).
- Campos de formulario: solo una línea inferior en `--ink-3`; en foco pasa a ámbar.
- Contenedor de 80 rem (`max-w-7xl`) con gutters de 20 px en móvil y 32 px desde md.
- Ritmo vertical de secciones: 96 px en móvil, 128 px desde md (`py-24 md:py-32`). El cierre lleva 128 / 176.
- Dentro de una sección: título de sección (`Line md`, profundidad 1) y 56 a 64 px antes del contenido.

### Movimiento

- Una sola idea: profundidad. Al apuntar una palabra de la cola, se viene al frente (brillo y tracking) y su foto sube del fondo con fundido de 700 ms. Nada más se anima.
- Sin scroll-reveal, sin entradas escalonadas, sin partículas.
- `prefers-reduced-motion`: sin transiciones ni parallax.

### Superficies del navegador

Selección ámbar sobre petróleo, caret ámbar, anillo de foco ámbar con 4 px de desfase, scrollbar petróleo. Numerales tabulares en cifras.

---

## 3. Reglas contra encimados (lo que falló y cómo se evita)

1. **Interlineado de display nunca menor a 1.0.** Con 0.92 los acentos de ENERGÍA y CONSTRUCCIÓN chocaban con la línea de arriba. `.v-display` = 1.0, cola en mayúsculas = 1.04, `.v-num` = 0.95 solo porque los números no llevan acentos.
2. **Una cifra gigante nunca comparte fila con texto.** La cifra va sola en su renglón; la frase (30ch) y la base (56ch) van debajo. A 1024 y 768 la cifra se metía en la columna de texto.
3. **Las líneas grandes no sangran fuera del contenedor.** Se intentó que corrieran más allá de los bordes (gramática de la dirección); a 1024 cortaban "Hasta 100% deducib". Hoy todas las líneas viven dentro del contenedor con `max-w-[18ch]` y envuelven.
4. **Palabras sueltas enormes se dimensionan para que quepan enteras.** "FINANCIAMIENTO" marca el tope por ancho: 1.75 rem a 390 px, 3.75 rem a 768, 4.5 rem a 1024, 7.5 rem desde 1280.
5. **El botón de acción no se parte.** `whitespace-nowrap`; en el hero el párrafo y el botón se apilan hasta lg.
6. **Medidas de lectura:** párrafos líder 42 a 46ch; cuerpo 44 a 56ch; nunca una columna de texto más ancha que 64ch.
7. **Verificación obligatoria** antes de subir: capturas a 1440, 1024, 768 y 390 (`scratchpad/audit.mjs`) más el escáner de cajas de texto que se intersectan; cero `overflow:true`; sin em-dashes.

---

## 4. Páginas y componentes

| Ruta | Composición |
|---|---|
| `/` | Portada (foto plano + H1 6 rem + párrafo + botón) → cola de cinco líneas en profundidad → cifras de corridas (3) → compromisos (4 líneas retrocediendo) → cómo trabajamos (4 pasos numerados) → cierre "Manda tu recibo de CFE." |
| `/productos` | Título + la misma cola de cinco líneas como índice |
| `/productos/<línea>` | `PageTitle` con foto plano → fichas: foto 5/12 untinted salvo desaturación, título `.v-title`, descripción, specs como lista corrida "etiqueta valor" → siguiente línea + botón |
| `/soluciones` | Título + cola de cuatro verticales (Residencial, Comercial, Industrial, Flotas) |
| `/nosotros` | Título con foto plano → historia a 1.5 rem → cómo trabajamos → certificaciones como una línea `xl` → equipo (nombres a 3.75 rem) → botón |
| `/contacto` | H1 "Manda tu recibo de CFE." → formulario con campos de una línea (7/12) y datos de contacto grandes (5/12) |
| `/blog`, `/blog/[slug]` | Títulos `.v-title` a 3 rem; artículos de demo etiquetados "Ejemplo"; fuera del menú principal |
| `/legal/*`, `/gracias`, `404` | `PageTitle` + cláusulas numeradas o una línea y un link |

Componentes en `src/components/void/`: `PhotoPlane`, `PageTitle`, `Line`, `Signal`, `DepthQueue`, `ScrollClock`. Layout en `src/components/layout/` (`Header` de 80 px: wordmark, tres entradas, idioma, botón; `Footer` sin filos).

Copy del home en `messages/*.json` → `void.*`. Las cinco líneas (`void.lines`) traen palabra, título, texto y ruta; las fotos se asignan en `page.tsx`.

---

## 5. Estado y pendientes

Hecho en la rama: todo lo anterior, ES y EN, build y lint limpios, sin desbordes a cuatro anchos, sin encimados.

Pendiente antes de pasar a producción:
- [ ] Revisión de acabado (Impeccable finish reviewer) y `DESIGN.md` + `.impeccable/design.json` generados del sitio construido.
- [ ] Aprobación final del cliente sobre la vista previa.
- [ ] Merge de `redesign-v3` a `main` y deploy; actualizar `docs/BRIEF_DESARROLLO_WEB.md` a v3.1.

Pendiente del cliente:
- [ ] Archivo oficial del logo (hoy es un trazo según la referencia enviada).
- [ ] Cifras de proyectos instalados (no se inventan; el sitio no las muestra hasta tenerlas).
- [ ] Foto propia del equipo para `/nosotros`.
- [ ] Helvetica Now Display, si se mantiene como fuente de cuerpo (hoy Archivo); Unbounded se queda como display salvo que se decida otra.
- [ ] Revisión legal de inversión a tasa fija y programa de productividad.
