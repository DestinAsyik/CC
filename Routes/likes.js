const likeController = require('../Controllers/likeController');
const express = require('express');
const router = express.Router();

router.post('/destination/toggle-like', likeController.toggleLike);

module.exports = router;