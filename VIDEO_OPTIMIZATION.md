# Optimización de Video para Hero Section

## Problema Actual
El video `videoHero.mp4` pesa **10MB**, lo cual es demasiado para una experiencia fluida en scroll-driven animations.

## Soluciones Recomendadas

### 1. Comprimir el Video
Usa herramientas como:
- **HandBrake** (gratis): Reduce tamaño manteniendo calidad
- **FFmpeg**: Para compresión avanzada
- **Online compressors**: Clideo, CloudConvert

Comandos FFmpeg recomendados:
```bash
# Reducir calidad a 5MB máximo
ffmpeg -i videoHero.mp4 -vcodec libx264 -crf 28 -preset medium -movflags +faststart videoHero-compressed.mp4

# Versión más ligera para móviles (2-3MB)
ffmpeg -i videoHero.mp4 -vcodec libx264 -crf 32 -preset fast -vf "scale=1280:-1" -movflags +faststart videoHero-mobile.mp4
```

### 2. Usar Formatos Modernos
- **WebM (VP9)**: 30-50% más pequeño que MP4
- **AV1**: El codec más eficiente, pero menos compatible

```bash
# Convertir a WebM
ffmpeg -i videoHero.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus videoHero.webm
```

### 3. Implementar Video Responsive
En `Hero.astro`, cambiar la etiqueta video a:
```html
<video id="heroVideo" playsinline muted preload="auto" poster="/video-poster.jpg">
  <source src="/videoHero.webm" type="video/webm">
  <source src="/videoHero-compressed.mp4" type="video/mp4">
  <!-- Fallback para navegadores antiguos -->
  <img src="/video-poster.jpg" alt="Hero background">
</video>
```

### 4. Optimizar Tiempo de Video
- Ideal: **10-15 segundos** máximo
- Frame rate: **24-30fps** (no 60fps)
- Resolución: **720p-1080p** (no 4K)

### 5. Lazy Loading Inteligente
Agregar en el JavaScript:
```javascript
// Cargar video solo cuando esté en viewport
const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      videoEl.load();
      videoObserver.unobserve(entry.target);
    }
  });
}, { rootMargin: '50px' });

videoObserver.observe(heroEl);
```

### 6. Usar CDN para Video
Considera usar:
- **Cloudinary**: Optimización automática
- **Bunny.net**: CDN con optimización de video
- **Vimeo/YouTube**: Embeds optimizados

### 7. Implementar Quality Switching
Basado en la conexión del usuario:
```javascript
const videoSources = {
  fast: '/videoHero-1080p.mp4',
  medium: '/videoHero-720p.mp4',
  slow: '/videoHero-480p.jpg' // Fallback a imagen
};

const connection = navigator.connection;
const source = connection?.effectiveType.includes('4g')
  ? videoSources.fast
  : videoSources.medium;

videoEl.src = source;
```

## Configuración Óptima
- **Tamaño máximo**: 3-5MB
- **Duración**: 10-15 segundos
- **FPS**: 24
- **Resolución**: 1280x720 (720p)
- **Codec**: H.264 (MP4) + VP9 (WebM)
- **Bitrate**: 1.5-2Mbps

## Pasos Inmediatos
1. Comprime el video actual a <5MB
2. Crea una versión WebM
3. Añade poster image
4. Implementa responsive sources
5. Prueba en diferentes conexiones

## Herramientas de Monitoreo
En el código JavaScript ya añadí:
- Monitoreo de frame drops
- Detección de conexión lenta
- Fallback a imagen estática
- Logs de debug para problemas de rendimiento

Con estas optimizaciones, el video debería ser mucho más fluido en el scroll.