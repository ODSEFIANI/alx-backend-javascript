// 5-payment.test.js
const sinon = require('sinon');
const assert = require('assert');
const Utils = require('./utils');
const sendPaymentRequestToApi = require('./5-payment');

describe('sendPaymentRequestToApi', () => {
  let calculateNumberSpy;

  beforeEach(() => {
    calculateNumberSpy = sinon.spy(Utils, 'calculateNumber');
  });

  afterEach(() => {
    calculateNumberSpy.restore();
  });

  it('should log the correct message for totalAmount 100 and totalShipping 20', () => {
    sendPaymentRequestToApi(100, 20);

    sinon.assert.calledOnceWithExactly(calculateNumberSpy, 100, 20);
    sinon.assert.calledOnce(console.log);
    sinon.assert.calledWithExactly(console.log, 'The total is: 120');
  });

  it('should log the correct message for totalAmount 10 and totalShipping 10', () => {
    sendPaymentRequestToApi(10, 10);

    sinon.assert.calledOnceWithExactly(calculateNumberSpy, 10, 10);
    sinon.assert.calledOnce(console.log);
    sinon.assert.calledWithExactly(console.log, 'The total is: 20');
  });
});
