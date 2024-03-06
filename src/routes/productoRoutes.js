const express = require("express");
const router = express.Router();

const productoController = require('../controllers/productoController');

router.post("/", productoController.createProduct);

module.exports = router;
