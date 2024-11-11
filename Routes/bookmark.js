const express = require('express');
const bookmarkController = require('../Controllers/bookmark');
const router = express.Router();

router.post('bookmark/add', bookmarkController.addBookmark); 
router.get('bookmark/get/:item_id', bookmarkController.getBookmarks); 
router.delete('bookmark/delete/:item_id', bookmarkController.deleteBookmark); 

module.exports = router;