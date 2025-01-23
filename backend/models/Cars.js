const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  name: { type: String },
  model: { type: String },
  year: { type: String },
  color: { type: String },
  price: { type: Number },
});

module.exports = mongoose.model("Car", carSchema);
