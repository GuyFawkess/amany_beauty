# Requisitos Faltantes - Amani Beauty

Este documento detalla todo lo que falta para completar la página web de Amani Beauty. El proyecto está funcionalmente completo, pero necesita contenido real (imágenes, textos y datos de contacto).

---

## 📊 Resumen Ejecutivo

- **Total de imágenes necesarias:** 22 imágenes
- **Textos a personalizar:** 3 servicios + datos de contacto
- **Información de contacto:** WhatsApp e Instagram
- **Logo:** Ya existe (`/public/logo.png`)

---

## 🖼️ IMÁGENES NECESARIAS

### 1. Logo
- ✅ **EXISTE:** `/public/logo.png` (962 KB)
- **Estado:** Ya subido
- **Nota:** Si se quiere cambiar, reemplazar el archivo manteniendo el mismo nombre

---

### 2. Imágenes de Servicios (18 imágenes)

#### 2.1. Servicio de Masajes (4 imágenes)
Ubicación: `/public/images/services/masajes/`

| Archivo | Uso | Dimensiones Sugeridas | Formato | Descripción |
|---------|-----|----------------------|---------|-------------|
| `cover.jpg` | Imagen principal de la página de masajes | 1920x1080px (16:9) | JPG | Imagen hero que representa el servicio de masajes en general |
| `relajante.jpg` | Masaje Relajante (60 min) | 800x600px (4:3) | JPG | Foto de un masaje relajante en acción |
| `descontracturante.jpg` | Masaje Descontracturante (75 min) | 800x600px (4:3) | JPG | Imagen de masaje terapéutico/profundidad |
| `piedras.jpg` | Masaje con Piedras Calientes (90 min) | 800x600px (4:3) | JPG | Piedras volcánicas calientes sobre la piel |

**Total masajes:** 4 imágenes

---

#### 2.2. Servicio de Uñas (5 imágenes)
Ubicación: `/public/images/services/unas/`

| Archivo | Uso | Dimensiones Sugeridas | Formato | Descripción |
|---------|-----|----------------------|---------|-------------|
| `cover.jpg` | Imagen principal de la página de uñas | 1920x1080px (16:9) | JPG | Imagen hero que representa el servicio de uñas |
| `manicura-clasica.jpg` | Manicura Clásica (45 min) | 800x600px (4:3) | JPG | Manos con manicura clásica elegante |
| `semipermanente.jpg` | Manicura Semipermanente (60 min) | 800x600px (4:3) | JPG | Uñas con esmaltado semipermanente |
| `pedicura.jpg` | Pedicura Spa (75 min) | 800x600px (4:3) | JPG | Tratamiento de pedicura en spa |
| `gel.jpg` | Uñas de Gel (90 min) | 800x600px (4:3) | JPG | Uñas de gel extensión con diseño |

**Total uñas:** 5 imágenes

---

#### 2.3. Servicio de Tratamientos Faciales (4 imágenes)
Ubicación: `/public/images/services/faciales/`

| Archivo | Uso | Dimensiones Sugeridas | Formato | Descripción |
|---------|-----|----------------------|---------|-------------|
| `cover.jpg` | Imagen principal de la página facial | 1920x1080px (16:9) | JPG | Imagen hero que representa tratamientos faciales |
| `limpieza.jpg` | Limpieza Facial Profunda (60 min) | 800x600px (4:3) | JPG | Proceso de limpieza facial profesional |
| `hidratacion.jpg` | Hidratación Intensiva (75 min) | 800x600px (4:3) | JPG | Tratamiento hidratante facial |
| `anti-edad.jpg` | Tratamiento Anti-Edad (90 min) | 800x600px (4:3) | JPG | Tratamiento facial anti-edad/antiarrugas |

**Total faciales:** 4 imágenes

---

### 3. Galería del Home (8 imágenes)
Ubicación: `/public/images/gallery/`

| Archivo | Alt ES | Alt EN | Dimensiones Sugeridas | Formato |
|---------|--------|--------|----------------------|---------|
| `gallery-1.jpg` | Tratamiento facial profesional | Professional facial treatment | 1200x800px (3:2) | JPG |
| `gallery-2.jpg` | Sala de masajes | Massage room | 1200x800px (3:2) | JPG |
| `gallery-3.jpg` | Manicura elegante | Elegant manicure | 1200x800px (3:2) | JPG |
| `gallery-4.jpg` | Producto de belleza | Beauty product | 1200x800px (3:2) | JPG |
| `gallery-5.jpg` | Tratamiento de uñas | Nail treatment | 1200x800px (3:2) | JPG |
| `gallery-6.jpg` | Ambiente relajante | Relaxing atmosphere | 1200x800px (3:2) | JPG |
| `gallery-7.jpg` | Mascarilla facial | Face mask | 1200x800px (3:2) | JPG |
| `gallery-8.jpg` | Detalle de tratamiento | Treatment detail | 1200x800px (3:2) | JPG |

**Total galería:** 8 imágenes

---

### 4. Imagen Hero del Home
Ubicación: Se usa `ImagePlaceholder.astro` con aspect ratio 16:9

**Estado:** Actualmente es un placeholder

**Opciones:**
- **Opción A:** Crear una imagen hero específica para el home
  - Ubicación sugerida: `/public/images/hero.jpg`
  - Dimensiones: 1920x1080px (16:9)
  - Modificar `Hero.astro` línea 25 para usar esta imagen

- **Opción B:** Mantener el placeholder y no añadir imagen hero
  - El diseño actual funciona bien sin imagen

---

### 5. Imagen "Sobre Mí"
Ubicación: Se usa `ImagePlaceholder.astro` con aspect ratio 3:4

**Estado:** Actualmente es un placeholder

**Necesaria:** Foto de María García (propietaria)
- Ubicación sugerida: `/public/images/about.jpg`
- Dimensiones: 600x800px (3:4) o similar vertical
- Modificar `AboutSection.astro` línea 21 para usar esta imagen

---

## 📝 TEXTO Y CONTENIDO

### 1. Datos de Contacto (CRÍTICO)
Archivo: `/src/content/site/general.md`

**Datos actuales:**
```yaml
whatsapp: "+34 000 000 000"
instagram: "@amanibeauty"
location: ""
```

**Qué cambiar:**
- ✏️ `whatsapp`: Número de WhatsApp real con código de país
- ✏️ `instagram`: Usuario real de Instagram (con o sin @)
- ✏️ `location`: Dirección del local o área de servicio (opcional)

---

### 2. Textos de Servicios
Archivos: `/src/content/services/*.md`

**Estado actual:** Los textos están completos y bien redactados. **NO es necesario cambiarlos** a menos que se quiera personalizar más.

**Si se desea modificar:**
- `masajes.md` - Líneas 32-37: Texto introductorio del servicio
- `unas.md` - Líneas 40-44: Texto introductorio del servicio
- `faciales.md` - Líneas 33-37: Texto introductorio del servicio

**Nota:** Los textos de los tratamientos individuales dentro de cada servicio ya tienen descripciones completas.

---

### 3. Texto "Sobre Mí"
Archivo: `/src/content/site/general.md`

**Datos actuales:**
```yaml
about: "Soy María García, fundadora de Amani Beauty. Con más de 10 años de experiencia en el sector de la estética, mi misión es ayudarte a sentirte bien contigo misma..."
about_en: "I am María García, founder of Amani Beauty. With over 10 years of experience..."
```

**Estado:** Texto completo y bien redactado. **Solo cambiar si se quiere personalizar más.**

---

### 4. Precios de Tratamientos
Archivos: `/src/content/services/*.md`

**Estado actual:** Todos los campos `price:` están vacíos

**Qué hacer:**
- Añadir precios en cada tratamiento si se desea mostrarlos
- Formato sugerido: `"50€"`, `"Desde 45€"`, `"Consultar"` etc.
- Si no se quieren mostrar precios, dejar vacío (ya está así)

**Dónde añadir:**
- `masajes.md` - Líneas 15, 22, 29 (campo `price`)
- `unas.md` - Líneas 15, 22, 29, 36 (campo `price`)
- `faciales.md` - Líneas 15, 22, 29 (campo `price`)

---

## 🎨 ESPECIFICACIONES TÉCNICAS DE IMÁGENES

### Formato
- **Principal:** JPG con compresión web (80-85% calidad)
- **Alternativo:** WebP para mejor rendimiento (opcional)

### Dimensiones Recomendadas
| Tipo de Imagen | Dimensiones | Aspect Ratio | Peso Máximo |
|----------------|-------------|--------------|-------------|
| Cover/Hero de servicio | 1920x1080px | 16:9 | 300 KB |
| Tratamientos individuales | 800x600px | 4:3 | 150 KB |
| Galería | 1200x800px | 3:2 | 200 KB |
| Foto "Sobre mí" | 600x800px | 3:4 | 150 KB |
| Logo | Ancho 200-400px | Variable | 50 KB |

### Optimización
Todas las imágenes deben estar:
- ✅ Comprimidas para web (usar TinyPNG, Squoosh, o similar)
- ✅ Sin metadatos EXIF innecesarios
- ✅ En resolución adecuada (no más de 1920px de ancho)
- ✅ Formato JPG progresivo para carga gradual

---

## 📋 CHECKLIST DE IMPLEMENTACIÓN

### Fase 1: Información de Contacto (PRIORIDAD ALTA)
- [ ] Actualizar número de WhatsApp real en `general.md`
- [ ] Actualizar usuario de Instagram real en `general.md`
- [ ] Añadir ubicación/localidad si se desea

### Fase 2: Imágenes de Servicios
- [ ] Crear carpeta `/public/images/services/masajes/`
- [ ] Subir `cover.jpg` de masajes
- [ ] Subir `relajante.jpg`, `descontracturante.jpg`, `piedras.jpg`
- [ ] Crear carpeta `/public/images/services/unas/`
- [ ] Subir `cover.jpg` de uñas
- [ ] Subir las 4 imágenes de tratamientos de uñas
- [ ] Crear carpeta `/public/images/services/faciales/`
- [ ] Subir `cover.jpg` de faciales
- [ ] Subir `limpieza.jpg`, `hidratacion.jpg`, `anti-edad.jpg`

### Fase 3: Galería del Home
- [ ] Crear carpeta `/public/images/gallery/`
- [ ] Subir las 8 imágenes de galería (gallery-1.jpg a gallery-8.jpg)
- [ ] Verificar que los textos alternativos coinciden con el contenido

### Fase 4: Imágenes del Home
- [ ] Decidir si añadir imagen hero o mantener placeholder
- [ ] Si se añade: subir a `/public/images/hero.jpg` y modificar `Hero.astro`
- [ ] Subir foto de María García a `/public/images/about.jpg`
- [ ] Modificar `AboutSection.astro` para usar la imagen real

### Fase 5: Precios (OPCIONAL)
- [ ] Decidir si mostrar precios o no
- [ ] Si se muestran: añadir en cada tratamiento en los archivos .md

---

## 🔧 CÓMO AÑADIR LAS IMÁGENES

### Método 1: Copiar directamente a la carpeta
1. Crear las carpetas necesarias:
   ```bash
   mkdir -p public/images/services/masajes
   mkdir -p public/images/services/unas
   mkdir -p public/images/services/faciales
   mkdir -p public/images/gallery
   ```

2. Copiar las imágenes optimizadas a sus carpetas correspondientes

### Método 2: Dejar que el placeholder siga funcionando
Si no tienes las imágenes aún, el sitio funciona perfectamente con los placeholders. Los placeholders muestran: *"— imagen próximamente —"*

---

## 🚀 VERIFICACIÓN FINAL

Una vez añadidas las imágenes:

1. **Ejecutar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

2. **Verificar en el navegador:**
   - [ ] Home en español: `http://localhost:4321/es/`
   - [ ] Home en inglés: `http://localhost:4321/en/`
   - [ ] Página de masajes ES: `http://localhost:4321/es/servicios/masajes`
   - [ ] Página de uñas ES: `http://localhost:4321/es/servicios/unas`
   - [ ] Página de faciales ES: `http://localhost:4321/es/servicios/faciales`
   - [ ] Lo mismo en inglés cambiando `/es/` por `/en/`
   - [ ] Verificar que todas las imágenes cargan correctamente
   - [ ] Verificar que el botón de WhatsApp funciona

3. **Construir para producción:**
   ```bash
   npm run build
   ```

4. **Verificar la carpeta dist:**
   ```bash
   npm run preview
   ```

---

## 📞 INFORMACIÓN DE CONTACTO ACTUAL

```yaml
Nombre del negocio: Amani Beauty
Nombre completo: Amani Beauty by María García
WhatsApp: +34 000 000 000 ← CAMBIAR
Instagram: @amanibeauty ← CAMBIAR
Ubicación: (vacío) ← OPCIONAL
```

---

## 🎯 PRIORIDADES RECOMENDADAS

### 🔴 Crítico (hacer primero)
1. Número de WhatsApp real
2. Usuario de Instagram real

### 🟡 Importante (hacer segundo)
3. Imágenes de servicios (covers de cada categoría)
4. Imágenes de tratamientos individuales
5. Foto de "Sobre mí"

### 🟢 Deseable (hacer tercero)
6. Galería del home
7. Imagen hero del home
8. Precios de tratamientos

---

## ✅ RESUMEN FINAL

**El proyecto está funcionalmente completo.** Todas las secciones, páginas, navegación, y funcionalidades están implementadas y funcionando. Solo falta:

1. **22 imágenes** (18 de servicios + 8 de galería + 1 hero opcional + 1 about)
2. **Datos de contacto reales** (WhatsApp e Instagram)
3. **Precios** (opcional, solo si se quieren mostrar)

La página web se puede lanzar funcionalmente con solo cambiar los datos de contacto. Las imágenes se pueden ir añadiendo gradualmente.

---

*Documento generado el 15 de marzo de 2026*
*Proyecto: Amani Beauty by María García*
*Estado: Funcionalmente completo, esperando contenido real*
