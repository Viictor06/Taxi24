const express = require('express');
const router = express.Router();
const { createTrip, completeTrip, getActiveTrips } = require('../controllers/trip.controller');
const { getClosestDrivers, getPassengerById } = require('../controllers/passenger.controller');

router.post('/:id', getPassengerById, getClosestDrivers, createTrip);
router.patch('/:id', completeTrip);
router.get('/active', getActiveTrips);

module.exports = router;