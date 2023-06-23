const { DataTypes } = require("sequelize");

const Diets = (sequelize) => {
  sequelize.define("diets", {
    id: {
      type: DataTypes.UUID, // codigo alfanumerico(letras, numeros, guiones)
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, // crea un codigo aleatorio de forma automatica
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

module.exports = Diets;
