const { DataTypes } = require("sequelize");

const Diets = (sequelize) => {
  sequelize.define("diets", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

module.exports = Diets;
