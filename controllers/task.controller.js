const Task = require('../models/task.model');
// console.log("Inside task controller js");

// Using GET
exports.getTasks = (req, res) => {
  Task
    .find()
    .then((tasks) => {
      res.json(tasks.map(task => task));
      console.log('successfully grabbed tasks');
    });
};

// Using POST
exports.postTask = (req, res) => {
  console.log("some user from POST", req.user);
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
    .then((task) => {
      console.log(`Deleted task item \`${req.params.id}\``);
      res.status(204).end();
      res.json({ id: task._id });
    });
};

// Using PUT
exports.putTask = (req, res) => {
  Task
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((task) => {
      res.json(task);
      console.log(`Updated task item \`${req.params.id}\``);
    });
};
