const Trip = require('../models/trip');
const Driver = require('../models/driver');

// Crear una solicitud de viaje
const createTrip = async (req, res) => {

  const { id } = req.params;
  const { destination } = req.body;

  const driverId = req.drivers[0]["_id"].toString();
  const { coordinates } = req.passenger.location

  const existingRide = await Trip.findOne({ passenger: id, status: 'active' });

  if (existingRide) return res.status(400).json({ message: 'El pasajero ya tiene un viaje activo' });
  if(!destination) return res.status(400).json({ message: `Coloque el campo 'destination' en el cuerpo`});

  try {
    const newTrip = new Trip({
      driver: driverId,
      passenger: id,
      startLocation: {coordinates},
      endLocation: {coordinates: destination},
    });

    await newTrip.save();

    const driverStatus = await Driver.findById(driverId)

    driverStatus.available = false;
    await driverStatus.save();

    return res.status(201).json({msg: "Trip added"});
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Completar un viaje
const completeTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });

    trip.status = 'completed';
    await trip.save();

    const driver = await Driver.findById(trip.driver);
    driver.available = true;
    await driver.save();

    return res.status(200).json({msg: "Trip completed"});
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Obtener todos los viajes activos
const getActiveTrips = async (req, res) => {
  try {
    const trips = await Trip.aggregate([
      { $match: { status: 'active' } },
      { $project: {
          passenger: 1,
          driver: 1,
          startLocation: "$startLocation.coordinates",
          endLocation: "$endLocation.coordinates"
      }}
  ]);

    return res.status(200).json(trips);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


module.exports = {createTrip, completeTrip, getActiveTrips}