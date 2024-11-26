const express = require('express');
const router = express.Router();
const destinationController = require('../Controllers/destinationController');

/**
 * @swagger
 * /destination/add:
 *   post:
 *     tags:
 *       - Destinations
 *     summary: Add new destination
 *     description: Add a new tourist destination
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: destinationData
 *         description: Destination details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             place_name:
 *               type: string
 *               example: "Pantai Kuta"
 *             description:
 *               type: string
 *               example: "Pantai terkenal di Bali"
 *             gambar:
 *               type: string
 *               example: "kuta.jpg"
 *             category:
 *               type: string
 *               example: "Bahari"
 *             city:
 *               type: string
 *               example: "Bali"
 *             price:
 *               type: number
 *               example: 0
 *             latitude:
 *               type: number
 *               format: float
 *               example: -8.7184
 *             longitude:
 *               type: number
 *               format: float
 *               example: 115.1686
 *     responses:
 *       201:
 *         description: Destination added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Destinasi berhasil ditambahkan"
 *                 data:
 *                   type: object
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 */

router.post('/destination/add', destinationController.addDestination); 

module.exports = router;