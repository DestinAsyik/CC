const express = require('express');
const searchbarController = require('../Controllers/searchbarController');
const router = express.Router();

router.get('/search', searchbarController.searchAnything); 

module.exports = router;