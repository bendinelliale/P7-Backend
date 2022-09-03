const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);

router.delete('/:id', auth, userCtrl.deleteUser);
router.get('/:id', userCtrl.getOneUser);
router.get('/', userCtrl.getAllUsers);

router.post('/updateView/:id', userCtrl.updateView);

module.exports = router;