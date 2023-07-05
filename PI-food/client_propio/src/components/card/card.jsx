import "./card.modules.css";

import { Link } from "react-router-dom";

export default function Card({ recipe }) {
  const { title, diets, image, id, healthScore, dietAssociations } = recipe;
  const arr1 = [];
  if (dietAssociations) {
    dietAssociations.map((diet) => arr1.push(diet.name));
    console.log(arr1);
  }
  return (
    <div className="card-container">
      <Link to={`/home/${id}`}>
        <h2>{title}</h2>
      </Link>
      <img src={image} alt="" className="img" />
      <h4>Diets: {diets}</h4>
      <h4>{arr1.join(" - ")}</h4>
      <h4>Health Score: {healthScore}</h4>
    </div>
  );
}
