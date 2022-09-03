const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const commentCtrl = require('../controllers/comment');

router.post('/',auth,multer, commentCtrl.createComment);
router.get('/:id', auth, commentCtrl.getComments);
//router.update('/:id',auth, commentCtrl.updateComment);
router.delete('/:id', commentCtrl.deleteComment);

module.exports = router;