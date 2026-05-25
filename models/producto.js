'use strict';
const {
  Model
} = require('sequelize');
const categoria = require('./categoria');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Producto.belongsTo(models.Categoria, {
        foreignKey: "categoriaId",
        as: "categoria"
      })
    }
  }
  Producto.init({
    nombre: DataTypes.STRING,
    precio: DataTypes.FLOAT,
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Producto',
  });
  return Producto;
};