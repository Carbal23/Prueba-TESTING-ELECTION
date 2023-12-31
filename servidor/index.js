const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");

//crear el servidor
const app = express();

//conectar base de datos
conectarDB();

//habilitar cors
app.use(cors());

//habilitar express.json
app.use(express.json({extended: true}));

// puerto de la app
const port = process.env.port || 4000;

//importar rutas
app.use('/api/auth', require("./routes/auth"));
app.use('/api/election', require("./routes/election"));
app.use('/api/county', require("./routes/county"));




//arrancar la app
app.listen(port,"0.0.0.0", () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});
