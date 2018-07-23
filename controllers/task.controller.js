const Task = require('../models/task.model');
// console.log("Inside task controller js");

exports.getTasks = (req, res) => {
  Task
    .find()
    .then(tasks => {
      res.json(tasks.map(task => task))
    })
}

exports.postTask = (req, res) => {
  console.log(req.body);
  Task
    .create(req.body)
    .then(task => {
      console.log(task);
      res.json(task);
    })
    .catch(err => {
      console.log(err);
    })
}
