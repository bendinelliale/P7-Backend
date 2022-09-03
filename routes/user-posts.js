const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postUCtrl = require('../controllers/user-posts');

router.post('/', postUCtrl.ceateUserPosts);
router.get('/:id',auth, postUCtrl.getAllUserPosts);


module.exports = router;