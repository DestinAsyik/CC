const express = require('express');
const bookmarkController = require('../Controllers/bookmarkController');
const router = express.Router();

/**
 * @swagger
 * /bookmark/add:
 *   post:
 *     tags:
 *       - Bookmarks
 *     summary: Add bookmark
 *     description: Add a destination to user's bookmarks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: item_id
 *         description: ID of destination to bookmark
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             item_id:
 *               type: integer
 *     responses:
 *       201:
 *         description: Bookmark added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bookmark ditambahkan"
 *                 newBookmark:
 *                   type: object
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 *
 * @swagger
 * /bookmark/get:
 *   get:
 *     tags:
 *       - Bookmarks
 *     summary: Get bookmarks
 *     description: Get all bookmarks for current user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Bookmarks retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Data berhasil di dapatkan"
 *                 bookmarks:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 *
 * @swagger
 * /bookmark/delete/{bookmark_id}:
 *   delete:
 *     tags:
 *       - Bookmarks
 *     summary: Delete bookmark
 *     description: Delete a bookmark by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookmark_id
 *         required: true
 *         description: ID of bookmark to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Bookmark deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bookmark berhasil dihapus"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Bookmark not found
 *       500:
 *         description: Server error
 */

router.post('/bookmark/add', bookmarkController.addBookmark); 
router.get('/bookmark/get', bookmarkController.getBookmarks); 
router.delete('/bookmark/delete/:bookmark_id', bookmarkController.deleteBookmark); 

module.exports = router;