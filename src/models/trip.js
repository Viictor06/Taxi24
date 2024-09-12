const { Schema, model } = require("mongoose");

const tripSchema = new Schema({
  
  driver: {
    type: Schema.Types.ObjectId,
    ref: "Driver",
    required: true,
  },

  passenger: {
    type: Schema.Types.ObjectId,
    ref: "Passenger",
    required: true,
  },

  startLocation: {
    type: {
      type: String,
      default: "Point",
    },
    coordinates: [Number],
  },

  endLocation: {
    type: {
      type: String,
      default: "Point",
    },
    coordinates: [Number],
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
