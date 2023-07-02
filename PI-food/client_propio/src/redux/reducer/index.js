import {
  FILTER,
  GET_BY_NAME,
  GET_RECIPES,
  ORDER_H,
  ORDER_T,
  PAGINATE,
} from "../actions";

let initialState = {
  allRecipes: [],
  recipesFiltered: [],
  filter: false,
  recipesP: [],
  currentPage: 0,
};

function rootReducer(state = initialState, { type, payload }) {
  const ITEMS_PER_PAGE = 9;

  switch (type) {
    case GET_RECIPES:
      return {
        ...state,
        allRecipes: payload,
        recipesP: [...payload].splice(0, ITEMS_PER_PAGE),
      };

    case GET_BY_NAME:
      return {
        ...state,
        allRecipes: payload,
      };

    case FILTER:
      const allRecipesFiltered = state.allRecipes.filter((recipe) =>
        recipe.diets.includes(payload)
      );
      return {
        ...state,
        filter: true,
        recipesFiltered: allRecipesFiltered,
      };

    case PAGINATE:
      const next_page = state.currentPage + 1;
      const prev_page = state.currentPage - 1;
      const firstIndex =
        payload === "next"
          ? next_page * ITEMS_PER_PAGE
          : prev_page * ITEMS_PER_PAGE;
      if (state.filter) {
        if (firstIndex >= state.recipesFiltered.length) {
          return { ...state };
        }
        return {
          ...state,
          recipesFiltered: [...state.recipesFiltered].splice(
            firstIndex,
            ITEMS_PER_PAGE
          ),
          currentPage: payload === "next" ? next_page : prev_page,
        };
      }
      if (payload === "next" && firstIndex >= state.allRecipes.length) {
        return { ...state };
      } else if (payload === "prev" && prev_page < 0) {
        return { ...state };
      }
      return {
        ...state,
        recipesP: [...state.allRecipes].splice(firstIndex, ITEMS_PER_PAGE),
        currentPage: payload === "next" ? next_page : prev_page,
      };

    case ORDER_H:
      const allRecipesCopy = [...state.allRecipes];
      const allRecipesOrder =
        payload === "A"
          ? allRecipesCopy.sort((a, b) => a.healthScore - b.healthScore)
          : allRecipesCopy.sort((a, b) => b.healthScore - a.healthScore);
      return {
        ...state,
        allRecipes: allRecipesOrder,
      };

    case ORDER_T:
      const allRecipesCopyT = [...state.allRecipes];
      const allRecipesOrderT =
        payload === "C"
          ? allRecipesCopyT.sort((a, b) => (a.title < b.title ? -1 : null))
          : allRecipesCopyT.sort((a, b) => (b.title < a.title ? -1 : null));
      return {
        ...state,
        allRecipes: allRecipesOrderT,
      };

    default:
      return { ...state };
  }
}

export default rootReducer;
