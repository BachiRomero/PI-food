import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getByName, getRecipes } from "../../redux/actions/index";

import SearchBar from "../../components/searchBar/searchBar";
import Cards from "../../components/cards/cards";

import "./home.modules.css";

function Home() {
  const dispatch = useDispatch(); // Dispatch es la forma en que se envía las actions al store. Para poder usarlo debemos invocar useDispatch primero
  const allRecipes = useSelector((state) => state.allRecipes); // useSelector es la suscripción al estado allRecipes..

  // Filtro con el backend

  const [searchTitle, SetSearchTitle] = useState("");

  function handleChange(event) {
    event.preventDefault(); // Sirve para que la pagina no se re renderize!
    SetSearchTitle(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(getByName(searchTitle));
  }

  // Filtro sobre el estado global!!!

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

  useEffect(() => {
    dispatch(getRecipes()); // Monta la action getRecipes al renderizar la pagina por primera vez.
  }, [dispatch]);

  return (
    <div className="home">
      <h1 className="home-title">Estás en la home</h1>
      <SearchBar handleChange={handleChange} handleSubmit={handleSubmit} />,
      <Cards allRecipes={allRecipes} />
    </div>
  );
}

export default Home;
