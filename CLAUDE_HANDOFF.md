# CLAUDE HANDOFF — Amani Beauty by María García
> Lee este archivo completo antes de hacer cualquier cosa. Es el estado actual del proyecto y tu plan de trabajo.

---

## 0. INSTRUCCIONES DE INICIO (léelas siempre primero)

1. Lee el skill de Astro en `/mnt/skills/` (busca su SKILL.md)
2. Lee el skill de frontend-design en `/mnt/skills/` (busca su SKILL.md)
3. Aplica ambos skills durante todo el proyecto
4. Revisa el estado actual en la sección "ESTADO DEL PROYECTO" de este archivo
5. Continúa por la siguiente tarea pendiente del PLANNING
6. **No preguntes cosas ya decididas en este documento. Solo pregunta si surge algo nuevo.**

---

## 1. DESCRIPCIÓN DEL PROYECTO

Página web para **Amani Beauty by María García**, una tienda de estética que ofrece masajes, tratamientos de uñas y tratamientos faciales. El proyecto es el esqueleto completo: estructura, diseño, placeholders de imagen y contenido de ejemplo en markdown. Las imágenes reales y el contenido definitivo se añadirán después.

---

## 2. DECISIONES TOMADAS (no volver a preguntar)

### Stack
- **Framework:** Astro (obligatorio, sin excepciones)
- **Estilos:** CSS nativo con variables CSS. Sin Tailwind.
- **Fuentes:** Google Fonts CDN en el `<head>` del Layout → Cormorant Garamond + Jost
- **Variables CSS:** en `/src/styles/global.css` importado en Layout.astro
- **i18n:** rutas dinámicas con `[lang]` → `/es/` y `/en/`

### Contenido
- Content Collections de Astro con schemas en `/src/content/config.ts`
- Treatments como **array de objetos en el frontmatter** del .md (no archivos separados)
- Texto de ejemplo (Lorem Ipsum o similar) en todos los .md por ahora

### Diseño
- Estética: femenina, elegante, minimalista de lujo
- Paleta: crema `#F5F0E8`, dorado `#C9A96E`, blanco roto `#FDFAF5`, gris `#8A8A8A`, texto `#2C2C2C`
- Logo: `/public/logo.png` (se subirá después, usar placeholder de texto por ahora)
- Breakpoints mobile-first: 768px (tablet), 1024px (desktop), 1440px (large)
- Espaciado entre secciones: 120px desktop / 80px móvil
- `prefers-reduced-motion` implementado desde el inicio

### Navegación
- Nav sticky, fondo `#FDFAF5`, borde inferior sutil
- Logo izquierda · Links centro/derecha · Toggle `ES | EN` extremo derecho
- **Opción C:** anclas a secciones del home + dropdown con los 4 servicios

### Sección Servicios (Home)
- 4 cards en layout horizontal desktop, alternando imagen/texto:
  ```
  [Card 1: Imagen izq | Texto der]
  [Card 2: Texto izq  | Imagen der]
  [Card 3: Imagen izq | Texto der]
  [Card 4: Texto izq  | Imagen der]
  ```
- Vertical en móvil

### Galería (Home)
- Grid de 8 placeholders con posibilidad de lightbox cuando haya imágenes reales
- Por ahora solo estructura + placeholders, sin JS de lightbox

### ImagePlaceholder.astro
- Prop: solo `aspectRatio` (ej: `"16/9"`, `"4/3"`, `"1/1"`)
- Estilo: fondo `#F0E8DC`, texto centrado `"— imagen próximamente —"` en Cormorant Garamond italic dorado `#C9A96E`

### WhatsApp flotante
- 60px diámetro, `bottom: 20px; right: 20px`, z-index alto
- Icono SVG de WhatsApp (inline, no imagen externa)
- Animación de pulso con keyframes CSS (escala + opacidad)

### SEO
- Meta tags dinámicos por página (título, descripción, OG)
- Schema.org `LocalBusiness`
- Sitemap automático de Astro (`@astrojs/sitemap`)

### Página 404
- Sí, con diseño personalizado acorde a la estética del sitio

---

## 3. ESTRUCTURA DE CARPETAS OBJETIVO

```
/
├── public/
│   ├── logo.png                        ← (ya subido)
│   └── images/
│       └── services/
│           ├── masajes/                ← pendiente de subir imágenes
│           ├── unas/                   ← pendiente de subir imágenes
│           ├── faciales/               ← pendiente de subir imágenes
│           └── especiales/             ← pendiente de subir imágenes
├── src/
│   ├── content/
│   │   ├── config.ts                   ← schemas zod
│   │   ├── site/
│   │   │   ├── general.md
│   │   │   └── gallery.md
│   │   └── services/
│   │       ├── masajes.md                  ← 8 tratamientos con precios
│   │       ├── unas.md                     ← 5 tratamientos con precios
│   │       ├── faciales.md                 ← 6 tratamientos con precios
│   │       └── especiales.md               ← 7 tratamientos con precios (NUEVO)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.astro
│   │   │   ├── Nav.astro
│   │   │   └── Footer.astro
│   │   ├── ui/
│   │   │   ├── ServiceCard.astro
│   │   │   ├── TreatmentCard.astro
│   │   │   ├── ImagePlaceholder.astro
│   │   │   └── WhatsAppButton.astro
│   │   └── sections/
│   │       ├── Hero.astro
│   │       ├── ServicesSection.astro
│   │       ├── AboutSection.astro
│   │       ├── GalleryGrid.astro
│   │       └── ContactSection.astro
│   ├── pages/
│   │   ├── index.astro                 ← redirect a /es/
│   │   ├── 404.astro
│   │   └── [lang]/
│   │       ├── index.astro             ← Home one-page
│   │       └── [lang=es]servicios/
│   │           └── [slug].astro        ← página de servicio individual
│   ├── styles/
│   │   └── global.css                  ← variables CSS + reset + tipografía base
│   └── i18n/
│       ├── es.ts                       ← strings UI en español
│       └── en.ts                       ← strings UI en inglés
├── astro.config.mjs
└── package.json
```

---

## 4. SCHEMAS DE CONTENT COLLECTIONS

### `/src/content/config.ts`
```ts
import { defineCollection, z } from 'astro:content';

const treatmentSchema = z.object({
  name: z.string(),
  name_en: z.string(),
  description: z.string().optional(),
  description_en: z.string().optional(),
  duration: z.string().optional(),
  price: z.string().optional(),
  image: z.string().optional(),
});

const servicesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    title_en: z.string(),
    slug: z.string(),
    slug_en: z.string(),
    description: z.string(),
    description_en: z.string(),
    coverImage: z.string().optional(),
    sortOrder: z.number(),
    treatments: z.array(treatmentSchema),
  }),
});

const siteCollection = defineCollection({
  type: 'content',
  schema: z.object({
    businessName: z.string().optional(),
    fullName: z.string().optional(),
    tagline: z.string().optional(),
    tagline_en: z.string().optional(),
    about: z.string().optional(),
    about_en: z.string().optional(),
    whatsapp: z.string().optional(),
    instagram: z.string().optional(),
    location: z.string().optional(),
  }),
});

export const collections = {
  services: servicesCollection,
  site: siteCollection,
};
```

---

## 5. FORMATO DE ARCHIVOS MD

### `/src/content/services/masajes.md`
```markdown
---
title: "Masajes"
title_en: "Massages"
slug: "masajes"
slug_en: "massages"
description: "Recupera el equilibrio de tu cuerpo y mente con nuestros masajes personalizados."
description_en: "Restore balance to your body and mind with our personalized massages."
coverImage: "/images/services/masajes/cover.jpg"
sortOrder: 1
treatments:
  - name: "Masaje Relajante"
    name_en: "Relaxing Massage"
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    description_en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    duration: "60 min"
    price: ""
    image: "/images/services/masajes/relajante.jpg"
  - name: "Masaje Descontracturante"
    name_en: "Deep Tissue Massage"
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    description_en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    duration: "75 min"
    price: ""
    image: "/images/services/masajes/descontracturante.jpg"
  - name: "Masaje con Piedras Calientes"
    name_en: "Hot Stone Massage"
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    description_en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    duration: "90 min"
    price: ""
    image: "/images/services/masajes/piedras.jpg"
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
```

### `/src/content/site/general.md`
```markdown
---
businessName: "Amani Beauty"
fullName: "Amani Beauty by María García"
tagline: "Tu espacio de belleza y bienestar"
tagline_en: "Your beauty and wellness space"
about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Soy María García y mi pasión es hacerte sentir bien."
about_en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. I am María García and my passion is making you feel good."
whatsapp: "+34 000 000 000"
instagram: "@amanibeauty"
location: ""
---
```

---

## 6. PÁGINAS Y RUTAS

| Ruta ES | Ruta EN | Archivo |
|---|---|---|
| `/` | `/` | `pages/index.astro` → redirect a `/es/` |
| `/es/` | `/en/` | `pages/[lang]/index.astro` |
| `/es/servicios/masajes` | `/en/services/massages` | `pages/[lang]/[services]/[slug].astro` |
| `/es/servicios/unas` | `/en/services/nails` | ídem |
| `/es/servicios/faciales` | `/en/services/facials` | ídem |
| `/es/servicios/especiales` | `/en/services/specials` | ídem |
| `/404` | `/404` | `pages/404.astro` |

---

## 7. HOME — SECCIONES EN ORDEN

1. **Hero** — logo, tagline (ES/EN), imagen placeholder grande, preparado para animación futura. Comentar en el código: `<!-- ANIMATION HOOK: parallax/scroll effect goes here -->`
2. **Servicios** — 3 cards alternadas con `ServiceCard.astro`
3. **Sobre mí** — imagen placeholder + texto de `general.md`
4. **Galería** — `GalleryGrid.astro` con 8 placeholders
5. **Contacto** — WhatsApp + Instagram desde `general.md`
6. **Footer** — nombre, copyright, redes

---

## 8. PÁGINA DE SERVICIO INDIVIDUAL — ESTRUCTURA

1. Hero de página: título + imagen placeholder grande (coverImage)
2. Introducción: cuerpo del .md (texto largo)
3. Grid de tratamientos: `TreatmentCard.astro` × N (cada uno con imagen placeholder, nombre, descripción, duración, precio)
4. CTA final: "Reserva tu cita" → botón WhatsApp (número de `general.md`)

---

## 9. PLANNING DE TAREAS

Marca cada tarea con ✅ cuando esté completada. Si retomas en una nueva sesión, empieza por la primera tarea sin ✅.

### FASE 1 — Base del proyecto
- [✅] 1.1 Configurar `astro.config.mjs` (sitemap, i18n básico)
- [✅] 1.2 Crear `/src/styles/global.css` con variables CSS, reset y tipografía base
- [✅] 1.3 Crear `/src/i18n/es.ts` y `/en.ts` con strings de UI
- [✅] 1.4 Crear `/src/content/config.ts` con schemas zod

### FASE 2 — Contenido markdown
- [✅] 2.1 Crear `/src/content/site/general.md`
- [✅] 2.2 Crear `/src/content/site/gallery.md`
- [✅] 2.3 Crear `/src/content/services/masajes.md`
- [✅] 2.4 Crear `/src/content/services/unas.md`
- [✅] 2.5 Crear `/src/content/services/faciales.md`
- [✅] 2.6 Crear `/src/content/services/especiales.md`
- [✅] 2.7 Actualizar contenido REAL de todos los servicios (precios, descripciones, tratamientos)
- [✅] 2.8 Actualizar datos de contacto reales (WhatsApp: 34681803858, Instagram: @amanibeauty_mg)

### FASE 3 — Componentes base
- [✅] 3.1 `Layout.astro` (head con SEO, fuentes, global.css, Schema.org)
- [✅] 3.2 `Nav.astro` (sticky, logo, anclas, dropdown servicios, toggle ES|EN)
- [✅] 3.3 `Footer.astro`
- [✅] 3.4 `ImagePlaceholder.astro` (prop: aspectRatio)
- [✅] 3.5 `WhatsAppButton.astro` (flotante, pulso CSS, SVG inline)

### FASE 4 — Secciones del Home
- [✅] 4.1 `Hero.astro` (logo, tagline bilingüe, placeholder grande, animation hook comentado)
- [✅] 4.2 `ServiceCard.astro` + `ServicesSection.astro` (4 cards alternadas)
- [✅] 4.3 `AboutSection.astro` (imagen placeholder + texto del .md)
- [✅] 4.4 `GalleryGrid.astro` (8 placeholders en grid)
- [✅] 4.5 `ContactSection.astro` (WhatsApp + Instagram)

### FASE 5 — Páginas
- [✅] 5.1 `pages/index.astro` → redirect a `/es/`
- [✅] 5.2 `pages/[lang]/index.astro` → Home completo con todas las secciones
- [✅] 5.3 `pages/[lang]/servicios/[slug].astro` → página de servicio individual
- [✅] 5.4 `pages/404.astro` → página 404 con estética del sitio

### FASE 6 — Componente de tratamiento
- [✅] 6.1 `TreatmentCard.astro` (imagen placeholder, nombre, descripción, duración, precio)

### FASE 7 — Verificación final
- [✅] 7.1 `npm run dev` sin errores
- [✅] 7.2 Todas las rutas funcionan (home ES/EN + 4 servicios × 2 idiomas)
- [✅] 7.3 Content Collections leyendo los .md correctamente
- [✅] 7.4 Toggle ES|EN funciona en todas las páginas
- [✅] 7.5 Responsive en móvil (375px), tablet (768px) y desktop (1280px)
- [✅] 7.6 `prefers-reduced-motion` respetado
- [✅] 7.7 `npm run build` sin errores

---

## 10. LO QUE NO HAY QUE HACER AÚN

- ❌ Animaciones de scroll/parallax (el hero tiene un hook comentado, nada más)
- ❌ Sistema de reservas real
- ❌ Formulario de contacto
- ❌ Imágenes reales (solo `ImagePlaceholder.astro`)
- ❌ Lightbox funcional en galería (solo estructura preparada)

## 10.5. CONTENIDO REAL IMPLEMENTADO

✅ Textos reales de servicios implementados
✅ Precios añadidos en todos los tratamientos
✅ Datos de contacto reales (WhatsApp: +34 681 80 38 58, Instagram: @amanibeauty_mg)
✅ 4 servicios completos:
   - Masajes: 8 tratamientos
   - Cuidado Facial: 6 tratamientos
   - Manicura y Pedicura: 5 tratamientos
   - Tratamientos Especiales: 7 tratamientos (NUEVO)

---

## 11. NOTAS IMPORTANTES

### Sitemap
El sitemap de Astro (@astrojs/sitemap) tiene un bug con rutas i18n dinámicas. Si necesitas sitemap, genera uno manualmente o usa una configuración custom.

### Estructura de contenido
- `/src/content/site/general.md` - Datos generales del negocio (WhatsApp: 34681803858, Instagram: @amanibeauty_mg)
- `/src/content/gallery/gallery.md` - Imágenes de la galería (moved from site/)
- `/src/content/services/*.md` - Servicios con treatments en el frontmatter
  - `masajes.md` - 8 tratamientos (Full Body, Relajante localizado, Descontracturante, etc.)
  - `faciales.md` - 6 tratamientos (Hidrafacial, Microneedling, etc.)
  - `unas.md` - 5 tratamientos (Manicura semipermanente, Pedicura, etc.)
  - `especiales.md` - 7 tratamientos (Rituales, Lifting de pestañas, Hydralips, etc.)

### Rutas generadas
- `/` → redirect a `/es/`
- `/es/` → Home en español
- `/en/` → Home en inglés
- `/es/servicios/masajes` → Página de masajes (ES)
- `/es/servicios/unas` → Página de uñas (ES)
- `/es/servicios/faciales` → Página de faciales (ES)
- `/es/servicios/especiales` → Página de tratamientos especiales (ES)
- `/en/services/massages` → Página de masajes (EN)
- `/en/services/nails` → Página de uñas (EN)
- `/en/services/facials` → Página de faciales (EN)
- `/en/services/specials` → Página de tratamientos especiales (EN)
- `/404` → Página de error personalizada

---

## 12. CÓMO RETOMAR EN UNA NUEVA SESIÓN

Cuando abras una nueva terminal/sesión, di exactamente esto a Claude Code:

```
Lee el archivo CLAUDE_HANDOFF.md que está en la raíz del proyecto.
Sigue las instrucciones del punto 0 y continúa por la primera tarea
sin ✅ en el planning de la sección 9.
```

---

*Documento generado para el proyecto Amani Beauty by María García*
*Actualiza las ✅ del planning conforme vayas completando tareas*
*PROYECTO COMPLETADO - Todos los deliverables listos*
