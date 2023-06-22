const { Router } = require("express");
const axios = require("axios");
const { conn, Recipe, Diets } = require("../db");
const { API_KEY } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// GET | /recipes/:idRecipe <---- Falta el llamado al servidor
router.get("/recipes/:idRecipe", async (req, res) => {
  const { idRecipe } = req.params;
  await axios
    .get(
      `http://localhost:8080//recipes/${idRecipe}/information?apiKey=${API_KEY}`
    )
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
    .catch(function (error) {
      res.status(200).send("No existe ese id");
    });
});

//GET | /recipes/?name="..."
router.get("/recipes/", async (req, res) => {
  const { name } = req.query;
  await axios
    .get(
      `http://localhost:8080/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}RecipeInformation=true`
    )
    .then(function (response) {
      const result = response.data.results.filter((recipe) =>
        recipe.title.includes(name)
      );
      res.status(200).json(result);
    })
    .catch(function (error) {
      res.status(404).json({ error: error.message });
    });
});

// //📍 POST | /recipes
// Esta ruta recibirá todos los datos necesarios para crear una nueva receta y relacionarla con los tipos de dieta solicitados.
// Toda la información debe ser recibida por body.
// Debe crear la receta en la base de datos, y esta debe estar relacionada con los tipos de dieta indicados (al menos uno).
router.post("/recipes", async (req, res) => {
  try {
    const { name, image, summary, healthScore, analyzedInstructions } =
      req.body;
    const newRecipe = await Recipe.create({
      name,
      image,
      summary,
      healthScore,
      analyzedInstructions,
    });
    console.log(newRecipe);
    res.status(200).json(newRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET | /diets
// Obtiene un arreglo con todos los tipos de dietas existentes.
// En una primera instancia, cuando no exista ninguna dieta, deberás precargar la base de datos con las dietas de la documentación.
// Estas deben ser obtenidas de la API (se evaluará que no haya hardcodeo). Luego de obtenerlas de la API, deben ser guardadas en la base de datos para su posterior consumo desde allí.
router.get("/diets", async (req, res) => {
  await axios
    .get(
      `http://localhost:8080/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}RecipeInformation=true`
    )
    .then(async (response) => {
      const arr = [];
      const arr2 = [];
      const data = response.data.results;
      data.map(async (element) => {
        if (element.diets && element.diets.length > 0) {
          const arrToString = element.diets.toString();
          arr.push(arrToString);
        }
      });
      arr
        .join()
        .split(",")
        .filter((element) => {
          if (!arr2.includes(element)) arr2.push(element);
        });
      console.log(arr2);

      arr2.map(async (element) => {
        const newDiet = await Diets.create({ name: element });
        console.log(newDiet);
      });

      res.status(200).json(arr2);
    })
    .catch(function (error) {
      res.status(400).json({ error: error.message });
    });
});

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter); <--- cuando quiero una ruta /auth envialo al archivo authRouter donde deberia estar la ruta

module.exports = router;
