const { Schema, model } = require("mongoose");

const tripSchema = new Schema({
  
  conductorId: {
    type: Schema.Types.ObjectId,
    ref: "Driver",
    required: true,
  },

  pasajeroId: {
    type: Schema.Types.ObjectId,
    ref: "Passenger",
    required: true,
  },

  origen: {
    type: [Number],
  },

  destino: {
    type: [Number],
  },

  status: {
    type: String,
    enum: ["active", "completed"],
    default: "active",
  },
});

tripSchema.index({ startLocation: "2dsphere"});
tripSchema.index({ endLocation: "2dsphere"});

const Trip = model("Trip", tripSchema);

module.exports = Trip;
