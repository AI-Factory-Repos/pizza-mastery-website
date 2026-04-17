const mongoose = require('mongoose');

const StepSchema = new mongoose.Schema({
  step_number: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image_url: { type: String, default: '' },
  recipe_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Step', StepSchema);
