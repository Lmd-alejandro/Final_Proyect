const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const Config = require('../config/index');

console.log(Config);

const {
  hostDB,
  userDB,
  passwordDB,
  nameDB,
  portDB

} = Config;

const sequelize = new Sequelize(nameDB, userDB, passwordDB, {
  dialect: 'mysql',
  port: portDB,
  host: hostDB,
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
