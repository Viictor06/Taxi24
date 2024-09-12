const express = require('express');
const router = express.Router();
const { getPassengerById, getAllPassengers, getClosestDrivers } = require('../controllers/passenger.controller');

router.get('/', getAllPassengers);
router.get('/:id', getPassengerById, (req, res) => {return res.status(200).json(req.passenger)});
router.get('/nearest-drivers/:id', getPassengerById, getClosestDrivers, (req, res) => {return res.status(200).json(req.drivers)});

module.exports = router;