import "./cards.modules.css";
import Card from "../card/card";

export default function Cards({ allRecipes }) {
  const recipeList = allRecipes; // Guardamos el estado global (allRecipes) en la variable recipeList.
  return (
    <div className="card-list">
      {/* Mapeamos el estado global y por cada recipe creamos una card. */}
      {recipeList?.map((recipe) => (
        <Card recipe={recipe} /> // Pasamos la recipe como prop al componente card.
      ))}
    </div>
  );
}
