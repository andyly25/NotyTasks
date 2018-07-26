
'use strict';

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const path = require('path');

const { PORT, DATABASE_URL } = require('./config');

const app = express();

const taskRouter = require('./routes/tasks.router');
const userRouter = require('./routes/users.router');
const authRouter = require('./routes/auths.router');

const { localStrategy, jwtStrategy } = require('./strategies');

// Logging
app.use(morgan('common'));

// CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});

passport.use(localStrategy);
passport.use(jwtStrategy);

const jwtAuth = passport.authenticate('jwt', { session: false });
// A protected endpoint which needs a valid JWT to access it
app.get('/protected', jwtAuth, (req, res) => {
  return res.json({
    data: 'rosebud'
  });
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/tasks', taskRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);

// both runServer and closeServer need to access the same
// server object, so we declare `server` here, and then when
// runServer runs, it assigns a value.
let server;

// this function starts our server and returns a Promise.
// In our test code, we need a way of asynchronously starting
// our server, since we'll be dealing with promises there.
// this function connects to our database, then starts the server
function runServer (databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    // deprication warning solved
    const options = { useNewUrlParser: true };
    mongoose.connect(databaseUrl, options, (err) => {
    // mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', (error) => {
          mongoose.disconnect();
          reject(error);
        });
    });
  });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer () {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close((err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

// catch everything that doesn't go to the api
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code 
// (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };
