const Passenger = require("../models/passenger");
const Driver = require("../models/driver");
const mongoose = require('mongoose')

// Obtener todos los pasajeros
const getAllPassengers = async (req, res) => {
  try {
    const passengers = await Passenger.find();

    if (!passengers) {
      return res.status(404).json({ error: "No se encontraron pasajeros" });
    }
    return res.status(200).json(passengers)
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Obtener un pasajero por ID
const getPassengerById = async (req, res, next) => {

  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({ error: "El id no es un ObjectId válido" });
  }

  try {
    const passenger = await Passenger.findById(id);

    if (!passenger) {
      return res.status(404).json({ message: 'Pasajero no encontrado' });
    }
    req.passenger = passenger;
    next();

  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

// Obtener los 3 conductores más cercanos
const getClosestDrivers = async (req, res, next) => {

  try {
    const {location : passLocation} = req.passenger;

    const drivers = await Driver.find({
      available: true,
      location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: passLocation,
          }
        },
      },
    }).limit(3);

    if (!drivers) {
      return res.status(404).json({ message: 'No hay conductores cercanos' });
    }

    req.drivers = drivers;
    next();

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllPassengers, getClosestDrivers, getPassengerById };