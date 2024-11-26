/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new user
 *     description: Create a new user account
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User registration details
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - username
 *             - name
 *             - password
 *             - date_birth
 *             - email
 *             - city
 *             - prefered_category
 *           properties:
 *             username:
 *               type: string
 *               example: "john_doe"
 *             name:
 *               type: string
 *               example: "John Doe"
 *             password:
 *               type: string
 *               example: "password123"
 *             date_birth:
 *               type: string
 *               format: date
 *               example: "2000-01-01"
 *             email:
 *               type: string
 *               format: email
 *               example: "john@example.com"
 *             city:
 *               type: string
 *               example: "Jakarta"
 *             prefered_category:
 *               type: string
 *               example: "Alam"
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Pengguna berhasil terdaftar"
 *                 data:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: integer
 *                     username:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     age:
 *                       type: integer
 *                     city:
 *                       type: string
 *                     prefered_category:
 *                       type: string
 *       400:
 *         description: Bad request (missing fields or email already registered)
 *       500:
 *         description: Server error
 * 
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Login user
 *     description: Login with username/email and password
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: Login credentials
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *               example: "john_doe"
 *             email:
 *               type: string
 *               format: email
 *               example: "john@example.com"
 *             password:
 *               type: string
 *               example: "password123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login berhasil"
 *                 token:
 *                   type: string
 *       401:
 *         description: Wrong password
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 * 
 * @swagger
 * /auth/logout:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Logout user
 *     description: Clear user session
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logout berhasil"
 */

const express = require('express');
const authController = require('../Controllers/authController');
const router = express.Router();

router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/logout', authController.logout);

module.exports = router;