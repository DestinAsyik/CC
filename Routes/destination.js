const express = require('express');
const router = express.Router();
const destinationController = require('../Controllers/destinationController');
const { uploadImage } = require('../midleware/imageMiddleware');

router.post('/destination/add', destinationController.addDestination); 
router.post('/destination/add', uploadImage, destinationController.addDestination); 


module.exports = router;