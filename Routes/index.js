const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const profileRoutes = require('./profile');
const bookmarkRoutes = require('./bookmark');
const reviewRoutes = require('./review');
const recomRoutes = require('./reccom');
const likeRoutes = require('./likes');
const costRoutes = require('./fuel');
const destinationRoutes = require('./destination');
const searchRoutes = require('./searchbar');

const { authenticateToken } = require('../midleware/authMidleware');

router.use('/auth', authRoutes);
router.use('/profile', authenticateToken, profileRoutes);
router.use('/bookmarks', authenticateToken, bookmarkRoutes);
router.use('/reviews', authenticateToken, reviewRoutes);
router.use('/recommendation', authenticateToken, recomRoutes);
router.use('/likes', authenticateToken, likeRoutes);
router.use('/fuel', authenticateToken, costRoutes);
router.use('/destination', authenticateToken, destinationRoutes);
router.use('/search', authenticateToken, searchRoutes);

module.exports = router;