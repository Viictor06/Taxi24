const { Schema, model} = require("mongoose");

const passengerSchema = new Schema({

  nombre: {
    type: String,
    required: true
  },

  cedula: {
    type: String,
    required: true,
    minlength: 11,
    maxlength: 11
  },

  location: {
    type: {
      type: String,
      default: "Point",
    },
    coordinates: [Number],
  },
});

passengerSchema.index({ location: "2dsphere" });

const Passenger = model("Passenger", passengerSchema);

module.exports = Passenger;