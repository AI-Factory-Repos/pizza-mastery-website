const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    caption: { type: String, default: '' }
  },
  { _id: false }
);

const stepSchema = new mongoose.Schema(
  {
    step_number: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    // Primary image URL (kept for backward compatibility and API contract)
    image_url: { type: String, default: '' },
    // Additional images per step
    images: { type: [imageSchema], default: [] },
    recipe_id: { type: String, required: true }
  },
  { timestamps: true }
);

stepSchema.index({ recipe_id: 1, step_number: 1 });

module.exports = mongoose.model('Step', stepSchema);
