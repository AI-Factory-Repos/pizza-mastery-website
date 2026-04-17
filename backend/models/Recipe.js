const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    amount: { type: String, required: true },
    unit: { type: String, default: '' }
  },
  { _id: false }
);

const recipeSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, default: '' },
    pizza_type: { type: String, required: true },
    style: { type: String, required: true },
    prep_time: { type: Number, required: true },
    cook_time: { type: Number, required: true },
    difficulty: { type: String, required: true },
    // Primary listing image
    image_url: { type: String, default: '' },
    ingredients: { type: [ingredientSchema], default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Recipe', recipeSchema);
