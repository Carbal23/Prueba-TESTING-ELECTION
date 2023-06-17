const Election = require("../models/election");
const { validationResult } = require("express-validator");

exports.crearElection = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  try {
    //crear proyecto
    const election = new Election(req.body);

    //guardar el creador via jwt
    election.creador = req.coordinator.id;

    //guardar el election
    await election.save();
    res.json(election);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};



