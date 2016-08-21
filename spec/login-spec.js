const superagent = require('superagent');
const nock = require('nock');
const {login} = require('../index');

describe('login', () => {

  beforeEach(() => {
    nock.cleanAll();
  });

  it('successfully', (done) => {
    nock(/.*/)
      .post('/api/sessions')
      .reply(201, {
        message: 'login successful'
      });

    login({username: 'freewind', password: '123456'}, (err, ok, message) => {
      expect(err).toBeNull();
      expect(ok).toBeTruthy();
      expect(message).toEqual("login successful");
      done();
    });
  });

  it('failed', (done) => {
    nock(/.*/)
      .post('/api/sessions')
      .reply(401, {
        message: 'invalid username or password'
      });

    login({username: 'freewind', password: '123456'}, (err, ok, message) => {
      expect(ok).toBeFalsy();
      expect(err).not.toBeNull();
      expect(message).toEqual('invalid username or password');
      done();
    });
  })
});