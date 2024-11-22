const express = require('express');
const userbarController = require('../Controllers/userbarController');
const router = express.Router();

router.get('/usebar/', userbarController.getAllDestinations); 
router.get('/usebar/search', userbarController.searchDestinations); 
router.get('/usebar/category/:category', userbarController.getDestinationsByCategory); 
router.get('/usebar/city/:city', userbarController.getDestinationsByCity); 


module.exports = router;