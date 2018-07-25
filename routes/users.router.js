
'use strict';

const bodyParser = require('body-parser');
const userController = require('../controllers/user.controller');
const router = require('express').Router();
const jsonParser = bodyParser.json();

router.post('/', jsonParser, userController.postUser);
router.get('/', userController.getUser);

module.exports = router;
