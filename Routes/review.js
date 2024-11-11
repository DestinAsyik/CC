const express = require('express')
const reviewController = require('../Controllers/reviewController')
const router = express.Router()

router.post('/destination/:item_id/review/', reviewController.createReview)

module.exports = router