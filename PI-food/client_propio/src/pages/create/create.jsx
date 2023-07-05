import { useDispatch } from "react-redux";
import { useState } from "react";
import "./create.modules.css";
import { postRecipe } from "../../redux/actions";
import { Link } from "react-router-dom";

function Create() {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    title: "",
    summary: "",
    healtScore: 0,
    step_by_step: "",
    image: "",
    dieta: [],
  });

  const [error, setError] = useState({
    title: "",
    summary: "",
    healthScore: 0,
    step_by_step: "",
    image: "",
    dieta: [],
  });

  function validate(input) {}

  function handleChange(event) {
    setInput({
      ...input, // Para que no se pisen los inputs al setear!!
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(postRecipe(input));
  }

  function handleSelectChange(event) {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );
    setInput((prevInput) => ({ ...prevInput, diets: selectedOptions }));
  }

  return (
    <div className="div-container">
      <form action="" onSubmit={handleSubmit} className="form">
        <div className="div-form">
          <label htmlFor="">Name: </label>
          <input
            type="text"
            name="title"
            value={input.value}
            onChange={handleChange}
          />
          <label htmlFor="">Summary: </label>
          <input
            type="text"
            name="summary"
            value={input.value}
            onChange={handleChange}
          />
          <label htmlFor="">Healt Score: </label>
          <input
            type="number"
            name="healthScore"
            value={input.value}
            onChange={handleChange}
          />
          <label htmlFor="">Steps for creation: </label>
          <input
            type="text"
            name="step_by_step"
            value={input.value}
            onChange={handleChange}
          />
          <label htmlFor="">Image: </label>
          <input
            type="text"
            name="image"
            value={input.value}
            onChange={handleChange}
          />
          <label htmlFor="">Diets: </label>
          <select multiple id="mySelect" onChange={handleSelectChange}>
            <option value="gluten free">Gluten free</option>
            <option value="dairy free">Diary free</option>
            <option value="lacto ovo vegetarian">Lacto ovo vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="paleolithic">Paleolithic</option>
            <option value="primal">Primal</option>
            <option value="wole 30">Wole 30</option>
            <option value="pescatarian">Pescatarian</option>
            <option value="ketogenic">Ketogenic</option>
            <option value="foodmap fiendly">Foodmap fiendly</option>
          </select>
          <button type="submit">Create</button>
          <Link to="/home">
            <button>HOME</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Create;
