import * as chai from 'chai';
import * as http from 'http';
import * as mongoose from 'mongoose';
import * as utils from '../../utils/test.utils';

const expect = chai.expect;
const apiEndpoint = '/api/v1';

describe('/', function () {
  let server: http.Server;

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

  describe('Basic test', function () {

    it('returns hello', function (done) {
      utils.getPromise(server, `${apiEndpoint}/hello`)
      .then(res => {
        expect(res.text).to.equal('Hello');
        done();
      }).catch(err => done(err));
    });

  });
});