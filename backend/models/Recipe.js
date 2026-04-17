const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    amount: { type: String, required: true, trim: true },
    unit: { type: String, required: true, trim: true }
  },
  { _id: false }
);

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Recipe name is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true
    },
    pizza_type: {
      type: String,
      required: [true, 'Pizza type is required'],
      enum: ['Margherita', 'Pepperoni', 'BBQ Chicken'],
      trim: true
    },
    style: {
      type: String,
      required: [true, 'Style is required'],
      enum: ['NY-style', 'Deep Dish'],
      trim: true
    },
    prep_time: {
      type: Number,
      required: [true, 'Prep time is required'],
      min: [0, 'Prep time cannot be negative']
    },
    cook_time: {
      type: Number,
      required: [true, 'Cook time is required'],
      min: [0, 'Cook time cannot be negative']
    },
    difficulty: {
      type: String,
      required: [true, 'Difficulty is required'],
      enum: ['Easy', 'Medium', 'Hard'],
      trim: true
    },
    image_url: {
      type: String,
      trim: true,
      default: ''
    },
    ingredients: {
      type: [ingredientSchema],
      default: []
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

recipeSchema.index({ pizza_type: 1 });
recipeSchema.index({ style: 1 });
recipeSchema.index({ pizza_type: 1, style: 1 });
recipeSchema.index({ difficulty: 1 });

module.exports = mongoose.model('Recipe', recipeSchema);
