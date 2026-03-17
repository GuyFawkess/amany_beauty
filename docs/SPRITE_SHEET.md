# Sprite Sheet para Video Hero

## ¿Por qué usar Sprite Sheet?

El sprite sheet ofrece un rendimiento **mucho mejor** que manipular `video.currentTime` directamente:

- **Sin lag**: Cambiar `background-position` es casi instantáneo vs decodificar frames de video
- **60fps fluidos**: El scroll se siente suave como la seda
- **Menor uso de CPU/GPU**: Las imágenes ya están decodificadas
- **Mejor experiencia de usuario**: Transiciones instantáneas sin tirones

## Instrucciones

### 1. Instalar FFmpeg

FFmpeg es necesario para convertir el video en imágenes.

**Windows:**
```bash
# Con Chocolatey (recomendado)
choco install ffmpeg

# O descarga desde: https://ffmpeg.org/download.html
```

**Verificar instalación:**
```bash
ffmpeg -version
```

### 2. Generar el Sprite Sheet

Cada vez que cambies el video, ejecuta:

```bash
npm run generate-sprites
```

Esto creará:
- `public/sprites/` - Directorio con los sprites
- `public/sprites/sprite_0.jpg`, `sprite_1.jpg`, etc. - Imágenes del sprite sheet
- `public/sprites/manifest.json` - Metadata del sprite

### 3. Configuración

Puedes ajustar la calidad/tamaño en `scripts/generate-sprites.js`:

```javascript
const CONFIG = {
  inputVideo: 'public/videoHero.mp4',
  frameRate: 12,        // FPS (menos = más liviano, menos suave)
  frameWidth: 640,      // Ancho del frame
  frameHeight: 360,     // Alto del frame
  maxFrames: 200,       // Límite de frames
  framesPerRow: 6,      // Frames por fila en el sprite
};
```

**Trade-offs:**
- **frameRate alto (24-30)**: Más suave, archivo más grande
- **frameRate bajo (8-12)**: Menos suave, archivo más pequeño
- **Resolución alta**: Mejor calidad, más peso
- **Resolución baja**: Peor calidad, menos peso

### 4. Flujo de trabajo con nuevo video

Cuando tengas el video definitivo:

1. **Reemplaza** `public/videoHero.mp4` con tu nuevo video
2. **Ejecuta** `npm run generate-sprites`
3. **Deploy** - Los sprites se generan automáticamente

**¡Eso es todo!** El sistema usa automáticamente:
- **Desktop**: Sprite sheet para scroll
- **Móvil**: Video con autoplay

## Estructura de archivos

```
public/
├── videoHero.mp4        # Video original (usado en móvil)
├── videoHero.webm       # Fallback para navegadores modernos
├── video-poster.jpg     # Imagen de fallback
└── sprites/
    ├── manifest.json    # Metadata del sprite
    ├── sprite_0.jpg     # Primera hoja de sprites
    ├── sprite_1.jpg     # Segunda hoja (si hay muchos frames)
    └── ...

scripts/
└── generate-sprites.js  # Script de generación
```

## Troubleshooting

### Error: "FFmpeg no encontrado"

Instala FFmpeg siguiendo las instrucciones arriba.

### El scroll se ve cortado

- Verifica que `manifest.json` existe en `public/sprites/`
- Revisa la consola del navegador por errores de carga
- Asegúrate de ejecutar `npm run generate-sprites`

### El sprite sheet es muy grande

Reduce estos valores en `scripts/generate-sprites.js`:
- `frameRate`: De 12 a 8
- `frameWidth/frameHeight`: De 640x360 a 480x270
- `maxFrames`: De 200 a 100

### El video en móvil no funciona

El sistema usa video real en móvil, asegúrate de que:
- `public/videoHero.mp4` existe
- El formato es compatible (MP4 H.264)

## Rendimiento

**Comparación aproximada:**

| Método | FPS | CPU | GPU | Suavidad |
|--------|-----|-----|-----|----------|
| video.currentTime | 15-25 | Alto | Alto | Laggy ❌ |
| Sprite Sheet | 60 | Bajo | Bajo | Fluido ✅ |

El sprite sheet es la técnica usada por sitios como Apple para sus landing pages con video scroll.
