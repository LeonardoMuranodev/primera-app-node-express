'use strict';
const {
  Model
} = require('sequelize');
const producto = require('./producto');
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Categoria.hasMany(models.Producto, {
        foreignKey: "categoriaId",
        as: "productos"
      })
    }
  }
  Categoria.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Categoria',
  });
  return Categoria;
};