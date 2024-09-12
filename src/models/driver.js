const { Schema, model } = require("mongoose");

const driverSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },

  vehiculo: {
    type: String,
    required: true,
  },

  placa: {
    type: String,
    required: true,
  },

  location: {
    type: [Number],
  },

  available: {
    type: Boolean,
    default: true,
  }
});

driverSchema.index({ location: "2dsphere" });

const Driver = model("Driver", driverSchema);

module.exports = Driver
