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
    analyzedInstructions: {},
    image: "",
    diets: [""],
  });

  const [error, setError] = useState({
    title: "",
    summary: "",
    healthScore: 0,
    analyzedInstructions: {},
    image: "",
    diets: [""],
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
            name="analyzedInstructions"
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
          <input
            type="text"
            name="diets"
            value={input.value}
            onChange={handleChange}
          />
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
