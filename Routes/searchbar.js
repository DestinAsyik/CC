const express = require('express');
const searchbarController = require('../Controllers/searchbarController');
const router = express.Router();

router.get('/', searchbarController.searchAnything); 

module.exports = router;