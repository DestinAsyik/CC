const express = require('express');
const bookmarkController = require('../Controllers/bookmarkController');
const router = express.Router();

router.post('/toggle-bookmark', bookmarkController.toggleBookmark); 
router.get('/get', bookmarkController.getBookmarks); 

module.exports = router;