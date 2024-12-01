const likeController = require('../Controllers/likeController');
const express = require('express');
const router = express.Router();

router.post('/toggle-like', likeController.toggleLike);

module.exports = router;