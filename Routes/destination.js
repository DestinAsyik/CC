const express = require('express');
const router = express.Router();
const destinationController = require('../Controllers/destinationController');

router.post('/destination/add', destinationController.addDestination); 

module.exports = router;