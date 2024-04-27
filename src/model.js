
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');

const uri = "mongodb+srv://mohamedafattah:yFbTGqUPm7zipGYo@cookingguide.xcpfpt2.mongodb.net/?retryWrites=true&w=majority&appName=cookingguide";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
  
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);



const recipeSchema = new mongoose.Schema({
    name: { type: String },
    image: { type: String },
    ingredients: { type: Array },
    steps: { type: Array },
    date: { type: Date, default: Date.now }
});

const Recipe = mongoose.model('Recipes', recipeSchema);

//////////////////////////////////////////////////////////////////////////////////////////////////////////

async function createRecipe(name, image, ingredients, steps, date) {
    try {
      // Create a new recipe document
      const newRecipe = new Recipe({
        name: name,
        image: image,
        ingredients: ingredients,
        steps: steps,
        date: date
      });
  
      // Save the document to the database
      const savedRecipe = await newRecipe.save();
  
      console.log('Recipe created:', savedRecipe);
      return savedRecipe;
    } catch (error) {
      console.error('Error creating recipe:', error);
      throw error; // Rethrow the error for handling in the calling code
    }
  }
  
async function viewSortedRecipes() {
    try {
        // Find all recipes and sort them by date in descending order (newest first)
        const recipes = await Recipe.find().sort({ date: -1 });
        return recipes;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        throw error;
    }
}  


async function editRecipe(query, update) {
    try {
        // Find the document matching the query criteria and update it 
        // query = { _id: '1234' };
        // update =  { $set: { ingredients: ['spaghetti'] } };
        const updatedRecipe = await Recipe.findOneAndUpdate(query, update, {
            new: true,
            useFindAndModify: false 
        });

        if (!updatedRecipe) {
            throw new Error('Recipe not found');
        }

        console.log('Recipe updated:', updatedRecipe);
        return updatedRecipe;
    } catch (error) {
        console.error('Error updating recipe:', error);
        throw error;
    }
}




  module.exports = {
    createRecipe, viewSortedRecipes, editRecipe
};