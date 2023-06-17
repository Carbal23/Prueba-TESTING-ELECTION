const mongoose = require("mongoose");

const ElectionSchema = mongoose.Schema({
  año: {
    type: Number,
    require: true,
    trim: true,
  },
  partidoPolitico: {
    type: String,
    require: true,
    trim: true,
  },
  condado: {
    type: String,
    require: true,
    trim: true,
  },
  conteoVotos: {
    type: Number,
    require: true,
    trim: true,
  },
  creador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "coordinator"
  },
  creado: {
    type: Date,
    default: Date.now()
  },
});

module.exports = mongoose.model("Election", ElectionSchema)