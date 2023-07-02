import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const GET_BY_NAME = "GET_BY_NAME";
export const FILTER = "FILTER";
export const ORDER_H = "ORDER_H";
export const ORDER_T = "ORDER_T";
export const POST_RECIPE = "POST_RECIPE";
export const PAGINATE = "PAGINATE";

export function getRecipes() {
  return async function (dispatch) {
    try {
      const response = await axios(`http://localhost:3001/recipes/`);
      return dispatch({
        type: GET_RECIPES,
        payload: response.data,
      });
    } catch (error) {
      alert(error.response.data.error);
    }
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

export function postRecipe(data) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`http://localhost:3001/recipes`, data);
      console.log(response);
      alert("Receta agregada correctamente");
      return dispatch({
        type: POST_RECIPE,
        payload: "",
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };
}

export function filterRecipe(diet) {
  return async function (dispatch) {
    return await dispatch({
      type: FILTER,
      payload: diet,
    });
  };
}

export function paginate(order) {
  return async function (dispatch) {
    dispatch({
      type: PAGINATE,
      payload: order,
    });
  };
}

export function orderRecipeByHealthScore(orden) {
  return {
    type: ORDER_H,
    payload: orden,
  };
}

export function orderRecipeByTitle(orden) {
  return {
    type: ORDER_T,
    payload: orden,
  };
}
