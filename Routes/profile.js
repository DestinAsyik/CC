const express = require('express');
const authController = require('../Controllers/auth');
const router = express.Router();

router.post('/auth/profile', authController.getDataUser);
router.post('/auth/profile/update', authController.updateProfile);


module.exports = router;