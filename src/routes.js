const express = require('express');
const mongoose = require('mongoose');
const { createRecipe, viewSortedRecipes, editRecipe } = require('./model');

const app = express();
app.use(express.json());



// add recipe
app.post('/api/addRecipe', async (req, res) => {
    const { name, image, ingredients, steps } = req.body;
    try {
      const recipe = await createRecipe(name, image, ingredients, steps);
      res.status(201).json(recipe);
    } catch (error) {
      res.status(500).json({ error: 'Error creating recipe' });
    }
  });
  
  // view all sorted
  app.get('/api/recipes', async (req, res) => {
    try {
      const recipes = await viewSortedRecipes();
      res.json(recipes);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching recipes' });
    }
  });
  
  // edit recipe
  app.patch('/api/recipes/:id', async (req, res) => {
    const { id } = req.params;
    const { name, image, ingredients, steps } = req.body;
    try {
      const query = { _id: id };
      const update = { $set: { name, image, ingredients, steps } };
      const updatedRecipe = await editRecipe(query, update);
      res.json(updatedRecipe);
    } catch (error) {
      res.status(500).json({ error: 'Error updating recipe' });
    }
  });



  app.listen(3000, () => {
    console.log(`Server is running on http://localhost:${3000}`);
  });