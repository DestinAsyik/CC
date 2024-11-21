const express = require('express');
const fuelCost = require('../Controllers/fuelController');
const router =  express.Router();

router.use('/destination/:item_id/cost', fuelCost.fuelReccomendations);

module.exports = router;