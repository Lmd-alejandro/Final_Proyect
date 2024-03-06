const express = require("express");
const router = express.Router();

const clienteController = require('../controllers/clienteController');

router.post("/", clienteController.createClient);

module.exports = router;
