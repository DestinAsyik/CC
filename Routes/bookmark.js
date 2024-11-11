const express = require('express');
const bookmarkController = require('../Controllers/bookmarkController');
const router = express.Router();

router.post('/bookmark/add', bookmarkController.addBookmark); 
router.get('/bookmark/get', bookmarkController.getBookmarks); 
router.delete('/bookmark/delete/:bookmark_id', bookmarkController.deleteBookmark); 

module.exports = router;