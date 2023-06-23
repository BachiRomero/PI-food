const { Router } = require("express");
const {
  getById,
  getByName,
  handlerRecipe,
} = require("../handlers/recipesHandlers");
const { dietHandler } = require("../handlers/dietsHandlers");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// 📍 GET | /recipes/:idRecipe
// Esta ruta obtiene el detalle de una receta específica. Es decir que devuelve un objeto con la información pedida en el detalle de una receta.
// La receta es recibida por parámetro (ID).
// Tiene que incluir los datos de los tipos de dietas asociados a la receta.
// Debe funcionar tanto para las recetas de la API como para las de la base de datos. <---- Falta el llamado al db

router.get("/recipes/:idRecipe", getById);

//-------------------------------------------------------------------------------------------------------------------------

// 📍 GET | /recipes/name?="..."
// Esta ruta debe obtener todas aquellas recetas que coincidan con el nombre recibido por query. (No es necesario que sea una coincidencia exacta).
// Debe poder buscarla independientemente de mayúsculas o minúsculas.
// Si no existe la receta, debe mostrar un mensaje adecuado.
// Debe buscar tanto las de la API como las de la base de datos.

router.get("/recipes/", getByName);

//-------------------------------------------------------------------------------------------------------------------------

// 📍 POST | /recipes
// Esta ruta recibirá todos los datos necesarios para crear una nueva receta y relacionarla con los tipos de dieta solicitados.
// Toda la información debe ser recibida por body.
// Debe crear la receta en la base de datos, y esta debe estar relacionada con los tipos de dieta indicados (al menos uno).

router.post("/recipes", handlerRecipe);

//-------------------------------------------------------------------------------------------------------------------------

// 📍 GET | /diets
// Obtiene un arreglo con todos los tipos de dietas existentes.
// En una primera instancia, cuando no exista ninguna dieta, deberás precargar la base de datos con las dietas de la documentación.
// Estas deben ser obtenidas de la API (se evaluará que no haya hardcodeo). Luego de obtenerlas de la API, deben ser guardadas en la base de datos para su posterior consumo desde allí.

router.get("/diets", dietHandler);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter); <--- cuando quiero una ruta /auth envialo al archivo authRouter donde deberia estar la ruta

module.exports = router;
