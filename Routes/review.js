const express = require('express')
const reviewController = require('../Controllers/reviewController')
const router = express.Router()

router.post('/destination/:item_id', reviewController.createReviews)
router.get('/destination/getreviews/:item_id', reviewController.getReviews)

module.exports = router;