const express = require('express');
const router = express.Router();
const path = require('path');
const { upload } = require('../config/upload');
const { optimizeImage, buildImageUrl } = require('../utils/imageProcessor');

// POST /api/upload
// Accepts a single image file under field name "image"
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided.' });
    }

    const originalPath = req.file.path;
    const optimizedPath = await optimizeImage(originalPath);
    const filename = path.basename(optimizedPath);
    const image_url = buildImageUrl(filename);

    return res.status(200).json({ image_url });
  } catch (err) {
    console.error('Upload error:', err);
    return res.status(500).json({ error: 'Image upload failed.', details: err.message });
  }
});

// Multer error handling middleware
router.use((err, req, res, next) => {
  if (err && err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ error: 'File too large.' });
  }
  if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
});

module.exports = router;
