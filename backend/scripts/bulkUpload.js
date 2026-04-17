/**
 * Admin utility for bulk image uploads.
 *
 * Usage:
 *   node scripts/bulkUpload.js <images-directory> [--recipe-id <id>] [--step-prefix <prefix>]
 *
 * Options:
 *   <images-directory>      Directory containing image files to upload (required)
 *   --recipe-id <id>        Associate uploaded images with a recipe (optional)
 *   --step-prefix <prefix>  Filter files by filename prefix (e.g. "step_") (optional)
 *
 * Example:
 *   node scripts/bulkUpload.js ./assets/recipe-images --recipe-id margherita-ny --step-prefix step_
 *
 * The utility will:
 *   1. Read all image files from the given directory
 *   2. Optimize each image (resize + convert to webp)
 *   3. Copy them into the uploads folder
 *   4. Print the resulting image_url for each file
 *   5. If --recipe-id is provided and matching Steps exist, update their image_url
 */

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const connectDB = require('../config/db');
const { optimizeImage, buildImageUrl } = require('../utils/imageProcessor');
const Step = require('../models/Step');

const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

function parseArgs(argv) {
  const args = argv.slice(2);
  const result = { dir: null, recipeId: null, stepPrefix: null };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--recipe-id' && args[i + 1]) {
      result.recipeId = args[++i];
    } else if (args[i] === '--step-prefix' && args[i + 1]) {
      result.stepPrefix = args[++i];
    } else if (!args[i].startsWith('--')) {
      result.dir = args[i];
    }
  }

  return result;
}

async function copyAndOptimize(srcPath, uploadPath) {
  const ext = path.extname(srcPath).toLowerCase() || '.jpg';
  const tempDest = path.join(uploadPath, `${uuidv4()}${ext}`);

  // Copy source to uploads dir first
  fs.copyFileSync(srcPath, tempDest);

  // Optimize (will replace with .webp)
  const optimizedPath = await optimizeImage(tempDest);
  return optimizedPath;
}

async function run() {
  const { dir, recipeId, stepPrefix } = parseArgs(process.argv);

  if (!dir) {
    console.error('Usage: node scripts/bulkUpload.js <images-directory> [--recipe-id <id>] [--step-prefix <prefix>]');
    process.exit(1);
  }

  const resolvedDir = path.resolve(dir);
  if (!fs.existsSync(resolvedDir)) {
    console.error(`Directory not found: ${resolvedDir}`);
    process.exit(1);
  }

  const UPLOAD_DIR = process.env.UPLOAD_DIR || 'uploads';
  const uploadPath = path.join(__dirname, '..', UPLOAD_DIR);
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  // Gather files
  let files = fs.readdirSync(resolvedDir).filter(f => {
    const ext = path.extname(f).toLowerCase();
    return SUPPORTED_EXTENSIONS.includes(ext);
  });

  if (stepPrefix) {
    files = files.filter(f => f.startsWith(stepPrefix));
  }

  if (files.length === 0) {
    console.log('No matching image files found.');
    process.exit(0);
  }

  console.log(`Found ${files.length} image(s) to process.\n`);

  // Connect to DB only if we need to update Steps
  let dbConnected = false;
  if (recipeId) {
    await connectDB();
    dbConnected = true;
  }

  const results = [];

  for (const file of files) {
    const srcPath = path.join(resolvedDir, file);
    try {
      const optimizedPath = await copyAndOptimize(srcPath, uploadPath);
      const filename = path.basename(optimizedPath);
      const image_url = buildImageUrl(filename);
      results.push({ file, image_url, optimizedPath });
      console.log(`✓ ${file} → ${image_url}`);
    } catch (err) {
      console.error(`✗ ${file}: ${err.message}`);
    }
  }

  // Optionally update Step records
  if (recipeId && dbConnected && results.length > 0) {
    console.log(`\nUpdating steps for recipe_id: ${recipeId}`);

    // Fetch steps sorted by step_number
    const steps = await Step.find({ recipe_id: recipeId }).sort({ step_number: 1 });

    if (steps.length === 0) {
      console.log('No steps found for this recipe_id.');
    } else {
      for (let i = 0; i < results.length && i < steps.length; i++) {
        const step = steps[i];
        const { image_url } = results[i];

        // Set primary image_url and append to images array
        step.image_url = image_url;
        if (!step.images) step.images = [];
        const alreadyExists = step.images.some(img => img.url === image_url);
        if (!alreadyExists) {
          step.images.push({ url: image_url, caption: '' });
        }
        await step.save();
        console.log(`  Updated Step #${step.step_number} with ${image_url}`);
      }

      if (results.length > steps.length) {
        console.log(`  Note: ${results.length - steps.length} image(s) were not assigned (more images than steps).`);
      }
    }
  }

  console.log('\nBulk upload complete.');

  if (dbConnected) {
    process.exit(0);
  }
}

run().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
