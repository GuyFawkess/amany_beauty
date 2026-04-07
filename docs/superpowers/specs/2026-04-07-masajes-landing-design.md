# Landing Page Masajes - Design Spec

**Fecha:** 2026-04-07
**Proyecto:** Amani Beauty
**Tipo:** Nueva landing page de conversión
**Ruta:** `/landing-masajes`

---

## Resumen Ejecutivo

Landing page single-page diseñada siguiendo el modelo de conversión "Money Model" (atraer → convencer → eliminar objeciones → empujar a acción). Enfocada en captar clientes de masajes en Tías, Lanzarote, con un benefit principal de "recuperar energía y calma mental en 60 minutos".

**Objetivo:** Aumentar conversiones de reservas de masajes a través de WhatsApp.

---

## Enfoque de Diseño

**Seleccionado:** Landing Estilo Single-Page (Enfoque A)

- Página vertical continua con scroll suave
- Sticky header con CTA siempre visible
- Secciones fluidas sin fricción
- Mobile-first
- SEO amigable

**Por qué no los otros:**
- **B (Modal):** Demasiado intrusivo, Google penaliza
- **C (Dos pasos):** Añade fricción innecesaria

---

## Paleta de Colores y Tipografías

Uso de variables existentes del proyecto:

```css
/* Colores */
--color-cream: #F5F0E8        /* Fondos alternos */
--color-gold: #C9A96E         /* CTAs, acentos, estrellas */
--color-white-warm: #FDFAF5   /* Fondo principal, cards */
--color-gray-soft: #8A8A8A    /* Textos secundarios */
--color-text-dark: #2C2C2C    /* Texto principal */

/* Tipografías */
--font-serif: 'Cormorant Garamond'  /* Títulos H1-H6 */
--font-sans: 'Jost'                  /* Cuerpo de texto */
```

---

## Estructura de Secciones

### 1. HERO (100vh, sin scroll)

**Contenido:**
```
TÍTULO (H1):
"Recupera tu energía y calma mental en 60 minutos"

SUBTÍTULO:
"Masajes terapéuticos personalizados en Tías, Lanzarote 
para personas con estrés acumulado, ansiedad o agotamiento mental"

CTA PRINCIPAL:
[Botón grande --color-gold con icono WhatsApp]
"Reservar por WhatsApp"

CTA SECUNDARIO:
"Ver disponibilidad" → scroll a oferta
```

**Visual:**
- Fondo: Imagen real de masaje (no stock)
- Overlay oscuro para legibilidad
- Texto centrado, blanco
- Botón con efecto hover pulse

---

### 2. PROBLEMA → AGITACIÓN

**Contenido:**
```
TÍTULO (H2):
"¿Te sientes identificada?"

BULLETS:
• ¿Dolor de espalda o cuello constante?
• ¿Estrés acumulado que no te deja desconectar?
• ¿Duermes mal por tensión muscular?
• ¿Sientes que no recargas ni en tu tiempo libre?

AGITACIÓN:
"Si no lo tratas, solo va a empeorar. 
El estrés y la tensión muscular se acumulan, 
afectando tu salud, tu estado de ánimo y tu calidad de vida."

TRANSICIÓN:
"No tienes que seguir así."
```

**Visual:**
- Fondo: `--color-cream`
- Iconos en bullets
- Texto centrado

---

### 3. SOLUCIÓN

**Contenido:**
```
TÍTULO (H2):
"Un espacio diseñado para que realmente descanses"

SUBTÍTULO:
"Nuestros masajes no son relajación superficial. 
Son tratamientos personalizados que trabajan cuerpo y mente 
para que salgas renovada."

BENEFICIOS (3 columnas):
PERSONALIZADO          PROFESIONAL          RESULTADOS REALES
"Adaptamos cada        "Terapeutas          "Notas la diferencia
sesión a tus           certificados con      desde la primera
necesidades            experiencia          sesión. Sin trucos,
específicas"           contrastada"          solo resultados"
```

**Visual:**
- Grid 3 columnas (1 en móvil)
- Iconos/ilustraciones
- Fondo `--color-white-warm`
- Fotos del espacio intercaladas

---

### 4. OFERTA CLARA

**Contenido:**
```
TÍTULO (H2):
"Elige tu tratamiento"

SUBTÍTULO:
"Tres opciones diseñadas para diferentes necesidades. 
Todas con resultados reales desde la primera sesión."

3 TARJETAS (Cards):

┌─────────────────────────────┐
│ FULL BODY                   │
│ 55 minutos • 45€            │
│ ───────────────────────     │
│ • Relajación total          │
│ • Masaje de pies y cabeza   │
│ • Renovación cuerpo y mente │
│ [Reservar →]               │
└─────────────────────────────┘

┌─────────────────────────────┐
│ CRANEOFACIAL (destacado)    │
│ 40 minutos • 32€            │
│ ───────────────────────     │
│ • Libera tensión facial     │
│ • Desconecta mentalmente    │
│ • Sensación de renovación   │
│ [Reservar →]               │
└─────────────────────────────┘

┌─────────────────────────────┐
│ DESCONTRACTURANTE           │
│ 55 minutos • 47€            │
│ ───────────────────────     │
│ • Alivia contracturas       │
│ • Libera nudos profundos    │
│ • Mejora movilidad          │
│ [Reservar →]               │
└─────────────────────────────┘
```

**Visual:**
- Fondo: `--color-cream`
- Cards: `--color-white-warm` con `--shadow-md`
- Card central con borde `--color-gold`
- Imagen pequeña en cada card

---

### 5. PRUEBA SOCIAL

**Contenido:**
```
TÍTULO (H2):
"Lo que dicen quienes ya nos han visitado"

SUBTÍTULO:
"Valoración 4.9/5 en Google basada en 24 reseñas verificadas"

3-4 TESTIMONIOS:
★★★★★
"Llevaba meses con estrés acumulado y dolor de espalda. 
Después de una sesión de Full Body, noté la diferencia 
desde el primer día. Increíble."
— María G. • Hace 2 semanas

[2-3 reseñas más]

CREDENTIALS:
[Logo Google] "24 reseñas • 4.9/5 estrellas"
[Ver todas las reseñas en Google]
```

**Visual:**
- Fondo: `--color-white-warm`
- Cards con `--shadow-md`
- Estrellas en `--color-gold`

**Nota técnica:** Ver componente `GoogleReviews` para implementación.

---

### 6. ELIMINAR MIEDOS (FAQ)

**Contenido:**
```
TÍTULO (H2):
"Preguntas frecuentes"

ACORDEÓN:

▶ ¿Tengo que desvestirme?
  No es necesario. Puedes quedarte con la ropa 
  con la que te sientas cómoda.

▶ ¿Es profesional? ¿Tenéis certificaciones?
  Sí. Todos nuestros terapeutas están certificados 
  y tienen años de experiencia.

▶ ¿Tenéis aparcamiento fácil?
  Sí. Tienes aparcamiento gratuito muy cerca 
  del centro en Tías.

▶ ¿Qué hago si no puedo ir a mi cita?
  Avísanos por WhatsApp con 24h de antelación 
  y reagendamos sin coste.
```

**Visual:**
- Fondo: `--color-cream`
- Acordeón con animación
- Solo 1 abierto por vez

---

### 7. CTA FUERTE + URGENCIA

**Contenido:**
```
TÍTULO (H2):
"Reserva tu momento de descanso hoy"

SUBTÍTULO:
"Disponibilidad limitada esta semana. 
Agenda casi completa."

[Botón MUY grande --color-gold]
"RESERVAR POR WHATSAPP"

✓ Respuesta inmediata
✓ Sin compromiso
✓ Confirmación en el momento

📍 Tías, Lanzarote
🚗 Aparcamiento gratuito cercano
```

**Visual:**
- Fondo: `--color-white-warm`
- Botón con efecto pulse
- Mucho espacio blanco

---

### 8. CIERRE

**Contenido:**
```
TÍTULO (H2):
"No tienes que seguir con estrés y tensión"

BENEFICIO FINAL:
"En 60 minutos, recuperas tu energía y calma mental. 
Sin trucos, solo resultados reales."

[Botón --color-gold]
"RESERVAR AHORA"

"Últimas plazas disponibles esta semana"
```

**Visual:**
- Fondo: `--color-text-dark` (oscuro)
- Texto blanco
- Botón `--color-gold`
- Minimalista

---

### 9. FOOTER

```
© 2025 Amani Beauty • Tías, Lanzarote
[Instagram] [Google Maps]
```

---

## Componentes Técnicos Requeridos

### 1. StickyHeader
- Siempre visible en scroll
- Logo + CTA WhatsApp
- Compatible con nav existente

### 2. Hero con imagen de fondo
- Overlay oscuro
- Contenido centrado verticalmente
- Video opcional (como en Hero actual)

### 3. ScrollAnimations
- Fade-in elements al hacer scroll
- Smooth scroll entre secciones
- IntersectionObserver para performance

### 4. TreatmentCards
- 3 cards para los tratamientos estrella
- Hover effects
- Responsive grid

### 5. GoogleReviews
- **Opción A:** Google Places API (automático)
- **Opción B:** JSON manual (más simple)
- Renderiza estrellas, nombre, fecha, texto

### 6. FAQAccordion
- Solo un item abierto a la vez
- Animación suave de expandir/colapsar

### 7. WhatsAppButton
- Link dinámico con mensaje predefinido
- Icono de WhatsApp
- Pulse animation en CTA principal

---

## Responsiveness

**Mobile (< 768px):**
- Todas las secciones en columna única
- Hero padding ajustado
- Grids se apilan verticalmente
- Botones full-width en móvil

**Tablet (768px - 1024px):**
- Grids de 2 columnas
- Espaciado ajustado

**Desktop (> 1024px):**
- Grids de 3 columnas
- Max-width 1200px centrado
- Más espacio blanco

---

## Performance Considerations

- Lazy loading de imágenes
- Optimización de WebP para fotos
- CSS animations en lugar de JS cuando sea posible
- IntersectionObserver para scroll animations
- Mínimo de JavaScript necesario

---

## SEO Considerations

- Meta tags optimizados para "masajes Lanzarote", "masajes Tías"
- Structured data para local business
- Hierarchy H1 → H2 → H3 correcta
- Alt text en todas las imágenes
- Fast loading (Core Web Vitals)

---

## Internationalización

**Inicialmente:** Español solo

**Futuro:** Considerar versión en inglés para turistas.

---

## Próximos Pasos (Post-Design)

1. Crear plan de implementación detallado
2. Preparar assets (imágenes de tratamientos, fotos del espacio)
3. Configurar Google Reviews (API o manual)
4. Configurar link de WhatsApp Business
5. Implementar componentes en Astro
6. Testing en dispositivos reales
7. A/B testing de copy y CTAs

---

**Estatus del Design:** ✅ Aprobado por usuario
**Fecha de aprobación:** 2026-04-07
