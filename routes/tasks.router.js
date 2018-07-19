const express = require('express');
const Task = require('../models/task.model');
const router = express.Router();


// fix this to work later
router.post('/', (req, res) => {
  console.log(req.body);
  Task.create(req.body)
    .then(task => {
      console.log(task);
      res.json(task);
    })
    .catch(err => {
      console.log(err);
    })
});

module.exports = router;