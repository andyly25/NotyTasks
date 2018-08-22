const Task = require('../models/task.model');
const User = require('../models/user.model');

// Using GET
exports.getTasks = (req, res) => {
  const userId = req.user.id;

  User
    .findById(userId)
    .then((user) => {
      res.json(user.tasks.map(task => task.serialize()));
      console.log('successfully grabbed tasks');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Something goofed up in GET Tasks' });
    });
};

exports.getTaskId = (req, res) => {
  Task
    .findById(req.params.id)
    .then((task) => {
      res.json(task.serialize());
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Something goofed up in GET tasks/:id' });
    });
};

// Using POST
exports.postTask = (req, res) => {
  Task
    .create(req.body)
    .then((task) => {
      User
        .findByIdAndUpdate(req.user.id, { $push: { tasks: task._id } })
        .then(() => {
          res.json(task.serialize());
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong in POST /tasks' });
    });
};

// Using DELETE
exports.deleteTask = (req, res) => {
  const taskId = req.params.id;
  Task
    .findByIdAndRemove(taskId)
    .then(() => {
      User
        .findByIdAndUpdate(req.user.id, { $pull: { tasks: taskId } })
        .then(() => {
          res.status(204).end();
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong in DELETE /tasks' });
    });
};

// Using PUT
exports.putTask = (req, res) => {
  // check if request path id and body id matches first
  const taskId = req.params.id;
  if (!(taskId)) {
    res.status(400).json({
      error: 'Request path id and req body id values must match'
    });
  }

  const updated = {};
  // title, image, content, time, category
  const updateableFields = ['title', 'image', 'content', 'date', 'time', 'category', 'completed'];
  updateableFields.forEach((field) => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  Task
    .findByIdAndUpdate(taskId, { $set: updated }, { new: true })
    .then((task) => {
      res.status(200).json(task.serialize());
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong in PUT /tasks/:id' });
    });
};
