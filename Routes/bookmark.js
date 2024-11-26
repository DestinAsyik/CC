const express = require('express');
const bookmarkController = require('../Controllers/bookmarkController');
const router = express.Router();

router.post('/bookmark/toggle-bookmark', bookmarkController.toggleBookmark); 
router.get('/bookmark/get', bookmarkController.getBookmarks); 

module.exports = router;