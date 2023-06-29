import { GET_BY_NAME, GET_RECIPES } from "../actions";

let initialState = { allRecipes: [] };

function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_RECIPES:
      return {
        ...state,
        allRecipes: payload,
      };
    case GET_BY_NAME:
      return {
        ...state,
        allRecipes: payload,
      };
    default:
      return { ...state };
  }
}

export default rootReducer;
