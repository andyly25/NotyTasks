// work on later
// const Task = require('../models/task.model');
'use strict';
const User = require('../models/user.model');

// Post to register a new user
exports.postUser = (req, res) => {
  const requiredFields = ['username', 'password'];
  const missingField = requiredFields.find(field => !(field in req.body));

  if (missingField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Missing Field',
      location: missingField
    });
  }

  // Note don't forget we have tasks as well
  const stringFields = ['username', 'password', 'firstName', 'lastName'];
  const nonStringField = stringFields
    .find(field => field in req.body && typeof req.body[field] !== 'string');

  if (nonStringField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Incorrect field type: expected string',
      location: nonStringField
    });
  }

  // if username and pw aren't trimmed, it gives an error
  // reject extra spaces explicitly
  const expliciityTrimmedFields = ['username', 'password'];
  const nonTrimmedField = expliciityTrimmedFields
    .find(field => req.body[field].trim() !== req.body[field]);

  if (nonTrimmedField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Cannot start or end with whitespace',
      location: nonTrimmedField
    });
  }

  const sizedFields = {
    username: {
      min: 5
    },
    password: {
      min: 10,
      // bcrypt truncates after 72 characters
      max: 72
    }
  };

  
};
