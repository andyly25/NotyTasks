
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
      min: 1
    },
    password: {
      min: 8,
      // bcrypt truncates after 72 characters
      max: 72
    }
  };

  const tooSmallField = Object.keys(sizedFields).find(field =>
    'min' in sizedFields[field] &&
          req.body[field].trim().length < sizedFields[field].min);
  const tooLargeField = Object.keys(sizedFields).find(field =>
    'max' in sizedFields[field] &&
          req.body[field].trim().length > sizedFields[field].max);

  if (tooSmallField || tooLargeField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: tooSmallField
        ? `Must be at least ${sizedFields[tooSmallField].min} characters long`
        : `Must be at most ${sizedFields[tooLargeField].max} characters long`,
      location: tooSmallField || tooLargeField
    });
  }

  // let { username, password, firstName = '', lastName = '' } = req.body;
  let { username, password, firstName = '', lastName = '', tasks = [] } = req.body;
  // username and password comes in pre-trimmerd, otherwise error
  firstName = firstName.trim();
  lastName = lastName.trim();

  return User.find({ username })
    .count()
    .then((count) => {
      if (count > 0) {
        // means existing user with same username
        return Promise.reject({
          code: 422,
          reason: 'ValidationError',
          message: 'Username already taken',
          location: 'username'
        });
      }
      // if no existing username, hash the password
      return User.hashPassword(password);
    })
    .then(hash => {
      return User.create({
        username,
        password: hash,
        firstName,
        lastName,
        tasks
      });
    })
    .then((user) => {
      return res.status(201).json(user.serialize());
    })
    .catch((err) => {
      // forward validation errors on to the client else give 500
      if (err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      res.status(500).json({ code: 500, message: 'Internal server error' });
    });
};

exports.getUser = (req, res) => {
  return User
    .find()
    .then(users => res.json(users.map(user => user.serialize())))
    .catch((err) => {
      res.status(500).json({ message: 'Internal server error' });
      console.log(err);
    });
};
