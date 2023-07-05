import "./card.modules.css";

import { Link } from "react-router-dom";

export default function Card({ recipe }) {
  const { title, diets, image, id, healthScore, dietAssociations } = recipe;
  const dietRender = [];
  if (dietAssociations) {
    dietAssociations.map((diet) => dietRender.push(diet.name));
  }
  return (
    <div className="card-container">
      <Link to={`/home/${id}`}>
        <h2>{title}</h2>
      </Link>
      <img src={image} alt="" className="img" />
      <h4>Diets: {diets ? diets : dietRender.join(" - ")}</h4>
      <h4>Health Score: {healthScore}</h4>
    </div>
  );
}
