const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
const Recipe = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "recipe",
    {
      id: {
        type: DataTypes.UUID, // codigo alfanumerico(letras, numeros, guiones)
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      image: {
        type: DataTypes.STRING(300),
        allowNull: false,
        validate: {
          isUrl: true,
        },
      },

      summary: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },

      healthScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      step_by_step: {
        type: DataTypes.STRING(2000),
        allowNull: false,
      },

      created: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      // diets: {
      //   type: DataTypes.ARRAY(DataTypes.STRING),
      //   allowNull: false,
      // },
    },

    { timestamps: false }
  );
};

module.exports = Recipe;
