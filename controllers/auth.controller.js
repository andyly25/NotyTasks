
'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config');

const createAuthToken = function (user) {
  return jwt.sign({ user }, config.JWT_SECRET, {
    subject: user.username,
    expiresIn: config.JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

// user providing a username and password to login
exports.postLogin = (req, res) => {
  const authToken = createAuthToken(req.user.serialize());
  res.json({ authToken });
};

// user exchanges a valid JWT for a new one with later expiration
exports.postRefresh = (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({ authToken });
};
