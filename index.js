const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const config = require("./src/config/index");
const { Sequelize } = require("sequelize");
const cors = require("cors");
require('dotenv').config();


const clientRoutes = require("./src/routes/clienteRoutes");
const productRoutes = require("./src/routes/productoRoutes");
const orderRoutes = require("./src/routes/pedidoRoutes");
const authMiddleware = require("./src/middlewares/authMiddleware");

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Configuración de la conexión a la base de datos MySQL
const sequelize = new Sequelize(process.env.NAME_DB, process.env.USER_DB, process.env.PASSWORD_DB, {
  host: process.env.HOST_DB,
  port: process.env.PORT_DB,
  dialect: "mysql",
});


// Verificar conexión a la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to the database has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Definir modelos y asociaciones aquí

app.use('/clients', authMiddleware, clientRoutes);
app.use('/products', authMiddleware, productRoutes);
app.use('/orders', authMiddleware, orderRoutes);

const PORT = config.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
