const express = require("express");
const router = express.Router();

const pedidoController = require('../controllers/pedidoController');

router.post("/", pedidoController.createOrder);

module.exports = router;
