import React, { useState } from "react";
import "./App.css";
import Recipe from "./Recipe.tsx";


function App() {

  const [currentRecipe, setCurrentRecipe] = useState('egg' , 'https://via.placeholder.com/150' , ["egg" , "salt"] , ["boil eggs" , "put salt"] );
  const [editRecipeId, setEditRecipeId] = useState(null);
  const [recipes, setRecipes] = useState([]);

  // which page shall I show
  const [addRecipeVisible, setAddRecipeVisible] = useState(false);
  const [editRecipeVisible, setEditRecipeVisible] = useState(false);
  const [viewAllVisible, setViewAllVisible] = useState(false);

  const handleAdd = (e) => {
    let url='/api/addRecipe'

    let body = {
      name: currentRecipe.name,
      image: currentRecipe.image,
      ingredients: currentRecipe.ingredients,
      steps: currentRecipe.steps
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify(body)
    })
    .then(response => {
      // Handle successful response
      console.log('Response:', response.data);
      console.log("recipe added successfully!");
    })
    .catch(error => {
      // Handle error
      console.error('Error:', error);
    });

  }
///////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleEdit = (e) => {
    let url='/api/recipes/:id '

    let body = {
      name: currentRecipe.name,
      image: currentRecipe.image,
      ingredients: currentRecipe.ingredients,
      steps: currentRecipe.steps,
      id: editRecipeId
    }

    fetch(url, {
      method: "PATCH",
      body: JSON.stringify(body)
    })
    .then(response => {
      // Handle successful response
      console.log('Response:', response.data);
      console.log("recipe updated successfully!");
    })
    .catch(error => {
      // Handle error
      console.error('Error:', error);
    });

  }
///////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleView = (e) => {
    let url='/api/recipes'

    fetch(url)
    .then(response => {
      // Handle successful response
      console.log('Response:', response.data);
      console.log("recipes viewed successfully!");
      setRecipes(response.data)
    })
    .catch(error => {
      // Handle error
      console.error('Error:', error);
    });

  }
///////////////////////////////////////////////////////////////////////////////////////////////////////////
  const defaultRecipe = {
    name: 'Default Recipe',
    image: 'https://via.placeholder.com/150',
    ingredients: 'Ingredient 1\nIngredient 2\nIngredient 3',
    steps: 'Step 1\nStep 2\nStep 3'
  };

  const handleAddRecipe = () => {
    setAddRecipeVisible(true);
    setEditRecipeVisible(false);
    setViewAllVisible(false);
    // handleAdd();

  };

  const handleEditRecipe = () => {
    const id = prompt('Enter recipe ID to edit:');
    if (id) {
      setEditRecipeId(id);
      setAddRecipeVisible(false);
      setEditRecipeVisible(true);
      setViewAllVisible(false);
      handleEdit();
    }
  };

  const handleViewAll = () => {
    setAddRecipeVisible(false);
    setEditRecipeVisible(false);
    setViewAllVisible(true);
    handleView();
  };

  const handleSaveRecipe = () => {
    handleAdd();

  };
  const handleNextRecipe = () => {

  }
  const handlePreviousRecipe = () => {
    
  }
  

  return (
    <div className="App">
      <header className="App-header">
        <h1>Cooking Guide App</h1>
        <div className="button-container">
          <button className="button" onClick={handleAddRecipe}>Add Recipe</button>
          <button className="button" onClick={handleEditRecipe}>Edit Recipe</button>
          <button className="button" onClick={handleViewAll}>View All</button>
        </div>
        {(addRecipeVisible || editRecipeVisible || viewAllVisible) && (
          <div className="form-container">
            {addRecipeVisible && (
              <>
                <h2>Add Recipe</h2>
                <input type="text" value={currentRecipe ? currentRecipe.name : ''} onChange={(e) => setCurrentRecipe({ ...currentRecipe, name: e.target.value })} placeholder="Recipe Name" />
                <input type="text" value={currentRecipe ? currentRecipe.image : ''} onChange={(e) => setCurrentRecipe({ ...currentRecipe, image: e.target.value })} placeholder="Image URL" />
                <textarea value={currentRecipe ? currentRecipe.ingredients : ''} onChange={(e) => setCurrentRecipe({ ...currentRecipe, ingredients: e.target.value })} placeholder="Ingredients"></textarea>
                <textarea value={currentRecipe ? currentRecipe.steps : ''} onChange={(e) => setCurrentRecipe({ ...currentRecipe, steps: e.target.value })} placeholder="Steps"></textarea>
                <Recipe name= {currentRecipe.name} img={currentRecipe.image} ingredients={currentRecipe.ingredients} steps= {currentRecipe.steps}></Recipe>
                <button className="save-button" onClick={handleSaveRecipe}>Save Recipe</button>
              </>
            )}

            {editRecipeVisible && (
              <>
                <h2>Edit Recipe</h2>
                <input type="text" value={currentRecipe ? currentRecipe.name : ''} onChange={(e) => setCurrentRecipe({ ...currentRecipe, name: e.target.value })} placeholder="Recipe Name" />
                <input type="text" value={currentRecipe ? currentRecipe.image : ''} onChange={(e) => setCurrentRecipe({ ...currentRecipe, image: e.target.value })} placeholder="Image URL" />
                <textarea value={currentRecipe ? currentRecipe.ingredients : ''} onChange={(e) => setCurrentRecipe({ ...currentRecipe, ingredients: e.target.value })} placeholder="Ingredients"></textarea>
                <textarea value={currentRecipe ? currentRecipe.steps : ''} onChange={(e) => setCurrentRecipe({ ...currentRecipe, steps: e.target.value })} placeholder="Steps"></textarea>
                <Recipe name= {currentRecipe.name} img={currentRecipe.image} ingredients={currentRecipe.ingredients} steps= {currentRecipe.steps}></Recipe>
                <button className="save-button" onClick={handleEdit}>Edit Recipe</button>
              </>
            )}


            {viewAllVisible && (
              <>
                <h2>View All Recipes</h2>
                <div className="recipe-container">
                  <h2>{currentRecipe.name}</h2>
                  <img src={currentRecipe.image} alt={currentRecipe.name} />
                  <h3>Ingredients</h3>
                  <p>{currentRecipe.ingredients}</p>
                  <h3>Steps</h3>
                  <p>{currentRecipe.steps}</p>
                </div>
                
                <button className="save-button" onClick={handlePreviousRecipe}>Previous Recipe</button>
                <button className="save-button" onClick={handleNextRecipe}>Next Recipe</button>
                
              </>
            )}

          </div>
        )}
        {!addRecipeVisible && !editRecipeVisible && !viewAllVisible && (
          <Recipe name="Egg" img="egg" ingredients={'Egg\nSalt '} steps= {'Boil eggs\nAdd salt' }></Recipe>
          
        )}
      </header>
    </div>
  );
}

export default App;
