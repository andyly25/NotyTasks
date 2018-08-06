const Task = require('../models/task.model');
// console.log("Inside task controller js");

// Using GET
exports.getTasks = (req, res) => {
  console.log('INSIDE GET TASKS');
  Task
    .find()
    .then((tasks) => {
      res.json(tasks.map((task) => {
        // id, title, image, content, time, category
        return {
          id: task._id,
          title: task.title,
          image: task.image,
          time: task.time,
          category: task.category
        };
      }));
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
      res.json({
        // id, title, image, content, time, category
        id: task._id,
        title: task.title,
        image: task.image,
        time: task.time,
        category: task.category
      });
      console.log('successfully grabbed tasks');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Something goofed up in GET tasks/:id' });
    });
};

// Using POST
exports.postTask = (req, res) => {
  console.log("some user from POST", req.user);
  // we use req.user.id and store into req.user.tasks?
  Task
    .create(req.body)
    .then((task) => {
      console.log('successfully added in new task');
      res.json(task);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong in POST /tasks' });
    });
};

// Using POST
// exports.postTask = (req, res) => {
//   console.log("some user from POST", req.user);
//   // title, content, category
//   const requiredFields = ['title', 'content', 'category'];
//   requiredFields.forEach((field) => {
//     if (!(field in req.body)) {
//       const message = `Missing \`${field}\` in request body`;
//       console.error(message);
//       return res.status(400).send(message);
//     }
//   });
//   // If everything is okay, add into req.user.tasks?
//   // A bit confused on this
//   User
//     .findById(req.body.user_id)
//     .then((user) => {
//       if (user) {
//         Task
//           .create({
//             title: req.body.title,
//             content: req.body.content,
//             category: req.body.category
//           })
//           .then(task => res.status(201).json({
//             id: task.id,
//             content: task.content,
//             title: task.title,
//             category: task.category
//           }))
//           .catch((err) => {
//             console.error(err);
//             res.status(500).json({ error: 'task POST Something went wrong' });
//           });
//       }
//     })
//     .create({
//       title: req.body.title,
//       content: req.body.content,
//       category: req.body.category
//     })
//     .then((task) => res.status(201).json({
//       _id: task.id,
//       title: task.title,
//       content: task.content,
//       category: task.category
//     }))
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ error: 'Something went wrong in POST /tasks' });
//     });
// };

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
