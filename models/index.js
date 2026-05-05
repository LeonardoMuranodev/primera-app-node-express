'use strict';

//Imports
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');

const basename = path.basename(__filename);

// Por defecto usa development, sino usa una variable de entorno que todavia no o hicimos
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

//Objeto que representa a la BD
const db = {};

let sequelize;

// COnexion a la BD
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  //Va a recorrer todos los archivos de la carpeta model
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    // clave es el nombre del modelo, y el valor el modelo entero
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
