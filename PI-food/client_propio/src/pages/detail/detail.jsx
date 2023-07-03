import "./detail.modules.css";

import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();

  const [recipe, setRecipe] = useState({});

  useEffect(async () => {
    await axios(`http://localhost:3001/recipes/${id}`).then(({ data }) => {
      if (data) {
        setRecipe(data);
      } else {
        window.alert("No hay recetas con ese ID");
      }
    });
    //return setRecipe({});
  }, [id]);

  return (
    <div>
      <>
        <Link to="/home">
          <button>HOME</button>
        </Link>
      </>
      <>
        <h1>{recipe.title}</h1>
        <h2>{recipe.summary}</h2>
        <img src={recipe.image} alt="" />
        <h2>{recipe.step_by_step}</h2>
        <h2>{recipe.diets}</h2>
      </>
    </div>
  );
};

export default Detail;
