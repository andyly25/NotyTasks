// const passport = require('passport');
const router = require('express').Router();
const mailController = require('../controllers/mail.controller');

// const jwtAuth = passport.authenticate('jwt', { session: false });

router.post('/', mailController.postMail);
module.exports = router;
