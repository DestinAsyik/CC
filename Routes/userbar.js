const express = require('express');
const userbarController = require('../Controllers/userbarController');
const router = express.Router();

/**
 * @swagger
 * /usebar:
 *   get:
 *     tags:
 *       - User Bar
 *     summary: Get all destinations
 *     description: Retrieve a list of all destinations
 *     responses:
 *       200:
 *         description: Destinations retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Data berhasil didapatkan"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Server error
 *
 * /usebar/search:
 *   get:
 *     tags:
 *       - User Bar
 *     summary: Search destinations
 *     description: Search destinations by keyword
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search keyword
 *     responses:
 *       200:
 *         description: Search results retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Data berhasil didapatkan"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Server error
 *
 * /usebar/category/{category}:
 *   get:
 *     tags:
 *       - User Bar
 *     summary: Get destinations by category
 *     description: Retrieve destinations filtered by category
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         description: Category to filter by
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Destinations retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Data berhasil didapatkan"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 *
 * /usebar/city/{city}:
 *   get:
 *     tags:
 *       - User Bar
 *     summary: Get destinations by city
 *     description: Retrieve destinations filtered by city
 *     parameters:
 *       - in: path
 *         name: city
 *         required: true
 *         description: City to filter by
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Destinations retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Data berhasil didapatkan"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: City not found
 *       500:
 *         description: Server error
 */

router.get('/usebar/', userbarController.getAllDestinations); 
router.get('/usebar/search', userbarController.searchDestinations); 
router.get('/usebar/category/:category', userbarController.getDestinationsByCategory); 
router.get('/usebar/city/:city', userbarController.getDestinationsByCity); 


module.exports = router;