const Coordinator = require("../models/coordinator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.autenticarUsuario = async (req, res) => {

  //extraer email y password
  const { email, password } = req.body;

  try {
    //revisar que sea un usuario registrado
    let coordinator = await Coordinator.findOne({ email });

    if (!coordinator) {
      return res.status(400).json({ msg: "El usuario coordinador no existe" });
    }

    //revisar el password
    const passCorrecto = await bcryptjs.compare(password, coordinator.password);
    if (!passCorrecto) {
      return res.status(400).json({ msg: "Password incorrecto" });
    }

    //crear token y firmarlo
    const payload = {
      coordinator: {
        id: coordinator.id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) throw error;

        //mensaje de confirmacion
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

//obtiene que usuario esta autenticado 
exports.usuarioAutenticado = async (req, res) => {
  try {
    // res.json({msg:req.usuario.id});
    const coordinator = await Coordinator.findById(req.coordinator.id).select("-password");  
    res.json({coordinator});
  } catch (error) {
    console.log(error.response);
    res.status(500).send("Hubo un error"); 
  }
};
