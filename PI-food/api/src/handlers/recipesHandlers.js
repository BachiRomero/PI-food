const { createRecipe } = require("../controllers/recipesControllers");
const axios = require("axios");
const { API_KEY } = process.env;
const URL = "https://api.spoonacular.com/recipes";

const getById = async (req, res) => {
  const { idRecipe } = req.params;
  await axios
    .get(`${URL}/${idRecipe}/information?apiKey=${API_KEY}`)
    .then(function (response) {
      const result = response.data;
      res.status(200).json({
        title: result.title,
        vegetarian: result.vegetarian,
        vegan: result.vegan,
        glutenFree: result.glutenFree,
        diets: result.diets,
      });
    })
    .catch(function () {
      res.status(200).send("No existe ese id");
    });
};

const getByName = async (req, res) => {
  const { name } = req.query;
  await axios
    .get(
      `${URL}/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}RecipeInformation=true`
    )
    .then((response) => {
      const result = response.data.results.filter((recipe) =>
        recipe.title.includes(name)
      );
      res.status(200).json(result);
    })
    .catch(function (error) {
      res.status(404).json({ error: error.message });
    });
};

const handlerRecipe = async (req, res) => {
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
  getById,
  getByName,
  handlerRecipe,
};
