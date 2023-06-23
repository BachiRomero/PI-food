const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
const Recipe = (sequelize) => {
  // defino el modelo
  sequelize.define("recipe", {
    id: {
      type: DataTypes.UUID, // codigo alfanumerico(letras, numeros, guiones)
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    healthScore: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    // analyzedInstructions: {
    //   type: DataTypes.ARRAY(DataTypes.JSONB),
    //   allowNull: false,
    // },
  });
};

module.exports = Recipe;
