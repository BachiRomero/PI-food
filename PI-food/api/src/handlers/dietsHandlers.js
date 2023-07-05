const { Diet } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;
const URL = "http://localhost:8080/recipes";

const dietHandler = async (req, res) => {
  await axios
    .get(
      `${URL}/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`
    )
    .then(async (response) => {
      const arrToStr = [];
      const dietsFiltered = [];
      const arrDiets = [];
      const data = await response.data.results;
      data.map(async (element) => {
        if (element.diets && element.diets.length > 0) {
          const arrToString = element.diets.toString();
          arrToStr.push(arrToString);
        }
      });
      arrToStr
        .join()
        .split(",")
        .filter((element) => {
          if (!dietsFiltered.includes(element)) dietsFiltered.push(element);
        });
      console.log(dietsFiltered);

      dietsFiltered.map(async (element) => {
        const newDiet = await Diet.create({ name: element });
        arrDiets.push(newDiet);
        // console.log(arrDiets);
      });

      res.status(200).json(dietsFiltered);
    })
    .catch(function (error) {
      res.status(400).json({ error: error.message });
    });
};

module.exports = {
  dietHandler,
};
