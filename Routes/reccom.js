const express = require('express')
const reccomController = require('../Controllers/reccomenderController')
const router = express.Router()

/**
 * @swagger
 * /reccomendation/content:
 *   post:
 *     tags:
 *       - Recommendations
 *     summary: Get content-based recommendations
 *     description: Get destination recommendations based on content similarity
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: user_id
 *         description: User ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved recommendations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Rekomendasi berhasil didapatkan"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 * 
 * @swagger
 * /reccomendation/nearby:
 *   post:
 *     tags:
 *       - Recommendations  
 *     summary: Get nearby recommendations
 *     description: Get destination recommendations based on distance/location
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: user_id
 *         description: User ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved recommendations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Rekomendasi berhasil didapatkan"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 *
 * @swagger
 * /reccomendation/colaborative:
 *   post:
 *     tags:
 *       - Recommendations
 *     summary: Get hybrid recommendations
 *     description: Get destination recommendations using hybrid approach (collaborative filtering)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved recommendations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Rekomendasi berhasil didapatkan"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 */

router.post('/reccomendation/content', reccomController.reccomByContent);
router.post('/reccomendation/nearby', reccomController.reccomByJarak);
router.post('/reccomendation/colaborative', reccomController.reccomHybrid);

module.exports = router;