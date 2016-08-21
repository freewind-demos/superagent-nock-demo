'use strict';
const request = require('superagent');
const nock = require('nock');

function login({username, password}, callback) {
  request.post('/api/sessions')
    .send({username, password})
    .end((err, res) => {
      callback(err, res && res.ok, res && res.body.message);
    });
}

module.exports = {login};