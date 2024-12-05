const express = require('express');
const router = express.Router();
const { upload, uploadToGCS } = require('../midleware/imageMidleware');
const destinationController = require('../Controllers/destinationController');

router.post('/add', upload, uploadToGCS, destinationController.addDestination); 

module.exports = router;