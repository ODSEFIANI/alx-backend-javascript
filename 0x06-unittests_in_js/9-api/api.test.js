// 9-api/api.test.js
const request = require('request');
const { expect } = require('chai');

const apiUrl = 'http://localhost:7865';

describe('Cart page', () => {
  it('Correct status code when :id is a number?', (done) => {
    request.get(`${apiUrl}/cart/12`, (error, response) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('Correct status code when :id is NOT a number (=> 404)?', (done) => {
    request.get(`${apiUrl}/cart/hello`, (error, response) => {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });

  // Additional tests if needed

});
