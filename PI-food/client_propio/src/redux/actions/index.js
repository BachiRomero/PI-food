import axios from "axios";
const { API_KEY } = process.env;
const URL = "https://api.spoonacular.com/recipes";

export const GET_RECIPES = "GET_RECIPES";
export const GET_BY_NAME = "GET_BY_NAME";

export function getRecipes() {
  return async function (dispatch) {
    const response = await axios(
      `${URL}/complexSearch?apiKey=eeeefc0b6ce94feeab765dd69243b298&addRecipeInformation=true&number=100`
    );
    return dispatch({
      type: GET_RECIPES,
      payload: response.data.results,
    });
  };
}

export function getByName(name) {
  return async function (dispatch) {
    const response = await axios(`http://localhost:3001/recipes/?name=${name}`);
    return dispatch({
      type: GET_BY_NAME,
      payload: response.data,
    });
  };
}
