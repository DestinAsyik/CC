const express = require('express')
const reccomController = require('../Controllers/reccomenderController')
const router = express.Router()

router.post('/reccomendation/content', reccomController.reccomByContent);
router.post('/reccomendation/nearby', reccomController.reccomByJarak);
router.post('/reccomendation/review', reccomController.reccomHybrid);

module.exports = router;