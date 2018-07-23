const chai = require('chai');
const chaiHttp = require('chai-http');
const { TEST_DATABASE_URL } = require('../config');

const { app, runServer, closeServer } = require('../server');

// Using expect style syntax in tests
const expect = chai.expect;

// lets us make HTTP requests
chai.use(chaiHttp);

describe('Status', function () {
  // before tests run, we activate the server
  before(function () {
    return runServer(TEST_DATABASE_URL);
  });

  // close server after our tests
  after(function () {
    return closeServer();
  });

  // Let's test for a good status code
  it('should return a 200 on GET', function () {
    return chai
      .request(app)
      .get('/')
      .then(function (res) {
        expect(res).to.have.status(200);
      })
  });
});