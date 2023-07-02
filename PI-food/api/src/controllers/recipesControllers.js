const { Recipe } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;
const URL = "http://localhost:8080//recipes";

//----------------------------------------------------------------------------------------------------------------------//

const getById = async (idRecipe, source) => {
  const recipe =
    source === "api"
      ? await axios
          .get(`${URL}/${idRecipe}/information?apiKey=${API_KEY}`)
          .then(function (response) {
            const data = response.data;
            const result = {
              title: data.title,
              vegetarian: data.vegetarian,
              vegan: data.vegan,
              glutenFree: data.glutenFree,
              diets: data.diets,
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
        const recipeFiltered = {
          id: recipe.id,
          title: recipe.title,
          vegetarian: recipe.vegetarian,
          vegan: recipe.vegan,
          glutenFree: recipe.glutenFree,
          diets: recipe.diets,
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
        const recipeFiltered = {
          id: recipe.id,
          title: recipe.title,
          vegetarian: recipe.vegetarian,
          vegan: recipe.vegan,
          glutenFree: recipe.glutenFree,
          diets: recipe.diets,
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
