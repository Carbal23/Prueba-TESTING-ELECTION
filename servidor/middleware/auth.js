const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "no hay token, permiso no valido" });
  }

  //validar el token
  try {
    const cifrado = jwt.verify(token, process.env.SECRETA);
    req.coordinator = cifrado.coordinator;
    next();
    
  } catch (error) {
    res.status(401).json({msg:"Token no valido"});
  }

};
