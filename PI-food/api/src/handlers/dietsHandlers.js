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
        const newDiet = await Diet.create({ name: element });
        console.log(newDiet);
      });

      res.status(200).json(arr2);
    })
    .catch(function (error) {
      res.status(400).json({ error: error.message });
    });
};

module.exports = {
  dietHandler,
};
