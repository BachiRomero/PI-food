import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterRecipe,
  getByName,
  getRecipes,
  orderRecipeByHealthScore,
  orderRecipeByTitle,
  paginate,
} from "../../redux/actions/index";

import SearchBar from "../../components/searchBar/searchBar";
import Cards from "../../components/cards/cards";

import "./home.modules.css";

function Home() {
  const dispatch = useDispatch(); // Dispatch es la forma en que se envía las actions al store. Para poder usarlo debemos invocar useDispatch primero
  //const allRecipes = useSelector((state) => state.allRecipes); // useSelector es la suscripción al estado allRecipes..
  const recipesFiltered = useSelector((state) => state.recipesFiltered); // useSelector es la suscripción al estado recipesFiltered..
  const filter = useSelector((state) => state.filter); // useSelector es la suscripción al estado filter..
  const recipesP = useSelector((state) => state.recipesP); // useSelector es la suscripción al estado recipesP..

  // Search con el backend

  const [searchTitle, SetSearchTitle] = useState("");

  function handleChange(event) {
    event.preventDefault(); // Sirve para que la pagina no se re renderize!
    SetSearchTitle(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(getByName(searchTitle));
  }

  // search con el estado global!!!

  // const [filtered, setFiltered] = useState(allRecipes);
  // const [searchTitle, SetSearchTitle] = useState("");

  // const handleChange = (event) => {
  //   event.preventDefault(); // Sirve para que la pagina no se re renderize!
  //   SetSearchTitle(event.target.value);
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const filtered = allRecipes.filter((recipe) =>
  //     recipe.title.includes(searchTitle)
  //   );
  //   setFiltered(filtered);
  // };

  // Filtrado:
  function handlerFilter(event) {
    event.preventDefault();
    dispatch(filterRecipe(event.target.value));
  }

  // Order:
  const [aux, setAux] = useState(false);
  function handlerOrder(event) {
    event.preventDefault();
    dispatch(orderRecipeByHealthScore(event.target.value));
    setAux(!aux);
  }

  const [aux1, setAux1] = useState(false);
  function handlerOrderByTitle(event) {
    event.preventDefault();
    dispatch(orderRecipeByTitle(event.target.value));
    setAux1(!aux1);
  }

  function nexPage() {
    dispatch(paginate("next"));
  }

  function prevPage() {
    dispatch(paginate("prev"));
  }

  useEffect(() => {
    dispatch(getRecipes()); // Monta la action getRecipes al renderizar la pagina por primera vez.
  }, [dispatch]);

  return (
    <div className="home">
      <h1 className="home-title">Estás en la home</h1>
      <button onClick={() => prevPage()}>Prev</button>
      <button onClick={() => nexPage()}>Next</button>
      <SearchBar handleChange={handleChange} handleSubmit={handleSubmit} />,
      <select onChange={handlerOrderByTitle}>
        <option value="C">Orden A-Z</option>
        <option value="Z">Orden Z-A</option>
      </select>
      <select onChange={handlerOrder}>
        <option value="A">Ascendente</option>
        <option value="D">Descendente</option>
      </select>
      <select onChange={handlerFilter}>
        <option value="gluten free">Gluten free</option>
        <option value="dairy free">Diary free</option>
        <option value="lacto ovo vegetarian">Lacto ovo vegetarian</option>
        <option value="vegan">Vegan</option>
        <option value="paleolithic">Paleolithic</option>
        <option value="primal">Primal</option>
        <option value="whole 30">Wole 30</option>
        <option value="pescatarian">Pescatarian</option>
        <option value="ketogenic">Ketogenic</option>
        <option value="fodmap friendly">Foodmap fiendly</option>
      </select>
      <Cards allRecipes={filter ? recipesFiltered : recipesP} />
    </div>
  );
}

export default Home;
