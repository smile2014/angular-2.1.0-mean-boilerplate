import 'mocha';
import * as chai from 'chai';
import * as http from 'http';
import * as mongoose from 'mongoose';
import * as utils from '../../../utils/test-utils';

const expect = chai.expect;
const apiEndpoint = '/api/v1';

describe('/users', function () {
  let server: http.Server;
  const sampleUser1 = {
    username: 'plainJane',
    password: 'hello',
  };

  before(function (done) {
    this.timeout(10000);
    server = utils.startServer();
    mongoose.connection.once('open', () => {
      utils.clearDatabase(mongoose.model('User'))
      .then(() => done()).catch(err => done(err));
    });
  });

  after(function (done) {
    utils.closeServer(server, done);
  });

  describe('Login Flow', function () {
    it('creates a user', function (done) {
      utils.postPromise(server, `${apiEndpoint}/signup`, {
        data: sampleUser1
      }).then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.err).to.equal(null);
        done();
      }).catch(err => done(err));
    });

    it('logs in', function (done) {
      utils.postPromise(server, `${apiEndpoint}/login`, {
        data: sampleUser1
      }).then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.err).to.equal(null);
        done();
      }).catch(err => done(err));
    });

    it('logs out', function (done) {
      utils.getPromise(server, `${apiEndpoint}/logout`).then(res => {
        expect(res.status).to.equal(302);
        done();
      }).catch(err => done(err));
    });
  });
});