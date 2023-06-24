const {
  createRecipe,
  getById,
  getByName,
  getAll,
} = require("../controllers/recipesControllers");
const axios = require("axios");
const { API_KEY } = process.env;
const URL = "https://api.spoonacular.com/recipes";

const searchById = async (req, res) => {
  try {
    const { idRecipe } = req.params;
    const source = isNaN(idRecipe) ? "db" : "api";
    const response = await getById(idRecipe, source);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const searchByName = async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      const result = await getByName(name);
      res.status(200).json(result);
    } else {
      const result = await getAll(name);
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createRecipes = async (req, res) => {
  try {
    const { name, image, summary, healthScore, analyzedInstructions } =
      req.body;
    const response = await createRecipe(
      name,
      image,
      summary,
      healthScore,
      analyzedInstructions
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createRecipes,
  searchById,
  searchByName,
};
