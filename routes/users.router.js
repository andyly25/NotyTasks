const userController = require('../controllers/user.controller');
const router = require('express').Router();

router.post('/', userController.postUser);
router.get('/', userController.getUser);

module.exports = router;
