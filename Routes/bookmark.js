const express = require('express');
const bookmarkController = require('../Controllers/bookmark');
const router = express.Router();

router.post('bookmark/add', bookmarkController.addBookmark); 
router.get('bookmark/get', bookmarkController.getBookmarks); 
router.delete('bookmark/delete', bookmarkController.deleteBookmark); 

module.exports = router;