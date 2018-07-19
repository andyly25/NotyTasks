const bcrypt    = require('bcryptjs');
const mongoose  = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
});


// to object is mongoose package, might be able to replace serialize


UserSchema.methods.serialize = function () {
  return {
    username: this.username,
    firstName: this.firstName,
    lastName: this.lastName,
    tasks: this.tasks,
    id: this._id
  };
};

module.exports = mongoose.model('User', UserSchema);