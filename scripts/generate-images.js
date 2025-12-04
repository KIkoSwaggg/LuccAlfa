/**
 * generate-images.js
 * - cerca immagini in assets/ (jpg/jpeg/png)
 * - genera versioni nelle larghezze sizes per webp e avif
 * - salva in assets/optimized/
 *
 * Usato da .github/workflows/image-optimizer.yml
 */
const fg = require('fast-glob');
const path = require('path');
const fs = require('fs/promises');
const sharp = require('sharp');

(async () => {
  try {
    const src = 'assets';
    const outDir = path.join('assets', 'optimized');
    await fs.mkdir(outDir, { recursive: true });

    // Configurazione: widths da generare (puoi modificarle)
    const sizes = [320, 640, 960, 1280];

    // Trova immagini (evita già ottimizzate e favicon)
    const entries = await fg(['assets/*.{jpg,jpeg,png}'], { ignore: ['assets/optimized/**', 'assets/favicon-*.*', 'assets/*.ico'] });

    for (const file of entries) {
      const ext = path.extname(file).toLowerCase();
      const base = path.basename(file, ext);
      const inPath = file;
      for (const w of sizes) {
        // webp
        const outWebp = path.join(outDir, `${base}-${w}.webp`);
        // avif
        const outAvif = path.join(outDir, `${base}-${w}.avif`);
        // If out exists skip (speeds up)
        try {
          await fs.stat(outWebp);
          console.log(`Exists ${outWebp}, skipping`);
        } catch {
          await sharp(inPath)
            .resize({ width: w, withoutEnlargement: true })
            .webp({ quality: 80 })
            .toFile(outWebp);
          console.log(`Generated ${outWebp}`);
        }
        try {
          await fs.stat(outAvif);
          console.log(`Exists ${outAvif}, skipping`);
        } catch {
          await sharp(inPath)
            .resize({ width: w, withoutEnlargement: true })
            .avif({ quality: 50 })
            .toFile(outAvif);
          console.log(`Generated ${outAvif}`);
        }
      }
    }

    console.log('Done generating images.');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
