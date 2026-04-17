require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Recipe = require('../models/Recipe');
const Step = require('../models/Step');
const { recipes, steps } = require('./seedData');

async function seed() {
  try {
    await connectDB();
    console.log('Connected to MongoDB. Starting seed...');

    // Clear existing data
    await Recipe.deleteMany({});
    await Step.deleteMany({});
    console.log('Cleared existing recipes and steps.');

    // Insert recipes
    const insertedRecipes = await Recipe.insertMany(recipes);
    console.log(`Inserted ${insertedRecipes.length} recipes.`);

    // Insert steps
    const insertedSteps = await Step.insertMany(steps);
    console.log(`Inserted ${insertedSteps.length} steps.`);

    console.log('\nSeeding complete! Summary:');
    insertedRecipes.forEach((r) => {
      const recipeSteps = steps.filter((s) => s.recipe_id === r._id.toString());
      console.log(`  - ${r.name} (${recipeSteps.length} steps)`);
    });

    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
}

seed();
