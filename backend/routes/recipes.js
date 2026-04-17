const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const Step = require('../models/Step');

// GET /api/recipes
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.pizza_type) filter.pizza_type = req.query.pizza_type;
    if (req.query.style) filter.style = req.query.style;

    const recipes = await Recipe.find(filter).select('name pizza_type style prep_time cook_time difficulty image_url');
    const result = recipes.map(r => ({
      id: r._id,
      name: r.name,
      pizza_type: r.pizza_type,
      style: r.style,
      prep_time: r.prep_time,
      cook_time: r.cook_time,
      difficulty: r.difficulty,
      image_url: r.image_url,
    }));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/recipes/:id
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    res.json({
      id: recipe._id,
      name: recipe.name,
      description: recipe.description,
      pizza_type: recipe.pizza_type,
      style: recipe.style,
      prep_time: recipe.prep_time,
      cook_time: recipe.cook_time,
      difficulty: recipe.difficulty,
      image_url: recipe.image_url,
      ingredients: recipe.ingredients,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/recipes/:id/steps
router.get('/:id/steps', async (req, res) => {
  try {
    const steps = await Step.find({ recipe_id: req.params.id }).sort({ step_number: 1 });
    const result = steps.map(s => ({
      step_number: s.step_number,
      title: s.title,
      description: s.description,
      image_url: s.image_url,
      recipe_id: s.recipe_id,
    }));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
