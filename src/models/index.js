const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const Config = require('../config/index');

console.log(Config);

const {
  HOST_DB,
  USER_DB,
  PASSWORD_DB,
  NAME_DB,

} = Config;

const sequelize = new Sequelize(NAME_DB, USER_DB, PASSWORD_DB, {
  dialect: 'mysql',
  port: PORT_DB,
  host: HOST_DB,
  logging: false,
});

const db = {};

// Cargar todos los modelos automáticamente
fs.readdirSync(__dirname)
  .filter((file) => file !== 'index.js')
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Asociaciones
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Exportar modelos y Sequelize
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
