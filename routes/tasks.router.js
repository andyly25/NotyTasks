// const express = require('express');
// const Task = require('../models/task.model');
const router = require('express').Router();
const taskController = require('../controllers/task.controller');


// fix this to work later
router.get('/', taskController.getTasks);
router.post('/', taskController.postTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;