const { Recipe } = require("../db");

const getById = () => {};

const getByName = () => {};

const createRecipe = async (
  name,
  image,
  summary,
  healthScore,
  analyzedInstructions
) => {
  const newRecipe = await Recipe.create({
    name,
    image,
    summary,
    healthScore,
    analyzedInstructions,
  });

  return newRecipe;
};

module.exports = {
  getById,
  getByName,
  createRecipe,
};
