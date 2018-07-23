const Task = require('../models/task.model');
// console.log("Inside task controller js");

// Using GET
exports.getTasks = (req, res) => {
  Task
    .find()
    .then((tasks) => {
      res.json(tasks.map(task => task));
      console.log('successfull grabbed tasks');
    });
};

// Using POST
exports.postTask = (req, res) => {
  // console.log(req.body);
  Task
    .create(req.body)
    .then((task) => {
      console.log('successfully added in new task');
      res.json(task);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Using DELETE
exports.deleteTask = (req, res) => {
  Task
    .findByIdAndRemove(req.params.id)
    // ShoppingList.delete(req.params.id);
    .then ((task) => {
      console.log(`Deleted task item \`${req.params.id}\``);
      res.status(204).end();
      res.json({ id: task._id });
    });
};

// Using PUT
// exports.putTask
