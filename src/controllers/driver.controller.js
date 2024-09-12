const Driver = require('../models/driver');
const mongoose = require('mongoose')

// Obtener todos los conductores
const getAllDrivers = async (req, res) => {
    try {
        const drivers = await Driver.find();

        if(!drivers){
            return res.status(404).json({ message: "No se encontraron conductores" });
        }
        return res.status(200).json(drivers)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener los conductores disponibles
const getAvailableDrivers = async (req, res) => {
    try {
        const drivers = await Driver.find({ available: true });

        if(!drivers){
            return res.status(404).json({ message: "No se encontraron conductores disponibles" });
        }
        return res.status(200).json(drivers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener los conductores disponibles a un rango de 3km
const getNearbyDrivers = async (req, res) => {
    const { lat, lon } = req.query;
    
    if(!lat || !lon){
        return res.status(400).json({ error: "Coloque parametros de longitud (lon) y latitud (lat)" });
    }

    try {
        const drivers = await Driver.find({
            available: true,
            location: {
                $nearSphere: {
                    $geometry: { type: "Point", coordinates: [lon, lat] },
                    $maxDistance: 3000
                }
            }
        });

        if(!drivers){
            return res.status(404).json({ message: "No se encontraron conductores disponibles en un rango de 3km" });
        }

        return res.status(200).json(drivers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener conductor por ID
const getDriverById = async (req, res) => {
    try {

        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({ error: "El id no es un ObjectId válido" });
          }

        const driver = await Driver.findById(req.params.id);

        if(!driver){
            return res.status(404).json({ message: "Conductor no encontrado" });
        }
        return res.status(200).json(driver);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {getAllDrivers, getDriverById, getAvailableDrivers, getNearbyDrivers}