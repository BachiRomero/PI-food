import "./detail.modules.css";

import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Detail = () => {
  const { id } = useParams();

  const [recipe, setRecipe] = useState({});

  useEffect(async () => {
    await axios(`https://api.spoonacular.com//recipes/${id}`).then(
      ({ data }) => {
        if (data) {
          setRecipe(data);
        } else {
          window.alert("No hay personajes con ese ID");
        }
      }
    );
    //return setRecipe({});
  }, [id]);

  return (
    <div>
      <h1>{recipe.title}</h1>
      <h2>{recipe.diets}</h2>
      <h2>{recipe.vegetarian}</h2>
      <h2>{recipe.vegan}</h2>
      <h2>{recipe.glutenFree}</h2>
    </div>
  );
};

export default Detail;

//  "vegetarian": true,
//   "vegan": true,
//   "glutenFree": true,
