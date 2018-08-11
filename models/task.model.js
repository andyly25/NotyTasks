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
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    default: ''
  }
});

TaskSchema.methods.serialize = function () {
  return {
    title: this.title,
    image: this.image,
    content: this.content,
    time: this.time,
    category: this.category,
    id: this._id
  };
};

module.exports = mongoose.model('Task', TaskSchema);
