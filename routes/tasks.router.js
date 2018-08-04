// const express = require('express');
// const Task = require('../models/task.model');
const passport = require('passport');
const router = require('express').Router();
const taskController = require('../controllers/task.controller');

const jwtAuth = passport.authenticate('jwt', { session: false });

// fix this to work later
router.get('/', taskController.getTasks);
router.post('/', jwtAuth, taskController.postTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
