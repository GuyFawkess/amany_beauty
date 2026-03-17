import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';

const execAsync = promisify(exec);

/**
 * Script para generar sprite sheet a partir de un video
 *
 * Uso: node scripts/generate-sprites.js
 *
 * Requisitos:
 * - FFmpeg instalado (https://ffmpeg.org/download.html)
 * - Video en public/videoHero.mp4
 */

const CONFIG = {
  inputVideo: 'public/videoHero.mp4',
  outputDir: 'public/sprites',
  frameRate: 12, // FPS para el sprite (menos = más liviano pero menos suave)
  framesPerRow: 6,
  frameWidth: 640,
  frameHeight: 360,
  maxFrames: 61, // Límite máximo de frames (122 frames / 2 = 61)
  ffmpegPath: 'C:\\Users\\Usuario\\AppData\\Local\\Temp\\ffmpeg-master-latest-win64-gpl\\bin\\ffmpeg.exe',
  ffprobePath: 'C:\\Users\\Usuario\\AppData\\Local\\Temp\\ffmpeg-master-latest-win64-gpl\\bin\\ffprobe.exe',
  singleImage: false, // Generar sprite sheet con múltiples frames
};

async function createOutputDir() {
  const spritesDir = path.join(process.cwd(), CONFIG.outputDir);

  if (fs.existsSync(spritesDir)) {
    console.log('📁 Limpiando directorio de sprites existente...');
    fs.rmSync(spritesDir, { recursive: true });
  }

  fs.mkdirSync(spritesDir, { recursive: true });
  console.log('✅ Directorio de sprites creado:', spritesDir);

  return spritesDir;
}

async function getVideoDuration() {
  try {
    const { stdout } = await execAsync(
      `"${CONFIG.ffprobePath}" -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${CONFIG.inputVideo}"`
    );
    return parseFloat(stdout.trim());
  } catch (error) {
    console.error('❌ Error obteniendo duración del video:', error.message);
    throw error;
  }
}

async function extractAndCountFrames() {
  console.log('🎬 Calculando frames del video...');

  const duration = await getVideoDuration();
  const totalFrames = Math.min(
    Math.floor(duration * CONFIG.frameRate),
    CONFIG.maxFrames
  );

  console.log(`📊 Video duración: ${duration.toFixed(2)}s`);
  console.log(`🖼️  Total frames a generar: ${totalFrames}`);

  return totalFrames;
}

async function generateSpriteSheet(outputDir, totalFrames) {
  console.log('🎨 Generando sprite sheet...');

  const manifest = {
    totalFrames: 60,
    frameWidth: CONFIG.frameWidth,
    frameHeight: CONFIG.frameHeight,
    framesPerRow: CONFIG.framesPerRow,
    sheets: [],
  };

  const videoFps = 24;
  const frameInterval = Math.round(videoFps / CONFIG.frameRate);
  const framesToExtract = 60;

  console.log(`🎬 Extrayendo ${framesToExtract} frames con select filter...`);

  // Extraer frames usando select, renombrando para que empiecen en 0001
  const outputPattern = path.join(outputDir, 'frame_%04d.jpg');
  const selectFilter = `select='not(mod(n,${frameInterval}))'`;

  // Extraer frames y limitar a exactamente 60
  const extractCommand = `"${CONFIG.ffmpegPath}" -i "${CONFIG.inputVideo}" -vf "${selectFilter},scale=${CONFIG.frameWidth}:${CONFIG.frameHeight}" -vsync vfr -q:v 2 "${outputPattern}"`;

  try {
    await execAsync(extractCommand);

    const extractedFiles = fs.readdirSync(outputDir)
      .filter(f => f.startsWith('frame_') && f.endsWith('.jpg'))
      .sort();

    console.log(`✅ Frames extraídos: ${extractedFiles.length}`);

    // Tomar solo los primeros 60 frames y renombrarlos consecutivamente
    const framesToUse = extractedFiles.slice(0, framesToExtract);

    // Renombrar frames secuencialmente
    framesToUse.forEach((file, index) => {
      const newNum = String(index + 1).padStart(4, '0');
      const newPath = path.join(outputDir, `f_${newNum}.jpg`);
      const oldPath = path.join(outputDir, file);
      fs.renameSync(oldPath, newPath);
    });

    // Eliminar frames sobrantes si hay más de 60
    extractedFiles.slice(framesToExtract).forEach(file => {
      fs.unlinkSync(path.join(outputDir, file));
    });

    console.log(`✅ Frames renombrados consecutivamente (1-${framesToUse.length})`);

  } catch (error) {
    console.error('❌ Error extrayendo frames:', error.message);
    throw error;
  }

  // Generar sprite sheet único con 60 frames (6x10)
  const spriteFileName = 'sprite_0.jpg';
  const outputPath = path.join(outputDir, spriteFileName);
  const inputPattern = path.join(outputDir, 'f_%04d.jpg');
  const rows = 10;

  console.log(`📄 Generando sprite sheet con 60 frames (6x10 grid)...`);

  const command = `"${CONFIG.ffmpegPath}" -framerate 1 -i "${inputPattern}" -frames:v 60 -vf "scale=${CONFIG.frameWidth}:${CONFIG.frameHeight},tile=${CONFIG.framesPerRow}x${rows}" -update 1 -q:v 2 "${outputPath}"`;

  try {
    await execAsync(command);
    console.log('✅ Sprite sheet generado');

    manifest.sheets.push({
      file: spriteFileName,
      startFrame: 1,
      endFrame: 60,
      frames: 60,
    });

  } catch (error) {
    console.error('❌ Error generando sprite sheet:', error.message);
    throw error;
  }

  // Limpiar frames individuales
  console.log('🧹 Limpiando frames individuales...');
  const cleanupFiles = fs.readdirSync(outputDir);
  cleanupFiles.forEach(file => {
    if ((file.startsWith('frame_') || file.startsWith('f_')) && file.endsWith('.jpg')) {
      fs.unlinkSync(path.join(outputDir, file));
    }
  });

  // Guardar manifest
  const manifestPath = path.join(outputDir, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log('✅ Manifest guardado:', manifestPath);

  console.log('🎉 ¡Sprite sheet generado exitosamente!');
  console.log('\n📊 Resumen:');
  console.log(`   - Total frames: 60`);
  console.log(`   - Sprite sheets: 1`);
  console.log(`   - Resolución: ${CONFIG.frameWidth}x${CONFIG.frameHeight}px`);
  console.log(`   - Frame rate: ${CONFIG.frameRate} FPS`);
}

async function main() {
  console.log('🚀 Iniciando generación de sprite sheet...\n');

  try {
    // Verificar que el video existe
    if (!fs.existsSync(CONFIG.inputVideo)) {
      throw new Error(`No se encontró el video: ${CONFIG.inputVideo}`);
    }

    const outputDir = await createOutputDir();
    const totalFrames = await extractAndCountFrames();
    await generateSpriteSheet(outputDir, totalFrames);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('\n📋 Asegúrate de tener FFmpeg instalado: https://ffmpeg.org/download.html');
    process.exit(1);
  }
}

main();
