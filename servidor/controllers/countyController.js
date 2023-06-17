const County = require("../models/county");

exports.obtenerCondados = async (req, res) => {
    try {
      const county = await County.find({}).sort({
        creado: -1,
      });
      res.json({ county });
    } catch (error) {
      console.log(error);
      res.status(500).send("Ocurrio un error");
    }
  };