import React from "react";
interface Props{
    name: string,
    img: string,
    ingredients: Array<string>,
    steps: Array<string>

}

function Recipe(props: Props) {

    return (
        <div className="recipe-container">
            <h2>{props.name}</h2>
            <img src={props.img} alt={props.name} />
            <h3>Ingredients</h3>
            <p>{props.ingredients}</p>
            <h3>Steps</h3>
            <p>{props.steps}</p>
          </div>

    );
}


export default Recipe;