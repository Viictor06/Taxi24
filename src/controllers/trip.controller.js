const Trip = require('../models/trip');
const Driver = require('../models/driver');

// Crear una solicitud de viaje
const createTrip = async (req, res) => {

  const { id } = req.params;
  const { destination } = req.body;

  const driver = req.drivers[0]["_id"].toString();

  const existingRide = await Trip.findOne({ pasajeroId: id, status: 'active' });

  if (existingRide) return res.status(400).json({ message: 'El pasajero ya tiene un viaje activo' });
  if(!destination) return res.status(400).json({ message: `Coloque el campo 'destination' en el cuerpo`});

  try {
    const newTrip = new Trip({
      conductorId: driver,
      pasajeroId: id,
      origen: req.passenger.location,
      destino: destination,
    });

    await newTrip.save();

    const driverStatus = await Driver.findById(driver)

    driverStatus.available = false;
    await driverStatus.save();

    return res.status(201).json({msg: "Viaje añadido"});
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Completar un viaje
const completeTrip = async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, status: 'active' });
    if (!trip) return res.status(404).json({ message: 'No se encontró viaje activo con este ID' });

    trip.status = 'completed';
    await trip.save();

    const driver = await Driver.findById(trip.conductorId);
    driver.available = true;
    await driver.save();

    return res.status(200).json({msg: "Viaje completado"});
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Obtener todos los viajes activos
const getActiveTrips = async (req, res) => {
  try {
    const trips = await Trip.find({status: 'active'}).populate('pasajeroId', 'nombre')
    .populate('conductorId', 'nombre')
    .select('origen destino');

    if(trips.length == 0) return res.status(404).json({ message: 'No se encontraron viajes activos' });

    return res.status(200).json(trips);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


module.exports = {createTrip, completeTrip, getActiveTrips}