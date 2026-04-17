const mongoose = require('mongoose');

const stepSchema = new mongoose.Schema(
  {
    step_number: {
      type: Number,
      required: [true, 'Step number is required'],
      min: [1, 'Step number must be at least 1']
    },
    title: {
      type: String,
      required: [true, 'Step title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Step description is required'],
      trim: true
    },
    image_url: {
      type: String,
      trim: true,
      default: ''
    },
    recipe_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
      required: [true, 'Recipe ID is required']
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

stepSchema.index({ recipe_id: 1 });
stepSchema.index({ recipe_id: 1, step_number: 1 }, { unique: true });

module.exports = mongoose.model('Step', stepSchema);
