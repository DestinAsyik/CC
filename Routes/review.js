const express = require('express')
const reviewController = require('../Controllers/reviewController')
const router = express.Router()

/**
 * @swagger
 * /destination/review:
 *   post:
 *     tags:
 *       - Reviews
 *     summary: Create destination review
 *     description: Add a review for a destination
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: reviewData
 *         description: Review details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             item_id:
 *               type: integer
 *               example: 1
 *             rating:
 *               type: integer
 *               minimum: 1
 *               maximum: 5
 *               example: 4
 *             comment:
 *               type: string
 *               example: "Tempat yang sangat indah!"
 *     responses:
 *       201:
 *         description: Review created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Review berhasil ditambahkan"
 *                 data:
 *                   type: object
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Destination not found
 *       500:
 *         description: Server error
 */

router.post('/destination/review', reviewController.createReviews)

module.exports = router;