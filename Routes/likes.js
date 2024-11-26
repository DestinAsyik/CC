const likeController = require('../Controllers/likeController');
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /destination/toggle-like:
 *   post:
 *     tags:
 *       - Likes
 *     summary: Toggle destination like
 *     description: Like or unlike a destination for the current user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: item_id
 *         description: ID of destination to like/unlike
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             item_id:
 *               type: integer
 *     responses:
 *       200:
 *         description: Like status toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Status like berhasil diubah"
 *                 liked:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 */

router.post('/destination/toggle-like', likeController.toggleLike);

module.exports = router;