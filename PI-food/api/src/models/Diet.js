const { DataTypes } = require("sequelize");

const Diet = (sequelize) => {
  sequelize.define(
    "diet",
    {
      id: {
        type: DataTypes.UUID, // codigo alfanumerico(letras, numeros, guiones)
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4, // crea un codigo aleatorio de forma automatica
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};

module.exports = Diet;
