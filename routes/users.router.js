
const router = require('express').Router();
const passport = require('passport');

const userController = require('../controllers/user.controller');

const jwtAuth = passport.authenticate('jwt', { session: false });

router.post('/', userController.postUser);
router.get('/', jwtAuth, userController.getUser);

module.exports = router;
