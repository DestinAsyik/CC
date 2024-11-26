const express = require('express');
const authController = require('../Controllers/authController');
const router = express.Router();

/**
 * @swagger
 * /profile:
 *   get:
 *     tags:
 *       - Profile
 *     summary: Get user profile
 *     description: Retrieve current user's profile data
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile data retrieved successfully
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
 *                     user_id:
 *                       type: integer
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *                     profile_picture:
 *                       type: string
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 * 
 * @swagger
 * /profile/update:
 *   post:
 *     tags:
 *       - Profile
 *     summary: Update user profile
 *     description: Update current user's profile information
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: profileData
 *         description: Updated profile data
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *               example: "new_username"
 *             email:
 *               type: string
 *               format: email
 *               example: "newemail@example.com"
 *             profile_picture:
 *               type: string
 *               example: "profile.jpg"
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profil berhasil diperbarui"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 */

router.get('/profile', authController.getDataUser);
router.post('/profile/update', authController.updateProfile);


module.exports = router;