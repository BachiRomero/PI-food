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
import { Link } from "react-router-dom";

import SearchBar from "../../components/searchBar/searchBar";
import Cards from "../../components/cards/cards";

import "./home.modules.css";

function Home() {
  const dispatch = useDispatch(); // Dispatch es la forma en que se envía las actions al store. Para poder usarlo debemos invocar useDispatch primero
  const allRecipes = useSelector((state) => state.allRecipes); // useSelector es la suscripción al estado allRecipes..
  const recipesFiltered = useSelector((state) => state.recipesFiltered); // useSelector es la suscripción al estado recipesFiltered..
  const recipesFilteredCopy = useSelector((state) => state.recipesFilteredCopy); // useSelector es la suscripción al estado recipesFilteredCopy..
  const filter = useSelector((state) => state.filter); // useSelector es la suscripción al estado filter..
  const recipesP = useSelector((state) => state.recipesP); // useSelector es la suscripción al estado recipesP..

  //------------------------------------------------------------------------------------------------------------------------------------

  // PAGINADO DESDE COMPONENTE

  // const ITEMS_PER_PAGE = 9;

  // const [currentPage, setCurrentPage] = useState(0);
  // const [items, setItems] = useState([...allRecipes].splice(0, ITEMS_PER_PAGE));
  // const [itemsFiltered, setItemsFiltered] = useState(
  //   [...recipesFiltered].splice(0, ITEMS_PER_PAGE)
  // );

  // useEffect(() => {
  //   setItems([...allRecipes].splice(0, ITEMS_PER_PAGE));
  //   setItemsFiltered([...recipesFiltered].splice(0, ITEMS_PER_PAGE));
  // }, [allRecipes, recipesFiltered]);

  // const nextPage = () => {

  //   // const next_page = currentPage + 1;
  //   // const firstIndex = next_page * ITEMS_PER_PAGE;
  //   // if (filter) {
  //   //   if (firstIndex > recipesFiltered.length) return;
  //   //   setItemsFiltered([...recipesFiltered].splice(firstIndex, ITEMS_PER_PAGE));
  //   //   setCurrentPage(next_page);
  //   // }
  //   // if (firstIndex > allRecipes.length) return;
  //   // setItems([...allRecipes].splice(firstIndex, ITEMS_PER_PAGE));
  //   // setCurrentPage(next_page);
  // };

  // function prevPage() {

  //   // const prev_page = currentPage - 1;
  //   // const firstIndex = prev_page * ITEMS_PER_PAGE;
  //   // if (filter) {
  //   //   if (firstIndex < 0) return;
  //   //   setItemsFiltered([...recipesFiltered].splice(firstIndex, ITEMS_PER_PAGE));
  //   //   setCurrentPage(prev_page);
  //   // }
  //   // if (firstIndex < 0) return;
  //   // setItems([...allRecipes].splice(firstIndex, ITEMS_PER_PAGE));
  //   // setCurrentPage(prev_page);
  // }

  // PAGINADO DESDE REDUX

  const nextPage = () => {
    dispatch(paginate("next"));
  };

  function prevPage() {
    dispatch(paginate("prev"));
  }

  //------------------------------------------------------------------------------------------------------------------------------------

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

  //------------------------------------------------------------------------------------------------------------------------------------

  // Filtrado:

  function handlerFilter(event) {
    event.preventDefault();
    dispatch(filterRecipe(event.target.value));
  }

  //------------------------------------------------------------------------------------------------------------------------------------

  // Order:

  function handlerOrder(event) {
    event.preventDefault();
    dispatch(orderRecipeByHealthScore(event.target.value));
  }

  function handlerOrderByTitle(event) {
    event.preventDefault();
    dispatch(orderRecipeByTitle(event.target.value));
  }

  //------------------------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    dispatch(getRecipes()); // Monta la action getRecipes al renderizar la pagina por primera vez.
  }, [dispatch]);

  return (
    <div className="home">
      <h1 className="home-title">Estás en la home</h1>
      <Link to="/create">
        <button className="button-create button-create1">CREATE RECIPE</button>
      </Link>
      <SearchBar handleChange={handleChange} handleSubmit={handleSubmit} />,
      <select className="select" onChange={handlerOrderByTitle}>
        <option value="C">Orden A-Z</option>
        <option value="Z">Orden Z-A</option>
      </select>
      <select className="select" onChange={handlerOrder}>
        <option value="A">Ascendente</option>
        <option value="D">Descendente</option>
      </select>
      <select className="select" onChange={handlerFilter}>
        <option value="all">All</option>
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
      <Cards allRecipes={filter ? recipesFilteredCopy : recipesP} />
      <button className="button-page" onClick={() => prevPage()}>
        <img
          className="flecha"
          src="https://images.emojiterra.com/google/noto-emoji/unicode-15/color/128px/2b05.png"
          alt="Prev"
        />
      </button>
      <button className="button-page" onClick={() => nextPage()}>
        <img
          className="flecha"
          src="https://images.emojiterra.com/google/noto-emoji/unicode-15/color/128px/27a1.png"
          alt="Next"
        />
      </button>
    </div>
  );
}

export default Home;
