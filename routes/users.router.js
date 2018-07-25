// work on later
'use strict';
const bodyParser = require('body-parser');
const userController = require('../controllers/user.controller');
const router = require('express').Router();
const jsonParser = bodyParser.json();

router.post('/', jsonParser, userController.postUser);

module.exports = router;
