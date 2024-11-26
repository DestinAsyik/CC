const express = require('express');
const fuelCost = require('../Controllers/fuelController');
const router =  express.Router();

/**
 * @swagger
 * /destination/{item_id}/cost:
 *   get:
 *     tags:
 *       - Fuel Cost
 *     summary: Get fuel cost recommendations
 *     description: Calculate estimated fuel costs to reach a destination
 *     parameters:
 *       - in: path
 *         name: item_id
 *         required: true
 *         description: ID of the destination
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Fuel cost recommendations retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Data berhasil didapatkan"
 *                 data:
 *                   type: object
 *                   properties:
 *                     distance:
 *                       type: number
 *                       example: 150.5
 *                     fuel_costs:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           fuel_type:
 *                             type: string
 *                             example: "Pertalite"
 *                           cost:
 *                             type: number
 *                             example: 125000
 *       404:
 *         description: Destination not found
 *       500:
 *         description: Server error
 */

router.use('/destination/:item_id/cost', fuelCost.fuelReccomendations);

module.exports = router;