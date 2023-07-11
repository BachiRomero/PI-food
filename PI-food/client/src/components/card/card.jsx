import "./card.modules.css";

import { Link } from "react-router-dom";

export default function Card({ recipe }) {
  const { title, diets, image, id, healthScore, dietAssociations } = recipe;
  const dietRender = [];
  if (dietAssociations) {
    dietAssociations.map((diet) => dietRender.push(diet.name));
  }
  return (
    <div class="card mb-3" style={{ width: 18 + "rem" }}>
      <img src={image} class="card-img-top" alt="" />
      <div class="card-body">
        <h3 class="card-title">{title}</h3>
        <h5>Diets: {diets ? diets : dietRender.join(" - ")}</h5>
        <h5>Health Score: {healthScore}</h5>
        <a href={`/home/${id}`} class="btn btn-primary">
          Go detail
        </a>
      </div>
    </div>
    // <div className="card-container">
    //   <Link to={`/home/${id}`}>
    //     <h2>{title}</h2>
    //   </Link>
    //   <img src={image} alt="" className="img" />
    //   <h4>Diets: {diets ? diets : dietRender.join(" - ")}</h4>
    //   <h4>Health Score: {healthScore}</h4>
    // </div>
  );
}
