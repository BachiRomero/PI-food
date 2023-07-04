const { Recipe } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;
// const URL = "https://api.spoonacular.com/recipes";
const URL = "http://localhost:8080/recipes";

//----------------------------------------------------------------------------------------------------------------------//

const getById = async (idRecipe, source) => {
  const recipe =
    source === "api"
      ? await axios
          .get(`${URL}/${idRecipe}/information?apiKey=${API_KEY}`)
          .then((response) => {
            const data = response.data;
            const diets = data.diets.join(" - ");
            const summary = data.summary.replace(/<[^>]+>/g, "");
            const instructions = data.instructions.replace(/<[^>]+>/g, "");
            const result = {
              id: data.id,
              title: data.title,
              image: data.image,
              summary: summary,
              healthScore: data.healthScore,
              step_by_step: instructions,
              diets: diets,
            };
            return result;
          })
      : await Recipe.findByPk(idRecipe);
  return recipe;
};

//----------------------------------------------------------------------------------------------------------------------//

const getByName = async (name) => {
  const nameByDb = await Recipe.findAll({
    where: { title: name },
  });
  const nameByApi = await axios
    .get(
      `${URL}/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`
    )
    .then((response) => {
      const data = response.data.results.filter((recipe) =>
        recipe.title.toLowerCase().includes(name.toLowerCase())
      );
      const result = data.map((recipe) => {
        const diets = recipe.diets.join(" - ");

        const recipeFiltered = {
          id: recipe.id,
          title: recipe.title,
          vegetarian: recipe.vegetarian,
          vegan: recipe.vegan,
          glutenFree: recipe.glutenFree,
          healthScore: recipe.healthScore,
          diets: diets,
          image: recipe.image,
          created: false,
        };
        return recipeFiltered;
      });
      return result;
    });
  return [...nameByApi, ...nameByDb];
};

const getAll = async () => {
  const nameByDb = await Recipe.findAll();
  const nameByApi = await axios
    .get(
      `${URL}/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}&addRecipeInformation=true`
    )
    .then((response) => {
      const data = response.data.results;
      const result = data.map((recipe) => {
        const diets = recipe.diets.join(" - ");
        const recipeFiltered = {
          id: recipe.id,
          title: recipe.title,
          vegetarian: recipe.vegetarian,
          vegan: recipe.vegan,
          glutenFree: recipe.glutenFree,
          healthScore: recipe.healthScore,
          diets: diets,
          image: recipe.image,
          created: false,
        };
        return recipeFiltered;
      });
      return result;
    });
  return [...nameByApi, ...nameByDb];
};

//----------------------------------------------------------------------------------------------------------------------//

const createRecipe = async (
  title,
  image,
  summary,
  healthScore,
  analyzedInstructions,
  diet
) => {
  const newRecipe = await Recipe.create({
    title,
    image,
    summary,
    healthScore,
    analyzedInstructions,
    diet,
  });

  return newRecipe;
};

//----------------------------------------------------------------------------------------------------------------------//

module.exports = {
  getById,
  getByName,
  createRecipe,
  getAll,
};
