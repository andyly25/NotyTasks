
'use strict';

const { Strategy: LocalStrategy } = require('passport-local');
// assigns strategy export to name JwtStrategy using obj destructuring
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const { User } = require('./models/user.model');
const { JWT_SECRET } = require('./config');

const localStrategy = new LocalStrategy((username, password, callback) => {
  let user;
  User.findOne({ username: username })
    .then((_user) => {
      user = _user;
      if (!user) {
        // return a rejected promise so we break out of chain of .thens
        // errors handled in catch block
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect username or password'
        });
      }
      return user.validatePassword(password);
    })
    .then((isValid) => {
      if (!isValid) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect username or password'
        });
      }
      return callback(null, user);
    })
    .catch((err) => {
      if (err.reason === 'LoginError') {
        return callback(null, false, err);
      }
      return callback(err, false);
    });
});

const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: JWT_SECRET,
    // look for JWT as a bearer auth header
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    // Only allows HS256 tokens - same as the ones issued
    algorithms: ['HS256']
  },
  (payload, done) => {
    done(null, payload.user);
  }
);

module.exports = { localStrategy, jwtStrategy };
