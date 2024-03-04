const Sequelize = require("sequelize");
const fs = require("fs");
const path = require("path");
const config = require("../config/index");

const {
NAME_DB,
PASSWORD_DB,
USER_DB,
PORT_DB,
HOST_DB,
} = config;

const sequelize = new Sequelize(NAME_DB, USER_DB, PASSWORD_DB, {
dialect: "mysql",
port: PORT_DB,
host: HOST_DB,
logging: false,
});

const baseName = path.basename(__filename);
const db = {};

const listFile = fs.readdirSync(__dirname).filter((file) => {
return (
    file.indexOf(".") !== 0 &&
    file !== baseName &&
    file.slice(-3) === ".js"
);
});

listFile.forEach((file) => {
const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
if (db[modelName].associate) {
    db[modelName].associate(db);
}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
