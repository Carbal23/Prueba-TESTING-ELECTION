// rutas para agregar autenticar
const express = require("express");
const router = express.Router();
const countyController = require("../controllers/countyController");

router.get("/", countyController.obtenerCondados);

module.exports = router;
