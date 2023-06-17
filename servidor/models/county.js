const mongoose = require("mongoose");

const CountySchema = mongoose.Schema({
    codeCounty: {
        type: String,
        require: true,
        trim: true
    },
    county: {
        type: String,
        require: true,
        trim: true
    },
    population: {
        type: Number,
        require: true,
        trim: true,
        unique: true
    },
    area: {
        type: Number,
        require: true,
        trim: true,
    },
    registro:{
        type: Date,
        default: Date.now() 
    }

})

module.exports = mongoose.model("county",CountySchema);