const express = require("express");
const router = express.Router();
const electionController = require("../controllers/electionController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

//crea proyecto
//api/proyecto
router.post(
  "/",
  auth,
  [
    check("año", "El año es obligatorio").not().isEmpty(),
    check("partidoPolitico", "Debe escoger un partido Politico").not().isEmpty(),
    check("condado", "Debe escoger un condado").not().isEmpty(),
    check("conteoVotos", "Debe ingresar el numero total de votos").not().isEmpty(),
  ],
  electionController.crearElection
);


module.exports = router;
