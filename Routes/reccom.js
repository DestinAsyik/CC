const express = require('express')
const reccomController = require('../Controllers/reccomenderController')
const router = express.Router()

router.post('/content', reccomController.reccomByContent);
router.post('/nearby', reccomController.reccomByJarak);
router.post('/colaborative', reccomController.reccomHybrid);

module.exports = router;