// authRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, requestPin, verifyPin } = require('../controllers/authController');

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               pin:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *                 pattern: '^\d{10,15}$' # phone number validation
 *             required:
 *               - name
 *               - email
 *               - password
 *               - pin
 *               - phoneNumber
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login with email and pin
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               pin:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *               - pin
 *     responses:
 *       200:
 *         description: Pin request successful, token issued
 *       401:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 */
/**
 * @swagger
 * /verify-pin:
 *   post:
 *     summary: Verify the PIN and issue an authentication token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               pin:
 *                 type: string
 *             required:
 *               - email
 *               - pin
 *     responses:
 *       200:
 *         description: PIN verified, authentication token issued
 *       400:
 *         description: Invalid PIN
 *       404:
 *         description: User not found
 */

// POST route for user registration (with phone number)
router.post('/register', registerUser);

// POST route for user login (with pin)
router.post('/login', requestPin);

// POST route to verify pin and issue auth token
router.post('/verify-pin', verifyPin);

module.exports = router;
