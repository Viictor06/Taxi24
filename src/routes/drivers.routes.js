const express = require('express');
const router = express.Router();
const {getDriverById, getAllDrivers, getNearbyDrivers, getAvailableDrivers} = require('../controllers/driver.controller');

router.get('/', getAllDrivers);
router.get('/available-drivers', getAvailableDrivers);
router.get('/nearby-drivers', getNearbyDrivers);
router.get('/:id', getDriverById);

module.exports = router;