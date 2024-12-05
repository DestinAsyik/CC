const express = require('express')
const reviewController = require('../Controllers/reviewController')
const router = express.Router()

router.post('/destination', reviewController.createReviews)

module.exports = router;