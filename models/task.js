const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    required: true
  },
  time: {
    // Not sure
    type: String
  },
  category: {
    type: String,
  }
});

