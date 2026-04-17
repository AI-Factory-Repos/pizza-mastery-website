const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const IMAGE_WIDTH = parseInt(process.env.IMAGE_WIDTH || '1200', 10);
const IMAGE_HEIGHT = parseInt(process.env.IMAGE_HEIGHT || '800', 10);
const IMAGE_QUALITY = parseInt(process.env.IMAGE_QUALITY || '85', 10);

/**
 * Optimizes an uploaded image: resizes and converts to webp.
 * Returns the path of the optimized file.
 * @param {string} inputPath - Absolute path to the original uploaded file
 * @returns {Promise<string>} - Absolute path to the optimized file
 */
async function optimizeImage(inputPath) {
  const dir = path.dirname(inputPath);
  const ext = path.extname(inputPath);
  const base = path.basename(inputPath, ext);
  const outputPath = path.join(dir, `${base}.webp`);

  await sharp(inputPath)
    .resize(IMAGE_WIDTH, IMAGE_HEIGHT, {
      fit: 'inside',
      withoutEnlargement: true
    })
    .webp({ quality: IMAGE_QUALITY })
    .toFile(outputPath);

  // Remove original if conversion produced a different file
  if (outputPath !== inputPath && fs.existsSync(inputPath)) {
    fs.unlinkSync(inputPath);
  }

  return outputPath;
}

/**
 * Builds the public-facing URL for an image filename.
 * @param {string} filename - Just the filename (e.g. abc123.webp)
 * @returns {string}
 */
function buildImageUrl(filename) {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  const uploadDir = process.env.UPLOAD_DIR || 'uploads';
  return `${baseUrl}/${uploadDir}/${filename}`;
}

module.exports = { optimizeImage, buildImageUrl };
